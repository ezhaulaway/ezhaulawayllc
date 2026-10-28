/**
 * Single allow-list of live (indexable, linked) pages.
 * Route loaders, public/sitemap.xml (via scripts/build-sitemap.ts) and every
 * internal link list read from here. Page content is untouched.
 */
export const LIVE_TOP_LEVEL = [
  "/",
  "/instant-estimate",
  "/what-we-take",
  "/how-it-works",
  "/pricing",
  "/service-areas",
  "/about",
  "/contact",
  "/faq",
  "/privacy-policy",
] as const;

export const LIVE_SERVICES = [
  "furniture-removal",
  "appliance-removal",
  "hot-tub-removal",
  "light-demolition",
  "deck-and-fence-removal",
  "construction-debris-removal",
  "yard-and-landscaping-debris",
  "garage-cleanouts",
  "house-and-estate-cleanouts",
  "mattress-and-bulky-item-removal",
  "electronics-and-e-waste-removal",
  "shed-removal",
  "commercial-junk-removal",
  "wood-pallet-removal",
  "dumpster-rental-alternative",
  "hoarder-cleanout",
  "storage-unit-cleanout",
  "eviction-cleanout-and-trash-out",
  "apartment-make-ready-haul-off",
  "basement-and-attic-cleanouts",
] as const;

export const LIVE_CITIES = [
  "parker",
  "castle-rock",
  "highlands-ranch",
  "centennial",
  "littleton",
  "lone-tree",
  "aurora",
  "denver",
  "castle-pines",
  "englewood",
  "lakewood",
  "franktown",
  "elizabeth",
  "sedalia",
] as const;

const CORE_FIVE = [
  "furniture-removal",
  "appliance-removal",
  "hot-tub-removal",
  "garage-cleanouts",
  "house-and-estate-cleanouts",
];

const PRIMARY_CITIES = ["parker", "castle-rock", "highlands-ranch", "centennial", "littleton", "lone-tree", "aurora", "denver"];

const withExtras = (city: string, extras: string[] = []) =>
  [city, PRIMARY_CITIES.includes(city) ? [...CORE_FIVE, ...extras] : extras] as const;

export const LIVE_CITY_SERVICES: Record<string, readonly string[]> = Object.fromEntries([
  // Parker consolidation (option C): only the two pages that rank stay as Parker-specific pages.
  // The other five Parker city-service URLs 301 to their /services/ page via the route loader.
  ["parker", ["garage-cleanouts", "construction-debris-removal"]],
  withExtras("castle-rock"),
  withExtras("highlands-ranch"),
  withExtras("centennial", ["electronics-and-e-waste-removal"]),
  withExtras("littleton"),
  withExtras("lone-tree"),
  withExtras("aurora", ["mattress-and-bulky-item-removal", "deck-and-fence-removal"]),
  withExtras("denver", ["mattress-and-bulky-item-removal"]),
  ["castle-pines", ["furniture-removal", "hot-tub-removal"]],
  ["englewood", ["furniture-removal", "hot-tub-removal"]],
  ["lakewood", ["furniture-removal", "hot-tub-removal"]],
  ["franktown", ["commercial-junk-removal"]],
  ["elizabeth", []],
  ["sedalia", ["furniture-removal", "electronics-and-e-waste-removal"]],
]);

/** Locations present in content but outside this allow-list keep today's behavior. */
const isManagedCity = (city: string) => (LIVE_CITIES as readonly string[]).includes(city);

export const isLiveCity = (city: string) => isManagedCity(city);
export const isLiveService = (slug: string) => (LIVE_SERVICES as readonly string[]).includes(slug);
export const isLiveCityService = (city: string, service: string) =>
  LIVE_CITY_SERVICES[city]?.includes(service) ?? false;

export function liveUrlPaths(): string[] {
  return [
    ...LIVE_TOP_LEVEL,
    ...LIVE_SERVICES.map((s) => `/services/${s}`),
    ...LIVE_CITIES.map((c) => `/service-areas/${c}`),
    ...LIVE_CITIES.flatMap((c) => (LIVE_CITY_SERVICES[c] ?? []).map((s) => `/service-areas/${c}/${s}`)),
  ];
}
