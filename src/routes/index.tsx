import { priceText } from "@/lib/price-store";
import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home-page";
import { homeFaqs } from "@/content/home-faqs";
import { BUSINESS_JSONLD, OPENING_HOURS_SPEC, PHONE_E164, SERVICE_AREA_CITIES, SITE_URL } from "@/content/site";
import { getGoogleReviews } from "@/lib/google-reviews.functions";
import { heroPreload } from "@/lib/home-images";
import heroJob1200 from "@/assets/hero-job-1200.webp";

const BASELINE_RATING = { rating: 5, count: 5 };

const title = "Parker CO Junk Removal | Family-Owned | Free Photo Quote";
const descriptionTemplate =
  "Family-owned junk removal in Parker, CO from [[min]]. Same-day and next-day appointments often available. Free photo quotes. EZ in, junk out.";

export const Route = createFileRoute("/")({
  loader: async () => {
    // Short cap so the first page response is never held up by the reviews lookup.
    try {
      const data = await Promise.race([
        getGoogleReviews(),
        new Promise<null>((resolve) => setTimeout(() => resolve(null), 250)),
      ]);
      if (data?.rating && data.totalCount) return { rating: data.rating, count: data.totalCount };
    } catch {
      /* fall back */
    }
    return BASELINE_RATING;
  },
  staleTime: 60 * 60 * 1000,
  head: ({ loaderData }) => {
    const description = priceText(descriptionTemplate);
    return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { name: "twitter:title", content: title },
      { property: "og:description", content: description },
      { name: "twitter:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/` },
      heroPreload(heroJob1200, "(min-width: 1280px) 617px, (min-width: 1024px) calc(52.5vw - 55px), calc(100vw - 40px)"),
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${SITE_URL}/#faq`,
          mainEntity: homeFaqs.map(([question, answer]) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: priceText(answer) },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: priceText(JSON.stringify({
          "@context": "https://schema.org",
          "@type": "JunkRemovalService",
          ...BUSINESS_JSONLD,
          description:
            "Local, family-owned junk removal, hauling services, and light demolition serving Parker and the Denver metro area. Trailer load pricing from [[min]] with full cleanup included.",
          url: SITE_URL,
          telephone: PHONE_E164,
          priceRange: "[[min]] - [[load:8]]",
          openingHoursSpecification: OPENING_HOURS_SPEC,
          areaServed: [
            ...SERVICE_AREA_CITIES.map((city) => ({ "@type": "City", name: `${city}, CO` })),
            { "@type": "AdministrativeArea", name: "Douglas County, CO" },
            { "@type": "AdministrativeArea", name: "Arapahoe County, CO" },
          ],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Parker",
            addressRegion: "CO",
            addressCountry: "US",
          },
          makesOffer: {
            "@type": "AggregateOffer",
            priceCurrency: "USD",
            lowPrice: "[[min]]",
            highPrice: "[[load:8]]",
            itemOffered: { "@type": "Service", name: "Junk Removal & Hauling Services" },
          },
        })).replace(/"(low|high)Price":"\$([\d,]+)"/g, (_m, k, n) => `"${k}Price":"${n.replace(/,/g, "")}"`),
      },
      {
        type: "application/ld+json",
        children: priceText(JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": `${SITE_URL}/#localbusiness`,
          ...BUSINESS_JSONLD,
          url: SITE_URL,
          telephone: PHONE_E164,
          priceRange: "[[min]] - [[load:8]]",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Parker",
            addressRegion: "CO",
            addressCountry: "US",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 39.5242,
            longitude: -104.8064,
          },
          openingHoursSpecification: OPENING_HOURS_SPEC,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: (loaderData ?? BASELINE_RATING).rating.toFixed(1),
            reviewCount: (loaderData ?? BASELINE_RATING).count,
            bestRating: "5",
            worstRating: "1",
          },
        })),
      },
    ],
  };
  },
  component: HomePage,
});