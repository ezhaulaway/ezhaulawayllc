/**
 * Replace src/content/price-snapshot.json with a validated copy of the EZ Crew feed.
 * Run: bun scripts/refresh-price-snapshot.ts
 * The snapshot is the outage fallback. It is never edited by hand.
 */
import { writeFileSync } from "node:fs";
import { normalizeFeed, PRICE_SOURCE } from "../src/lib/price-guide";

const response = await fetch(PRICE_SOURCE, { headers: { accept: "application/json" } });
if (!response.ok) {
  console.error(`Feed responded ${response.status}. Snapshot left unchanged.`);
  process.exit(1);
}
const raw: unknown = await response.json();
const guide = normalizeFeed(raw, { live: true, source: "ez-crew" });
if (!guide) {
  console.error("Feed failed validation. Snapshot left unchanged.");
  process.exit(1);
}
writeFileSync(
  new URL("../src/content/price-snapshot.json", import.meta.url),
  `${JSON.stringify(raw, null, 2)}\n`,
);
console.log(
  `snapshot ${guide.version} minimum ${guide.minimum} full ${guide.loads.find((load) => load.eighths === 8)?.price ?? "missing"}`,
);
