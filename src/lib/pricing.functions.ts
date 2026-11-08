import { createServerFn } from "@tanstack/react-start";
import { normalizeFeed, PRICE_SOURCE, SNAPSHOT_GUIDE, type PriceGuide } from "@/lib/price-guide";

export type { Adjustment, LoadLevel, PriceGuide, SpecialtyItem } from "@/lib/price-guide";
export { SNAPSHOT_GUIDE as FALLBACK_GUIDE } from "@/lib/price-guide";

const SOURCE = PRICE_SOURCE;
let cache: { at: number; guide: PriceGuide } | null = null;
let inflight: Promise<PriceGuide> | null = null;

async function fetchFresh(): Promise<PriceGuide> {
  try {
    const res = await fetch(SOURCE, {
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(1500),
    });
    if (!res.ok) throw new Error(String(res.status));
    const guide = normalizeFeed(await res.json(), { live: true, source: "ez-crew" });
    if (!guide) throw new Error("invalid price feed");
    cache = { at: Date.now(), guide };
    return guide;
  } catch {
    return cache?.guide ?? SNAPSHOT_GUIDE;
  } finally {
    inflight = null;
  }
}

/** One guide for the request: the live feed, the last successful feed, or the validated snapshot. Never a mix. */
export async function loadPriceGuide(): Promise<PriceGuide> {
  if (cache) {
    if (Date.now() - cache.at >= 5 * 60 * 1000 && !inflight) inflight = fetchFresh();
    return cache.guide;
  }
  inflight ??= fetchFresh();
  return inflight;
}

export const getPriceGuide = createServerFn({ method: "GET" }).handler(() => loadPriceGuide());
