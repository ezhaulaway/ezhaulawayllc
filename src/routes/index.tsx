import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home-page";
import { GOOGLE_REVIEWS_URL, SITE_URL } from "@/content/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Junk Removal Parker CO | EZ Haulaway LLC" },
      {
        name: "description",
        content:
          "Junk removal in Parker, CO and the Denver metro area. Furniture, appliances, hot tubs, cleanouts and light demolition. Free quotes from EZ Haulaway LLC.",
      },
      { property: "og:title", content: "Junk Removal Parker | EZ Haulaway" },
      {
        property: "og:description",
        content:
          "Fast, reliable junk removal throughout the Denver metro area from a local, family-owned business.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "JunkRemovalService",
          name: "EZ Haulaway LLC",
          description:
            "Local, family-owned junk removal and light demolition serving Parker and the Denver metro area. Trailer load pricing from $150 with full cleanup included.",
          url: SITE_URL,
          telephone: "+1-720-614-7223",
          priceRange: "$150 - $800",
          areaServed: [
            { "@type": "City", name: "Parker, CO" },
            { "@type": "AdministrativeArea", name: "Douglas County, CO" },
            { "@type": "AdministrativeArea", name: "Arapahoe County, CO" },
            { "@type": "City", name: "Denver, CO" },
            { "@type": "City", name: "Castle Rock, CO" },
            { "@type": "City", name: "Centennial, CO" },
            { "@type": "City", name: "Highlands Ranch, CO" },
          ],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Parker",
            addressRegion: "CO",
            addressCountry: "US",
          },
          sameAs: [GOOGLE_REVIEWS_URL],
          makesOffer: [
            {
              "@type": "Offer",
              priceCurrency: "USD",
              priceSpecification: {
                "@type": "PriceSpecification",
                price: "150",
                minPrice: "150",
                maxPrice: "850",
              },
              itemOffered: { "@type": "Service", name: "Junk Removal" },
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": `${SITE_URL}/#localbusiness`,
          name: "EZ Haulaway LLC",
          url: SITE_URL,
          telephone: "+1-720-614-7223",
          priceRange: "$150 - $800",
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
          sameAs: [GOOGLE_REVIEWS_URL],
        }),
      },
    ],
  }),
  component: HomePage,
});