import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Junk Removal in Parker, CO | EZ Haulaway LLC" },
      {
        name: "description",
        content:
          "Professional junk removal and light demolition in Parker and the Denver metro area. Get a free quote from EZ Haulaway LLC.",
      },
      { property: "og:title", content: "Junk Removal Parker | EZ Haulaway" },
      {
        property: "og:description",
        content:
          "Fast, reliable junk removal throughout the Denver metro area from a local, family-owned business.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});