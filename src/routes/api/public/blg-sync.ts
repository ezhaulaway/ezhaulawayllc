import { createFileRoute } from "@tanstack/react-router";
import { authenticateCronRequest } from "@/integrations/supabase/cron-auth";

// Scheduled BabyLoveGrowth import. Caller must present the cron bearer secret.
export const Route = createFileRoute("/api/public/blg-sync")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const denied = await authenticateCronRequest(request);
        if (denied) return denied;
        const { runBlogSync } = await import("@/lib/blog-sync.server");
        return Response.json(await runBlogSync());
      },
    },
  },
});
