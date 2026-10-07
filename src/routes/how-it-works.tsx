import { ProseSection } from "@/components/prose-section";
import { pageExtras } from "@/content/page-extras";
import { createFileRoute } from "@tanstack/react-router";
import { Camera, CalendarCheck, HandCoins, Sparkles, Truck, UserCheck } from "lucide-react";
import { CtaBand, FaqAccordion, PageHero, PageShell, SectionHeader } from "@/components/site-chrome";
import { PHONE, SITE_URL } from "@/content/site";
import timelapsePoster from "@/assets/real-IMG_5065.jpg.asset.json";
import timelapseAsset from "@/assets/ez-haulaway-timelapse.mp4.asset.json";
import job5 from "@/assets/ben-job-5.webp.asset.json";
import job6 from "@/assets/ben-job-6.webp.asset.json";
import job7 from "@/assets/ben-job-7.webp.asset.json";
import job8 from "@/assets/ben-job-8.webp.asset.json";

const title = "How Our Junk Removal Process Works | EZ Haulaway";
const description =
  "See exactly how EZ Haulaway works: send photos, get a straightforward quote, and we load, haul, and clean up. Serving Parker and the Denver metro area.";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/how-it-works` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/how-it-works` }],
  }),
  component: HowItWorksPage,
});

const steps = [
  {
    icon: Camera,
    step: "01",
    heading: "Tell us what you have",
    text: "Call, text, or fill in the quote form. Photos of the pile, the room, or the item make a big difference — they let us judge the job before we arrive.",
  },
  {
    icon: HandCoins,
    step: "02",
    heading: "Get a straightforward quote",
    text: "We price by how much space your items take in the trailer, plus the labor involved. You hear the number before any work starts.",
  },
  {
    icon: CalendarCheck,
    step: "03",
    heading: "Pick a time that works",
    text: "We schedule around you and let you know when we're on the way, so you're not waiting around all day guessing.",
  },
  {
    icon: UserCheck,
    step: "04",
    heading: "We walk it with you",
    text: "On arrival we confirm exactly what's going. Anything you want to keep stays put — nothing leaves without your say-so.",
  },
  {
    icon: Truck,
    step: "05",
    heading: "We do the heavy lifting",
    text: "Our crew carries it out, loads the trailer, and handles the stairs, corners, and awkward turns. You don't move a thing.",
  },
  {
    icon: Sparkles,
    step: "06",
    heading: "We leave it clean",
    text: "Once the load is on, we sweep up the area. Then we haul everything off and sort for donation or recycling where we can.",
  },
];

const faqs = [
  ["How soon can you come out?", "It depends on the week, but we often have openings within a few days. Call or text and we'll tell you the soonest slot honestly."],
  ["Do I need to be home?", "For most jobs it helps to walk us through at the start. Some customers show us at the beginning and leave us to it."],
  ["How do I know the price before you start?", "We confirm the price on site before anything is loaded. If the job is bigger than the photos suggested, you hear about it first."],
  ["What if I only have one item?", "Single-item pickups are welcome. There's no requirement to fill a trailer."],
  ["Can I send photos by text?", `Yes — text photos and job details to ${PHONE} and we'll take a look.`],
] as const;

function HowItWorksPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="How it works"
        title="Six Simple Steps From Cluttered to Clear"
        text="No hidden fees, no waiting around for a four-hour window, no surprise add-ons when the trailer is already loaded."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader
            eyebrow="The process"
            title="What Happens From Your First Call"
            text="Here's the whole thing, start to finish, so there are no surprises."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {steps.map(({ icon: Icon, step, heading, text }) => (
              <article key={step} className="bg-card p-7">
                <div className="flex items-center justify-between">
                  <div className="grid size-11 place-items-center rounded-md bg-muted text-primary">
                    <Icon className="size-5" />
                  </div>
                  <span className="font-display text-3xl font-extrabold text-muted-foreground/30">{step}</span>
                </div>
                <h3 className="mt-6 text-lg font-bold">{heading}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader eyebrow="Real jobs" title="Hauling Services, Start to Finish" text="Real photos from our crew — carried out, loaded, and closed up." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              [job5.url, "EZ Haulaway pulling a wagon of boxes toward the dump trailer"],
              [job6.url, "Wheeling a dresser on a dolly to the EZ Haulaway trailer"],
              [job8.url, "Loaded wagon beside the black EZ Haulaway dump trailer"],
              [job7.url, "Closing the rear doors of the loaded EZ Haulaway dump trailer"],
            ].map(([src, alt]) => (
              <img key={src} src={src} alt={alt} loading="lazy" width={1200} height={800} className="aspect-[3/2] w-full rounded-lg object-cover" />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-5 lg:px-8">
          <SectionHeader
            center
            eyebrow="On the job"
            title="See EZ Haulaway in Action"
            text="See how quickly a cluttered space can become a clean one."
          />
          <div className="relative mt-10 overflow-hidden rounded-lg border border-border bg-secondary shadow-sm">
            <video
              controls
              muted
              playsInline
              preload="metadata"
              poster={timelapsePoster.url}
              src={timelapseAsset.url}
              className="aspect-video w-full object-cover"
            >
              Your browser does not support video playback.
            </video>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
          <SectionHeader
            eyebrow="Common questions"
            title="Before You Book"
            text="Anything else you're wondering about? Call or text and ask."
          />
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <section className="border-t border-border bg-card py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <SectionHeader
            eyebrow="Why it works"
            title="A Process Built Around Your Time and Your Property"
            text="Every step exists to remove a frustration people have had with junk removal companies in the past."
          />
          <div className="mt-10 space-y-6 leading-8 text-muted-foreground">
            <p>
              Quotes by photo mean you don't waste a Saturday waiting for an in-person estimate. Confirming the price
              before we load means you never get surprised at the end of the job. Walking the job with you on arrival
              means nothing leaves your property unless you said so. And sweeping up before we leave means the only
              sign we were there is the space you got back.
            </p>
            <p>
              The result our customers across Parker, Castle Rock, Centennial, and the greater Denver metro area talk
              about most isn't the hauling — it's the feeling afterward. The garage you can park in again. The
              basement that's finally usable. The backyard without the old hot tub or broken-down shed. One visit,
              and a project that felt overwhelming is simply done.
            </p>
          </div>
        </div>
      </section>

      <ProseSection {...pageExtras["how-it-works"]} />
      <CtaBand />
    </PageShell>
  );
}
