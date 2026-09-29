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

let initialized = false;

export function initAnalytics() {
  if (initialized || typeof window === "undefined" || !measurementId) return;
  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  // Use the canonical gtag signature: push the `arguments` object, not a rest
  // array — Google's tag expects the array-like object its own snippet pushes.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  } as (...args: unknown[]) => void;
  window.gtag("js", new Date());
  window.gtag("config", measurementId);
}

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
