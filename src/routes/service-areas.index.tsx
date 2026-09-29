import { ProseSection } from "@/components/prose-section";
import { pageExtras } from "@/content/page-extras";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { CtaBand, PageHero, PageShell, SectionHeader } from "@/components/site-chrome";
import { locations } from "@/content/locations";
import { services } from "@/content/services";
import { locationPhoto } from "@/content/location-images";
import { SITE_URL } from "@/content/site";
import { ServiceAreaMap } from "@/components/service-area-map";

const title = "Service Areas — Denver Metro Junk Removal | EZ Haulaway";
const description =
  "EZ Haulaway hauls junk across Parker, Castle Rock, Centennial, Highlands Ranch, Denver, Aurora and the rest of the Denver metro area. Find your city.";

export const Route = createFileRoute("/service-areas/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/service-areas` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/service-areas` }],
  }),
  component: ServiceAreasPage,
});

function ServiceAreasPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Service areas"
        title="Proudly Serving the Denver Metro Area"
        text="We're based in Parker and work throughout the south metro and beyond. If your town isn't listed, call us — we probably still come out."
      />

      <ServiceAreaMap />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader eyebrow="Cities we serve" title="Find Your City" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => {
              const photo = locationPhoto(location.slug);
              return (
                <div
                  key={location.slug}
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary"
                >
                  <Link to="/service-areas/$city" params={{ city: location.slug }} className="flex flex-1 flex-col">
                    {photo && (
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        width={1200}
                        height={800}
                        className="aspect-[3/2] w-full object-cover"
                      />
                    )}
                    <div className="flex flex-1 flex-col p-7">
                      <div className="flex items-center gap-2 text-primary">
                        <MapPin className="size-4" />
                        <span className="text-xs font-bold uppercase tracking-[0.16em]">{location.county}</span>
                      </div>
                      <h2 className="mt-4 text-xl font-bold">Junk Removal {location.city}</h2>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {photo?.caption ?? location.intro}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
                        See {location.city} details <ArrowRight className="size-4" />
                      </span>
                    </div>
                  </Link>
                  <div className="border-t border-border bg-card p-5 lg:invisible lg:absolute lg:inset-0 lg:overflow-y-auto lg:border-t-0 lg:opacity-0 lg:transition-opacity lg:group-focus-within:visible lg:group-focus-within:opacity-100 lg:group-hover:visible lg:group-hover:opacity-100">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                      Services in {location.city}
                    </p>
                    <ul className="mt-3 grid gap-1">
                      <li>
                        <Link
                          to="/service-areas/$city"
                          params={{ city: location.slug }}
                          className="block rounded px-2 py-1.5 text-sm font-bold hover:bg-muted"
                        >
                          Junk Removal {location.city}
                        </Link>
                      </li>
                      {services.map((service) => (
                        <li key={service.slug}>
                          <Link
                            to="/service-areas/$city/$service"
                            params={{ city: location.slug, service: service.slug }}
                            className="block rounded px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                          >
                            {service.name} {location.city}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ProseSection {...pageExtras["service-areas"]} />
      <CtaBand title="Not Sure If We Reach You?" text="Give us a call and we'll tell you straight away." />
    </PageShell>
  );
}
