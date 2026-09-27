import { FALLBACK_GUIDE, type PriceGuide } from "@/lib/pricing.functions";

/**
 * Single source for every price shown on the site. The crew app is the control center;
 * the root loader and a 5-minute client refresh push its price guide in here.
 * Text anywhere on the site can use tokens: [[min]] [[labor]] [[load:0-8]] [[item:Name]] [[adj:id]]
 */
let current: PriceGuide = FALLBACK_GUIDE;
const listeners = new Set<() => void>();

export const getGuide = () => current;
export function setGuide(g: PriceGuide) {
  if (JSON.stringify(g) === JSON.stringify(current)) return;
  current = g;
  listeners.forEach((l) => l());
}
export function subscribeGuide(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

function findItem(list: { item: string; price: string }[], key: string) {
  const k = key.toLowerCase();
  return list.find((s) => s.item.toLowerCase() === k) ?? list.find((s) => s.item.toLowerCase().startsWith(k)) ?? list.find((s) => s.item.toLowerCase().includes(k));
}

function resolve(token: string, g: PriceGuide): string | null {
  const [kind, arg = ""] = token.split(":");
  if (kind === "min") return money(g.minimum);
  if (kind === "labor") return money(g.laborRate);
  if (kind === "load") {
    const l = g.loads.find((x) => x.eighths === Number(arg)) ?? FALLBACK_GUIDE.loads.find((x) => x.eighths === Number(arg));
    return l ? money(l.price) : null;
  }
  if (kind === "item") return (findItem(g.specialty, arg) ?? findItem(FALLBACK_GUIDE.specialty, arg))?.price ?? null;
  if (kind === "adj") return g.adjustments.find((a) => a.id === arg)?.amount ?? null;
  return null;
}

export function priceText(s: string, g: PriceGuide = current): string {
  if (!s.includes("[[")) return s;
  return s.replace(/\[\[([^\]]+)\]\]/g, (m, t: string) => resolve(t, g) ?? m);
}

const cache = new WeakMap<object, unknown>();
/** Wraps content data so every string read through it has live prices filled in. */
export function priced<T extends object>(obj: T): T {
  if (cache.has(obj)) return cache.get(obj) as T;
  const p = new Proxy(obj, {
    get(target, key, recv) {
      const v = Reflect.get(target, key, recv);
      if (typeof v === "string") return priceText(v);
      if (v && typeof v === "object") return priced(v);
      if (typeof v === "function" && Array.isArray(target)) return v.bind(p);
      return v;
    },
  });
  cache.set(obj, p);
  return p;
}
