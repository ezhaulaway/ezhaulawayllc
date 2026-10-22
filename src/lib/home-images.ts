import { createResponsiveImages } from "./responsive-images";
import original36 from "@/assets/hero-job-1200.webp";
import variant36_640 from "@/assets/hero-job-1200-speed-640.webp.asset.json";
import variant36_1000 from "@/assets/hero-job-1200-speed-1000.webp.asset.json";

const images = {
  [original36]: { src: variant36_1000.url, srcSet: `${variant36_640.url} 640w, ${variant36_1000.url} 1000w` },
};
export const { responsiveImage, heroPreload } = createResponsiveImages(images);
