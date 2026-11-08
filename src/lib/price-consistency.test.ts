import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { cityFaqs } from "@/content/city-faqs";
import { locations } from "@/content/locations";
import { LIVE_CITIES } from "@/content/live-pages";
import { locations as navLocations } from "@/content/navigation";
import { SERVICE_AREAS } from "@/content/service-areas";
import { BUSINESS_ID, PHONE } from "@/content/site";
import { buildLlmsText } from "@/lib/llms-text";
import {
  buildEstimatorInstructions,
  eighthPrice,
  formatMoney,
  ITEM_CATALOG,
  normalizeFeed,
  priceText,
  publicPricing,
  QUOTE_ONLY,
  SNAPSHOT_GUIDE,
  travelPhrase,
  type PriceGuide,
} from "@/lib/price-guide";
import { setGuide } from "@/lib/price-store";
import snapshotJson from "@/content/price-snapshot.json";

function walkFiles(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === "routeTree.gen.ts") continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walkFiles(path, out);
    else if (/\.(ts|tsx)$/.test(name) && !name.endsWith(".test.ts")) out.push(path);
  }
  return out;
}

function stamp(base: PriceGuide): PriceGuide {
  const guide: PriceGuide = structuredClone(base);
  guide.version = "fixture-price-guide";
  guide.live = false;
  guide.source = "snapshot";
  guide.minimum = 11111;
  guide.laborRate = 22222;
  for (const load of guide.loads) load.price = 30000 + load.eighths;
  guide.specialty.forEach((item, index) => {
    item.amount = 40000 + index;
    item.price = formatMoney(item.amount);
  });
  guide.adjustments.forEach((adjustment, index) => {
    adjustment.amountNumber = 50000 + index;
    adjustment.amount = formatMoney(adjustment.amountNumber);
  });
  const travel = guide.adjustments.find((adjustment) =>
    /distance fee|travel fee/i.test(adjustment.label),
  );
  if (!travel) throw new Error("fixture has no travel adjustment");
  travel.label = "Distance fee — job more than 42 miles from Parker";
  travel.amountNumber = 50077;
  travel.amount = formatMoney(50077);
  guide.discounts.forEach((discount, index) => {
    discount.amountNumber = 60000 + index;
    discount.amount = formatMoney(discount.amountNumber);
  });
  return guide;
}

const PRICE_TOKEN = /\[\[(?:min|labor|travel|load:[^\]]+|item:[^\]]+|adj:[^\]]+)\]\]/g;

function renderedSite(guide: PriceGuide): string {
  setGuide(guide);
  const fromSource = walkFiles("src").flatMap(
    (path) => readFileSync(path, "utf8").match(PRICE_TOKEN) ?? [],
  );
  return [
    priceText(fromSource.join("\n"), guide),
    buildLlmsText(guide),
    buildEstimatorInstructions(guide),
    JSON.stringify(publicPricing(guide)),
    priceText(
      cityFaqs("Monument")
        .map((row) => row.join(" "))
        .join("\n"),
      guide,
    ),
    locations
      .map(
        (location) =>
          `${location.city} ${location.intro} ${(location.content ?? []).map((section) => section.paragraphs.join(" ")).join(" ")}`,
      )
      .join("\n"),
  ].join("\n");
}

describe("one price guide", () => {
  const fixture = stamp(SNAPSHOT_GUIDE);

  it("rejects a feed that does not name its own prices", () => {
    expect(normalizeFeed(null, { live: true, source: "ez-crew" })).toBeNull();
    expect(
      normalizeFeed(
        { minimum: 120, laborRate: 50, loads: [{ label: "Mystery", price: 999 }] },
        { live: true, source: "ez-crew" },
      ),
    ).toBeNull();
    const reversed = {
      ...(snapshotJson as object),
      loads: [...(snapshotJson as { loads: unknown[] }).loads].reverse(),
    };
    const guide = normalizeFeed(reversed, { live: true, source: "ez-crew" });
    expect(guide?.loads.find((load) => load.eighths === 1)?.price).toBe(120);
    expect(guide?.loads.find((load) => load.eighths === 2)?.label).toMatch(/1\/4/);
    expect(eighthPrice(guide!, 2)).toBe("$240");
    expect(eighthPrice(guide!, 1)).not.toBe(eighthPrice(guide!, 2));
  });

  it("uses the validated snapshot when the feed is missing, with no hand-kept ladder", () => {
    expect(SNAPSHOT_GUIDE.minimum).toBe(120);
    expect(SNAPSHOT_GUIDE.loads.find((load) => load.eighths === 8)?.price).toBe(840);
    expect(SNAPSHOT_GUIDE.specialty.map((item) => item.item)).toContain(
      "Fridge / Freezer (full size)",
    );
    expect(SNAPSHOT_GUIDE.specialty.map((item) => item.item)).not.toContain("Couch");
    expect(
      priceText("[[min]] [[load:8]] [[item:Couch]] [[item:Hot tub]] [[adj:freon]]", SNAPSHOT_GUIDE),
    ).toBe("$120 $840 call or text for a quote call or text for a quote $100");
  });

  it("propagates one fixture through pages, schema text, llms, the estimator, and the pricing tool", () => {
    const text = renderedSite(fixture);
    expect(text).toContain(formatMoney(fixture.minimum));
    expect(text).toContain(formatMoney(30008));
    expect(text).toContain("42 miles");
    expect(text).toContain(formatMoney(50077));
    expect(text).toContain(formatMoney(22222));
    expect(text).toContain("fixture-price-guide");
    expect(publicPricing(fixture).version).toBe("fixture-price-guide");
    expect(buildEstimatorInstructions(fixture)).toContain(formatMoney(fixture.minimum));
    expect(buildEstimatorInstructions(fixture)).not.toMatch(
      /\+\/-\s*\$50|\$150 minimum|\$60 per cushion/,
    );
    expect(text).not.toContain("per cushion");
    expect(text).not.toMatch(PRICE_TOKEN);
    const source = walkFiles("src")
      .map((path) => readFileSync(path, "utf8"))
      .join("\n");
    for (const banned of ["$800", "per cushion", "$60 per", "pricing#instant-estimate", "?? 800"]) {
      expect(source, banned).not.toContain(banned);
    }
    const dollars = [...text.matchAll(/\$\d[\d,]*/g)].map((match) =>
      Number(match[0].replace(/[$,]/g, "")),
    );
    const allowed = new Set<number>([
      fixture.minimum,
      fixture.laborRate,
      ...fixture.loads.map((load) => load.price),
      ...fixture.specialty.map((item) => item.amount ?? -1),
      ...fixture.adjustments.map((adjustment) => adjustment.amountNumber ?? -1),
      ...fixture.discounts.map((discount) => discount.amountNumber ?? -1),
      100, // promo threshold Ben still needs to confirm
      1_000_000,
      2_000_000,
    ]);
    const unexpected = [...new Set(dollars.filter((amount) => !allowed.has(amount)))];
    expect(unexpected).toEqual([]);
  });

  it("keeps units on explicit items and does not fuzzy-match money", () => {
    expect(priceText("A standard spa is [[item:hot-tub-standard]].", SNAPSHOT_GUIDE)).toBe(
      "A standard spa is $500 flat rate.",
    );
    expect(priceText("[[item:washer-dryer]]", SNAPSHOT_GUIDE)).toBe("$100 each");
    expect(priceText("[[item:piano]]", SNAPSHOT_GUIDE)).toBe("starting at $375");
    expect(priceText("[[item:couch-small]]", SNAPSHOT_GUIDE)).toBe("$150");
    expect(priceText("[[item:couch-small]]", SNAPSHOT_GUIDE)).not.toContain("cushion");
    expect(
      priceText(
        "[[item:Couch]] [[item:Refrigerator (full size)]] [[item:not-listed]] [[load:99]]",
        SNAPSHOT_GUIDE,
      ),
    ).toBe(`${QUOTE_ONLY} ${QUOTE_ONLY} ${QUOTE_ONLY} ${QUOTE_ONLY}`);
    expect(Object.keys(ITEM_CATALOG)).toContain("fridge-full");
  });

  it("reads the travel fee from the guide", () => {
    expect(travelPhrase(SNAPSHOT_GUIDE)).toBe(
      "a $50 travel fee for jobs more than 30 miles from Parker",
    );
    expect(travelPhrase(fixture)).toBe(
      "a $50,077 travel fee for jobs more than 42 miles from Parker",
    );
    const without = structuredClone(SNAPSHOT_GUIDE);
    without.adjustments = without.adjustments.filter(
      (adjustment) => !/distance|travel/i.test(adjustment.label),
    );
    expect(travelPhrase(without)).toBe(QUOTE_ONLY);
  });
});

describe("one service area and one business", () => {
  it("publishes Monument from the same city list everywhere", () => {
    const content = locations.map((location) => ({
      slug: location.slug,
      city: location.city,
      county: location.county,
    }));
    expect(content).toEqual(
      SERVICE_AREAS.map((area) => ({ slug: area.slug, city: area.city, county: area.county })),
    );
    expect(navLocations.map((location) => location.slug)).toEqual(
      SERVICE_AREAS.map((area) => area.slug),
    );
    expect([...LIVE_CITIES]).toEqual(SERVICE_AREAS.map((area) => area.slug));
    expect(SERVICE_AREAS.map((area) => area.city)).toContain("Monument");
    const sitemap = readFileSync("public/sitemap.xml", "utf8");
    expect(sitemap).toContain("https://www.ezhaulawayllc.com/service-areas/monument");
    expect(buildLlmsText(SNAPSHOT_GUIDE)).toContain("/service-areas/monument");
    expect(buildLlmsText(SNAPSHOT_GUIDE)).toContain("/instant-estimate");
    expect(buildLlmsText(SNAPSHOT_GUIDE)).not.toContain("pricing#instant-estimate");
  });

  it("keeps a single business id and a single phone literal", () => {
    expect(BUSINESS_ID).toBe("https://www.ezhaulawayllc.com/#localbusiness");
    const files = walkFiles("src");
    const phoneFiles = files.filter((path) => readFileSync(path, "utf8").includes("720-614-7223"));
    expect(phoneFiles.map((path) => path.replaceAll("\\", "/"))).toEqual(["src/content/site.ts"]);
    expect(PHONE).toBe("720-614-7223");
  });
});
