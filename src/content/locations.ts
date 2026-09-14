export type Location = {
  slug: string;
  city: string;
  county: string;
  intro: string;
  local: string;
  nearby: string[];
  topServices: string[];
};

export const locations: Location[] = [
  {
    slug: "parker",
    city: "Parker",
    county: "Douglas County",
    intro:
      "Parker is home base. EZ Haulaway is a family-owned business run out of Parker, so a job here is a job in our own neighborhood.",
    local:
      "Between newer subdivisions still filling in and established neighborhoods finally replacing that twenty-year-old deck, Parker keeps us busy with everything from single mattress pickups to full garage cleanouts.",
    nearby: ["lone-tree", "castle-rock", "centennial", "franktown", "castle-pines", "sedalia", "elizabeth"],
    topServices: ["deck-and-fence-removal", "garage-cleanouts", "hot-tub-removal"],
  },
  {
    slug: "castle-rock",
    city: "Castle Rock",
    county: "Douglas County",
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
    intro:
      "Centennial is a short run from Parker and a regular stop for household junk removal and property cleanouts.",
    local:
      "Many Centennial homes are at the age where kitchens and basements are getting remodeled, which means appliances, cabinets, and construction debris heading out the door.",
    nearby: ["lone-tree", "englewood", "littleton"],
    topServices: ["appliance-removal", "construction-debris-removal", "furniture-removal"],
  },
  {
    slug: "highlands-ranch",
    city: "Highlands Ranch",
    county: "Douglas County",
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
    intro:
      "EZ Haulaway works throughout Denver, from older neighborhoods with alley access to downtown apartments and offices.",
    local:
      "City jobs come with tight parking and narrow stairwells. We plan access before we arrive so the crew is not improvising in front of your building.",
    nearby: ["englewood", "aurora"],
    topServices: ["furniture-removal", "house-and-estate-cleanouts", "commercial-junk-removal"],
  },
  {
    slug: "aurora",
    city: "Aurora",
    county: "Arapahoe & Adams County",
    intro:
      "Aurora is one of the largest areas we cover, and we take jobs across the city from Southlands out toward the older neighborhoods.",
    local:
      "Rental turnovers and estate cleanouts make up a good share of our Aurora work, alongside everyday appliance and furniture pickups.",
    nearby: ["denver", "centennial"],
    topServices: ["house-and-estate-cleanouts", "appliance-removal", "garage-cleanouts"],
  },
  {
    slug: "littleton",
    city: "Littleton",
    county: "Arapahoe & Jefferson County",
    intro:
      "Littleton mixes long-established neighborhoods with newer development, and both keep our trailer full.",
    local:
      "Older Littleton homes often mean decks and fences well past their service life, plus basements holding decades of stored items.",
    nearby: ["highlands-ranch", "englewood", "centennial", "sedalia"],
    topServices: ["deck-and-fence-removal", "house-and-estate-cleanouts", "yard-and-landscaping-debris"],
  },
  {
    slug: "englewood",
    city: "Englewood",
    county: "Arapahoe County",
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
    intro:
      "Sedalia sits along Highway 85 and is a regular stop for EZ Haulaway on the way to and from Parker.",
    local:
      "Mountain homes and rural properties here often need appliance haul-away, yard debris cleanup, and full garage clear-outs.",
    nearby: ["castle-rock", "littleton", "parker", "franktown"],
    topServices: ["yard-and-landscaping-debris", "appliance-removal", "garage-cleanouts"],
  },
];

export const locationBySlug = (slug: string) => locations.find((location) => location.slug === slug);
