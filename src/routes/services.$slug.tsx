import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CtaBand,
  FaqAccordion,
  InlineQuoteForm,
  PageShell,
  SectionHeader,
} from "@/components/site-chrome";
import { serviceBySlug, services } from "@/content/services";
import { locations, priorityLocations } from "@/content/locations";
import { PHONE, PHONE_TEL, SITE_URL, BUSINESS_SCHEMA, processSteps } from "@/content/site";
import wordmarkAsset from "@/assets/ez-haulaway-wordmark.png.asset.json";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = serviceBySlug(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Service not found — EZ Haulaway" }, { name: "robots", content: "noindex" }] };
    }
    const { service } = loaderData;
    return {
      meta: [
        { title: service.metaTitle },
        { name: "description", content: service.metaDescription },
        { property: "og:title", content: service.metaTitle },
        { property: "og:description", content: service.metaDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${SITE_URL}/services/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/services/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.name,
            serviceType: service.name,
            description: service.metaDescription,
            url: `${SITE_URL}/services/${params.slug}`,
            areaServed: locations.map((location) => ({ "@type": "City", name: `${location.city}, CO` })),
            provider: BUSINESS_SCHEMA,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: "What We Take", item: `${SITE_URL}/what-we-take` },
              { "@type": "ListItem", position: 3, name: service.name, item: `${SITE_URL}/services/${params.slug}` },
            ],
          }),
        },
      ],
    };
  },
  component: ServicePage,
  notFoundComponent: ServiceNotFound,
});

function ServiceNotFound() {
  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="text-3xl font-extrabold">We couldn’t find that service</h1>
        <p className="mt-4 text-muted-foreground">Browse everything we haul, or call us and describe the job.</p>
        <Button asChild className="mt-8" size="lg">
          <Link to="/what-we-take">See What We Take</Link>
        </Button>
      </div>
    </PageShell>
  );
}

function ServicePage() {
  const { service } = Route.useLoaderData();
  const related = service.related
    .map((slug) => services.find((item) => item.slug === slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <PageShell>
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-5 pt-8 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="px-2">/</span>
            <Link to="/what-we-take" className="hover:text-foreground">What We Take</Link>
            <span className="px-2">/</span>
            <span className="font-semibold text-foreground">{service.name}</span>
          </nav>
        </div>
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="min-w-0">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">{service.name}</p>
            <h1 className="mt-4 max-w-2xl text-3xl font-extrabold leading-[1.1] text-foreground sm:text-5xl">
              {service.h1}
            </h1>
            {service.intro.map((paragraph) => (
              <p key={paragraph} className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
                {paragraph}
              </p>
            ))}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${PHONE_TEL}`}>
                  <Phone /> Call or Text {PHONE}
                </a>
              </Button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border border-border bg-muted">
            <img
              src={service.image}
              alt={service.imageAlt}
              width={1024}
              height={768}
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute right-3 top-3 rounded-md border border-secondary-foreground/20 bg-secondary/90 px-3 py-2 shadow-lg backdrop-blur-sm sm:right-4 sm:top-4">
              <img
                src={wordmarkAsset.url}
                alt="EZ Haulaway"
                width={1254}
                height={302}
                className="h-auto w-28 sm:w-36"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <SectionHeader eyebrow="What's included" title={`What We Haul With ${service.name}`} />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-semibold">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-12 grid gap-8">
              {service.sections.map((section) => (
                <div key={section.heading}>
                  <h3 className="text-xl font-bold">{section.heading}</h3>
                  <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">{section.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <InlineQuoteForm />
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16 text-secondary-foreground sm:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Simple from start to finish</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">How the Job Goes</h2>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {processSteps.map(([number, heading, text]) => (
              <article key={number} className="border-t border-secondary-foreground/20 pt-6">
                <span className="font-display text-5xl font-extrabold text-primary">{number}</span>
                <h3 className="mt-7 text-xl font-bold">{heading}</h3>
                <p className="mt-3 max-w-sm leading-7 text-secondary-foreground/70">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
          <SectionHeader
            eyebrow="Common questions"
            title={`${service.name} Questions`}
            text="Still unsure about your specific job? Call or text and we'll talk it through."
          />
          <FaqAccordion faqs={service.faqs} />
        </div>
      </section>

      <section className="border-y border-border bg-muted py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader eyebrow="Related services" title="You Might Also Need" />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                to="/services/$slug"
                params={{ slug: item.slug }}
                className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary"
              >
                <h3 className="font-display text-lg font-bold">{item.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.summary}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
                  Learn more <ArrowRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-12 border-t border-border pt-10">
            <h3 className="font-display text-xl font-bold">
              {service.name} by City
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Same crew, same pricing, same week. Pick your town to see what we haul most there.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {priorityLocations.map((location) => (
                <Link
                  key={location.slug}
                  to="/service-areas/$city"
                  params={{ city: location.slug }}
                  className="inline-flex items-center justify-between gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-semibold transition-colors hover:border-primary"
                >
                  <span>
                    {service.name} in {location.city}, CO
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-primary" />
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-10">
            <p className="font-display font-bold">Available across the Denver metro area</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {locations.map((location) => (
                <Link
                  key={location.slug}
                  to="/service-areas/$city"
                  params={{ city: location.slug }}
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                >
                  {location.city}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <SectionHeader
            eyebrow="The experience"
            title={`What to Expect When You Book ${service.name}`}
            text="Every job follows the same straightforward process — so you always know where things stand."
          />
          <div className="mt-10 space-y-6 leading-8 text-muted-foreground">
            <p>
              It starts with a photo or a quick call. We look at what you have, give you a straightforward price, and
              schedule a time that works for you — often within a few days. When our crew arrives, we walk the job
              with you and confirm the price before anything is loaded, so the number you approved is the number you pay.
            </p>
            <p>
              From there, you don't lift a thing. We handle the carrying, the stairs, the tight corners, the loading,
              and the haul away — then sweep the area before we leave. Usable items are sorted for donation and
              recycling wherever we can, so less of your load ends up in a landfill.
            </p>
            <p>
              What customers across Parker, Castle Rock, and the Denver metro area mention most is the feeling
              afterward: the space is back, the project is finally off the to-do list, and it took one visit instead
              of a whole weekend. That's how {service.name.toLowerCase()} should feel — easy from the first call to
              the final sweep.
            </p>
          </div>
        </div>
      </section>

      <CtaBand title={`Need ${service.name} Today?`} text="Send photos or give us a call. We'll get you a straight answer fast." />
    </PageShell>
  );
}
