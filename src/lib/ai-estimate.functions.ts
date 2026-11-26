import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { signEstimate, verifyEstimate } from "./estimate-token";

const trackSchema = z
  .object({
    page: z.string().max(200).optional(),
    referrer: z.string().max(500).optional(),
    utm_source: z.string().max(100).optional(),
    utm_medium: z.string().max(100).optional(),
    utm_campaign: z.string().max(150).optional(),
    device: z.string().max(20).optional(),
  })
  .optional();

const MAX_IMAGE_CHARS = 2_000_000;

const inputSchema = z.object({
  track: trackSchema,
  description: z.string().trim().min(5).max(2000),
  images: z
    // The browser shrinks photos to 1024px JPEG (well under 1 MB); anything far larger is not from our form.
    .array(z.string().max(MAX_IMAGE_CHARS).regex(/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/))
    .max(4)
    .default([]),
});

const LOAD_TEXT: Record<string, string> = {
  minimum: "Minimum / small load",
  eighth: "About 1/8 trailer",
  quarter: "About 1/4 trailer",
  three_eighths: "About 3/8 trailer",
  half: "About 1/2 trailer",
  five_eighths: "About 5/8 trailer",
  three_quarters: "About 3/4 trailer",
  seven_eighths: "About 7/8 trailer",
  full: "About a full trailer",
  multiple_loads: "More than one trailer",
};

type StoredEstimate = {
  load_size: string | null;
  price_low: number | null;
  price_high: number | null;
  items_identified: string[];
  summary: string | null;
  /**
   * The browser sent a token that does not match the estimate the server signed.
   * The lead is still saved, with no price anyone could have typed in.
   */
  unverified: boolean;
};

async function recordLead(
  lead: { name: string; phone: string; address: string; description: string; photoCount: number },
  estimate: StoredEstimate,
) {
  const lo = estimate.unverified ? null : estimate.price_low;
  const hi = estimate.unverified ? null : estimate.price_high;
  const priceRange = estimate.unverified
    ? "Not verified \u2013 quote this job manually"
    : lo == null || hi == null
      ? "Not available"
      : lo === hi
        ? `$${lo}`
        : `$${lo}\u2013$${hi}`;
  const loadSize = estimate.unverified ? "Not verified" : (estimate.load_size ?? "Not available");
  const summary = estimate.unverified
    ? "The estimate could not be verified against the one the site issued. Quote this job manually."
    : (estimate.summary ?? "");
  const items = estimate.unverified ? [] : (estimate.items_identified ?? []);
  const leadId = crypto.randomUUID();

  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("ai_estimate_requests").insert({
      id: leadId,
      name: lead.name,
      phone: lead.phone,
      address: lead.address,
      description: lead.description,
      photo_count: lead.photoCount,
      load_size: estimate.unverified ? "Not verified" : estimate.load_size,
      price_low: lo,
      price_high: hi,
      items_identified: items,
      summary,
      status: "new",
    });
    if (error) console.error("ai estimate lead insert error", error);
  } catch (dbError) {
    console.error("ai estimate lead insert failed", dbError);
  }

  try {
    const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
    await sendTemplateEmail("new-ai-estimate", "", {
      templateData: {
        name: lead.name,
        phone: lead.phone,
        address: lead.address,
        description: lead.description,
        photoCount: lead.photoCount,
        priceRange,
        loadSize,
        itemsIdentified: items.join(", "),
        summary,
        submittedAt: new Date().toLocaleString("en-US", {
          timeZone: "America/Denver",
          dateStyle: "medium",
          timeStyle: "short",
        }),
      },
      idempotencyKey: `new-ai-estimate-${leadId}`,
    });
  } catch (emailError) {
    console.error("ai estimate alert email failed", emailError);
  }
}

export type AiEstimate = {
  load_size:
    | "minimum"
    | "eighth"
    | "quarter"
    | "three_eighths"
    | "half"
    | "five_eighths"
    | "three_quarters"
    | "seven_eighths"
    | "full"
    | "multiple_loads";
  price_low: number;
  price_high: number;
  summary: string;
  items_identified: string[];
  special_items: { item: string; note: string }[];
  recommended_service: string;
  crew_and_time: string;
  prep_tips: string[];
  confidence: "low" | "medium" | "high";
};

const schema = {
  type: "object",
  additionalProperties: false,
  required: [
    "load_size", "price_low", "price_high", "summary", "items_identified",
    "special_items", "recommended_service", "crew_and_time", "prep_tips", "confidence",
  ],
  properties: {
    load_size: {
      type: "string",
      enum: [
        "minimum", "eighth", "quarter", "three_eighths", "half",
        "five_eighths", "three_quarters", "seven_eighths", "full", "multiple_loads",
      ],
    },
    price_low: { type: "number" },
    price_high: { type: "number" },
    summary: { type: "string" },
    items_identified: { type: "array", items: { type: "string" } },
    special_items: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["item", "note"],
        properties: { item: { type: "string" }, note: { type: "string" } },
      },
    },
    recommended_service: { type: "string" },
    crew_and_time: { type: "string" },
    prep_tips: { type: "array", items: { type: "string" } },
    confidence: { type: "string", enum: ["low", "medium", "high"] },
  },
};

export const generateAiEstimate = createServerFn({ method: "POST" })
  .validator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }): Promise<{ ok: true; estimate: AiEstimate; eventId: string | null } | { ok: false; error: string }> => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) return { ok: false, error: "Estimator is not configured." };

    const { allowRequest, ESTIMATE_RULE } = await import("./abuse-guard.server");
    if (!(await allowRequest(ESTIMATE_RULE))) {
      return { ok: false, error: "The estimator is busy right now. Please call or text us for a quote." };
    }

    const { loadPriceGuide } = await import("./pricing.functions");
    const { buildEstimatorInstructions } = await import("./price-guide");
    const guide = await loadPriceGuide();

    const content: any[] = [{ type: "input_text", text: `Customer description:\n${data.description}` }];
    for (const url of data.images) content.push({ type: "input_image", image_url: url });

    const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": key,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        instructions: buildEstimatorInstructions(guide),
        input: [{ role: "user", content }],
        stream: true,
        store: false,
        reasoning: { effort: "low" },
        text: { format: { type: "json_schema", name: "estimate", strict: true, schema } },
      }),
    });

    if (!res.ok || !res.body) {
      const status = res.status;
      if (status === 429) return { ok: false, error: "The estimator is busy right now. Please try again in a minute." };
      if (status === 402) return { ok: false, error: "The estimator is temporarily unavailable. Please call or text us for a quote." };
      console.error("AI estimate failed", status, await res.text().catch(() => ""));
      return { ok: false, error: "We couldn't generate an estimate right now. Please send a quote request instead." };
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let text = "";
    let refused = false;
    let inputTokens: number | null = null;
    let outputTokens: number | null = null;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const frames = buffer.split("\n\n");
      buffer = frames.pop() ?? "";
      for (const frame of frames) {
        const line = frame.split("\n").find((l) => l.startsWith("data:"));
        if (!line) continue;
        const payload = line.slice(5).trim();
        if (!payload || payload === "[DONE]") continue;
        try {
          const evt = JSON.parse(payload);
          if (evt.type === "response.output_text.delta") text += evt.delta ?? "";
          if (evt.type === "response.refusal.delta") refused = true;
          if (evt.type === "response.completed" && evt.response?.usage) {
            inputTokens = evt.response.usage.input_tokens ?? null;
            outputTokens = evt.response.usage.output_tokens ?? null;
          }
          if (evt.type === "error" || evt.type === "response.failed") {
            console.error("AI estimate stream error", payload);
            return { ok: false, error: "We couldn't generate an estimate right now. Please send a quote request instead." };
          }
        } catch {
          /* ignore partial */
        }
      }
    }

    if (refused || !text) return { ok: false, error: "We couldn't estimate from that info. Please send a quote request instead." };
    let estimate: AiEstimate;
    try {
      estimate = estimateSchema.parse(JSON.parse(text)) as AiEstimate;
    } catch {
      return { ok: false, error: "We couldn't read the estimate. Please try again." };
    }
    // Whatever the description says, the price never drops below the minimum.
    const floor = guide.minimum;
    estimate.price_low = Math.max(floor, Math.round(estimate.price_low));
    estimate.price_high = Math.max(estimate.price_low, Math.round(estimate.price_high));

    const rawEventId = await logEstimateEvent(data, estimate, inputTokens, outputTokens);
    const secret = tokenSecret();
    const eventId = secret ? await signEstimate(secret, rawEventId ?? crypto.randomUUID(), estimate) : null;
    return { ok: true, estimate, eventId };
  });

async function logEstimateEvent(
  data: z.infer<typeof inputSchema>,
  estimate: AiEstimate,
  inputTokens: number | null,
  outputTokens: number | null,
): Promise<string | null> {
  try {
    const { getRequest } = await import("@tanstack/react-start/server");
    const req = getRequest() as (Request & { cf?: Record<string, unknown> }) | undefined;
    const cf = (req?.cf ?? {}) as Record<string, unknown>;
    const h = (n: string) => req?.headers.get(n) || null;
    const str = (v: unknown) => (typeof v === "string" && v ? v.slice(0, 100) : null);
    // Approximate AI cost in Lovable credits from token usage (actual billing may vary).
    const estCredits =
      inputTokens != null && outputTokens != null
        ? Math.round((inputTokens * 0.00004 + outputTokens * 0.00014) * 10000) / 10000
        : null;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const t = data.track ?? {};
    const { data: row, error } = await supabaseAdmin
      .from("estimate_events")
      .insert({
        page: t.page ?? null,
        referrer: t.referrer ?? null,
        utm_source: t.utm_source ?? null,
        utm_medium: t.utm_medium ?? null,
        utm_campaign: t.utm_campaign ?? null,
        device: t.device ?? null,
        city: str(cf["city"]) ?? h("cf-ipcity"),
        region: str(cf["region"]) ?? h("cf-region"),
        country: str(cf["country"]) ?? h("cf-ipcountry"),
        description: data.description,
        photo_count: data.images.length,
        load_size: LOAD_TEXT[estimate.load_size] ?? estimate.load_size,
        price_low: Math.round(estimate.price_low),
        price_high: Math.round(estimate.price_high),
        items_identified: estimate.items_identified ?? [],
        input_tokens: inputTokens,
        output_tokens: outputTokens,
        est_credits: estCredits,
      })
      .select("id")
      .single();
    if (error) {
      console.error("estimate event insert error", error);
      return null;
    }
    return row.id;
  } catch (e) {
    console.error("estimate event log failed", e);
    return null;
  }
}

// The token handed to the browser signs the estimate itself (see estimate-token.ts).
// Lock-in accepts it only when the browser returns that same estimate, then copies the
// price, load size and items from the row this server recorded.
function tokenSecret(): string | null {
  return process.env["LOVABLE_API_KEY"] ?? process.env["SUPABASE_SERVICE_ROLE_KEY"] ?? null;
}

const estimateSchema = z.object({
  load_size: z.enum([
    "minimum", "eighth", "quarter", "three_eighths", "half",
    "five_eighths", "three_quarters", "seven_eighths", "full", "multiple_loads",
  ]),
  price_low: z.number().finite().nonnegative(),
  price_high: z.number().finite().nonnegative(),
  // Trimmed to the same limits the lock-in step accepts, so a long answer never blocks a lead.
  summary: z.string().transform((v) => v.slice(0, 2000)),
  items_identified: z.array(z.string()).transform((list) => list.slice(0, 30).map((v) => v.slice(0, 200))),
  special_items: z.array(z.object({ item: z.string(), note: z.string() })),
  recommended_service: z.string(),
  crew_and_time: z.string(),
  prep_tips: z.array(z.string()),
  confidence: z.enum(["low", "medium", "high"]),
});

const lockInSchema = z.object({
  eventId: z.string().max(200).nullable().optional(),
  // Hidden field real visitors never see or fill in. Bots that fill every field are dropped.
  website: z.string().max(200).optional(),
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(7).max(30),
  address: z.string().trim().min(3).max(200),
  description: z.string().trim().max(2000).default(""),
  photoCount: z.number().int().min(0).max(4).default(0),
  estimate: z.object({
    load_size: z.string().max(40),
    price_low: z.number(),
    price_high: z.number(),
    summary: z.string().max(2000),
    items_identified: z.array(z.string().max(200)).max(30),
  }),
});

export const submitEstimateLead = createServerFn({ method: "POST" })
  .validator((data: unknown) => lockInSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true as const };

    const { allowRequest, ESTIMATE_LEAD_RULE } = await import("./abuse-guard.server");
    if (!(await allowRequest(ESTIMATE_LEAD_RULE))) {
      throw new Error("Too many requests. Please call or text us.");
    }

    // The token must match the estimate the server signed. Prices, load size and items
    // still come only from the row the server recorded, never from the browser payload.
    const secret = tokenSecret();
    const verifiedId =
      secret && data.eventId ? await verifyEstimate(secret, data.eventId, data.estimate) : null;
    if (data.eventId && !verifiedId) console.warn("estimate lead arrived without a valid estimate token");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const signedSummary = data.estimate.summary.slice(0, 2000);
    let stored: StoredEstimate = {
      load_size: null,
      price_low: null,
      price_high: null,
      items_identified: [],
      summary: data.eventId && !verifiedId ? null : signedSummary,
      unverified: Boolean(data.eventId) && !verifiedId,
    };
    if (verifiedId) {
      try {
        const { data: ev } = await supabaseAdmin
          .from("estimate_events")
          .select("load_size, price_low, price_high, items_identified")
          .eq("id", verifiedId)
          .gte("created_at", new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString())
          .maybeSingle();
        if (ev) {
          stored = {
            load_size: ev.load_size,
            price_low: ev.price_low,
            price_high: ev.price_high,
            items_identified: ev.items_identified ?? [],
            summary: signedSummary,
            unverified: false,
          };
        }
      } catch (e) {
        console.error("estimate event lookup failed", e);
      }
    }
    await recordLead(
      {
        name: data.name,
        phone: data.phone,
        address: data.address,
        description: data.description,
        photoCount: data.photoCount,
      },
      stored,
    );
    if (verifiedId) {
      try {
        await supabaseAdmin
          .from("estimate_events")
          .update({ locked_in: true, locked_in_at: new Date().toISOString() })
          .eq("id", verifiedId)
          .eq("locked_in", false)
          .gte("created_at", new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString());
      } catch (e) {
        console.error("estimate event lock-in update failed", e);
      }
    }
    return { ok: true as const };
  });
