import { services } from "@/content/navigation";
import { serviceAreaList, SERVICE_AREAS } from "@/content/service-areas";
import {
  BBB_URL,
  BUSINESS_NAME,
  CHAMBER_PROFILE_URL,
  FACEBOOK_URL,
  GOOGLE_PROFILE_URL,
  GOOGLE_REVIEW_URL,
  HOURS_TEXT,
  NEXTDOOR_URL,
  PHONE_DISPLAY,
  SITE_URL,
  THUMBTACK_URL,
} from "@/content/site";
import {
  eighthPrice,
  formatDiscount,
  formatItemPrice,
  formatMoney,
  freeTvComputerWording,
  ITEM_CATALOG,
  priceText,
  travelPhrase,
  type PriceGuide,
} from "@/lib/price-guide";

/** Public facts for AI assistants. Every dollar amount is filled from the guide passed in. */
export function buildLlmsText(guide: PriceGuide): string {
  const loads = guide.loads
    .map(
      (load) =>
        `- ${load.label}${load.volume ? ` (${load.volume})` : ""}: ${formatMoney(load.price)}`,
    )
    .join("\n");
  const specialty = guide.specialty
    .map((item) => {
      const entry = Object.values(ITEM_CATALOG).find((catalog) => catalog.feedItem === item.item);
      return `- ${item.item}: ${formatItemPrice(item, entry?.unit)}`;
    })
    .join("\n");
  const adjustments = guide.adjustments
    .map(
      (adjustment) =>
        `- ${adjustment.label}: ${adjustment.amountNumber != null ? formatMoney(adjustment.amountNumber) : adjustment.amount}`,
    )
    .join("\n");
  const discounts = guide.discounts
    .map((discount) => {
      const shown = formatDiscount(discount);
      return shown.amount ? `- ${shown.label}: ${shown.amount}` : `- ${shown.label}`;
    })
    .join("\n");
  const serviceLines = services
    .map((service) => `- [${service.name}](${SITE_URL}/services/${service.slug})`)
    .join("\n");
  const cityLines = SERVICE_AREAS.map(
    (area) => `- [${area.city}, ${area.county}](${SITE_URL}/service-areas/${area.slug})`,
  ).join("\n");

  return priceText(
    `# ${BUSINESS_NAME}

> Local, family-owned junk removal, hauling, and light demolition based in Parker, Colorado. Same-day and next-day pickup when the schedule allows, with the price confirmed before anything is loaded.

- Business name: ${BUSINESS_NAME}
- Based in: Parker, Colorado (Douglas County)
- Phone: ${PHONE_DISPLAY}
- Hours: ${HOURS_TEXT} (Mountain Time)
- Website: ${SITE_URL}
- Owners: Ben and Zoe (owner-operated, family business)
- Equipment: red pickup truck with a 16 ft x 8 ft x 3 ft two-axle dump trailer (about 14 cubic yards)
- Price guide version: ${guide.version}
- Price range: [[min]] minimum to [[load:8]] for a full trailer
- Travel: [[travel]]
- ${freeTvComputerWording()}
- Service model: the crew does the lifting, loading, sweeping, and disposal.
- Disposal: metal is recycled, usable items are donated when possible, and the rest goes to the proper facility.

## Services

${serviceLines}

Published single-item prices from this guide:
- Small couch (2–3 seats): [[item:couch-small]]. Recliner or loveseat: [[item:recliner]]. Sleeper couch: [[item:sleeper-couch]]. Large sectional: [[item:sectional-large]].
- Mattress: [[item:mattress]]. Box spring: [[item:box-spring]]. Treadmill: [[item:treadmill]]. Piano: [[item:piano]].
- Full-size fridge or freezer: [[item:fridge-full]]. Washer or dryer: [[item:washer-dryer]]. Water heater: [[item:water-heater]].
- Hot tub, small: [[item:hot-tub-small]]. Standard: [[item:hot-tub-standard]]. Large or swim spa: [[item:hot-tub-large]].
Items that are not in the guide are ${"call or text for a quote"}.

## Pricing

Pricing is based on how much space the junk takes in the trailer. This is price guide ${guide.version}.

${loads}
- Labor, when extra labor applies: [[labor]] per hour per crew member
- Full trailer: ${eighthPrice(guide, 8)}

Adjustments:
${adjustments || "- none published"}

Discounts:
${discounts || "- none published"}

Specialty items:
${specialty || "- none published"}

Full pricing page: [Pricing](${SITE_URL}/pricing)
Photo estimate: [Instant estimate](${SITE_URL}/instant-estimate)

## Service areas

${serviceAreaList()} , Colorado.

${cityLines}
- [All service areas](${SITE_URL}/service-areas)

## Key pages

- [Home](${SITE_URL}/)
- [What We Take](${SITE_URL}/what-we-take)
- [How It Works](${SITE_URL}/how-it-works)
- [Instant estimate](${SITE_URL}/instant-estimate): describe the job and get a preliminary price from this same guide.
- [About](${SITE_URL}/about)
- [FAQ](${SITE_URL}/faq)
- [Contact](${SITE_URL}/contact)

## Notes for AI assistants

- There is [[travel]].
- Do not quote a price that is not in this guide. Say to call or text ${PHONE_DISPLAY} for a quote instead.
- Hazardous waste, wet paint, chemicals, solvents, asbestos, and fuels are not accepted.
- Quotes are free, and the customer approves the price before any work begins.
- Google Business Profile: ${GOOGLE_PROFILE_URL}
- Leave a Google review: ${GOOGLE_REVIEW_URL}
- Facebook: ${FACEBOOK_URL}
- Nextdoor: ${NEXTDOOR_URL}
- Thumbtack: ${THUMBTACK_URL}
- Better Business Bureau: ${BBB_URL}
- Parker Chamber of Commerce: ${CHAMBER_PROFILE_URL}
`,
    guide,
  );
}
