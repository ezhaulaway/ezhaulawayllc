export const HERO_SIZES = "(min-width: 1280px) 560px, (min-width: 1024px) calc(47.5vw - 52px), calc(100vw - 40px)";
export function createResponsiveImages(images: Record<string, { src: string; srcSet: string }>) {
  function responsiveImage(src: string, sizes = HERO_SIZES) {
    const image = images[src];
    return image ? { ...image, sizes } : { src, srcSet: undefined, sizes: undefined };
  }
  function heroPreload(src: string, sizes = HERO_SIZES) {
    const image = responsiveImage(src, sizes);
    return { rel: "preload", as: "image", href: image.src, imageSrcSet: "srcSet" in image ? image.srcSet : undefined, imageSizes: "sizes" in image ? image.sizes : undefined, fetchPriority: "high" as const };
  }
  return { responsiveImage, heroPreload };
}
