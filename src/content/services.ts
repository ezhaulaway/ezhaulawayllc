import { priced } from "@/lib/price-store";
import furnitureAsset from "@/assets/branded-service-furniture.webp";
import applianceAsset from "@/assets/branded-service-appliance.webp";
import hotTubAsset from "@/assets/branded-service-hot-tub.webp";
import lightDemolitionAsset from "@/assets/branded-service-demolition.webp";
import deckAsset from "@/assets/branded-service-deck.webp";
import constructionAsset from "@/assets/branded-service-construction.webp";
import yardAsset from "@/assets/branded-service-yard.webp";
import garageAsset from "@/assets/real-IMG_5005.jpg.asset.json";
import estateAsset from "@/assets/real-basement-panel-1000.webp";
import basementBefore640 from "@/assets/real-basement-before-640.webp";
import basementBefore960 from "@/assets/real-basement-before-960.webp";
import basementAfter640 from "@/assets/real-basement-after-640.webp";
import basementAfter960 from "@/assets/real-basement-after-960.webp";
import bulkyAsset from "@/assets/real-IMG_5082.jpg.asset.json";
import electronicsAsset from "@/assets/branded-service-electronics.webp";
import commercialAsset from "@/assets/branded-service-commercial.webp";
import shedImage from "@/assets/branded-service-shed.webp";
import { serviceExtras } from "./service-extras";
import { woodPalletRemoval } from "./wood-pallet-removal";
import { dumpsterRentalAlternative, hoarderCleanout, storageUnitCleanout } from "./specialty-services";
import { evictionCleanout, makeReadyHaulOff, basementAtticCleanout } from "./property-services";

export type Service = {
  slug: string;
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  image: string;
  imageAlt: string;
  realJob?: {
    eyebrow: string;
    title: string;
    text: string;
    facts: string[];
    before: { src: string; srcSet: string; alt: string };
    after: { src: string; srcSet: string; alt: string };
  };
  intro: string[];
  includes: string[];
  sections: Array<{ heading: string; text: string; links?: Array<{ slug: string; label: string; city?: string }> }>;
  faqs: Array<[string, string]>;
  related: string[];
  cityPages?: boolean;
};

const raw_services: Service[] = [
{
    slug: "furniture-removal",
    name: "Furniture Removal",
    h1: "Furniture Removal in Parker & the Denver Metro Area",
    metaTitle: "Furniture Removal Services & Couch Removal | EZ Haulaway",
    metaDescription: "Furniture and couch removal in Parker and the Denver metro. We carry out sofas, tables, chairs and dressers. Free quotes, no lifting for you.",
    summary: "Couches, sectionals, tables, chairs, dressers, shelving, and office furniture.",
    image: furnitureAsset,
    imageAlt: "Crew carrying a sofa to a pickup and dump trailer",
    intro: [
      "Old furniture is bulky, awkward on stairs, and almost never fits in a car. EZ Haulaway takes the whole problem off your hands — you point at the sofa, we carry it out.",
      "We work in occupied homes every week, so floors, doorframes, and corners get treated carefully on the way out.",
    ],
    includes: [
      "Couches, sectionals, and recliners",
      "Sofas, loveseats, and sleeper sofas",
      "Dressers, nightstands, and armoires",
      "Dining tables, chairs, and bar stools",
      "Desks, filing cabinets, and office chairs",
      "Bookshelves, entertainment centers, and cabinets",
    ],
    sections: [
      {
        heading: "Upstairs, basement, or backyard — it still gets loaded",
        text: "Furniture rarely waits in the driveway. Our crew handles narrow stairwells, tight basement turns, and long backyard carries as part of the job, not as an upcharge surprise.",
      },
      {
        heading: "Clearing a whole house or just one piece",
        text: "One recliner or an entire furnished home, the process is the same: tell us what needs to go, get a price, and we haul it. Larger loads are quoted by volume so you know what you are paying for.",
      },
      {
        heading: "Just a mattress?",
        text: "If all you need gone is an old mattress or box spring, see our dedicated mattress page.",
        links: [{ slug: "mattress-and-bulky-item-removal", city: "denver", label: "Mattress Removal Denver" }],
      },
    ],
    faqs: [
      ["Do I need to move the furniture outside first?", "No. Leave it where it sits. Our crew carries everything out for you."],
      ["Can you take a dining table and chairs together?", "Yes. Tables, chairs, and matching sets go out in the same visit."],
      ["Will you take furniture apart?", "When something will not fit through a door intact, we break it down on site so it can be carried out safely."],
    ],
    related: ["mattress-and-bulky-item-removal", "house-and-estate-cleanouts", "commercial-junk-removal"],
  },
{
    slug: "appliance-removal",
    name: "Appliance Removal",
    h1: "Appliance Removal, Fridge Removal & Disposal in the Denver Metro",
    metaTitle: "Appliance Removal & Disposal | Fridge Removal | EZ Haulaway",
    metaDescription:
      "Appliance removal, fridge removal and appliance disposal in Parker and the Denver metro. We carry it out and recycle the metal. Upfront free quotes.",
    summary: "Refrigerators, washers, dryers, stoves, dishwashers, and water heaters.",
    image: applianceAsset,
    imageAlt: "Crew loading a refrigerator onto the dump trailer",
    intro: [
      "Appliances are heavy, sharp-edged, and a real risk to your back and your flooring. We bring the dollies, the straps, and the crew.",
      "Whether your old unit sits in the garage or still needs to come out of the laundry room, we load it and take it away the same visit.",
    ],
    includes: [
      "Refrigerators and freezers",
      "Washers and dryers",
      "Stoves, ovens, and ranges",
      "Dishwashers and microwaves",
      "Water heaters and furnaces",
      "Small kitchen appliances",
    ],
    sections: [
      {
        heading: "Replacing an appliance?",
        text: "Delivery crews often will not take the old unit, or will only take it from the curb. We pull it from where it stands, out through the house, and onto the trailer.",
      },
      {
        heading: "Responsible disposal",
        text: "Appliances go to the right facility rather than a fence line. Anything still usable is better off donated than dumped, and we sort accordingly when we can.",
      },
    ],
    faqs: [
      ["Do you disconnect appliances?", "We can disconnect simple plug-in units. Anything on a gas or hard-plumbed line should be shut off by a qualified plumber or electrician first."],
      ["Can you get a fridge out of a basement?", "Yes. Stairs and tight turns are routine for us. Let us know when you book so we send the right crew size."],
      ["Do you take one appliance only?", "Yes. Single-item pickups are welcome."],
    ],
    related: ["electronics-and-e-waste-removal", "garage-cleanouts", "mattress-and-bulky-item-removal"],
  },
{
    slug: "hot-tub-removal",
    name: "Hot Tub Removal",
    h1: "Hot Tub Removal in Denver, Parker & Castle Rock, CO",
    metaTitle: "Hot Tub Removal Denver & Parker CO | EZ Haulaway",
    metaDescription: "Hot tub removal and disposal in Denver, Parker, Castle Rock and Highlands Ranch. We drain, cut down and haul old spas in one visit. From [[item:Hot tub]].",
    summary: "Drain, cut down, and haul away old hot tubs, spas, and swim spas.",
    image: hotTubAsset,
    imageAlt: "Backyard hot tub ready for removal",
    intro: [
      "A hot tub that no longer runs is one of the hardest things to get rid of on your own. It is too heavy to move whole, too big for a dumpster, and still full of water, foam, and wiring.",
      "EZ Haulaway handles hot tub removal and disposal across Denver, Parker, Castle Rock, Centennial, and Highlands Ranch. We cut the spa down on site, load every piece, and leave you with an open patio the same day.",
    ],
    includes: [
      "Above-ground hot tubs and spas",
      "Swim spas and jetted tubs",
      "Surrounding decking and skirting",
      "Covers, lifters, and steps",
      "Pumps, heaters, and equipment",
      "Cleanup of the pad afterward",
    ],
    sections: [
      {
        heading: "How our hot tub removal works, start to finish",
        text: "First we confirm the power is off at the breaker and the unit is safely dead. Then we drain the tub, pull the cover and skirting, and cut the shell and frame into sections we can carry by hand. Every piece leaves on our trailer, and we sweep the pad before we go. Most backyard spas take two to four hours.",
      },
      {
        heading: "No gate access? That is the normal job, not the hard one",
        text: "Denver metro backyards are tight, and most spas were set in place before the fence went up. Because we cut the tub down where it sits instead of trying to roll it out whole, narrow side gates, stairs, retaining walls, and shared fence lines are routine for us. No crane, no equipment tracking across your grass.",
      },
      {
        heading: "Real demolition experience behind the saw",
        text: "Hot tub removal is really a small demolition job, and that is where Ben started — roughly six years of construction and demolition work, including more than 300 decks. That matters when a spa is wrapped in decking, bolted to a slab, or sitting inches from your siding.",
      },
      {
        heading: "What hot tub removal costs in the Denver metro",
        text: "Hot tub and spa removal starts around [[item:Hot tub]] and depends on size, access, and whether decking comes out with it. Send a couple of photos from your phone and we will give you a firm number before we ever show up — no on-site upsell.",
      },
    ],
    faqs: [
      ["How much does hot tub removal cost in Denver?", "Hot tub removal starts around [[item:Hot tub]] in the Denver metro area. Price depends on the size of the spa, how tight the access is, and whether surrounding decking needs to come out too. Send photos and we will quote it firmly up front."],
      ["Do I need to drain the hot tub first?", "You do not have to. If it is already drained, that shortens the job and can lower the price."],
      ["Does the power need to be disconnected?", "The circuit should be shut off at the breaker before we arrive. Hard-wired 240-volt spas should be disconnected by a qualified electrician; once it is safely dead, we remove the tub and the wiring at it."],
      ["What if there is no gate access to the backyard?", "We cut the tub into smaller sections so it can come out through whatever access exists — a narrow side gate, a walkout basement, or over a fence line."],
      ["Can you remove the deck around the hot tub too?", "Yes. Surrounding decking, skirting, and steps can all be removed on the same visit."],
      ["Do you take swim spas and above-ground pools?", "Yes. Swim spas, jetted tubs, and above-ground pools are all jobs we do regularly."],
    ],
    related: ["light-demolition", "deck-and-fence-removal", "yard-and-landscaping-debris"],
  },
{
    slug: "light-demolition",
    name: "Light Demolition",
    h1: "Light Demolition in Denver, Parker & Castle Rock, CO",
    metaTitle: "Light Demolition Denver & Parker | Tear-Out | EZ Haulaway",
    metaDescription:
      "Light demolition in Denver, Parker and Castle Rock — sheds, decks, pergolas, playsets and interior tear-outs demolished and hauled away in one visit.",
    summary: "Sheds, pergolas, playsets, interior tear-outs, and small structures.",
    image: lightDemolitionAsset,
    imageAlt: "EZ Haulaway crew safely dismantling a backyard shed beside a tandem-axle dump trailer",
    intro: [
      "Demolition and disposal usually come as two separate headaches. We do both: take the structure down and haul every piece away the same day, anywhere in the Denver metro area.",
      "Ben brings roughly six years of hands-on construction and demolition experience, including work on more than 300 decks. That is the difference between a demolition crew and a hauling crew with a pry bar.",
    ],
    includes: [
      "Sheds and small outbuildings",
      "Decks, pergolas, and gazebos",
      "Playsets and swing sets",
      "Fencing and retaining walls",
      "Interior tear-outs: cabinets, flooring, shelving",
      "Hot tubs and spa pads",
    ],
    sections: [
      {
        heading: "One crew, start to finish",
        text: "You are not coordinating a demolition contractor and then a hauling company. We arrive with tools and a trailer, take it apart, and leave the site swept.",
      },
      {
        heading: "What counts as light demolition",
        text: "Non-structural work: anything that is not holding up your home and does not require heavy equipment or engineering. If you are not sure where your project lands, send photos and we will tell you straight.",
      },
    ],
    faqs: [
      ["Do you pull permits?", "Some municipalities require a permit for structures over a certain size. We will tell you when we think one applies so you can check with your city."],
      ["Do you handle asbestos or hazardous material?", "No. Hazardous materials need a licensed abatement contractor."],
      ["Can you demo and haul on the same day?", "That is the standard approach for most jobs of this size."],
    ],
    related: ["deck-and-fence-removal", "hot-tub-removal", "construction-debris-removal"],
  },
{
    slug: "deck-and-fence-removal",
    name: "Deck & Fence Removal",
    h1: "Deck Removal & Fence Demolition in Denver, Parker & Castle Rock",
    metaTitle: "Deck Removal & Fence Demolition Denver, CO | EZ Haulaway",
    metaDescription:
      "Deck demolition and fence removal in Denver, Parker, Castle Rock and Highlands Ranch. 300+ decks of experience. Every board hauled, site raked. Free quote.",
    summary: "Aging decks, pergolas, railings, and fence lines torn out and hauled away.",
    image: deckAsset,
    imageAlt: "Crew loading deck boards into the dump trailer",
    intro: [
      "Colorado weather is hard on wood. When a deck starts splintering or a fence line starts leaning, tearing it out is the first step toward whatever comes next.",
      "EZ Haulaway handles deck demolition and fence removal across Denver, Parker, Castle Rock, Centennial, and Highlands Ranch. This is Ben's strongest area — he has worked on more than 300 decks, so he knows exactly how they were built and how they come apart without wrecking your siding or your yard.",
    ],
    includes: [
      "Wood and composite decks",
      "Pergolas, arbors, and gazebos",
      "Railings, stairs, and landings",
      "Wood, vinyl, and chain link fencing",
      "Fence posts and concrete footings",
      "Full haul away and site cleanup",
    ],
    sections: [
      {
        heading: "300+ decks of experience, not a guess with a crowbar",
        text: "A deck attached to a house is fastened to a ledger board against your siding. Pulled the wrong way, that is a water-intrusion repair you did not budget for. Ben has spent roughly six years in construction and demolition and worked on over 300 decks, so we take the structure apart in the order it went up — flashing and ledger last, and carefully.",
      },
      {
        heading: "Clean tear-out, clean site",
        text: "Boards, framing, hardware, posts, and concrete footings all leave with us. We rake and sweep the footprint so you can walk it barefoot without finding a nail, and so your landscaper or builder can start immediately.",
      },
      {
        heading: "Fence lines, post by post",
        text: "Wood, vinyl, and chain link all come out, including the concrete footings when you want them gone. Shared fence lines with a neighbor are common here — tell us which side is yours and we will work to the property line.",
      },
      {
        heading: "Rebuilding after the tear-out?",
        text: "If a new deck or fence is going in, tell us up front. We can pull the old structure in a way that leaves the site ready for your builder, and we coordinate timing so your contractor is not waiting on a pile of old lumber.",
      },
    ],
    faqs: [
      ["How much does deck removal cost in the Denver metro?", "Most residential deck tear-outs are priced by size, height, and how much concrete is in the ground. Send photos with a rough footprint and we will give you a firm number before the job."],
      ["Do you dig out concrete fence footings?", "Yes, in most cases. Let us know the post count so we can price the job accurately."],
      ["Can you remove just part of a deck?", "Yes. Partial removals, railing-only jobs, and stair replacements are all common."],
      ["Will removing the deck damage my siding?", "That is exactly why the ledger connection gets handled last and by hand. We separate it carefully and let you know what the wall behind it looks like once it is exposed."],
      ["What happens to the lumber?", "Usable material can be set aside if you want it; metal is recycled and everything else is hauled to the proper facility."],
    ],
    related: ["light-demolition", "construction-debris-removal", "yard-and-landscaping-debris", "wood-pallet-removal"],
  },
{
    slug: "construction-debris-removal",
    name: "Construction Debris Removal",
    h1: "Construction & Renovation Debris Removal",
    metaTitle: "Construction Debris Removal Denver Metro | EZ Haulaway",
    metaDescription:
      "Drywall, lumber, flooring, roofing, and remodel debris cleared from job sites across Parker and the Denver metro area.",
    summary: "Drywall, lumber, flooring, roofing, and remodel debris.",
    image: constructionAsset,
    imageAlt: "Crew loading renovation debris at a jobsite",
    intro: [
      "Renting a dumpster means paying for the days it sits in the driveway. We show up when the pile is ready, load it, and leave.",
      "We work with homeowners mid-remodel and with contractors who need a site cleared between phases.",
    ],
    includes: [
      "Drywall, plaster, and insulation",
      "Lumber, trim, and framing scrap",
      "Flooring, carpet, tile, and underlayment",
      "Shingles and roofing tear-off",
      "Concrete, brick, and masonry in manageable amounts",
      "Cabinets, fixtures, and doors",
    ],
    sections: [
      {
        heading: "For contractors",
        text: "Repeat site clears, scheduled around your build phases. Clear communication on arrival windows so your crew is not waiting around.",
      },
      {
        heading: "For homeowners",
        text: "Finished the demo yourself and now have a garage full of drywall? That is a normal job for us and usually a single load.",
      },
    ],
    faqs: [
      ["Is there a weight limit?", "Dense material like concrete and tile is priced by weight as well as volume. Send photos and we will give you an honest number."],
      ["Can you come back multiple times during a remodel?", "Yes. Repeat pickups can be scheduled around your project timeline."],
      ["Do you take hazardous materials?", "No. Paint, solvents, asbestos, and chemicals need a licensed disposal service."],
    ],
    related: ["light-demolition", "yard-and-landscaping-debris", "commercial-junk-removal", "wood-pallet-removal"],
  },
{
    slug: "yard-and-landscaping-debris",
    name: "Yard & Landscaping Debris",
    h1: "Yard Waste & Landscaping Debris Removal",
    metaTitle: "Yard Debris Removal in Parker, CO | EZ Haulaway",
    metaDescription:
      "Branches, brush, sod, rock, and storm debris hauled out of Denver metro yards. Free quotes from EZ Haulaway in Parker, CO.",
    summary: "Branches, brush, sod, rock, storm damage, and landscaping waste.",
    image: yardAsset,
    imageAlt: "EZ Haulaway crew loading branches and yard debris into a tandem-axle dump trailer",
    intro: [
      "Yard waste fills a truck bed fast and most curbside services will not take it. We bring a trailer sized for the whole pile.",
      "After a spring storm or a landscaping project, one visit usually clears the yard completely.",
    ],
    includes: [
      "Tree branches, limbs, and brush",
      "Storm damage and fallen debris",
      "Old sod, dirt, and landscape rock",
      "Leaves, clippings, and garden waste",
      "Planters, edging, and irrigation scrap",
      "Old playground equipment and lawn items",
    ],
    sections: [
      {
        heading: "After the storm",
        text: "Colorado hail and wind leave a mess. We can clear downed limbs and debris so your yard is usable again.",
      },
      {
        heading: "Landscaping projects",
        text: "Ripping out sod or replacing rock creates more volume than most people expect. Tell us the square footage and we will size the job right.",
      },
    ],
    faqs: [
      ["Do you cut down trees?", "We do not do tree felling. We haul away what has already been cut or fallen."],
      ["Can you take dirt and rock?", "Yes, in manageable amounts. Heavy material is priced by weight."],
      ["Do I need to bag anything?", "No. Leave the pile as it is."],
    ],
    related: ["deck-and-fence-removal", "construction-debris-removal", "house-and-estate-cleanouts"],
  },
{
    slug: "garage-cleanouts",
    name: "Garage Cleanouts",
    h1: "Garage Cleanouts in Parker & the Denver Metro",
    metaTitle: "Garage Cleanout Service Denver Metro | EZ Haulaway",
    metaDescription:
      "Get the garage back. EZ Haulaway clears years of stored junk from garages across Parker and the Denver metro area. Free quote.",
    summary: "Years of stored clutter cleared out so you can park in there again.",
    image: garageAsset.url,
    imageAlt: "Crew loading garage cleanout boxes into the trailer",
    intro: [
      "Garages collect everything nobody wants to decide about. Paint cans aside, most of it can leave today.",
      "You point out what stays. We clear the rest and sweep the floor before we go.",
    ],
    includes: [
      "Boxes, bins, and stored clutter",
      "Old tools, hardware, and shelving",
      "Bikes, sports gear, and lawn equipment",
      "Broken appliances and electronics",
      "Tires, scrap metal, and yard tools",
      "Furniture stored 'temporarily'",
    ],
    sections: [
      {
        heading: "Sort as we go",
        text: "Most people do not know exactly what is in there. We work through it with you so nothing you want ends up on the trailer.",
      },
      {
        heading: "Storage units too",
        text: "Same service, different building. If you are closing out a storage unit, we can meet you there and clear it in one visit.",
      },
    ],
    faqs: [
      ["Can you take paint and chemicals?", "No. Paint, solvents, oil, and chemicals must go to a household hazardous waste facility."],
      ["How long does a garage take?", "Most two-car garages are a half day or less depending on how full they are."],
      ["Do you sweep up afterward?", "Yes, cleanup is part of the job."],
    ],
    related: ["house-and-estate-cleanouts", "appliance-removal", "storage-unit-cleanout", "dumpster-rental-alternative"],
  },
{
    slug: "house-and-estate-cleanouts",
    name: "House & Estate Cleanouts",
    h1: "House, Estate & Property Cleanouts",
    metaTitle: "Estate & House Cleanouts in Parker, CO | EZ Haulaway",
    metaDescription:
      "Full property cleanouts for estates, rentals, and moves across the Denver metro area. Respectful, thorough work from EZ Haulaway.",
    summary: "Whole-home, rental, and estate cleanouts handled respectfully.",
    image: estateAsset,
    imageAlt: "Crew carrying a panel out of a cluttered basement",
    realJob: {
      eyebrow: "Real job in Parker, CO",
      title: "A Parker Basement Cleared in About 45 Minutes",
      text: "This basement was full: boxes, a treadmill, a dresser, a TV, a bin of cables and a pile of general trash. Our crew carried everything out, loaded the trailer and left the floor clear and empty. These are the actual before and after photos from the job.",
      facts: [
        "Location: Parker, CO",
        "Time on site: about 45 minutes",
        "Hauled: boxes, treadmill, dresser, TV, cables and household trash",
      ],
      before: {
        src: basementBefore960,
        srcSet: `${basementBefore640} 640w, ${basementBefore960} 960w`,
        alt: "Before: a Parker basement packed with boxes and furniture",
      },
      after: {
        src: basementAfter960,
        srcSet: `${basementAfter640} 640w, ${basementAfter960} 960w`,
        alt: "After: the same Parker basement completely cleared",
      },
    },
    intro: [
      "Clearing a house is rarely just a hauling job. Estates, foreclosures, and rental turnovers all come with a deadline and often with grief or stress attached.",
      "We work steadily, communicate clearly, and leave the property empty and swept.",
    ],
    includes: [
      "Full-home and multi-room cleanouts",
      "Estate and downsizing cleanouts",
      "Rental and tenant turnovers",
      "Foreclosure and real estate prep",
      "Basement, attic, and crawlspace clearing",
      "Hoarding situations handled discreetly",
    ],
    sections: [
      {
        heading: "Working with families",
        text: "If you need to set items aside for family members or donation, tell us up front. We will keep those separate as we work.",
      },
      {
        heading: "Real estate deadlines",
        text: "Agents and property managers often need a home empty before photos or a closing date. Give us the date and we will tell you honestly whether we can hit it.",
      },
    ],
    faqs: [
      ["Do I have to be there the whole time?", "No. Many clients walk us through at the start and check back at the end."],
      ["Can you donate usable items?", "Where an item is in good condition and a local organization will take it, donating beats the landfill."],
      ["Is a whole-house cleanout one visit?", "Usually yes. Very large properties may take more than one trailer load."],
    ],
    related: ["garage-cleanouts", "furniture-removal", "hoarder-cleanout", "dumpster-rental-alternative"],
  },
{
    slug: "mattress-and-bulky-item-removal",
    name: "Mattress & Bulky Item Removal",
    h1: "Mattress Disposal & Bulky Item Removal in Denver & Parker, CO",
    metaTitle: "Mattress Disposal Denver CO | Box Spring Pickup",
    metaDescription:
      "Mattress disposal, box spring removal and large item pickup in Denver, Parker, Castle Rock and Highlands Ranch. Single items welcome, carried out for you.",
    summary: "Mattresses, box springs and single large items: treadmills, pianos, pool tables.",
    image: bulkyAsset.url,
    imageAlt: "Crew lifting a bulky bin into the dump trailer",
    intro: [
      "Some items are just one thing — but that one thing weighs 300 pounds and will not fit down the stairs alone. Curbside pickup will not touch most of them, and the recycling center wants you to deliver it yourself.",
      "EZ Haulaway does single-item mattress disposal, box spring removal, and large item pickup across Denver, Parker, Castle Rock, Centennial, and Highlands Ranch. No minimum truckload, no pressure to find more junk to justify the trip, and no asking you to drag it to the curb first.",
    ],
    includes: [
      "Mattresses and box springs",
      "Bed frames, headboards, and adjustable bases",
      "Treadmills, ellipticals, and home gyms",
      "Pianos, organs, and pool tables",
      "Grills, smokers, and patio sets",
      "Safes, filing cabinets, and shelving",
      "Above-ground pools and trampolines",
    ],
    sections: [
      {
        heading: "We come inside and carry it out",
        text: "City bulk pickup and mattress recycling drop-offs both expect the item to already be at the curb or in your truck. We walk into the upstairs bedroom, the finished basement, or the third-floor apartment and carry it out ourselves. That is the whole point.",
      },
      {
        heading: "What single-item pickup costs",
        text: "Single items are priced individually rather than by trailer space: a mattress runs [[item:Mattress]], a box spring [[item:Box spring]], and a treadmill [[item:Treadmill]], with a [[min]] minimum on any visit. Upright pianos start around [[item:Piano]]. You know the number before we arrive.",
      },
      {
        heading: "Heavy and awkward is the specialty",
        text: "Weight is one problem. Stairs, tight corners, and doorframes are the other. We bring enough crew, straps, and dollies for both, and we protect your floors and walls on the way out.",
      },
      {
        heading: "Clearing out other household pieces?",
        text: "Larger household pieces beyond the bed have their own page.",
        links: [{ slug: "furniture-removal", city: "denver", label: "Furniture Removal Denver" }],
      },
      {
        heading: "Quick scheduling",
        text: "Single items are the easiest jobs to fit into the schedule, so these often go out the same week. Call or text a photo and we will find you a slot.",
      },
    ],
    faqs: [
      ["How much does mattress disposal cost in Denver?", "A mattress is [[item:Mattress]] and a box spring is [[item:Box spring]], with a [[min]] minimum per visit. If you have both, or a few other items going at the same time, it is usually the same trip and better value."],
      ["Do I have to put the mattress at the curb?", "No. We carry it out from wherever it is — bedroom, basement, or an upstairs apartment."],
      ["Is there a minimum charge?", "Yes, [[min]] covers a visit. Anything beyond that is priced by the item or by trailer space, whichever is cheaper for you."],
      ["Can you take a piano?", "Upright pianos start around [[item:Piano]]. Grand pianos depend on access — send photos first."],
      ["Do you take trampolines and above-ground pools?", "Yes, including disassembly on site."],
      ["What happens to an old mattress?", "Mattresses are taken to the appropriate disposal or recycling facility rather than dumped."],
    ],
    related: ["furniture-removal", "appliance-removal", "garage-cleanouts"],
  },
{
    slug: "electronics-and-e-waste-removal",
    name: "Electronics & E-Waste Removal",
    h1: "Electronics & E-Waste Removal in the Denver Metro",
    metaTitle: "Electronics & E-Waste Removal in Parker, CO | EZ Haulaway",
    metaDescription:
      "TVs, monitors, computers, printers, and office electronics collected for responsible recycling across the Denver metro area.",
    summary: "TVs, monitors, computers, printers, and office electronics.",
    image: electronicsAsset,
    imageAlt: "Crew collecting TVs and computers for recycling",
    intro: [
      "Electronics cannot go in the trash in most places, and hauling a 60-inch TV to a recycling center is nobody's idea of a Saturday.",
      "We pick it up and route it to the right facility.",
    ],
    includes: [
      "Televisions and monitors",
      "Desktops, laptops, and servers",
      "Printers, copiers, and scanners",
      "Stereo equipment and speakers",
      "Cables, keyboards, and accessories",
      "Office IT equipment in bulk",
    ],
    sections: [
      {
        heading: "Old tube TVs and monitors",
        text: "CRT screens are heavy and awkward, and many services turn them down. We take them.",
      },
      {
        heading: "Office tech refresh",
        text: "Upgrading a whole office at once? We can clear the old equipment in bulk on a schedule that works around your business hours.",
      },
    ],
    faqs: [
      ["Do you wipe hard drives?", "We do not perform data wiping. Remove or destroy drives containing sensitive data before pickup."],
      ["Are electronics recycled?", "Electronics are routed to appropriate recycling facilities rather than general landfill."],
      ["Can I leave items outside?", "If you will not be home, arrange it with us in advance and leave items accessible."],
    ],
    related: ["appliance-removal", "commercial-junk-removal", "garage-cleanouts"],
  },
{
    slug: "shed-removal",
    name: "Shed Removal",
    h1: "Shed Removal & Demolition in Denver, Parker & Castle Rock, CO",
    metaTitle: "Shed Removal Denver & Parker CO | EZ Haulaway",
    metaDescription: "Shed removal and demolition in Denver, Parker, Castle Rock and Highlands Ranch. We tear down wood, metal and plastic sheds and haul every board.",
    summary: "Tear down and haul away wood, metal, vinyl, and plastic backyard sheds.",
    image: shedImage,
    imageAlt: "Crew dismantling an old backyard shed",
    intro: [
      "A shed that has gone soft, leaky, or full of mice is not something you want to take apart on a weekend. We handle the whole thing: tear down the structure, load every board, and haul it off the same visit.",
      "EZ Haulaway does shed removal and backyard demolition across Denver, Parker, Castle Rock, Centennial, and Highlands Ranch. Wood, metal, vinyl, or plastic — if it is standing in your yard and you want it gone, it is a normal job for us. Ben brings roughly six years of construction and demolition experience, so the tear-down is planned, not improvised.",
    ],
    includes: [
      "Wood and T1-11 backyard sheds",
      "Metal and steel storage sheds",
      "Vinyl, resin, and plastic sheds",
      "Playhouses, chicken coops, and lean-tos",
      "Shelving, flooring, and leftover contents",
      "Nail and debris cleanup of the footprint",
    ],
    sections: [
      {
        heading: "Contents and all",
        text: "Most sheds we take are still full of paint cans, tools, bikes, and boxes. You do not need to empty it first — tell us what is inside and we will price the clear-out with the tear-down. Paint, chemicals, and solvents are the one exception; those need a licensed disposal service.",
      },
      {
        heading: "Slabs, skids, and what we leave behind",
        text: "Sheds on wood skids or a gravel pad come out cleanly and we rake the footprint so it is safe to walk on. If yours sits on a concrete slab, tell us up front and let us know whether you want the slab broken out too — that is priced as light demolition on top of the shed.",
      },
      {
        heading: "Tight backyards and gates",
        text: "Denver metro yards often have a narrow side gate or a neighbor's fence line a few feet away. We break the structure down in place so material can be carried out by hand instead of driving equipment across your grass.",
      },
      {
        heading: "What shed removal costs around here",
        text: "Shed removal is priced by the size of the structure, what is still inside it, and whether a slab comes out with it. Most standard backyard sheds are a single trailer load. Send a photo with a rough size and we will give you a firm number up front instead of a range.",
      },
    ],
    faqs: [
      ["Do I need a permit to remove a shed?", "Most residential shed removals in the Denver metro do not require a permit, but rules vary by town and HOA. If yours is large, on a slab, or has power run to it, check with your local building department first."],
      ["What if the shed has electricity run to it?", "The circuit needs to be disconnected by a qualified electrician before we start. Once it is safely dead, we can remove the structure and the wiring inside it."],
      ["Can you take out the concrete slab underneath?", "Often yes, in manageable amounts. Send a photo with a rough size and we will quote the slab separately from the shed."],
      ["How long does shed removal take?", "A typical backyard shed comes down and gets loaded in a few hours. Larger structures or ones packed with contents can take most of a day."],
      ["What happens to the material?", "Metal is recycled, usable lumber and contents can be set aside if you want them, and the rest is hauled to the appropriate facility."],
    ],
    related: ["light-demolition", "deck-and-fence-removal", "garage-cleanouts"],
  },
{
    slug: "commercial-junk-removal",
    name: "Commercial Junk Removal",
    h1: "Commercial Junk Removal & Office Cleanouts",
    metaTitle: "Commercial Junk Removal & Office Cleanouts | EZ Haulaway",
    metaDescription: "Commercial junk removal in Parker, Castle Rock and Denver: office cleanouts, retail and warehouse clearing, turnovers. Same-day slots, company invoicing.",
    summary: "Offices, retail spaces, warehouses, and property manager turnovers.",
    image: commercialAsset,
    imageAlt: "Crew removing office furniture from a business",
    intro: ["Businesses need the mess gone without disrupting operations. We schedule around your hours and work efficiently once we are on site. **Commercial junk removal** from EZ Haulaway covers office cleanouts, retail and warehouse clearing, and tenant turnovers across Parker, Castle Rock, Centennial, Aurora and Denver.", "Property managers, contractors, and small business owners across the Denver metro area use us for repeat work, including **eviction cleanouts, trash outs and make readies**, with same-day and next-day slots, company invoicing and before and after photos on every job."],
    includes: ["Office furniture, cubicles, and desks", "Retail fixtures, shelving, and displays", "Warehouse and storage clearing", "Restaurant and kitchen equipment", "Tenant turnovers, make readies and lease-end cleanouts", "Eviction cleanouts and trash outs", "Ongoing scheduled pickups"],
    sections: [
      { heading: "Scheduled around your business", text: "Early mornings, evenings, or weekends — tell us when the space is free and we will plan the visit around it." },
      { heading: "Property managers", text: "Unit turnovers rarely come with much notice. Keep our number handy and we will tell you quickly whether we can fit the job in." },
    ],
    faqs: [
      ["Do you work with recurring clients?", "Yes. Ongoing and repeat work can be scheduled in advance."],
      ["Can you provide an invoice for the business?", "Yes, we can invoice for commercial work."],
      ["Do you clear whole warehouses?", "Yes, though larger spaces may take multiple loads. We will walk it and give you a plan."],
    ],
    related: ["construction-debris-removal", "electronics-and-e-waste-removal", "house-and-estate-cleanouts", "wood-pallet-removal"],
  },
  woodPalletRemoval,
  dumpsterRentalAlternative,
  hoarderCleanout,
  storageUnitCleanout,
  evictionCleanout,
  makeReadyHaulOff,
  basementAtticCleanout,
];
export const services = priced(raw_services);

for (const service of services) {
  const extra = serviceExtras[service.slug];
  if (extra) {
    service.sections.push(...extra.sections);
    service.faqs.push(...extra.faqs);
  }
}

export const serviceBySlug = (slug: string) => services.find((service) => service.slug === slug);