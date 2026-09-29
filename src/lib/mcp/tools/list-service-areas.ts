import { defineTool } from "@lovable.dev/mcp-js";
import { locations } from "@/content/locations";
import { PHONE, SITE_URL } from "@/content/site";

export default defineTool({
  name: "list_service_areas",
  title: "List service areas",
  description: "List the Colorado cities EZ Haulaway serves, plus the business phone number for booking.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const areas = locations.map((l) => ({ slug: l.slug, city: l.city, county: l.county, url: `${SITE_URL}/service-areas/${l.slug}` }));
    return { content: [{ type: "text", text: JSON.stringify({ phone: PHONE, areas }) }], structuredContent: { phone: PHONE, areas } };
  },
});
