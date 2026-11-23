import { describe, expect, it } from "vitest";
import { allowVisitor, visitorKey } from "./abuse-guard.server";

describe("abuse guard", () => {
  it("allows up to the limit, blocks after it, and recovers when the window passes", () => {
    const key = `t:${Math.random()}`;
    for (let i = 0; i < 3; i += 1) expect(allowVisitor(key, 3, 1000, 10_000 + i)).toBe(true);
    expect(allowVisitor(key, 3, 1000, 10_500)).toBe(false);
    expect(allowVisitor(`${key}:other`, 3, 1000, 10_500)).toBe(true);
    expect(allowVisitor(key, 3, 1000, 11_100)).toBe(true);
  });

  it("reads the visitor address from the proxy headers", () => {
    expect(
      visitorKey(
        new Request("https://x.test/", { headers: { "cf-connecting-ip": "203.0.113.9" } }),
      ),
    ).toBe("203.0.113.9");
    expect(
      visitorKey(
        new Request("https://x.test/", {
          headers: { "x-forwarded-for": "198.51.100.7, 10.0.0.1" },
        }),
      ),
    ).toBe("198.51.100.7");
    expect(visitorKey(undefined)).toBe("unknown");
  });
});
