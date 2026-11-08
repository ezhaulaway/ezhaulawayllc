import snapshotJson from "../content/price-snapshot.json";

/**
 * Prices come from the EZ Crew public feed. This module turns one feed payload
 * into the guide used for a request, and turns [[tokens]] into that guide's wording.
 * Item lookups are exact catalog keys. A missing item or a bad feed never
 * substitutes an older hand-written price.
 */

export const QUOTE_ONLY = "call or text for a quote";
export const PRICE_SOURCE = "https://ezhaulawaycrew.lovable.app/api/public/pricing";

/** Ben approved this. The crew feed's free TV/computer discount does not include the minimum. */
export const FREE_TV_COMPUTER_MINIMUM = 100;

export function freeTvComputerWording(): string {
  return `Free TV and computer recycling with any standard junk removal pickup over ${formatMoney(FREE_TV_COMPUTER_MINIMUM)}.`;
}

export type PriceUnit = "each" | "flat rate" | "starting at";

/** Content tokens such as [[item:mattress]] map to one exact feed item name. */
export const ITEM_CATALOG: Record<string, { feedItem: string; unit?: PriceUnit }> = {
  mattress: { feedItem: "Mattress" },
  "box-spring": { feedItem: "Box spring" },
  "fridge-full": { feedItem: "Fridge / Freezer (full size)" },
  "washer-dryer": { feedItem: "Washer / dryer (each)", unit: "each" },
  "water-heater": { feedItem: "Water heater" },
  dresser: { feedItem: "Dresser" },
  treadmill: { feedItem: "Treadmill" },
  piano: { feedItem: "Piano (starting)", unit: "starting at" },
  tv: { feedItem: "TV / monitor" },
  bbq: { feedItem: "BBQ grill" },
  "couch-small": { feedItem: "Couch small (2-3 seat)" },
  recliner: { feedItem: "Recliner/loveseat" },
  "sleeper-couch": { feedItem: "Sleeper Couch" },
  "sectional-large": { feedItem: "Sectional couch large (6+ seats)" },
  "hot-tub-small": { feedItem: "Hot tub — small (2–3 person), flat rate", unit: "flat rate" },
  "hot-tub-standard": { feedItem: "Hot tub — standard (4–6 person), flat rate", unit: "flat rate" },
  "hot-tub-large": {
    feedItem: "Hot tub — large (7+ person / swim spa), flat rate",
    unit: "flat rate",
  },
};

export type LoadLevel = {
  eighths: number;
  label: string;
  shortLabel: string;
  volume: string;
  price: number;
};

export type SpecialtyItem = {
  item: string;
  /** Numeric amount when the feed published a single number. */
  amount: number | null;
  /** Wording taken from the feed, before a catalog unit is added for prose. */
  price: string;
};

export type Adjustment = {
  id: string;
  label: string;
  amount: string;
  amountNumber: number | null;
};

export type Discount = {
  id: string;
  label: string;
  amount: string;
  amountNumber: number | null;
};

export type PriceGuide = {
  minimum: number;
  laborRate: number;
  loads: LoadLevel[];
  adjustments: Adjustment[];
  discounts: Discount[];
  specialty: SpecialtyItem[];
  live: boolean;
  version: string;
  source: "ez-crew" | "snapshot";
};

export type TravelFee = {
  amount: number;
  miles: number | null;
  label: string;
};

const SHORT = ["Min", "⅛", "¼", "⅜", "½", "⅝", "¾", "⅞", "Full"];

/** Longest fraction first so "1/8" is not taken from a longer mark. */
const FRACTIONS: ReadonlyArray<readonly [string, number]> = [
  ["7/8", 7],
  ["⅞", 7],
  ["5/8", 5],
  ["⅝", 5],
  ["3/8", 3],
  ["⅜", 3],
  ["3/4", 6],
  ["¾", 6],
  ["1/2", 4],
  ["½", 4],
  ["1/4", 2],
  ["¼", 2],
  ["1/8", 1],
  ["⅛", 1],
];

export function formatMoney(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

/** Military is a flat dollar amount off. Free TV/computer uses the approved $100 policy, not the feed's $0. */
export function formatDiscount(discount: Discount): { label: string; amount: string | null } {
  const label = discount.label;
  if (/military/i.test(label) && discount.amountNumber != null) {
    return { label, amount: `${formatMoney(discount.amountNumber)} off` };
  }
  if (/tv|computer/i.test(label)) {
    return { label: freeTvComputerWording(), amount: null };
  }
  return {
    label,
    amount: discount.amountNumber != null ? formatMoney(discount.amountNumber) : discount.amount,
  };
}

function finiteNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && /^\$?\d+(\.\d+)?$/.test(value.trim())) {
    const n = Number(value.trim().replace("$", ""));
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function moneyText(value: unknown): { amount: number | null; text: string } | null {
  const n = finiteNumber(value);
  if (n != null && n >= 0) return { amount: n, text: formatMoney(n) };
  if (typeof value === "string" && value.trim())
    return { amount: null, text: value.trim().slice(0, 80) };
  return null;
}

function eighthsFromLabel(label: string): number | null {
  const lower = label.toLowerCase();
  if (lower.includes("min") || lower.includes("small")) return 0;
  for (const [mark, eighths] of FRACTIONS) {
    if (label.includes(mark)) return eighths;
  }
  if (lower.includes("full")) return 8;
  return null;
}

function versionFor(raw: Record<string, unknown>, body: unknown): string {
  if (typeof raw["updatedAt"] === "string" && raw["updatedAt"].trim())
    return raw["updatedAt"].trim();
  const serialized = JSON.stringify(body);
  let hash = 0;
  for (let i = 0; i < serialized.length; i++)
    hash = (Math.imul(31, hash) + serialized.charCodeAt(i)) | 0;
  return `guide-${(hash >>> 0).toString(16)}`;
}

/**
 * Accept a feed payload only when its own fields identify each load.
 * Array position is never used as a price. A partial or contradictory payload
 * is rejected so the caller can keep a single earlier guide.
 */
export function normalizeFeed(
  raw: unknown,
  meta: { live: boolean; source: PriceGuide["source"] },
): PriceGuide | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;
  const minimum = finiteNumber(record["minimum"]);
  const laborRate = finiteNumber(record["laborRate"]);
  if (minimum == null || minimum <= 0 || laborRate == null || laborRate <= 0) return null;

  const rawLoads = Array.isArray(record["loads"]) ? record["loads"] : null;
  if (!rawLoads || rawLoads.length === 0) return null;
  const loads: LoadLevel[] = [];
  for (const entry of rawLoads) {
    if (!entry || typeof entry !== "object") return null;
    const load = entry as Record<string, unknown>;
    const label = String(load["label"] ?? "")
      .trim()
      .slice(0, 80);
    const price = finiteNumber(load["price"]);
    const explicit = finiteNumber(load["eighths"]);
    const eighths =
      explicit != null && explicit >= 0 && explicit <= 8 && Number.isInteger(explicit)
        ? explicit
        : eighthsFromLabel(label);
    if (!label || price == null || price <= 0 || eighths == null) return null;
    if (loads.some((existing) => existing.eighths === eighths)) return null;
    const short = String(load["shortLabel"] ?? "")
      .trim()
      .slice(0, 12);
    loads.push({
      eighths,
      label,
      shortLabel: short || SHORT[eighths] || String(eighths),
      volume: String(load["volume"] ?? "")
        .trim()
        .slice(0, 40),
      price,
    });
  }
  loads.sort((a, b) => a.eighths - b.eighths);

  const specialty: SpecialtyItem[] = [];
  const rawSpecialty = Array.isArray(record["specialty"]) ? record["specialty"] : [];
  for (const entry of rawSpecialty) {
    if (!entry || typeof entry !== "object") return null;
    const item = entry as Record<string, unknown>;
    const name = String(item["item"] ?? "")
      .trim()
      .slice(0, 120);
    const priced = moneyText(item["price"]);
    if (!name || !priced) return null;
    if (specialty.some((existing) => existing.item === name)) return null;
    specialty.push({ item: name, amount: priced.amount, price: priced.text });
  }

  const adjustments = readCharges(record["adjustments"]);
  const discounts = readCharges(record["discounts"]);
  if (!adjustments || !discounts) return null;

  const body = { minimum, laborRate, loads, adjustments, discounts, specialty };
  return {
    ...body,
    live: meta.live,
    source: meta.source,
    version: versionFor(record, body),
  };
}

function readCharges(value: unknown): Adjustment[] | null {
  if (value == null) return [];
  if (!Array.isArray(value)) return null;
  const charges: Adjustment[] = [];
  for (const entry of value) {
    if (!entry || typeof entry !== "object") return null;
    const charge = entry as Record<string, unknown>;
    const label = String(charge["label"] ?? "")
      .trim()
      .slice(0, 160);
    const id = String(charge["id"] ?? label)
      .trim()
      .slice(0, 80);
    const priced = moneyText(charge["amount"]);
    if (!label || !id || !priced) return null;
    charges.push({ id, label, amount: priced.text, amountNumber: priced.amount });
  }
  return charges;
}

const snapshotGuide = normalizeFeed(snapshotJson, { live: false, source: "snapshot" });
if (!snapshotGuide) throw new Error("Committed EZ Crew price snapshot failed validation");

/** Last known-good feed, generated from the crew app. Cold start and outages use this whole guide. */
export const SNAPSHOT_GUIDE: PriceGuide = snapshotGuide;

export function loadByEighths(guide: PriceGuide, eighths: number): LoadLevel | undefined {
  return guide.loads.find((load) => load.eighths === eighths);
}

export function eighthPrice(guide: PriceGuide, eighths: number): string {
  const load = loadByEighths(guide, eighths);
  return load ? formatMoney(load.price) : QUOTE_ONLY;
}

export function travelFee(guide: PriceGuide): TravelFee | null {
  const match = guide.adjustments.find(
    (adjustment) =>
      /distance fee|travel fee/i.test(adjustment.label) && /parker/i.test(adjustment.label),
  );
  if (!match || match.amountNumber == null || match.amountNumber < 0) return null;
  const miles = match.label.match(/(\d+)\s*miles/i);
  return { amount: match.amountNumber, miles: miles ? Number(miles[1]) : null, label: match.label };
}

export function travelPhrase(guide: PriceGuide): string {
  const fee = travelFee(guide);
  if (!fee) return QUOTE_ONLY;
  const money = formatMoney(fee.amount);
  if (fee.miles != null)
    return `a ${money} travel fee for jobs more than ${fee.miles} miles from Parker`;
  return `a ${money} travel fee (${fee.label})`;
}

export function formatItemPrice(item: SpecialtyItem, unit?: PriceUnit): string {
  if (item.amount == null) return item.price || QUOTE_ONLY;
  const money = formatMoney(item.amount);
  if (unit === "starting at") return `starting at ${money}`;
  if (unit === "each") return `${money} each`;
  if (unit === "flat rate") return `${money} flat rate`;
  return money;
}

function specialtyForKey(
  guide: PriceGuide,
  key: string,
): { item: SpecialtyItem; unit?: PriceUnit } | null {
  const entry = ITEM_CATALOG[key];
  if (!entry) return null;
  const item = guide.specialty.find((specialty) => specialty.item === entry.feedItem);
  if (!item) return null;
  return entry.unit ? { item, unit: entry.unit } : { item };
}

export function resolveToken(token: string, guide: PriceGuide): string {
  const [kind, ...rest] = token.split(":");
  const arg = rest.join(":").trim();
  if (kind === "min") return formatMoney(guide.minimum);
  if (kind === "labor") return formatMoney(guide.laborRate);
  if (kind === "travel") return travelPhrase(guide);
  if (kind === "load") {
    if (!/^\d+$/.test(arg)) return QUOTE_ONLY;
    return eighthPrice(guide, Number(arg));
  }
  if (kind === "item") {
    const found = specialtyForKey(guide, arg);
    return found ? formatItemPrice(found.item, found.unit) : QUOTE_ONLY;
  }
  if (kind === "adj") {
    const adjustment = guide.adjustments.find((entry) => entry.id === arg);
    if (!adjustment) return QUOTE_ONLY;
    return adjustment.amountNumber != null
      ? formatMoney(adjustment.amountNumber)
      : adjustment.amount;
  }
  return QUOTE_ONLY;
}

export function priceText(value: string, guide: PriceGuide): string {
  if (!value.includes("[[")) return value;
  return value.replace(/\[\[([^\]]+)\]\]/g, (_match, token: string) =>
    resolveToken(token.trim(), guide),
  );
}

export function publicPricing(guide: PriceGuide) {
  return {
    version: guide.version,
    source: guide.source,
    live: guide.live,
    minimum: guide.minimum,
    laborRate: guide.laborRate,
    loads: guide.loads.map((load) => ({
      eighths: load.eighths,
      label: load.label,
      volume: load.volume,
      price: load.price,
    })),
    adjustments: guide.adjustments.map((adjustment) => ({
      id: adjustment.id,
      label: adjustment.label,
      amount: adjustment.amountNumber ?? adjustment.amount,
    })),
    discounts: guide.discounts.map((discount) => {
      const shown = formatDiscount(discount);
      return {
        id: discount.id,
        label: shown.label,
        amount: shown.amount ?? discount.amountNumber ?? discount.amount,
      };
    }),
    freeTvComputerRecycling: freeTvComputerWording(),
    specialty: guide.specialty.map((item) => ({
      item: item.item,
      price: item.amount ?? item.price,
    })),
    travel: travelFee(guide),
  };
}

export function buildEstimatorInstructions(guide: PriceGuide): string {
  const loads = guide.loads
    .map(
      (load) =>
        `- ${load.label}${load.volume ? ` (${load.volume})` : ""}: ${formatMoney(load.price)}`,
    )
    .join("\n");
  const specialty = guide.specialty
    .map((item) => {
      const entry = Object.values(ITEM_CATALOG).find((catalog) => catalog.feedItem === item.item);
      return `${item.item}: ${formatItemPrice(item, entry?.unit)}`;
    })
    .join("; ");
  const adjustments = guide.adjustments
    .map(
      (adjustment) =>
        `${adjustment.label}: ${adjustment.amountNumber != null ? formatMoney(adjustment.amountNumber) : adjustment.amount}`,
    )
    .join("; ");
  const discounts = guide.discounts
    .map((discount) => {
      const shown = formatDiscount(discount);
      return shown.amount ? `${shown.label}: ${shown.amount}` : shown.label;
    })
    .join("; ");

  return `You are the estimating assistant for EZ Haulaway, a junk removal company based in Parker, Colorado.

PRICE GUIDE VERSION: ${guide.version}
Use only the prices in this guide. If an item is not listed, tell the customer to call or text for a quote. Do not invent a price, a range, or an uncertainty spread. When a published price is a single number, set price_low and price_high to that same number.

TRAILER: 16' x 8' x 3' dump trailer, about 14 cubic yards.

TRAILER LOAD PRICING (includes standard labor, loading, hauling, and disposal):
${loads}
- More than one trailer load: multiply the full-trailer price by the number of loads and use load_size "multiple_loads".

ALL-INCLUSIVE RULE: Trailer load prices already include labor, loading, hauling, and disposal for everything that fits in the load. NEVER add furniture or single-item prices on top of a trailer load price.

ONLY ADD-ONS ALLOWED ON TOP OF A LOAD PRICE: the adjustments listed below (including Freon and heavy materials) and hot tub flat rates. Nothing else may be added to a load price.

MINIMUM: ${formatMoney(guide.minimum)}. Never quote below the minimum.
LABOR: ${formatMoney(guide.laborRate)} per hour per crew member may be added only for difficult access, disassembly, oversized or heavy items, or extended loading time. Mention it when those conditions are visible.

TRAVEL: ${travelPhrase(guide)}.

ADJUSTMENTS: ${adjustments || "none"}.
DISCOUNTS: ${discounts || "none"}. Apply a discount only when the description clearly matches that discount.

SPECIALTY / SINGLE-ITEM PRICING (use these INSTEAD OF trailer pricing only when the job is just a few of these items; put each one in special_items with this price):
${specialty || "none published"}.

METHOD: Estimate volume from the photos and description and pick the closest fill level. Be honest about uncertainty by lowering confidence, not by inventing a dollar spread. Keep summary to 2-3 sentences, at most 12 items, at most 4 prep tips. Plain friendly language. This is a preliminary estimate; the final price is approved before work begins.`;
}
