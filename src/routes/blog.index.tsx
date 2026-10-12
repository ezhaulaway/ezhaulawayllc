import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { PageHero, PageShell, CtaBand } from "@/components/site-chrome";
import { SITE_URL } from "@/content/site";
import { listBlogPosts } from "@/lib/blog.functions";

const postsQuery = queryOptions({ queryKey: ["blog", "list"], queryFn: () => listBlogPosts() });

const title = "Junk Removal Blog — Hauling Tips from EZ Haulaway";
const description =
  "Practical junk removal, cleanout and hauling advice for Parker, Castle Rock and the Denver metro from the EZ Haulaway crew.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/blog` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(postsQuery),
  component: BlogIndex,
});

function fmt(d: string | null) {
  return d ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "";
}

function BlogIndex() {
  const { data: posts } = useSuspenseQuery(postsQuery);
  return (
    <PageShell>
      <PageHero
        eyebrow="Blog"
        title="Junk Removal Tips & Local Hauling Advice"
        text="Straight answers on cleanouts, disposal and getting stuff out of your way across the Denver metro."
      />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-center text-lg text-muted-foreground">New articles are on the way — check back soon.</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <Link
                  key={p.id}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  lang={p.language_code ?? undefined}
                  className="group overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg"
                >
                  {p.hero_image_url ? (
                    <img src={p.hero_image_url} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />
                  ) : null}
                  <div className="p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">{fmt(p.article_created_at)}</p>
                    <h2 className="mt-2 text-xl font-extrabold leading-snug text-foreground group-hover:text-primary">{p.title}</h2>
                    {p.meta_description ? <p className="mt-3 line-clamp-3 text-muted-foreground">{p.meta_description}</p> : null}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <CtaBand />
    </PageShell>
  );
}
