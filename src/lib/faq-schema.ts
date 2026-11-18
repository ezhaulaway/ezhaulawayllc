import { priceText } from "@/lib/price-store";

/** FAQPage JSON-LD from the same question and answer text the page shows. */
export function faqPageJsonLd(faqs: ReadonlyArray<readonly [string, string]>, id: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": id,
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: priceText(question),
      acceptedAnswer: { "@type": "Answer", text: priceText(answer) },
    })),
  };
}
