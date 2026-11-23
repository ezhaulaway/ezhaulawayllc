import { describe, expect, it } from "vitest";
import { Route as BlogRoute } from "@/routes/blog.$slug";
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

describe("imported blog post head", () => {
  it("names Ben Herrera when the stored article has no json_ld, as on furniture-disposal-denver", async () => {
    const headFn = BlogRoute.options.head;
    if (typeof headFn !== "function") throw new Error("blog head is missing");
    const head = await headFn({
      loaderData: {
        id: 1019072,
        slug: "furniture-disposal-denver",
        previous_slugs: [],
        title: "Furniture Disposal in Denver: Every Option, Cost and Rule",
        meta_description: "Furniture disposal in Denver.",
        hero_image_url: "https://example.com/sofa.jpg",
        content_html: "<h1>Furniture</h1>",
        json_ld: null,
        faq_json_ld: null,
        language_code: "en",
        article_created_at: "2026-10-27T00:00:00+00:00",
        article_updated_at: "2026-10-27T04:12:49.25+00:00",
        synced_at: "2026-10-27T05:00:28.666+00:00",
        hero_image_alt: null,
        hero_image_width: null,
        hero_image_height: null,
        faqs: null,
      },
    } as unknown as Parameters<typeof headFn>[0]);
    const article = (head.scripts ?? [])
      .map((script) => String(script?.children ?? ""))
      .find((script) => script.includes("BlogPosting"));
    expect(article).toContain('"name":"Ben Herrera"');
    expect(article).not.toContain('"name":"Ben"');
    expect(BLOG_BYLINE).toBe("By Ben Herrera, owner of EZ Haulaway");
  });

  it("replaces a stored person named Ben before the script is emitted", async () => {
    const headFn = BlogRoute.options.head;
    if (typeof headFn !== "function") throw new Error("blog head is missing");
    const head = await headFn({
      loaderData: {
        id: 7,
        slug: "stored-author",
        previous_slugs: [],
        title: "Stored",
        meta_description: "Stored author.",
        hero_image_url: null,
        content_html: "<p>Body</p>",
        json_ld: {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "Stored",
          author: { "@type": "Person", name: "Ben" },
        },
        faq_json_ld: null,
        language_code: "en",
        article_created_at: "2026-10-27T00:00:00+00:00",
        article_updated_at: "2026-10-27T00:00:00+00:00",
        synced_at: "2026-10-27T00:00:00+00:00",
        hero_image_alt: null,
        hero_image_width: null,
        hero_image_height: null,
        faqs: null,
      },
    } as unknown as Parameters<typeof headFn>[0]);
    const article = (head.scripts ?? [])
      .map((script) => String(script?.children ?? ""))
      .find((script) => script.includes("BlogPosting"));
    expect(article).toContain('"name":"Ben Herrera"');
    expect(article).not.toContain('"name":"Ben"');
  });
});

describe("homepage review schema", () => {
  it("uses 5.0 from 22 reviews when the live lookup does not return", async () => {
    const headFn = HomeRoute.options.head;
    if (typeof headFn !== "function") throw new Error("homepage head is missing");
    const head = await headFn({ loaderData: undefined } as unknown as Parameters<typeof headFn>[0]);
    const block = (head.scripts ?? [])
      .map((script) => String(script?.children ?? ""))
      .find((script) => script.includes("AggregateRating"));
    expect(block).toContain('"ratingValue":"5.0"');
    expect(block).toContain('"reviewCount":22');
    expect(block).not.toContain('"@type":"Review"');
  });
});
