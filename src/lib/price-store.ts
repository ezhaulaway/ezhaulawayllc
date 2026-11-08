import { priceText as renderPriceText, SNAPSHOT_GUIDE, type PriceGuide } from "@/lib/price-guide";

/**
 * Single price guide for the current request. The root loader and a 5-minute
 * client refresh replace it with the crew-app guide. Until that arrives, text
 * uses the validated snapshot, not a hand-kept price list.
 *
 * Tokens: [[min]] [[labor]] [[load:0-8]] [[item:mattress]] [[adj:freon]] [[travel]]
 */
let current: PriceGuide = SNAPSHOT_GUIDE;
const listeners = new Set<() => void>();

export const getGuide = () => current;
export function setGuide(guide: PriceGuide) {
  if (JSON.stringify(guide) === JSON.stringify(current)) return;
  current = guide;
  listeners.forEach((listener) => listener());
}
export function subscribeGuide(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function priceText(value: string, guide: PriceGuide = current): string {
  return renderPriceText(value, guide);
}

const cache = new WeakMap<object, unknown>();
/** Wraps content data so every string read through it has the current guide filled in. */
export function priced<T extends object>(obj: T): T {
  if (cache.has(obj)) return cache.get(obj) as T;
  const proxy = new Proxy(obj, {
    get(target, key, receiver) {
      const value = Reflect.get(target, key, receiver);
      if (typeof value === "string") return priceText(value);
      if (value && typeof value === "object") return priced(value);
      if (typeof value === "function" && Array.isArray(target)) return value.bind(proxy);
      return value;
    },
  });
  cache.set(obj, proxy);
  return proxy;
}
