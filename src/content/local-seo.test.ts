import { describe, expect, it } from "vitest";
import { SERVICE_AREAS } from "@/content/service-areas";
import { cityHubTitle } from "@/content/local-seo";

describe("city hub titles", () => {
  it("stays within 60 characters and does not promise same-day pickup", () => {
    for (const area of SERVICE_AREAS) {
      const title = cityHubTitle(area.city, area.slug);
      expect(title.length, title).toBeLessThanOrEqual(60);
      expect(title, title).not.toMatch(/Same-Day Pickup/);
      expect(title).toContain(area.city);
    }
  });

  it("uses the Parker title and a shorter fallback for long city names", () => {
    expect(cityHubTitle("Parker", "parker")).toBe("Junk Removal in Parker, CO | Family-Owned Crew");
    expect(cityHubTitle("Castle Pines", "castle-pines")).toBe(
      "Junk Removal in Castle Pines, CO | Same-Day When Available",
    );
    expect(cityHubTitle("Highlands Ranch", "highlands-ranch")).toBe(
      "Junk Removal in Highlands Ranch, CO | Fast Scheduling",
    );
    expect(cityHubTitle("Lakewood", "lakewood")).toBe(
      "Junk Removal in Lakewood, CO | Same-Day When Available",
    );
  });
});
