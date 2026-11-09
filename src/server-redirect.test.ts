import { readFileSync } from "node:fs";
import { isNotFound, isRedirect } from "@tanstack/react-router";
import { Route as cityRoute } from "./routes/service-areas.$city";
import server, { canonicalRedirect } from "./server";
import { test, expect } from "vitest";

const r = (u: string, headers?: HeadersInit) =>
  canonicalRedirect(new Request(u, headers ? { headers } : {}));
const loc = (u: string, headers?: HeadersInit) => r(u, headers)?.headers.get("location") ?? null;

test("trailing slash stripped, query kept", () => {
  expect(r("https://www.ezhaulawayllc.com/pricing/?a=1")?.status).toBe(301);
  expect(loc("https://www.ezhaulawayllc.com/pricing/?a=1")).toBe("/pricing?a=1");
});
test("apex goes to www", () => {
  expect(r("https://ezhaulawayllc.com/pricing?a=1")?.status).toBe(301);
  expect(loc("https://ezhaulawayllc.com/pricing?a=1")).toBe(
    "https://www.ezhaulawayllc.com/pricing?a=1",
  );
});
test("combined case is one hop", () => {
  expect(r("http://ezhaulawayllc.com/pricing/")?.status).toBe(301);
  expect(loc("http://ezhaulawayllc.com/pricing/")).toBe("https://www.ezhaulawayllc.com/pricing");
});
test("http www keeps path and query in one hop", () => {
  const url = "http://www.ezhaulawayllc.com/service-areas/parker?a=1&b=2";
  expect(r(url)?.status).toBe(301);
  expect(loc(url)).toBe("https://www.ezhaulawayllc.com/service-areas/parker?a=1&b=2");
});
test("http apex root and https apex root are one hop", () => {
  expect(loc("http://ezhaulawayllc.com/")).toBe("https://www.ezhaulawayllc.com/");
  expect(loc("https://ezhaulawayllc.com/")).toBe("https://www.ezhaulawayllc.com/");
  expect(loc("http://www.ezhaulawayllc.com/")).toBe("https://www.ezhaulawayllc.com/");
});
test("forwarded host and proto override the internal request URL", () => {
  const headers = { "x-forwarded-host": "ezhaulawayllc.com", "x-forwarded-proto": "http" };
  const url = "https://internal.lovable.app/pricing/?a=1";
  expect(r(url, headers)?.status).toBe(301);
  expect(loc(url, headers)).toBe("https://www.ezhaulawayllc.com/pricing?a=1");
});
test("forwarded proto http on the www host upgrades in one hop", () => {
  const headers = {
    "x-forwarded-host": "www.ezhaulawayllc.com",
    "x-forwarded-proto": "http, https",
  };
  expect(loc("https://www.ezhaulawayllc.com/faq?x=1", headers)).toBe(
    "https://www.ezhaulawayllc.com/faq?x=1",
  );
});
test("trusted https forwarded proto does not redirect an internal http URL", () => {
  const headers = { "x-forwarded-host": "www.ezhaulawayllc.com", "x-forwarded-proto": "https" };
  expect(r("http://www.ezhaulawayllc.com/pricing", headers)).toBe(null);
});
test("host header is used when x-forwarded-host is absent", () => {
  const headers = { host: "EZHaulawayLLC.com:80", "x-forwarded-proto": "https" };
  expect(loc("https://placeholder.invalid/contact?ref=chamber", headers)).toBe(
    "https://www.ezhaulawayllc.com/contact?ref=chamber",
  );
});
test("x-forwarded-host wins over the host header", () => {
  const headers = {
    host: "ezhaulawayllc.com",
    "x-forwarded-host": "www.ezhaulawayllc.com:443",
    "x-forwarded-proto": "https",
  };
  expect(r("https://placeholder.invalid/pricing", headers)).toBe(null);
});
test("trailing-dot www host is already canonical", () => {
  const headers = { "x-forwarded-host": "www.ezhaulawayllc.com.", "x-forwarded-proto": "https" };
  expect(r("https://placeholder.invalid/pricing", headers)).toBe(null);
});
test("HEAD redirects, POST to a non-canonical host is 308 and keeps the slash", () => {
  const head = canonicalRedirect(
    new Request("http://www.ezhaulawayllc.com/pricing/", { method: "HEAD" }),
  );
  expect(head?.status).toBe(301);
  expect(head?.headers.get("location")).toBe("https://www.ezhaulawayllc.com/pricing");

  const post = canonicalRedirect(
    new Request("http://ezhaulawayllc.com/pricing/?a=1", { method: "POST" }),
  );
  expect(post?.status).toBe(308);
  expect(post?.headers.get("location")).toBe("https://www.ezhaulawayllc.com/pricing/?a=1");
  expect(
    canonicalRedirect(new Request("https://www.ezhaulawayllc.com/pricing/", { method: "POST" })),
  ).toBe(null);
});
test("canonical and other hosts untouched", () => {
  expect(r("https://www.ezhaulawayllc.com/pricing")).toBe(null);
  expect(r("https://www.ezhaulawayllc.com/")).toBe(null);
  expect(r("https://www.ezhaulawayllc.com/sitemap.xml")).toBe(null);
  expect(r("https://ezhaulawayllc.lovable.app/pricing")).toBe(null);
  expect(r("http://ezhaulawayllc.lovable.app/pricing")).toBe(null);
  expect(r("https://x.ezhaulawayllc.com/pricing")).toBe(null);
});
test("a bad request URL does not throw", () => {
  const request = new Request("https://www.ezhaulawayllc.com/pricing");
  const broken = new Proxy(request, {
    get(target, prop, receiver) {
      if (prop === "url") return "http://";
      return Reflect.get(target, prop, receiver);
    },
  });
  expect(canonicalRedirect(broken)).toBe(null);
});
test("worker entry redirects http before SSR", async () => {
  const response = await server.fetch(
    new Request("http://ezhaulawayllc.com/pricing?a=1"),
    undefined,
    undefined,
  );
  expect(response.status).toBe(301);
  expect(response.headers.get("location")).toBe("https://www.ezhaulawayllc.com/pricing?a=1");
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
