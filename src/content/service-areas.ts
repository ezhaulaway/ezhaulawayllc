/**
 * The only published service-area list. Navigation, schema, the sitemap allow-list,
 * llms.txt, and FAQs read this. City page copy lives in locations.ts and must
 * include every slug here.
 *
 * Ben's named area is Parker, Castle Rock, Lone Tree, Elizabeth, Franktown,
 * Aurora, and Englewood. The I-25 south corridor stops at Castle Rock. Other
 * cities already published on the site stay in this list until he decides to retire them.
 */
export type ServiceArea = {
  slug: string;
  city: string;
  county: string;
};

export const SERVICE_AREAS = [
  { slug: "parker", city: "Parker", county: "Douglas County" },
  { slug: "castle-rock", city: "Castle Rock", county: "Douglas County" },
  { slug: "centennial", city: "Centennial", county: "Arapahoe County" },
  { slug: "highlands-ranch", city: "Highlands Ranch", county: "Douglas County" },
  { slug: "lone-tree", city: "Lone Tree", county: "Douglas County" },
  { slug: "denver", city: "Denver", county: "Denver County" },
  { slug: "aurora", city: "Aurora", county: "Arapahoe & Adams County" },
  { slug: "littleton", city: "Littleton", county: "Arapahoe & Jefferson County" },
  { slug: "englewood", city: "Englewood", county: "Arapahoe County" },
  { slug: "lakewood", city: "Lakewood", county: "Jefferson County" },
  { slug: "elizabeth", city: "Elizabeth", county: "Elbert County" },
  { slug: "franktown", city: "Franktown", county: "Douglas County" },
  { slug: "castle-pines", city: "Castle Pines", county: "Douglas County" },
  { slug: "sedalia", city: "Sedalia", county: "Douglas County" },
] as const satisfies readonly ServiceArea[];

export const SERVICE_AREA_SLUGS = SERVICE_AREAS.map((area) => area.slug);
export const SERVICE_AREA_CITIES = SERVICE_AREAS.map((area) => area.city);

export function serviceAreaList(conjunction = "and"): string {
  const cities = SERVICE_AREA_CITIES;
  if (cities.length < 2) return cities[0] ?? "";
  return `${cities.slice(0, -1).join(", ")}, ${conjunction} ${cities[cities.length - 1]}`;
}
