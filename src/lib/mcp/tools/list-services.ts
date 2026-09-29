import { defineTool } from "@lovable.dev/mcp-js";
import { services } from "@/content/services";
import { SITE_URL } from "@/content/site";

export default defineTool({
  name: "list_services",
  title: "List services",
  description: "List the junk removal services EZ Haulaway offers, with a summary and page link for each.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const list = services.map((s) => ({ slug: s.slug, name: s.name, summary: s.summary, url: `${SITE_URL}/services/${s.slug}` }));
    return { content: [{ type: "text", text: JSON.stringify(list) }], structuredContent: { services: list } };
  },
});
