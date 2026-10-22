import { describe, expect, it } from "vitest";
import { createResponsiveImages } from "./responsive-images";

describe("responsive image resource selection", () => {
  const { responsiveImage, heroPreload } = createResponsiveImages({
    "/original.jpg": { src: "/photo-1000.webp", srcSet: "/photo-640.webp 640w, /photo-700.webp 700w, /photo-1000.webp 1000w" },
  });
  it("uses the same candidates and display width for preload and image", () => {
    const image = responsiveImage("/original.jpg", "350px");
    const preload = heroPreload("/original.jpg", "350px");
    expect(image.src).toBe("/photo-1000.webp");
    expect(preload.href).toBe(image.src);
    expect(preload.imageSrcSet).toBe(image.srcSet);
    expect(preload.imageSizes).toBe("350px");
    expect(preload.fetchPriority).toBe("high");
  });
  it("leaves unknown image URLs unchanged", () => {
    expect(responsiveImage("/untouched.webp").src).toBe("/untouched.webp");
    expect(heroPreload("/untouched.webp").imageSrcSet).toBeUndefined();
  });
});