import { describe, expect, it } from "vitest";
import { prioritizeCriticalResources } from "./critical-html";

describe("prioritizeCriticalResources", () => {
  it("removes modulepreloads and lowers the hydration script without changing text", () => {
    const html =
      '<head><link rel="modulepreload" href="/assets/index-abc.js"/><link rel="stylesheet" href="/assets/styles.css"/><link rel="preload" as="font" href="/assets/dm-sans.woff2"/></head>' +
      "<body><p>Family-owned junk removal in Parker.</p>" +
      '<script type="module" async="" src="/assets/index-abc.js"></script></body>';
    const next = prioritizeCriticalResources(html);
    expect(next).not.toContain("modulepreload");
    expect(next).toContain('rel="stylesheet"');
    expect(next).toContain('rel="preload" as="font"');
    expect(next).toContain(
      '<script fetchpriority="low" type="module" async="" src="/assets/index-abc.js">',
    );
    expect(next).toContain("Family-owned junk removal in Parker.");
  });

  it("leaves a script that already has a fetch priority alone", () => {
    const html = '<script fetchpriority="high" src="/assets/index-abc.js"></script>';
    expect(prioritizeCriticalResources(html)).toBe(html);
  });
});
