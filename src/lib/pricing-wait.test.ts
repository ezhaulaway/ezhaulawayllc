import { afterEach, describe, expect, it, vi } from "vitest";
import { loadPriceGuide } from "./pricing.functions";

describe("loadPriceGuide", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("returns the snapshot when the live feed is slower than the page budget", async () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      "fetch",
      () =>
        new Promise<Response>((resolve) => {
          setTimeout(() => resolve(new Response("nope", { status: 500 })), 5_000);
        }),
    );
    const pending = loadPriceGuide(250);
    await vi.advanceTimersByTimeAsync(250);
    const guide = await pending;
    expect(guide.source).toBe("snapshot");
    expect(guide.live).toBe(false);
    await vi.advanceTimersByTimeAsync(5_000);
  });
});
