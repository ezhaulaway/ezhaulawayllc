// Google Analytics 4 (gtag.js) — loaded once at app startup.
// The measurement ID comes from the linked Google Analytics connector.

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const measurementId = import.meta.env[
  "VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY"
] as string | undefined;

// Google Ads tag for call/conversion tracking (provided by the site owner).
const ADS_TAG_ID = "AW-18279521152";

let initialized = false;

export function initAnalytics() {
  if (initialized || typeof window === "undefined") return;
  if (!measurementId && !ADS_TAG_ID) return;
  initialized = true;

  // Load the tag after the page has finished loading and the browser is idle,
  // so it never competes with the main photo. Events queue in dataLayer meanwhile.
  const load = () => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId ?? ADS_TAG_ID}`;
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

  // Report a "Click to call" conversion for every phone link on the site.
  // The dialer still opens normally; the beacon transport survives the handoff.
  document.addEventListener(
    "click",
    (e) => {
      const link = (e.target as HTMLElement | null)?.closest?.('a[href^="tel:"]');
      if (!link || !window.gtag) return;
      window.gtag("event", "conversion", {
        send_to: CALL_CONVERSION,
        value: 1.0,
        currency: "USD",
        transport_type: "beacon",
      });
    },
    { capture: true },
  );
}

const CALL_CONVERSION = "AW-18279521152/2nmDCMLBtpIdEIC3rYxE";

/** Send a page_view on client-side route changes (gtag only auto-tracks the first load). */
export function trackPageView(path: string) {
  if (!initialized || !window.gtag) return;
  window.gtag("event", "page_view", { page_path: path });
}

/** Custom events, e.g. trackEvent("generate_lead", { method: "quote_form" }). */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (!initialized || !window.gtag) return;
  window.gtag("event", name, params);
}
