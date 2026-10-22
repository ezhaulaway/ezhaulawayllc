import { createResponsiveImages } from "./responsive-images";
import original43 from "@/assets/new-B8EC4C72.webp.asset.json";
import variant43_360 from "@/assets/new-B8EC4C72-speed-360.webp.asset.json";
import variant43_480 from "@/assets/new-B8EC4C72-speed-480.webp.asset.json";
import original44 from "@/assets/new-43291499.webp.asset.json";
import variant44_360 from "@/assets/new-43291499-speed-360.webp.asset.json";
import original45 from "@/assets/new-A5F021D5.webp.asset.json";
import variant45_360 from "@/assets/new-A5F021D5-speed-360.webp.asset.json";
import variant45_480 from "@/assets/new-A5F021D5-speed-480.webp.asset.json";

const images = {
  [original43.url]: { src: variant43_480.url, srcSet: `${variant43_360.url} 360w, ${variant43_480.url} 480w` },
  [original44.url]: { src: variant44_360.url, srcSet: `${variant44_360.url} 360w` },
  [original45.url]: { src: variant45_480.url, srcSet: `${variant45_360.url} 360w, ${variant45_480.url} 480w` },
};
export const { responsiveImage, heroPreload } = createResponsiveImages(images);
