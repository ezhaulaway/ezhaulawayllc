import { CityServiceLink } from "@/components/city-service-link";
import { isLiveCity, isLiveCityService } from "@/content/live-pages";
import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { ArrowRight, Check, MapPin, Phone } from "lucide-react";
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
import { PHONE, PHONE_TEL, SITE_URL, BUSINESS_SCHEMA } from "@/content/site";
import { rich } from "@/components/prose-section";
import { SERVICE_BENEFIT, fitTitle, neighborhoodList } from "@/content/local-seo";


export const Route = createFileRoute("/service-areas/$city_/$service")({
  loader: async ({ params }) => {
    const [{ locationBySlug }, { serviceBySlug }, { customCityServices }] = await Promise.all([
      import("@/content/locations"),
      import("@/content/services"),
      import("@/content/custom-city-services"),
    ]);
    const location = locationBySlug(params.city);
    const service = serviceBySlug(params.service);
    if (!location || !service || service.cityPages === false) throw notFound();
    if (isLiveCity(params.city) && !isLiveCityService(params.city, params.service)) {
      throw redirect({ to: "/services/$slug", params: { slug: params.service }, statusCode: 301 });
    }
    const custom = customCityServices[`${params.city}/${params.service}`] ?? null;
    return { location, service, custom };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Page not found — EZ Haulaway" }, { name: "robots", content: "noindex" }] };
    }
    const { location, service, custom } = loaderData;
    const url = `${SITE_URL}/service-areas/${params.city}/${params.service}`;
    const benefit = SERVICE_BENEFIT[service.slug] ?? "Upfront Pricing";
    const title = fitTitle(`${service.name} in ${location.city}, CO - ${benefit} | EZ Haulaway`, `${service.name} in ${location.city}, CO - ${benefit}`, `${service.name} in ${location.city}, CO | EZ Haulaway`, `${service.name} in ${location.city}, CO`, `${service.name} ${location.city}, CO`);
    const description =
      custom?.description ??
      `${service.name} in ${location.city}, Colorado. ${service.summary} Local, family-owned crew from Parker. Free quotes — call or text ${PHONE}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { name: "twitter:title", content: title },
        { property: "og:description", content: description },
        { name: "twitter:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: `${service.name} in ${location.city}, CO`,
            serviceType: service.name,
            url,
            description,
            areaServed: { "@type": "City", name: `${location.city}, CO` },
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
              { "@type": "ListItem", position: 2, name: "Service Areas", item: `${SITE_URL}/service-areas` },
              { "@type": "ListItem", position: 3, name: location.city, item: `${SITE_URL}/service-areas/${params.city}` },
              { "@type": "ListItem", position: 4, name: service.name, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: CityServicePage,
  notFoundComponent: CityServiceNotFound,
});

function CityServiceNotFound() {
  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="text-3xl font-extrabold">We couldn’t find that page</h1>
        <p className="mt-4 text-muted-foreground">Pick your city to see every service we offer there.</p>
        <Button asChild className="mt-8" size="lg">
          <Link to="/service-areas">View Service Areas</Link>
        </Button>
      </div>
    </PageShell>
  );
}

function CityServicePage() {
  const { location, service, custom } = Route.useLoaderData();
  const photo = locationPhoto(location.slug);
  const city = location.city;
  const name = service.name;
  const lower = name.toLowerCase();
  const otherServices = services.filter((item) => item.slug !== service.slug);
  const nearby = locations.filter((item) => location.nearby.includes(item.slug) && isLiveCityService(item.slug, service.slug));

  const faqs = custom
    ? custom.faqs
    : ([
        [`How much does ${lower} cost in ${city}?`, `We price by how much space it takes in our 16-foot trailer, starting at a [[min]] minimum, and certain heavy items are priced individually. Text photos to ${PHONE} and we'll give you a price before any work starts — no trip charge for ${city}.`],
        [`How soon can you do ${lower} in ${city}?`, `We're based in Parker and work in ${city} every week, so openings often come up within a few days. Call or text for the soonest slot.`],
        ...service.faqs.slice(0, 3),
      ] as Array<[string, string]>);

  const introParagraphs = custom ? custom.intro : service.intro;

  return (
    <PageShell>
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-5 pt-8 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="px-2">/</span>
            <Link to="/service-areas" className="hover:text-foreground">Service Areas</Link>
            <span className="px-2">/</span>
            <Link to="/service-areas/$city" params={{ city: location.slug }} className="hover:text-foreground">{city}</Link>
            <span className="px-2">/</span>
            <span className="font-semibold text-foreground">{name}</span>
          </nav>
        </div>
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <div className="flex items-center gap-2 text-primary">
              <MapPin className="size-4" />
              <span className="text-xs font-bold uppercase tracking-[0.16em]">{city}, CO · {location.county}</span>
            </div>
            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-[1.1] sm:text-5xl">{`${name} in ${city}, CO`}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Need {lower} in {city}? {service.summary}
            </p>
            {neighborhoodList(location.slug) && (
              <p className="mt-4 max-w-2xl leading-8 text-muted-foreground">
                Our Parker-based crew handles {lower} across {city}, including {neighborhoodList(location.slug)}.
              </p>
            )}
            <p className="mt-4 max-w-2xl leading-8 text-muted-foreground">{location.local}</p>
            <div className="mt-8">
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${PHONE_TEL}`}>
                  <Phone /> Call or Text {PHONE}
                </a>
              </Button>
            </div>
          </div>
          <figure className="overflow-hidden rounded-xl border border-border bg-muted">
            <img
              src={service.image}
              alt={`${service.imageAlt} — ${lower} in ${city}, CO`}
              width={1200}
              height={800}
              className="aspect-[3/2] w-full object-cover"
            />
          </figure>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <SectionHeader
              eyebrow={`${name} in ${city}`}
              title={`How ${name} Works in ${city}`}
            />
            <div className="mt-6 space-y-5 leading-8 text-muted-foreground">
              {introParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{rich(paragraph)}</p>
              ))}
            </div>
            <h3 className="mt-10 font-display text-xl font-bold">What’s included for {city} customers</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-3 rounded-lg border border-border bg-card p-4 text-sm leading-6">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <InlineQuoteForm />
        </div>
      </section>

      <section className="border-y border-border bg-muted py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          {service.sections.slice(0, 2).map((section) => (
            <div key={section.heading} className="mt-10 first:mt-0">
              <h2 className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">{section.heading}</h2>
              <p className="mt-5 leading-8 text-muted-foreground">{section.text}</p>
            </div>
          ))}
          {custom ? (
            <div className="mt-10">
              <h2 className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">
                {custom.localHeading}
              </h2>
              {custom.localText.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="mt-5 leading-8 text-muted-foreground">
                  {rich(paragraph)}
                </p>
              ))}
              {custom.sections?.map((s) => (
                <div key={s.heading} className="mt-10">
                  <h2 className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">{s.heading}</h2>
                  {s.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)} className="mt-5 leading-8 text-muted-foreground">{rich(p)}</p>
                  ))}
                  {s.subsections?.map((sub) => (
                    <div key={sub.heading} className="mt-6">
                      <h3 className="text-lg font-bold">{sub.heading}</h3>
                      <p className="mt-2 leading-8 text-muted-foreground">{rich(sub.text)}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-10">
              <h2 className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">
                Why {city} Calls EZ Haulaway
              </h2>
              <p className="mt-5 leading-8 text-muted-foreground">{location.intro}</p>
            </div>
          )}
          {photo && (
            <figure className="mt-10 overflow-hidden rounded-xl border border-border bg-card">
              <img src={photo.src} alt={photo.alt} loading="lazy" width={1200} height={800} className="aspect-[3/2] w-full object-cover" />
              <figcaption className="px-5 py-4 text-sm leading-6 text-muted-foreground">{photo.caption}</figcaption>
            </figure>
          )}
          {(service.slug === "furniture-removal" || service.slug === "mattress-and-bulky-item-removal") && (() => {
            const other = service.slug === "furniture-removal" ? "mattress-and-bulky-item-removal" : "furniture-removal";
            const otherName = other === "furniture-removal" ? "Furniture Removal" : "Mattress Removal";
            const local = isLiveCityService(location.slug, other);
            const lead = other === "furniture-removal"
              ? "Getting rid of couches, sofas, tables or chairs instead?"
              : "Only need an old mattress or box spring gone?";
            return (
              <p className="mt-10 leading-8 text-muted-foreground">
                {lead}{" "}
                <CityServiceLink city={location.slug} service={other} className="font-semibold text-primary hover:underline">
                  {local ? `${otherName} ${city}` : otherName}
                </CityServiceLink>
              </p>
            );
          })()}
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
          <SectionHeader eyebrow="Common questions" title={`${name} in ${city}: Questions`} />
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <section className="border-y border-border bg-muted py-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="font-display font-bold">More services in {city}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {otherServices.map((item) => (
              item.cityPages === false ? <Link
                key={item.slug}
                to="/services/$slug"
                params={{ slug: item.slug }}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                {item.name}
              </Link> : <CityServiceLink
                key={item.slug} city={location.slug} service={item.slug}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                {item.name} {city}
              </CityServiceLink>
            ))}
          </div>
          {nearby.length > 0 && (
            <>
              <p className="mt-8 font-display font-bold">{name} in nearby towns</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {nearby.map((item) => (
                  <CityServiceLink
                    key={item.slug} city={item.slug} service={service.slug}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                  >
                    {name} {item.city}
                  </CityServiceLink>
                ))}
              </div>
            </>
          )}
          <Link to="/services/$slug" params={{ slug: service.slug }} className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary">
            Full {lower} details and pricing <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <CtaBand title={`Book ${name} in ${city}`} />
    </PageShell>
  );
}
