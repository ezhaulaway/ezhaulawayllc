import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  description: z.string().trim().min(5).max(2000),
  images: z
    .array(z.string().regex(/^data:image\/(jpeg|png|webp);base64,/))
    .max(4)
    .default([]),
});

export type AiEstimate = {
  load_size: "minimum" | "quarter" | "half" | "three_quarters" | "full" | "multiple_loads";
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
    load_size: { type: "string", enum: ["minimum", "quarter", "half", "three_quarters", "full", "multiple_loads"] },
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
Pricing rules (all-inclusive: labor, loading, hauling, disposal):
- Trailer is 450 cubic feet.
- Minimum job: $125 (small pickups, a few items).
- 1/4 trailer: $150-$250. 1/2 trailer: $350-$450. 3/4 trailer: $550-$650. Full trailer: $750-$850.
- More than one trailer: multiply accordingly.
- Mattresses, furniture, electronics, appliances and other large items may be priced individually; list them in special_items with a short note.
- Heavy material (concrete, dirt, tile, shingles) or hard access (stairs, long carries) can raise the price; mention it.
Estimate volume from the photos and description. Be honest about uncertainty. Keep summary to 2-3 sentences, at most 12 items, at most 4 prep tips. Plain friendly language. This is a preliminary estimate; the final price is confirmed on site.`;

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
        instructions: SYSTEM,
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
    try {
      return { ok: true, estimate: JSON.parse(text) as AiEstimate };
    } catch {
      return { ok: false, error: "We couldn't read the estimate. Please try again." };
    }
  });
