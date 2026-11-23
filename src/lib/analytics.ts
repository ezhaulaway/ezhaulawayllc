// Google Analytics 4 (gtag.js) — loaded once at app startup.
// The measurement ID comes from the linked Google Analytics connector.
// The tag script waits until the page is idle so it does not compete with the
// first paint. Phone taps often happen before that, and the dialer suspends
// the page, so those taps are also sent with sendBeacon immediately.

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __ezPhoneOwned?: boolean;
  }
}

const measurementId = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY"] as
  string | undefined;

// Google Ads tag for call/conversion tracking (provided by the site owner).
const ADS_TAG_ID = "AW-18279521152";
const CALL_CONVERSION = "AW-18279521152/2nmDCMLBtpIdEIC3rYxE";
const COLLECT_URL = "https://www.google-analytics.com/g/collect";

let initialized = false;
let tagLoaded = false;
let phoneTrackingInstalled = false;

type PhoneElement = {
  getAttribute(name: string): string | null;
  closest(selector: string): unknown;
};

/** Stable link_location for a tel link. An explicit data attribute wins. */
export function phoneLinkLocation(link: PhoneElement, pathname: string): string {
  const explicit = link.getAttribute("data-phone-location")?.trim();
  if (explicit) return explicit;
  if (link.closest("[data-phone-region='mobile-sticky']")) return "mobile_sticky";
  if (link.closest("header")) return "header";
  if (link.closest("footer")) return "footer";
  if (pathname.startsWith("/blog")) return "blog";
  if (/^\/service-areas\/[^/]+\/.+/.test(pathname)) return "city_service";
  if (pathname.startsWith("/service-areas")) return "city";
  if (pathname.startsWith("/services/")) return "service";
  if (pathname.startsWith("/instant-estimate")) return "estimate";
  if (pathname === "/contact") return "contact";
  if (pathname === "/faq") return "faq";
  if (pathname === "/") return "home";
  return "page";
}

/** Same shape as generate_lead: one event name plus a few string parameters. */
export function phoneClickParams(linkLocation: string, pathname: string) {
  return {
    page_path: pathname,
    link_location: linkLocation,
    transport_type: "beacon" as const,
  };
}

export function gaClientIdFromCookie(cookie: string): string | null {
  const match = /(?:^|;\s*)_ga=GA\d+\.\d+\.(\d+\.\d+)(?:;|$)/.exec(cookie);
  return match?.[1] ?? null;
}

export function ga4CollectQuery(
  id: string,
  clientId: string,
  name: string,
  params: Record<string, unknown>,
  page: { href: string; title: string },
): string {
  const query = new URLSearchParams({
    v: "2",
    tid: id,
    cid: clientId,
    en: name,
    dl: page.href,
    dt: page.title,
    _s: "1",
  });
  for (const [key, value] of Object.entries(params)) {
    if (value == null || key === "transport_type") continue;
    query.set(`ep.${key}`, String(value));
  }
  return query.toString();
}

function clientId(): string {
  const existing = gaClientIdFromCookie(document.cookie);
  if (existing) return existing;
  const created = `${Math.floor(Math.random() * 1e10)}.${Math.floor(Date.now() / 1000)}`;
  document.cookie = `_ga=GA1.1.${created}; path=/; max-age=63072000; SameSite=Lax`;
  return created;
}

function sendGa4Beacon(name: string, params: Record<string, unknown>): boolean {
  if (!measurementId || typeof navigator.sendBeacon !== "function") return false;
  const query = ga4CollectQuery(measurementId, clientId(), name, params, {
    href: location.href,
    title: document.title,
  });
  return navigator.sendBeacon(`${COLLECT_URL}?${query}`);
}

function onDocumentClick(event: Event) {
  const target = event.target as PhoneElement | null;
  const sms =
    target && "closest" in target
      ? (target.closest('a[href^="sms:"]') as PhoneElement | null)
      : null;
  if (sms && window.gtag) window.gtag("event", "text_click", { transport_type: "beacon" });
  const link = target?.closest?.('a[href^="tel:"]') as PhoneElement | null;
  if (!link) return;
  const params = phoneClickParams(phoneLinkLocation(link, location.pathname), location.pathname);
  const gtagReady = tagLoaded && typeof window.gtag === "function";
  if (gtagReady) {
    window.gtag!("event", "phone_call_click", params);
  } else if (!sendGa4Beacon("phone_call_click", params) && window.gtag) {
    window.gtag("event", "phone_call_click", params);
  }
  if (window.gtag) {
    window.gtag("event", "conversion", {
      send_to: CALL_CONVERSION,
      value: 1.0,
      currency: "USD",
      transport_type: "beacon",
    });
  }
}

/** Capture tel taps even when React has not hydrated yet. Idempotent. */
export function installPhoneClickTracking() {
  if (phoneTrackingInstalled || typeof document === "undefined") return;
  phoneTrackingInstalled = true;
  window.__ezPhoneOwned = true;
  document.addEventListener("click", onDocumentClick, true);
}

if (typeof window !== "undefined") installPhoneClickTracking();

/**
 * Early listener for taps that happen before the app bundle runs.
 * Once installPhoneClickTracking sets window.__ezPhoneOwned, this listener stops
 * so a tap is counted once.
 */
export function phoneClickBootstrap(id: string | undefined): string {
  const measurement = id && /^G-[A-Z0-9]+$/.test(id) ? id : "";
  return `(function(){var id=${JSON.stringify(measurement)};if(!id)return;document.addEventListener("click",function(e){if(window.__ezPhoneOwned)return;var node=e.target;var link=node&&node.closest?node.closest('a[href^="tel:"]'):null;if(!link||!navigator.sendBeacon)return;var loc=link.getAttribute("data-phone-location");if(!loc){if(link.closest("[data-phone-region='mobile-sticky']"))loc="mobile_sticky";else if(link.closest("header"))loc="header";else if(link.closest("footer"))loc="footer";else if(location.pathname.indexOf("/blog")===0)loc="blog";else if(/^\\/service-areas\\/[^/]+\\/.+/.test(location.pathname))loc="city_service";else if(location.pathname.indexOf("/service-areas")===0)loc="city";else if(location.pathname.indexOf("/services/")===0)loc="service";else if(location.pathname.indexOf("/instant-estimate")===0)loc="estimate";else if(location.pathname==="/contact")loc="contact";else if(location.pathname==="/faq")loc="faq";else if(location.pathname==="/")loc="home";else loc="page";}var match=/(?:^|; )_ga=GA\\d+\\.\\d+\\.(\\d+\\.\\d+)/.exec(document.cookie);var cid=match?match[1]:Math.floor(Math.random()*1e10)+"."+Math.floor(Date.now()/1000);var q="v=2&tid="+encodeURIComponent(id)+"&cid="+encodeURIComponent(cid)+"&en=phone_call_click&dl="+encodeURIComponent(location.href)+"&dt="+encodeURIComponent(document.title||"")+"&ep.page_path="+encodeURIComponent(location.pathname)+"&ep.link_location="+encodeURIComponent(loc)+"&_s=1";navigator.sendBeacon("https://www.google-analytics.com/g/collect?"+q);},true);})();`;
}

export function initAnalytics() {
  if (initialized || typeof window === "undefined") return;
  if (!measurementId && !ADS_TAG_ID) return;
  initialized = true;
  installPhoneClickTracking();

  // Load the tag after the page has finished loading and the browser is idle,
  // so it never competes with the main photo. Events queue in dataLayer meanwhile.
  const load = () => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId ?? ADS_TAG_ID}`;
    script.onload = () => {
      tagLoaded = true;
    };
    document.head.appendChild(script);
  };
  // Wait for the first interaction (or 8s of idle) so tags never compete with first paint.
  let done = false;
  const events = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
  const fire = () => {
    if (done) return;
    done = true;
    events.forEach((e) => window.removeEventListener(e, fire));
    load();
  };
  events.forEach((e) => window.addEventListener(e, fire, { once: true, passive: true }));
  const start = () => setTimeout(fire, 8000);
  if (document.readyState === "complete") start();
  else window.addEventListener("load", start, { once: true });

  window.dataLayer = window.dataLayer || [];
  // Use the canonical gtag signature: push the `arguments` object, not a rest
  // array — Google's tag expects the array-like object its own snippet pushes.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  } as (...args: unknown[]) => void;
  window.gtag("js", new Date());
  if (measurementId) window.gtag("config", measurementId);
  window.gtag("config", ADS_TAG_ID);
}

/** Send a page_view on client-side route changes (gtag only auto-tracks the first load). */
export function trackPageView(path: string) {
  if (!initialized || !window.gtag) return;
  window.gtag("event", "page_view", { page_path: path });
}

/**
 * Custom events. The lead events GA4 counts as key events (Admin → Events):
 * generate_lead (method quote_form | instant_estimate), phone_call_click.
 * estimate_generated and text_click are sent too but aren't key events.
 * phone_call_click uses the same gtag("event", name, params) call once the tag
 * is loaded, with link_location and page_path.
 */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (!initialized || !window.gtag) return;
  window.gtag("event", name, params);
}
