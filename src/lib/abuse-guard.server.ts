// Abuse limits for the public forms and the instant estimator. Server-only.
// Two layers: a quick per-visitor limit held in memory, and a site-wide cap counted
// from rows already saved in the database, so a script cannot run up AI credits or
// flood the inbox. Database errors fail open: a real customer is never blocked by one.

type CountedTable = "estimate_events" | "ai_estimate_requests" | "quote_requests";

export type GuardRule = {
  /** Short name for this action, used to keep per-visitor counts apart. */
  name: string;
  /** Per-visitor limit: at most `max` calls in `windowMs`. */
  perVisitor: { max: number; windowMs: number };
  /** Site-wide cap counted from saved rows. */
  table: CountedTable;
  perHour: number;
  perDay?: number;
};

const HOUR = 60 * 60 * 1000;
const hits = new Map<string, number[]>();

export function visitorKey(request: Request | undefined): string {
  const h = (n: string) => request?.headers.get(n)?.split(",")[0]?.trim() || "";
  return h("cf-connecting-ip") || h("x-real-ip") || h("x-forwarded-for") || "unknown";
}

/** True when this visitor is still under the limit. Records the call. */
export function allowVisitor(
  key: string,
  max: number,
  windowMs: number,
  now = Date.now(),
): boolean {
  if (hits.size > 5000) {
    for (const [k, times] of hits) if (times.every((t) => now - t > windowMs)) hits.delete(k);
  }
  const recent = (hits.get(key) ?? []).filter((t) => now - t <= windowMs);
  if (recent.length >= max) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}

async function savedSince(table: CountedTable, sinceMs: number): Promise<number | null> {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count, error } = await supabaseAdmin
      .from(table)
      .select("id", { count: "exact", head: true })
      .gte("created_at", new Date(Date.now() - sinceMs).toISOString());
    return error ? null : (count ?? 0);
  } catch {
    return null;
  }
}

/** True when the call may go ahead. */
export async function allowRequest(rule: GuardRule): Promise<boolean> {
  let request: Request | undefined;
  try {
    const { getRequest } = await import("@tanstack/react-start/server");
    request = getRequest();
  } catch {
    request = undefined;
  }
  const visitor = visitorKey(request);
  if (!allowVisitor(`${rule.name}:${visitor}`, rule.perVisitor.max, rule.perVisitor.windowMs)) {
    console.warn(`abuse-guard: ${rule.name} per-visitor limit reached`);
    return false;
  }
  const [hour, day] = await Promise.all([
    savedSince(rule.table, HOUR),
    rule.perDay != null ? savedSince(rule.table, 24 * HOUR) : Promise.resolve(null),
  ]);
  if (hour != null && hour >= rule.perHour) {
    console.warn(`abuse-guard: ${rule.name} hourly cap reached (${hour})`);
    return false;
  }
  if (rule.perDay != null && day != null && day >= rule.perDay) {
    console.warn(`abuse-guard: ${rule.name} daily cap reached (${day})`);
    return false;
  }
  return true;
}

export const ESTIMATE_RULE: GuardRule = {
  name: "estimate",
  perVisitor: { max: 6, windowMs: 10 * 60 * 1000 },
  table: "estimate_events",
  perHour: 40,
  perDay: 200,
};

export const ESTIMATE_LEAD_RULE: GuardRule = {
  name: "estimate-lead",
  perVisitor: { max: 6, windowMs: 10 * 60 * 1000 },
  table: "ai_estimate_requests",
  perHour: 30,
};

export const QUOTE_RULE: GuardRule = {
  name: "quote",
  perVisitor: { max: 5, windowMs: 10 * 60 * 1000 },
  table: "quote_requests",
  perHour: 30,
};
