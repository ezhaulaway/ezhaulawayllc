import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { CtaBand, PageHero, PageShell, SectionHeader } from "@/components/site-chrome";
import { locations } from "@/content/locations";
import { SITE_URL } from "@/content/site";

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

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader eyebrow="Cities we serve" title="Find Your City" />
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => (
              <Link
                key={location.slug}
                to="/service-areas/$city"
                params={{ city: location.slug }}
                className="group bg-card p-7 transition-colors hover:bg-muted"
              >
                <div className="flex items-center gap-2 text-primary">
                  <MapPin className="size-4" />
                  <span className="text-xs font-bold uppercase tracking-[0.16em]">{location.county}</span>
                </div>
                <h2 className="mt-4 text-xl font-bold">Junk Removal in {location.city}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{location.intro}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
                  See {location.city} details <ArrowRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Not Sure If We Reach You?" text="Give us a call and we'll tell you straight away." />
    </PageShell>
  );
}
