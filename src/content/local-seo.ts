import { PHONE } from "@/content/site";

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

/** Meta description patterns for city x service pages without a hand-written description. {City} is the city name. */
export const CITY_SERVICE_DESCRIPTION: Record<string, string> = {
  "furniture-removal": `Furniture removal in {City}, CO. Couches, sectionals, dressers and tables carried out and hauled away. Free quote: ${PHONE}.`,
  "appliance-removal": `Appliance removal in {City}, CO. Fridges, washers, dryers and stoves carried out and recycled. Free quote: ${PHONE}.`,
  "hot-tub-removal": `Hot tub removal in {City}, CO. We drain, cut up and haul away old hot tubs and spas in one visit. Free quote: ${PHONE}.`,
  "garage-cleanouts": `Garage cleanouts in {City}, CO. Years of clutter cleared in one visit so you can park again. Free quote: ${PHONE}.`,
  "house-and-estate-cleanouts": `House and estate cleanouts in {City}, CO. Respectful whole-home, rental and estate cleanouts. Free quote: ${PHONE}.`,
  "electronics-and-e-waste-removal": `Electronics and e-waste removal in {City}, CO. TVs, computers and monitors picked up and recycled. Free quote: ${PHONE}.`,
  "commercial-junk-removal": `Commercial junk removal in {City}, CO. Offices, retail and property-manager turnovers cleared fast. Free quote: ${PHONE}.`,
  "construction-debris-removal": `Construction debris removal in {City}, CO. Drywall, lumber, flooring and remodel debris hauled away. Free quote: ${PHONE}.`,
};

/** Hub titles that should not use the shared pattern. */
export const HUB_TITLE_OVERRIDES: Record<string, string> = {
  parker: "Junk Removal in Parker, CO | Family-Owned Crew",
};

/**
 * City hub title. Same-day service is offered when the trailer is open,
 * so the title says that instead of promising a same-day pickup.
 */
export function cityHubTitle(city: string, slug: string): string {
  return (
    HUB_TITLE_OVERRIDES[slug] ??
    fitTitle(
      `Junk Removal in ${city}, CO | Same-Day When Available`,
      `Junk Removal in ${city}, CO | Fast Scheduling`,
      `Junk Removal in ${city}, CO | EZ Haulaway`,
    )
  );
}

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
