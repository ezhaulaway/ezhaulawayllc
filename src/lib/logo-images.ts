import { createResponsiveImages } from "./responsive-images";
import original37 from "@/assets/ez-haulaway-wordmark-sm.webp";
import variant37_240 from "@/assets/ez-haulaway-wordmark-sm-speed-240.webp.asset.json";
import variant37_480 from "@/assets/ez-haulaway-wordmark-sm-speed-480.webp.asset.json";
import original38 from "@/assets/ez-haulaway-stacked-sm.webp";
import variant38_120 from "@/assets/ez-haulaway-stacked-sm-speed-120.webp.asset.json";
import variant38_240 from "@/assets/ez-haulaway-stacked-sm-speed-240.webp.asset.json";

const images = {
  [original37]: { src: variant37_480.url, srcSet: `${variant37_240.url} 240w, ${variant37_480.url} 480w` },
  [original38]: { src: variant38_240.url, srcSet: `${variant38_120.url} 120w, ${variant38_240.url} 240w` },
};
export const { responsiveImage, heroPreload } = createResponsiveImages(images);
