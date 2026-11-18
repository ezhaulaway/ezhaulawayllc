/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageShell, CtaBand } from "@/components/site-chrome";
import { HOURS_TEXT, PHONE, SITE_URL } from "@/content/site";
import { NextSteps, blogNextSteps } from "@/components/next-steps";
import { BlogCallout, BlogRelatedServices } from "@/components/blog-links";
import { BLOG_HEAD_OVERRIDES, BLOG_RELATED } from "@/content/blog-links";
import { getBlogPost } from "@/lib/blog.functions";
import { cleanHtml, insertPostHero, optimizeBlogImages } from "@/lib/blog-html";
import { fillBlogPriceJson, fillBlogPriceText } from "@/lib/blog-ez-prices";
import { getGuide, priceText } from "@/lib/price-store";
import { usePriceGuide } from "@/hooks/use-price-guide";
import { articleHero } from "@/content/scheduled-posts";
import {
  applyBusinessIdentity,
  absoluteSiteUrl,
  BLOG_BYLINE,
  blogDates,
  blogSchemas,
  normalizeArticleAuthors,
} from "@/lib/blog-schema";

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
  if (
    types.includes("BreadcrumbList") &&
    Array.isArray(o.itemListElement) &&
    o.itemListElement.length
  ) {
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
      if (res.redirectTo)
        throw redirect({ to: "/blog/$slug", params: { slug: res.redirectTo }, statusCode: 301 });
      throw notFound();
    }
    return res.post;
  },
  head: ({ loaderData: p }) => {
    if (!p) return { meta: [{ title: "Article not found — EZ Haulaway Blog" }] };
    const url = `${SITE_URL}/blog/${p.slug}`;
    // Posts synced without their own structured data get BlogPosting + BreadcrumbList from the post fields.
    const guide = getGuide();
    const override = BLOG_HEAD_OVERRIDES[p.slug];
    const title = override?.title ?? `${p.title} | EZ Haulaway Blog`;
    const desc = fillBlogPriceText(override?.description ?? p.meta_description ?? "", guide);
    const generated = p.json_ld == null ? blogSchemas({ ...p, meta_description: desc }) : [];
    const hero = articleHero(p);
    const stored =
      p.id < 0 && Array.isArray(p.json_ld) ? p.json_ld : p.json_ld == null ? [] : [p.json_ld];
    const scripts = [...stored, ...(p.faq_json_ld == null ? [] : [p.faq_json_ld])]
      .map((x) => ({
        type: "application/ld+json",
        children: ser(
          applyBusinessIdentity(normalizeArticleAuthors(repoint(fillBlogPriceJson(x, guide), url))),
        ),
      }))
      .concat(
        generated.map((x) => ({
          type: "application/ld+json",
          children: ser(applyBusinessIdentity(normalizeArticleAuthors(x))),
        })),
      );
    const image = p.hero_image_url ? absoluteSiteUrl(p.hero_image_url) : null;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: override?.title ?? p.title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        ...(image
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: override?.title ?? p.title },
        { name: "twitter:description", content: desc },
      ],
      links: [
        { rel: "canonical", href: url },
        ...(hero
          ? [
              {
                rel: "preload" as const,
                as: "image" as const,
                href: hero.src,
                fetchPriority: "high" as const,
              },
            ]
          : []),
      ],
      scripts,
    };
  },
  notFoundComponent: () => (
    <PageShell>
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="text-3xl font-extrabold">Article not found</h1>
        <Link to="/blog" className="mt-6 inline-block font-semibold text-primary underline">
          Back to the blog
        </Link>
      </div>
    </PageShell>
  ),
  component: BlogPost,
});

function BlogPost() {
  const p = Route.useLoaderData();
  const guide = usePriceGuide(); // re-render when live prices change
  const hero = articleHero(p);
  return (
    <PageShell>
      <article
        lang={p.language_code ?? undefined}
        className="mx-auto max-w-3xl px-5 py-12 sm:py-16"
      >
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="size-4" /> Back to blog
        </Link>
        <PostDates created={p.article_created_at} updated={p.article_updated_at} />
        <BlogCallout slug={p.slug} />
        <div
          className="blog-prose mt-8"
          dangerouslySetInnerHTML={{
            __html: fillBlogPriceText(
              optimizeBlogImages(insertPostHero(cleanHtml(p.content_html ?? ""), hero)),
              guide,
            ),
          }}
        />
        {p.faqs && p.faqs.length > 0 ? (
          <section
            className="mt-12 border-t border-border pt-10"
            aria-labelledby="post-faq-heading"
          >
            <h2 id="post-faq-heading" className="text-2xl font-extrabold text-foreground">
              Common questions
            </h2>
            <div className="mt-6 space-y-6">
              {p.faqs.map((item) => (
                <section key={item.question}>
                  <h3 className="text-lg font-bold text-foreground">
                    {fillBlogPriceText(item.question, guide)}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {fillBlogPriceText(item.answer, guide)}
                  </p>
                </section>
              ))}
            </div>
          </section>
        ) : null}
      </article>
      {BLOG_RELATED[p.slug] ? (
        <BlogRelatedServices slug={p.slug} />
      ) : (
        <NextSteps
          title="Related Services"
          steps={blogNextSteps(`${p.title} ${p.meta_description ?? ""}`)}
        />
      )}
      <CtaBand
        title="Need it gone? Get a free photo quote."
        text={priceText(
          `Send a few photos or call or text ${PHONE}. Hours: ${HOURS_TEXT}. Small pickups start at [[min]].`,
        )}
      />
    </PageShell>
  );
}

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Denver",
  });

function PostDates({ created, updated }: { created: string | null; updated: string | null }) {
  const { published, modified } = blogDates({
    article_created_at: created,
    article_updated_at: updated,
  });
  if (!published) return null;
  const showUpdated = modified && fmtDate(modified) !== fmtDate(published);
  return (
    <p className="mt-6 text-sm text-muted-foreground">
      {BLOG_BYLINE} · Published <time dateTime={published}>{fmtDate(published)}</time>
      {showUpdated ? (
        <>
          {" "}
          · Updated <time dateTime={modified!}>{fmtDate(modified!)}</time>
        </>
      ) : null}
    </p>
  );
}
