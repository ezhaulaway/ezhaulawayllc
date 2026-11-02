import { createFileRoute } from "@tanstack/react-router";
import { authenticateCronRequest } from "@/integrations/supabase/cron-auth";

// Scheduled blog import. Caller must present the cron bearer secret.
// Step 1 pulls new BabyLoveGrowth articles (skipped cleanly once the API key is gone).
// Step 2 copies any images still hosted by BabyLoveGrowth into our own storage.
export const Route = createFileRoute("/api/public/blg-sync")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const denied = await authenticateCronRequest(request);
        if (denied) return denied;
        const { runBlogSync } = await import("@/lib/blog-sync.server");
        const { mirrorBlogImages } = await import("@/lib/blog-images.server");
        const sync = await runBlogSync();
        let images: unknown;
        try {
          images = await mirrorBlogImages();
        } catch (e) {
          console.error("blog-images error", e instanceof Error ? e.message : "unknown");
          images = { error: "failed" };
        }
        return Response.json({ ...sync, images });
      },
    },
  },
});
