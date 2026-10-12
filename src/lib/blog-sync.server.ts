/* eslint-disable @typescript-eslint/no-explicit-any */
// BabyLoveGrowth → blg_articles sync. Server-only. Never import from client code.
const BASE = "https://api.babylovegrowth.ai/api/integrations";
const UA = "EZHaulawayBlogSync/1.0";
const GAP_MS = 2100;
const MAX_CALLS = 25;
const MAX_DETAILS = 20;
const PAGE = 50;

type Summary = { id: number; slug: string; updated_at?: string };

class RateLimited extends Error {
  constructor(public retryAfter: number | null) {
    super("rate limited");
  }
}
class HttpError extends Error {
  constructor(public status: number) {
    super(`http ${status}`);
  }
}

export function cleanHtml(html: string): string {
  let h = html;
  h = h.replace(/<script\b[^>]*type\s*=\s*["']?application\/ld\+json["']?[^>]*>[\s\S]*?<\/script>/gi, "");
  h = h.replace(/\s+on[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
  h = h.replace(/\s+(href|src|xlink:href)\s*=\s*("\s*(javascript|data):[^"]*"|'\s*(javascript|data):[^']*'|(javascript|data):[^\s>]+)/gi, "");
  h = h.replace(/\s+srcdoc\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
  h = h.replace(/<(object|embed)\b[\s\S]*?<\/\1\s*>/gi, "");
  h = h.replace(/<(object|embed|base)\b[^>]*\/?>/gi, "");
  h = h.replace(/<iframe\b([^>]*)>([\s\S]*?)<\/iframe\s*>/gi, (_m, attrs: string, inner: string) => {
    const src = /\ssrc\s*=\s*["']([^"']+)["']/i.exec(attrs)?.[1] ?? "";
    let host = "";
    try {
      host = new URL(src, "https://x.invalid").hostname.replace(/^www\./, "");
    } catch {
      return "";
    }
    const ok = ["youtube.com", "youtube-nocookie.com", "vimeo.com", "player.vimeo.com"].some(
      (d) => host === d || host.endsWith("." + d),
    );
    if (!ok) return "";
    const a = attrs.replace(/\s+sandbox\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
    return `<iframe${a} sandbox="allow-scripts allow-same-origin allow-presentation">${inner}</iframe>`;
  });
  return h;
}

export async function runBlogSync() {
  const key = process.env["BABYLOVEGROWTH_API_KEY"];
  if (!key) return { error: "missing key" };
  const { supabaseAdmin: db } = await import("@/integrations/supabase/client.server");

  const { data: leased } = await db.rpc("blg_claim_lease" as never);
  const state = (leased as unknown as Array<any> | null)?.[0];
  if (!state) return { skipped: "locked" };

  let calls = 0;
  let details = 0;
  let synced = 0;
  let remaining = 0;
  let hit429 = false;
  let offset = Number(state.list_offset ?? 0);
  let listComplete = Boolean(state.list_complete);
  let nextAllowed = state.next_allowed_at ? new Date(String(state.next_allowed_at)).getTime() : 0;
  let backoff = Number(state.backoff_seconds ?? 0);

  async function api(path: string) {
    const wait = nextAllowed - Date.now();
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));
    calls++;
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 15000);
    let res: Response;
    try {
      res = await fetch(BASE + path, {
        headers: { "X-API-Key": key!, "Content-Type": "application/json", "User-Agent": UA },
        signal: ctrl.signal,
      });
    } finally {
      clearTimeout(t);
      nextAllowed = Date.now() + GAP_MS;
      await db.rpc("blg_mark_call" as never, { _gap_ms: GAP_MS } as never);
    }
    if (res.status === 429) {
      const ra = Number(res.headers.get("retry-after"));
      throw new RateLimited(Number.isFinite(ra) && ra > 0 ? ra : null);
    }
    if (!res.ok) throw new HttpError(res.status);
    backoff = 0;
    return res.json();
  }

  try {
    if (listComplete) {
      offset = 0;
      listComplete = false;
    }
    outer: while (calls < MAX_CALLS) {
      const raw = await api(`/v1/articles?limit=${PAGE}&offset=${offset}`);
      const list: Summary[] = Array.isArray(raw) ? raw : (raw?.data ?? raw?.articles ?? []);
      const ids = list.map((a) => a.id);
      const { data: existing } = await db
        .from("blg_articles")
        .select("id, slug, previous_slugs, article_updated_at")
        .in("id", ids.length ? ids : [-1]);
      const byId = new Map((existing ?? []).map((r) => [Number(r.id), r]));
      const need = list.filter((a) => {
        const ex = byId.get(Number(a.id));
        if (!ex) return true;
        if (!a.updated_at || !ex.article_updated_at) return false;
        return new Date(a.updated_at).getTime() > new Date(ex.article_updated_at).getTime();
      });
      let leftovers = need.length;
      for (const s of need) {
        if (calls >= MAX_CALLS || details >= MAX_DETAILS) {
          remaining = leftovers;
          break outer;
        }
        details++;
        let d: any;
        try {
          d = await api(`/v1/articles/${s.id}`);
          d = d?.data ?? d;
        } catch (e) {
          if (e instanceof HttpError && e.status === 404) {
            leftovers--;
            continue;
          }
          throw e;
        }
        const ex = byId.get(Number(s.id));
        const slug = String(d.slug ?? s.slug);
        const prev = new Set<string>((ex?.previous_slugs as string[]) ?? []);
        if (ex && ex.slug !== slug) prev.add(ex.slug);
        prev.delete(slug);
        const { error } = await db.from("blg_articles").upsert({
          id: Number(s.id),
          slug,
          previous_slugs: [...prev],
          title: String(d.title ?? ""),
          meta_description: (d.meta_description as string) ?? null,
          hero_image_url: (d.hero_image_url as string) ?? null,
          language_code: (d.languageCode as string) ?? (d.language_code as string) ?? null,
          content_html: d.content_html ? cleanHtml(String(d.content_html)) : null,
          json_ld: (d.jsonLd as never) ?? null,
          faq_json_ld: (d.faqJsonLd as never) ?? null,
          article_created_at: (d.created_at as string) ?? null,
          article_updated_at: (d.updated_at as string) ?? s.updated_at ?? null,
          synced_at: new Date().toISOString(),
        });
        if (error) throw error;
        synced++;
        leftovers--;
      }
      if (list.length < PAGE) {
        listComplete = true;
        offset = 0;
        break;
      }
      offset += PAGE;
    }
  } catch (e) {
    if (e instanceof RateLimited) {
      hit429 = true;
      backoff = e.retryAfter ?? (backoff ? backoff * 2 : 60);
      nextAllowed = Date.now() + backoff * 1000;
    } else {
      console.error("blg-sync error", e instanceof Error ? e.message : "unknown");
    }
  } finally {
    await db
      .from("blg_sync_state")
      .update({
        list_offset: offset,
        list_complete: listComplete,
        lease_until: null,
        next_allowed_at: new Date(nextAllowed || Date.now()).toISOString(),
        backoff_seconds: e429(hit429, backoff),
      })
      .eq("id", 1);
  }
  return { synced, remaining, listComplete, done: listComplete && remaining === 0, rateLimited: hit429 };
}

function e429(hit: boolean, b: number) {
  return hit ? b : 0;
}
