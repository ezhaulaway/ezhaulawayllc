import { readFileSync, existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { articleHeadingHtml, BLOG_HEAD_OVERRIDES } from "@/content/blog-links";
import { BLOG_SLUG_REDIRECTS } from "@/content/redirects";
import { livePosts, scheduledPostForSlug } from "@/content/scheduled-posts";
import {
  isLiveCity,
  isLiveCityService,
  isLiveService,
  LIVE_CITIES,
  LIVE_CITY_SERVICES,
  LIVE_SERVICES,
} from "@/content/live-pages";
import { locationBySlug } from "@/content/locations";
import { serviceBySlug } from "@/content/services";
import { fillBlogPriceText } from "@/lib/blog-ez-prices";
import { SNAPSHOT_GUIDE } from "@/lib/price-guide";
import { Route as HomeRoute } from "@/routes/index";
import { Route as AboutRoute } from "@/routes/about";
import { Route as ContactRoute } from "@/routes/contact";
import { Route as FaqRoute } from "@/routes/faq";
import { Route as HowRoute } from "@/routes/how-it-works";
import { Route as EstimateRoute } from "@/routes/instant-estimate";
import { Route as PricingRoute } from "@/routes/pricing";
import { Route as PrivacyRoute } from "@/routes/privacy-policy";
import { Route as AreasRoute } from "@/routes/service-areas.index";
import { Route as WhatRoute } from "@/routes/what-we-take";
import { Route as BlogIndexRoute } from "@/routes/blog.index";
import { Route as BlogRoute } from "@/routes/blog.$slug";
import { Route as ServiceRoute } from "@/routes/services.$slug";
import { Route as CityRoute } from "@/routes/service-areas.$city";
import { Route as CityServiceRoute } from "@/routes/service-areas.$city_.$service";
import { customCityServices } from "@/content/custom-city-services";

type Meta = {
  path: string;
  title: string;
  description: string;
  ogTitle?: string | undefined;
  ogDescription?: string | undefined;
  twitterTitle?: string | undefined;
  twitterDescription?: string | undefined;
  scripts?: string[];
};

type HeadResult = {
  meta?: Array<{ title?: string; name?: string; property?: string; content?: string }>;
  scripts?: Array<{ children?: unknown }>;
};

function readMeta(path: string, head: HeadResult): Meta {
  const meta = head.meta ?? [];
  const title = meta.find((item) => typeof item.title === "string")?.title ?? "";
  const description = meta.find((item) => item.name === "description")?.content ?? "";
  return {
    path,
    title,
    description,
    ogTitle: meta.find((item) => item.property === "og:title")?.content,
    ogDescription: meta.find((item) => item.property === "og:description")?.content,
    twitterTitle: meta.find((item) => item.name === "twitter:title")?.content,
    twitterDescription: meta.find((item) => item.name === "twitter:description")?.content,
    scripts: (head.scripts ?? []).map((script) => String(script.children ?? "")),
  };
}

async function headOf(
  route: { options: { head?: unknown } },
  args: Record<string, unknown> = {},
): Promise<HeadResult> {
  const head = route.options.head;
  if (typeof head !== "function") return (head ?? {}) as HeadResult;
  return (await head(args)) as HeadResult;
}

function envValue(name: string): string | undefined {
  if (process.env[name]) return process.env[name];
  if (!existsSync(".env")) return undefined;
  const line = readFileSync(".env", "utf8")
    .split("\n")
    .find((row) => row.startsWith(`${name}=`));
  if (!line) return undefined;
  return line
    .slice(name.length + 1)
    .trim()
    .replace(/^"|"$/g, "");
}

async function blogRows(): Promise<
  Array<{ slug: string; title: string; meta_description: string | null }>
> {
  const url = envValue("SUPABASE_URL");
  const key = envValue("SUPABASE_PUBLISHABLE_KEY");
  if (!url || !key) return [];
  const response = await fetch(
    `${url.replace(/\/$/, "")}/rest/v1/blg_articles?select=slug,title,meta_description`,
    { headers: { apikey: key, Authorization: `Bearer ${key}` } },
  );
  if (!response.ok) throw new Error(`Blog list failed: ${response.status}`);
  return (await response.json()) as Array<{
    slug: string;
    title: string;
    meta_description: string | null;
  }>;
}

function blogMeta(
  slug: string,
  storedTitle: string,
  storedDescription: string | null,
): { title: string; description: string } {
  const override = BLOG_HEAD_OVERRIDES[slug];
  const title = override?.title ?? `${storedTitle} | EZ Haulaway Blog`;
  const description = fillBlogPriceText(
    override?.description ?? storedDescription ?? "",
    SNAPSHOT_GUIDE,
  );
  return { title, description };
}

function duplicates(pages: Meta[], field: "title" | "description"): string[] {
  const seen = new Map<string, string>();
  const problems: string[] = [];
  for (const page of pages) {
    const value = page[field].trim();
    if (!value) {
      problems.push(`${page.path} has an empty ${field}`);
      continue;
    }
    const previous = seen.get(value);
    if (previous) problems.push(`${field} shared by ${previous} and ${page.path}: ${value}`);
    else seen.set(value, page.path);
  }
  return problems;
}

const CHANGED = [
  "/blog/bed-frame-disposal",
  "/blog/deck-removal-cost",
  "/services/hot-tub-removal",
  "/service-areas/lone-tree",
  "/service-areas/highlands-ranch",
  "/service-areas/aurora",
  "/service-areas/castle-pines",
];

describe("indexable titles and descriptions", () => {
  it("keeps every live page's title and description unique, and the changed copy in range", async () => {
    const pages: Meta[] = [];
    for (const [path, route] of [
      ["/", HomeRoute],
      ["/about", AboutRoute],
      ["/contact", ContactRoute],
      ["/faq", FaqRoute],
      ["/how-it-works", HowRoute],
      ["/instant-estimate", EstimateRoute],
      ["/pricing", PricingRoute],
      ["/privacy-policy", PrivacyRoute],
      ["/service-areas", AreasRoute],
      ["/what-we-take", WhatRoute],
      ["/blog", BlogIndexRoute],
    ] as const) {
      pages.push(readMeta(path, await headOf(route, { loaderData: undefined })));
    }

    for (const slug of LIVE_SERVICES) {
      if (!isLiveService(slug)) continue;
      const service = serviceBySlug(slug);
      expect(service, slug).toBeTruthy();
      pages.push(
        readMeta(
          `/services/${slug}`,
          await headOf(ServiceRoute, { params: { slug }, loaderData: { service } }),
        ),
      );
    }

    for (const slug of LIVE_CITIES) {
      if (!isLiveCity(slug)) continue;
      const location = locationBySlug(slug);
      expect(location, slug).toBeTruthy();
      pages.push(
        readMeta(
          `/service-areas/${slug}`,
          await headOf(CityRoute, {
            params: { city: slug },
            loaderData: { location, specialtyServices: [] },
          }),
        ),
      );
    }

    for (const [city, services] of Object.entries(LIVE_CITY_SERVICES)) {
      for (const serviceSlug of services) {
        if (!isLiveCityService(city, serviceSlug)) continue;
        const location = locationBySlug(city);
        const service = serviceBySlug(serviceSlug);
        expect(location && service, `${city}/${serviceSlug}`).toBeTruthy();
        if (service?.cityPages === false) continue;
        pages.push(
          readMeta(
            `/service-areas/${city}/${serviceSlug}`,
            await headOf(CityServiceRoute, {
              params: { city, service: serviceSlug },
              loaderData: {
                location,
                service,
                custom: customCityServices[`${city}/${serviceSlug}`] ?? null,
              },
            }),
          ),
        );
      }
    }

    const rows = await blogRows();
    if (envValue("SUPABASE_URL") && envValue("SUPABASE_PUBLISHABLE_KEY")) {
      expect(rows.length, "blog articles").toBeGreaterThan(0);
    }
    const slugs = new Set<string>([
      "bed-frame-disposal",
      "deck-removal-cost",
      ...livePosts().map((post) => post.slug),
      ...rows.map((row) => row.slug),
    ]);
    const stored = new Map<string, { title: string; description: string | null }>([
      [
        "bed-frame-disposal",
        {
          title: "Bed Frame Disposal: Every Option, Cost and Prep Step",
          description:
            "Get rid of a metal, wood or sleeper sofa bed frame the right way: curbside rules, scrap, donation, drop-off and haul-away costs in the Denver area.",
        },
      ],
      [
        "deck-removal-cost",
        {
          title: "Deck Removal Cost in 2026: Prices, Factors and Hauling",
          description:
            "Deck removal usually costs $1,000 to $7,000+. See per-square-foot prices, what drives the total, Denver rules and how to price the haul-away.",
        },
      ],
    ]);
    for (const row of rows)
      stored.set(row.slug, { title: row.title, description: row.meta_description });
    const byPath = new Map<string, Meta>();
    for (const page of pages) byPath.set(page.path, page);
    for (const slug of slugs) {
      if (slug in BLOG_SLUG_REDIRECTS) continue;
      const scheduled = scheduledPostForSlug(slug);
      const row = stored.get(slug);
      const storedTitle = scheduled?.title ?? row?.title;
      const storedDescription = scheduled?.meta_description ?? row?.description ?? null;
      if (!storedTitle) continue;
      const meta = blogMeta(slug, storedTitle, storedDescription);
      byPath.set(`/blog/${slug}`, { path: `/blog/${slug}`, ...meta });
    }
    const uniquePages = [...byPath.values()];

    expect(duplicates(uniquePages, "title")).toEqual([]);
    expect(duplicates(uniquePages, "description")).toEqual([]);
    for (const path of CHANGED) {
      const page = byPath.get(path);
      expect(page, path).toBeTruthy();
      expect(page!.title.length, `${path} title`).toBeLessThanOrEqual(60);
      expect(page!.title.length, `${path} title`).toBeGreaterThan(0);
      expect(
        page!.description.length,
        `${path} description (${page!.description})`,
      ).toBeGreaterThanOrEqual(120);
      expect(
        page!.description.length,
        `${path} description (${page!.description})`,
      ).toBeLessThanOrEqual(155);
      expect(page!.description, path).not.toContain("[[");
      expect(page!.title, path).not.toContain("[[");
    }

    for (const path of [
      "/service-areas/lone-tree",
      "/service-areas/highlands-ranch",
      "/service-areas/aurora",
      "/service-areas/castle-pines",
    ]) {
      expect(byPath.get(path)!.description).toContain("from $120");
    }
    expect(byPath.get("/service-areas/lone-tree")!.description).not.toMatch(
      /same-day pickup available/i,
    );
    expect(byPath.get("/service-areas/lone-tree")!.description).toContain(
      "same-day when available",
    );
    expect(byPath.get("/services/hot-tub-removal")!.description).toContain("$500 flat rate");
    expect(byPath.get("/blog/bed-frame-disposal")!.description).toMatch(/curbside/i);
    expect(byPath.get("/blog/bed-frame-disposal")!.description).toMatch(/scrap/i);
    expect(byPath.get("/blog/bed-frame-disposal")!.description).toMatch(/donation/i);
    expect(byPath.get("/blog/bed-frame-disposal")!.description).toMatch(/drop-off/i);
    expect(byPath.get("/blog/bed-frame-disposal")!.description).toMatch(/haul-away/i);
    expect(byPath.get("/blog/deck-removal-cost")!.description).toContain("from $120");
    expect(byPath.get("/blog/deck-removal-cost")!.description).not.toMatch(
      /\$1,000|\$7,000|\$4 to \$15/,
    );
  });
});

function postFixture(slug: string, title: string) {
  return {
    id: 1,
    slug,
    previous_slugs: [],
    title,
    meta_description: "Stored description that the override replaces.",
    hero_image_url: null,
    content_html: `<h1>${title}</h1><p>Body</p>`,
    json_ld: null,
    faq_json_ld: null,
    language_code: "en",
    article_created_at: "2026-11-01T00:00:00+00:00",
    article_updated_at: "2026-11-01T00:00:00+00:00",
    synced_at: "2026-11-01T00:00:00+00:00",
    hero_image_alt: null,
    hero_image_width: null,
    hero_image_height: null,
    faqs: null,
  };
}

describe("changed page schema", () => {
  it("puts the new bed-frame and deck titles on the heading, the title tags, and the article schema", async () => {
    for (const [slug, storedTitle] of [
      ["bed-frame-disposal", "Bed Frame Disposal: Every Option, Cost and Prep Step"],
      ["deck-removal-cost", "Deck Removal Cost in 2026: Prices, Factors and Hauling"],
    ] as const) {
      const override = BLOG_HEAD_OVERRIDES[slug];
      expect(override?.syncHeading).toBe(true);
      const html = articleHeadingHtml(
        `<h1>${storedTitle}</h1><p>Keep this.</p>`,
        storedTitle,
        override!.title,
      );
      expect(html.startsWith(`<h1>${override!.title}</h1>`)).toBe(true);
      expect(html).toContain("<p>Keep this.</p>");

      const headFn = BlogRoute.options.head;
      if (typeof headFn !== "function") throw new Error("blog head is missing");
      const head = await headFn({
        loaderData: postFixture(slug, storedTitle),
      } as unknown as Parameters<typeof headFn>[0]);
      const meta = readMeta(`/blog/${slug}`, head as HeadResult);
      expect(meta.title).toBe(override!.title);
      expect(meta.ogTitle).toBe(override!.title);
      expect(meta.twitterTitle).toBe(override!.title);
      expect(meta.ogDescription).toBe(meta.description);
      expect(meta.twitterDescription).toBe(meta.description);
      const article = (meta.scripts ?? [])
        .map(
          (script) =>
            JSON.parse(script) as { "@type"?: string; headline?: string; description?: string },
        )
        .find((node) => node["@type"] === "BlogPosting");
      expect(article?.headline).toBe(override!.title);
      expect(article?.description).toBe(meta.description);
      const crumbs = (meta.scripts ?? [])
        .map(
          (script) =>
            JSON.parse(script) as { "@type"?: string; itemListElement?: Array<{ name?: string }> },
        )
        .find((node) => node["@type"] === "BreadcrumbList");
      expect(crumbs?.itemListElement?.at(-1)?.name).toBe(override!.title);
    }
  });

  it("leaves the furniture post heading on the stored title", async () => {
    const stored = "Furniture Disposal in Denver: Every Option, Cost and Rule";
    const html = articleHeadingHtml(`<h1>${stored}</h1>`, stored, stored);
    expect(html).toBe(`<h1>${stored}</h1>`);
    const headFn = BlogRoute.options.head;
    if (typeof headFn !== "function") throw new Error("blog head is missing");
    const head = await headFn({
      loaderData: postFixture("furniture-disposal-denver", stored),
    } as unknown as Parameters<typeof headFn>[0]);
    const meta = readMeta("/blog/furniture-disposal-denver", head as HeadResult);
    expect(meta.title).toBe(BLOG_HEAD_OVERRIDES["furniture-disposal-denver"]!.title);
    const article = (meta.scripts ?? [])
      .map((script) => JSON.parse(script) as { "@type"?: string; headline?: string })
      .find((node) => node["@type"] === "BlogPosting");
    expect(article?.headline).toBe(stored);
  });

  it("mirrors the hot tub and city descriptions in valid Service schema", async () => {
    const service = serviceBySlug("hot-tub-removal");
    const serviceHead = await headOf(ServiceRoute, {
      params: { slug: "hot-tub-removal" },
      loaderData: { service },
    });
    const serviceMeta = readMeta("/services/hot-tub-removal", serviceHead);
    const serviceSchema = (serviceMeta.scripts ?? [])
      .map(
        (script) =>
          JSON.parse(script) as { "@context"?: string; "@type"?: string; description?: string },
      )
      .find((node) => node["@type"] === "Service");
    expect(serviceSchema?.["@context"]).toBe("https://schema.org");
    expect(serviceSchema?.description).toBe(serviceMeta.description);

    for (const slug of ["lone-tree", "highlands-ranch", "aurora", "castle-pines"]) {
      const location = locationBySlug(slug);
      const head = await headOf(CityRoute, {
        params: { city: slug },
        loaderData: { location, specialtyServices: [] },
      });
      const meta = readMeta(`/service-areas/${slug}`, head);
      const graph = (meta.scripts ?? [])
        .map(
          (script) =>
            JSON.parse(script) as { "@graph"?: Array<{ "@type"?: string; description?: string }> },
        )
        .find((node) => Array.isArray(node["@graph"]));
      const node = graph?.["@graph"]?.find((item) => item["@type"] === "Service");
      expect(node?.description, slug).toBe(meta.description);
      expect(meta.ogDescription).toBe(meta.description);
      expect(meta.twitterDescription).toBe(meta.description);
      expect(meta.ogTitle).toBe(meta.title);
      expect(meta.twitterTitle).toBe(meta.title);
    }
  });
});
