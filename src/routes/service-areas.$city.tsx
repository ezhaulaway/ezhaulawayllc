import { CityServiceLink } from "@/components/city-service-link";
import { heroPreload, responsiveImage } from "@/lib/city-images";
import { isLiveCity, isLiveCityService } from "@/content/live-pages";
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
import { locations } from "@/content/locations";
import { locationPhoto } from "@/content/location-images";
import { services } from "@/content/services";
import { PHONE, PHONE_TEL, SITE_URL, BUSINESS_SCHEMA, processSteps } from "@/content/site";
import { rich } from "@/components/prose-section";
import { CITY_BENEFIT, fitTitle, neighborhoodList } from "@/content/local-seo";

export const Route = createFileRoute("/service-areas/$city")({
  loader: async ({ params }) => {
    const { locationBySlug, SPECIALTY_SERVICE_SLUGS } = await import("@/content/locations");
    const location = locationBySlug(params.city);
    if (!location || !isLiveCity(params.city)) throw notFound();
    const { services } = await import("@/content/services");
    const specialtyServices = SPECIALTY_SERVICE_SLUGS.map((slug) => ({
      slug,
      name: services.find((service) => service.slug === slug)?.name ?? slug,
    }));
    return { location, specialtyServices };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Area not found — EZ Haulaway" }, { name: "robots", content: "noindex" }] };
    }
    const { location } = loaderData;
    const pageTitle = fitTitle(`Junk Removal in ${location.city}, CO - ${CITY_BENEFIT} | EZ Haulaway`, `Junk Removal in ${location.city}, CO - ${CITY_BENEFIT}`, `Junk Removal in ${location.city}, CO | EZ Haulaway`);
    const pageDescription =
      location.metaDescription ??
      `Local junk removal and hauling in ${location.city}, Colorado. Furniture, appliances, hot tubs, cleanouts and debris hauled away by EZ Haulaway. Free quotes.`;
    const photo = locationPhoto(location.slug);
    const photoUrl = photo?.src.startsWith("https://") ? photo.src : undefined;
    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: pageDescription },
        { property: "og:title", content: pageTitle },
        { name: "twitter:title", content: pageTitle },
        { property: "og:description", content: pageDescription },
        { name: "twitter:description", content: pageDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${SITE_URL}/service-areas/${params.city}` },
        { name: "twitter:card", content: "summary_large_image" },
        ...(photoUrl
          ? [
              { property: "og:image", content: photoUrl },
              { name: "twitter:image", content: photoUrl },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/service-areas/${params.city}` }, ...(photo ? [heroPreload(photo.src)] : [])],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            ...BUSINESS_SCHEMA,
            "@id": `${SITE_URL}/service-areas/${params.city}#localbusiness`,
            description: pageDescription,
            url: `${SITE_URL}/service-areas/${params.city}`,
            image: photoUrl ?? BUSINESS_SCHEMA.image,
            areaServed: { "@type": "City", name: `${location.city}, CO` },
            makesOffer: loaderData.specialtyServices.map((service) => {
              return {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: `${service.name} in ${location.city}, CO`,
                  url: `${SITE_URL}/services/${service.slug}`,
                },
              };
            }),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Service Areas", item: `${SITE_URL}/service-areas` },
              { "@type": "ListItem", position: 3, name: location.city, item: `${SITE_URL}/service-areas/${params.city}` },
            ],
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

const INSTANT_ESTIMATE_CITIES = ["denver", "parker", "castle-rock"];

function CityPage() {
  const { location, specialtyServices } = Route.useLoaderData();
  const pushInstantEstimate = INSTANT_ESTIMATE_CITIES.includes(location.slug);
  const photo = locationPhoto(location.slug);
  const top = location.topServices
    .map((slug) => services.find((item) => item.slug === slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const specialty = specialtyServices
    .map(({ slug }) => services.find((item) => item.slug === slug))
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
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <div className="flex items-center gap-2 text-primary">
              <MapPin className="size-4" />
              <span className="text-xs font-bold uppercase tracking-[0.16em]">{location.county}</span>
            </div>
            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-[1.1] sm:text-5xl">
              {`Junk Removal in ${location.city}, CO`}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{rich(location.intro)}</p>
            <p className="mt-4 max-w-2xl leading-8 text-muted-foreground">{location.local}</p>
            {neighborhoodList(location.slug) && (
              <p className="mt-4 max-w-2xl leading-8 text-muted-foreground">
                We haul from homes and businesses across {location.city}, including {neighborhoodList(location.slug)}.
              </p>
            )}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {pushInstantEstimate && (
                <Button asChild size="lg">
                  <Link to="/instant-estimate">Get My Free Instant Estimate</Link>
                </Button>
              )}
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${PHONE_TEL}`}>
                  <Phone /> Call or Text {PHONE}
                </a>
              </Button>
            </div>
            {pushInstantEstimate && (
              <p className="mt-4 text-sm font-medium text-muted-foreground">
                Free · Instant · No phone call required — snap a photo or describe your items and get a price
                for {location.city} junk removal in seconds.
              </p>
            )}
          </div>
          {photo && (
            <figure className="overflow-hidden rounded-xl border border-border bg-muted">
              <img
                {...responsiveImage(photo.src)}
                fetchPriority="high"
                loading="eager"
                alt={photo.alt}
                width={1200}
                height={800}
                className="aspect-[3/2] w-full object-cover"
              />
              <figcaption className="px-5 py-4 text-sm leading-6 text-muted-foreground">
                {photo.caption}
              </figcaption>
            </figure>
          )}
        </div>
      </section>

      {location.content && location.content.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-5 lg:px-8">
            {location.content.map((section) => (
              <div key={section.heading} className="mt-10 first:mt-0">
                <h2 className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="mt-5 leading-8 text-muted-foreground">
                    {rich(paragraph)}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-6 space-y-4">
                    {section.list.map((item) => (
                      <li key={item.title} className="rounded-lg border border-border bg-card p-5">
                        <h3 className="font-bold">{item.title}</h3>
                        <p className="mt-1 leading-7 text-muted-foreground">{rich(item.text)}</p>
                      </li>
                    ))}
                  </ul>
                )}
                {section.closing && (
                  <p className="mt-6 text-lg font-semibold leading-8">{section.closing}</p>
                )}
                 {section.serviceLinks && (
                   <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                     {section.serviceLinks.map((service) => (
                       <li key={service.slug}>
                         <CityServiceLink city={location.slug} service={service.slug}
                           className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
                         >
                           {service.label}<ArrowRight className="size-4 shrink-0" />
                         </CityServiceLink>
                       </li>
                     ))}
                   </ul>
                 )}
              </div>
            ))}
          </div>
        </section>
      )}

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
                <article
                  key={service.slug}
                  className="relative rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary"
                >
                  <h3 className="font-display text-lg font-bold">
                    <CityServiceLink city={location.slug} service={service.slug}
                      className="after:absolute after:inset-0 after:content-['']"
                    >
                      {service.name} in {location.city}, CO
                    </CityServiceLink>
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{service.summary}</p>
                  <span aria-hidden="true" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
                    Learn more <ArrowRight className="size-4" />
                  </span>
                </article>
              ))}
            </div>
            <Link
              to="/what-we-take"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary"
            >
              See everything we take <ArrowRight className="size-4" />
            </Link>
          </div>
          <div>
            {pushInstantEstimate && (
              <div className="mb-6 rounded-lg border border-primary/40 bg-primary/5 p-6">
                <p className="font-display text-lg font-bold">Need a price right now?</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Snap a photo or just describe your items and get an instant online estimate for{" "}
                  {location.city} junk removal — no waiting on a callback.
                </p>
                <Button asChild size="lg" className="mt-4 w-full">
                  <Link to="/instant-estimate">Get My Free Instant Estimate</Link>
                </Button>
              </div>
            )}
            <InlineQuoteForm />
          </div>
        </div>
      </section>


      <section className="border-y border-border bg-muted py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader
            eyebrow={`Specialty removal in ${location.city}`}
            title={`Hot Tubs, Sheds, Decks & Heavy Items in ${location.city}, CO`}
            text="These are the jobs most haulers turn down. Ben has roughly six years of construction and demolition experience, including more than 300 decks, so the tear-down and the haul happen in one visit."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {specialty.map((service) => (
              <article
                key={service.slug}
                className="relative rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary"
              >
                <h3 className="font-display text-lg font-bold">
                  <CityServiceLink city={location.slug} service={service.slug}
                    className="after:absolute after:inset-0 after:content-['']"
                  >
                    {service.name} in {location.city}, CO
                  </CityServiceLink>
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{service.summary}</p>
                <span aria-hidden="true" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
                  See {location.city} pricing and details <ArrowRight className="size-4" />
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader
            eyebrow={`Every service in ${location.city}`}
            title={`All Junk Removal & Hauling Services in ${location.city}, CO`}
            text={`Explore pickup details, pricing and common questions for hauling services available in ${location.city}.`}
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service.slug}>
                {service.cityPages === false ? <Link
                  to="/services/$slug"
                  params={{ slug: service.slug }}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-5 py-4 font-semibold transition-colors hover:border-primary hover:text-primary"
                >
                  <span>{service.name} — serving {location.city}</span>
                  <ArrowRight className="size-4 shrink-0" />
                </Link> : <CityServiceLink city={location.slug} service={service.slug}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-5 py-4 font-semibold transition-colors hover:border-primary hover:text-primary"
                >
                  <span>{location.city} {service.name.toLowerCase()}</span>
                  <ArrowRight className="size-4 shrink-0" />
                </CityServiceLink>}
              </li>
            ))}
          </ul>
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

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <SectionHeader
            eyebrow="The experience"
            title={`Junk Removal in ${location.city} Without the Hassle`}
            text="Here's exactly how a job goes when you hire EZ Haulaway — and how you'll feel when we pull away."
          />
          <div className="mt-10 space-y-6 leading-8 text-muted-foreground">
            <p>
              It starts with a photo or a quick call. We give you a straightforward price based on how much space your
              items take in our trailer, and we schedule around your day — not a four-hour window. When our crew
              arrives at your {location.city} property, we walk the job with you and confirm the price before anything
              is loaded, so there are no surprises at the end.
            </p>
            <p>
              Then we do all of it: the lifting, the stairs, the tight gates and doorways, the loading, and the haul
              away. We sweep up before we leave, and we sort every load for donation and recycling before anything
              heads to a landfill. You never touch a dolly, rent a truck, or make a dump run.
            </p>
            <p>
              The part {location.city} customers talk about most is the feeling afterward — the garage you can park in
              again, the basement that's finally usable, the backyard without the old hot tub or broken fence. One
              visit, and a project that felt overwhelming is simply done.
            </p>
          </div>
        </div>
      </section>

      {pushInstantEstimate && (
        <section className="border-y border-border bg-muted py-14">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 md:flex-row md:items-center lg:px-8">
            <div>
              <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
                Get a {location.city} Junk Removal Price in 30 Seconds
              </h2>
              <p className="mt-3 max-w-xl leading-7 text-muted-foreground">
                Skip the phone call. Send a photo or a quick description and see your price range on screen right
                now — free, instant, and no obligation.
              </p>
            </div>
            <Button asChild size="lg" className="w-full shrink-0 sm:w-auto">
              <Link to="/instant-estimate">Get My Free Instant Estimate</Link>
            </Button>
          </div>
        </section>
      )}

      <CtaBand title={`Ready to Clear It Out in ${location.city}?`} />
    </PageShell>
  );
}
