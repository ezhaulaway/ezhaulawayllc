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

/**
 * One guide for the request: the live feed, the last successful feed, or the validated snapshot. Never a mix.
 * `maxWaitMs` caps how long the first HTML response waits on a cold feed. The fetch keeps running and fills
 * the cache, and the page refreshes from that cache when the guide it rendered was the snapshot.
 */
export async function loadPriceGuide(maxWaitMs?: number): Promise<PriceGuide> {
  if (cache) {
    if (Date.now() - cache.at >= 5 * 60 * 1000 && !inflight) inflight = fetchFresh();
    return cache.guide;
  }
  inflight ??= fetchFresh();
  if (maxWaitMs == null) return inflight;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<PriceGuide>((resolve) => {
    timer = setTimeout(() => resolve(cache?.guide ?? SNAPSHOT_GUIDE), maxWaitMs);
  });
  try {
    return await Promise.race([inflight, deadline]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export const getPriceGuide = createServerFn({ method: "GET" }).handler(() => loadPriceGuide());
