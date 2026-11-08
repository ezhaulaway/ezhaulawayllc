/**
 * Proves a changed fixture price shows up in page copy, llms.txt, the estimator
 * instructions, and the public pricing payload, and that a missing item cannot
 * fall back to an old number.
 * Run: bun scripts/check-price-consistency.ts
 */
import { cityFaqs } from "../src/content/city-faqs";
import { locations } from "../src/content/locations";
import {
  buildEstimatorInstructions,
  eighthPrice,
  formatMoney,
  publicPricing,
  QUOTE_ONLY,
  SNAPSHOT_GUIDE,
} from "../src/lib/price-guide";
import { buildLlmsText } from "../src/lib/llms-text";
import { priceText, setGuide } from "../src/lib/price-store";

const guide = structuredClone(SNAPSHOT_GUIDE);
guide.version = "consistency-check";
guide.minimum = 11111;
const full = guide.loads.find((load) => load.eighths === 8);
if (!full) throw new Error("no full load");
full.price = 88888;
setGuide(guide);

const rendered = [
  locations
    .find((location) => location.slug === "parker")
    ?.content?.map((section) => section.paragraphs.join(" "))
    .join("\n") ?? "",
  cityFaqs("Parker")
    .map((row) => priceText(row.join(" ")))
    .join("\n"),
  buildLlmsText(guide),
  buildEstimatorInstructions(guide),
  JSON.stringify(publicPricing(guide)),
  eighthPrice(guide, 8),
  priceText("[[item:Couch]] [[item:not-a-real-item]] [[load:8]]"),
].join("\n");

const problems: string[] = [];
if (!rendered.includes(formatMoney(11111))) problems.push("minimum did not propagate");
if (!rendered.includes(formatMoney(88888))) problems.push("full-trailer price did not propagate");
if (rendered.includes("[[")) problems.push("unresolved token");
if (rendered.includes("$800") || rendered.includes("per cushion"))
  problems.push("legacy price leaked");
if (!rendered.includes(QUOTE_ONLY)) problems.push("missing item was not quote-only");
if (rendered.includes("$60")) problems.push("old couch price leaked");

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log("price consistency ok");
