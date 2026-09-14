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
    nearby: ["lone-tree", "castle-rock", "centennial"],
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
    nearby: ["parker", "lone-tree", "highlands-ranch"],
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
    nearby: ["parker", "centennial", "highlands-ranch"],
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
    nearby: ["englewood", "aurora", "commerce-city"],
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
    nearby: ["denver", "centennial", "commerce-city"],
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
    nearby: ["highlands-ranch", "englewood", "centennial"],
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
    nearby: ["denver", "arvada", "westminster"],
    topServices: ["yard-and-landscaping-debris", "garage-cleanouts", "light-demolition"],
  },
  {
    slug: "arvada",
    city: "Arvada",
    county: "Jefferson County",
    intro:
      "Arvada homeowners call us for everything from one heavy item to a complete property cleanout.",
    local:
      "Between Olde Town's older housing stock and the newer neighborhoods north of town, we see a wide mix of jobs here.",
    nearby: ["westminster", "lakewood", "broomfield"],
    topServices: ["house-and-estate-cleanouts", "appliance-removal", "deck-and-fence-removal"],
  },
  {
    slug: "westminster",
    city: "Westminster",
    county: "Adams & Jefferson County",
    intro:
      "Westminster is part of our regular north-metro route for junk removal and debris hauling.",
    local:
      "Remodel debris and garage clutter are the two most common reasons Westminster customers call us.",
    nearby: ["arvada", "northglenn", "broomfield"],
    topServices: ["construction-debris-removal", "garage-cleanouts", "furniture-removal"],
  },
  {
    slug: "thornton",
    city: "Thornton",
    county: "Adams County",
    intro:
      "We haul junk throughout Thornton, from single appliance pickups to full basement and garage cleanouts.",
    local:
      "Fast growth means plenty of remodels and move-outs, and both generate more debris than a curbside bin can handle.",
    nearby: ["northglenn", "commerce-city", "westminster"],
    topServices: ["appliance-removal", "construction-debris-removal", "house-and-estate-cleanouts"],
  },
  {
    slug: "northglenn",
    city: "Northglenn",
    county: "Adams County",
    intro:
      "Northglenn is on our north-metro run, and we can usually work it into the same week.",
    local:
      "Compact lots and older homes mean careful carries and a lot of long-stored household junk finally going out.",
    nearby: ["thornton", "westminster", "commerce-city"],
    topServices: ["garage-cleanouts", "mattress-and-bulky-item-removal", "yard-and-landscaping-debris"],
  },
  {
    slug: "commerce-city",
    city: "Commerce City",
    county: "Adams County",
    intro:
      "Commerce City mixes residential neighborhoods with light industrial space, and we work in both.",
    local:
      "Warehouse clearing and commercial cleanouts sit alongside everyday household pickups on our schedule here.",
    nearby: ["thornton", "denver", "aurora"],
    topServices: ["commercial-junk-removal", "construction-debris-removal", "appliance-removal"],
  },
  {
    slug: "broomfield",
    city: "Broomfield",
    county: "Broomfield County",
    intro:
      "Broomfield sits at the north edge of our service area and we take jobs there regularly.",
    local:
      "Office and tech space turnovers plus suburban household cleanouts make up most of the work we do in Broomfield.",
    nearby: ["westminster", "arvada", "northglenn"],
    topServices: ["commercial-junk-removal", "electronics-and-e-waste-removal", "furniture-removal"],
  },
];

export const locationBySlug = (slug: string) => locations.find((location) => location.slug === slug);
