import { priced } from "@/lib/price-store";
import { SERVICE_AREAS, SERVICE_AREA_CITIES as AREA_CITIES } from "@/content/service-areas";

export const BUSINESS_NAME = "EZ Haulaway LLC";
export const PHONE = "720-614-7223";
export const PHONE_TEL = PHONE.replaceAll("-", "");
export const PHONE_E164 = `+1-${PHONE}`;
export const PHONE_DISPLAY = `(${PHONE.slice(0, 3)}) ${PHONE.slice(4)}`;
export const SITE_URL = "https://www.ezhaulawayllc.com";
export const GOOGLE_REVIEWS_URL = "https://share.google/cf9FKoYXCi9K62j84";
export const FACEBOOK_URL = "https://www.facebook.com/ezhaulawayjunkremoval/";
export const HOURS_TEXT = "Mon–Sat 7:00 AM – 7:00 PM · Sun Closed";
export const OPENING_HOURS_SPEC = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "07:00",
    closes: "19:00",
  },
];

/** City names from the single service-area list. */
export const SERVICE_AREA_CITIES = AREA_CITIES;

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

/** One LocalBusiness identity. City pages cite this @id and add a city Service, rather than a second business. No street address. */
const raw_BUSINESS_SCHEMA = {
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: BUSINESS_NAME,
  url: `${SITE_URL}/`,
  telephone: PHONE_E164,
  image: `${SITE_URL}/apple-touch-icon.png`,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  priceRange: "[[min]] - [[load:8]]",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Parker",
    addressRegion: "CO",
    postalCode: "80134",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: 39.5242, longitude: -104.8064 },
  openingHoursSpecification: OPENING_HOURS_SPEC,
  areaServed: SERVICE_AREAS.map((area) => ({ "@type": "City", name: `${area.city}, CO` })),
  sameAs: [GOOGLE_REVIEWS_URL, FACEBOOK_URL],
};
export const BUSINESS_SCHEMA = priced(raw_BUSINESS_SCHEMA);
export const BUSINESS_ID = `${SITE_URL}/#localbusiness`;
