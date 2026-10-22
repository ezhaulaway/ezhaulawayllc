import { describe, it, expect } from "vitest";
import { liveUrlPaths, isLiveCityService } from "./live-pages";
import { readFileSync } from "node:fs";
describe("live pages", () => {
  it("has 92 URLs", () => expect(liveUrlPaths().length).toBe(92));
  it("has 51 city-service pages", () => expect(liveUrlPaths().filter((p) => p.split("/").length === 4).length).toBe(51));
  it("keeps custom-copy pages", () => {
    expect(isLiveCityService("parker", "shed-removal")).toBe(true);
    expect(isLiveCityService("castle-pines", "appliance-removal")).toBe(false);
    expect(isLiveCityService("sedalia", "furniture-removal")).toBe(false);
  });
  it("sitemap matches allow-list", () => {
    const locs = [...readFileSync("public/sitemap.xml", "utf8").matchAll(/<loc>https:\/\/www\.ezhaulawayllc\.com([^<]*)<\/loc>/g)].map((m) => m[1]);
    expect(locs).toEqual(liveUrlPaths());
  });
});
