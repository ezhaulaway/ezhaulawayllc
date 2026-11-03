import { describe, expect, it } from "vitest";
import { SCHEDULED_POSTS, livePosts, toRow } from "./scheduled-posts";
import { liveUrlPaths } from "./live-pages";

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
});
