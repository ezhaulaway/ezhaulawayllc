import { describe, it, expect } from "vitest";
import { liveUrlPaths, isLiveCityService } from "./live-pages";
import { readFileSync } from "node:fs";
describe("live pages", () => {
  it("lists every live URL", () => expect(liveUrlPaths().length).toBe(96));
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
  it("publishes Kiowa as a city page with no city-service URLs", () => {
    expect(liveUrlPaths()).toContain("/service-areas/kiowa");
    expect(liveUrlPaths().some((path) => path.startsWith("/service-areas/kiowa/"))).toBe(false);
    expect(isLiveCityService("kiowa", "furniture-removal")).toBe(false);
  });
  it("sitemap matches allow-list and has no Monument URL", () => {
    const xml = readFileSync("public/sitemap.xml", "utf8");
    const locs = [...xml.matchAll(/<loc>https:\/\/www\.ezhaulawayllc\.com([^<]*)<\/loc>/g)].map((m) => m[1]);
    expect(locs).toEqual(liveUrlPaths());
    expect(xml.toLowerCase()).not.toContain("monument");
    expect(liveUrlPaths().some((path) => path.toLowerCase().includes("monument"))).toBe(false);
  });
});
