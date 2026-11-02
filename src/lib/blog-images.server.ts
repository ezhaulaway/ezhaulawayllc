/* eslint-disable @typescript-eslint/no-explicit-any */
// Copies blog images hosted on BabyLoveGrowth into our own storage bucket and rewrites the stored
// article URLs, so the blog keeps its pictures after that subscription ends. Server-only.
// Safe to run repeatedly: it only touches articles that still point at the old host, and a failed
// download leaves that URL as it was so the next run retries it.
const BUCKET = "blog-images";
const OLD_HOST_RE = /https:\/\/media\.babylovegrowth\.ai\/[^\s"'<>)\\]+/g;
const MAX_ARTICLES = 6;
const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];

function storageName(url: string): string {
  const raw = decodeURIComponent(new URL(url).pathname.split("/").pop() ?? "image");
  return "babylovegrowth/" + raw.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 120);
}

export async function mirrorBlogImages() {
  const { supabaseAdmin: db } = await import("@/integrations/supabase/client.server");

  const { data: bucket } = await db.storage.getBucket(BUCKET);
  if (!bucket) {
    const { error } = await db.storage.createBucket(BUCKET, { public: true, fileSizeLimit: MAX_BYTES, allowedMimeTypes: ALLOWED });
    if (error && !/exists/i.test(error.message)) return { error: "bucket" };
  }

  const { data: rows, error: qErr } = await db
    .from("blg_articles")
    .select("id, content_html, hero_image_url, json_ld, faq_json_ld")
    .or("content_html.ilike.*media.babylovegrowth.ai*,hero_image_url.ilike.*media.babylovegrowth.ai*")
    .limit(MAX_ARTICLES);
  if (qErr) return { error: "query" };

  const done = new Map<string, string | null>();
  async function mirror(url: string): Promise<string | null> {
    if (done.has(url)) return done.get(url)!;
    let out: string | null = null;
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 15000);
      const res = await fetch(url, { signal: ctrl.signal, headers: { "User-Agent": "EZHaulawayBlogImages/1.0" } });
      clearTimeout(t);
      const type = (res.headers.get("content-type") ?? "").split(";")[0]!.trim().toLowerCase();
      if (res.ok && ALLOWED.includes(type)) {
        const bytes = await res.arrayBuffer();
        if (bytes.byteLength > 0 && bytes.byteLength <= MAX_BYTES) {
          const path = storageName(url);
          const { error } = await db.storage.from(BUCKET).upload(path, bytes, { contentType: type, cacheControl: "31536000", upsert: true });
          if (!error) out = db.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
        }
      }
    } catch {
      out = null;
    }
    done.set(url, out);
    return out;
  }

  let articles = 0;
  let copied = 0;
  let failed = 0;
  for (const row of rows ?? []) {
    const hay = [row.content_html, row.hero_image_url, JSON.stringify(row.json_ld ?? null), JSON.stringify(row.faq_json_ld ?? null)].join("\n");
    const urls = [...new Set(hay.match(OLD_HOST_RE) ?? [])];
    const swaps = new Map<string, string>();
    for (const u of urls) {
      const next = await mirror(u);
      if (next) {
        swaps.set(u, next);
        copied++;
      } else failed++;
    }
    if (swaps.size === 0) continue;
    const swap = (s: string) => [...swaps].reduce((acc, [from, to]) => acc.split(from).join(to), s);
    const patch: Record<string, unknown> = {};
    if (row.content_html) patch["content_html"] = swap(row.content_html);
    if (row.hero_image_url) patch["hero_image_url"] = swap(row.hero_image_url);
    if (row.json_ld != null) patch["json_ld"] = JSON.parse(swap(JSON.stringify(row.json_ld)));
    if (row.faq_json_ld != null) patch["faq_json_ld"] = JSON.parse(swap(JSON.stringify(row.faq_json_ld)));
    const { error } = await db.from("blg_articles").update(patch as never).eq("id", row.id);
    if (!error) articles++;
  }
  return { articles, copied, failed, more: (rows?.length ?? 0) === MAX_ARTICLES };
}
