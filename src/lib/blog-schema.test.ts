import { describe, expect, it } from "vitest";
import { Route as HomeRoute } from "@/routes/index";
import {
  BLOG_AUTHOR_NAME,
  BLOG_BYLINE,
  blogSchemas,
  normalizeArticleAuthors,
} from "@/lib/blog-schema";

describe("blog authorship", () => {
  it("credits Ben Herrera and does not attach a made-up bio", () => {
    expect(BLOG_AUTHOR_NAME).toBe("Ben Herrera");
    expect(BLOG_BYLINE).toBe("By Ben Herrera, owner of EZ Haulaway");
    const [article] = blogSchemas({
      slug: "sample",
      title: "Sample",
      meta_description: "A sample post.",
      hero_image_url: null,
      article_created_at: "2026-11-04T14:00:00.000Z",
      article_updated_at: "2026-11-04T14:00:00.000Z",
    }) as Array<Record<string, unknown>>;
    if (!article) throw new Error("missing article schema");
    expect(article["author"]).toMatchObject({
      "@type": "Person",
      name: "Ben Herrera",
      jobTitle: "Owner",
      worksFor: { "@type": "Organization", name: "EZ Haulaway" },
    });
    expect(JSON.stringify(article["author"])).not.toMatch(
      /bio|certified|journalist|years of experience/i,
    );
  });

  it("replaces a stored persona and leaves the business as the author", () => {
    const persona = normalizeArticleAuthors({
      "@type": "BlogPosting",
      author: {
        "@type": "Person",
        name: "Alex Rivera",
        description: "Denver junk-removal journalist with 10 years of experience.",
      },
    }) as { author: { name: string; description?: string } };
    expect(persona.author.name).toBe("Ben Herrera");
    expect(JSON.stringify(persona.author)).not.toContain("Alex Rivera");
    expect(persona.author.description).toBeUndefined();

    const business = normalizeArticleAuthors({
      "@type": "BlogPosting",
      author: { "@type": "Organization", name: "EZ Haulaway" },
    }) as { author: { "@type": string; name: string } };
    expect(business.author).toEqual({ "@type": "Organization", name: "EZ Haulaway" });
  });
});

describe("homepage review schema", () => {
  it("uses 5.0 from 21 reviews when the live lookup does not return", async () => {
    const headFn = HomeRoute.options.head;
    if (typeof headFn !== "function") throw new Error("homepage head is missing");
    const head = await headFn({ loaderData: undefined } as unknown as Parameters<typeof headFn>[0]);
    const block = (head.scripts ?? [])
      .map((script) => String(script?.children ?? ""))
      .find((script) => script.includes("AggregateRating"));
    expect(block).toContain('"ratingValue":"5.0"');
    expect(block).toContain('"reviewCount":21');
    expect(block).not.toContain('"@type":"Review"');
  });
});
