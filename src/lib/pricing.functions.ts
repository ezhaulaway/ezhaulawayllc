import { createServerFn } from "@tanstack/react-start";
import { LABOR_RATE, LOAD_LEVELS, MINIMUM_CHARGE, SPECIALTY_ITEMS, type LoadLevel, type SpecialtyItem } from "@/content/pricing";

export type Adjustment = { id: string; label: string; amount: string };
export type PriceGuide = {
  minimum: number;
  laborRate: number;
  loads: LoadLevel[];
  adjustments: Adjustment[];
  specialty: SpecialtyItem[];
  live: boolean;
};

export const FALLBACK_GUIDE: PriceGuide = {
  minimum: MINIMUM_CHARGE,
  laborRate: LABOR_RATE,
  loads: LOAD_LEVELS,
  adjustments: [],
  specialty: SPECIALTY_ITEMS,
  live: false,
};

const SOURCE = "https://ezhaulawaycrew.lovable.app/api/public/pricing";
let cache: { at: number; guide: PriceGuide } | null = null;

const FRACTIONS: Record<string, number> = {
  "1/8": 1, "⅛": 1, "1/4": 2, "¼": 2, "3/8": 3, "⅜": 3, "1/2": 4, "½": 4,
  "5/8": 5, "⅝": 5, "3/4": 6, "¾": 6, "7/8": 7, "⅞": 7,
};
const SHORT = ["Min", "⅛", "¼", "⅜", "½", "⅝", "¾", "⅞", "Full"];

function toNum(v: unknown): number | null {
  const n = typeof v === "number" ? v : Number(String(v ?? "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : null;
}
function toStr(v: unknown): string {
  return typeof v === "number" ? `$${v}` : String(v ?? "").slice(0, 80);
}

function eighthsFor(label: string, index: number, count: number): number {
  const l = label.toLowerCase();
  if (l.includes("min") || l.includes("small")) return 0;
  if (l.includes("full")) return 8;
  for (const [k, v] of Object.entries(FRACTIONS)) if (label.includes(k)) return v;
  return count === 9 ? index : -1;
}

function normalize(raw: any): PriceGuide | null {
  if (!raw || typeof raw !== "object") return null;
  const minimum = toNum(raw.minimum) ?? MINIMUM_CHARGE;
  const laborRate = toNum(raw.laborRate) ?? LABOR_RATE;
  const rawLoads: any[] = Array.isArray(raw.loads) ? raw.loads : [];
  const loads: LoadLevel[] = [];
  rawLoads.forEach((l, i) => {
    const label = String(l?.label ?? "").slice(0, 60);
    const price = toNum(l?.price);
    const eighths = eighthsFor(label, i, rawLoads.length);
    if (!label || price === null || eighths < 0 || loads.some((x) => x.eighths === eighths)) return;
    loads.push({ eighths, label, shortLabel: SHORT[eighths]!, volume: String(l?.volume ?? "").slice(0, 40), price });
  });
  loads.sort((a, b) => a.eighths - b.eighths);
  const specialty: SpecialtyItem[] = (Array.isArray(raw.specialty) ? raw.specialty : [])
    .filter((s: any) => s?.item)
    .map((s: any) => ({ item: String(s.item).slice(0, 80), price: toStr(s.price) }));
  const adjustments: Adjustment[] = (Array.isArray(raw.adjustments) ? raw.adjustments : [])
    .filter((a: any) => a?.label)
    .map((a: any) => ({ id: String(a.id ?? a.label).slice(0, 40), label: String(a.label).slice(0, 120), amount: toStr(a.amount) }));
  if (loads.length === 0) return null;
  return { minimum, laborRate, loads, adjustments, specialty: specialty.length ? specialty : SPECIALTY_ITEMS, live: true };
}

let inflight: Promise<PriceGuide> | null = null;

async function fetchFresh(): Promise<PriceGuide> {
  try {
    const res = await fetch(SOURCE, { headers: { accept: "application/json" }, signal: AbortSignal.timeout(1500) });
    if (!res.ok) throw new Error(String(res.status));
    const guide = normalize(await res.json());
    if (!guide) throw new Error("bad data");
    cache = { at: Date.now(), guide };
    return guide;
  } catch {
    return cache?.guide ?? FALLBACK_GUIDE;
  } finally {
    inflight = null;
  }
}

/** Never blocks long: serves cached prices instantly and refreshes in the background; first fetch waits at most 1.5s. */
export async function loadPriceGuide(): Promise<PriceGuide> {
  if (cache) {
    if (Date.now() - cache.at >= 5 * 60 * 1000 && !inflight) inflight = fetchFresh();
    return cache.guide;
  }
  inflight ??= fetchFresh();
  return inflight;
}

export const getPriceGuide = createServerFn({ method: "GET" }).handler(() => loadPriceGuide());
