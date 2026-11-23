import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";
import {
  ga4CollectQuery,
  gaClientIdFromCookie,
  phoneClickBootstrap,
  phoneClickParams,
  phoneLinkLocation,
} from "./analytics";

function element(
  attrs: Record<string, string>,
  hits: string[] = [],
): {
  getAttribute(name: string): string | null;
  closest(selector: string): unknown;
} {
  return {
    getAttribute: (name) => attrs[name] ?? null,
    closest: (selector) => (hits.includes(selector) ? {} : null),
  };
}

describe("phone click analytics", () => {
  it("uses the explicit location on header, footer, sticky, and page links", () => {
    const link = element({ "data-phone-location": "home_hero" }, ["header"]);
    expect(phoneLinkLocation(link, "/")).toBe("home_hero");
    expect(
      phoneLinkLocation(element({}, ["[data-phone-region='mobile-sticky']"]), "/services/x"),
    ).toBe("mobile_sticky");
    expect(phoneLinkLocation(element({}, ["header"]), "/faq")).toBe("header");
    expect(phoneLinkLocation(element({}, ["footer"]), "/contact")).toBe("footer");
  });

  it("infers a location from the path when the link has no attribute", () => {
    const plain = element({});
    expect(phoneLinkLocation(plain, "/blog/christmas-tree-disposal")).toBe("blog");
    expect(phoneLinkLocation(plain, "/service-areas/parker/furniture-removal")).toBe(
      "city_service",
    );
    expect(phoneLinkLocation(plain, "/service-areas/parker")).toBe("city");
    expect(phoneLinkLocation(plain, "/services/hot-tub-removal")).toBe("service");
    expect(phoneLinkLocation(plain, "/instant-estimate")).toBe("estimate");
    expect(phoneLinkLocation(plain, "/contact")).toBe("contact");
    expect(phoneLinkLocation(plain, "/faq")).toBe("faq");
    expect(phoneLinkLocation(plain, "/")).toBe("home");
    expect(phoneLinkLocation(plain, "/pricing")).toBe("page");
  });

  it("sends phone_call_click the same way as generate_lead, with the link location", () => {
    const params = phoneClickParams("header", "/services/furniture-removal");
    expect(params).toEqual({
      page_path: "/services/furniture-removal",
      link_location: "header",
      transport_type: "beacon",
    });
    const query = ga4CollectQuery("G-TEST1234", "123.456", "phone_call_click", params, {
      href: "https://www.ezhaulawayllc.com/services/furniture-removal",
      title: "Furniture",
    });
    const parsed = new URLSearchParams(query);
    expect(parsed.get("en")).toBe("phone_call_click");
    expect(parsed.get("tid")).toBe("G-TEST1234");
    expect(parsed.get("cid")).toBe("123.456");
    expect(parsed.get("ep.link_location")).toBe("header");
    expect(parsed.get("ep.page_path")).toBe("/services/furniture-removal");
    expect(parsed.get("ep.transport_type")).toBeNull();
  });

  it("reads the GA client id from the _ga cookie", () => {
    expect(gaClientIdFromCookie("_ga=GA1.1.111.222")).toBe("111.222");
    expect(gaClientIdFromCookie("other=1; _ga=GA1.1.333.444")).toBe("333.444");
    expect(gaClientIdFromCookie("")).toBeNull();
  });

  it("beacons a tel tap that happens before the app bundle loads", () => {
    const beacons: string[] = [];
    const link = {
      getAttribute: (name: string) => (name === "data-phone-location" ? "footer" : null),
      closest: (selector: string) => (selector.startsWith("a[href") ? link : null),
    };
    const document = {
      cookie: "_ga=GA1.1.555.666",
      title: "EZ Haulaway",
      addEventListener: (_type: string, fn: (event: { target: typeof link }) => void) => {
        document.listener = fn;
      },
      listener: (_event: { target: typeof link }) => {},
    };
    const sandbox = {
      window: {} as { __ezPhoneOwned?: boolean },
      document,
      navigator: {
        sendBeacon: (url: string) => {
          beacons.push(url);
          return true;
        },
      },
      location: { href: "https://www.ezhaulawayllc.com/contact", pathname: "/contact" },
    };
    runInNewContext(phoneClickBootstrap("G-TEST1234"), sandbox);
    document.listener({ target: link });
    expect(beacons).toHaveLength(1);
    const hit = new URL(beacons[0]!);
    expect(hit.origin + hit.pathname).toBe("https://www.google-analytics.com/g/collect");
    expect(hit.searchParams.get("en")).toBe("phone_call_click");
    expect(hit.searchParams.get("tid")).toBe("G-TEST1234");
    expect(hit.searchParams.get("cid")).toBe("555.666");
    expect(hit.searchParams.get("ep.link_location")).toBe("footer");
    expect(hit.searchParams.get("ep.page_path")).toBe("/contact");
    beacons.length = 0;
    sandbox.window.__ezPhoneOwned = true;
    document.listener({ target: link });
    expect(beacons).toHaveLength(0);
  });

  it("ignores a measurement id that is not a GA4 id", () => {
    expect(phoneClickBootstrap("https://evil.example")).toContain('var id=""');
    expect(phoneClickBootstrap(undefined)).toContain('var id=""');
  });
});

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, out);
    else if (/\.(ts|tsx)$/.test(name) && !name.endsWith(".test.ts")) out.push(path);
  }
  return out;
}

describe("business phone links", () => {
  it("keeps every tel link on the business number and tags app links with a location", () => {
    const files = walk("src");
    const telFiles: string[] = [];
    for (const path of files) {
      if (path.includes("email-templates")) continue;
      const source = readFileSync(path, "utf8");
      const hrefs = source.match(/tel:[^"'`\s<>]*/g) ?? [];
      for (const href of hrefs) {
        const digits = href.replace(/\D/g, "");
        if (!digits) continue;
        expect(digits.endsWith("7206147223"), `${path} has ${href}`).toBe(true);
      }
      if (source.includes("href={`tel:") || source.includes('href={"tel:'))
        telFiles.push(path.replaceAll("\\", "/"));
    }
    expect(telFiles).toEqual(["src/components/phone-link.tsx"]);
    const link = readFileSync("src/components/phone-link.tsx", "utf8");
    expect(link).toContain("data-phone-location={location}");
    expect(link).toContain("PHONE_TEL");
  });
});
