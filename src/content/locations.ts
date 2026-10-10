import { priced } from "@/lib/price-store";
export type LocationContentSection = {
  heading: string;
  paragraphs: string[];
  list?: { title: string; text: string }[];
  closing?: string;
};

export type Location = {
  slug: string;
  city: string;
  county: string;
  metaTitle?: string;
  metaDescription?: string;
  intro: string;
  local: string;
  nearby: string[];
  topServices: string[];
  content?: LocationContentSection[];
};

const raw_locations: Location[] = [
  {
    slug: "parker",
    city: "Parker",
    county: "Douglas County",
    metaTitle: "Junk Removal Parker CO | Local Parker Junk Removal",
    metaDescription:
      "Junk removal in Parker, CO from a local, family-owned crew. Furniture, appliances, hot tubs and full cleanouts hauled away. Free quotes from EZ Haulaway.",
    intro:
      "Parker is home base. EZ Haulaway is a family-owned Parker junk removal company, so junk removal in Parker, CO is a job in our own neighborhood.",
    local:
      "Between newer subdivisions still filling in and established neighborhoods finally replacing that twenty-year-old deck, Parker keeps us busy with everything from single mattress pickups to full garage cleanouts.",
    nearby: ["lone-tree", "castle-rock", "centennial", "franktown", "castle-pines", "sedalia", "elizabeth"],
    topServices: ["deck-and-fence-removal", "garage-cleanouts", "hot-tub-removal"],
    content: [
      {
        heading: "Parker Junk Removal: Common Questions",
        paragraphs: [
          "Most Parker homeowners ask the same few things before they book. Here are straight answers.",
        ],
        list: [
          { title: "How much does junk removal cost in Parker?", text: "We price by trailer space. Pickups start at [[min]], a half load is about [[load:4]], and a full trailer is about [[load:8]]. Labor, loading, and dump fees are included." },
          { title: "Does Parker trash service take big items?", text: "Most Parker trash haulers and HOAs limit bulky items like couches, mattresses, and appliances. We take them, plus anything else you need gone." },
          { title: "How fast can you come?", text: "We're based in Parker, so same-day or next-day pickup is often possible. Call or text and we'll give you the soonest time." },
          { title: "Do you serve acreage and rural Parker?", text: "Yes. Larger lots out toward Franktown and Elizabeth are a regular stop for brush piles, old fencing, and shed tear-downs." },
          { title: "Do I have to be home?", text: "Not always. For curbside or garage pickups, you can pay by phone and we'll text you when it's done." },
        ],
        closing: "Want a price now? Use our free instant estimate with a few photos.",
      },
      {
        heading: "What Parker Junk Removal Includes",
        paragraphs: [
          "Every job includes the lifting, loading, hauling, and dump fees. We carry items out of the garage, basement, backyard, or upstairs bedroom. You don't drag anything to the curb.",
          "Common Parker jobs include couch and mattress pickups, garage cleanouts, old hot tubs, sheds, decks, fences, and yard debris. Usable items go to donation, and metal goes to recycling when we can.",
        ],
      },
    ],
  },
  {
    slug: "castle-rock",
    city: "Castle Rock",
    county: "Douglas County",
    metaTitle: "Junk Removal Castle Rock CO",
    metaDescription:
      "Junk removal in Castle Rock, CO — sheds, fences, hot tubs, yard debris and full cleanouts. Fast scheduling from our Parker base. Free quotes.",
    intro:
      "Castle Rock sits just down I-25 from our shop in Parker, which makes it one of the easiest areas for us to schedule quickly.",
    local:
      "Larger lots mean larger projects here — sheds, fence lines, landscaping debris, and hot tubs that have not been filled in years.",
    nearby: ["parker", "lone-tree", "highlands-ranch", "franktown", "sedalia", "elizabeth"],
    topServices: ["light-demolition", "yard-and-landscaping-debris", "deck-and-fence-removal"],
  },
  {
    slug: "centennial",
    city: "Centennial",
    county: "Arapahoe County",
    metaTitle: "Junk Removal Centennial CO | EZ Haulaway",
    metaDescription:
      "Junk removal in Centennial, CO — appliances, furniture, construction debris and property cleanouts. Local crew, free quotes from EZ Haulaway.",
    intro:
      "Centennial is a short run from Parker and a regular stop for household junk removal and property cleanouts.",
    local:
      "Many Centennial homes are at the age where kitchens and basements are getting remodeled, which means appliances, cabinets, and construction debris heading out the door.",
    nearby: ["lone-tree", "englewood", "littleton"],
    topServices: ["appliance-removal", "construction-debris-removal", "furniture-removal"],
    content: [
      {
        heading: "Junk Removal Centennial Homeowners Actually Call Back",
        paragraphs: [
          "Centennial covers a lot of ground, and the work changes block to block. Around Southglenn and Willow Creek we are usually hauling out the results of a remodel — old kitchen cabinets, a cast iron tub, vanity tops, and a garage full of scrap lumber and drywall offcuts. Out toward Smoky Hill and Piney Creek the calls lean residential: basements that have been collecting furniture for twenty years, treadmills nobody has touched since the kids moved out, and patio sets that did not survive another Colorado winter.",
          "We load everything by hand from wherever it sits. You do not have to drag a sleeper sofa up the basement stairs or wrestle a refrigerator into the driveway before we show up. Our crew brings furniture blankets and floor protection, carries it out, sweeps the space, and leaves with it in one trip.",
        ],
      },
      {
        heading: "Remodel and Construction Debris Removal in Centennial",
        paragraphs: [
          "A remodel generates more waste than most people plan for, and city trash service will not touch it. We haul drywall, tile, carpet and pad, trim, scrap framing lumber, cabinets, countertops, fixtures, and broken concrete from patios and walkways. If you are working with a contractor, we can come mid-project to clear the pile so the crew keeps moving, then come back at the end for the final load.",
        ],
        list: [
          {
            title: "Appliance disposal",
            text: "Refrigerators, washers, dryers, dishwashers, and ranges run [[item:Refrigerator (full size)]] to [[item:Refrigerator (side by side)]] each and go to metal recycling rather than a landfill.",
          },
          {
            title: "Basement and garage cleanouts",
            text: "Decades of boxes, shelving, old paint cans that are fully dried, exercise equipment, and furniture cleared in a single visit.",
          },
          {
            title: "Hot tubs and decks",
            text: "We cut down and haul old spas starting around [[item:Hot tub]], and we have torn out more than 300 decks across the south metro.",
          },
          {
            title: "Furniture and mattresses",
            text: "Mattresses are [[item:Mattress]], box springs [[item:Box spring]], and sectional couches are priced per cushion at [[item:Couch]].",
          },
        ],
      },
      {
        heading: "Straight Pricing Before We Load Anything",
        paragraphs: [
          "Our 16-foot by 8-foot dump trailer holds about 14 cubic yards — roughly the same as a small roll-off dumpster, except we do all the lifting and it leaves the same day. A minimum load starts at [[min]], a quarter trailer runs [[load:2]], half is [[load:4]], three-quarters is [[load:6]], and a completely full trailer is [[load:8]]. We quote the price on site before a single item goes on the trailer, and that number is what you pay.",
        ],
        closing:
          "Call or text us for a same-week slot in Centennial, or send photos through our instant estimate tool for a ballpark in minutes.",
      },
    ],
  },

  {
    slug: "highlands-ranch",
    city: "Highlands Ranch",
    county: "Douglas County",
    metaTitle: "Junk Removal Highlands Ranch CO | EZ Haulaway",
    metaDescription:
      "Junk removal in Highlands Ranch, CO — furniture, mattresses, exercise equipment and garage cleanouts. Free quotes from EZ Haulaway.",
    intro:
      "We serve Highlands Ranch several times a week, from single-item pickups to complete garage and basement clearing.",
    local:
      "Storage-heavy homes with finished basements tend to accumulate furniture and exercise equipment nobody uses anymore. Those are some of our most common calls here.",
    nearby: ["littleton", "centennial", "lone-tree"],
    topServices: ["mattress-and-bulky-item-removal", "garage-cleanouts", "furniture-removal"],
  },
  {
    slug: "lone-tree",
    city: "Lone Tree",
    county: "Douglas County",
    metaTitle: "Junk Removal Lone Tree CO | EZ Haulaway",
    metaDescription:
      "Junk removal in Lone Tree, CO — furniture, office cleanouts, electronics and bulky items hauled away. Same-week scheduling and free quotes.",
    intro:
      "Lone Tree is minutes from Parker, so same-week scheduling is usually straightforward.",
    local:
      "We handle a mix of residential cleanouts and commercial work here, including office furniture and tenant turnovers around the business corridors.",
    nearby: ["parker", "centennial", "highlands-ranch", "castle-pines"],
    topServices: ["commercial-junk-removal", "furniture-removal", "electronics-and-e-waste-removal"],
  },
  {
    slug: "denver",
    city: "Denver",
    county: "Denver County",
    metaTitle: "Junk Removal Denver CO | EZ Haulaway",
    metaDescription: "Junk removal and hauling services in Denver, CO. Furniture, appliances, cleanouts and debris hauled away. Free quotes from EZ Haulaway LLC.",
    intro:
      "EZ Haulaway works throughout Denver, from older neighborhoods with alley access to downtown apartments and offices.",
    local:
      "City jobs come with tight parking and narrow stairwells. We plan access before we arrive so the crew is not improvising in front of your building.",
    nearby: ["englewood", "aurora"],
    topServices: ["furniture-removal", "house-and-estate-cleanouts", "commercial-junk-removal"],
    content: [
      {
        heading: "Reliable, Eco-Friendly Junk Removal in Denver",
        paragraphs: [
          "When clutter takes over your space, you need a dependable junk removal company that handles the heavy lifting for you. Proudly serving the Denver area, we specialize in both residential and commercial cleanouts of all sizes. Whether you are clearing out a cluttered garage, upgrading your office workspace, or simply looking to get rid of unwanted items, our professional team is dedicated to providing a seamless, stress-free removal experience from start to finish.",
        ],
      },
      {
        heading: "Comprehensive Removal Services Tailored to Your Needs",
        paragraphs: [
          "No job is too big or too small. Our premier junk removal service covers everything from single-item pickups to full-scale property cleanouts. We offer specialized junk hauling solutions for:",
        ],
        list: [
          {
            title: "Unwanted furniture",
            text: "We safely remove and haul away old couches, desks, mattresses, and heavy dining sets without damaging your property.",
          },
          {
            title: "Construction debris",
            text: "Keep your renovation or job site safe and clear with our prompt pickup of scrap wood, drywall, concrete, and remodeling waste.",
          },
          {
            title: "Office and Retail cleanouts",
            text: "Minimizing downtime while clearing out old inventory, cubicles, and filing cabinets.",
          },
          {
            title: "Appliance & Electronics",
            text: "Safe, compliant disposal of heavy, outdated tech and white goods.",
          },
        ],
      },
      {
        heading: "Our Commitment to Keeping Colorado Clean",
        paragraphs: [
          "We love Denver, and we are committed to keeping it beautiful. That is why we take a strictly eco friendly approach to our work. We don't just dump your belongings into the nearest landfill; instead, our team carefully sorts through the load. We partner with local charities, donation centers, and recycling facilities to ensure that usable goods find a second life and raw materials are properly processed.",
        ],
        closing:
          "Ready to reclaim your space? Contact us today for a free estimate and let our team handle the mess!",
      },
    ],
  },
  {
    slug: "aurora",
    city: "Aurora",
    county: "Arapahoe & Adams County",
    metaTitle: "Junk Removal Aurora CO | Aurora Junk Removal & Hauling",
    metaDescription:
      "Junk removal in Aurora, CO — rental turnovers, estate cleanouts, appliance and furniture hauling. Fast scheduling and free quotes from EZ Haulaway.",
    intro:
      "Need junk removal in Aurora, CO? Aurora is one of the largest areas we cover, and we take jobs across the city from Southlands out toward the older neighborhoods.",
    local:
      "Rental turnovers and estate cleanouts make up a good share of our Aurora work, alongside everyday appliance and furniture pickups.",
    nearby: ["denver", "centennial"],
    topServices: ["house-and-estate-cleanouts", "appliance-removal", "garage-cleanouts"],
    content: [
      {
        heading: "Junk Removal Aurora Neighborhood by Neighborhood",
        paragraphs: [
          "Aurora is close to 400,000 people spread across two counties, and no two jobs here look alike. Out by Southlands and Saddle Rock we are mostly clearing garages, moving-day leftovers, and furniture from homes that are being listed. Around Heather Ridge and the older stretches off Colfax and Havana we get a lot of rental turnovers, eviction cleanouts, and apartments full of items left behind. Near the Buckley area we work with military families on short-notice moves, which usually means everything has to be gone this week, not next month.",
          "Because we are based in Parker, Aurora is a straight shot for us and there is no travel surcharge. One family-owned crew shows up, quotes the job in person, and loads it out the same visit.",
        ],
      },
      {
        heading: "Rental Turnovers, Evictions, and Estate Cleanouts",
        paragraphs: [
          "If you manage property in Aurora, you already know the clock starts the moment a unit goes empty. We clear the whole thing — furniture, mattresses, appliances, carpet, trash bags, and whatever is left in the closets — so your cleaners and painters can get in the next day. For estate and probate cleanouts, we work slowly and respectfully, set aside anything the family wants to keep, and route usable furniture and household goods to local donation centers instead of the dump.",
        ],
        list: [
          {
            title: "Tenant turnover cleanouts",
            text: "Full unit clearing including appliances, mattresses, and abandoned belongings, usually completed in one visit.",
          },
          {
            title: "Estate and probate cleanouts",
            text: "Whole-home clearing with donation sorting, so the property is ready for listing or handover.",
          },
          {
            title: "HOA compliance cleanups",
            text: "Junk piles, dead landscaping debris, broken fencing, and driveway clutter cleared before a deadline hits.",
          },
          {
            title: "Appliance and bulky item pickup",
            text: "Refrigerators and washers [[item:Refrigerator (full size)]] to [[item:Refrigerator (side by side)]], mattresses [[item:Mattress]], box springs [[item:Box spring]], couches priced at [[item:Couch]] per cushion.",
          },
        ],
      },
      {
        heading: "The Heavy Work Other Aurora Haulers Pass On",
        paragraphs: [
          "Plenty of companies will take bagged trash and call it a day. We also cut down and haul old hot tubs starting around [[item:Hot tub]], tear down sheds, and remove worn-out decks and fence lines — we have taken out more than 300 decks across the metro. Anything metal goes to recycling, usable furniture goes to donation, and the rest goes to a licensed transfer station. The only things we cannot take are hazardous materials like wet paint, fuel, chemicals, asbestos, and medical waste.",
        ],
      },
      {
        heading: "Aurora Junk Removal Pricing",
        paragraphs: [
          "Aurora junk removal is priced by how much space your items take in our 16-foot dump trailer. Pickups start at [[min]], a half load is about [[load:4]], and a full trailer is about [[load:8]]. Labor, loading, hauling, and dump fees are included, with no extra trip charge for Aurora.",
        ],
        closing:
          "Call or text 720-614-7223 for an Aurora slot, or send photos through our instant estimate for a price range in minutes.",
      },
    ],
  },

  {
    slug: "littleton",
    city: "Littleton",
    county: "Arapahoe & Jefferson County",
    metaTitle: "Junk Removal Littleton CO | EZ Haulaway",
    metaDescription:
      "Junk removal in Littleton, CO — deck and fence tear-outs, basement cleanouts and yard debris hauled away. Free quotes from EZ Haulaway.",
    intro:
      "Littleton mixes long-established neighborhoods with newer development, and both keep our trailer full.",
    local:
      "Older Littleton homes often mean decks and fences well past their service life, plus basements holding decades of stored items.",
    nearby: ["highlands-ranch", "englewood", "centennial", "sedalia"],
    topServices: ["deck-and-fence-removal", "house-and-estate-cleanouts", "yard-and-landscaping-debris"],
    content: [
      {
        heading: "Junk Removal in Littleton, CO",
        paragraphs: [
          "Littleton junk removal with EZ Haulaway is simple: send a photo, get a price, and we carry everything out. We serve homes across Littleton, from the older streets near downtown to newer neighborhoods to the south.",
          "Older Littleton homes often have decks and fences past their prime, plus basements full of stored furniture, boxes, and old appliances. We handle the tear-down and the haul in one visit.",
        ],
      },
      {
        heading: "Littleton Junk Removal: Common Questions",
        paragraphs: ["Here are quick answers to what Littleton homeowners ask most."],
        list: [
          { title: "How much does junk removal cost in Littleton?", text: "We price by trailer space. Pickups start at [[min]], a half load is about [[load:4]], and a full trailer is about [[load:8]]. Labor, loading, and dump fees are included." },
          { title: "Do you remove decks and fences?", text: "Yes. Ben has taken out more than 300 decks. We tear it down and haul it off in the same visit." },
          { title: "Can you clear out a basement?", text: "Yes. We carry everything up the stairs and out, so you don't lift a thing." },
          { title: "Where does my junk go?", text: "Usable items go to donation, metal goes to recycling, and the rest goes to a licensed disposal site." },
        ],
        closing: "Want a Littleton price now? Use our free instant estimate with a few photos.",
      },
    ],
  },
  {
    slug: "englewood",
    city: "Englewood",
    county: "Arapahoe County",
    metaTitle: "Junk Removal Englewood CO | EZ Haulaway",
    metaDescription:
      "Junk removal in Englewood, CO — furniture, mattresses, small commercial cleanouts and bulky items. Local crew, free quotes.",
    intro:
      "Englewood is a quick trip for us and a frequent stop for both household and small commercial jobs.",
    local:
      "Smaller lots and older homes mean careful access and a lot of hand-carrying. That is normal work for our crew.",
    nearby: ["denver", "littleton", "centennial"],
    topServices: ["furniture-removal", "commercial-junk-removal", "mattress-and-bulky-item-removal"],
  },
  {
    slug: "lakewood",
    city: "Lakewood",
    county: "Jefferson County",
    metaTitle: "Junk Removal Lakewood CO | EZ Haulaway",
    metaDescription:
      "Junk removal in Lakewood, CO — garage cleanouts, landscaping debris and light demolition hauled away. Free quotes from EZ Haulaway.",
    intro:
      "We cover Lakewood across the west side of the metro for junk removal, cleanouts, and light demolition.",
    local:
      "Mature yards here generate serious landscaping debris, and a lot of Lakewood garages are due for a real clear-out.",
    nearby: ["denver"],
    topServices: ["yard-and-landscaping-debris", "garage-cleanouts", "light-demolition"],
  },
  {
    slug: "elizabeth",
    city: "Elizabeth",
    county: "Elbert County",
    metaTitle: "Junk Removal Elizabeth CO | EZ Haulaway",
    metaDescription:
      "Junk removal in Elizabeth, CO — property cleanouts, outbuilding tear-downs, scrap and brush hauled away. Free quotes from EZ Haulaway.",
    intro:
      "EZ Haulaway makes the trip out to Elizabeth for everything from single heavy items to full property cleanouts.",
    local:
      "Rural lots and ranch-style homes mean bigger yards, older outbuildings, and plenty of long-stored household junk that needs to go.",
    nearby: ["parker", "franktown", "castle-rock"],
    topServices: ["garage-cleanouts", "yard-and-landscaping-debris", "house-and-estate-cleanouts"],
  },
  {
    slug: "franktown",
    city: "Franktown",
    county: "Douglas County",
    metaTitle: "Junk Removal Franktown CO | EZ Haulaway",
    metaDescription:
      "Junk removal in Franktown, CO — fence tear-outs, shed removal, brush and acreage cleanups. Free quotes from EZ Haulaway.",
    intro:
      "Franktown is a quick run southeast of Parker, and we handle junk removal and light demolition jobs here regularly.",
    local:
      "A mix of acreage properties and older homes means fence tear-outs, shed removals, and brush cleanup are common requests.",
    nearby: ["parker", "castle-rock", "elizabeth", "sedalia"],
    topServices: ["deck-and-fence-removal", "light-demolition", "garage-cleanouts"],
  },
  {
    slug: "castle-pines",
    city: "Castle Pines",
    county: "Douglas County",
    metaTitle: "Junk Removal Castle Pines CO | EZ Haulaway",
    metaDescription:
      "Junk removal in Castle Pines, CO — furniture swaps, mattress removal and garage cleanouts. Same-week scheduling. Free quotes from EZ Haulaway.",
    intro:
      "Castle Pines is close to our Parker base and an easy area for same-week junk removal scheduling.",
    local:
      "Newer homes and active move-ins mean furniture swaps, mattress removals, and garage organization jobs keep us busy here.",
    nearby: ["parker", "castle-rock", "lone-tree", "highlands-ranch"],
    topServices: ["furniture-removal", "mattress-and-bulky-item-removal", "garage-cleanouts"],
  },
  {
    slug: "sedalia",
    city: "Sedalia",
    county: "Douglas County",
    metaTitle: "Junk Removal Sedalia CO | EZ Haulaway",
    metaDescription:
      "Junk removal in Sedalia, CO — appliance haul-away, yard debris and full garage cleanouts. Free quotes from EZ Haulaway.",
    intro:
      "Sedalia sits along Highway 85 and is a regular stop for EZ Haulaway on the way to and from Parker.",
    local:
      "Mountain homes and rural properties here often need appliance haul-away, yard debris cleanup, and full garage clear-outs.",
    nearby: ["castle-rock", "littleton", "parker", "franktown"],
    topServices: ["yard-and-landscaping-debris", "appliance-removal", "garage-cleanouts"],
  },
];
export const locations = priced(raw_locations);

export const locationBySlug = (slug: string) => locations.find((location) => location.slug === slug);

/** Cities with the strongest local search demand — used for city + service cross-linking. */
export const PRIORITY_CITY_SLUGS = [
  "parker",
  "castle-rock",
  "denver",
  "highlands-ranch",
  "centennial",
  "castle-pines",
] as const;

export const priorityLocations = PRIORITY_CITY_SLUGS
  .map((slug) => locations.find((location) => location.slug === slug))
  .filter((location): location is Location => Boolean(location));

/** High-ticket, low-competition specialty services promoted on city pages. */
export const SPECIALTY_SERVICE_SLUGS = [
  "hot-tub-removal",
  "shed-removal",
  "deck-and-fence-removal",
  "mattress-and-bulky-item-removal",
] as const;
