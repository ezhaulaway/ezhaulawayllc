import { describe, expect, it } from "vitest";
import {
  BUSINESS_JSONLD,
  BUSINESS_SAME_AS,
  BUSINESS_SCHEMA,
  GOOGLE_PROFILE_URL,
} from "@/content/site";
import { applyBusinessIdentity, blogSchemas } from "@/lib/blog-schema";
import { buildLlmsText } from "@/lib/llms-text";
import { SNAPSHOT_GUIDE } from "@/lib/price-guide";
import { Route as HomeRoute } from "@/routes/index";

const GOOGLE_CID = "https://www.google.com/maps?cid=4376648729554099718";

function sameAsBlocks(
  value: unknown,
  out: { sameAs?: unknown; name?: unknown; legalName?: unknown; hasMap?: unknown }[] = [],
) {
  if (Array.isArray(value)) {
    value.forEach((item) => sameAsBlocks(item, out));
    return out;
  }
  if (!value || typeof value !== "object") return out;
  const record = value as {
    sameAs?: unknown;
    name?: unknown;
    legalName?: unknown;
    hasMap?: unknown;
  };
  if (Array.isArray(record.sameAs)) out.push(record);
  Object.values(record).forEach((item) => sameAsBlocks(item, out));
  return out;
}

describe("business profile structured data", () => {
  it("puts the Google cid in sameAs and leaves share.google out", async () => {
    expect(GOOGLE_PROFILE_URL).toBe(GOOGLE_CID);
    expect([...BUSINESS_SAME_AS]).toContain(GOOGLE_CID);
    expect([...BUSINESS_JSONLD.sameAs]).toEqual([...BUSINESS_SAME_AS]);
    expect(JSON.stringify(BUSINESS_JSONLD)).not.toContain("share.google");

    expect(BUSINESS_SCHEMA.name).toBe("EZ Haulaway");
    expect(BUSINESS_SCHEMA.legalName).toBe("EZ Haulaway LLC");
    expect(BUSINESS_SCHEMA.hasMap).toBe(GOOGLE_CID);
    expect([...(BUSINESS_SCHEMA.sameAs as readonly string[])]).toEqual([...BUSINESS_SAME_AS]);
    expect(JSON.stringify(BUSINESS_SCHEMA)).not.toContain("share.google");

    const headFn = HomeRoute.options.head;
    if (typeof headFn !== "function") throw new Error("homepage head is missing");
    const head = await headFn({ loaderData: undefined } as unknown as Parameters<typeof headFn>[0]);
    const blocks = (head.scripts ?? [])
      .map((script) => String(script?.children ?? ""))
      .filter((script) => script.includes('"sameAs"'));
    expect(blocks).toHaveLength(2);
    for (const block of blocks) {
      const data = JSON.parse(block) as {
        name: string;
        legalName: string;
        sameAs: string[];
        hasMap: string;
      };
      expect(data.sameAs).toContain(GOOGLE_CID);
      expect(data.sameAs).toEqual([...BUSINESS_SAME_AS]);
      expect(block).not.toContain("share.google");
      expect(data.name).toBe("EZ Haulaway");
      expect(data.legalName).toBe("EZ Haulaway LLC");
      expect(data.hasMap).toBe(GOOGLE_CID);
    }

    const article = blogSchemas({
      slug: "sample",
      title: "Sample",
      meta_description: null,
      hero_image_url: null,
      article_created_at: null,
      article_updated_at: null,
    });
    const organizations = sameAsBlocks(article);
    expect(organizations.length).toBeGreaterThan(0);
    for (const organization of organizations) {
      expect(organization.sameAs).toEqual([...BUSINESS_SAME_AS]);
      expect(organization.sameAs).toContain(GOOGLE_CID);
      expect(organization.name).toBe("EZ Haulaway");
      expect(organization.legalName).toBe("EZ Haulaway LLC");
      expect(organization.hasMap).toBe(GOOGLE_CID);
    }
    expect(JSON.stringify(article)).not.toContain("share.google");

    const stamped = applyBusinessIdentity({
      "@type": "LocalBusiness",
      name: "EZ Haulaway LLC",
      sameAs: ["https://share.google/cf9FKoYXCi9K62j84"],
    }) as { name: string; legalName: string; sameAs: string[]; hasMap: string };
    expect(stamped.sameAs).toContain(GOOGLE_CID);
    expect(stamped.sameAs).toEqual([...BUSINESS_SAME_AS]);
    expect(stamped.sameAs.join(" ")).not.toContain("share.google");
    expect(stamped.name).toBe("EZ Haulaway");
    expect(stamped.legalName).toBe("EZ Haulaway LLC");
    expect(stamped.hasMap).toBe(GOOGLE_CID);

    const llms = buildLlmsText(SNAPSHOT_GUIDE);
    for (const url of BUSINESS_SAME_AS) expect(llms).toContain(url);
    expect(llms).not.toContain("share.google");
  });
});
