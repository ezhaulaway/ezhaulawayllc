import { createResponsiveImages } from "./responsive-images";
import original14 from "@/assets/branded-service-appliance.webp";
import hq14_800 from "@/assets/branded-service-appliance-hq-800.webp";
import hq14_1200 from "@/assets/branded-service-appliance-hq-1200.webp";
import original15 from "@/assets/branded-service-commercial.webp";
import hq15_800 from "@/assets/branded-service-commercial-hq-800.webp";
import hq15_1200 from "@/assets/branded-service-commercial-hq-1200.webp";
import original16 from "@/assets/branded-service-construction.webp";
import hq16_800 from "@/assets/branded-service-construction-hq-800.webp";
import hq16_1200 from "@/assets/branded-service-construction-hq-1200.webp";
import original17 from "@/assets/branded-service-deck.webp";
import hq17_800 from "@/assets/branded-service-deck-hq-800.webp";
import hq17_1200 from "@/assets/branded-service-deck-hq-1200.webp";
import original18 from "@/assets/branded-service-demolition.webp";
import hq18_800 from "@/assets/branded-service-demolition-hq-800.webp";
import hq18_1200 from "@/assets/branded-service-demolition-hq-1200.webp";
import original19 from "@/assets/branded-service-electronics.webp";
import hq19_800 from "@/assets/branded-service-electronics-hq-800.webp";
import hq19_1200 from "@/assets/branded-service-electronics-hq-1200.webp";
import original20 from "@/assets/branded-service-estate.webp";
import hq20_800 from "@/assets/branded-service-estate-hq-800.webp";
import hq20_1200 from "@/assets/branded-service-estate-hq-1200.webp";
import original21 from "@/assets/branded-service-furniture.webp";
import hq21_800 from "@/assets/branded-service-furniture-hq-800.webp";
import hq21_1200 from "@/assets/branded-service-furniture-hq-1200.webp";
import original22 from "@/assets/branded-service-hot-tub.webp";
import hq22_800 from "@/assets/branded-service-hot-tub-hq-800.webp";
import hq22_1200 from "@/assets/branded-service-hot-tub-hq-1200.webp";
import original23 from "@/assets/branded-service-shed.webp";
import hq23_800 from "@/assets/branded-service-shed-hq-800.webp";
import hq23_1200 from "@/assets/branded-service-shed-hq-1200.webp";
import original24 from "@/assets/branded-service-yard.webp";
import hq24_800 from "@/assets/branded-service-yard-hq-800.webp";
import hq24_1200 from "@/assets/branded-service-yard-hq-1200.webp";
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
  [original14]: { src: hq14_1200, srcSet: `${hq14_800} 800w, ${hq14_1200} 1200w` },
  [original15]: { src: hq15_1200, srcSet: `${hq15_800} 800w, ${hq15_1200} 1200w` },
  [original16]: { src: hq16_1200, srcSet: `${hq16_800} 800w, ${hq16_1200} 1200w` },
  [original17]: { src: hq17_1200, srcSet: `${hq17_800} 800w, ${hq17_1200} 1200w` },
  [original18]: { src: hq18_1200, srcSet: `${hq18_800} 800w, ${hq18_1200} 1200w` },
  [original19]: { src: hq19_1200, srcSet: `${hq19_800} 800w, ${hq19_1200} 1200w` },
  [original20]: { src: hq20_1200, srcSet: `${hq20_800} 800w, ${hq20_1200} 1200w` },
  [original21]: { src: hq21_1200, srcSet: `${hq21_800} 800w, ${hq21_1200} 1200w` },
  [original22]: { src: hq22_1200, srcSet: `${hq22_800} 800w, ${hq22_1200} 1200w` },
  [original23]: { src: hq23_1200, srcSet: `${hq23_800} 800w, ${hq23_1200} 1200w` },
  [original24]: { src: hq24_1200, srcSet: `${hq24_800} 800w, ${hq24_1200} 1200w` },
  [realBasementPanel1000]: { src: realBasementPanel1000, srcSet: `${realBasementPanel640} 640w, ${realBasementPanel1000} 1000w` },
  [original35]: { src: variant35_1000.url, srcSet: `${variant35_640.url} 640w, ${variant35_700.url} 700w, ${variant35_1000.url} 1000w, ${original35} 1200w` },
  [original39.url]: { src: variant39_1000.url, srcSet: `${variant39_640.url} 640w, ${variant39_700.url} 700w, ${variant39_1000.url} 1000w, ${original39.url} 1620w` },
  [original40.url]: { src: variant40_1000.url, srcSet: `${variant40_640.url} 640w, ${variant40_700.url} 700w, ${variant40_1000.url} 1000w` },
  [original41.url]: { src: variant41_1000.url, srcSet: `${variant41_640.url} 640w, ${variant41_700.url} 700w, ${variant41_1000.url} 1000w, ${original41.url} 1620w` },
  [original42.url]: { src: variant42_1000.url, srcSet: `${variant42_640.url} 640w, ${variant42_700.url} 700w, ${variant42_1000.url} 1000w, ${original42.url} 1620w` },
};
export const { responsiveImage, heroPreload } = createResponsiveImages(images);
