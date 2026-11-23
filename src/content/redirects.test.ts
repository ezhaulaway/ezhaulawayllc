import { describe, expect, it } from "vitest";
import { isLiveCityService, isLiveService, liveUrlPaths } from "./live-pages";
import {
  BLOG_SLUG_REDIRECTS,
  retiredCityServicePath,
  retiredServicePath,
  SERVICE_SLUG_REDIRECTS,
} from "./redirects";

describe("retired URL redirects", () => {
  it("sends each merged service to one live page", () => {
    expect(retiredServicePath("deck-and-fence-removal")).toBe("/services/deck-removal");
    expect(retiredServicePath("realtor-and-attorney-cleanouts")).toBe(
      "/services/house-and-estate-cleanouts",
    );
    expect(retiredServicePath("basement-and-attic-cleanouts")).toBe(
      "/services/house-and-estate-cleanouts",
    );
    expect(retiredServicePath("eviction-cleanout-and-trash-out")).toBe(
      "/services/rental-cleanout-and-make-ready",
    );
    expect(retiredServicePath("apartment-make-ready-haul-off")).toBe(
      "/services/rental-cleanout-and-make-ready",
    );
    for (const next of Object.values(SERVICE_SLUG_REDIRECTS)) {
      expect(isLiveService(next), next).toBe(true);
      expect(liveUrlPaths()).toContain(`/services/${next}`);
    }
    for (const old of Object.keys(SERVICE_SLUG_REDIRECTS)) {
      expect(isLiveService(old), old).toBe(false);
      expect(liveUrlPaths()).not.toContain(`/services/${old}`);
    }
  });

  it("keeps Aurora's deck page and sends other old deck URLs to the main deck page", () => {
    expect(retiredCityServicePath("aurora", "deck-and-fence-removal")).toBe(
      "/service-areas/aurora/deck-removal",
    );
    expect(isLiveCityService("aurora", "deck-removal")).toBe(true);
    expect(retiredCityServicePath("parker", "deck-and-fence-removal")).toBe(
      "/services/deck-removal",
    );
    expect(retiredCityServicePath("denver", "eviction-cleanout-and-trash-out")).toBe(
      "/services/rental-cleanout-and-make-ready",
    );
  });

  it("folds the thin Parker yard-waste post into the main cost guide", () => {
    expect(BLOG_SLUG_REDIRECTS["yard-waste-brush-removal-cost-parker"]).toBe(
      "yard-waste-removal-cost",
    );
  });
});
