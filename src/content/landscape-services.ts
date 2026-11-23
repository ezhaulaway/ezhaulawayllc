import yardImage from "@/assets/branded-service-yard.webp";
import type { Service } from "./services";

export const sodAndLawnRemoval: Service = {
  slug: "sod-and-lawn-removal",
  name: "Sod & Lawn Removal",
  h1: "Sod, Lawn & Turf Removal in Denver, Parker & the South Metro",
  metaTitle: "Sod & Lawn Removal in Denver & Parker | EZ Haulaway",
  metaDescription:
    "Sod, lawn, and turf removal in Denver, Parker, and the south metro. We cut it, haul the sod, and can take landscape rock. Free photo quote.",
  summary: "Old sod, turf, and landscape rock cut or picked up and hauled away.",
  image: yardImage,
  imageAlt: "Crew loading yard debris into the dump trailer beside a lawn",
  cityPages: false,
  intro: [
    "Pulling up a lawn looks smaller than it is. Sod is heavy, especially when it is wet, and a trailer fills by weight before it looks full.",
    "EZ Haulaway cuts and hauls sod, turf, and tired grass in Parker, Castle Rock, Highlands Ranch, Denver, and the south metro. We use a rented sod cutter and hand tools. This is a trailer-load job, not a landscaping company with a grader.",
  ],
  includes: [
    "Sod and turf cut and hauled away",
    "Small lawns and sections of a yard",
    "Landscape rock and gravel picked up and hauled, when that is the job",
    "Edging and loose irrigation scrap that is already on the surface",
    "A rake of the area we worked",
  ],
  sections: [
    {
      heading: "What sod removal includes",
      text: "We cut the sod, roll or slab it, and load it. You do not need to rent the cutter or make dump runs. Tell us the rough size, length times width, and whether the lawn is a full replacement or a section for a patio, a garden, or where a deck used to sit.\n\nIf you want to keep the sod, say so before we cut. Most of what we take is too worn or too full of weeds to replant, and it leaves on the trailer.",
      links: [{ slug: "deck-removal", label: "Deck removal, if the lawn is what is left after the deck" }],
    },
    {
      heading: "How it is done",
      text: "We walk the area, mark sprinkler heads you point out, and cut with a sod cutter. The machine takes a thin layer of roots and soil, not a deep excavation. Pieces are rolled or stacked and carried to the trailer.\n\nHow long it takes depends on the square footage, how wet the ground is, and how far we carry it. A modest backyard section can be a few hours. A large lawn can be more than one trailer, and we will say that from the photos before we book it.\n\nThe sod goes to a licensed disposal site. It is heavy organic material, not something we leave in a field.",
    },
    {
      heading: "What changes the price",
      text: "We do not publish a per-square-foot rate. The number follows the job:\n\nHow many square feet, and how thick and wet the sod is. Wet sod weighs more, so the trailer fills sooner.\n\nAccess. A gate, a slope, or a long carry from the back corner adds time.\n\nSprinklers and shallow lines we have to work around.\n\nWhether landscape rock, edging, or an old timber border comes out with the grass.\n\nSend a photo and a rough size. A small haul still falls under our [[min]] minimum. Larger lawns are quoted from the area and the number of trailer loads, not from an hourly guess on site.",
    },
    {
      heading: "Sprinklers, utilities, and what to do first",
      text: "Sod cutting is shallow, and that is still enough to find a sprinkler line or a buried utility. Call 811 before we dig, or tell us the utilities are already marked. We will not cut through marked lines.\n\nWalk the heads with us if you can. We do not repair irrigation, and we do not cap lines. If a head is in the area, point it out so we can cut around it. We do not regrade the yard and we do not trench.",
    },
    {
      heading: "Landscape rock removal",
      text: "Hauling out river rock, pea gravel, or a failed rock bed is a different weight problem from grass. Rock is priced by weight and volume, and a pile that looks small can be a full load. Send photos and a rough depth.\n\nBringing new rock, mulch, or topsoil in is a separate service. We can do the haul-away and the small delivery as two parts of one quote when you want both.",
      links: [
        { slug: "dirt-rock-mulch-delivery", label: "Dirt, rock, and mulch delivery" },
        { slug: "yard-and-landscaping-debris", label: "Brush, limbs, and storm debris" },
      ],
    },
    {
      heading: "What comes next",
      text: "After the sod is gone, people usually want topsoil, new sod, rock, or mulch. We can bring a small trailer load and place it in the yard. We are not a dump-truck material yard, and we do not install a finished landscape.\n\nSome Denver-area water providers have offered lawn-replacement or water-saving programs. Rules and rebates change. Check your provider before you count on one. We will not quote a rebate we have not verified.",
    },
    {
      heading: "What we do not do",
      text: "We do not grade, level a lot, or cut a new drainage swale. We do not remove trees. We do not take out a lawn with a skid steer. If the job needs equipment bigger than a sod cutter and a trailer, we will say so.\n\nPaint, chemicals, and old pesticide jugs do not go on the trailer.",
    },
  ],
  faqs: [
    ["How much does sod removal cost?", "It depends on the square footage, how wet and thick the sod is, access, and whether rock comes out too. We do not publish a per-square-foot price. Send the size and a photo for a firm quote."],
    ["How do you remove a lawn?", "With a rented sod cutter and hand tools. We cut a thin layer, stack or roll it, and haul it. We do not grade the soil underneath."],
    ["How long does lawn removal take?", "A modest section is often a few hours. A large or wet lawn can take more than one trailer load. We will tell you from the photos."],
    ["Can I keep the sod?", "Yes, if you say so before we cut. Most old lawns are not worth replanting, and those leave with us."],
    ["Does the lawn need to be dry?", "Drier sod is lighter and easier. We can still cut a damp lawn. Very wet sod weighs more, and that can add a load. We would rather tell you that up front."],
    ["What about sprinklers?", "Point them out. We cut around heads we can see. We do not repair irrigation. Call 811 before we dig so buried lines are marked."],
    ["Do you haul landscape rock too?", "Yes. Rock is heavy, so send photos and a rough depth. New rock or mulch coming in is our dirt, rock, and mulch delivery."],
    ["Do you bring topsoil after the sod is gone?", "We can, in small trailer loads, placed where you want it. That is a separate part of the quote. We do not regrade the yard."],
  ],
  related: ["dirt-rock-mulch-delivery", "yard-and-landscaping-debris", "deck-removal", "construction-debris-removal"],
};

export const dirtRockMulchDelivery: Service = {
  slug: "dirt-rock-mulch-delivery",
  name: "Dirt, Rock & Mulch Delivery",
  h1: "Small-Load Dirt, Rock & Mulch Delivery in Parker and the Denver Metro",
  metaTitle: "Dirt, Rock & Mulch Delivery | Small Loads, Parker CO",
  metaDescription:
    "Small-load fill dirt, topsoil, mulch, and landscape rock delivered and placed in Parker and the Denver metro. Trailer loads, not dump trucks. Free quote.",
  summary: "A few cubic yards of fill, topsoil, mulch, or rock, delivered and placed.",
  image: yardImage,
  imageAlt: "EZ Haulaway dump trailer being loaded in a residential yard",
  cityPages: false,
  intro: [
    "Bulk yards sell dirt and mulch by the dump-truck load, often with a minimum that is more than a backyard needs. If you want a few yards in the spot where a deck or a lawn used to be, that truck is the wrong tool.",
    "EZ Haulaway delivers small loads of fill dirt, topsoil, mulch, and landscape rock in Parker, Castle Rock, and the south Denver metro, and we can wheelbarrow them where you want them. This is trailer-scale. It is not a material yard, and it is not grading.",
  ],
  includes: [
    "Fill dirt and topsoil in small loads",
    "Mulch",
    "Pea gravel, river rock, and similar landscape rock",
    "Placement by wheelbarrow when access allows",
    "A rough rake so the pile is where you asked, not in the driveway",
  ],
  sections: [
    {
      heading: "What this is, and what it is not",
      text: "This is small-load delivery and placement. One trip is a few cubic yards, not a 10-yard dump truck. Dirt and rock are heavy. A trailer that looks empty can already be at the weight the truck and trailer are rated for. We will not overload them. If you need more than one trip, we say so before we start and we quote the trips.\n\nWe pick the material up from a local supplier and bring it to you. Tell us the product, or describe the job and we will tell you what we can get in a trailer. We do not keep a yard of our own, and we do not beat a gravel pit on price for a big order.",
    },
    {
      heading: "Which material is which",
      text: "Fill dirt is for bringing a low spot up. It is not a finished planting bed.\n\nTopsoil is the layer you plant in. Ask for screened topsoil if you are seeding or laying sod, and expect it to be heavier than mulch.\n\nMulch is for covering beds. It is lighter than soil, so a trailer holds more of it, and it is still a small load compared with a landscape supplier's truck.\n\nPea gravel and river rock are for beds and thin covers, not for a road base. Rock is the heaviest of the group. A little goes a long way on the scale.\n\nA rough way to size it: length times width times depth, in feet, divided by 27, is cubic yards. One cubic yard is 3 feet by 3 feet by 3 feet. At about 3 inches deep, one yard covers on the order of 100 square feet. That is arithmetic, not a promise. Depth, waste, and access change it, and we will check the number with you before anything is ordered.",
    },
    {
      heading: "What changes the price",
      text: "We do not publish a per-yard price yet. The quote has three parts: what the supplier charges for the material, how many trailer trips it takes, and the time to place it.\n\nA pile dropped in the driveway is less work than a load wheeled through a gate to the back corner. Stairs, soft ground, and a long carry add time. Spreading and a rough rake are part of placement. Building a finished bed, setting edging, or making it perfectly level is not.\n\nSend the area, the depth you have in mind, the material, and a photo of the access. A very small related haul still falls under our [[min]] minimum. We confirm the number before we buy the material.",
    },
    {
      heading: "How placement works",
      text: "Tell us where the pile should go. If it stays in the driveway, we dump or shovel it there and protect the concrete when the load needs it.\n\nIf it belongs in the backyard, we move it by wheelbarrow. We do not drive equipment across the lawn. We can rake mulch, rock, or soil roughly where you asked. We do not grade the lot, cut a swale, trench, or build a retaining wall.\n\nCall 811 before any work that digs. Placing material on top of the ground is not excavation. Pulling old sod or digging out a bed is, and that needs marked utilities.",
    },
    {
      heading: "After a deck or a lawn comes out",
      text: "The usual pairing is simple. The deck is gone and the footprint needs fill before the next project. Or the sod is gone and you want topsoil, rock, or mulch down. We can quote the tear-out and the material as one conversation and two parts of the work, so you are not calling a dump-truck company for a backyard pile.\n\nHauling dirt or concrete away, when you already have a pile, is the other direction. Our guides cover disposal. This page is for material coming in.",
      links: [
        { slug: "deck-removal", label: "Deck removal" },
        { slug: "sod-and-lawn-removal", label: "Sod and lawn removal" },
        { slug: "yard-and-landscaping-debris", label: "Hauling brush and yard debris away" },
      ],
    },
    {
      heading: "What we do not do",
      text: "We do not deliver by dump truck, sell bulk at pit prices, or take a 10-yard minimum order. We do not install sod, build retaining walls, or run a grading crew. We do not move household goods. If the job is bigger than a few trailer loads, we will tell you to call a material yard.",
    },
  ],
  faqs: [
    ["Can I get a small load of dirt or topsoil delivered?", "Yes. That is the job. We bring a few cubic yards per trip in our dump trailer, not a dump-truck load. Tell us fill or topsoil, the area, and where it should go."],
    ["How much does fill dirt or mulch delivery cost?", "We do not publish a per-yard rate yet. The quote covers the material, the trailer trips, and placement. Send the size of the area and a photo of the access."],
    ["How many yards can you bring at once?", "A few cubic yards per trip. Dirt and rock hit the trailer's weight limit long before the trailer looks full. If the job needs more, we quote another trip instead of overloading."],
    ["Will you spread it or just dump it?", "We can wheelbarrow it to the backyard and rake it roughly where you want it. We do not grade, trench, or build a finished landscape."],
    ["Do you deliver mulch and landscape rock in Castle Rock and Parker?", "Yes, in the same small-load way, across Parker, Castle Rock, and the south metro. Rock is heavier than mulch, so the trip size is smaller."],
    ["Can you haul my old dirt or concrete away too?", "Often, if the pile fits the trailer and is not mixed with trash we cannot take. Concrete in large amounts is a different job. Send photos. Our dirt removal and concrete disposal guides explain haul-away."],
    ["Do you need me to be home?", "Someone should show us where the material goes before we unload. After that, we can finish the placement if we can reach you."],
  ],
  related: ["sod-and-lawn-removal", "deck-removal", "yard-and-landscaping-debris", "construction-debris-removal"],
};
