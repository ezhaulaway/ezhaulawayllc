import { priced } from "@/lib/price-store";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CtaBand,
  FaqAccordion,
  InlineQuoteForm,
  PageShell,
  SectionHeader,
} from "@/components/site-chrome";
import { locationBySlug, locations } from "@/content/locations";
import { locationPhoto } from "@/content/location-images";
import { serviceBySlug, services } from "@/content/services";
import { PHONE, PHONE_TEL, SITE_URL, BUSINESS_SCHEMA } from "@/content/site";
import { rich } from "@/components/prose-section";

/**
 * Hand-written local content for priority city+service pages.
 * Keyed by `${citySlug}/${serviceSlug}`. Pages listed here get unique
 * paragraphs, a unique local section, a custom meta description and
 * page-specific FAQs so they are not near-identical to the other
 * city+service pages.
 */
const RAW_CUSTOM_PAGES: Record<
  string,
  {
    title?: string;
    description: string;
    intro: string[];
    localHeading: string;
    localText: string[];
    faqs: Array<[string, string]>;
  }
> = {
  "castle-rock/hot-tub-removal": {
    description:
      "Hot tub removal in Castle Rock, CO from [[item:Hot tub]]. We cut up, haul out and dispose of old spas and hot tubs — including decks and pads they sit on. Free quotes, family-owned crew from Parker.",
    intro: [
      "Castle Rock backyards are full of hot tubs that came with the house — and half of them haven't run in years. Whether your spa is dead, cracked, or you're reclaiming the patio in The Meadows, Founders Village or Castlewood Ranch, we remove the whole thing: shell, cabinet, cover, pump and wiring.",
      "Most hot tubs won't fit through a gate or over a fence in one piece, so we cut them into manageable sections with a reciprocating saw, carry every piece out by hand, and load it into our 16-foot dump trailer. You don't touch anything — we disconnect, demolish, haul and sweep the pad when we're done.",
      "Hot tub removal in Castle Rock starts at [[item:Hot tub]] and goes up with size, access and whether the tub is sunk into a deck. Text us a few photos and we'll give you a firm price before we ever start the saw.",
    ],
    localHeading: "Hot Tub Removal Across Castle Rock Neighborhoods",
    localText: [
      "We work all over Castle Rock — from the older spas built into decks in The Meadows and Founders Village to newer swim spas in Crystal Valley and Terrain that need two crews and a full trailer. Tight side yards and HOA rules are normal here, and we plan around both: we protect your fence and landscaping on the carry-out and leave the site clean enough for your next project.",
      "If your hot tub sits on a concrete pad or is framed into a deck, we can take the surrounding decking and pad breaking as part of the same visit — it's one of the most common add-ons we do in Castle Rock. Everything gets sorted for disposal and recycling, and you get one price for the whole job up front.",
    ],
    faqs: [
      [
        "How much does hot tub removal cost in Castle Rock?",
        `Most Castle Rock hot tub removals run [[item:Hot tub]] to $800 depending on the tub's size, whether it's sunk into a deck, and how far we have to carry the pieces. Text photos to ${PHONE} for a firm quote — the price we give you is the price you pay.`,
      ],
      [
        "Can you remove a hot tub that's built into my deck?",
        "Yes — this is one of the most common jobs we do in Castle Rock. We cut the tub out, remove the surrounding framing if you want it gone, and can break up the concrete pad underneath as part of the same visit.",
      ],
      [
        "Do I need to disconnect the power and water first?",
        "No. We handle the disconnection as part of the job. If the tub is still live, we make sure the circuit is safe before we start cutting.",
      ],
    ],
  },
  "parker/shed-removal": {
    description:
      "Shed removal and tear-down in Parker, CO from [[load:4]]. We demolish, haul and dispose of old sheds — wood, metal or plastic — and leave the spot clean. Free quotes from your local Parker crew.",
    intro: [
      "We're based right here in Parker, so shed removal is practically our hometown specialty. From leaning metal sheds in older Parker neighborhoods to rotting wood sheds out toward Pinery and Stonegate, we tear them down, load every scrap into our trailer, and rake the spot clean.",
      "Most Parker shed removals run [[load:4]] to [[load:8]] depending on size, construction and what's still stored inside. If the shed is full of old tools, paint cans and junk, we clear that out first and price it with the load — one visit, one price, nothing left behind.",
      "Concrete footings and anchor posts are no problem. Post concrete gets priced with the load, and footings that can't come out cleanly can be cut at grade so you can sod or landscape right over the spot.",
    ],
    localHeading: "Parker's Local Shed Tear-Down Crew",
    localText: [
      "Because we live and work in Parker, we can usually get to a shed removal faster than anyone — often within a few days, and same-week is normal. We've torn down sheds in Canterberry, Cottonwood, Hidden River, Idyllwilde and just about every Parker neighborhood in between, so tight side yards, shared fences and HOA sightlines are nothing new to us.",
      "A lot of Parker sheds sit on gravel beds or old pavers rather than concrete. We'll tell you honestly what the ground under yours needs — sometimes the cleanest finish is hauling the gravel too, and we'll include that in the quote if you want the spot fully reset for grass, a garden bed or a new shed.",
    ],
    faqs: [
      [
        "How much does shed removal cost in Parker?",
        `Most Parker shed tear-downs run [[load:4]] to [[load:8]]. A small metal shed with easy access sits at the low end; a large wood shed full of stored junk sits at the high end. Text photos to ${PHONE} and we'll give you a firm price.`,
      ],
      [
        "Do you haul away what was inside the shed too?",
        "Yes — we clear out the contents first and price everything as one load. Old tools, lawn equipment, shelves and boxes all go in the trailer with the shed itself.",
      ],
      [
        "What about the concrete footings or slab?",
        "Post concrete gets priced with the load. Footings that won't come out cleanly can be cut at grade so you can landscape over the spot. Full slab removal is available too — just mention it when you send photos.",
      ],
    ],
  },
  "aurora/deck-and-fence-removal": {
    description:
      "Deck and fence tear-out in Aurora, CO. 300+ decks of construction experience — we demolish, haul and dispose of old decks, rails and fence lines. Free quotes, one price up front.",
    intro: [
      "Aurora's housing boom left thousands of aging cedar decks and leaning privacy fences, and we tear them out every week — from the older neighborhoods near Heather Ridge and Buckingham to newer builds out by Southlands where builders' grade decks are already failing.",
      "This isn't a side service for us. Our crew comes from construction with 300+ decks of hands-on experience, so we know exactly how a deck is put together — ledger boards, joist hangers, footings and all — which means we take it apart fast, safely, and without damaging your house.",
      "Deck and fence removal in Aurora is priced by trailer volume with a [[min]] minimum, and most full deck tear-outs run $800 to $2,500 depending on size, height and whether you want the footings pulled. Text photos for a firm quote before we start.",
    ],
    localHeading: "Deck & Fence Tear-Out Across Aurora",
    localText: [
      "We work all over Aurora's 160 square miles — second-story decks in Saddle Rock, ground-level cedar decks in Meadowood and Mission Viejo, and long fence lines along the Buckley corridor where wind does half the demolition for you. Tight lots, alley access and shared fence lines with neighbors are everyday situations for our crew.",
      "If you're replacing the deck, we coordinate timing with your contractor so the old structure is gone before the new build starts. If you're just reclaiming the yard, we can pull the footings, haul the concrete, and leave you a clean, level spot ready for sod or a patio.",
    ],
    faqs: [
      [
        "How much does deck removal cost in Aurora?",
        `Most full deck tear-outs in Aurora run $800 to $2,500 depending on size, height off the ground, and footing removal. Fence lines are priced by the trailer load with a [[min]] minimum. Text photos to ${PHONE} for a firm quote.`,
      ],
      [
        "Will tearing off the deck damage my house?",
        "No — our crew has 300+ decks of construction experience, so we know how ledger boards are flashed and fastened. We detach the deck from the house carefully and leave the rim and siding intact.",
      ],
      [
        "Do you remove the concrete footings too?",
        "Yes. Footings can be pulled and hauled with the load, or cut at grade if you'd rather landscape over them. Just let us know which you prefer when we quote the job.",
      ],
    ],
  },
  "denver/furniture-removal": {
    title: "Furniture Removal Denver CO | EZ Haulaway LLC – Fast, Free Estimates",
    description:
      "Furniture removal in Denver, CO. Couches, sectionals, mattresses & dressers hauled from inside your home. Upfront prices, free estimate. Book today!",
    intro: [
      "Need **furniture removal in Denver**? We pick up couches, sectionals, recliners, dressers, mattresses, bed frames and dining sets from inside your home, apartment, condo or office — and haul everything away in the same visit. From Capitol Hill walkups and LoDo lofts to bungalows in Wash Park and ranch homes in Harvey Park, our crew handles Denver furniture removal every week.",
      "You don't move anything to the curb. Two of us carry it down the stairs, out of the basement or through the hallway, and load it onto our 16-foot trailer. We do **all the heavy lifting** — you just point at what goes.",
      "A single couch or mattress falls under our **[[min]] minimum**. Bigger furniture removal jobs are priced by trailer space, up to **[[load:8]] for a full load**. Labor, hauling and disposal are always included in the price we quote — no hidden fees, no stair charges.",
    ],
    localHeading: "Couch and Sofa Removal Across Denver Neighborhoods",
    localText: [
      "Denver furniture removal jobs come with old bungalow basements, third-floor walkup apartments and alley-only access. We plan the route before we lift, and we protect floors, railings and door frames on the way out. Tight stairwells in Baker, narrow doorways in Congress Park, freight elevators downtown — we've worked through all of it.",
      "Wondering how to **get rid of large furniture** the city won't take? Denver's scheduled large-item pickup only covers curbside items, and you do the dragging. Our **junk removal** crew is the full-service option: we **handle the heavy lifting** from wherever the piece sits, so you never touch it. If you'd rather save a little, we also **offer curbside furniture pickup** — leave it out front and we'll swing by, load it and **haul away** everything in one stop.",
      "**Bulky furniture** is our specialty. Sleeper sofas with metal frames, oversized sectionals, solid-wood armoires, piano benches, box springs that won't bend around a landing — if it fits through the door, we'll get it out. Our **haul away services** cover single pieces all the way up to whole-house furniture disposal, priced by the trailer space your items take up.",
      "Every quote is **upfront pricing**: trailer-space rates that include labor, hauling and disposal, with **no hidden disposal fees** and no surprise charges at the door. Usable pieces go to local **furniture donation pickup** partners when we can, and we **recycle old furniture** — metal frames, springs and clean wood — to keep landfill waste down. That's removal and disposal services done the right way.",
      "**Furniture removal in Denver** often means more than one piece. Clearing a whole room, downsizing before a move, or emptying a rental between tenants? We price the whole job by trailer space so a couch, two dressers and a mattress cost less than booking three separate pickups.",
      "Furniture in good shape goes to **donation** whenever we can, so usable pieces stay in the community. Broken items get sorted, and metal frames and springs go to **recycling** instead of the landfill. Want a price before you book? Send a photo through our free instant estimate and you'll see your number in about a minute.",
      "Scheduling is simple: call or text, send photos, and we'll give you a firm price and the soonest available window. Because we're in Denver every week, most furniture removal jobs are on the calendar within a few days — and we show up when we say we will.",
    ],
    faqs: [
      [
        "How much does furniture removal cost in Denver?",
        "A single couch or mattress falls under our [[min]] minimum. Couches are priced per cushion at [[item:Couch]], and bigger jobs are priced by trailer space up to [[load:8]] for a full load. Text photos to " + PHONE + " for a firm price before any work starts.",
      ],
      [
        "Can you remove furniture from an upstairs apartment?",
        "Yes. We carry furniture down stairs and out of apartments and condos all over Denver. Let us know about elevators, parking rules or tight stairwells when you book so we bring the right crew and equipment.",
      ],
      [
        "Do you take sleeper sofas and sectionals?",
        "Yes. Sleeper sofas and sectionals are some of our most common Denver pickups. We take them apart if that's needed to get them out the door.",
      ],
      [
        "What happens to my old furniture after you haul it?",
        "Usable furniture goes to local donation centers when we can. Pieces that are broken or worn out get sorted, and metal frames and springs go to recycling. Only what truly can't be reused goes to the landfill.",
      ],
    ],
  },
  "denver/mattress-and-bulky-item-removal": {
    title: "Mattress Removal Denver CO | Same-Week Pickup | EZ Haulaway LLC",
    description:
      "Mattress removal in Denver, CO. We carry out mattresses, box springs and bulky items from any room, then donate or recycle. Upfront pricing, free estimate.",
    intro: [
      "Need **mattress removal in Denver**? We pick up old mattresses, box springs, bed frames and other bulky items from any room in your home — bedroom, basement or third-floor walkup — and haul them away in one visit. No dragging a mattress to the curb, no renting a truck.",
      "Our two-person crew does **all the heavy lifting**. We carry the mattress down the stairs, through the hallway and out to our 16-foot trailer, then sweep up before we leave. You just show us what goes.",
      "A mattress is **[[item:Mattress]]** and a box spring is **[[item:Box spring]]**. Add more items and the job is priced by trailer space, starting at our **[[min]] minimum**. Labor, hauling and disposal are included — **no hidden fees**.",
    ],
    localHeading: "Mattress Disposal and Bulky Item Pickup Across Denver",
    localText: [
      "**Old mattress removal** in Denver usually means tight spaces. Narrow stairwells in Capitol Hill, basement bedrooms in Wash Park bungalows, freight elevators in LoDo and RiNo lofts — we plan the way out before we lift and protect walls, railings and door frames.",
      "We take every size: **twin, full, queen, king and California king mattresses**, plus box springs, memory foam, hybrid and pillow-top beds, futon mattresses, cribs and adjustable bases. Bed frames and headboards go too, and we'll take them apart if needed.",
      "**Mattress recycling** matters to us. Mattresses take up a huge amount of landfill space, so we separate steel springs, foam and wood for recycling whenever possible. Clean, usable mattresses go to local **donation** partners when they'll accept them.",
      "Beyond mattresses, our **bulky item removal** covers treadmills ([[item:Treadmill]]), pianos (from [[item:Piano]]), sofas, recliners, dressers, armoires and exercise equipment — anything too big or heavy to handle yourself.",
      "Moving out of a Denver apartment, swapping in a new bed, or clearing a rental between tenants? We handle **same-week mattress pickup** for homeowners, renters and property managers, and we price multi-item jobs together so you save versus separate pickups.",
      "Getting a price is easy: text a photo or use our free instant estimate. You'll get **upfront pricing** before we start, and we show up on time in the window we give you.",
    ],
    faqs: [
      [
        "How much does mattress removal cost in Denver?",
        "A mattress is [[item:Mattress]] and a box spring is [[item:Box spring]]. Larger jobs are priced by trailer space starting at our [[min]] minimum. Text photos to " + PHONE + " for a firm price.",
      ],
      [
        "Do you carry the mattress down the stairs?",
        "Yes. We remove mattresses from any room, including upstairs bedrooms, basements and apartments. You never have to move it yourself.",
      ],
      [
        "What sizes of mattresses do you take?",
        "All of them — twin, full, queen, king and California king, plus box springs, futons, crib mattresses and adjustable bases.",
      ],
      [
        "What happens to my old mattress?",
        "Usable mattresses go to donation when partners accept them. Others are broken down so steel, foam and wood can be recycled, keeping as much as possible out of the landfill.",
      ],
    ],
  },
  "denver/appliance-removal": {
    description:
      "Appliance removal in Denver, CO: fridges, washers, dryers, stoves and dishwashers hauled from inside your home and recycled. Upfront pricing, free estimate.",
    intro: [
      "Need appliance removal in Denver? We haul refrigerators, freezers, washers, dryers, stoves, dishwashers and water heaters from your kitchen, basement or garage.",
      "We do the lifting, use dollies and straps on the stairs, and protect your floors on the way out.",
      "Appliances run [[item:Refrigerator (full size)]] to [[item:Refrigerator (side by side)]] each depending on size, and a single item falls under our [[min]] minimum. Fridges and freezers with Freon have a [[adj:freon]] handling fee.",
    ],
    localHeading: "Old Appliance Pickup Anywhere in Denver",
    localText: [
      "Replacing a kitchen or laundry set? We can take the old appliances plus any other junk from the remodel in the same trip, priced by trailer space.",
      "Appliances go to metal recycling whenever possible instead of the landfill. Send a photo through the instant estimate for a quick price.",
    ],
    faqs: [
      [
        "How much does appliance removal cost in Denver?",
        "Most appliances run [[item:Refrigerator (full size)]] to [[item:Refrigerator (side by side)]]. A single item falls under our [[min]] minimum. Fridges and freezers add a [[adj:freon]] Freon fee.",
      ],
      [
        "Do I need to disconnect my appliance first?",
        "It's best to unplug it and shut off the water to a washer or fridge line. Gas appliances should be disconnected by a pro before we arrive.",
      ],
      [
        "Where do old appliances go?",
        "We take them to metal recycling whenever possible, so they don't end up in a landfill.",
      ],
    ],
  },
};
const CUSTOM_PAGES = priced(RAW_CUSTOM_PAGES);

export const Route = createFileRoute("/service-areas/$city_/$service")({
  loader: ({ params }) => {
    const location = locationBySlug(params.city);
    const service = serviceBySlug(params.service);
    if (!location || !service) throw notFound();
    const custom = CUSTOM_PAGES[`${params.city}/${params.service}`] ?? null;
    return { location, service, custom };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Page not found — EZ Haulaway" }, { name: "robots", content: "noindex" }] };
    }
    const { location, service, custom } = loaderData;
    const url = `${SITE_URL}/service-areas/${params.city}/${params.service}`;
    const title = custom?.title ?? `${service.name} ${location.city} CO | EZ Haulaway`;
    const description =
      custom?.description ??
      `${service.name} in ${location.city}, Colorado. ${service.summary} Local, family-owned crew from Parker. Free quotes — call or text ${PHONE}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
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
  const nearby = locations.filter((item) => location.nearby.includes(item.slug));

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
            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-[1.1] sm:text-5xl">{`${name} ${city}`}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Need {lower} in {city}? {service.summary}
            </p>
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
              <Link
                key={item.slug}
                to="/service-areas/$city/$service"
                params={{ city: location.slug, service: item.slug }}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                {item.name} {city}
              </Link>
            ))}
          </div>
          {nearby.length > 0 && (
            <>
              <p className="mt-8 font-display font-bold">{name} in nearby towns</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {nearby.map((item) => (
                  <Link
                    key={item.slug}
                    to="/service-areas/$city/$service"
                    params={{ city: item.slug, service: service.slug }}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                  >
                    {name} {item.city}
                  </Link>
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
