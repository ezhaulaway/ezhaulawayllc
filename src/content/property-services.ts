import realBasementStaged1000 from "@/assets/real-basement-staged-1000.webp";
import realBasementRoom1000 from "@/assets/real-basement-room-1000.webp";
import realBasementStairs1000 from "@/assets/real-basement-stairs-1000.webp";
import basementBefore640 from "@/assets/real-basement-before-640.webp";
import basementBefore960 from "@/assets/real-basement-before-960.webp";
import basementAfter640 from "@/assets/real-basement-after-640.webp";
import basementAfter960 from "@/assets/real-basement-after-960.webp";
import type { Service } from "./services";

/**
 * Pages for property managers, landlords and owners (eviction cleanouts, trash outs, make readies)
 * plus basement and attic cleanouts. Facts here come from Ben: same-day and next-day scheduling,
 * before-and-after photos on every job, company invoicing, managers added to the certificate of
 * insurance, sweep and blow-off after each load, volume or locked-in rates for guaranteed work.
 */

export const evictionCleanout: Service = {
  slug: "eviction-cleanout-and-trash-out",
  name: "Eviction Cleanout & Trash Out",
  h1: "Eviction Cleanouts & Trash Outs in Parker and the Denver Metro",
  metaTitle: "Eviction Cleanout & Trash Out Services | EZ Haulaway",
  metaDescription:
    "Same-day and next-day eviction cleanouts and trash outs for landlords and property managers in Parker, Castle Rock, Aurora and Denver. Before and after photos, company invoicing.",
  cityPages: false,
  summary: "Same-day and next-day eviction cleanouts and trash outs for landlords and property managers.",
  image: realBasementStaged1000,
  imageAlt:
    "Crew member clearing furniture and boxes from a Parker basement",
  intro: [
    "When an eviction is finished and the property is back in your hands, it still has to be emptied before it can be cleaned, repaired and re-rented. EZ Haulaway handles **eviction cleanouts** and **trash outs** for landlords, property managers and owners in Parker, Castle Rock, Aurora, Denver and the south Denver metro. We clear furniture, mattresses, clothing, boxes, appliances and bags of trash, then sweep and blow the area off.",
    "**Same-day** eviction cleanouts and trash outs are available. Once we have the property details, access and your go-ahead, we schedule the crew. Next day is the usual fallback, and a 48-hour wait is rare.",
  ],
  includes: [
    "Furniture, mattresses and box springs",
    "Clothing, boxes, bags of trash and household goods",
    "Appliances, TVs and electronics",
    "Garage, patio and yard leftovers",
    "Apartments, condos, townhomes and single-family homes",
    "Sweep and blow-off after every load",
  ],
  sections: [
    {
      heading: "What we need before we start",
      text: "Three things get an eviction cleanout on the schedule, and none of them take long.\n\n**1. Information.** The address, the unit number, roughly how much is inside and, if you can, a few photos or a short walkthrough video.\n\n**2. Access.** A key, lockbox or door code, or a manager who can meet the crew.\n\n**3. Confirmation.** A text or email from the owner or manager saying the property is clear to be emptied. We do not remove anything without that go-ahead.",
    },
    {
      heading: "Same-day and next-day eviction cleanouts",
      text: "Cleaners, painters and the next resident are all waiting on the unit to be empty, so speed matters. We offer **same-day** and **next-day** cleanouts, and most jobs are finished well inside any 48-hour window. Tell us your deadline when you call and we will say honestly whether we can meet it.",
    },
    {
      heading: "What a trash out is",
      text: "A **trash out** means clearing everything left in a property: trash, junk, furniture and personal belongings that were abandoned. The term is used for evictions, foreclosures and abandoned or vacant properties. For us it is a haul-out job: we remove what is inside, load it, take it to the proper disposal site and leave the space swept.",
    },
    {
      heading: "Before-and-after photos on every job",
      text: "We take before and after photos on every job, so there is a record of how the property looked when we arrived and how we left it. Property managers can ask for the photos for their file.",
    },
    {
      heading: "Invoicing, insurance and repeat work",
      text: "We can **invoice your company**, so there is no stack of receipts to chase. Property managers can be **added to our certificate of insurance** when a building or owner requires it. If you have steady turnovers, ask about **volume discounts or locked-in rates** for guaranteed jobs.",
      links: [{ slug: "apartment-make-ready-haul-off", label: "Apartment make-ready junk removal for unit turns" }],
    },
    {
      heading: "Pricing for eviction cleanouts and trash outs",
      text: "Pricing is based on how much space your items take up in our 14-cubic-yard dump trailer, not on hours. Our minimum is **[[min]]**, a half trailer is about **[[load:4]]** and a full trailer about **[[load:8]]**. Larger units can take more than one load, and we quote the whole job up front. Send photos for a preliminary estimate.",
    },
    {
      heading: "What we do and do not do",
      text: "We haul. We do not clean, paint, repair, change locks or give legal advice. What happens to a former tenant's belongings is the owner's decision under the lease and Colorado law, so check with your attorney or management company first. We do not haul hazardous waste such as paint, chemicals or fuel.\n\nUsable items are set aside for donation when possible, and metal and appliances are recycled when possible.",
    },
  ],
  faqs: [
    ["Can you do an eviction cleanout the same day?", "Yes, when we have the property details, access and your confirmation, same-day service is available. If our schedule is full, next day is the usual fallback."],
    ["What do you need from me to get started?", "The address and unit, a rough idea of what is inside, a way in (key, lockbox, door code or a manager on site) and confirmation from the owner or manager that the unit can be emptied."],
    ["Do you take before and after photos?", "Yes. We take before and after photos on every job, and property managers can ask for them."],
    ["Can you invoice my company and be added to your insurance certificate?", "Yes to both. We can invoice a company, and property managers can be added to our certificate of insurance on request."],
    ["Do you offer pricing for multiple units?", "Yes. Volume discounts or locked-in rates are available for property managers with guaranteed or recurring jobs. Ask us when you book."],
    ["What is the difference between an eviction cleanout and a trash out?", "An eviction cleanout is the cleanout after an eviction. A trash out is the broader term for clearing everything left in a property, which also covers foreclosures and abandoned units. The work is the same: we haul everything out and sweep."],
    ["Do you clean the unit afterward?", "We sweep and blow off the area after every load so the place is left better than we found it. Deep cleaning, painting and repairs are left to your other vendors."],
  ],
  related: ["apartment-make-ready-haul-off", "commercial-junk-removal", "house-and-estate-cleanouts", "hoarder-cleanout"],
};

export const makeReadyHaulOff: Service = {
  slug: "apartment-make-ready-haul-off",
  name: "Apartment Make-Ready Haul-Off",
  h1: "Make-Ready & Unit Turnover Junk Removal",
  metaTitle: "Apartment Make-Ready Junk Removal & Turnovers | EZ Haulaway",
  metaDescription:
    "Junk removal for apartment make readies and unit turnovers in Parker, Castle Rock, Aurora and Denver. Same-day and next-day haul-off so your cleaners and painters can start.",
  cityPages: false,
  summary: "The haul-off step of a make ready: we clear the unit so cleaners and painters can start.",
  image: realBasementRoom1000,
  imageAlt:
    "Crew member walking through a basement staged for loading",
  intro: [
    "A **make ready** is the work between one resident moving out and the next moving in: clear the unit, clean it, patch and paint, fix what is broken and get it ready to rent. EZ Haulaway is the **haul-off step**. We remove the furniture, mattresses, appliances, boxes and bags of trash left behind, then sweep and blow the area off so your vendors can start.",
    "We serve property managers, landlords and apartment communities in Parker, Castle Rock, Aurora, Denver and the south Denver metro with **same-day** and **next-day** slots. A 48-hour wait is rare.",
  ],
  includes: [
    "Furniture and mattresses left behind",
    "Bagged trash, boxes and household debris",
    "Old appliances, TVs and electronics",
    "Balcony, patio, garage and storage leftovers",
    "Small amounts of debris from unit repairs",
    "Sweep and blow-off after every load",
  ],
  sections: [
    {
      heading: "What \"make ready\" means",
      text: "**Make ready**, **make-ready**, **unit turn** and **turnover** all mean the same thing: getting a vacated unit back to rent-ready condition. A typical make ready runs in this order: clear out what was left, deep clean, repair and paint, replace flooring or fixtures if needed, then a final inspection. Junk removal comes first because nothing else can start while the unit is full.",
    },
    {
      heading: "Where junk removal fits in a turn",
      text: "Cleaners, painters and maintenance are scheduled around the move-out date, and a unit full of leftovers holds all of them up. We come in ahead of them, empty the unit and sweep, so the next vendor walks into an empty space.\n\nNo roll-off to rent, no dumpster to fill and no maintenance staff making dump runs.",
    },
    {
      heading: "Same-day and next-day turnaround for tight turns",
      text: "Tell us your vendor dates when you book. We offer **same-day** and **next-day** haul-off, and most jobs are finished sooner than a 48-hour window. If we cannot make your date, we will say so right away so you can plan around it.",
    },
    {
      heading: "Several units, one schedule",
      text: "If more than one unit is turning, send us the list of units and the dates you need them done. We will tell you what fits and plan the loads so the units are cleared in the order your other vendors need them.",
    },
    {
      heading: "Photos, invoicing and insurance",
      text: "We take **before and after photos on every job**, we can **invoice your company**, and property managers can be **added to our certificate of insurance** when an owner or building requires it. We also offer **volume discounts or locked-in rates** for property managers with guaranteed jobs.",
      links: [{ slug: "eviction-cleanout-and-trash-out", label: "Eviction cleanouts and trash outs" }],
    },
    {
      heading: "Make-ready junk removal pricing",
      text: "We price by the space your items take in our 14-cubic-yard dump trailer. Our minimum is **[[min]]**, a half trailer is about **[[load:4]]** and a full trailer about **[[load:8]]**. A unit with a few pieces of furniture and some bags is often a small load, while a fully packed unit may need a full trailer or more. Send photos for a preliminary estimate.",
    },
    {
      heading: "What we do not do",
      text: "We are the haul-off step. We do not provide make-ready cleaning, painting, carpet or flooring work or maintenance repairs, and we do not haul hazardous waste such as paint, chemicals or fuel. If you need a full make-ready crew, we are glad to work alongside the vendors you already use.",
    },
  ],
  faqs: [
    ["What does make ready mean?", "A make ready is the work needed to turn a vacated apartment or rental back into rent-ready condition: clear it out, clean it, repair and paint, then inspect. We handle the clear-out and haul-off step."],
    ["Do you do make-ready cleaning?", "No. We remove the junk and sweep and blow off after loading. Deep cleaning, painting and repairs are done by your cleaning and maintenance vendors, and we clear the unit ahead of them."],
    ["How fast can you turn a unit?", "We offer same-day and next-day service, and a 48-hour wait is rare. Tell us your deadline when you book."],
    ["Can you handle several units at once?", "Send us the list of units and the dates you need. We will tell you what fits and schedule the loads around your other vendors."],
    ["Can you invoice us and be added to our insurance requirements?", "Yes. We can invoice a company, and property managers can be added to our certificate of insurance on request."],
    ["Do you offer volume pricing?", "Yes. Volume discounts or locked-in rates are available for property managers with guaranteed or recurring jobs."],
  ],
  related: ["eviction-cleanout-and-trash-out", "commercial-junk-removal", "house-and-estate-cleanouts", "electronics-and-e-waste-removal"],
};

export const basementAtticCleanout: Service = {
  slug: "basement-and-attic-cleanouts",
  name: "Basement & Attic Cleanouts",
  h1: "Basement & Attic Cleanouts in Parker and the Denver Metro",
  metaTitle: "Basement & Attic Cleanout Services Parker, CO | EZ Haulaway",
  metaDescription:
    "Basement and attic cleanouts in Parker, Castle Rock and Denver. We carry it up the stairs, load it and haul it away. See a real Parker basement cleared in about 45 minutes.",
  cityPages: false,
  summary: "We carry it up the stairs or down the attic ladder, load it and haul it away.",
  image: realBasementStairs1000,
  imageAlt:
    "Crew member carrying a panel past basement stairs in Parker, CO",
  realJob: {
    eyebrow: "Real job in Parker, CO",
    title: "A Parker Basement Cleared in About 45 Minutes",
    text: "This finished basement held boxes, a treadmill, a dresser, a TV, a bin of cables and a pile of trash. The crew carried it all up the stairs, loaded the trailer and left the floor empty. These are the actual before and after photos.",
    facts: [
      "Location: Parker, CO",
      "Time on site: about 45 minutes",
      "Hauled: boxes, treadmill, dresser, TV, cables and household trash",
    ],
    before: {
      src: basementBefore960,
      srcSet: `${basementBefore640} 640w, ${basementBefore960} 960w`,
      alt: "Before: a Parker basement packed with boxes and furniture",
    },
    after: {
      src: basementAfter960,
      srcSet: `${basementAfter640} 640w, ${basementAfter960} 960w`,
      alt: "After: the same Parker basement completely cleared",
    },
  },
  intro: [
    "Basements and attics fill up slowly: moving boxes that never got unpacked, an old treadmill, furniture nobody wanted to throw away. When it is time to clear them out, the hard part is the carry. EZ Haulaway provides **basement cleanout** and **attic cleanout** services in Parker, Castle Rock and the Denver metro. We do the lifting, load our trailer and haul it away.",
    "You do not have to carry anything up the stairs or down the ladder. Show us what goes, and we handle the rest.",
  ],
  includes: [
    "Boxes and stored household items",
    "Old furniture, dressers and shelving",
    "Treadmills and exercise equipment",
    "TVs, electronics and cables",
    "Mattresses and bed frames",
    "Sweep and blow-off after loading",
  ],
  sections: [
    {
      heading: "Stairs, tight turns and long carries",
      text: "Basement stairs, narrow doorways and long walks to the driveway are what make these jobs hard, and they are normal for us. We carry items out by hand and with a dolly, and we plan the path before we start. Tell us about the stairs, any tight turns and where the trailer can park, and send photos if you can.",
    },
    {
      heading: "Attic cleanouts",
      text: "Attic cleanouts mean pull-down stairs, low rafters and boxes that have sat for years. We bring items down by hand and load them straight onto the trailer. In summer attics get very hot, so ask for a morning slot.",
    },
    {
      heading: "Keep, donate or haul",
      text: "Walk the space with us first and point out what stays. We set aside items in good condition for donation when possible, recycle metal and appliances when possible, and haul the rest.",
    },
    {
      heading: "Moving, selling or finishing the space",
      text: "Most basement and attic cleanouts happen before a move, before a home is listed or before a remodel. If the space is being finished or remodeled, we also handle light demolition and remodel debris, so one crew can clear it and take out what is in the way.",
      links: [
        { slug: "light-demolition", label: "Light demolition" },
        { slug: "house-and-estate-cleanouts", label: "Whole-house and estate cleanouts" },
      ],
    },
    {
      heading: "Basement and attic cleanout pricing",
      text: "Pricing is based on how much space your items take in our 14-cubic-yard dump trailer. Our minimum is **[[min]]**, a half trailer is about **[[load:4]]** and a full trailer about **[[load:8]]**. Basements and attics vary a lot, from a few boxes to a full trailer or more. Send photos for a preliminary estimate, and we quote the whole job before we start.",
    },
    {
      heading: "What we do not take",
      text: "We are a junk removal and hauling company. We do not remove insulation, mold, asbestos-containing materials or hazardous waste such as paint, chemicals and fuel. If you are unsure about something, text us a photo.",
    },
  ],
  faqs: [
    ["Do you carry items up basement stairs?", "Yes. Carrying from the basement or down from the attic is the main part of the job. We do the lifting so you do not have to."],
    ["Can you clear an attic with pull-down stairs?", "Yes. We bring items down by hand. Tell us about the access when you book, and ask for a morning visit in summer when attics are hottest."],
    ["How long does a basement cleanout take?", "It depends on how full it is. A recent Parker basement with boxes, a treadmill, a dresser, a TV and trash took about 45 minutes."],
    ["Do I need to be home?", "Someone should walk us through at the start and confirm what goes. Many clients check back at the end."],
    ["Do you take remodel debris from the basement?", "Yes. We haul drywall, lumber and other remodel debris, and we can do light demolition."],
    ["Do you remove mold or insulation?", "No. We haul household items and debris only. Mold, insulation and asbestos need a licensed specialist."],
  ],
  related: ["garage-cleanouts", "house-and-estate-cleanouts", "hoarder-cleanout", "storage-unit-cleanout"],
};
