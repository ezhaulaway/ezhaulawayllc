import { freeTvComputerWording } from "@/lib/price-guide";

/**
 * Site-wide promotion banner. Flip `active` to false (or edit the text) to change
 * or hide the banner everywhere without touching any page.
 * The $100 TV/computer threshold is the approved policy in price-guide.ts.
 */
export const PROMO = {
  active: true,
  eyebrow: "Fall promo",
  text: freeTvComputerWording(),
  linkLabel: "Get an instant estimate",
} as const;
