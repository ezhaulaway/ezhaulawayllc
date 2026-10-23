import { createResponsiveImages } from "./responsive-images";
import original36 from "@/assets/hero-job-1200.webp";
import hero640 from "@/assets/hero-job-hq-640.webp";
import hero900 from "@/assets/hero-job-hq-900.webp";

const images = {
  [original36]: { src: original36, srcSet: `${hero640} 640w, ${hero900} 900w, ${original36} 1200w` },
};
export const { responsiveImage, heroPreload } = createResponsiveImages(images);
