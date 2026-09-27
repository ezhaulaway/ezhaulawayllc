import { priced } from "@/lib/price-store";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBand, PageHero, PageShell, SectionHeader } from "@/components/site-chrome";
import { PHONE, PHONE_TEL, SITE_URL } from "@/content/site";

const title = "Junk Removal FAQ | EZ Haulaway Parker CO — Prices & Answers";
const description =
  "Straight answers about junk removal pricing, trailer size, same-day pickups, what we can't take, and how quotes work. EZ Haulaway, Parker CO.";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/faq` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/faq` }],
  }),
  component: FaqPage,
});

type Answer = {
  question: string;
  paragraphs: string[];
};

const raw_groups: { heading: string; eyebrow: string; items: Answer[] }[] = [
  {
    eyebrow: "Pricing",
    heading: "What Junk Removal Costs With EZ Haulaway",
    items: [
      {
        question: "How much does junk removal cost in Parker and the Denver metro area?",
        paragraphs: [
          "We price by how much room your junk takes up in our dump trailer, and we confirm the number in person before anything is loaded. A minimum load starts at [[min]]. A quarter trailer runs [[load:2]], a half trailer is [[load:4]], three-quarters is [[load:6]], and a completely full trailer is [[load:8]]. Extra labor beyond normal loading is [[labor]] per hour.",
          "There is no travel fee inside our service area, no fuel surcharge, and no dump-fee add-on after the fact. The price we say out loud is the price you pay.",
        ],
      },
      {
        question: "How big is your trailer, and how does it compare to renting a dumpster?",
        paragraphs: [
          "Our dump trailer is 16 feet long, 8 feet wide, and 3 feet deep — about 14 cubic yards, roughly the same capacity as a small roll-off dumpster. The difference is that a dumpster sits in your driveway for a week, needs a permit in some neighborhoods, and you do all of the lifting yourself. We show up, load everything by hand, and the junk is gone the same day.",
        ],
      },
      {
        question: "What do individual items cost to haul away?",
        paragraphs: [
          "Common single items: mattress [[item:Mattress]], box spring [[item:Box spring]], couch [[item:Couch]] per cushion, refrigerator or washer [[item:Refrigerator (full size)]] to [[item:Refrigerator (side by side)]], treadmill [[item:Treadmill]], piano from [[item:Piano]], and hot tub removal from [[item:Hot tub]]. Sheds generally run [[load:4]] to [[load:8]] depending on size and construction. Single-item pickups still fall under the [[min]] minimum load.",
        ],
      },
    ],
  },
  {
    eyebrow: "Getting a quote",
    heading: "How Quotes and Scheduling Work",
    items: [
      {
        question: "Can I just text photos to get a quote?",
        paragraphs: [
          `Yes, and it is the fastest way. Text photos of the pile, room, or item to ${PHONE} and we will send back a price range, usually the same day. You can also use the instant estimate tool on our pricing page — upload up to four photos, describe the job, and it returns a preliminary price range in under a minute.`,
        ],
      },
      {
        question: "Do you offer same-day or next-day junk removal?",
        paragraphs: [
          "Often, yes. We keep room in the schedule for urgent jobs like closings, move-outs, and rental turnovers. Availability changes day to day, so call or text for the soonest open slot rather than waiting on a form.",
        ],
      },
      {
        question: "Do I have to be home when you arrive?",
        paragraphs: [
          "Not always. If the items are outside, in an unlocked garage, or a property manager has given us access, we can handle the job and send photos plus payment details when we finish. For inside work, we do prefer someone on site to point out exactly what stays and what goes.",
        ],
      },
    ],
  },
  {
    eyebrow: "The job itself",
    heading: "What Happens on Removal Day",
    items: [
      {
        question: "Do I need to carry everything to the curb or driveway first?",
        paragraphs: [
          "No. This is full-service hauling. We carry items out of basements, attics, upstairs bedrooms, backyards, sheds, storage units, and crawl spaces. We bring floor protection and furniture blankets, disassemble what has to come apart, and sweep the area before we leave.",
        ],
      },
      {
        question: "Do you take apart hot tubs, sheds, and old decks?",
        paragraphs: [
          "Yes — that is some of our favorite work. We cut down and haul hot tubs and spas, tear down wood and metal sheds, and remove worn-out decks and fence lines. We have taken out more than 300 decks across the south metro. Fence and deck post concrete is priced with the load; in some cases footings are cut at grade instead of dug out.",
        ],
      },
      {
        question: "What items can you not take?",
        paragraphs: [
          "We cannot take hazardous materials. That means wet or liquid paint, chemicals, solvents, motor oil, fuel, propane tanks, asbestos, and medical waste. Fully dried-out paint cans are fine. If you are unsure about something, send a photo and we will tell you straight.",
        ],
      },
      {
        question: "Where does my junk actually go after you drive away?",
        paragraphs: [
          "We sort every load. Usable furniture, appliances, and household goods go to local donation centers, metal and appliances go to recycling, and only what is left heads to a licensed transfer station. Keeping usable items out of the landfill costs you nothing extra.",
        ],
      },
    ],
  },
  {
    eyebrow: "About us",
    heading: "Who You Are Actually Hiring",
    items: [
      {
        question: "Who is EZ Haulaway?",
        paragraphs: [
          `EZ Haulaway LLC is a family-owned junk removal and light demolition business run by Ben and Zoe out of Parker, Colorado. You are not getting a franchise call center — you talk to the people who show up. Call or text ${PHONE}.`,
        ],
      },
      {
        question: "Which towns do you serve?",
        paragraphs: [
          "Parker, Castle Rock, Castle Pines, Centennial, Highlands Ranch, Lone Tree, Littleton, Englewood, Denver, Aurora, Lakewood, Elizabeth, Franktown, and Sedalia. If your town is nearby but not on that list, ask — we usually still come out.",
        ],
      },
      {
        question: "Do you do commercial and property management work?",
        paragraphs: [
          "Yes. We handle office and retail cleanouts, construction debris, tenant turnovers, and eviction cleanouts, and we are happy to set up repeat pickups. We can often work around your hours so your business or tenants are not disrupted.",
        ],
      },
    ],
  },
];
const groups = priced(raw_groups);

function FaqPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Frequently asked questions"
        title="Junk Removal Questions, Answered Straight"
        text="Real prices, real limits, and how the day actually goes. If your question isn't here, call or text us and ask."
      />

      {groups.map((group) => (
        <section key={group.heading} className="border-b border-border py-14 sm:py-16">
          <div className="mx-auto max-w-3xl px-5 lg:px-8">
            <SectionHeader eyebrow={group.eyebrow} title={group.heading} />
            <div className="mt-10 space-y-10">
              {group.items.map((item) => (
                <article key={item.question}>
                  <h3 className="font-display text-xl font-extrabold leading-snug sm:text-2xl">{item.question}</h3>
                  {item.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mt-4 leading-8 text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Still have a question?</h2>
          <p className="mt-4 leading-8 text-muted-foreground">
            Call or text and you'll talk to Ben directly. You can also see full pricing or find your town.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={`tel:${PHONE_TEL}`}>
                <Phone /> Call or Text {PHONE}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/pricing">See Pricing</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/service-areas">Service Areas</Link>
            </Button>
          </div>
        </div>
      </section>

      <CtaBand />
    </PageShell>
  );
}
