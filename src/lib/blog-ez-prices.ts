import {
  eighthPrice,
  formatMoney,
  ITEM_CATALOG,
  priceText,
  type PriceGuide,
} from "@/lib/price-guide";

/**
 * Rewrites EZ Haulaway's own stale prices in BabyLoveGrowth article HTML and
 * meta descriptions. National averages, other companies' guides, dump fees,
 * scrap, permits, and tipping stay as written. The stored article is not
 * required to change: render time and the next import both use this.
 */

function itemAmount(guide: PriceGuide, key: string): number | null {
  const entry = ITEM_CATALOG[key];
  if (!entry) return null;
  return guide.specialty.find((item) => item.item === entry.feedItem)?.amount ?? null;
}

function itemWords(guide: PriceGuide, token: string): string {
  return priceText(`[[item:${token}]]`, guide);
}

function freonAmount(guide: PriceGuide): number | null {
  return guide.adjustments.find((adjustment) => adjustment.id === "freon")?.amountNumber ?? null;
}

function hotTubWords(guide: PriceGuide): string {
  return `${itemWords(guide, "hot-tub-small")} for a small tub, ${itemWords(guide, "hot-tub-standard")} for a standard spa (4–6 people), and ${itemWords(guide, "hot-tub-large")} for a large spa or swim spa`;
}

function couchWords(guide: PriceGuide): string {
  return `${itemWords(guide, "couch-small")} for a 2–3 seat couch, ${itemWords(guide, "sleeper-couch")} for a sleeper, and ${itemWords(guide, "sectional-large")} for a large sectional`;
}

const LOAD_LABELS: { pattern: string; eighths: number }[] = [
  { pattern: "7/8\\s+trailer", eighths: 7 },
  { pattern: "5/8\\s+trailer", eighths: 5 },
  { pattern: "3/8\\s+trailer", eighths: 3 },
  { pattern: "3/4\\s+trailer", eighths: 6 },
  { pattern: "1/2\\s+trailer", eighths: 4 },
  { pattern: "1/4\\s+trailer", eighths: 2 },
  { pattern: "1/8(?:\\s+of a)?\\s+trailer", eighths: 1 },
  { pattern: "Minimum\\s*/\\s*small load", eighths: 0 },
  { pattern: "(?<!to a )Full trailer", eighths: 8 },
];

function replaceLoadLabels(input: string, guide: PriceGuide): string {
  let out = input;
  for (const { pattern, eighths } of LOAD_LABELS) {
    const re = new RegExp(
      `(${pattern})((?:\\s*</t[dh]>\\s*<t[dh][^>]*>|\\s+is|\\s+at)?\\s*)\\$\\s?[\\d,]+`,
      "gi",
    );
    const price = eighthPrice(guide, eighths);
    out = out.replace(re, (_match, label: string, gap: string) => `${label}${gap}${price}`);
  }
  return out;
}

function replacePhrase(input: string, pattern: RegExp, replacement: string): string {
  return input.replace(pattern, () => replacement);
}

function plainCell(value: string): string {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function priceForRowLabel(label: string, guide: PriceGuide): string | null {
  const text = label.replace(/\s+/g, " ").trim();
  if (/^minimum\s*\/\s*small load$/i.test(text)) return eighthPrice(guide, 0);
  if (/^1\/8 trailer$/i.test(text)) return eighthPrice(guide, 1);
  if (/^1\/4 trailer$/i.test(text)) return eighthPrice(guide, 2);
  if (/^3\/8 trailer$/i.test(text)) return eighthPrice(guide, 3);
  if (/^1\/2 trailer$/i.test(text)) return eighthPrice(guide, 4);
  if (/^5\/8 trailer$/i.test(text)) return eighthPrice(guide, 5);
  if (/^3\/4 trailer$/i.test(text)) return eighthPrice(guide, 6);
  if (/^7\/8 trailer$/i.test(text)) return eighthPrice(guide, 7);
  if (/^full trailer$/i.test(text)) return eighthPrice(guide, 8);
  if (/^couches?(\s+removal)?$/i.test(text)) return couchWords(guide);
  if (/^mattress(?:es)?(\s+removal)?$/i.test(text)) return itemWords(guide, "mattress");
  if (/^washer or dryer(\s+removal)?$/i.test(text)) return itemWords(guide, "washer-dryer");
  if (/^refrigerators?(\s+removal)?$/i.test(text)) return itemWords(guide, "fridge-full");
  if (/^treadmills?(\s+removal)?$/i.test(text)) return itemWords(guide, "treadmill");
  if (/^pianos?(\s+removal)?$/i.test(text)) return itemWords(guide, "piano");
  if (/^hot tubs?(\s+removal)?$/i.test(text)) return hotTubWords(guide);
  if (/freon/i.test(text)) {
    const fee = freonAmount(guide);
    return fee == null ? null : formatMoney(fee);
  }
  return null;
}

function rewritePriceTables(input: string, guide: PriceGuide): string {
  return input.replace(/<tr\b[^>]*>[\s\S]*?<\/tr>/gi, (row) => {
    const cells = [...row.matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)];
    if (cells.length !== 2) return row;
    const label = plainCell(cells[0]?.[1] ?? "");
    const price = cells[1]?.[1] ?? "";
    if (!/\$/.test(price)) return row;
    const next = priceForRowLabel(label, guide);
    if (!next || !cells[1]) return row;
    return row.replace(cells[1][0], cells[1][0].replace(price, next));
  });
}

function replaceFreonFees(input: string, guide: PriceGuide): string {
  const fee = freonAmount(guide);
  if (fee == null) return input;
  const words = formatMoney(fee);
  return input.replace(/\$75(?!\s*(?:to|–|-)\s*\$)/gi, (match, offset: number, whole: string) => {
    const window = whole.slice(Math.max(0, offset - 90), Math.min(whole.length, offset + 90));
    if (!/freon|refrigerant/i.test(window)) return match;
    if (/per cubic|per yard|per load|per pile|guide reports|cited at/i.test(window)) return match;
    return words;
  });
}

export function rewriteEzPriceText(input: string, guide: PriceGuide): string {
  const min = eighthPrice(guide, 0);
  const eighth = eighthPrice(guide, 1);
  const quarter = eighthPrice(guide, 2);
  const threeEighths = eighthPrice(guide, 3);
  const half = eighthPrice(guide, 4);
  const threeQuarter = eighthPrice(guide, 6);
  const full = eighthPrice(guide, 8);
  const mattress = itemWords(guide, "mattress");
  const washer = itemWords(guide, "washer-dryer");
  const fridge = itemWords(guide, "fridge-full");
  const treadmill = itemWords(guide, "treadmill");
  const piano = itemWords(guide, "piano");
  const freon = freonAmount(guide);
  const freonWords = freon == null ? "call or text for a quote" : formatMoney(freon);
  const washerEach = itemAmount(guide, "washer-dryer");
  const halfAmount = guide.loads.find((load) => load.eighths === 4)?.price ?? null;
  const pair = washerEach == null ? null : washerEach * 2;
  const spread = guide.loads.find((load) => load.eighths === 8)?.price;
  const minimum = guide.minimum;
  const jump = spread == null ? null : spread - minimum;

  let out = rewritePriceTables(input, guide);

  const phrases: [RegExp, string][] = [
    [/\$450\s*(?:–|-|to)\s*\$850 for a hot tub/gi, hotTubWords(guide)],
    [/\$450\s*(?:–|-|to)\s*\$850/gi, hotTubWords(guide)],
    [
      /At \$60 per cushion, that(?:'|’)s \$180\./gi,
      `A 2–3 seat couch is ${itemWords(guide, "couch-small")}. A sleeper couch is ${itemWords(guide, "sleeper-couch")}. A large sectional is ${itemWords(guide, "sectional-large")}.`,
    ],
    [
      /so a three-cushion sofa is \$180/gi,
      `so a 2–3 seat couch is ${itemWords(guide, "couch-small")}, a sleeper is ${itemWords(guide, "sleeper-couch")}, and a large sectional is ${itemWords(guide, "sectional-large")}`,
    ],
    [
      /A three-cushion couch, for example, comes to \$180\./gi,
      `A 2–3 seat couch is ${itemWords(guide, "couch-small")}. A sleeper couch is ${itemWords(guide, "sleeper-couch")}. A large sectional is ${itemWords(guide, "sectional-large")}.`,
    ],
    [
      /A loveseat with two cushions comes to \$120\./gi,
      `A recliner or loveseat is ${itemWords(guide, "recliner")}.`,
    ],
    [/\$60 per cushion for a couch/gi, couchWords(guide)],
    [/\$60 per cushion/gi, couchWords(guide)],
    [/\$100 per unit for a washer or dryer/gi, `${washer} for a washer or dryer`],
    [/priced separately by cushion/gi, "priced as a whole couch, not by the cushion"],
    [
      /\$125\s*(?:–|-|to)\s*\$150 for the haul-away plus the \$75 Freon handling fee, so roughly \$200 to \$225 all in/gi,
      `${fridge} for the haul-away plus the ${freonWords} Freon handling fee, so ${
        itemAmount(guide, "fridge-full") != null && freon != null
          ? formatMoney((itemAmount(guide, "fridge-full") ?? 0) + freon)
          : "call or text for a quote"
      } all in`,
    ],
    [/\$125\s*(?:–|-|to)\s*\$150/gi, fridge],
    [
      /By item that would be \$[\d,]+ for the treadmill, \$[\d,]+ for the mattress and \$[\d,]+ for the couch\./gi,
      `By item that would be ${treadmill} for the treadmill, ${mattress} for the mattress and ${itemWords(guide, "couch-small")} for a 2–3 seat couch.`,
    ],
    [
      /If the furniture fills half a trailer, that(?:'|’)s \$[\d,]+ plus \$[\d,]+ for the pair, so \$[\d,]+ total\./gi,
      pair != null && halfAmount != null
        ? `If the furniture fills half a trailer, that’s ${half} plus ${formatMoney(pair)} for the pair, so ${formatMoney(halfAmount + pair)} total.`
        : `If the furniture fills half a trailer, that’s ${half} plus the washer and dryer prices, so call or text for a quote for the total.`,
    ],
    [
      /The jump from the minimum to a full trailer is \$[\d,]+/gi,
      jump == null
        ? "The jump from the minimum to a full trailer is call or text for a quote"
        : `The jump from the minimum to a full trailer is ${formatMoney(jump)}`,
    ],
    [/\$150 to \$175/g, min === eighth ? min : `${min} to ${eighth}`],
    [/\$275 to \$350/g, quarter === threeEighths ? quarter : `${quarter} to ${threeEighths}`],
    [/\$275 to \$450/g, `${quarter} to ${half}`],
    [/\$650 to \$800/g, `${threeQuarter} to ${full}`],
    [/\$150 to \$800/g, `${min} to ${full}`],
    [
      /Hauling costs start at \$[\d,]+ for a minimum or small load, rise to \$[\d,]+ for a quarter trailer, and reach \$[\d,]+ for a full trailer/gi,
      `Hauling costs start at ${min} for a minimum or small load, rise to ${quarter} for a quarter trailer, and reach ${full} for a full trailer`,
    ],
    [
      /A minimum or small load is \$[\d,]+, a quarter trailer is \$[\d,]+, and a full trailer is \$[\d,]+/gi,
      `A minimum or small load is ${min}, a quarter trailer is ${quarter}, and a full trailer is ${full}`,
    ],
    [
      /Our prices are per trailer load: \$[\d,]+ for a minimum load, \$[\d,]+ for a quarter trailer, \$[\d,]+ for a half trailer and \$[\d,]+ for a full trailer/gi,
      `Our prices are per trailer load: ${min} for a minimum load, ${quarter} for a quarter trailer, ${half} for a half trailer and ${full} for a full trailer`,
    ],
    [
      /starts at \$[\d,]+ for a minimum or small load, \$[\d,]+ for 1\/8 of a trailer, \$[\d,]+ for 1\/4, \$[\d,]+ for 3\/8, and \$[\d,]+ for 1\/2/gi,
      `starts at ${min} for a minimum or small load, ${eighth} for 1/8 of a trailer, ${quarter} for 1/4, ${threeEighths} for 3/8, and ${half} for 1/2`,
    ],
    [
      /starts at \$[\d,]+ for a minimum or small load and \$[\d,]+ for a 1\/8 trailer/gi,
      `starts at ${min} for a minimum or small load and ${eighth} for a 1/8 trailer`,
    ],
    [
      /quarter-trailer job, \$[\d,]+, or an eighth at \$[\d,]+/gi,
      `quarter-trailer job, ${quarter}, or an eighth at ${eighth}`,
    ],
    [/one quarter full of junk is \$[\d,]+/gi, `one quarter full of junk is ${quarter}`],
    [/quarter trailer is \$[\d,]+/gi, `quarter trailer is ${quarter}`],
    [/minimum or small load is \$[\d,]+/gi, `minimum or small load is ${min}`],
    [/minimum load is \$[\d,]+/gi, `minimum load is ${min}`],
    [/minimum load at \$[\d,]+/gi, `minimum load at ${min}`],
    [/starts at \$[\d,]+ for a minimum load/gi, `starts at ${min} for a minimum load`],
    [
      /\$[\d,]+ minimum, \$[\d,]+ for a quarter trailer, \$[\d,]+ for a half and \$[\d,]+ for a full trailer/gi,
      `${min} minimum, ${quarter} for a quarter trailer, ${half} for a half and ${full} for a full trailer`,
    ],
    [
      /Our loads start at \$[\d,]+ and run to \$[\d,]+ for a full trailer/gi,
      `Our loads start at ${min} and run to ${full} for a full trailer`,
    ],
    [
      /A treadmill on its own is \$[\d,]+, which is the same as our minimum load/gi,
      `A treadmill on its own is ${treadmill}. The minimum for a pickup is ${min}`,
    ],
    [/\$[\d,]+\s+for a mattress/gi, `${mattress} for a mattress`],
    [/from \$[\d,]+\s+for a piano/gi, `${piano} for a piano`],
    [/\$[\d,]+\s+for a full trailer/gi, `${full} for a full trailer`],
    [/\$[\d,]+\s+for a quarter trailer/gi, `${quarter} for a quarter trailer`],
    [/\$[\d,]+\s+for a half trailer/gi, `${half} for a half trailer`],
    [/\$[\d,]+\s+for a 1\/8(?: of a)? trailer/gi, `${eighth} for a 1/8 trailer`],
    [/\$[\d,]+\s+for 1\/8 of a trailer/gi, `${eighth} for 1/8 of a trailer`],
    [/\$[\d,]+\s+for 1\/4(?![\d/])/gi, `${quarter} for 1/4`],
    [/\$[\d,]+\s+for 3\/8/gi, `${threeEighths} for 3/8`],
    [/\$[\d,]+\s+for 1\/2(?![\d/])/gi, `${half} for 1/2`],
    [
      /starts at a \$[\d,]+ minimum and goes up by trailer fraction to \$[\d,]+ for a full trailer/gi,
      `starts at a ${min} minimum and goes up by trailer fraction to ${full} for a full trailer`,
    ],
    [
      /from \$[\d,]+ for a minimum(?:\s+trailer)? load to \$[\d,]+ for a full trailer/gi,
      `from ${min} for a minimum load to ${full} for a full trailer`,
    ],
    [
      /starting at \$[\d,]+ for a minimum load up to \$[\d,]+ for a full trailer/gi,
      `starting at ${min} for a minimum load up to ${full} for a full trailer`,
    ],
    [
      /starts at \$[\d,]+ \(minimum load\) and tops out at \$[\d,]+ for a full trailer/gi,
      `starts at ${min} (minimum load) and tops out at ${full} for a full trailer`,
    ],
    [
      /\$[\d,]+ minimum, \$[\d,]+ for a 1\/4 trailer, \$[\d,]+ for a 1\/2 trailer, \$[\d,]+ for a full trailer/gi,
      `${min} minimum, ${quarter} for a 1/4 trailer, ${half} for a 1/2 trailer, ${full} for a full trailer`,
    ],
  ];
  for (const [pattern, replacement] of phrases) out = replacePhrase(out, pattern, replacement);

  out = replaceLoadLabels(out, guide);
  out = replaceFreonFees(out, guide);

  out = out.replace(
    /(mattress(?:es)?(?:\s+removal)?)(\s*(?:<\/td>\s*<td[^>]*>|\s+is|\s+are|\s+for|\s+at|\s*\())\s*\$100(?!\s*(?:to|–|-)\s*\$)/gi,
    (_m, label: string, gap: string) => `${label}${gap.replace(/\s*$/, " ")}${mattress}`,
  );
  out = out.replace(
    /(washer or dryer(?:\s+removal)?)([^$<.]{0,24})\$100(\s+per unit|\s+each)?/gi,
    (_m, label: string, gap: string) => `${label}${gap.replace(/\s*$/, " ")}${washer}`,
  );
  out = out.replace(
    /\$50 per hour per crew member/gi,
    `${formatMoney(guide.laborRate)} per hour per crew member`,
  );
  out = out.replace(
    /additional labor is \$50 per hour/gi,
    `additional labor is ${formatMoney(guide.laborRate)} per hour`,
  );
  out = out.replace(
    /(minimum or small load is\s*(?:<a\b[^>]*>)?)\$\d+(?:,\d{3})*/gi,
    (_match, prefix: string) => `${prefix}${min}`,
  );
  out = out.replace(
    /mattress and bulky item removal(<\/a>)?\s+service handles them for \$[\d,]+ each/gi,
    (_match, close: string | undefined) =>
      `mattress and bulky item removal${close ?? ""} service handles them for ${mattress} each`,
  );
  out = out.replace(/fits the \$150 minimum/gi, `fits the ${min} minimum`);
  out = out.replace(/Ours is \$150 for a small load/gi, `Ours is ${min} for a small load`);
  out = out.replace(/the \$150 minimum/gi, `the ${min} minimum`);
  out = out.replace(/a \$150 minimum load/gi, `a ${min} minimum load`);
  out = out.replace(
    /starting at \$150(?!\s*(?:to|–|-)\s*\$)/gi,
    (match, offset: number, whole: string) => {
      const window = whole.slice(Math.max(0, offset - 120), Math.min(whole.length, offset + 80));
      if (!/trailer|haul|our |published|ez haulaway/i.test(window)) return match;
      if (/per foot|per ft|fence length|homeowners pay|according to|guide/i.test(window))
        return match;
      return `starting at ${min}`;
    },
  );
  out = out.replace(
    /from \$150(?!\s*(?:to|–|-)\s*\$)/gi,
    (match, offset: number, whole: string) => {
      const window = whole.slice(Math.max(0, offset - 120), Math.min(whole.length, offset + 80));
      if (!/trailer|haul/i.test(window)) return match;
      if (/per foot|guide reports|homeowners pay/i.test(window)) return match;
      return `from ${min}`;
    },
  );

  return out;
}

export function rewriteEzPriceJson(value: unknown, guide: PriceGuide): unknown {
  if (typeof value === "string") return rewriteEzPriceText(value, guide);
  if (Array.isArray(value)) return value.map((entry) => rewriteEzPriceJson(entry, guide));
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, entry] of Object.entries(value)) out[key] = rewriteEzPriceJson(entry, guide);
    return out;
  }
  return value;
}
