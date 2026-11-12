// Signs the estimate the server produced so the lock-in step can prove the price,
// load size and summary it receives back are the ones the server gave, unchanged.
// Token format: <event id>.<issued ms>.<hex HMAC>.

export type SignedEstimateFields = {
  load_size: string;
  price_low: number;
  price_high: number;
  summary: string;
  items_identified: string[];
};

const MAX_AGE_MS = 24 * 60 * 60 * 1000;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function canonical(id: string, issued: number, e: SignedEstimateFields): string {
  return JSON.stringify([
    id,
    issued,
    e.load_size,
    Math.round(e.price_low),
    Math.round(e.price_high),
    e.summary,
    e.items_identified,
  ]);
}

async function hmacHex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(`estimate-event:${secret}`),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function sameText(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function signEstimate(
  secret: string,
  id: string,
  estimate: SignedEstimateFields,
  now = Date.now(),
): Promise<string> {
  return `${id}.${now}.${await hmacHex(secret, canonical(id, now, estimate))}`;
}

/** Returns the event id when the token matches this exact estimate and is not too old. */
export async function verifyEstimate(
  secret: string,
  token: string,
  estimate: SignedEstimateFields,
  now = Date.now(),
): Promise<string | null> {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [id, issuedRaw, sig] = parts as [string, string, string];
  if (!UUID.test(id) || !/^\d{10,16}$/.test(issuedRaw) || !/^[0-9a-f]{64}$/.test(sig)) return null;
  const issued = Number(issuedRaw);
  if (issued > now + 60_000 || now - issued > MAX_AGE_MS) return null;
  const expected = await hmacHex(secret, canonical(id, issued, estimate));
  return sameText(expected, sig) ? id : null;
}
