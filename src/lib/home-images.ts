import { createResponsiveImages } from "./responsive-images";
import original36 from "@/assets/hero-job-1200.webp";
import hero640 from "@/assets/hero-job-hq-640.webp";
import hero800 from "@/assets/hero-job-800.webp";
import hero900 from "@/assets/hero-job-hq-900.webp";

/** Display width of the homepage hero. The preload and the img must use this same value. */
export const HOME_HERO_SIZES =
  "(min-width: 1280px) 617px, (min-width: 1024px) calc(52.5vw - 55px), calc(100vw - 40px)";

const images = {
  [original36]: {
    src: original36,
    srcSet: `${hero640} 640w, ${hero800} 800w, ${hero900} 900w, ${original36} 1200w`,
  },
};
export const { responsiveImage, heroPreload } = createResponsiveImages(images);
