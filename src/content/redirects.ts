import { isLiveCityService } from "@/content/live-pages";

/**
 * Retired URLs. Loaders send a 301 before rendering, including city URLs that
 * used an old service slug. Destinations are live pages.
 */
export const SERVICE_SLUG_REDIRECTS: Record<string, string> = {
  "deck-and-fence-removal": "deck-removal",
  "realtor-and-attorney-cleanouts": "house-and-estate-cleanouts",
  "basement-and-attic-cleanouts": "house-and-estate-cleanouts",
  "eviction-cleanout-and-trash-out": "rental-cleanout-and-make-ready",
  "apartment-make-ready-haul-off": "rental-cleanout-and-make-ready",
};

/** In-house or imported blog slugs that now live on one stronger post. */
export const BLOG_SLUG_REDIRECTS: Record<string, string> = {
  "yard-waste-brush-removal-cost-parker": "yard-waste-removal-cost",
};

export function retiredServicePath(slug: string): string | null {
  const next = SERVICE_SLUG_REDIRECTS[slug];
  return next ? `/services/${next}` : null;
}

/** Old city × service URL. Keeps a city page only when that new pair is live. */
export function retiredCityServicePath(city: string, service: string): string | null {
  const next = SERVICE_SLUG_REDIRECTS[service];
  if (!next) return null;
  if (isLiveCityService(city, next)) return `/service-areas/${city}/${next}`;
  return `/services/${next}`;
}
