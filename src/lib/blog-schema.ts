import { BUSINESS_JSONLD, SITE_URL } from "@/content/site";
import type { Json } from "@/integrations/supabase/types";

type PostLike = {
  slug: string;
  title: string;
  meta_description: string | null;
  hero_image_url: string | null;
  article_created_at: string | null;
  article_updated_at: string | null;
};

/** The only person credited on a post. In-house posts may instead name the business. */
export const BLOG_AUTHOR_NAME = "Ben Herrera";
export const BLOG_BYLINE = "By Ben Herrera, owner of EZ Haulaway";

function personAuthor() {
  return {
    "@type": "Person" as const,
    name: BLOG_AUTHOR_NAME,
    jobTitle: "Owner",
    worksFor: { "@type": "Organization" as const, ...BUSINESS_JSONLD },
  };
}

function isArticleType(type: unknown): boolean {
  return schemaTypes(type).some((item) => /Article|BlogPosting|NewsArticle/.test(item));
}

/** Replace a made-up or first-name-only person. An organization author is left for the business stamp. */
function approvedAuthor(author: unknown): unknown {
  if (Array.isArray(author)) return author.map((item) => approvedAuthor(item));
  if (!author || typeof author !== "object") return personAuthor();
  const record = author as Record<string, unknown>;
  const types = schemaTypes(record["@type"]);
  if (types.includes("Organization")) return record;
  return personAuthor();
}

/** Imported articles can arrive with a persona in their stored JSON-LD. Keep only Ben Herrera or the business. */
export function normalizeArticleAuthors(node: unknown): unknown {
  if (Array.isArray(node)) return node.map((item) => normalizeArticleAuthors(item));
  if (!node || typeof node !== "object") return node;
  const next: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
    next[key] = key === "author" ? value : normalizeArticleAuthors(value);
  }
  if (isArticleType(next["@type"]) && "author" in next)
    next["author"] = approvedAuthor(next["author"]);
  return next;
}

const BUSINESS_NODE_TYPES = new Set(["LocalBusiness", "JunkRemovalService", "Organization"]);

function schemaTypes(type: unknown): string[] {
  if (typeof type === "string") return [type];
  if (Array.isArray(type)) return type.filter((item): item is string => typeof item === "string");
  return [];
}

/** Stamp the shared business identity onto every business node in a JSON-LD tree. */
export function applyBusinessIdentity(node: unknown): unknown {
  if (Array.isArray(node)) return node.map(applyBusinessIdentity);
  if (!node || typeof node !== "object") return node;
  const next: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
    next[key] = applyBusinessIdentity(value);
  }
  if (schemaTypes(next["@type"]).some((type) => BUSINESS_NODE_TYPES.has(type))) {
    next["name"] = BUSINESS_JSONLD.name;
    next["legalName"] = BUSINESS_JSONLD.legalName;
    next["sameAs"] = [...BUSINESS_JSONLD.sameAs];
    next["hasMap"] = BUSINESS_JSONLD.hasMap;
  }
  return next;
}

export function blogDates(p: Pick<PostLike, "article_created_at" | "article_updated_at">) {
  const published = p.article_created_at ?? p.article_updated_at;
  const modified = p.article_updated_at ?? p.article_created_at;
  return { published, modified };
}

/** BlogPosting + BreadcrumbList for a post, built from the post's own fields. */
export function blogSchemas(p: PostLike): unknown[] {
  const url = `${SITE_URL}/blog/${p.slug}`;
  const { published, modified } = blogDates(p);
  const publisher = {
    "@type": "Organization",
    ...BUSINESS_JSONLD,
    url: `${SITE_URL}/`,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/apple-touch-icon.png` },
  };
  return [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      url,
      headline: p.title,
      ...(p.meta_description ? { description: p.meta_description } : {}),
      image: p.hero_image_url ?? `${SITE_URL}/apple-touch-icon.png`,
      ...(published ? { datePublished: published } : {}),
      ...(modified ? { dateModified: modified } : {}),
      author: personAuthor(),
      publisher,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: p.title, item: url },
      ],
    },
  ];
}

/** Absolute URL for a root-relative site path. Leaves http(s) URLs unchanged. */
export function absoluteSiteUrl(src: string): string {
  if (/^https?:\/\//i.test(src)) return src;
  return `${SITE_URL}${src.startsWith("/") ? src : `/${src}`}`;
}

type ScheduledHero = { src: string; alt: string; width: number; height: number };

function organizationNode(withLogo: boolean): Json {
  return {
    "@type": "Organization",
    name: BUSINESS_JSONLD.name,
    legalName: BUSINESS_JSONLD.legalName,
    sameAs: [...BUSINESS_JSONLD.sameAs],
    hasMap: BUSINESS_JSONLD.hasMap,
    url: `${SITE_URL}/`,
    ...(withLogo
      ? { logo: { "@type": "ImageObject", url: `${SITE_URL}/apple-touch-icon.png` } }
      : {}),
  };
}

/** BlogPosting + BreadcrumbList for an in-house post. Author and publisher are EZ Haulaway. */
export function scheduledArticleJsonLd(p: {
  slug: string;
  title: string;
  meta_description: string;
  publish_at: string;
  hero: ScheduledHero | null;
}): Json {
  const url = `${SITE_URL}/blog/${p.slug}`;
  const image: Json = p.hero
    ? {
        "@type": "ImageObject",
        url: absoluteSiteUrl(p.hero.src),
        width: p.hero.width,
        height: p.hero.height,
        caption: p.hero.alt,
      }
    : `${SITE_URL}/apple-touch-icon.png`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      url,
      headline: p.title,
      description: p.meta_description,
      image,
      datePublished: p.publish_at,
      dateModified: p.publish_at,
      author: organizationNode(false),
      publisher: organizationNode(true),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: p.title, item: url },
      ],
    },
  ];
}

/** FAQPage for an in-house post, or null when the post has no questions. */
export function scheduledFaqJsonLd(
  slug: string,
  faqs: readonly { question: string; answer: string }[],
): Json | null {
  if (faqs.length === 0) return null;
  const url = `${SITE_URL}/blog/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
