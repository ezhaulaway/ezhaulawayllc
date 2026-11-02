import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { BLOG_CALLOUTS, BLOG_RELATED, BLOG_TITLES, LINK_LABELS, PAGE_GUIDES } from "@/content/blog-links";

/** Renders an internal path as a router link (plain <a href> in the server HTML). */
function SiteLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  const service = href.match(/^\/services\/([^/]+)$/);
  if (service) return <Link to="/services/$slug" params={{ slug: service[1]! }} className={className}>{children}</Link>;
  const city = href.match(/^\/service-areas\/([^/]+)$/);
  if (city) return <Link to="/service-areas/$city" params={{ city: city[1]! }} className={className}>{children}</Link>;
  return <Link to={href as "/pricing"} className={className}>{children}</Link>;
}

/** Top-of-post quote prompt for posts listed in BLOG_CALLOUTS. Returns null for every other post. */
export function BlogCallout({ slug }: { slug: string }) {
  const c = BLOG_CALLOUTS[slug];
  if (!c) return null;
  return (
    <aside className="mt-6 rounded-lg border border-border bg-muted/50 p-5" aria-label="Get a quote">
      <p className="font-semibold text-foreground">{c.text}</p>
      <p className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
        <SiteLink href={c.href} className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">
          {c.label} <ArrowRight className="size-4" />
        </SiteLink>
        <Link to="/instant-estimate" className="inline-flex items-center gap-2 font-bold text-foreground hover:text-primary">
          Get a free quote <ArrowRight className="size-4" />
        </Link>
      </p>
    </aside>
  );
}

/** Bottom-of-post box: hand-picked service links plus a quote link. Returns null for unmapped posts. */
export function BlogRelatedServices({ slug }: { slug: string }) {
  const links = BLOG_RELATED[slug];
  if (!links) return null;
  return (
    <section className="border-t border-border py-12 sm:py-16" aria-labelledby="blog-related-services">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <h2 id="blog-related-services" className="text-2xl font-extrabold">Related services</h2>
        <ul className="mt-5 grid gap-3">
          {links.map((href) => (
            <li key={href}>
              <SiteLink href={href} className="group inline-flex items-center gap-2 font-semibold text-primary hover:underline">
                {LINK_LABELS[href] ?? href} <ArrowRight className="size-4" />
              </SiteLink>
            </li>
          ))}
          <li>
            <Link to="/instant-estimate" className="group inline-flex items-center gap-2 font-bold text-foreground hover:text-primary">
              Get a free quote <ArrowRight className="size-4" />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

/** "Helpful guides" block linking a page to its matching blog posts. Returns null when none are mapped. */
export function HelpfulGuides({ path }: { path: string }) {
  const slugs = PAGE_GUIDES[path];
  if (!slugs?.length) return null;
  return (
    <section className="border-t border-border py-10" aria-labelledby="helpful-guides">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <h2 id="helpful-guides" className="text-xl font-extrabold">Helpful guides</h2>
        <ul className="mt-4 grid gap-2.5">
          {slugs.map((slug) => (
            <li key={slug}>
              <Link to="/blog/$slug" params={{ slug }} className="font-semibold text-primary hover:underline">
                {BLOG_TITLES[slug] ?? slug}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
