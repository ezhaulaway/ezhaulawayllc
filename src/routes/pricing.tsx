import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Check, Receipt, ShieldCheck, Truck } from "lucide-react";
import { CtaBand, FaqAccordion, InlineQuoteForm, PageHero, PageShell, SectionHeader } from "@/components/site-chrome";
import { TrailerPricing } from "@/components/trailer-pricing";
import { AiEstimator } from "@/components/ai-estimator";
import { SITE_URL } from "@/content/site";

const title = "Junk Removal Pricing & Free Quotes | EZ Haulaway";
const description =
  "How EZ Haulaway prices junk removal in the Denver metro area: free quotes, all-inclusive pricing by load size, and no surprise fees after the job.";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/pricing` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/pricing` }],
  }),
  component: PricingPage,
});

const principles = [
  { icon: Receipt, title: "Free quotes", text: "Send photos for a ballpark, or we confirm the price on site. Either way, quoting costs nothing." },
  { icon: BadgeCheck, title: "All inclusive", text: "Labor, loading, hauling, and disposal fees are in the number we give you." },
  { icon: ShieldCheck, title: "No surprise fees", text: "The price you approve before we start is the price at the end of the job." },
  { icon: Truck, title: "Priced by volume", text: "You pay for the space your items take in the trailer, not for a fixed truckload you didn't fill." },
];

const factors = [
  "How much space the load takes up",
  "How heavy the material is — concrete and tile weigh more than furniture",
  "Access: stairs, long carries, tight gates, and basement hauls",
  "Whether demolition or disassembly is part of the job",
  "Items with special disposal requirements, like appliances or electronics",
];

const included = [
  "Our crew and all the labor",
  "Loading and carrying from anywhere on the property",
  "Hauling and transport",
  "Landfill and disposal fees",
  "Sweeping up the area afterward",
  "Donation and recycling sorting where possible",
];

const faqs = [
  ["Why aren't exact prices listed here?", "Two jobs of the same size can be very different — a basement full of concrete is not the same work as a garage of cardboard. We'd rather quote your actual job than post a number that turns out to be wrong."],
  ["How do I get a real number?", "Text or send photos through the quote form. For most jobs we can give a close estimate from photos, then confirm it on site before we start."],
  ["Do you charge for the quote?", "No. Quotes are always free."],
  ["What payment do you take?", "Talk to us when you book and we'll confirm what works for your job."],
  ["Is the on-site price ever different from the estimate?", "Only if the job turns out to be bigger than the photos showed. If that happens, you hear the new number before we load anything."],
] as const;

function PricingPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Pricing"
        title="Straightforward Pricing, No Surprise Fees"
        text="We price by how much space your items take in the trailer and the work involved in getting them there. You approve the number before anything is loaded."
      />

      <TrailerPricing />
      <AiEstimator />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader eyebrow="How we price" title="Four Things That Never Change" center />
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {principles.map(({ icon: Icon, title: heading, text }) => (
              <article key={heading} className="bg-card p-7">
                <Icon className="size-6 text-primary" />
                <h3 className="mt-6 text-lg font-bold">{heading}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeader eyebrow="What affects the price" title="What Goes Into Your Quote" />
            <ul className="mt-8 grid gap-3">
              {factors.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-md border border-border bg-card p-4 text-sm font-semibold">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader eyebrow="What's included" title="Everything in One Price" />
            <ul className="mt-8 grid gap-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-md border border-border bg-card p-4 text-sm font-semibold">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <SectionHeader
              eyebrow="Common questions"
              title="Pricing Questions"
              text="Want a number for your job? Send photos and we'll get you close before we ever show up."
            />
            <div className="mt-8">
              <FaqAccordion faqs={faqs} />
            </div>
          </div>
          <InlineQuoteForm />
        </div>
      </section>

      <CtaBand title="Get a Free Quote on Your Job" text="Photos, a phone call, or a quick text — whatever's easiest for you." />
    </PageShell>
  );
}
