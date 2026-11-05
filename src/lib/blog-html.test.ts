import { describe, expect, it } from "vitest";
import { blogImageSrcSet, optimizeBlogImages, resizedBlogImage } from "./blog-html";

const U = "https://abc123.supabase.co/storage/v1/object/public/blog-images/babylovegrowth/pic_1.jpeg";

describe("resizedBlogImage", () => {
  it("builds a resized WebP URL for our storage images", () => {
    expect(resizedBlogImage(U, 800)).toBe(
      "https://abc123.supabase.co/storage/v1/render/image/public/blog-images/babylovegrowth/pic_1.jpeg?width=800&quality=70&format=webp",
    );
  });
  it("leaves every other image alone", () => {
    expect(resizedBlogImage("https://media.babylovegrowth.ai/x.jpg", 800)).toBeNull();
    expect(resizedBlogImage("https://abc123.supabase.co/storage/v1/object/public/other/x.jpg", 800)).toBeNull();
    expect(resizedBlogImage("https://abc123.supabase.co/storage/v1/object/public/blog-images/x.svg", 800)).toBeNull();
    expect(resizedBlogImage("/local.jpg", 800)).toBeNull();
  });
  it("makes a srcset with three widths", () => {
    expect(blogImageSrcSet(U)?.split(", ").length).toBe(3);
    expect(blogImageSrcSet("/local.jpg")).toBeNull();
  });
});

describe("optimizeBlogImages", () => {
  const html = `<p>a</p><img src="${U}" alt="one"><img alt="two" src='${U}' loading="eager"><img src="/x.png" alt="three" />`;
  const out = optimizeBlogImages(html);
  it("resizes storage images and keeps alt text", () => {
    expect(out).toContain('alt="one"');
    expect(out).toContain("srcset=");
    expect(out).toContain("width=800&quality=70&format=webp");
    expect(out).toContain('alt="two"');
  });
  it("loads only the first image eagerly", () => {
    const tags = out.match(/<img[^>]*>/g)!;
    expect(tags[0]).toContain('loading="eager" fetchpriority="high"');
    expect(tags[1]).toContain('loading="lazy"');
    expect(tags[2]).toContain('loading="lazy"');
    expect(tags[1]).not.toContain("eager");
  });
  it("does not touch non-storage images except for load hints", () => {
    expect(out).toContain('src="/x.png"');
    expect(out.match(/<img[^>]*\/x\.png[^>]*>/)![0]).not.toContain("srcset");
  });
  it("is stable when run twice on already-resized html", () => {
    expect(optimizeBlogImages(out).match(/<img/g)!.length).toBe(3);
  });
});
