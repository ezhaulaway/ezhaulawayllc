// Load-order hints for images inside synced blog HTML. Pure string work, safe on server and client.
// The first image is usually the largest visible element, so it loads at high priority; every other
// image waits until it is near the viewport so long posts do not download all their pictures up front.
export function optimizeBlogImages(html: string): string {
  let n = 0;
  return html.replace(/<img\b([^>]*?)(\/?)>/gi, (_m, attrs: string, slash: string) => {
    const base = attrs.replace(/\s+(loading|decoding|fetchpriority)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
    const hints = n++ === 0 ? ' loading="eager" fetchpriority="high" decoding="async"' : ' loading="lazy" decoding="async"';
    return `<img${base}${hints}${slash ? " /" : ""}>`;
  });
}
