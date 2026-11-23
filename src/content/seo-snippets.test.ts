import { describe, expect, it } from "vitest";
import { customCityServices } from "@/content/custom-city-services";
import { locationBySlug } from "@/content/locations";
import { cityHubTitle } from "@/content/local-seo";
import { serviceBySlug } from "@/content/services";
import { priceText, SNAPSHOT_GUIDE } from "@/lib/price-guide";
import { Route as CityRoute } from "@/routes/service-areas.$city";
import { Route as CityServiceRoute } from "@/routes/service-areas.$city_.$service";
import { Route as ServiceRoute } from "@/routes/services.$slug";
import { Route as WhatWeTakeRoute } from "@/routes/what-we-take";

function titleOf(head: {
  meta?: ReadonlyArray<{ title?: string | undefined } | undefined> | undefined;
}) {
  return head.meta?.find((item) => item?.title)?.title ?? "";
}

function descriptionOf(head: {
  meta?: ReadonlyArray<{ name?: string | undefined; content?: string | undefined } | undefined> | undefined;
}) {
  return head.meta?.find((item) => item?.name === "description")?.content ?? "";
}

describe("this week's search snippets", () => {
  it("keeps the Denver furniture snippet distinct from the general furniture page", async () => {
    const headFn = CityServiceRoute.options.head;
    const serviceHeadFn = ServiceRoute.options.head;
    if (typeof headFn !== "function" || typeof serviceHeadFn !== "function") {
      throw new Error("route head is missing");
    }
    const location = locationBySlug("denver");
    const service = serviceBySlug("furniture-removal");
    const custom = customCityServices["denver/furniture-removal"];
    if (!location || !service || !custom) throw new Error("denver furniture content is missing");

    const cityHead = await headFn({
      params: { city: "denver", service: "furniture-removal" },
      loaderData: { location, service, custom },
    } as Parameters<typeof headFn>[0]);
    const serviceHead = await serviceHeadFn({
      params: { slug: "furniture-removal" },
      loaderData: { service },
    } as Parameters<typeof serviceHeadFn>[0]);

    const cityTitle = titleOf(cityHead);
    const cityDescription = descriptionOf(cityHead);
    const serviceTitle = titleOf(serviceHead);
    const serviceDescription = descriptionOf(serviceHead);

    expect(cityTitle).toBe(
      priceText("Furniture Removal Denver | Sofa Haul from [[min]]", SNAPSHOT_GUIDE),
    );
    expect(cityTitle.length).toBeLessThanOrEqual(60);
    expect(cityTitle).toContain("Denver");
    expect(cityTitle).toContain("Sofa");
    expect(cityDescription.length).toBeLessThanOrEqual(155);
    expect(cityDescription).toContain("Denver");
    expect(cityDescription).toContain(priceText("[[min]]", SNAPSHOT_GUIDE));

    expect(serviceTitle).toBe("Furniture Removal Company | Sofa & Couch Haul");
    expect(serviceTitle.length).toBeLessThanOrEqual(60);
    expect(serviceTitle).not.toContain("Denver");
    expect(serviceDescription.length).toBeLessThanOrEqual(155);
    expect(serviceDescription).not.toContain("Denver");
    expect(serviceTitle).not.toBe(cityTitle);

    const faq = (cityHead.scripts ?? [])
      .map((script) => String(script?.children ?? ""))
      .map(
        (block) =>
          JSON.parse(block) as {
            "@type"?: string;
            mainEntity?: Array<{ name: string; acceptedAnswer: { text: string } }>;
          },
      )
      .find((block) => block["@type"] === "FAQPage");
    expect(faq?.mainEntity?.map((item) => item.name)).toEqual(
      custom.faqs.map(([question]) => question),
    );
    expect(faq?.mainEntity?.some((item) => item.name.includes("office furniture"))).toBe(true);
    expect(JSON.stringify(faq)).not.toContain("[[");
  });

  it("targets junk removal in Centennial and haul-away on what we take", async () => {
    const cityHeadFn = CityRoute.options.head;
    const takeHeadFn = WhatWeTakeRoute.options.head;
    if (typeof cityHeadFn !== "function" || typeof takeHeadFn !== "function") {
      throw new Error("route head is missing");
    }
    const location = locationBySlug("centennial");
    if (!location) throw new Error("centennial content is missing");
    const cityHead = await cityHeadFn({
      params: { city: "centennial" },
      loaderData: { location, specialtyServices: [] },
    } as unknown as Parameters<typeof cityHeadFn>[0]);
    const takeHead = await takeHeadFn({} as Parameters<typeof takeHeadFn>[0]);

    const cityTitle = titleOf(cityHead);
    expect(cityTitle).toBe(priceText(cityHubTitle("Centennial", "centennial"), SNAPSHOT_GUIDE));
    expect(cityTitle.startsWith("Junk Removal in Centennial, CO")).toBe(true);
    expect(cityTitle.length).toBeLessThanOrEqual(60);
    expect(descriptionOf(cityHead).length).toBeLessThanOrEqual(155);
    expect(descriptionOf(cityHead)).toContain("Centennial");

    const takeTitle = titleOf(takeHead);
    const takeDescription = descriptionOf(takeHead);
    expect(takeTitle).toBe("What We'll Haul Away | And What We Can't");
    expect(takeTitle.length).toBeLessThanOrEqual(60);
    expect(takeTitle.toLowerCase()).toContain("haul away");
    expect(takeDescription.toLowerCase()).toContain("haul away");
    expect(takeDescription.toLowerCase()).toContain("can't");
    expect(takeDescription.length).toBeLessThanOrEqual(155);
  });
});
