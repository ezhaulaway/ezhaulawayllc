import { ProseSection } from "@/components/prose-section";
import { pageExtras } from "@/content/page-extras";
import { createFileRoute } from "@tanstack/react-router";
import { HeartHandshake, Leaf, ShieldCheck, Users } from "lucide-react";
import { CtaBand, PageHero, PageShell, SectionHeader } from "@/components/site-chrome";
import { SITE_URL, reviews, GOOGLE_REVIEWS_URL } from "@/content/site";
import { Star } from "lucide-react";
import benAndZoe from "@/assets/ben_and_zoe_photo.avif.asset.json";

const title = "About EZ Haulaway — Local Junk Removal in Parker, CO";
const description =
  "EZ Haulaway is a locally owned junk removal company serving Parker and the Denver metro area. Meet the crew, see how we work, and read real customer reviews.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/about` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/about` }],
  }),
  component: AboutPage,
});

const values = [
  { icon: Users, title: "Locally owned", text: "You're dealing with the owner, not a call center or a franchise script." },
  { icon: ShieldCheck, title: "Straight pricing", text: "You hear the number before we lift anything, and it doesn't change afterward." },
  { icon: HeartHandshake, title: "Respectful crews", text: "We watch your walls, doors, and floors, and we sweep up before we go." },
  { icon: Leaf, title: "Donate and recycle", text: "Usable items get a second life wherever we can find one instead of a landfill." },
];

function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About us"
        title="A Local Crew That Shows Up and Does the Work"
        text="EZ Haulaway is a locally owned hauling company based in Parker, Colorado. When you call, you get real people who treat your property like their own."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <div className="flex justify-center rounded-lg border border-border bg-muted p-4">
            <img
              src={benAndZoe.url}
              alt="Ben of EZ Haulaway with his dog Zoe"
              width={619}
              height={640}
              className="h-auto w-full max-w-md rounded-md"
            />
          </div>
          <div>
            <SectionHeader
              eyebrow="Who you're hiring"
              title="Built on Hard Work and Word of Mouth"
              text="EZ Haulaway started with a trailer, a strong back, and a simple promise: show up when you say you will, quote honestly, and leave the space better than you found it."
            />
            <p className="mt-6 max-w-xl leading-8 text-muted-foreground">
              Most of our work comes from neighbors telling neighbors. That only happens if every job is done right, so
              that's how we approach all of them — whether it's one mattress out of a spare room or an entire property
              cleared before a closing date.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader center eyebrow="How we work" title="What You Can Count On" />
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title: heading, text }) => (
              <article key={heading} className="bg-card p-7">
                <Icon className="size-6 text-primary" />
                <h3 className="mt-6 text-lg font-bold">{heading}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader center eyebrow="Reviews" title="What Customers Say" />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {reviews.map((review) => (
              <figure key={review.name} className="rounded-lg border border-border bg-card p-7">
                <div className="flex gap-1" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="size-4 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="mt-5 leading-7 text-muted-foreground">“{review.text}”</blockquote>
                <figcaption className="mt-6 text-sm font-bold">
                  {review.name}
                  <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Google Review
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-bold text-primary underline-offset-4 hover:underline"
            >
              Read More Reviews on Google
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <SectionHeader
            eyebrow="The experience"
            title="What Hiring EZ Haulaway Actually Feels Like"
            text="Junk removal is a service most people only need once in a while — so it should be simple every single time."
          />
          <div className="mt-10 space-y-6 leading-8 text-muted-foreground">
            <p>
              From the first call or text, you're talking to the people who will actually show up at your door.
              There's no call center, no runaround, and no franchise script. We ask a few questions, look at your
              photos, and give you an honest price for your junk removal job — whether it's a single mattress in
              Parker or a full estate cleanout in the Denver metro area.
            </p>
            <p>
              When the job is done, the feeling we hear about most is relief. The project you'd been dreading for
              months is finished in an afternoon. The space is swept, the clutter is gone, and usable items are on
              their way to donation instead of a landfill. You didn't lift anything, rent a truck, or make a single
              trip to the dump.
            </p>
            <p>
              That's the standard we hold every job to, because in a local business your reputation is everything.
              Most of our work comes from neighbors telling neighbors — and that only happens when every customer
              walks away feeling like the job was done right.
            </p>
          </div>
        </div>
      </section>

      <ProseSection {...pageExtras["about"]} />
      <CtaBand />
    </PageShell>
  );
}
