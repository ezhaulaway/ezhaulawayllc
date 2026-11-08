import { defineTool } from "@lovable.dev/mcp-js";
import { publicPricing, SNAPSHOT_GUIDE } from "@/lib/price-guide";
import { loadPriceGuide } from "@/lib/pricing.functions";

export default defineTool({
  name: "get_pricing",
  title: "Get pricing",
  description: "Get EZ Haulaway's current junk removal price guide: minimum, labor rate, trailer load prices, travel fee, discounts and specialty items. Every number comes from one EZ Crew guide.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: async () => {
    const guide = await loadPriceGuide().catch(() => SNAPSHOT_GUIDE);
    const pricing = publicPricing(guide);
    return { content: [{ type: "text", text: JSON.stringify(pricing) }], structuredContent: { pricing } };
  },
});
