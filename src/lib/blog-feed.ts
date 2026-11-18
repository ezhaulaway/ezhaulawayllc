import { SITE_URL } from "@/content/site";

export type BlogListItem = {
  id: number;
  slug: string;
  title: string;
  meta_description: string | null;
  hero_image_url: string | null;
  hero_image_alt: string | null;
  hero_image_width: number | null;
  hero_image_height: number | null;
  language_code: string | null;
  article_created_at: string | null;
  article_updated_at: string | null;
};

type ListSource = {
  id: number;
  slug: string;
  title: string;
  meta_description: string | null;
  hero_image_url: string | null;
  language_code: string | null;
  article_created_at: string | null;
  article_updated_at: string | null;
  hero_image_alt?: string | null;
  hero_image_width?: number | null;
  hero_image_height?: number | null;
};

export function toBlogListItem(row: ListSource): BlogListItem {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    meta_description: row.meta_description,
    hero_image_url: row.hero_image_url,
    hero_image_alt: row.hero_image_alt ?? null,
    hero_image_width: row.hero_image_width ?? null,
    hero_image_height: row.hero_image_height ?? null,
    language_code: row.language_code,
    article_created_at: row.article_created_at,
    article_updated_at: row.article_updated_at,
  };
}

/** Live in-house posts replace an imported post with the same slug. One card, one sitemap URL. */
export function mergeBlogPosts<T extends { slug: string; article_created_at: string | null }>(
  imported: readonly T[],
  scheduled: readonly T[],
): T[] {
  const replaced = new Set(scheduled.map((post) => post.slug));
  return [...imported.filter((post) => !replaced.has(post.slug)), ...scheduled].sort(
    (a, b) => Date.parse(b.article_created_at ?? "0") - Date.parse(a.article_created_at ?? "0"),
  );
}

export function blogSitemapXml(
  posts: readonly { slug: string; article_updated_at: string | null }[],
): string {
  const esc = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const urls = [
    `<url><loc>${SITE_URL}/blog</loc></url>`,
    ...posts.map((post) => {
      const loc = `${SITE_URL}/blog/${post.slug}`;
      const lastmod = post.article_updated_at
        ? `<lastmod>${new Date(post.article_updated_at).toISOString()}</lastmod>`
        : "";
      return `<url><loc>${esc(loc)}</loc>${lastmod}</url>`;
    }),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`;
}
