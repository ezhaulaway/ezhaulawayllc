import { describe, it, expect } from "vitest";
import { liveUrlPaths, isLiveCityService } from "./live-pages";
import { readFileSync } from "node:fs";
describe("live pages", () => {
  it("has 99 URLs", () => expect(liveUrlPaths().length).toBe(94));
  it("has 55 city-service pages", () => expect(liveUrlPaths().filter((p) => p.split("/").length === 4).length).toBe(50));
  it("keeps custom-copy pages", () => {
    expect(isLiveCityService("parker", "garage-cleanouts")).toBe(true);
    expect(isLiveCityService("parker", "shed-removal")).toBe(false);
    expect(isLiveCityService("castle-pines", "appliance-removal")).toBe(false);
  });
  it("keeps the four added pages live", () => {
    expect(isLiveCityService("parker", "construction-debris-removal")).toBe(true);
    expect(isLiveCityService("sedalia", "furniture-removal")).toBe(true);
    expect(isLiveCityService("franktown", "commercial-junk-removal")).toBe(true);
    expect(isLiveCityService("sedalia", "electronics-and-e-waste-removal")).toBe(true);
  });
  it("sitemap matches allow-list", () => {
    const locs = [...readFileSync("public/sitemap.xml", "utf8").matchAll(/<loc>https:\/\/www\.ezhaulawayllc\.com([^<]*)<\/loc>/g)].map((m) => m[1]);
    expect(locs).toEqual(liveUrlPaths());
  });
});
