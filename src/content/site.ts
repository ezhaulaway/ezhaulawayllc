export const PHONE = "720-614-7223";
export const PHONE_TEL = PHONE.replaceAll("-", "");
export const SITE_URL = "https://ezhaulawayllc.com";
export const GOOGLE_REVIEWS_URL = "https://share.google/cf9FKoYXCi9K62j84";
export const FACEBOOK_URL = "https://www.facebook.com/ezhaulawayjunkremoval/";

export const reviews = [
  {
    name: "Renee Thompson",
    text: "Ben and DJ were seriously AMAZING!! We just moved into our new home and the previous owner left behind way more stuff than we were expecting. Ben and DJ came in and handled literally EVERYTHING. They were so kind, professional, quick, and made what had been a really stressful situation so much easier for us.",
  },
  {
    name: "Martin Meza",
    text: "Punctual, fast and extremely friendly, great guy to do business with.",
  },
  {
    name: "Devin Hall",
    text: "The team at EZ Haulaway were courteous and skillful. They made the entire process smooth and hassle-free, and the results exceeded my expectations.",
  },
] as const;

export const processSteps = [
  ["01", "Tell Us What You Have", "Call, text, or send the quote form. Photos help us understand the job before we arrive."],
  ["02", "Get Your Quote", "We review the job, give you a straightforward price, and find a time that works for you."],
  ["03", "We Haul It Away", "Our crew does the lifting, loading, and hauling, then cleans up the space before we leave."],
] as const;

/** Complete LocalBusiness entity for JSON-LD (address + image required by validators). */
export const BUSINESS_SCHEMA = {
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: "EZ Haulaway LLC",
  url: `${SITE_URL}/`,
  telephone: "+1-720-614-7223",
  image: `${SITE_URL}/apple-touch-icon.png`,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  priceRange: "$150 - $800",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Parker",
    addressRegion: "CO",
    postalCode: "80134",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: 39.5242, longitude: -104.8064 },
  sameAs: [GOOGLE_REVIEWS_URL, FACEBOOK_URL],
};
