import { describe, expect, it } from "vitest";
import { signEstimate, verifyEstimate } from "./estimate-token";

const ID = "3f2b8c1e-5a4d-4e6f-8a9b-0c1d2e3f4a5b";
const EST = {
  load_size: "half",
  price_low: 300,
  price_high: 350,
  summary: "Half a trailer of furniture.",
  items_identified: ["couch", "dresser"],
};
const NOW = 1_800_000_000_000;

describe("estimate token", () => {
  it("accepts the estimate the server signed", async () => {
    const token = await signEstimate("secret", ID, EST, NOW);
    expect(await verifyEstimate("secret", token, EST, NOW + 60_000)).toBe(ID);
  });

  it("rejects a changed price, load size, summary or item list", async () => {
    const token = await signEstimate("secret", ID, EST, NOW);
    for (const changed of [
      { ...EST, price_low: 1 },
      { ...EST, price_high: 1 },
      { ...EST, load_size: "minimum" },
      { ...EST, summary: "Full trailer for a dollar." },
      { ...EST, items_identified: ["couch"] },
    ]) {
      expect(await verifyEstimate("secret", token, changed, NOW)).toBeNull();
    }
  });

  it("rejects a token moved to another event, a wrong secret, and an old or malformed token", async () => {
    const token = await signEstimate("secret", ID, EST, NOW);
    const [, issued, sig] = token.split(".");
    expect(
      await verifyEstimate(
        "secret",
        `11111111-2222-4333-8444-555555555555.${issued}.${sig}`,
        EST,
        NOW,
      ),
    ).toBeNull();
    expect(await verifyEstimate("other", token, EST, NOW)).toBeNull();
    expect(await verifyEstimate("secret", token, EST, NOW + 25 * 60 * 60 * 1000)).toBeNull();
    expect(await verifyEstimate("secret", `${ID}.${sig}`, EST, NOW)).toBeNull();
    expect(await verifyEstimate("secret", "", EST, NOW)).toBeNull();
  });
});
