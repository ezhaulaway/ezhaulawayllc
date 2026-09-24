export const PHONE = "720-614-7223";
export const PHONE_TEL = PHONE.replaceAll("-", "");
export const SITE_URL = "https://www.ezhaulawayllc.com";
export const GOOGLE_REVIEWS_URL = "https://share.google/cf9FKoYXCi9K62j84";

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
