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

        const estimator_stats = await loadEstimatorStats(supabaseAdmin);

        return Response.json({ ai_estimate_requests, quote_requests, estimator_stats });
      },
    },
  },
});

// Instant-estimator usage stats (every estimate run, with or without contact info).
async function loadEstimatorStats(
  supabaseAdmin: typeof import("@/integrations/supabase/client.server").supabaseAdmin,
) {
  const { data, error } = await supabaseAdmin
    .from("estimate_events")
    .select(
      "id, created_at, page, referrer, utm_source, utm_medium, utm_campaign, city, region, country, device, description, photo_count, load_size, price_low, price_high, items_identified, est_credits, locked_in, locked_in_at",
    )
    .order("created_at", { ascending: false })
    .limit(1000);
  if (error) {
    console.error("crew-leads estimate_events error", error);
    return null;
  }
  const rows = data ?? [];
  const now = Date.now();
  const within = (days: number) =>
    rows.filter((r) => now - new Date(r.created_at).getTime() <= days * 86400000);
  const summarize = (list: typeof rows) => {
    const locked = list.filter((r) => r.locked_in).length;
    const credits = list.reduce((sum, r) => sum + Number(r.est_credits ?? 0), 0);
    return {
      estimates: list.length,
      locked_in: locked,
      conversion_rate_percent: list.length ? Math.round((locked / list.length) * 1000) / 10 : 0,
      est_ai_credits: Math.round(credits * 100) / 100,
    };
  };
  const countBy = (key: "page" | "device" | "city" | "utm_source" | "referrer") => {
    const m: Record<string, number> = {};
    for (const r of rows) {
      const k = (r[key] as string | null) || "unknown";
      m[k] = (m[k] ?? 0) + 1;
    }
    return m;
  };
  return {
    note: "est_ai_credits is approximate, calculated from AI token usage.",
    all_time: summarize(rows),
    last_7_days: summarize(within(7)),
    last_30_days: summarize(within(30)),
    by_page: countBy("page"),
    by_device: countBy("device"),
    by_city: countBy("city"),
    by_source: countBy("utm_source"),
    by_referrer: countBy("referrer"),
    recent_estimates: rows.slice(0, 100),
  };
}
