import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { SCHEDULED_POSTS, livePosts, toRow } from "@/content/scheduled-posts";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const listBlogPosts = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("blg_articles")
    .select("id, slug, title, meta_description, hero_image_url, language_code, article_created_at, article_updated_at")
    .order("article_created_at", { ascending: false, nullsFirst: false });
  if (error) throw new Error("Could not load blog posts");
  const mine = livePosts().map((p) => toRow(p, SCHEDULED_POSTS.indexOf(p)));
  const rows = [...(data ?? []), ...mine].map(({ id, slug, title, meta_description, hero_image_url, language_code, article_created_at, article_updated_at }) => ({
    id, slug, title, meta_description, hero_image_url, language_code, article_created_at, article_updated_at,
  }));
  return rows.sort((a, b) => Date.parse(b.article_created_at ?? "0") - Date.parse(a.article_created_at ?? "0"));
});

export const getBlogPost = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => ({ slug: String(d.slug).slice(0, 300) }))
  .handler(async ({ data }) => {
    const mineIdx = SCHEDULED_POSTS.findIndex((p) => p.slug === data.slug);
    const mine = mineIdx >= 0 ? livePosts().find((p) => p.slug === data.slug) : undefined;
    if (mine) return { post: toRow(mine, mineIdx), redirectTo: null as string | null };
    const db = publicClient();
    const { data: post } = await db.from("blg_articles").select("*").eq("slug", data.slug).maybeSingle();
    if (post) return { post, redirectTo: null as string | null };
    const { data: old } = await db
      .from("blg_articles")
      .select("slug")
      .contains("previous_slugs", [data.slug])
      .limit(1)
      .maybeSingle();
    return { post: null, redirectTo: old?.slug ?? null };
  });
