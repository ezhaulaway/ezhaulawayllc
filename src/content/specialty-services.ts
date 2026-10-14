import dumpsterAltAsset from "@/assets/dumpster-alternative-loading.jpg.asset.json";
import estateImage from "@/assets/branded-service-estate.webp";
import householdImage from "@/assets/card-household.webp";
import type { Service } from "./services";

export const dumpsterRentalAlternative: Service = {
  slug: "dumpster-rental-alternative",
  name: "Dumpster Rental Alternative",
  h1: "Dumpster Rental Alternative: Full-Service Junk Removal",
  metaTitle: "Dumpster Rental Alternative in Parker & Denver | EZ Haulaway",
  metaDescription:
    "Thinking about a dumpster rental or roll-off? Compare dumpster rental vs junk removal in Parker, Castle Rock and Denver. We load it, haul it and you pay for space used.",
  cityPages: false,
  summary: "Skip the roll-off. We load, haul and clean up — you pay only for the trailer space you use.",
  image: dumpsterAltAsset.url,
  imageAlt: "EZ Haulaway crew member loading household junk from a cart into the black dump trailer beside the red work truck",
  intro: [
    "Searching for a **dumpster rental** in Parker, Castle Rock or the Denver metro? Before you book a roll-off dumpster, compare it with full-service junk removal. With a **dumpster rental alternative** like EZ Haulaway, we bring the truck and dump trailer, do the lifting and loading, sweep up and drive away — usually the same visit.",
    "A dumpster rental makes sense for some long projects. For most garage cleanouts, basement purges, estate cleanouts, move-outs and small remodels, though, homeowners end up renting a waste container, loading it themselves for days and still paying for space they never fill. Here is how **dumpster rental vs junk removal** actually compares, so you can choose the right option for your project.",
  ],
  includes: [
    "Garage, basement and attic cleanouts",
    "Move-out and estate cleanouts",
    "Furniture, appliances and mattresses",
    "Small remodel and construction debris",
    "Yard waste and landscaping debris",
    "Loading, hauling and sweep-up included",
  ],
  sections: [
    {
      heading: "Dumpster rental vs junk removal: the quick answer",
      text: "A roll-off dumpster rental gives you an empty container; you supply the labor. Junk removal gives you a crew; we supply the labor, the hauling and the disposal trip. If you are clearing out a home in a day, have heavy items like couches, appliances or a hot tub, or do not want a container sitting in the driveway, junk removal is usually the better fit. If you are tearing out a whole house over several weeks and want to toss debris as you go, a large roll-off dumpster can make more sense.",
    },
    {
      heading: "Who does the heavy lifting?",
      text: "With a dumpster rental, every couch, dresser, refrigerator and box of debris gets carried out and lifted over the container wall by you, your family or friends. With EZ Haulaway, we carry items from wherever they sit — garage, basement, back yard or upstairs bedroom — and load the trailer ourselves. For many people that labor is the real cost of a dumpster, and the reason they search for an alternative to dumpster rental in the first place.",
    },
    {
      heading: "Paying for the whole container vs paying for space used",
      text: "Dumpster rental prices are usually set by container size and rental period, with limits on weight and what you can put inside. If you only fill half of a 10 yard or 20 yard dumpster, you still pay for the full container. Our junk removal pricing is based on how much of our trailer your items take up. Our current minimum is **[[min]]**, a quarter trailer is about **[[load:2]]**, a half trailer about **[[load:4]]**, and a full trailer about **[[load:8]]**. We confirm the price before loading, so you know the cost before anything is hauled.",
      links: [{ slug: "garage-cleanouts", label: "Garage cleanouts priced by trailer space" }],
    },
    {
      heading: "Dumpster sizes compared with our dump trailer",
      text: "Roll-off dumpsters are commonly sold in 10 yard, 15 yard, 20 yard and 30 yard sizes. A 10 yard dumpster fits a small cleanout; a 20 yard dumpster is a common choice for a larger remodel or whole-house purge. Our 16-foot dump trailer holds roughly 14 to 16 cubic yards — about six to eight pickup truck beds — which covers most residential cleanouts in one load. If your project is larger, we can plan additional loads instead of you ordering a second container.",
    },
    {
      heading: "HOA rules, permits and driveway space",
      text: "Many Parker, Castle Rock and Highlands Ranch neighborhoods have HOA rules about containers in driveways, and placing a dumpster on the street can require a city permit. A roll-off also sits on your driveway for the full rental period. Check with your HOA and city before renting a dumpster. With junk removal, our truck and trailer are only on site while we load, so there is no container left in front of the house overnight and no waiting on a pickup window to get your driveway back.",
    },
    {
      heading: "What you can put in a dumpster vs what we take",
      text: "Dumpster rental companies typically restrict mattresses, appliances, tires, electronics and some heavy materials, or charge extra for them. Those are exactly the items people most want gone. We regularly haul furniture, appliances, mattresses, electronics and mixed household junk in the same load, and we sort what can be donated or recycled when possible. Like a dumpster, we do not accept hazardous waste such as chemicals, paint solvents or asbestos.",
      links: [
        { slug: "appliance-removal", label: "Appliance removal and fridge disposal" },
        { slug: "furniture-removal", label: "Furniture removal and couch disposal" },
      ],
    },
    {
      heading: "When a dumpster rental is the better choice",
      text: "We would rather you choose the right service than the wrong one. A roll-off dumpster rental can make sense for a multi-week gut renovation, a roofing tear-off or a contractor job where debris is produced steadily over time. For one-day cleanouts, mixed household junk, heavy single items or projects where you do not want to do the loading, a haul away service is usually faster and easier. If you are not sure, send photos and we will tell you honestly which option fits.",
      links: [{ slug: "construction-debris-removal", label: "Construction debris removal for remodel projects" }],
    },
    {
      heading: "Local alternative to dumpster rental near Parker and Castle Rock",
      text: "EZ Haulaway is a local, licensed and insured junk removal company based in Parker, serving Castle Rock, Highlands Ranch, Lone Tree, Centennial, Aurora, Littleton and the wider Denver metro. Instead of searching for a dumpster rental near you, send us photos of what needs to go. You will get a preliminary price, and we will confirm the final price on site before we start loading.",
    },
  ],
  faqs: [
    ["Is junk removal cheaper than renting a dumpster?", "It depends on the project. For a one-day cleanout, junk removal is often comparable or cheaper once you count your own labor, the rental period and restricted-item fees. For a multi-week renovation, a roll-off dumpster may cost less. Our pricing starts at [[min]] and is based on trailer space used."],
    ["What size dumpster do I need for a garage cleanout?", "Many garage cleanouts fit in a 10 yard or 15 yard dumpster. Our 16-foot dump trailer holds roughly 14 to 16 cubic yards, so most garage cleanouts fit in one load — and we do the loading."],
    ["Do I need a permit or HOA approval for a dumpster?", "Often, yes. Many HOAs restrict containers in driveways and cities may require a permit for street placement. Check with your HOA and city. Junk removal avoids a container being left on your property."],
    ["What if I only fill part of the container?", "With a dumpster rental you usually pay for the full container. With us, you pay for the trailer space your items actually use."],
    ["Can you take mattresses and appliances that dumpsters will not?", "Yes. We regularly haul mattresses, refrigerators, washers, dryers and other appliances along with furniture and household junk."],
    ["How fast can you come?", "Send photos and your address through the estimate form or call us. We will confirm availability and a pickup time that works for you."],
  ],
  related: ["garage-cleanouts", "house-and-estate-cleanouts", "construction-debris-removal", "hoarder-cleanout"],
};

export const hoarderCleanout: Service = {
  slug: "hoarder-cleanout",
  name: "Hoarder Cleanout",
  h1: "Hoarder Cleanout & Extreme Clutter Removal",
  metaTitle: "Hoarder Cleanout & Hoarding Cleanup in Parker & Denver | EZ Haulaway",
  metaDescription:
    "Respectful, discreet hoarder cleanout and clutter removal in Parker, Castle Rock and the Denver metro. We sort, load and haul away so the home is usable again.",
  cityPages: false,
  summary: "Discreet, judgment-free hoarder cleanouts and extreme clutter removal.",
  image: estateImage,
  imageAlt: "EZ Haulaway crew carefully clearing a cluttered room during a home cleanout",
  intro: [
    "A **hoarder cleanout** is rarely just about junk. It is usually a family, an aging parent, a landlord or a homeowner who is overwhelmed and does not know where to start. EZ Haulaway provides respectful, discreet **hoarding cleanup** and clutter removal in Parker, Castle Rock and the Denver metro.",
    "We work at the pace you set, keep what you want to keep, and load and haul away the rest. No judgment, no lectures — just a crew that shows up, does the heavy work and leaves the space usable again.",
  ],
  includes: [
    "Whole-home and room-by-room clutter removal",
    "Garages, basements, sheds and yards",
    "Furniture, boxes, papers and household items",
    "Sorting keep, donate and haul piles with you",
    "Rental and property turnover cleanouts",
    "Multiple loads planned in advance",
  ],
  sections: [
    {
      heading: "A judgment-free hoarder cleanup service",
      text: "Asking for help is the hardest step. We treat every home with discretion — we arrive in our work truck, keep conversations private and do not share photos of your home. Whether you are helping a loved one or clearing a property you inherited, you are in charge of what stays and what goes.",
    },
    {
      heading: "How a hoarding cleanout works",
      text: "Start by sending photos or describing the rooms involved. We will talk through access, what needs to be kept and whether this is a one-day job or several visits. On site, we work through the home with you or your designated family member, separating keep, donate and haul piles. We load the trailer, sweep up cleared areas and plan additional loads as needed.",
    },
    {
      heading: "Pricing for clutter and hoarder cleanouts",
      text: "Hoarder cleanouts are priced by how much trailer space the material takes, plus any extra labor for difficult access or heavy sorting. Our minimum is **[[min]]** and a full trailer is about **[[load:8]]**. Larger homes may need several loads. We give you a preliminary estimate from photos and confirm the price before loading begins.",
    },
    {
      heading: "What we do and do not handle",
      text: "We are a junk removal and hauling company. We clear clutter, furniture, boxes and household items. We do not provide biohazard cleaning, mold remediation, pest control or hazardous waste disposal; if the home needs those, we can work alongside the specialist you hire. Tell us up front about any sharps, animal waste or chemicals so we can plan safely.",
    },
    {
      heading: "Helping families and estates",
      text: "Many hoarding cleanouts happen after a parent moves into care or passes away. Our estate cleanout service is built for those situations — we coordinate around family schedules, set aside documents or valuables we come across, and help get the home ready to sell or rent.",
      links: [
        { slug: "house-and-estate-cleanouts", label: "House and estate cleanouts" },
        { slug: "storage-unit-cleanout", label: "Storage unit cleanouts" },
      ],
    },
  ],
  faqs: [
    ["Is your hoarder cleanout service discreet?", "Yes. We keep the work private, do not post photos of your home and let you decide what stays."],
    ["Do I have to be there during the cleanout?", "Someone who can make keep-or-haul decisions should be available, either on site or by phone."],
    ["Do you do biohazard cleaning?", "No. We remove clutter and household items. Biohazard, mold and pest work needs a licensed specialist."],
    ["How long does a hoarding cleanup take?", "It depends on the home. A single room may take a few hours; a whole house may take several visits. We plan the schedule with you."],
    ["How much does a hoarder cleanout cost?", "Pricing is based on trailer space used, starting at [[min]] with a full trailer around [[load:8]]. Send photos for a preliminary estimate."],
  ],
  related: ["house-and-estate-cleanouts", "garage-cleanouts", "storage-unit-cleanout", "dumpster-rental-alternative"],
};

export const storageUnitCleanout: Service = {
  slug: "storage-unit-cleanout",
  name: "Storage Unit Cleanout",
  h1: "Storage Unit Cleanout & Removal",
  metaTitle: "Storage Unit Cleanout in Parker & Denver | EZ Haulaway",
  metaDescription:
    "Storage unit cleanout and junk removal in Parker, Castle Rock and the Denver metro. We empty the unit, haul it away and help you stop paying monthly rent.",
  cityPages: false,
  summary: "Empty a storage unit in one visit and stop paying monthly rent.",
  image: householdImage,
  imageAlt: "Furniture and boxes cleared out of a storage unit ready for hauling",
  intro: [
    "Paying every month for a storage unit full of things you no longer need? EZ Haulaway provides **storage unit cleanouts** in Parker, Castle Rock and the Denver metro. We meet you at the facility, load everything you do not want to keep and haul it away so you can close out the unit.",
    "Bring a small car for the items you want to keep. We take the furniture, boxes, mattresses, appliances and general junk — then sweep the unit so it is ready for move-out.",
  ],
  includes: [
    "Furniture, mattresses and boxes",
    "Appliances and electronics",
    "Abandoned or inherited unit contents",
    "Partial cleanouts — keep what you want",
    "Sweep-up for move-out",
    "Units of every size",
  ],
  sections: [
    {
      heading: "How a storage unit cleanout works",
      text: "Tell us the facility, the unit size and what you plan to keep, or send a photo with the door open. We confirm facility access hours, meet you there, load the trailer and sweep the unit. Most standard units clear in one visit.",
    },
    {
      heading: "Storage unit cleanout cost",
      text: "We price by how much trailer space the contents take. Our minimum is **[[min]]**, a half trailer is about **[[load:4]]** and a full trailer about **[[load:8]]**. A crowded 10×10 unit often fills a large share of our 16-foot dump trailer; a 10×20 may need more. You get a price before we load.",
    },
    {
      heading: "Facility rules and access",
      text: "Storage facilities set their own gate hours and rules about trailers and dumping. Let us know the facility name so we can plan parking and timing, and make sure the unit is in your name or you have permission from the renter.",
    },
  ],
  faqs: [
    ["Do I need to be there for the storage unit cleanout?", "Someone needs to provide access and confirm what stays. If the facility allows it, we can coordinate access with you in advance."],
    ["Can you clean out a unit in one trip?", "Most standard units clear in one visit. Very full or large units may need a second load, which we plan in advance."],
    ["What does a storage unit cleanout cost?", "Pricing starts at [[min]] and is based on trailer space used. Send a photo for a preliminary estimate."],
  ],
  related: ["hoarder-cleanout", "house-and-estate-cleanouts", "furniture-removal", "dumpster-rental-alternative"],
};
