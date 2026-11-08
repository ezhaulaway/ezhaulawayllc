import { createFileRoute } from "@tanstack/react-router";
import { buildLlmsText } from "@/lib/llms-text";
import { loadPriceGuide } from "@/lib/pricing.functions";

/** Live public facts. One EZ Crew guide fills every price in the response. */
export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: async () => {
        const guide = await loadPriceGuide();
        return new Response(buildLlmsText(guide), {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=300",
          },
        });
      },
    },
  },
});
