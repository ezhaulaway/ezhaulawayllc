import deckImage from "@/assets/branded-service-deck.webp";
import demolitionImage from "@/assets/branded-service-demolition.webp";
import type { Service } from "./services";

/**
 * Customer-facing permit note. Ben is handling the paperwork side himself.
 * Do not say we pull permits, name a fee, or claim a contractor registration.
 */
export const DEMOLITION_PERMIT_NOTE =
  "Some jurisdictions, including unincorporated Douglas County, may require a demolition permit when a structure or part of one is permanently removed. Parker, Castle Rock, and other towns have their own rules. A small shed or a short run of fence is not always treated the same way as a deck attached to the house. We do not pull the permit for you. If you are not sure, check with your city or county building department before we start, or ask us and we will point you to the right office. A permit is a paperwork step. It does not change how the tear-down is done.";

export const deckRemoval: Service = {
  slug: "deck-removal",
  name: "Deck Removal",
  h1: "Deck Removal & Deck Demolition in Parker and the Denver Metro",
  metaTitle: "Deck Removal Denver Metro | Tear-Down & Haul-Away",
  metaDescription:
    "Deck removal and deck demolition in Parker, Castle Rock, Aurora, and the Denver metro. Boards, framing, and stairs hauled away. Free photo quote.",
  summary: "Wood and composite decks, stairs, and railings taken apart and hauled away.",
  image: deckImage,
  imageAlt: "Crew loading deck boards from a partially dismantled deck into the dump trailer",
  intro: [
    "Colorado sun, snow, and hail are hard on a deck. When the boards splinter or the frame feels soft, the tear-out is the first step toward a new deck, a patio, or just getting the yard back.",
    "EZ Haulaway does deck removal and deck demolition across Parker, Castle Rock, Highlands Ranch, Aurora, and the rest of the south Denver metro. Ben has roughly six years of construction and demolition experience and has worked on more than 300 decks, so the structure comes apart in the order it went up. Every board leaves on our trailer.",
  ],
  includes: [
    "Ground-level and elevated wood decks",
    "Composite decks",
    "Stairs, landings, and railings",
    "Ledger boards where the deck meets the house",
    "Posts, and concrete footings when you want them out",
    "Haul-away and a rake of the footprint",
  ],
  sections: [
    {
      heading: "What a deck removal includes",
      text: "We take the deck apart and haul it. That means boards, joists, beams, posts, railings, and stairs. Hardware goes with the lumber. We rake the footprint so you are not walking on nails, and so the next person — you, a landscaper, or a builder — can start.\n\nA pergola or gazebo that is part of the same structure can come down in the same visit. A freestanding pergola or playset is on the light demolition page. A fence line has its own page.",
      links: [
        { slug: "light-demolition", label: "Light demolition for pergolas, playsets, and interior tear-outs" },
        { slug: "fence-removal", label: "Fence removal" },
      ],
    },
    {
      heading: "How the job goes",
      text: "It starts with photos or a walkthrough. We look at the size, the height, how it attaches to the house, and how we get the lumber to the trailer.\n\nOn site we confirm the price before any boards come up. We check that nothing is still tied to the deck that should stay, including a hot tub, a gas line, or low-voltage lights. Then we dismantle from the outside in: railings and boards first, framing next, and the ledger at the house last. The load goes on our 16-foot dump trailer. We rake and sweep the footprint before we leave.\n\nA ground-level deck is often a few hours. A large or elevated deck with stairs and footings can take most of a day. We tell you which one yours looks like when we quote it. You do not have to be home the whole time if we have access and a way to reach you, but someone should walk the job with us at the start.",
    },
    {
      heading: "What changes the price",
      text: "Deck removal is priced from the photos, not from a flat rate per square foot. What moves the number:\n\nGround-level versus elevated. A deck you can step onto is a different job from one with a long drop and a lot of framing.\n\nAttached versus freestanding. An attached deck is fastened to a ledger against your siding. That connection is slow on purpose.\n\nStairs, landings, and railings. They add lumber and time.\n\nWood versus composite. Composite is heavier and often costs more to dispose of than plain lumber.\n\nConcrete footings. We can pull them when they come out cleanly, or cut them at grade if you would rather landscape over the spot. Tell us which you want.\n\nAccess. A wide side yard is easier than a gate, a slope, or a deck wrapped around a pool.\n\nSend a couple of photos and a rough footprint, length by width and how high it sits. You get a number before we schedule, and we confirm it on site before we start. Our [deck removal cost guide](/blog/deck-removal-cost) walks through the same factors. Trailer-load pricing for mixed debris starts at [[min]].",
    },
    {
      heading: "Attached decks and the wall behind them",
      text: "A deck that touches the house is bolted or lagged to a ledger board, usually with flashing tucked under the siding. Pulled the wrong way, that is a leak you did not budget for. We take the ledger off by hand, last, and we tell you what the wall looks like once it is open.\n\nWe do not patch siding, replace flashing, or reside the wall. If the boards behind the ledger are soft, we will show you. Your builder or a siding contractor handles the repair. If a new deck is going in the same place, tell us. We can leave the site clear for that crew and time the tear-out so they are not waiting on a pile of old lumber.",
    },
    {
      heading: "Footings, utilities, and what to do before we arrive",
      text: "Clear the deck of furniture, grills, and planters, or tell us those go too. Unlock the gate. Mention a pool, a hot tub, irrigation, or soft ground.\n\nBuried lines can sit under a footing. Before we dig any footing out, utilities need to be marked. Call 811, or tell us and we will talk through who places the request. We do not trench and we do not regrade the yard.\n\nIf a hot tub sits in the deck, the electrical disconnect has to be done by a licensed electrician before we cut the spa. You arrange that, or it is arranged separately. We do not do electrical work.",
      links: [
        { slug: "hot-tub-removal", label: "Hot tub removal" },
        { slug: "dirt-rock-mulch-delivery", label: "Small-load dirt, rock, and mulch after the deck is gone" },
      ],
    },
    {
      heading: "Permits",
      text: DEMOLITION_PERMIT_NOTE,
    },
    {
      heading: "Decks around pools, and same-day timing",
      text: "A deck around a pool or hot tub comes apart the same way, with extra care so debris stays out of the water. Tell us about the pool cover and where we can walk.\n\nSame-day deck removal depends on the schedule and the size of the job. Call or text with photos and we will tell you the soonest opening. We would rather give you a real day than promise one we cannot keep.",
    },
    {
      heading: "Where the lumber goes, and what we do not do",
      text: "Metal hardware can go to recycling when a yard will take it. Usable boards can be set aside if you want them. The rest goes to a licensed disposal site. We do not promise that every board is recycled.\n\nWe do not build the new deck. We do not remove load-bearing parts of the house, retaining walls that hold up a slope, or concrete driveways. A small pad we can break by hand is a different conversation from a slab that needs a machine. We are not an EPA lead-safe certified firm. If the deck is on a home built before 1978 and taking it off will disturb a lot of painted siding, tell us the year the home was built before we schedule.\n\nWe do not take asbestos. A freestanding deck is not the same job as opening walls inside an older house.",
    },
    {
      heading: "Parker, Aurora, and the south metro",
      text: "We are based in Parker. Deck calls come from Stonegate, The Pinery, Stroh Ranch, and the acreage toward Franktown, and from Castle Rock, Highlands Ranch, Centennial, Littleton, and Denver. Aurora has its own page because the neighborhoods there are specific: older cedar decks near Heather Ridge and newer ones out by Southlands.",
      links: [{ slug: "deck-removal", city: "aurora", label: "Deck removal in Aurora" }],
    },
  ],
  faqs: [
    ["How much does it cost to tear down a deck?", "It depends on size, height, whether the deck is attached to the house, stairs, wood versus composite, concrete footings, and access. Send photos and a rough footprint and we will give you a firm number before we schedule. We do not publish a per-square-foot rate."],
    ["How do you tear down an old deck?", "Railings and boards come off first, then the framing, and the ledger at the house last. Everything is loaded onto our trailer and the footprint is raked. You do not need to pull boards before we arrive."],
    ["Do I need to be home during the demolition?", "Someone should walk the job with us at the start and confirm the price. You do not have to watch the whole tear-out if we can reach you."],
    ["Can you remove a deck that is attached to the house?", "Yes. The ledger is the last piece off, and it comes off by hand so we are not prying against your siding. We will tell you what the wall looks like. We do not patch the siding."],
    ["Can you remove a deck around a pool or hot tub?", "Yes. Tell us about the pool or spa in the photos. A hot tub's electrical disconnect has to be done by a licensed electrician before we cut the spa. You arrange that, or it is arranged separately."],
    ["Do I need a permit to remove a deck?", "Sometimes. Unincorporated Douglas County may require a demolition permit when a structure is permanently removed, and Parker, Castle Rock, and other towns have their own rules. We do not pull the permit. Check with your building department, or ask us which office to call."],
    ["How long does deck removal take?", "A ground-level deck is often a few hours. A large or elevated deck with stairs and footings can take most of a day. We tell you what yours looks like when we quote it."],
    ["Will you pull the concrete footings?", "When you want them out and they will come, yes. If you would rather landscape over them, we can cut them at grade. Say which you prefer in the photos."],
    ["Can you remove just part of a deck?", "Yes. Partial removals, railing-only jobs, and stair tear-outs are common. Mark what stays."],
    ["Do you haul the old deck and then bring fill dirt?", "We can haul the deck and, as a separate small-load job, bring fill or topsoil and place it in the yard. We do not grade the lot. See dirt, rock, and mulch delivery."],
  ],
  related: ["fence-removal", "light-demolition", "hot-tub-removal", "dirt-rock-mulch-delivery"],
};

export const fenceRemoval: Service = {
  slug: "fence-removal",
  name: "Fence Removal",
  h1: "Fence Removal & Fence Demolition in Parker and the Denver Metro",
  metaTitle: "Fence Removal Denver Metro | Posts, Panels & Haul-Away",
  metaDescription:
    "Wood, vinyl, and chain-link fence removal in Parker, Castle Rock, and the Denver metro. Posts and concrete hauled away. Free photo quote.",
  summary: "Wood, vinyl, and chain-link fence lines taken down, including posts.",
  image: demolitionImage,
  imageAlt: "Crew taking apart a wood structure and stacking boards beside the dump trailer",
  cityPages: false,
  intro: [
    "A leaning fence is usually a whole line of posts, not one bad panel. Taking it down means the panels, the posts, and a decision about the concrete in the ground.",
    "EZ Haulaway removes wood, vinyl, and chain-link fences across Parker, Castle Rock, Highlands Ranch, and the south Denver metro. We load the material and leave the line walkable. If a deck is coming out too, that is a separate page and can be the same visit.",
  ],
  includes: [
    "Wood privacy and split-rail fences",
    "Vinyl and composite panels",
    "Chain link",
    "Posts",
    "Concrete around posts, pulled or cut at grade",
    "Haul-away of the old fence",
  ],
  sections: [
    {
      heading: "What fence removal includes",
      text: "We take the fence down and haul it. Panels, rails, pickets, chain link, and posts. Tell us the approximate length, the material, and about how many posts. A photo along the line is enough to start a quote.\n\nWe do not install the new fence. If a contractor is putting one in, we can clear the old line first so they are not working around it.",
      links: [{ slug: "deck-removal", label: "Deck removal" }],
    },
    {
      heading: "How the job goes",
      text: "Photos first, then a price, then a day. On site we confirm which line is yours before anything comes down. Panels come off, posts come out or get cut, and the material goes on the trailer.\n\nA straight run with easy access is a few hours. A long line, a slope, or posts set deep in concrete takes longer. Shared fence lines are common in Parker and Castle Rock HOAs. Point out the property line and any section the neighbor owns. We stop at your side.",
    },
    {
      heading: "What changes the price",
      text: "We do not publish a per-foot rate. The quote follows the line you actually have:\n\nLength and number of posts.\n\nMaterial. Chain link, cedar, and vinyl do not load or dispose the same way.\n\nConcrete. Post concrete is heavy. We price it with the load and tell you whether the footings are coming out or being cut at grade.\n\nAccess and slope. A side yard you can walk is different from a line behind a retaining bed or down a hill.\n\nGates, lattice, and anything attached to the house or a deck.\n\nSend photos from each end of the line. Trailer-load pricing for the debris starts at [[min]] when the job is small. Longer lines are quoted as their own job.",
    },
    {
      heading: "Posts and concrete",
      text: "Most of the work people underestimate is underground. A wood post in concrete does not pull like a stake. We can dig the footing out when you want the hole gone, or cut the post at grade and leave the concrete buried if you are putting a new post nearby or planting over it.\n\nBefore we dig, buried utilities need to be marked. Call 811, or tell us and we will talk through who places the request. We do not trench, and we do not take out a retaining wall that is holding up soil.",
    },
    {
      heading: "Permits and property lines",
      text: `${DEMOLITION_PERMIT_NOTE}\n\nA fence on the property line may be shared. We will not take down a neighbor's fence because it looks like yours. If you are not sure, check the survey or ask the neighbor before we schedule.`,
    },
    {
      heading: "What to do before we arrive, and what we do not do",
      text: "Unlock gates, move cars off the line, and tie up dogs. Tell us about sprinkler heads along the posts. If a section has power to it, such as a gate operator, that disconnect is an electrician's job, arranged by you or arranged separately. We do not do electrical work.\n\nWe do not set new posts, pour concrete, or haul away a fence we did not take down unless the pile is already on the ground and you want a haul-only visit. Scrap lumber that is already down can go with a wood haul. Paint, stain cans, and solvents stay with you for a household hazardous waste drop-off.",
      links: [
        { slug: "wood-pallet-removal", label: "Wood pallet and scrap lumber haul-away" },
        { slug: "yard-and-landscaping-debris", label: "Yard debris if the line is full of brush too" },
      ],
    },
  ],
  faqs: [
    ["How much does fence removal cost?", "It depends on the length, the material, the number of posts, how much concrete is in the ground, and access. Send photos of the line. We do not publish a per-foot price."],
    ["Do you remove fence posts and the concrete?", "Yes, when you want them out. If you would rather cut the posts at grade and leave the concrete, say so and we will price that instead."],
    ["Can you remove a wood, vinyl, or chain-link fence?", "Yes. Tell us which it is. Mixed lines are fine if the photos show both."],
    ["Will you remove a shared fence?", "Only the part that is yours. Show us the property line. We will not take a neighbor's fence down on a guess."],
    ["Do I need a permit to remove a fence?", "Sometimes, depending on the town and the fence. Unincorporated Douglas County may require a demolition permit when a structure is permanently removed. We do not pull permits. Check with your building department if you are unsure."],
    ["How long does fence removal take?", "A straightforward run is often a few hours. A long line or posts in deep concrete can take most of a day. We will say which yours looks like before we schedule."],
    ["Do you install the new fence?", "No. We take the old one out and haul it so your fence contractor can start."],
    ["Can the deck come out the same day?", "Yes, when both are part of the quote. Deck removal has its own page if that is the main job."],
  ],
  related: ["deck-removal", "light-demolition", "yard-and-landscaping-debris", "shed-removal"],
};
