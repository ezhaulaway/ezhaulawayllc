/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageShell, CtaBand } from "@/components/site-chrome";
import { SITE_URL } from "@/content/site";
import { NextSteps, blogNextSteps } from "@/components/next-steps";
import { BlogRelatedServices } from "@/components/blog-links";
import { BLOG_RELATED } from "@/content/blog-links";
import { getBlogPost } from "@/lib/blog.functions";

type Json = unknown;

function repoint(node: Json, url: string): Json {
  if (Array.isArray(node)) return node.map((n) => repoint(n, url));
  if (!node || typeof node !== "object") return node;
  const o: any = {};
  for (const [k, v] of Object.entries(node as Record<string, Json>)) {
    o[k] = k === "author" || k === "publisher" ? v : repoint(v, url);
  }
  const type = o["@type"];
  const types = Array.isArray(type) ? type : [type];
  if (types.some((t) => typeof t === "string" && /Article|BlogPosting|NewsArticle/.test(t))) {
    o.url = url;
    o.mainEntityOfPage = { "@type": "WebPage", "@id": url };
  }
  if (types.includes("WebPage") && typeof o["@id"] === "string") {
    o["@id"] = url;
    if ("url" in o) o.url = url;
  }
  if (types.includes("BreadcrumbList") && Array.isArray(o.itemListElement) && o.itemListElement.length) {
    const items = o.itemListElement as any[];
    const last = { ...items[items.length - 1], item: url };
    o.itemListElement = [...items.slice(0, -1), last];
  }
  return o;
}

const ser = (d: Json) => JSON.stringify(d).replace(/</g, "\\u003c");

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const res = await getBlogPost({ data: { slug: params.slug } });
    if (!res.post) {
      if (res.redirectTo) throw redirect({ to: "/blog/$slug", params: { slug: res.redirectTo }, statusCode: 301 });
      throw notFound();
    }
    return res.post;
  },
  head: ({ loaderData: p }) => {
    if (!p) return { meta: [{ title: "Article not found — EZ Haulaway Blog" }] };
    const url = `${SITE_URL}/blog/${p.slug}`;
    const scripts = [p.json_ld, p.faq_json_ld]
      .filter((x) => x != null)
      .map((x) => ({ type: "application/ld+json", children: ser(repoint(x, url)) }));
    const desc = p.meta_description ?? "";
    return {
      meta: [
        { title: `${p.title} | EZ Haulaway Blog` },
        { name: "description", content: desc },
        { property: "og:title", content: p.title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        ...(p.hero_image_url
          ? [
              { property: "og:image", content: p.hero_image_url },
              { name: "twitter:image", content: p.hero_image_url },
            ]
          : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: p.title },
        { name: "twitter:description", content: desc },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts,
    };
  },
  notFoundComponent: () => (
    <PageShell>
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="text-3xl font-extrabold">Article not found</h1>
        <Link to="/blog" className="mt-6 inline-block font-semibold text-primary underline">Back to the blog</Link>
      </div>
    </PageShell>
  ),
  component: BlogPost,
});

function BlogPost() {
  const p = Route.useLoaderData();
  return (
    <PageShell>
      <article lang={p.language_code ?? undefined} className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
          <ArrowLeft className="size-4" /> Back to blog
        </Link>
        <div className="blog-prose mt-8" dangerouslySetInnerHTML={{ __html: p.content_html ?? "" }} />
      </article>
      {BLOG_RELATED[p.slug] ? (
        <BlogRelatedServices slug={p.slug} />
      ) : (
        <NextSteps title="Related Services" steps={blogNextSteps(`${p.title} ${p.meta_description ?? ""}`)} />
      )}
      <CtaBand />
    </PageShell>
  );
}
