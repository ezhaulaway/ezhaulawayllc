/** Real neighborhoods per city, used in local intros. */
export const NEIGHBORHOODS: Record<string, string[]> = {
  parker: ["Stonegate", "The Pinery", "Idyllwilde", "Canterberry Crossing", "Bradbury Ranch"],
  "castle-rock": ["The Meadows", "Founders Village", "Castlewood Ranch", "Crystal Valley", "Terrain"],
  centennial: ["Willow Creek", "Southglenn", "Smoky Hill", "Cherry Knolls", "Piney Creek"],
  "highlands-ranch": ["Westridge", "Eastridge", "Northridge", "Southridge", "BackCountry"],
  "lone-tree": ["RidgeGate", "Heritage Hills", "Carriage Club", "Montecito"],
  denver: ["Capitol Hill", "Wash Park", "Highland", "Park Hill", "Baker"],
  aurora: ["Saddle Rock", "Tallyn's Reach", "Southlands", "Seven Hills", "Murphy Creek"],
  littleton: ["Ken Caryl", "Columbine", "Roxborough Park", "Downtown Littleton", "Highline"],
  englewood: ["Cherry Hills Village", "Downtown Englewood", "Hampden", "Bates-Logan"],
  lakewood: ["Belmar", "Green Mountain", "Bear Creek", "Applewood", "Lakewood Heights"],
  elizabeth: ["Spring Valley", "Gold Creek", "Elizabeth town center"],
  franktown: ["Castlewood Canyon area", "Russellville", "Franktown acreage"],
  "castle-pines": ["The Village at Castle Pines", "The Canyons", "Lagae Ranch"],
  sedalia: ["Perry Park", "Indian Creek", "Sedalia town center"],
};

export function neighborhoodList(citySlug: string): string {
  const n = NEIGHBORHOODS[citySlug] ?? [];
  if (n.length < 2) return n[0] ?? "";
  return `${n.slice(0, -1).join(", ")} and ${n[n.length - 1]}`;
}

/** Short customer benefit per service, used in "Service in City, ST - Benefit" titles. */
export const SERVICE_BENEFIT: Record<string, string> = {
  "furniture-removal": "Heavy Lifting Included",
  "appliance-removal": "Haul-Away & Recycling",
  "hot-tub-removal": "Cut Up & Hauled Away",
  "light-demolition": "Tear-Down & Haul-Away",
  "deck-and-fence-removal": "Tear-Down & Haul-Away",
  "construction-debris-removal": "Fast Job-Site Cleanup",
  "yard-and-landscaping-debris": "Fast Yard Cleanup",
  "garage-cleanouts": "One-Visit Cleanouts",
  "house-and-estate-cleanouts": "Full-Service Cleanouts",
  "mattress-and-bulky-item-removal": "Carried Out for You",
  "electronics-and-e-waste-removal": "Responsible Recycling",
  "shed-removal": "Tear-Down & Haul-Away",
  "commercial-junk-removal": "Fast Office Cleanouts",
};

export const CITY_BENEFIT = "Upfront Pricing, Local Crew";

/** Priority city hubs and city-service pages linked from the homepage. */
export const PRIORITY_CITIES = ["parker", "castle-rock", "denver", "highlands-ranch", "centennial", "littleton", "aurora", "lone-tree"];
export const PRIORITY_CITY_SERVICES: Array<[string, string]> = [
  ["parker", "furniture-removal"],
  ["parker", "appliance-removal"],
  ["parker", "hot-tub-removal"],
  ["castle-rock", "furniture-removal"],
  ["castle-rock", "appliance-removal"],
  ["castle-rock", "yard-and-landscaping-debris"],
  ["denver", "mattress-and-bulky-item-removal"],
  ["denver", "furniture-removal"],
  ["denver", "appliance-removal"],
  ["highlands-ranch", "garage-cleanouts"],
  ["centennial", "hot-tub-removal"],
  ["littleton", "house-and-estate-cleanouts"],
];

/** Pick the longest title variant that fits Google's ~60-character display. */
export function fitTitle(...variants: string[]): string {
  return variants.find((v) => v.length <= 60) ?? variants[variants.length - 1] ?? "";
}
