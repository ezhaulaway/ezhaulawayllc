import { ProseSection } from "@/components/prose-section";
import { pageExtras } from "@/content/page-extras";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CtaBand, PageHero, PageShell, SectionHeader } from "@/components/site-chrome";
import { services } from "@/content/services";
import { SITE_URL } from "@/content/site";
import cleanoutAsset from "@/assets/Backyard_and_waste_cleanup.avif.asset.json";

const title = "What We Take — Junk Removal Services | EZ Haulaway";
const description =
  "Furniture, appliances, hot tubs, construction debris, yard waste, cleanouts, electronics and more. See everything EZ Haulaway hauls across the Denver metro area.";

export const Route = createFileRoute("/what-we-take")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/what-we-take` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/what-we-take` }],
  }),
  component: WhatWeTakePage,
});

const notTaken = [
  "Paint, solvents, and chemicals",
  "Asbestos and hazardous materials",
  "Medical or biological waste",
  "Fuel, oil, and propane tanks",
];

function WhatWeTakePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="What we haul"
        title="If You Want It Gone, We'll Take It"
        text="From a single mattress to an entire property, EZ Haulaway loads it, hauls it, and cleans up after. Pick a service below to see how it works."
        image={cleanoutAsset.url}
        imageAlt="EZ Haulaway trailer loaded during a property cleanout"
      />

      <section className="border-b border-border bg-card py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <SectionHeader
            eyebrow="How it goes"
            title="One Call, One Visit, One Clean Space"
            text="However big the pile, the process stays the same — and so does the way you'll feel when it's gone."
          />
          <div className="mt-10 space-y-6 leading-8 text-muted-foreground">
            <p>
              Send us photos or describe the job, and we'll give you a straightforward price before we arrive. Our
              crew handles all the lifting, loading, and hauling from anywhere on your property — basements, backyards,
              attics, and storage units included. When the trailer is loaded, we sweep the area and sort the load for
              donation and recycling wherever we can.
            </p>
            <p>
              Customers across Parker and the Denver metro area tell us the best part isn't watching the junk leave —
              it's what comes back: a garage you can park in, a room you can use, a yard you can enjoy. Pick your
              service below and let's get your space back.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader
            eyebrow="Our services"
            title="Every Service We Offer"
            text="Each service has its own page with what's included, how it works, and answers to the questions we get most."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                to="/services/$slug"
                params={{ slug: service.slug }}
                className="group relative isolate flex min-h-64 flex-col justify-end overflow-hidden bg-secondary p-7"
              >
                <img
                  src={service.image}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <div
                  className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.72)_38%,rgba(0,0,0,0.35)_65%,rgba(0,0,0,0.12)_100%)] transition-opacity duration-300 group-hover:opacity-90"
                  aria-hidden
                />
                <h2 className="text-xl font-bold text-white">{service.name}</h2>
                <p className="mt-2 leading-6 text-white/85">{service.summary}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white">
                  See details <ArrowRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <SectionHeader
            eyebrow="Good to know"
            title="What We Can't Take"
            text="A few things require a licensed disposal facility. If you're unsure about an item, call or text us and we'll tell you straight."
          />
          <ul className="grid gap-3 rounded-lg border border-border bg-card p-7 sm:grid-cols-2">
            {notTaken.map((item) => (
              <li key={item} className="text-sm font-semibold text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProseSection {...pageExtras["what-we-take"]} />
      <CtaBand />
    </PageShell>
  );
}
