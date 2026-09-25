import { createFileRoute } from "@tanstack/react-router";
import { createHash, timingSafeEqual } from "node:crypto";

// Private feed for the EZ Haulaway crew app. Returns recent leads from
// ai_estimate_requests and quote_requests as JSON. Secured with a shared
// secret sent in the x-sync-secret header (CREW_LEADS_SYNC_SECRET).

const SIGNED_URL_TTL_SECONDS = 60 * 60; // 1 hour
const MAX_ROWS = 100;

function unauthorized(): Response {
  return new Response("Unauthorized", { status: 401 });
}

function checkSyncSecret(request: Request): boolean {
  const expected = process.env["CREW_LEADS_SYNC_SECRET"];
  if (!expected) return false;
  const provided = request.headers.get("x-sync-secret");
  if (!provided) return false;
  const digest = (value: string) =>
    createHash("sha256").update(value, "utf8").digest();
  return timingSafeEqual(digest(provided), digest(expected));
}

export const Route = createFileRoute("/api/public/crew-leads")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!checkSyncSecret(request)) {
          return unauthorized();
        }

        const { supabaseAdmin } = await import(
          "@/integrations/supabase/client.server"
        );

        const [aiResult, quoteResult] = await Promise.all([
          supabaseAdmin
            .from("ai_estimate_requests")
            .select(
              "id, created_at, name, phone, address, description, load_size, price_low, price_high, items_identified",
            )
            .order("created_at", { ascending: false })
            .limit(MAX_ROWS),
          supabaseAdmin
            .from("quote_requests")
            .select("id, created_at, name, phone, location, details, photo_paths")
            .order("created_at", { ascending: false })
            .limit(MAX_ROWS),
        ]);

        if (aiResult.error) {
          console.error("crew-leads ai_estimate_requests error", aiResult.error);
          return Response.json(
            { error: "Could not load AI estimate requests" },
            { status: 500 },
          );
        }
        if (quoteResult.error) {
          console.error("crew-leads quote_requests error", quoteResult.error);
          return Response.json(
            { error: "Could not load quote requests" },
            { status: 500 },
          );
        }

        const ai_estimate_requests = (aiResult.data ?? []).map((row) => ({
          id: row.id,
          created_at: row.created_at,
          name: row.name,
          phone: row.phone,
          location: row.address,
          description: row.description,
          load_size: row.load_size,
          price_low: row.price_low,
          price_high: row.price_high,
          items_identified: row.items_identified,
          photo_urls: [] as string[],
        }));

        // Mint short-lived signed URLs for each quote's uploaded photos.
        const quote_requests = await Promise.all(
          (quoteResult.data ?? []).map(async (row) => {
            let photoUrls: string[] = [];
            if (row.photo_paths.length > 0) {
              const { data: signed, error: signError } =
                await supabaseAdmin.storage
                  .from("quote-photos")
                  .createSignedUrls(row.photo_paths, SIGNED_URL_TTL_SECONDS);
              if (signError) {
                console.error("crew-leads signed url error", signError);
              } else {
                photoUrls = (signed ?? [])
                  .map((entry) => entry.signedUrl)
                  .filter((url): url is string => Boolean(url));
              }
            }
            return {
              id: row.id,
              created_at: row.created_at,
              name: row.name,
              phone: row.phone,
              location: row.location,
              details: row.details,
              photo_urls: photoUrls,
            };
          }),
        );

        return Response.json({ ai_estimate_requests, quote_requests });
      },
    },
  },
});
