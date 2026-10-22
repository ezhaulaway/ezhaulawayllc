import { canonicalRedirect } from "./server";
import { test, expect } from "vitest";
const r = (u: string) => canonicalRedirect(new Request(u));
const loc = (u: string) => r(u)?.headers.get("location") ?? null;
test("trailing slash stripped, query kept", () => {
  expect(r("https://www.ezhaulawayllc.com/pricing/?a=1")?.status).toBe(301);
  expect(loc("https://www.ezhaulawayllc.com/pricing/?a=1")).toBe("/pricing?a=1");
});
test("apex goes to www", () => {
  expect(loc("https://ezhaulawayllc.com/pricing?a=1")).toBe("https://www.ezhaulawayllc.com/pricing?a=1");
});
test("combined case is one hop", () => {
  expect(loc("http://ezhaulawayllc.com/pricing/")).toBe("https://www.ezhaulawayllc.com/pricing");
});
test("canonical and other hosts untouched", () => {
  expect(r("https://www.ezhaulawayllc.com/pricing")).toBe(null);
  expect(r("https://www.ezhaulawayllc.com/")).toBe(null);
  expect(r("https://www.ezhaulawayllc.com/sitemap.xml")).toBe(null);
  expect(r("https://ezhaulawayllc.lovable.app/pricing")).toBe(null);
  expect(r("https://x.ezhaulawayllc.com/pricing")).toBe(null);
});
