const CANONICAL_HOST = "www.ezhaulawayllc.com";
const APEX_HOST = "ezhaulawayllc.com";
const CANONICAL_ORIGIN = `https://${CANONICAL_HOST}`;

// Exact hosts only. Preview hosts (*.lovable.app) and other subdomains stay put.
const OWNED_HOSTS = new Set([CANONICAL_HOST, APEX_HOST]);

// Lovable's proxy overwrites both headers, so the first value is the client-facing
// host and scheme. request.url is often the internal origin behind that proxy.
function firstHeaderValue(request: Request, name: string): string | null {
  const raw = request.headers.get(name);
  if (!raw) return null;
  const first = raw.split(",")[0]?.trim().toLowerCase() ?? "";
  return first.length > 0 ? first : null;
}

function hostnameFromHost(value: string): string {
  const host = value.trim().toLowerCase().replace(/\.$/, "");
  if (host.startsWith("[")) {
    const end = host.indexOf("]");
    return end === -1 ? host : host.slice(1, end);
  }
  return host.replace(/:\d+$/, "");
}

function publicHostname(request: Request, url: URL): string {
  const forwarded = firstHeaderValue(request, "x-forwarded-host");
  if (forwarded) return hostnameFromHost(forwarded);
  const host = firstHeaderValue(request, "host");
  if (host) return hostnameFromHost(host);
  return url.hostname.toLowerCase().replace(/\.$/, "");
}

function publicProtocol(request: Request, url: URL): string {
  const forwarded = firstHeaderValue(request, "x-forwarded-proto")?.replace(/:$/, "");
  if (forwarded) return forwarded;
  return url.protocol.replace(":", "");
}

function stripTrailingSlash(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.replace(/\/+$/, "") || "/";
  return pathname;
}

// One hop to https://www.ezhaulawayllc.com. GET/HEAD also drop a trailing slash.
// Other methods use 308 so the method and body survive, and the path stays exact.
export function canonicalRedirect(request: Request): Response | null {
  let url: URL;
  try {
    url = new URL(request.url);
  } catch {
    return null;
  }

  const host = publicHostname(request, url);
  const protocol = publicProtocol(request, url);
  const owned = OWNED_HOSTS.has(host);
  const stripped = stripTrailingSlash(url.pathname);
  const hostOrProtoChanged = owned && (host !== CANONICAL_HOST || protocol !== "https");
  const slashChanged = stripped !== url.pathname;
  const mayStripSlash = request.method === "GET" || request.method === "HEAD";

  if (!hostOrProtoChanged && !(mayStripSlash && slashChanged)) return null;

  const targetPath = mayStripSlash ? stripped : url.pathname;
  const location = hostOrProtoChanged
    ? `${CANONICAL_ORIGIN}${targetPath}${url.search}`
    : `${targetPath}${url.search}`;
  const status = mayStripSlash ? 301 : 308;

  return new Response(null, { status, headers: { location } });
}
