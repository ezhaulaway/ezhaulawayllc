import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  description: z.string().trim().min(5).max(2000),
  images: z
    .array(z.string().regex(/^data:image\/(jpeg|png|webp);base64,/))
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

function isNewSupabaseApiKey(value: string): boolean {
  return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}

function createSupabaseFetch(key: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined,
    );
    if (init?.headers) {
      new Headers(init.headers).forEach((value, k) => headers.set(k, value));
    }
    if (isNewSupabaseApiKey(key) && headers.get("Authorization") === `Bearer ${key}`) {
      headers.delete("Authorization");
    }
    headers.set("apikey", key);
    return fetch(input, { ...init, headers });
  };
}

async function recordLead(
  lead: { name: string; phone: string; address: string; description: string; photoCount: number },
  estimate: AiEstimate,
) {
  const priceRange =
    Math.round(estimate.price_low) === Math.round(estimate.price_high)
      ? `$${Math.round(estimate.price_low)}`
      : `$${Math.round(estimate.price_low)}\u2013$${Math.round(estimate.price_high)}`;
  const loadSize = LOAD_TEXT[estimate.load_size] ?? estimate.load_size;
  const leadId = crypto.randomUUID();

  try {
    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (url && key) {
      const { createClient } = await import("@supabase/supabase-js");
      const supabasePublic = createClient(url, key, {
        auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
        global: { fetch: createSupabaseFetch(key) },
      });
      const { error } = await supabasePublic.from("ai_estimate_requests").insert({
        id: leadId,
        name: lead.name,
        phone: lead.phone,
        address: lead.address,
        description: lead.description,
        photo_count: lead.photoCount,
        load_size: loadSize,
        price_low: Math.round(estimate.price_low),
        price_high: Math.round(estimate.price_high),
        items_identified: estimate.items_identified ?? [],
        summary: estimate.summary,
        status: "new",
      });
      if (error) console.error("ai estimate lead insert error", error);
    }
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
        itemsIdentified: (estimate.items_identified ?? []).join(", "),
        summary: estimate.summary,
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

const SYSTEM = `You are the estimating assistant for EZ Haulaway, a junk removal company in Castle Rock / Parker, Colorado (Denver metro).

TRAILER: 16' x 8' x 3' dump trailer, about 14 cubic yards (450 cubic feet).

TRAILER LOAD PRICING (includes standard labor, loading, hauling, and disposal):
- Minimum / small load (small pickup): $150 (range $150-$200)
- 1/8 trailer (1.75 yd3): $175
- 1/4 trailer (3.5 yd3): $275 (range $250-$300)
- 3/8 trailer (5.25 yd3): $350
- 1/2 trailer (7.0 yd3): $450 (range $400-$500)
- 5/8 trailer (8.75 yd3): $550
- 3/4 trailer (10.5 yd3): $650 (range $550-$650)
- 7/8 trailer (12.25 yd3): $725
- Full trailer (14 yd3): $800 (range $700-$850)
- More than one trailer load: multiply accordingly and use load_size "multiple_loads".

LABOR: $50/hour per crew member may be added for difficult access, disassembly, oversized or heavy items, or extended loading time. Access conditions (stairs, long carries, tight spaces, heavy weight such as concrete, dirt, tile, or shingles) can raise the price - mention it when relevant.

SPECIALTY / SINGLE-ITEM PRICING (use these instead of trailer pricing when the job is only a few of these items; list them in special_items with their price):
AC $50-75; Aquarium $100; Basketball hoop and stand $125; Bicycle (adult) $40; Bookshelf $50; Box spring $75; BBQ grill $75; Cabinet/bottom of hutch $85; Cable machine $150-250; Office chair $40; Recliner $85; Chest freezer $100; Computer monitor $40; Commercial copier/printer $150; Couch $60 per cushion; Dehumidifier $50-65; Desk large $100; Desk small $75; Dining set (table + 4 chairs) $150; Dining set (table + 6 chairs) $200; Dishwasher $75; Dresser/bureau $85; Elliptical $100-150; Entertainment center $175; Filing cabinet small $50; Filing cabinet tall $100; Freezer (large) $125; Furnace $350-400; Futon $100; Hockey/lacrosse net $60; Hot tub from $500; Hutch (dining) $300-400; Push mower $50; Ride-on mower from $225; Mattress $100; Box spring $75; Mini freezer $50; Mini fridge $60; Mirror $25; Ottoman $40; Pallet $30; Piano from $375; Home printer $30; Propane tank $30; Refrigerator (full size) $125; Refrigerator (side by side) $150; Stationary bike $75; Stove $85; Swing set from $300; Coffee table $50; Night stand $30; Dining table $100; Treadmill $150; Trash bag $50; Washer/dryer $100 each; Water heater $125; Basement workbench $200.

METHOD: Estimate volume from the photos and description, pick the closest fill level, and set price_low/price_high around that price (use the published range where one is listed, otherwise about +/- $50). Never quote below the $150 minimum. Oversized/specialty items above are priced individually on top of or instead of trailer space - put each one in special_items with its price. Be honest about uncertainty. Keep summary to 2-3 sentences, at most 12 items, at most 4 prep tips. Plain friendly language. This is a preliminary estimate; the final price is approved before work begins.`;

export const generateAiEstimate = createServerFn({ method: "POST" })
  .validator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }): Promise<{ ok: true; estimate: AiEstimate } | { ok: false; error: string }> => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) return { ok: false, error: "Estimator is not configured." };

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
        instructions: await (async () => {
          const { loadPriceGuide } = await import("./pricing.functions");
          const g = await loadPriceGuide();
          if (!g.live) return SYSTEM;
          return `${SYSTEM}\n\nCURRENT PRICE GUIDE (this overrides any conflicting prices above):\nMinimum charge: $${g.minimum}. Labor: $${g.laborRate}/hour per crew member.\nLoads: ${g.loads.map((l) => `${l.label} (${l.volume}) $${l.price}`).join("; ")}.\n${g.adjustments.length ? `Adjustments: ${g.adjustments.map((a) => `${a.label} ${a.amount}`).join("; ")}.\n` : ""}Specialty: ${g.specialty.map((s) => `${s.item} ${s.price}`).join("; ")}. Never quote below $${g.minimum}.`;
        })(),
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
      estimate = JSON.parse(text) as AiEstimate;
    } catch {
      return { ok: false, error: "We couldn't read the estimate. Please try again." };
    }

    return { ok: true, estimate };
  });

const lockInSchema = z.object({
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
    await recordLead(
      {
        name: data.name,
        phone: data.phone,
        address: data.address,
        description: data.description,
        photoCount: data.photoCount,
      },
      data.estimate as unknown as AiEstimate,
    );
    return { ok: true as const };
  });
