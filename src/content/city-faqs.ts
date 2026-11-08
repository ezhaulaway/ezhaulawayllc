/** Visible city FAQs and the FAQPage JSON-LD both read this list. */
export function cityFaqs(city: string): Array<[string, string]> {
  return [
    [
      `Do you charge extra to come to ${city}?`,
      "There is [[travel]]. We confirm that on the quote before any work starts.",
    ],
    [
      `How much does junk removal cost in ${city}?`,
      "We price by the space your items take in our dump trailer. Pickups start at [[min]], a half trailer is about [[load:4]] and a full trailer is about [[load:8]], with labor, loading, hauling and disposal included. Send photos for a preliminary estimate.",
    ],
    [
      "How fast can you get here?",
      "Same-day and next-day pickups are common, and a 48-hour wait is rare. Call or text for the soonest slot.",
    ],
    [
      `Do you work with landlords, property managers and realtors in ${city}?`,
      "Yes. We do eviction cleanouts, trash outs, make-ready haul-offs and pre-listing cleanouts, take before and after photos on every job, and can invoice your company. Property managers can be added to our certificate of insurance.",
    ],
    [
      "Do I have to move anything to the curb?",
      "No. Our crew carries everything out from wherever it sits — basement, backyard, upstairs bedroom, or storage unit.",
    ],
    [
      `What do you do with the junk after you leave ${city}?`,
      "We sort for donation and recycling wherever we can, and take the rest to the proper disposal facility.",
    ],
  ];
}
