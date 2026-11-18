import realBasementStaged1000 from "@/assets/real-basement-staged-1000.webp";
import type { Service } from "./services";

/**
 * One page for landlords and property managers. Facts from the previous eviction
 * and make-ready pages: same-day and next-day scheduling, before-and-after photos,
 * company invoicing, managers added to the certificate of insurance, sweep and
 * blow-off, volume or locked-in rates for guaranteed work.
 */
export const rentalCleanout: Service = {
  slug: "rental-cleanout-and-make-ready",
  name: "Rental Cleanout & Make-Ready",
  h1: "Rental Cleanouts, Trash-Outs & Make-Ready Haul-Off",
  metaTitle: "Rental Cleanout & Make-Ready Haul-Off | EZ Haulaway",
  metaDescription:
    "Eviction cleanouts, trash-outs, and make-ready haul-off for landlords and property managers in Parker and the Denver metro. Photos and invoicing.",
  cityPages: false,
  summary: "Eviction cleanouts, trash-outs, and the haul-off step of a unit turn.",
  image: realBasementStaged1000,
  imageAlt: "Crew member clearing furniture and boxes from a Parker basement",
  intro: [
    "A vacant rental is not ready for the next tenant while it is still full of furniture, mattresses, and bags of trash. EZ Haulaway is the haul-out for landlords and property managers in Parker, Castle Rock, Aurora, Denver, and the south metro.",
    "The same crew does eviction cleanouts, foreclosure and abandoned-unit trash-outs, and the clear-out at the start of a make-ready. You get a price before we load, before and after photos, and an invoice to your company.",
  ],
  includes: [
    "Furniture, mattresses, and box springs left behind",
    "Clothing, boxes, bags of trash, and household goods",
    "Appliances, TVs, and electronics",
    "Garage, patio, balcony, and storage leftovers",
    "Apartments, condos, townhomes, and houses",
    "Sweep and blow-off after every load",
  ],
  sections: [
    {
      heading: "Eviction cleanouts and trash-outs",
      text: "An eviction cleanout is the haul-out after the property is back in your hands. A trash-out is the same kind of work on a foreclosure, an abandoned unit, or any place that was left full. We remove what is inside, load it, take it to the proper facility, and sweep.\n\nWhat happens to a former tenant's belongings is your decision under the lease and Colorado law. We do not give legal advice. We need a text or email from the owner or manager saying the unit is clear to empty before we take anything.",
    },
    {
      heading: "Where haul-off fits in a make-ready",
      text: "A make-ready, unit turn, or turnover is the work between residents: clear the unit, clean it, patch and paint, and fix what is broken. We are the first step. Cleaners and painters cannot start while the unit is full.\n\nWe do not clean, paint, replace flooring, change locks, or do repairs. If you already have those vendors, we clear the unit ahead of them. No roll-off sitting in the lot, and no maintenance staff making dump runs.",
    },
    {
      heading: "What we need before we start",
      text: "Three things, and none of them take long.\n\n**1. The place.** Address, unit number, and a rough idea of what is inside. Photos or a short video help.\n\n**2. A way in.** A key, a lockbox, a door code, or a manager who can meet the crew.\n\n**3. A go-ahead.** Confirmation from the owner or manager that the property can be emptied.",
    },
    {
      heading: "Same-day and next-day scheduling",
      text: "The next resident, the cleaner, and the painter are all waiting on an empty unit. Same-day and next-day slots are how we book this work. A 48-hour wait is rare. Tell us the deadline when you call and we will say honestly whether we can meet it. If we cannot, we say so right away.",
    },
    {
      heading: "Several units",
      text: "If more than one unit is turning, send the list and the dates. We will tell you what fits and clear them in the order your other vendors need. This is the repeat work the page is for. A single condo and a stack of units are the same crew.",
    },
    {
      heading: "Photos, invoicing, and insurance",
      text: "We take before and after photos on every job so you have a record of how the unit looked and how we left it. We can invoice your company. Property managers can be added to our certificate of insurance when a building or owner requires it. We carry **$1,000,000 general liability insurance**. If you have steady turnovers, ask about volume discounts or locked-in rates for guaranteed jobs.",
      links: [{ slug: "house-and-estate-cleanouts", label: "House and estate cleanouts for listings and heirs" }],
    },
    {
      heading: "What it costs",
      text: "Pricing follows trailer space, not the clock. Our minimum is [[min]], a half trailer is about [[load:4]], and a full trailer is about [[load:8]]. A unit with a few pieces and some bags is often a small load. A packed house can take more than one load, and we quote the whole job up front. Send photos for a preliminary number.",
    },
    {
      heading: "What we do not take",
      text: "Paint, solvents, chemicals, fuel, and propane stay out of the trailer. Those need a household hazardous waste facility. We do not do biohazard cleanup, and we do not haul needles or sewage. If a unit is that kind of job, we will tell you it needs a licensed crew and we will not guess our way through it.\n\nUsable furniture can be set aside for donation when a partner will take it. Metal and appliances go to recycling when a yard will take them.",
    },
  ],
  faqs: [
    ["What is the difference between an eviction cleanout, a trash-out, and a make-ready haul-off?", "An eviction cleanout is after an eviction. A trash-out is the same haul-out on a foreclosure or an abandoned unit. A make-ready haul-off is the clear-out at the start of a unit turn, before cleaners and painters. The work we do is the same: empty it, load it, and sweep."],
    ["Can you do it the same day?", "Yes, when we have the details, a way in, and your go-ahead, and the schedule is open. If that day is full, next day is the usual fallback. A 48-hour wait is rare. We will tell you if we cannot make your date."],
    ["What do you need from me?", "The address and unit, a rough idea of what is inside, access, and confirmation from the owner or manager that the unit can be emptied."],
    ["Do you clean or paint the unit?", "No. We haul and sweep. Deep cleaning, painting, and repairs stay with your other vendors."],
    ["Do you take before and after photos?", "Yes, on every job. Ask for them for your file."],
    ["Can you invoice my company and be added to your insurance certificate?", "Yes. We invoice companies, and property managers can be added to our certificate of insurance on request."],
    ["Do you price multiple units?", "Yes. Ask about volume discounts or locked-in rates if you have guaranteed or recurring turns."],
    ["Will you haul paint and chemicals?", "No. Paint, solvents, fuel, and other hazardous waste need a licensed disposal drop-off. We haul the rest."],
  ],
  related: ["house-and-estate-cleanouts", "commercial-junk-removal", "hoarder-cleanout", "garage-cleanouts"],
};
