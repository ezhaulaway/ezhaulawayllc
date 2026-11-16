import { createFileRoute } from "@tanstack/react-router";
import { blogSitemapXml } from "@/lib/blog-feed";

// Dynamic sitemap for blog posts (main site pages live in public/sitemap.xml).
// listBlogPosts includes live in-house posts, and a same-slug rewrite replaces the imported row.
export const Route = createFileRoute("/blog-sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const { listBlogPosts } = await import("@/lib/blog.functions");
        const posts = await listBlogPosts();
        return new Response(blogSitemapXml(posts), {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
