// Load-order and size hints for images inside synced blog HTML. Pure string work, safe on server and client.
// The first image is usually the largest visible element, so it loads at high priority; every other
// image waits until it is near the viewport so long posts do not download all their pictures up front.
// Pictures stored in our own blog-images bucket are served resized (WebP) through Supabase image transformation.

const STORAGE_IMAGE = /^(https:\/\/[a-z0-9-]+\.supabase\.co)\/storage\/v1\/object\/public\/(blog-images\/[^?#\s"'&<>]+\.(?:jpe?g|png|webp))$/i;
export const BLOG_IMAGE_WIDTHS = [480, 800, 1280] as const;
const QUALITY = 70;

/** URL of a blog-images file resized to `width` pixels as WebP, or null for any other image. */
export function resizedBlogImage(url: string, width: number): string | null {
  const m = STORAGE_IMAGE.exec(url.trim());
  if (!m) return null;
  return `${m[1]}/storage/v1/render/image/public/${m[2]}?width=${width}&quality=${QUALITY}&format=webp`;
}

/** srcset covering the standard widths, or null for an image that cannot be resized. */
export function blogImageSrcSet(url: string, widths: readonly number[] = BLOG_IMAGE_WIDTHS): string | null {
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
    let base = attrs.replace(/\s+(loading|decoding|fetchpriority)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
    const src = /\ssrc\s*=\s*(?:"([^"]*)"|'([^']*)')/i.exec(base);
    const url = src?.[1] ?? src?.[2];
    const srcset = url ? blogImageSrcSet(url) : null;
    if (src && url && srcset) {
      base = base.replace(/\s+(srcset|sizes)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
      base = base.replace(src[0], ` src="${resizedBlogImage(url, 800)}" srcset="${srcset}" sizes="${ARTICLE_SIZES}"`);
    }
    const hints = n++ === 0 ? ' loading="eager" fetchpriority="high" decoding="async"' : ' loading="lazy" decoding="async"';
    return `<img${base}${hints}${slash ? " /" : ""}>`;
  });
}
