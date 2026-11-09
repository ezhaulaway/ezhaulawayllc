/**
 * Cities that used to have a public URL and are no longer served.
 * Monument, CO is outside the service area. Old URLs 301 here so a previously
 * crawled address does not 404. The target is the service-area index: Castle Rock
 * is the nearest city we do serve, and sending Monument URLs there would tell
 * Google that Monument belongs on the Castle Rock page.
 */
const RETIRED_CITY_TARGETS: Record<string, string> = {
  monument: "/service-areas",
};

export function retiredCityRedirect(city: string): string | null {
  return RETIRED_CITY_TARGETS[city.toLowerCase()] ?? null;
}

/** City page and any city×service path under a retired city. */
export function retiredPathRedirect(pathname: string): string | null {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const match = path.match(/^\/service-areas\/([^/]+)(?:\/.*)?$/i);
  if (!match?.[1]) return null;
  return retiredCityRedirect(match[1]);
}
