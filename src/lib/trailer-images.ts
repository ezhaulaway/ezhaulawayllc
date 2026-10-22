import { createResponsiveImages } from "./responsive-images";
import original25 from "@/assets/branded-trailer-base.webp";
import variant25_640 from "@/assets/branded-trailer-base-speed-640.webp.asset.json";
import variant25_1000 from "@/assets/branded-trailer-base-speed-1000.webp.asset.json";
import original26 from "@/assets/branded-trailer-junk-0.webp";
import variant26_640 from "@/assets/branded-trailer-junk-0-speed-640.webp.asset.json";
import variant26_1000 from "@/assets/branded-trailer-junk-0-speed-1000.webp.asset.json";
import original27 from "@/assets/branded-trailer-junk-1.webp";
import variant27_640 from "@/assets/branded-trailer-junk-1-speed-640.webp.asset.json";
import variant27_1000 from "@/assets/branded-trailer-junk-1-speed-1000.webp.asset.json";
import original28 from "@/assets/branded-trailer-junk-2.webp";
import variant28_640 from "@/assets/branded-trailer-junk-2-speed-640.webp.asset.json";
import variant28_1000 from "@/assets/branded-trailer-junk-2-speed-1000.webp.asset.json";
import original29 from "@/assets/branded-trailer-junk-3.webp";
import variant29_640 from "@/assets/branded-trailer-junk-3-speed-640.webp.asset.json";
import variant29_1000 from "@/assets/branded-trailer-junk-3-speed-1000.webp.asset.json";
import original30 from "@/assets/branded-trailer-junk-4.webp";
import variant30_640 from "@/assets/branded-trailer-junk-4-speed-640.webp.asset.json";
import variant30_1000 from "@/assets/branded-trailer-junk-4-speed-1000.webp.asset.json";
import original31 from "@/assets/branded-trailer-junk-5.webp";
import variant31_640 from "@/assets/branded-trailer-junk-5-speed-640.webp.asset.json";
import variant31_1000 from "@/assets/branded-trailer-junk-5-speed-1000.webp.asset.json";
import original32 from "@/assets/branded-trailer-junk-6.webp";
import variant32_640 from "@/assets/branded-trailer-junk-6-speed-640.webp.asset.json";
import variant32_1000 from "@/assets/branded-trailer-junk-6-speed-1000.webp.asset.json";
import original33 from "@/assets/branded-trailer-junk-7.webp";
import variant33_640 from "@/assets/branded-trailer-junk-7-speed-640.webp.asset.json";
import variant33_1000 from "@/assets/branded-trailer-junk-7-speed-1000.webp.asset.json";
import original34 from "@/assets/branded-trailer-junk-8.webp";
import variant34_640 from "@/assets/branded-trailer-junk-8-speed-640.webp.asset.json";
import variant34_1000 from "@/assets/branded-trailer-junk-8-speed-1000.webp.asset.json";

const images = {
  [original25]: { src: variant25_1000.url, srcSet: `${variant25_640.url} 640w, ${variant25_1000.url} 1000w` },
  [original26]: { src: variant26_1000.url, srcSet: `${variant26_640.url} 640w, ${variant26_1000.url} 1000w` },
  [original27]: { src: variant27_1000.url, srcSet: `${variant27_640.url} 640w, ${variant27_1000.url} 1000w` },
  [original28]: { src: variant28_1000.url, srcSet: `${variant28_640.url} 640w, ${variant28_1000.url} 1000w` },
  [original29]: { src: variant29_1000.url, srcSet: `${variant29_640.url} 640w, ${variant29_1000.url} 1000w` },
  [original30]: { src: variant30_1000.url, srcSet: `${variant30_640.url} 640w, ${variant30_1000.url} 1000w` },
  [original31]: { src: variant31_1000.url, srcSet: `${variant31_640.url} 640w, ${variant31_1000.url} 1000w` },
  [original32]: { src: variant32_1000.url, srcSet: `${variant32_640.url} 640w, ${variant32_1000.url} 1000w` },
  [original33]: { src: variant33_1000.url, srcSet: `${variant33_640.url} 640w, ${variant33_1000.url} 1000w` },
  [original34]: { src: variant34_1000.url, srcSet: `${variant34_640.url} 640w, ${variant34_1000.url} 1000w` },
};
export const { responsiveImage, heroPreload } = createResponsiveImages(images);
