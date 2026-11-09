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
  expect(r("https://www.ezhaulawayllc.com/service-areas/castle-rock")).toBe(null);
  expect(r("https://www.ezhaulawayllc.com/service-areas/monumental")).toBe(null);
});
test("retired Monument URLs 301 to the service area index", () => {
  expect(r("https://www.ezhaulawayllc.com/service-areas/monument")?.status).toBe(301);
  expect(loc("https://www.ezhaulawayllc.com/service-areas/monument")).toBe("/service-areas");
  expect(loc("https://www.ezhaulawayllc.com/service-areas/monument/")).toBe("/service-areas");
  expect(loc("https://www.ezhaulawayllc.com/service-areas/monument/furniture-removal")).toBe(
    "/service-areas",
  );
  expect(loc("https://www.ezhaulawayllc.com/service-areas/Monument/hot-tub-removal?src=g")).toBe(
    "/service-areas?src=g",
  );
  expect(loc("https://ezhaulawayllc.com/service-areas/monument/")).toBe(
    "https://www.ezhaulawayllc.com/service-areas",
  );
  expect(loc("http://ezhaulawayllc.com/service-areas/monument/garage-cleanouts/")).toBe(
    "https://www.ezhaulawayllc.com/service-areas",
  );
});
