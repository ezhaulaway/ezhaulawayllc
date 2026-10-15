import { NextSteps } from "@/components/next-steps";
import { ProseSection, rich } from "@/components/prose-section";
import { pageExtras } from "@/content/page-extras";
import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Check, Receipt, ShieldCheck, Truck } from "lucide-react";
import { CtaBand, FaqAccordion, InlineQuoteForm, PageHero, PageShell, SectionHeader } from "@/components/site-chrome";
import { TrailerPricing } from "@/components/trailer-pricing";
import { AiEstimator } from "@/components/ai-estimator";
import { SITE_URL } from "@/content/site";
import { usePriceGuide } from "@/hooks/use-price-guide";

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
  const guide = usePriceGuide();
  const { loads: LOAD_LEVELS, minimum: MINIMUM_CHARGE, laborRate: LABOR_RATE, specialty: SPECIALTY_ITEMS } = guide;
  return (
    <PageShell>
      <PageHero
        eyebrow="Pricing"
        title="Junk Removal Pricing With No Surprise Fees"
        text="We price by how much space your items take in the trailer and the work involved in getting them there. You approve the number before anything is loaded."
      />

      <TrailerPricing />
      <AiEstimator />

      <section className="border-b border-border py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader
            eyebrow="Price list"
            title="Trailer Load & Specialty Item Pricing"
            text={`Straight from our printed price guide. Prices include standard labor, loading, hauling, and disposal. Additional labor of $${LABOR_RATE}/hour per crew member may apply for difficult access, disassembly, oversized or heavy items, or extended loading time.`}
            center
          />

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="overflow-hidden rounded-lg border border-border">
              <h3 className="bg-secondary px-5 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-card">
                Trailer load pricing
              </h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted text-left">
                    <th className="px-5 py-2 font-bold">Fill level</th>
                    <th className="px-3 py-2 font-bold">Volume</th>
                    <th className="px-5 py-2 text-right font-bold">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {LOAD_LEVELS.map((level) => (
                    <tr key={level.eighths} className="border-b border-border last:border-b-0">
                      <td className="px-5 py-2 font-semibold">{level.eighths === 0 ? "Minimum / small load" : level.label}</td>
                      <td className="px-3 py-2 text-muted-foreground">{level.volume}</td>
                      <td className="px-5 py-2 text-right font-extrabold text-primary">${level.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="border-t border-border bg-muted px-5 py-3 text-xs leading-5 text-muted-foreground">
                Minimum service charge ${MINIMUM_CHARGE}. Pricing may vary based on material, weight, and access — call for an exact quote.
              </p>
            </div>

            <div className="overflow-hidden rounded-lg border border-border">
              <h3 className="bg-secondary px-5 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-card">
                Specialty & single item pricing
              </h3>
              <ul className="grid sm:grid-cols-2">
                {SPECIALTY_ITEMS.map((entry) => (
                  <li
                    key={entry.item}
                    className="flex items-baseline justify-between gap-3 border-b border-border px-5 py-2 text-sm"
                  >
                    <span className="font-semibold">{entry.item}</span>
                    <span className="shrink-0 font-extrabold text-primary">{entry.price}</span>
                  </li>
                ))}
              </ul>
              <p className="bg-muted px-5 py-3 text-xs leading-5 text-muted-foreground">
                Specialty items are priced individually instead of by trailer space. Don't see your item? Send us a photo and we'll
                price it.
              </p>
            </div>
          </div>
        </div>
      </section>

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

      <section className="border-t border-border py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <SectionHeader
            eyebrow="Junk removal pricing explained"
            title="How Junk Removal Pricing Works"
          />
          <div className="mt-10 space-y-6 leading-8 text-muted-foreground">
            {[
              `Most **junk removal costs** in the Denver metro area are based on **trailer volume** — how much space your items take up. Our **16-foot dump trailer** holds about 14 cubic yards. A small pickup starts at **$${MINIMUM_CHARGE}**, and a **full trailer is $${LOAD_LEVELS[LOAD_LEVELS.length - 1]?.price}**. You only pay for the space you use.`,
              `**Weight matters too.** Concrete, dirt, tile, roofing, and other **heavy materials** cost more to dump at the transfer station than furniture or cardboard, so heavy loads are priced by weight and volume. We tell you this before we load, not after.`,
              `**Single items vs. full cleanouts.** If you only have one couch, mattress, or appliance, **single-item pricing** is usually the cheapest option. For garages, basements, and **estate cleanouts**, volume pricing gives you the best value per item.`,
              `**What's always included:** the crew, **all labor and loading**, hauling, **disposal fees**, and sweeping up. Extra labor at $${LABOR_RATE}/hour per crew member only applies to unusual jobs like difficult access or disassembly, and you hear about it up front.`,
              `**Why transparent pricing matters.** Some **junk removal companies** quote low on the phone, then add fuel, stair, or dump surcharges on site. We do the opposite: **no hidden fees**, **free quotes**, and a price you approve before anything goes in the trailer.`,
              `**What drives your junk removal cost?** Four things: **how much space** the load fills, **what the material is**, **how hard it is to reach**, and **whether anything needs taking apart**. A couch in the garage costs less than the same couch in a third-floor walkup. The **junk removal cost** you see in our quote already covers all four.`,
              `**How to compare junk removal companies.** Ask every hauler the same questions: Is disposal included? Is there a fuel or trip fee? Do you charge extra for stairs? Is the quote **in writing before loading**? A **professional junk removal company** answers yes, no, no, and yes. Many national **junk removal companies** charge by the truck and add fees at the end; we price by the eighth of a trailer and stick to it.`,
              `**Ways to lower your junk removal cost.** **Group items into one visit** instead of booking several small pickups. **Bring things to the garage** if it's easy and safe. **Separate heavy materials** like dirt or concrete so we can price them right. And **send photos first** — our free instant estimate shows a price range in about a minute.`,
              `**Why customers choose a professional junk removal company.** A dumpster rental still leaves you doing the lifting, and a borrowed truck still means a dump run. With EZ Haulaway, a **family-owned, licensed and insured** crew does **all the heavy lifting**, **donates and recycles** what it can, and leaves the space swept clean. That's the real value behind the price.`,
              `**Truck load vs. trailer load.** Many junk haulers quote by the truck load, so a "full truck" price can be confusing when your pile only fills part of the truck. A truck load price only helps you if you actually fill the full truck. We break every load into eighths, so you see exactly how much truck space and trailer space your items use. A quarter load is $${LOAD_LEVELS[1]?.price ?? MINIMUM_CHARGE}, and a full truck-sized trailer load is $${LOAD_LEVELS[LOAD_LEVELS.length - 1]?.price}.`,
              `**Removal cost by job type.** The removal cost for a single recliner is very different from the removal cost for a whole basement. Our junk removal services cover both, and the removal cost always includes labor, hauling and disposal. Other removal services may quote the haul and then add the dump fee later — we never do.`,
              `**Avoiding extra fees.** Before you hire anyone, ask about extra fees for stairs, distance, fuel, or weekend pickups. Many junk removal companies add extra fees once the truck shows up. With us, the only way the price changes is if the load is bigger than the photos showed, and you approve that before we load.`,
              `**How to save money on junk removal.** The easiest way to save money is to book everything at once — one full truck costs less than three small trips. Our removal services also include donation sorting, which keeps usable items out of the dump and keeps your junk removal price down.`,

            ].map((p) => (
              <p key={p.slice(0, 30)}>{rich(p)}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <SectionHeader
            eyebrow="What the price buys"
            title="More Than a Haul"
            text="When you compare junk removal prices in the Denver metro area, make sure you're comparing the whole job — not just the haul away."
          />
          <div className="mt-10 space-y-6 leading-8 text-muted-foreground">
            <p>
              Every EZ Haulaway price includes the full service: a courteous crew, all the lifting and carrying from
              wherever your items sit, careful protection of your walls and floors, loading, hauling, disposal fees,
              and a sweep-up before we leave. There are no fuel surcharges, no "stair fees" invented on site, and no
              number that mysteriously grows once the trailer is loaded.
            </p>
            <p>
              What you're really buying is your weekend back. No truck rental, no dump run, no sore back, no begging
              friends for help. You point at what needs to go, approve one straightforward price, and watch the
              space open up. Most customers tell us the same thing afterward: they wish they'd called sooner.
            </p>
          </div>
        </div>
      </section>

      <ProseSection {...pageExtras["pricing"]} />
      <NextSteps steps={[
        { kind: "service", slug: "dumpster-rental-alternative", label: "Junk Removal vs. Dumpster", text: "Compare a dumpster rental with a crew that does the loading." },
        { kind: "page", to: "/how-it-works", label: "How It Works", text: "What happens from your first text to the final sweep." },
        { kind: "page", to: "/what-we-take", label: "What We Take", text: "Check your items before you book." },
      ]} />
      <CtaBand title="Get a Free Quote on Your Job" text="Photos, a phone call, or a quick text — whatever's easiest for you." />
    </PageShell>
  );
}
