import { createResponsiveImages } from "./responsive-images";
import original14 from "@/assets/branded-service-appliance.webp";
import variant14_640 from "@/assets/branded-service-appliance-speed-640.webp.asset.json";
import variant14_700 from "@/assets/branded-service-appliance-speed-700.webp.asset.json";
import variant14_1000 from "@/assets/branded-service-appliance-speed-1000.webp.asset.json";
import original15 from "@/assets/branded-service-commercial.webp";
import variant15_640 from "@/assets/branded-service-commercial-speed-640.webp.asset.json";
import variant15_700 from "@/assets/branded-service-commercial-speed-700.webp.asset.json";
import variant15_1000 from "@/assets/branded-service-commercial-speed-1000.webp.asset.json";
import original16 from "@/assets/branded-service-construction.webp";
import variant16_640 from "@/assets/branded-service-construction-speed-640.webp.asset.json";
import variant16_700 from "@/assets/branded-service-construction-speed-700.webp.asset.json";
import variant16_1000 from "@/assets/branded-service-construction-speed-1000.webp.asset.json";
import original17 from "@/assets/branded-service-deck.webp";
import variant17_640 from "@/assets/branded-service-deck-speed-640.webp.asset.json";
import variant17_700 from "@/assets/branded-service-deck-speed-700.webp.asset.json";
import variant17_1000 from "@/assets/branded-service-deck-speed-1000.webp.asset.json";
import original18 from "@/assets/branded-service-demolition.webp";
import variant18_640 from "@/assets/branded-service-demolition-speed-640.webp.asset.json";
import variant18_700 from "@/assets/branded-service-demolition-speed-700.webp.asset.json";
import variant18_1000 from "@/assets/branded-service-demolition-speed-1000.webp.asset.json";
import original19 from "@/assets/branded-service-electronics.webp";
import variant19_640 from "@/assets/branded-service-electronics-speed-640.webp.asset.json";
import variant19_700 from "@/assets/branded-service-electronics-speed-700.webp.asset.json";
import variant19_1000 from "@/assets/branded-service-electronics-speed-1000.webp.asset.json";
import original20 from "@/assets/branded-service-estate.webp";
import variant20_640 from "@/assets/branded-service-estate-speed-640.webp.asset.json";
import variant20_700 from "@/assets/branded-service-estate-speed-700.webp.asset.json";
import variant20_1000 from "@/assets/branded-service-estate-speed-1000.webp.asset.json";
import original21 from "@/assets/branded-service-furniture.webp";
import variant21_640 from "@/assets/branded-service-furniture-speed-640.webp.asset.json";
import variant21_700 from "@/assets/branded-service-furniture-speed-700.webp.asset.json";
import variant21_1000 from "@/assets/branded-service-furniture-speed-1000.webp.asset.json";
import original22 from "@/assets/branded-service-hot-tub.webp";
import variant22_640 from "@/assets/branded-service-hot-tub-speed-640.webp.asset.json";
import variant22_700 from "@/assets/branded-service-hot-tub-speed-700.webp.asset.json";
import variant22_1000 from "@/assets/branded-service-hot-tub-speed-1000.webp.asset.json";
import original23 from "@/assets/branded-service-shed.webp";
import variant23_640 from "@/assets/branded-service-shed-speed-640.webp.asset.json";
import variant23_700 from "@/assets/branded-service-shed-speed-700.webp.asset.json";
import variant23_1000 from "@/assets/branded-service-shed-speed-1000.webp.asset.json";
import original24 from "@/assets/branded-service-yard.webp";
import variant24_640 from "@/assets/branded-service-yard-speed-640.webp.asset.json";
import variant24_700 from "@/assets/branded-service-yard-speed-700.webp.asset.json";
import variant24_1000 from "@/assets/branded-service-yard-speed-1000.webp.asset.json";
import original35 from "@/assets/wood-pallet-removal.jpg";
import variant35_640 from "@/assets/wood-pallet-removal-speed-640.webp.asset.json";
import variant35_700 from "@/assets/wood-pallet-removal-speed-700.webp.asset.json";
import variant35_1000 from "@/assets/wood-pallet-removal-speed-1000.webp.asset.json";
import original39 from "@/assets/real-IMG_5005.jpg.asset.json";
import variant39_640 from "@/assets/real-IMG_5005-speed-640.webp.asset.json";
import variant39_700 from "@/assets/real-IMG_5005-speed-700.webp.asset.json";
import variant39_1000 from "@/assets/real-IMG_5005-speed-1000.webp.asset.json";
import original40 from "@/assets/real-IMG_5082.jpg.asset.json";
import variant40_640 from "@/assets/real-IMG_5082-speed-640.webp.asset.json";
import variant40_700 from "@/assets/real-IMG_5082-speed-700.webp.asset.json";
import variant40_1000 from "@/assets/real-IMG_5082-speed-1000.webp.asset.json";
import original41 from "@/assets/dumpster-alternative-loading.jpg.asset.json";
import variant41_640 from "@/assets/dumpster-alternative-loading-speed-640.webp.asset.json";
import variant41_700 from "@/assets/dumpster-alternative-loading-speed-700.webp.asset.json";
import variant41_1000 from "@/assets/dumpster-alternative-loading-speed-1000.webp.asset.json";
import original42 from "@/assets/storage-unit-cleanout-loading.jpg.asset.json";
import variant42_640 from "@/assets/storage-unit-cleanout-loading-speed-640.webp.asset.json";
import variant42_700 from "@/assets/storage-unit-cleanout-loading-speed-700.webp.asset.json";
import variant42_1000 from "@/assets/storage-unit-cleanout-loading-speed-1000.webp.asset.json";

import realBasementPanel640 from "@/assets/real-basement-panel-640.webp";
import realBasementPanel1000 from "@/assets/real-basement-panel-1000.webp";

const images = {
  [original14]: { src: variant14_1000.url, srcSet: `${variant14_640.url} 640w, ${variant14_700.url} 700w, ${variant14_1000.url} 1000w` },
  [original15]: { src: variant15_1000.url, srcSet: `${variant15_640.url} 640w, ${variant15_700.url} 700w, ${variant15_1000.url} 1000w` },
  [original16]: { src: variant16_1000.url, srcSet: `${variant16_640.url} 640w, ${variant16_700.url} 700w, ${variant16_1000.url} 1000w` },
  [original17]: { src: variant17_1000.url, srcSet: `${variant17_640.url} 640w, ${variant17_700.url} 700w, ${variant17_1000.url} 1000w` },
  [original18]: { src: variant18_1000.url, srcSet: `${variant18_640.url} 640w, ${variant18_700.url} 700w, ${variant18_1000.url} 1000w` },
  [original19]: { src: variant19_1000.url, srcSet: `${variant19_640.url} 640w, ${variant19_700.url} 700w, ${variant19_1000.url} 1000w` },
  [original20]: { src: variant20_1000.url, srcSet: `${variant20_640.url} 640w, ${variant20_700.url} 700w, ${variant20_1000.url} 1000w` },
  [original21]: { src: variant21_1000.url, srcSet: `${variant21_640.url} 640w, ${variant21_700.url} 700w, ${variant21_1000.url} 1000w` },
  [original22]: { src: variant22_1000.url, srcSet: `${variant22_640.url} 640w, ${variant22_700.url} 700w, ${variant22_1000.url} 1000w` },
  [original23]: { src: variant23_1000.url, srcSet: `${variant23_640.url} 640w, ${variant23_700.url} 700w, ${variant23_1000.url} 1000w` },
  [original24]: { src: variant24_1000.url, srcSet: `${variant24_640.url} 640w, ${variant24_700.url} 700w, ${variant24_1000.url} 1000w` },
  [realBasementPanel1000]: { src: realBasementPanel1000, srcSet: `${realBasementPanel640} 640w, ${realBasementPanel1000} 1000w` },
  [original35]: { src: variant35_1000.url, srcSet: `${variant35_640.url} 640w, ${variant35_700.url} 700w, ${variant35_1000.url} 1000w` },
  [original39.url]: { src: variant39_1000.url, srcSet: `${variant39_640.url} 640w, ${variant39_700.url} 700w, ${variant39_1000.url} 1000w` },
  [original40.url]: { src: variant40_1000.url, srcSet: `${variant40_640.url} 640w, ${variant40_700.url} 700w, ${variant40_1000.url} 1000w` },
  [original41.url]: { src: variant41_1000.url, srcSet: `${variant41_640.url} 640w, ${variant41_700.url} 700w, ${variant41_1000.url} 1000w` },
  [original42.url]: { src: variant42_1000.url, srcSet: `${variant42_640.url} 640w, ${variant42_700.url} 700w, ${variant42_1000.url} 1000w` },
};
export const { responsiveImage, heroPreload } = createResponsiveImages(images);
