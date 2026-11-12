// Load-order and size hints for images inside synced blog HTML. Pure string work, safe on server and client.
// The first image is usually the largest visible element, so it loads at high priority; every other
// image waits until it is near the viewport so long posts do not download all their pictures up front.
// Pictures stored in our own blog-images bucket are served resized (WebP) through Supabase image transformation.

const STORAGE_IMAGE =
  /^(https:\/\/[a-z0-9-]+\.supabase\.co)\/storage\/v1\/object\/public\/(blog-images\/[^?#\s"'&<>]+\.(?:jpe?g|png|webp))$/i;
export const BLOG_IMAGE_WIDTHS = [480, 800, 1280] as const;
const QUALITY = 70;

/** URL of a blog-images file resized to `width` pixels as WebP, or null for any other image. */
export function resizedBlogImage(url: string, width: number): string | null {
  const m = STORAGE_IMAGE.exec(url.trim());
  if (!m) return null;
  return `${m[1]}/storage/v1/render/image/public/${m[2]}?width=${width}&quality=${QUALITY}&format=webp`;
}

/** srcset covering the standard widths, or null for an image that cannot be resized. */
export function blogImageSrcSet(
  url: string,
  widths: readonly number[] = BLOG_IMAGE_WIDTHS,
): string | null {
  const parts = widths.map((w) => {
    const u = resizedBlogImage(url, w);
    return u ? `${u} ${w}w` : null;
  });
  return parts.every(Boolean) ? parts.join(", ") : null;
}

const ARTICLE_SIZES = "(min-width: 768px) 728px, calc(100vw - 40px)";

export function optimizeBlogImages(html: string): string {
  let n = 0;
  return html.replace(/<img\b([^>]*?)(\/?)>/gi, (_m, attrs: string, slash: string) => {
    let base = attrs.replace(
      /\s+(loading|decoding|fetchpriority)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi,
      "",
    );
    const src = /\ssrc\s*=\s*(?:"([^"]*)"|'([^']*)')/i.exec(base);
    const url = src?.[1] ?? src?.[2];
    const srcset = url ? blogImageSrcSet(url) : null;
    if (src && url && srcset) {
      base = base.replace(/\s+(srcset|sizes)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
      base = base.replace(
        src[0],
        ` src="${resizedBlogImage(url, 800)}" srcset="${srcset}" sizes="${ARTICLE_SIZES}"`,
      );
    }
    const hints =
      n++ === 0
        ? ' loading="eager" fetchpriority="high" decoding="async"'
        : ' loading="lazy" decoding="async"';
    return `<img${base}${hints}${slash ? " /" : ""}>`;
  });
}

// --- Safety cleaning for article HTML that comes from outside this codebase ---------------------
// Applied when an article is imported and again when it is shown, so nothing stored earlier
// (or changed in the database) can run code in a visitor's browser. Pure string work.

const REMOVE_WITH_CONTENT = [
  "script",
  "style",
  "object",
  "embed",
  "noscript",
  "template",
  "form",
  "select",
  "textarea",
  "button",
  "math",
  "foreignobject",
];
// Small inline <svg> icons are allowed (every imported article has one); the parts of SVG that
// can run code or rewrite links are not.
const REMOVE_TAG_ONLY = [
  "script",
  "style",
  "object",
  "embed",
  "base",
  "meta",
  "link",
  "input",
  "form",
  "frame",
  "frameset",
  "applet",
  "math",
  "animate",
  "animatemotion",
  "animatetransform",
  "set",
  "foreignobject",
];
const URL_ATTRS = "href|src|xlink:href|action|formaction|poster|data|background";
const IFRAME_HOSTS = ["youtube.com", "youtube-nocookie.com", "vimeo.com", "player.vimeo.com"];
const IFRAME_SANDBOX = ' sandbox="allow-scripts allow-same-origin allow-presentation"';
const ATTR_VALUE = `("[^"]*"|'[^']*'|[^\\s>]*)`;

const BLOCKS = REMOVE_WITH_CONTENT.map(
  (name) => new RegExp(`<${name}\\b[\\s\\S]*?<\\/${name}\\s*>`, "gi"),
);
const LONE_TAGS = new RegExp(`<\\/?(?:${REMOVE_TAG_ONLY.join("|")})\\b[^>]*>?`, "gi");
const EVENT_ATTR = new RegExp(`([\\s"'/])on[a-z0-9_-]+\\s*=\\s*${ATTR_VALUE}`, "gi");
const SRCDOC_ATTR = new RegExp(`([\\s"'/])srcdoc\\s*=\\s*${ATTR_VALUE}`, "gi");
const STYLE_ATTR = new RegExp(`([\\s"'/])style\\s*=\\s*${ATTR_VALUE}`, "gi");
const URL_ATTR = new RegExp(`([\\s"'/])(?:${URL_ATTRS})\\s*=\\s*${ATTR_VALUE}`, "gi");

function decodeEntities(value: string): string {
  const point = (n: number) =>
    Number.isFinite(n) && n >= 0 && n <= 0x10ffff ? String.fromCodePoint(n) : "";
  return value
    .replace(/&#x([0-9a-f]+);?/gi, (_m, hex: string) => point(parseInt(hex, 16)))
    .replace(/&#(\d+);?/g, (_m, dec: string) => point(parseInt(dec, 10)))
    .replace(/&colon;/gi, ":")
    .replace(/&(tab|newline);/gi, "");
}

/** True for javascript:, data:, vbscript: and similar URLs, however they are disguised. */
function isUnsafeUrl(value: string): boolean {
  const flat = decodeEntities(value.replace(/^["']|["']$/g, ""))
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000- \u007f-\u009f​-‍﻿]/g, "")
    .toLowerCase();
  return /^(javascript|data|vbscript|livescript|mhtml|file):/.test(flat);
}

function isUnsafeStyle(value: string): boolean {
  return /expression|url\s*\(|@import|behavior|-moz-binding/i.test(
    decodeEntities(value).replace(/\\/g, ""),
  );
}

export function cleanHtml(html: string): string {
  let h = html.replace(/<!--[\s\S]*?-->/g, "").replace(/<!--/g, "");
  for (const block of BLOCKS) h = h.replace(block, "");
  h = h.replace(LONE_TAGS, "");
  // Video embeds are kept only from the hosts above, always sandboxed. Every other frame goes.
  h = h.replace(/<iframe\b([^>]*)>[\s\S]*?<\/iframe\s*>/gi, (_m, attrs: string) => {
    const src = /\ssrc\s*=\s*["']([^"']+)["']/i.exec(attrs)?.[1] ?? "";
    let url: URL;
    try {
      url = new URL(src, "https://x.invalid");
    } catch {
      return "";
    }
    const host = url.hostname.replace(/^www\./, "");
    if (
      url.protocol !== "https:" ||
      !IFRAME_HOSTS.some((d) => host === d || host.endsWith("." + d))
    )
      return "";
    const kept = attrs
      .replace(/\s+sandbox\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
      .replace(/\/\s*$/, "");
    return `<iframe${kept}${IFRAME_SANDBOX}></iframe>`;
  });
  h = h.replace(/<\/?iframe\b[^>]*>?/gi, (m) =>
    m.endsWith(`${IFRAME_SANDBOX}>`) || /^<\/iframe\s*>$/i.test(m) ? m : "",
  );
  // Attribute scrubbing runs over the whole text rather than tag by tag, so markup written to
  // confuse a tag parser cannot hide a handler from it.
  h = h.replace(EVENT_ATTR, "$1").replace(SRCDOC_ATTR, "$1");
  h = h.replace(STYLE_ATTR, (m, lead: string, val: string) => (isUnsafeStyle(val) ? lead : m));
  h = h.replace(URL_ATTR, (m, lead: string, val: string) => (isUnsafeUrl(val) ? lead : m));
  // A tag left open at the very end would swallow the page markup that follows the article.
  const lastOpen = h.lastIndexOf("<");
  if (lastOpen !== -1 && !h.includes(">", lastOpen))
    h = `${h.slice(0, lastOpen)}&lt;${h.slice(lastOpen + 1)}`;
  return h;
}
