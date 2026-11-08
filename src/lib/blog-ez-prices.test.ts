import { describe, expect, it } from "vitest";
import { rewriteEzPriceText } from "@/lib/blog-ez-prices";
import { SNAPSHOT_GUIDE } from "@/lib/price-guide";

const guide = SNAPSHOT_GUIDE;

describe("blog EZ price rewrite", () => {
  it("updates EZ ladder, item, and hot tub claims from the guide", () => {
    const input = [
      "Our Denver-area prices run from $150 for a minimum load to $800 for a full trailer.",
      "<tr><td>Minimum / small load</td><td>$150</td></tr>",
      "<tr><td>Couch</td><td>$60 per cushion</td></tr>",
      "Couches are $60 per cushion.",
      "Hot tub removal with EZ Haulaway costs $450 to $850 in the Denver metro area.",
      "Refrigerators run $125 to $150, and Freon carry a $75 per-unit handling fee.",
      "A mattress is $100.",
      "Additional labor is $50 per hour per crew member.",
    ].join(" ");
    const out = rewriteEzPriceText(input, guide);
    expect(out).toContain("from $120 for a minimum load to $840 for a full trailer");
    expect(out).toContain("<td>$120</td>");
    expect(out).not.toContain("$60 per cushion");
    expect(out).not.toContain("$450 to $850");
    expect(out).toContain("$500 flat rate");
    expect(out).toContain("$150");
    expect(out).toContain("$100");
    expect(out).not.toContain("$75");
    expect(out).not.toContain("$800");
  });

  it("leaves national averages, fence math, dump fees, and third-party fees alone", () => {
    const samples = [
      "Junk removal usually costs between about $100 and $800 per job.",
      "Nationally, one cost guide reports a range of about $300 to $2,500, with an average near $900.",
      "It also reports volume-based rates of $75 to $150 per cubic yard.",
      "Fence length Low estimate ($3/ft) High estimate ($8/ft) 50 ft $150 $400 100 ft $300 $800.",
      "On very short runs the minimum charge applies, which is why 50 feet rarely costs less than $150.",
      "Most homeowners pay somewhere between $150 and $600 to have yard waste hauled away.",
      "QuotrPro reports dump fees commonly adding $50 to $200 per load.",
      "A typical tip is about $10 to $20 per crew member.",
      "The Xcel refrigerator recycling program offers a $50 rebate.",
      "Denver residents get one at-your-door appointment per calendar year, with a $15 copayment.",
      "A local 2025 guide reports $300 to $1,500 for a small wood shed, and $800 to $3,000 for a larger shed.",
      "One guide lists rush fees of $25 to $150.",
    ];
    for (const sample of samples) {
      expect(rewriteEzPriceText(sample, guide)).toBe(sample);
    }
  });
});
