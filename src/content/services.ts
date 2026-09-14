import furnitureAsset from "@/assets/service-furniture-removal.jpg.asset.json";
import applianceAsset from "@/assets/service-appliance-removal.jpg.asset.json";
import hotTubAsset from "@/assets/service-hot-tub-removal.jpg.asset.json";
import lightDemolitionAsset from "@/assets/service-light-demolition.jpg.asset.json";
import deckAsset from "@/assets/service-deck-fence-removal.jpg.asset.json";
import constructionAsset from "@/assets/service-construction-debris.jpg.asset.json";
import yardAsset from "@/assets/service-yard-debris.jpg.asset.json";
import garageAsset from "@/assets/service-garage-cleanout.jpg.asset.json";
import estateAsset from "@/assets/service-estate-cleanout.jpg.asset.json";
import bulkyAsset from "@/assets/service-bulky-items.jpg.asset.json";
import electronicsAsset from "@/assets/service-electronics.jpg.asset.json";
import commercialAsset from "@/assets/service-commercial.jpg.asset.json";

export type Service = {
  slug: string;
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  image: string;
  imageAlt: string;
  intro: string[];
  includes: string[];
  sections: Array<{ heading: string; text: string }>;
  faqs: Array<[string, string]>;
  related: string[];
};

export const services: Service[] = [
  {
    slug: "furniture-removal",
    name: "Furniture Removal",
    h1: "Furniture Removal in Parker & the Denver Metro Area",
    metaTitle: "Furniture Removal in Parker, CO | EZ Haulaway",
    metaDescription:
      "Couch, mattress, dresser, or a whole room of furniture — EZ Haulaway hauls it out of Parker and Denver metro homes. Free quotes, no heavy lifting for you.",
    summary: "Couches, sectionals, tables, chairs, dressers, shelving, and office furniture.",
    image: furnitureAsset.url,
    imageAlt: "Living room furniture ready for removal",
    intro: [
      "Old furniture is bulky, awkward on stairs, and almost never fits in a car. EZ Haulaway takes the whole problem off your hands — you point at the sofa, we carry it out.",
      "We work in occupied homes every week, so floors, doorframes, and corners get treated carefully on the way out.",
    ],
    includes: [
      "Couches, sectionals, and recliners",
      "Mattresses, box springs, and bed frames",
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
    ],
    faqs: [
      ["Do I need to move the furniture outside first?", "No. Leave it where it sits. Our crew carries everything out for you."],
      ["Can you take a mattress and box spring together?", "Yes. Mattresses and box springs are one of the most common items we haul."],
      ["Will you take furniture apart?", "When something will not fit through a door intact, we break it down on site so it can be carried out safely."],
    ],
    related: ["mattress-and-bulky-item-removal", "house-and-estate-cleanouts", "commercial-junk-removal"],
  },
  {
    slug: "appliance-removal",
    name: "Appliance Removal",
    h1: "Appliance Removal & Haul Away in the Denver Metro",
    metaTitle: "Appliance Removal & Disposal in Parker, CO | EZ Haulaway",
    metaDescription:
      "Refrigerators, washers, dryers, stoves, and water heaters hauled away across Parker and the Denver metro area. Free quotes from EZ Haulaway.",
    summary: "Refrigerators, washers, dryers, stoves, dishwashers, and water heaters.",
    image: applianceAsset.url,
    imageAlt: "EZ Haulaway crew loading a refrigerator onto the branded trailer",
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
    h1: "Hot Tub Removal & Disposal in the Denver Metro Area",
    metaTitle: "Hot Tub Removal in Parker, CO | EZ Haulaway",
    metaDescription:
      "Old hot tub taking up the backyard? EZ Haulaway drains, dismantles, and hauls hot tubs across Parker and the Denver metro area. Free quote.",
    summary: "Drain, dismantle, and haul away old spas and hot tubs.",
    image: hotTubAsset.url,
    imageAlt: "Hot tub set up outdoors, ready for removal",
    intro: [
      "A hot tub that no longer runs is one of the hardest things to get rid of on your own. It is too heavy to move whole, too big for a dumpster, and full of water and wiring.",
      "We cut it down, load the pieces, and leave you with an open patio again.",
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
        heading: "How the removal works",
        text: "We confirm the power is shut off, drain the tub, dismantle the shell and frame into manageable sections, and carry every piece out through the gate or over the fence line.",
      },
      {
        heading: "Ben has the demolition background",
        text: "Hot tub removal is really a small demolition job. With roughly six years of construction and demolition work behind him, Ben approaches it the same way — plan the cuts, protect the property, clear the site.",
      },
    ],
    faqs: [
      ["Do I need to drain it first?", "You do not have to. If it is already drained, that shortens the job and can lower the price."],
      ["What if there is no gate access?", "We cut the tub into smaller sections so it can come out through whatever access exists."],
      ["Can you remove the deck around it too?", "Yes. Surrounding decking and skirting can be removed on the same visit."],
    ],
    related: ["light-demolition", "deck-and-fence-removal", "yard-and-landscaping-debris"],
  },
  {
    slug: "light-demolition",
    name: "Light Demolition",
    h1: "Light Demolition Services in Parker & Denver Metro",
    metaTitle: "Light Demolition in Parker, CO | EZ Haulaway",
    metaDescription:
      "Sheds, decks, pergolas, playsets, and interior tear-outs demolished and hauled away in one visit across the Denver metro area.",
    summary: "Sheds, pergolas, playsets, interior tear-outs, and small structures.",
    image: lightDemolitionAsset.url,
    imageAlt: "EZ Haulaway crew safely dismantling a backyard shed beside a tandem-axle dump trailer",
    intro: [
      "Demolition and disposal usually come as two separate headaches. We do both: take the structure down and haul every piece away the same day.",
      "Ben brings roughly six years of hands-on construction and demolition experience, including work on more than 300 decks.",
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
    h1: "Deck & Fence Removal in the Denver Metro Area",
    metaTitle: "Deck & Fence Removal in Parker, CO | EZ Haulaway",
    metaDescription:
      "Tear out an aging deck, pergola, or fence line and have every board hauled off. EZ Haulaway serves Parker and the Denver metro area.",
    summary: "Aging decks, pergolas, railings, and fence lines removed and hauled.",
    image: deckAsset.url,
    imageAlt: "EZ Haulaway crew loading dismantled deck boards into a tandem-axle dump trailer",
    intro: [
      "Colorado weather is hard on wood. When a deck starts splintering or a fence starts leaning, tearing it out is the first step toward whatever comes next.",
      "This is Ben's strongest area — he has worked on more than 300 decks, so he knows how they are built and how they come apart.",
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
        heading: "Clean tear-out, clean site",
        text: "Boards, framing, hardware, and posts all leave with us. We rake and sweep the area so you can start your next project without stepping on nails.",
      },
      {
        heading: "Rebuilding after?",
        text: "If a new deck or fence is going in, tell us. We can pull the old structure in a way that keeps the site ready for your builder.",
      },
    ],
    faqs: [
      ["Do you dig out concrete fence footings?", "Yes, in most cases. Let us know the post count so we can price the job accurately."],
      ["Can you remove just part of a deck?", "Yes. Partial removals and railing-only jobs are common."],
      ["What happens to the lumber?", "Usable material can be set aside if you want it; everything else is hauled and disposed of."],
    ],
    related: ["light-demolition", "construction-debris-removal", "yard-and-landscaping-debris"],
  },
  {
    slug: "construction-debris-removal",
    name: "Construction Debris Removal",
    h1: "Construction & Renovation Debris Removal",
    metaTitle: "Construction Debris Removal in Parker, CO | EZ Haulaway",
    metaDescription:
      "Drywall, lumber, flooring, roofing, and remodel debris cleared from job sites across Parker and the Denver metro area.",
    summary: "Drywall, lumber, flooring, roofing, and remodel debris.",
    image: constructionAsset.url,
    imageAlt: "EZ Haulaway crew loading organized renovation debris at a Denver metro jobsite",
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
    related: ["light-demolition", "yard-and-landscaping-debris", "commercial-junk-removal"],
  },
  {
    slug: "yard-and-landscaping-debris",
    name: "Yard & Landscaping Debris",
    h1: "Yard Waste & Landscaping Debris Removal",
    metaTitle: "Yard Debris Removal in Parker, CO | EZ Haulaway",
    metaDescription:
      "Branches, brush, sod, rock, and storm debris hauled out of Denver metro yards. Free quotes from EZ Haulaway in Parker, CO.",
    summary: "Branches, brush, sod, rock, storm damage, and landscaping waste.",
    image: yardAsset.url,
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
    metaTitle: "Garage Cleanout Service in Parker, CO | EZ Haulaway",
    metaDescription:
      "Get the garage back. EZ Haulaway clears years of stored junk from garages across Parker and the Denver metro area. Free quote.",
    summary: "Years of stored clutter cleared out so you can park in there again.",
    image: garageAsset.url,
    imageAlt: "EZ Haulaway crew clearing sorted boxes and household clutter from a garage",
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
    related: ["house-and-estate-cleanouts", "appliance-removal", "mattress-and-bulky-item-removal"],
  },
  {
    slug: "house-and-estate-cleanouts",
    name: "House & Estate Cleanouts",
    h1: "House, Estate & Property Cleanouts",
    metaTitle: "Estate & House Cleanouts in Parker, CO | EZ Haulaway",
    metaDescription:
      "Full property cleanouts for estates, rentals, and moves across the Denver metro area. Respectful, thorough work from EZ Haulaway.",
    summary: "Whole-home, rental, and estate cleanouts handled respectfully.",
    image: estateAsset.url,
    imageAlt: "EZ Haulaway crew respectfully removing furniture and boxes during an estate cleanout",
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
    related: ["garage-cleanouts", "furniture-removal", "mattress-and-bulky-item-removal"],
  },
  {
    slug: "mattress-and-bulky-item-removal",
    name: "Mattress & Bulky Item Removal",
    h1: "Mattress & Bulky Item Removal",
    metaTitle: "Mattress & Bulky Item Removal in Parker, CO | EZ Haulaway",
    metaDescription:
      "Single-item pickups for mattresses, treadmills, pianos, pool tables, and other oversized items across the Denver metro area.",
    summary: "Single oversized items: mattresses, treadmills, pianos, pool tables.",
    image: bulkyAsset.url,
    imageAlt: "EZ Haulaway crew safely carrying a wrapped mattress from a garage",
    intro: [
      "Some items are just one thing — but that one thing weighs 300 pounds and will not fit down the stairs alone.",
      "Single-item pickups are welcome. No minimum truckload, no pressure to find more junk to justify the trip.",
    ],
    includes: [
      "Mattresses and box springs",
      "Treadmills, ellipticals, and home gyms",
      "Pianos, organs, and pool tables",
      "Grills, smokers, and patio sets",
      "Safes, filing cabinets, and shelving",
      "Above-ground pools and trampolines",
    ],
    sections: [
      {
        heading: "Heavy and awkward is the specialty",
        text: "Weight is one problem. Stairs, corners, and doorframes are the other. We bring enough crew and the right equipment for both.",
      },
      {
        heading: "Quick scheduling",
        text: "Single items are often the easiest jobs to fit into the schedule. Call or text and we will find you a slot.",
      },
    ],
    faqs: [
      ["Is there a minimum charge?", "Small pickups are priced for what they are. Call or text for a quote on your item."],
      ["Can you take a piano?", "Upright pianos, yes. Grand pianos depend on access — send photos first."],
      ["Do you take trampolines?", "Yes, including disassembly."],
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
    image: electronicsAsset.url,
    imageAlt: "EZ Haulaway crew collecting televisions, computers, and electronics for recycling",
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
    slug: "commercial-junk-removal",
    name: "Commercial Junk Removal",
    h1: "Commercial & Office Junk Removal",
    metaTitle: "Commercial Junk Removal in Parker, CO | EZ Haulaway",
    metaDescription:
      "Office cleanouts, retail fixtures, warehouse clearing, and property manager turnovers across the Denver metro area.",
    summary: "Offices, retail spaces, warehouses, and property turnovers.",
    image: commercialAsset.url,
    imageAlt: "EZ Haulaway crew removing office furniture from a Denver metro business",
    intro: [
      "Businesses need the mess gone without disrupting operations. We schedule around your hours and work efficiently once we are on site.",
      "Property managers, contractors, and small business owners across the Denver metro area use us for repeat work.",
    ],
    includes: [
      "Office furniture, cubicles, and desks",
      "Retail fixtures, shelving, and displays",
      "Warehouse and storage clearing",
      "Restaurant and kitchen equipment",
      "Tenant turnovers and lease-end cleanouts",
      "Ongoing scheduled pickups",
    ],
    sections: [
      {
        heading: "Scheduled around your business",
        text: "Early mornings, evenings, or weekends — tell us when the space is free and we will plan the visit around it.",
      },
      {
        heading: "Property managers",
        text: "Unit turnovers rarely come with much notice. Keep our number handy and we will tell you quickly whether we can fit the job in.",
      },
    ],
    faqs: [
      ["Do you work with recurring clients?", "Yes. Ongoing and repeat work can be scheduled in advance."],
      ["Can you provide an invoice for the business?", "Yes, we can invoice for commercial work."],
      ["Do you clear whole warehouses?", "Yes, though larger spaces may take multiple loads. We will walk it and give you a plan."],
    ],
    related: ["construction-debris-removal", "electronics-and-e-waste-removal", "house-and-estate-cleanouts"],
  },
];

export const serviceBySlug = (slug: string) => services.find((service) => service.slug === slug);
