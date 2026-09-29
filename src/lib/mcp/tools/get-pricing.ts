import { defineTool } from "@lovable.dev/mcp-js";
import { FALLBACK_GUIDE, getPriceGuide } from "@/lib/pricing.functions";

export default defineTool({
  name: "get_pricing",
  title: "Get pricing",
  description: "Get EZ Haulaway's current junk removal price guide: minimum, labor rate, trailer load prices, extra charges and specialty items.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: async () => {
    const g = await getPriceGuide().catch(() => FALLBACK_GUIDE);
    const pricing = {
      minimum: g.minimum,
      laborRate: g.laborRate,
      loads: g.loads.map((l) => ({ label: l.label, volume: l.volume, price: l.price })),
      adjustments: g.adjustments.map((a) => ({ label: a.label, amount: a.amount })),
      specialty: g.specialty.map((s) => ({ item: String(s.item), price: String(s.price) })),
      live: g.live,
    };
    return { content: [{ type: "text", text: JSON.stringify(pricing) }], structuredContent: { pricing } };
  },
});
