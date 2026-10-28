import { SITE_URL } from "@/content/site";

type PostLike = {
  slug: string;
  title: string;
  meta_description: string | null;
  hero_image_url: string | null;
  article_created_at: string | null;
  article_updated_at: string | null;
};

export const BLOG_AUTHOR_NAME = "Ben";

export function blogDates(p: Pick<PostLike, "article_created_at" | "article_updated_at">) {
  const published = p.article_created_at ?? p.article_updated_at;
  const modified = p.article_updated_at ?? p.article_created_at;
  return { published, modified };
}

/** BlogPosting + BreadcrumbList for a post, built from the post's own fields. */
export function blogSchemas(p: PostLike): unknown[] {
  const url = `${SITE_URL}/blog/${p.slug}`;
  const { published, modified } = blogDates(p);
  const publisher = { "@type": "Organization", name: "EZ Haulaway LLC", url: `${SITE_URL}/`, logo: { "@type": "ImageObject", url: `${SITE_URL}/apple-touch-icon.png` } };
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
      author: { "@type": "Person", name: BLOG_AUTHOR_NAME, worksFor: { "@type": "Organization", name: "EZ Haulaway LLC" } },
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
