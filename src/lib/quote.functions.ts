import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const quoteSchema = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(1).max(30),
  location: z.string().trim().min(1).max(100),
  details: z.string().trim().min(1).max(2000),
  photoPaths: z.array(z.string()).max(10).default([]),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

function isNewSupabaseApiKey(value: string): boolean {
  return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}

function createSupabaseFetch(key: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined,
    );
    if (init?.headers) {
      new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    }
    if (isNewSupabaseApiKey(key) && headers.get("Authorization") === `Bearer ${key}`) {
      headers.delete("Authorization");
    }
    headers.set("apikey", key);
    return fetch(input, { ...init, headers });
  };
}

export const submitQuoteRequest = createServerFn({ method: "POST" })
  .validator((data: unknown) => quoteSchema.parse(data))
  .handler(async ({ data }) => {
    const { createClient } = await import("@supabase/supabase-js");

    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) {
      throw new Error("Backend is not configured");
    }

    const supabasePublic = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
      global: { fetch: createSupabaseFetch(key) },
    });

    const quoteId = crypto.randomUUID();

    const { error } = await supabasePublic.from("quote_requests" as any).insert({
      id: quoteId,
      name: data.name,
      phone: data.phone,
      location: data.location,
      details: data.details,
      photo_paths: data.photoPaths,
      status: "new",
    } as any);

    if (error) {
      console.error("quote insert error", error);
      throw new Error("Could not save your request. Please call or text us.");
    }

    // Notify the office. A failed alert must never fail the customer's request.
    try {
      let photoUrls: string[] = [];
      if (data.photoPaths.length > 0) {
        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { data: signed } = await supabaseAdmin.storage
            .from("quote-photos")
            .createSignedUrls(data.photoPaths, 60 * 60 * 24 * 14);
          photoUrls = (signed ?? [])
            .map((s) => s.signedUrl)
            .filter((u): u is string => Boolean(u));
        } catch (signErr) {
          console.error("quote photo signing failed", signErr);
        }
      }
      const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
      await sendTemplateEmail("new-quote-request", "", {
        templateData: {
          name: data.name,
          phone: data.phone,
          location: data.location,
          details: data.details,
          photoCount: data.photoPaths.length,
          photoUrls,
          submittedAt: new Date().toLocaleString("en-US", {
            timeZone: "America/Denver",
            dateStyle: "medium",
            timeStyle: "short",
          }),
        },
        idempotencyKey: `new-quote-request-${quoteId}`,
      });
    } catch (emailError) {
      console.error("quote alert email failed", emailError);
    }

    return { success: true };
  });
