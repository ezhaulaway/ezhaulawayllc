import { describe, expect, it } from "vitest";
import { SITE_URL } from "@/content/site";
import {
  SCHEDULED_POSTS,
  livePosts,
  publishedScheduledPost,
  toRow,
  type ScheduledPost,
} from "@/content/scheduled-posts";
import { blogSitemapXml, mergeBlogPosts, toBlogListItem } from "./blog-feed";

const replacement: ScheduledPost = {
  slug: "christmas-tree-disposal",
  title: "Christmas Tree Disposal in Parker",
  meta_description: "What it costs to haul a Christmas tree in Parker. Free photo quote.",
  publish_at: "2026-12-16T14:00:00.000Z",
  content_html: "<h1>Christmas Tree Disposal in Parker</h1><p>A tree starts at [[min]].</p>",
  hero: {
    src: "/blog/christmas-tree-disposal/hero.webp",
    alt: "Cut Christmas tree ready for hauling",
    width: 1600,
    height: 900,
  },
  faqs: [{ question: "How much is a tree pickup?", answer: "A single tree starts at [[min]]." }],
};

const importedTree = {
  id: 42,
  slug: "christmas-tree-disposal",
  title: "Old Christmas tree pickup",
  meta_description: "Old description",
  hero_image_url: "https://example.com/old.jpg",
  hero_image_alt: null,
  hero_image_width: null,
  hero_image_height: null,
  language_code: "en",
  article_created_at: "2025-12-01T15:00:00.000Z",
  article_updated_at: "2025-12-20T15:00:00.000Z",
};

const other = {
  ...importedTree,
  id: 7,
  slug: "fence-removal-cost",
  title: "Fence removal",
  article_created_at: "2025-06-01T15:00:00.000Z",
  article_updated_at: "2025-06-02T15:00:00.000Z",
};

function visible(now: number) {
  const posts = [replacement];
  const live = posts.filter((post) => Date.parse(post.publish_at) <= now);
  const scheduled = live.map((post) => toBlogListItem(toRow(post, posts.indexOf(post))));
  return mergeBlogPosts([importedTree, other], scheduled);
}

describe("blog feed", () => {
  const before = Date.parse(replacement.publish_at) - 1;
  const after = Date.parse(replacement.publish_at);

  it("keeps the imported post until the in-house publish time", () => {
    expect(publishedScheduledPost([replacement], replacement.slug, before)).toBeNull();
    const rows = visible(before);
    expect(rows.filter((row) => row.slug === "christmas-tree-disposal")).toHaveLength(1);
    expect(rows.find((row) => row.slug === "christmas-tree-disposal")?.title).toBe(
      "Old Christmas tree pickup",
    );
    expect(rows.find((row) => row.slug === "christmas-tree-disposal")?.id).toBe(42);
  });

  it("replaces the imported post at the same slug once it is live", () => {
    const row = publishedScheduledPost([replacement], replacement.slug, after);
    expect(row?.title).toBe("Christmas Tree Disposal in Parker");
    expect(row?.article_updated_at).toBe(replacement.publish_at);
    const rows = visible(after);
    const trees = rows.filter((item) => item.slug === "christmas-tree-disposal");
    expect(trees).toHaveLength(1);
    expect(trees[0]?.title).toBe("Christmas Tree Disposal in Parker");
    expect(trees[0]?.hero_image_url).toBe("/blog/christmas-tree-disposal/hero.webp");
    expect(trees[0]?.hero_image_alt).toBe("Cut Christmas tree ready for hauling");
    expect(trees[0]?.hero_image_width).toBe(1600);
    expect(trees[0]?.hero_image_height).toBe(900);
    expect(rows.some((item) => item.slug === "fence-removal-cost")).toBe(true);
  });

  it("puts one updated lastmod in the sitemap after the rewrite", () => {
    const oldXml = blogSitemapXml(visible(before));
    const newXml = blogSitemapXml(visible(after));
    expect(oldXml.match(/christmas-tree-disposal/g)).toHaveLength(1);
    expect(oldXml).toContain("<lastmod>2025-12-20T15:00:00.000Z</lastmod>");
    expect(newXml.match(/christmas-tree-disposal/g)).toHaveLength(1);
    expect(newXml).toContain(
      `<loc>${SITE_URL}/blog/christmas-tree-disposal</loc><lastmod>${new Date(replacement.publish_at).toISOString()}</lastmod>`,
    );
    expect(newXml).not.toContain("2025-12-20T15:00:00.000Z");
    expect(newXml).toContain(`${SITE_URL}/blog/fence-removal-cost`);
  });

  it("lists live in-house posts in the sitemap with lastmod", () => {
    const now = Date.parse("2026-11-16T15:00:00.000Z");
    const rows = livePosts(now).map((post) =>
      toBlogListItem(toRow(post, SCHEDULED_POSTS.indexOf(post))),
    );
    const xml = blogSitemapXml(rows);
    const post = SCHEDULED_POSTS[0]!;
    expect(xml).toContain(`${SITE_URL}/blog/${post.slug}`);
    expect(xml).toContain(`<lastmod>${new Date(post.publish_at).toISOString()}</lastmod>`);
    expect(xml).toContain(`${SITE_URL}/blog</loc>`);
  });
});
