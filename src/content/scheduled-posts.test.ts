import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { formatMoney, SNAPSHOT_GUIDE } from "@/lib/price-guide";
import { SITE_URL } from "@/content/site";
import { Route as BlogPostRoute } from "@/routes/blog.$slug";
import {
  SCHEDULED_POSTS,
  articleHero,
  livePosts,
  toRow,
  type BlogArticle,
  type ScheduledPost,
} from "./scheduled-posts";
import { liveUrlPaths } from "./live-pages";

const LOCAL_WEBP = /^\/blog\/[a-z0-9-]+\/[a-z0-9-]+\.webp$/;

function denverClock(iso: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Denver",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(iso));
  return {
    hour: parts.find((part) => part.type === "hour")?.value,
    minute: parts.find((part) => part.type === "minute")?.value,
  };
}

function assertCommittedImage(src: string) {
  expect(src).toMatch(LOCAL_WEBP);
  const bytes = readFileSync(join("public", src));
  expect(bytes.subarray(0, 4).toString("ascii")).toBe("RIFF");
  expect(bytes.subarray(8, 12).toString("ascii")).toBe("WEBP");
  expect(bytes.byteLength).toBeGreaterThan(0);
  expect(bytes.byteLength).toBeLessThanOrEqual(200 * 1024);
}

function nodesFrom(scripts: readonly unknown[] | undefined) {
  return (scripts ?? []).flatMap((script) => {
    if (!script || typeof script !== "object" || !("children" in script)) return [];
    const data = JSON.parse(String(script.children ?? "null")) as unknown;
    return Array.isArray(data) ? data : [data];
  }) as Record<string, unknown>[];
}

async function headFor(row: BlogArticle) {
  const headFn = BlogPostRoute.options.head;
  if (typeof headFn !== "function") throw new Error("blog head is missing");
  return headFn({ loaderData: row } as Parameters<typeof headFn>[0]);
}

const withMedia: ScheduledPost = {
  slug: "christmas-tree-disposal",
  title: "Christmas Tree Disposal in Parker",
  meta_description: "A Christmas tree pickup in Parker starts at [[min]].",
  publish_at: "2026-12-16T14:00:00.000Z",
  content_html:
    '<h1>Christmas Tree Disposal in Parker</h1><p>A tree starts at [[min]].</p><img src="/blog/christmas-tree-disposal/curb.webp" alt="Tree at the curb" width="1600" height="900">',
  hero: {
    src: "/blog/christmas-tree-disposal/hero.webp",
    alt: "Cut Christmas tree ready for hauling",
    width: 1600,
    height: 900,
  },
  faqs: [{ question: "How much is a tree pickup?", answer: "A single tree starts at [[min]]." }],
};

describe("scheduled posts", () => {
  const first = SCHEDULED_POSTS[0]!;
  it("hides a post until its publish time", () => {
    expect(livePosts(Date.parse(first.publish_at) - 1).length).toBe(0);
    expect(livePosts(Date.parse(first.publish_at)).length).toBe(1);
  });
  it("keeps titles and descriptions within search limits", () => {
    for (const p of SCHEDULED_POSTS) {
      expect(p.title.length).toBeLessThanOrEqual(60);
      expect(p.meta_description.length).toBeLessThanOrEqual(155);
    }
  });
  it("has unique slugs and never uses a dollar amount or the street address", () => {
    expect(new Set(SCHEDULED_POSTS.map((p) => p.slug)).size).toBe(SCHEDULED_POSTS.length);
    for (const p of SCHEDULED_POSTS) expect(p.content_html).not.toMatch(/\$\d/);
  });
  it("only links to live pages", () => {
    const live = new Set<string>(liveUrlPaths());
    for (const p of SCHEDULED_POSTS) {
      for (const m of p.content_html.matchAll(/href="(\/[^"#?]*)"/g)) {
        expect(live.has(m[1]!) || live.has(m[1]!.replace(/\/$/, ""))).toBe(true);
      }
    }
  });
  it("gives each post a negative id", () => {
    expect(toRow(first, 0).id).toBeLessThan(0);
  });
  it("publishes at 7:00 AM Mountain time", () => {
    for (const post of SCHEDULED_POSTS) {
      expect(denverClock(post.publish_at)).toEqual({ hour: "07", minute: "00" });
    }
    expect(denverClock("2026-07-16T13:00:00.000Z")).toEqual({ hour: "07", minute: "00" });
  });
  it("records standing permission to publish without per-post approval", () => {
    const source = readFileSync("src/content/scheduled-posts.ts", "utf8");
    expect(source).not.toContain("once Ben has approved");
    expect(source).toContain("Nov 15, 2026");
    expect(source).toContain("without");
    expect(source).toContain("per-post approval");
  });
  it("only uses committed WebP files for hero and inline images", () => {
    for (const post of SCHEDULED_POSTS) {
      expect(post.content_html.trimStart().startsWith("<h1")).toBe(true);
      if (post.hero) {
        expect(post.hero.alt.trim().length).toBeGreaterThan(0);
        expect(post.hero.width).toBeGreaterThan(0);
        expect(post.hero.height).toBeGreaterThan(0);
        assertCommittedImage(post.hero.src);
      }
      for (const tag of post.content_html.match(/<img\b[^>]*>/gi) ?? []) {
        const src = /\ssrc\s*=\s*"([^"]+)"/.exec(tag)?.[1];
        const alt = /\salt\s*=\s*"([^"]*)"/.exec(tag)?.[1];
        expect(src, tag).toBeTruthy();
        expect(alt?.trim().length, tag).toBeGreaterThan(0);
        expect(tag).toMatch(/\bwidth="\d+"/);
        expect(tag).toMatch(/\bheight="\d+"/);
        assertCommittedImage(src!);
      }
    }
  });
  it("builds Article schema and leaves FAQ empty when a post has no questions", () => {
    const bare: ScheduledPost = {
      slug: "schema-fixture",
      title: "A post with no photos or questions",
      meta_description: "Schema fixture for a post that has neither a hero nor an FAQ.",
      publish_at: "2026-11-04T14:00:00.000Z",
      content_html: "<h1>A post with no photos or questions</h1><p>Body.</p>",
    };
    const row = toRow(bare, 0);
    expect(row.hero_image_url).toBeNull();
    expect(row.faq_json_ld).toBeNull();
    expect(row.faqs).toBeNull();
    const article = (row.json_ld as Record<string, unknown>[])[0]!;
    expect(article["@type"]).toBe("BlogPosting");
    expect(article["headline"]).toBe(bare.title);
    expect(article["description"]).toBe(bare.meta_description);
    expect(article["image"]).toBe(`${SITE_URL}/apple-touch-icon.png`);
    expect(article["datePublished"]).toBe(bare.publish_at);
    expect(article["dateModified"]).toBe(bare.publish_at);
    expect(article["author"]).toMatchObject({ "@type": "Organization", name: "EZ Haulaway" });
    expect(article["publisher"]).toMatchObject({ "@type": "Organization", name: "EZ Haulaway" });
    expect((row.json_ld as Record<string, unknown>[])[1]?.["@type"]).toBe("BreadcrumbList");
  });
  it("carries a hero and FAQ into the row", () => {
    const row = toRow(withMedia, 3);
    expect(row.id).toBe(-4);
    expect(row.hero_image_url).toBe(withMedia.hero!.src);
    expect(row.hero_image_alt).toBe(withMedia.hero!.alt);
    expect(row.hero_image_width).toBe(1600);
    expect(row.hero_image_height).toBe(900);
    const article = (row.json_ld as Record<string, unknown>[])[0]!;
    expect(article["image"]).toMatchObject({
      "@type": "ImageObject",
      url: `${SITE_URL}${withMedia.hero!.src}`,
      width: 1600,
      height: 900,
      caption: withMedia.hero!.alt,
    });
    expect(row.faq_json_ld).toMatchObject({
      "@type": "FAQPage",
      mainEntity: [{ "@type": "Question", name: "How much is a tree pickup?" }],
    });
    expect(articleHero(row)?.src).toBe(withMedia.hero!.src);
    expect(articleHero({ ...row, id: 12 })).toBeNull();
  });
  it("renders the hero, FAQPage, and BlogPosting in the post head", async () => {
    const row = toRow(withMedia, 0);
    const head = await headFor(row);
    const meta = (head.meta ?? []).filter((item): item is NonNullable<typeof item> => item != null);
    const content = (name: string) =>
      meta.find(
        (item) =>
          ("property" in item && item.property === name) || ("name" in item && item.name === name),
      )?.content;
    expect(content("og:image")).toBe(`${SITE_URL}/blog/christmas-tree-disposal/hero.webp`);
    expect(content("description")).toBe(
      `A Christmas tree pickup in Parker starts at ${formatMoney(SNAPSHOT_GUIDE.minimum)}.`,
    );
    const links = (head.links ?? []).filter(
      (link): link is NonNullable<typeof link> => link != null,
    );
    expect(
      links.some(
        (link) => link.rel === "preload" && "href" in link && link.href === row.hero_image_url,
      ),
    ).toBe(true);
    const blocks = nodesFrom(head.scripts);
    const article = blocks.find((block) => block["@type"] === "BlogPosting");
    const faq = blocks.find((block) => block["@type"] === "FAQPage");
    expect(article).toMatchObject({
      headline: withMedia.title,
      datePublished: withMedia.publish_at,
      dateModified: withMedia.publish_at,
      author: { "@type": "Organization", name: "EZ Haulaway" },
      publisher: { "@type": "Organization", name: "EZ Haulaway", legalName: "EZ Haulaway LLC" },
    });
    expect(article?.["image"]).toMatchObject({
      url: `${SITE_URL}/blog/christmas-tree-disposal/hero.webp`,
    });
    expect(JSON.stringify(faq)).toContain("How much is a tree pickup?");
    expect(JSON.stringify(faq)).toContain(formatMoney(SNAPSHOT_GUIDE.minimum));
    expect(JSON.stringify(faq)).not.toContain("[[min]]");
    expect(JSON.stringify(blocks)).not.toContain("share.google");
  });
  it("does not preload a hero for an imported post", async () => {
    const row = toRow(withMedia, 0);
    const imported = { ...row, id: 8 };
    const head = await headFor(imported);
    const links = (head.links ?? []).filter(
      (link): link is NonNullable<typeof link> => link != null,
    );
    const meta = (head.meta ?? []).filter((item): item is NonNullable<typeof item> => item != null);
    expect(links.some((link) => link.rel === "preload")).toBe(false);
    expect(meta.some((item) => "property" in item && item.property === "og:image")).toBe(true);
  });
});

describe("IndexNow key", () => {
  it("serves a 32-character hex key at the site root file", () => {
    const files = readdirSync("public").filter((name) => /^[0-9a-f]{32}\.txt$/.test(name));
    expect(files).toHaveLength(1);
    const name = files[0]!;
    const key = name.slice(0, -".txt".length);
    expect(readFileSync(join("public", name)).equals(Buffer.from(key))).toBe(true);
  });
});
