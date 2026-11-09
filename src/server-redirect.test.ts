import { readFileSync } from "node:fs";
import { isNotFound, isRedirect } from "@tanstack/react-router";
import { Route as cityRoute } from "./routes/service-areas.$city";
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
test("Monument city page returns 200 and is in the sitemap", async () => {
  const sitemap = readFileSync("public/sitemap.xml", "utf8");
  expect(sitemap).toContain("https://www.ezhaulawayllc.com/service-areas/monument");
  const request = new Request("https://www.ezhaulawayllc.com/service-areas/monument");
  expect(canonicalRedirect(request)).toBe(null);
  const loader = cityRoute.options.loader;
  if (typeof loader !== "function") throw new Error("Monument city loader is missing");
  let status = 200;
  try {
    const data = await loader({ params: { city: "monument" } } as Parameters<typeof loader>[0]);
    expect(data.location.city).toBe("Monument");
  } catch (error) {
    status = isRedirect(error) ? error.status : isNotFound(error) ? 404 : 500;
  }
  expect(status).toBe(200);
});
