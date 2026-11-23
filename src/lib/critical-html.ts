/**
 * The homepage's mobile LCP element is body text. It paints when CSS and the
 * body font arrive. Route modulepreloads and the hydration script are not
 * needed for that paint, so they must not share the first bytes with it.
 * Visible markup is unchanged.
 */
export function prioritizeCriticalResources(html: string): string {
  const withoutModulePreloads = html.replace(/<link\b[^>]*\brel="modulepreload"[^>]*>/gi, "");
  return withoutModulePreloads.replace(
    /<script\b([^>]*?\bsrc="\/assets\/[^"]+\.js"[^>]*)>/gi,
    (full, attrs: string) => {
      if (/\bfetchpriority\s*=/i.test(attrs)) return full;
      return `<script fetchpriority="low"${attrs}>`;
    },
  );
}
