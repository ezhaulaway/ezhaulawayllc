import { createFileRoute, Link } from "@tanstack/react-router";
import { responsiveImage } from "@/lib/estimate-images";
import {
  ArrowRight,
  Camera,
  Check,
  Clock3,
  EyeOff,
  MapPin,
  MessageSquareText,
  Sparkles,
  Star,
  Truck,
  X,
} from "lucide-react";
import { AiEstimator } from "@/components/ai-estimator";
import { FaqAccordion, PageShell } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { PHONE, PHONE_TEL, SITE_URL } from "@/content/site";
import benHeadshot from "@/assets/ben-headshot.webp";
import wagonAsset from "@/assets/new-B8EC4C72.webp.asset.json";
import dollyAsset from "@/assets/new-43291499.webp.asset.json";
import crewLoadingAsset from "@/assets/new-A5F021D5.webp.asset.json";

const title = "Instant Junk Removal Quote Online | EZ Haulaway";
const description =
  "Get a free instant junk removal estimate online. Upload photos or describe your items for fast pricing in Parker, Castle Rock and the Denver metro.";

const faqs = [
  [
    "How can I get an instant junk removal quote online?",
    "Upload up to four clear photos or describe what you need removed. Our junk removal cost estimator reviews the amount, item types, access details, and current EZ Haulaway pricing to show a preliminary price range on your screen.",
  ],
  [
    "Can I get a junk removal estimate by photo?",
    "Yes. Photos from two or more angles help us estimate trailer space and identify larger items. If you do not have a photo, a detailed description works too.",
  ],
  [
    "Is the instant estimate really free?",
    "Yes. The online estimate is free, requires no phone call, and does not obligate you to book. You only share contact details after seeing the preliminary range if you want the crew to confirm your quote.",
  ],
  [
    "Is the price on screen the final price?",
    "It is a preliminary estimate based on the information you provide. EZ Haulaway confirms the final price before loading begins, so you can approve it before any work starts.",
  ],
  [
    "What areas can use the online junk removal estimator?",
    "The estimator is available for jobs in Parker, Castle Rock, Centennial, Aurora, Highlands Ranch, Lone Tree, Denver, Littleton, Englewood, Lakewood, Elizabeth, Franktown, Castle Pines, and Sedalia.",
  ],
] as const;

const steps = [
  {
    icon: Camera,
    number: "01",
    title: "Show Us the Junk",
    text: "Snap up to four photos or describe the furniture, appliances, boxes, debris, or other items you want gone.",
  },
  {
    icon: Sparkles,
    number: "02",
    title: "See Your Estimate",
    text: "Get a preliminary junk removal price range on your screen based on your items and our current pricing guide.",
  },
  {
    icon: Truck,
    number: "03",
    title: "Request the Actual Quote",
    text: "Like the range? Add your contact details, address, and preferred day. Ben and the crew will confirm the job with you.",
  },
] as const;

const comparisons = [
  ["Wait for an on-site estimate", "See a price range online"],
  ["Explain everything on a phone call", "Send photos or type a description"],
  ["Share contact details before seeing a price", "See the estimate before entering your information"],
  ["Guess what fees are included", "Pricing follows EZ Haulaway's live crew guide"],
] as const;

export const Route = createFileRoute("/instant-estimate")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { name: "twitter:title", content: title },
      { property: "og:description", content: description },
      { name: "twitter:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/instant-estimate` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/instant-estimate` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              name: "Instant Online Junk Removal Estimate",
              serviceType: "Junk removal estimate by photo",
              provider: { "@id": `${SITE_URL}/#localbusiness` },
              areaServed: ["Parker", "Castle Rock", "Denver Metro"],
              url: `${SITE_URL}/instant-estimate`,
              description,
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map(([question, answer]) => ({
                "@type": "Question",
                name: question,
                acceptedAnswer: { "@type": "Answer", text: answer },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: InstantEstimatePage,
});

function InstantEstimatePage() {
  return (
    <PageShell>
      <section className="border-b border-border bg-secondary text-secondary-foreground">
        <div className="mx-auto grid max-w-7xl items-start gap-8 px-5 py-10 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-14">
          <div className="min-w-0 lg:sticky lg:top-28">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
              Parker, Castle Rock &amp; Denver Metro
            </p>
            <p
              aria-hidden="true"
              className="mt-3 font-display text-6xl font-black uppercase italic leading-none tracking-tight text-primary ez-outline-light sm:text-7xl lg:text-8xl"
            >
              Too EZ.
            </p>
            <h1 className="mt-4 max-w-xl text-3xl font-extrabold leading-[1.05] sm:text-4xl lg:text-5xl">
              Instant Junk Removal Quote
            </h1>
            <p className="mt-4 text-xl font-bold text-primary">NO PHONE CALL REQUIRED</p>
            <ol className="mt-5 flex flex-wrap items-center gap-2 text-sm font-bold uppercase tracking-wide">
              <li className="rounded-full bg-primary px-3 py-1 text-primary-foreground">1. Snap it</li>
              <ArrowRight aria-hidden="true" className="size-4 text-primary" />
              <li className="rounded-full bg-primary px-3 py-1 text-primary-foreground">2. See your price</li>
              <ArrowRight aria-hidden="true" className="size-4 text-primary" />
              <li className="rounded-full bg-primary px-3 py-1 text-primary-foreground">3. Lock it in</li>
            </ol>
            <p className="mt-3 text-base font-semibold">Locking in your quote is almost too EZ.</p>
            <p className="mt-5 max-w-xl text-base leading-7 text-secondary-foreground/75 sm:text-lg">
              Add your name, city and phone, then snap a photo or describe what you have. Our free junk removal
              cost estimator gives you a preliminary price range in seconds.
            </p>
            <ul className="mt-7 grid gap-3 text-sm font-semibold sm:grid-cols-2 lg:grid-cols-1">
              <li className="flex items-center gap-2"><Clock3 className="size-4 text-primary" /> Estimate shown right on your screen</li>
              <li className="flex items-center gap-2"><EyeOff className="size-4 text-primary" /> Photos stay private and are never shared</li>
              <li className="flex items-center gap-2"><MapPin className="size-4 text-primary" /> Local, family-owned crew in Parker</li>
            </ul>
            <div className="mt-7 flex items-center gap-4 border-t border-secondary-foreground/15 pt-6">
              <img
                src={benHeadshot}
                alt="Ben, owner of EZ Haulaway"
                className="size-14 rounded-full border-2 border-primary object-cover"
              />
              <div>
                <p className="flex items-center gap-1 font-bold"><Star className="size-4 fill-primary text-primary" /> Real local service</p>
                <p className="mt-1 text-sm text-secondary-foreground/65">Your request goes directly to Ben and the EZ Haulaway crew.</p>
              </div>
            </div>
            <img
              {...responsiveImage(crewLoadingAsset.url, "(min-width: 1280px) 450px, (min-width: 1024px) 35vw, calc(100vw - 40px)")}
              alt="Ben from EZ Haulaway loading a cabinet on a dolly into the black dump trailer"
              width={540}
              height={360}
              className="mt-7 w-full rounded-lg border border-secondary-foreground/15 object-cover"
              loading="lazy"
            />
            <div className="mt-4 grid grid-cols-2 gap-4">
              <img {...responsiveImage(wagonAsset.url, "(min-width: 1024px) 220px, calc((100vw - 56px) / 2)")} alt="EZ Haulaway hauling a wagon of junk toward the red truck and trailer" width={540} height={360} className="aspect-[4/3] w-full rounded-lg border border-secondary-foreground/15 object-cover" loading="lazy" />
              <img {...responsiveImage(dollyAsset.url, "(min-width: 1024px) 220px, calc((100vw - 56px) / 2)")} alt="Ben wheeling a cabinet down a Parker driveway on a dolly" width={360} height={540} className="aspect-[4/3] w-full rounded-lg border border-secondary-foreground/15 object-cover" loading="lazy" />
            </div>
          </div>
          <div className="rounded-lg bg-background p-3 text-foreground shadow-lg sm:p-5">
            <AiEstimator campaign showIntro={false} />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Three easy steps</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">From Photo to Price Without the Runaround</h2>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
            {steps.map(({ icon: Icon, number, title: stepTitle, text }) => (
              <article key={number} className="bg-background p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <Icon className="size-7 text-primary" />
                  <span className="font-display text-sm font-extrabold text-muted-foreground">{number}</span>
                </div>
                <h3 className="mt-6 text-xl font-bold">{stepTitle}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">A faster way to price the job</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Skip the Waiting. Keep the Control.</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Use the estimator when you want a fast answer without scheduling a sales visit. You can check the likely
              cost first, then decide whether you want EZ Haulaway to contact you about the actual quote.
            </p>
          </div>
          <div className="overflow-hidden rounded-lg border border-border">
            <div className="grid grid-cols-2 bg-muted text-sm font-bold">
              <div className="p-4 text-muted-foreground">Traditional estimate</div>
              <div className="border-l border-border p-4 text-primary">EZ instant estimate</div>
            </div>
            {comparisons.map(([traditional, ez]) => (
              <div key={traditional} className="grid grid-cols-2 border-t border-border text-sm">
                <div className="flex gap-2 p-4 text-muted-foreground"><X className="mt-0.5 size-4 shrink-0" /> {traditional}</div>
                <div className="flex gap-2 border-l border-border p-4 font-semibold"><Check className="mt-0.5 size-4 shrink-0 text-primary" /> {ez}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Fast, useful, and honest</p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">How the Junk Removal Cost Estimator Works</h2>
          <div className="mt-8 grid gap-6 leading-7 text-muted-foreground sm:grid-cols-2">
            <p>
              The estimator compares the items visible in your photos and the details you type with EZ Haulaway&apos;s
              current trailer-load and specialty-item pricing. Those prices come from the same guide our crew uses,
              helping the website and crew stay in sync when pricing changes.
            </p>
            <p>
              Clear photos improve a junk removal estimate by photo, but they are not required. Mention stairs, long
              carries, heavy material, disassembly, and the approximate number of items so the preliminary range can
              account for the work involved.
            </p>
            <p>
              The price on screen is a ballpark, not a binding final total. Once you request the actual quote, the crew
              reviews your information and confirms the price before loading anything. You stay in control throughout.
            </p>
            <p>
              This free junk removal estimate is available across Parker, Castle Rock, and the Denver metro. For a full
              explanation of load sizes and included service, visit our <Link to="/pricing" className="font-semibold text-primary underline underline-offset-4">junk removal pricing page</Link>.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg"><a href="#instant-estimate"><Sparkles /> Start My Free Estimate</a></Button>
            <Button asChild variant="outline" size="lg"><a href={`sms:${PHONE_TEL}`}><MessageSquareText /> Text {PHONE}</a></Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Prefer to talk to someone first, or have a unique commercial project?{" "}
            <Link to="/contact" className="font-semibold text-primary underline underline-offset-4">
              Contact Ben and Zoe directly
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Questions before you upload?</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Instant Estimate FAQs</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Get the important details before using the tool, or go straight back to the estimator whenever you are
              ready. Have questions about trailer sizes, payment, or what we can't take? Check out our full{" "}
              <Link to="/faq" className="font-semibold text-primary underline underline-offset-4">junk removal FAQ</Link>.
            </p>
            <Button asChild variant="outline" className="mt-6"><a href="#instant-estimate">Use the Estimator <ArrowRight /></a></Button>
          </div>
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <section className="bg-primary py-14 text-primary-foreground sm:py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-7 px-5 md:flex-row md:items-center lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground/75">Ready when you are</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">See What Your Junk Removal May Cost</h2>
            <p className="mt-3 max-w-xl text-primary-foreground/80">Free to use. No phone call. No obligation.</p>
          </div>
          <Button asChild size="lg" className="bg-card text-foreground hover:bg-card/90"><a href="#instant-estimate"><Sparkles /> Get My Instant Estimate</a></Button>
        </div>
      </section>
    </PageShell>
  );
}