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
  .inputValidator((data: unknown) => quoteSchema.parse(data))
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

    const { error } = await supabasePublic.from("quote_requests" as any).insert({
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

    return { success: true };
  });
