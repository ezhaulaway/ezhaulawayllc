import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CtaBand,
  FaqAccordion,
  InlineQuoteForm,
  PageShell,
  SectionHeader,
} from "@/components/site-chrome";
import { locationBySlug, locations } from "@/content/locations";
import { services } from "@/content/services";
import { PHONE, PHONE_TEL, SITE_URL, processSteps } from "@/content/site";

export const Route = createFileRoute("/service-areas/$city")({
  loader: ({ params }) => {
    const location = locationBySlug(params.city);
    if (!location) throw notFound();
    return { location };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Area not found — EZ Haulaway" }, { name: "robots", content: "noindex" }] };
    }
    const { location } = loaderData;
    const pageTitle = location.metaTitle ?? `Junk Removal in ${location.city}, CO | EZ Haulaway`;
    const pageDescription =
      location.metaDescription ??
      `Local junk removal and hauling in ${location.city}, Colorado. Furniture, appliances, hot tubs, cleanouts and debris hauled away by EZ Haulaway. Free quotes.`;
    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: pageDescription },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: pageDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${SITE_URL}/service-areas/${params.city}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/service-areas/${params.city}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "EZ Haulaway LLC",
            description: pageDescription,
            telephone: PHONE,
            url: `${SITE_URL}/service-areas/${params.city}`,
            areaServed: { "@type": "City", name: `${location.city}, CO` },
            address: { "@type": "PostalAddress", addressLocality: "Parker", addressRegion: "CO", addressCountry: "US" },
          }),
        },
      ],
    };
  },
  component: CityPage,
  notFoundComponent: CityNotFound,
});

function CityNotFound() {
  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="text-3xl font-extrabold">We couldn’t find that area</h1>
        <p className="mt-4 text-muted-foreground">See every city we serve across the Denver metro area.</p>
        <Button asChild className="mt-8" size="lg">
          <Link to="/service-areas">View Service Areas</Link>
        </Button>
      </div>
    </PageShell>
  );
}

function CityPage() {
  const { location } = Route.useLoaderData();
  const top = location.topServices
    .map((slug) => services.find((item) => item.slug === slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const faqs = [
    [`Do you charge extra to come to ${location.city}?`, `No. ${location.city} is part of our regular service area, so there's no separate trip charge built into your quote.`],
    ["How fast can you get here?", "Openings vary week to week, but we often have something within a few days. Call or text for the soonest slot."],
    ["Do I have to move anything to the curb?", "No. Our crew carries everything out from wherever it sits — basement, backyard, upstairs bedroom, or storage unit."],
    [`What do you do with the junk after you leave ${location.city}?`, "We sort for donation and recycling wherever we can, and take the rest to the proper disposal facility."],
  ] as const;

  return (
    <PageShell>
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-5 pt-8 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="px-2">/</span>
            <Link to="/service-areas" className="hover:text-foreground">Service Areas</Link>
            <span className="px-2">/</span>
            <span className="font-semibold text-foreground">{location.city}</span>
          </nav>
        </div>
        <div className="mx-auto max-w-7xl px-5 py-12 sm:py-16 lg:px-8">
          <div className="flex items-center gap-2 text-primary">
            <MapPin className="size-4" />
            <span className="text-xs font-bold uppercase tracking-[0.16em]">{location.county}</span>
          </div>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-[1.1] sm:text-5xl">
            Junk Removal in {location.city}, CO
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{location.intro}</p>
          <p className="mt-4 max-w-2xl leading-8 text-muted-foreground">{location.local}</p>
          <div className="mt-8">
            <Button asChild size="lg" variant="outline">
              <a href={`tel:${PHONE_TEL}`}>
                <Phone /> Call or Text {PHONE}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <SectionHeader
              eyebrow={`Services in ${location.city}`}
              title={`What We Haul in ${location.city}`}
              text="These are the jobs we get called for most around here — but we take just about anything two people can carry."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {top.map((service) => (
                <Link
                  key={service.slug}
                  to="/services/$slug"
                  params={{ slug: service.slug }}
                  className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary"
                >
                  <h3 className="font-display text-lg font-bold">{service.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{service.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
                    Learn more <ArrowRight className="size-4" />
                  </span>
                </Link>
              ))}
            </div>
            <Link
              to="/what-we-take"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary"
            >
              See everything we take <ArrowRight className="size-4" />
            </Link>
          </div>
          <InlineQuoteForm />
        </div>
      </section>

      <section className="bg-secondary py-16 text-secondary-foreground sm:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">How it works</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
            Booking a Haul in {location.city}
          </h2>
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
          <SectionHeader eyebrow="Common questions" title={`${location.city} Questions`} />
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <section className="border-y border-border bg-muted py-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="font-display font-bold">Nearby areas we also serve</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {locations
              .filter((item) => location.nearby.includes(item.slug))
              .map((item) => (
                <Link
                  key={item.slug}
                  to="/service-areas/$city"
                  params={{ city: item.slug }}
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                >
                  {item.city}
                </Link>
              ))}
          </div>
        </div>
      </section>

      <CtaBand title={`Ready to Clear It Out in ${location.city}?`} />
    </PageShell>
  );
}
