import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/content/site";

// Dynamic sitemap for blog posts (main site pages live in public/sitemap.xml).
export const Route = createFileRoute("/blog-sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const { listBlogPosts } = await import("@/lib/blog.functions");
        const posts = await listBlogPosts();
        const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
        const urls = [
          `<url><loc>${SITE_URL}/blog</loc></url>`,
          ...posts.map(
            (p) =>
              `<url><loc>${esc(`${SITE_URL}/blog/${p.slug}`)}</loc>${
                p.article_updated_at ? `<lastmod>${new Date(p.article_updated_at).toISOString()}</lastmod>` : ""
              }</url>`,
          ),
        ];
        return new Response(
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`,
          { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } },
        );
      },
    },
  },
});
