import { createResponsiveImages } from "./responsive-images";
import original0 from "@/assets/branded-area-aurora.webp";
import hq0_800 from "@/assets/branded-area-aurora-hq-800.webp";
import hq0_1200 from "@/assets/branded-area-aurora-hq-1200.webp";
import original1 from "@/assets/branded-area-castle-pines.webp";
import hq1_800 from "@/assets/branded-area-castle-pines-hq-800.webp";
import hq1_1200 from "@/assets/branded-area-castle-pines-hq-1200.webp";
import original2 from "@/assets/branded-area-castle-rock.webp";
import hq2_800 from "@/assets/branded-area-castle-rock-hq-800.webp";
import hq2_1200 from "@/assets/branded-area-castle-rock-hq-1200.webp";
import original3 from "@/assets/branded-area-centennial.webp";
import hq3_800 from "@/assets/branded-area-centennial-hq-800.webp";
import hq3_1200 from "@/assets/branded-area-centennial-hq-1200.webp";
import original4 from "@/assets/branded-area-denver.webp";
import hq4_800 from "@/assets/branded-area-denver-hq-800.webp";
import hq4_1200 from "@/assets/branded-area-denver-hq-1200.webp";
import original5 from "@/assets/branded-area-elizabeth.webp";
import hq5_800 from "@/assets/branded-area-elizabeth-hq-800.webp";
import hq5_1200 from "@/assets/branded-area-elizabeth-hq-1200.webp";
import original6 from "@/assets/branded-area-englewood.webp";
import hq6_800 from "@/assets/branded-area-englewood-hq-800.webp";
import hq6_1200 from "@/assets/branded-area-englewood-hq-1200.webp";
import original7 from "@/assets/branded-area-franktown.webp";
import hq7_800 from "@/assets/branded-area-franktown-hq-800.webp";
import hq7_1200 from "@/assets/branded-area-franktown-hq-1200.webp";
import original8 from "@/assets/branded-area-highlands-ranch.webp";
import hq8_800 from "@/assets/branded-area-highlands-ranch-hq-800.webp";
import hq8_1200 from "@/assets/branded-area-highlands-ranch-hq-1200.webp";
import original9 from "@/assets/branded-area-lakewood.webp";
import hq9_800 from "@/assets/branded-area-lakewood-hq-800.webp";
import hq9_1200 from "@/assets/branded-area-lakewood-hq-1200.webp";
import original10 from "@/assets/branded-area-littleton.webp";
import hq10_800 from "@/assets/branded-area-littleton-hq-800.webp";
import hq10_1200 from "@/assets/branded-area-littleton-hq-1200.webp";
import original11 from "@/assets/branded-area-lone-tree.webp";
import hq11_800 from "@/assets/branded-area-lone-tree-hq-800.webp";
import hq11_1200 from "@/assets/branded-area-lone-tree-hq-1200.webp";
import original12 from "@/assets/branded-area-parker.webp";
import hq12_800 from "@/assets/branded-area-parker-hq-800.webp";
import hq12_1200 from "@/assets/branded-area-parker-hq-1200.webp";
import original13 from "@/assets/branded-area-sedalia.webp";
import hq13_800 from "@/assets/branded-area-sedalia-hq-800.webp";
import hq13_1200 from "@/assets/branded-area-sedalia-hq-1200.webp";

const images = {
  [original0]: { src: hq0_1200, srcSet: `${hq0_800} 800w, ${hq0_1200} 1200w` },
  [original1]: { src: hq1_1200, srcSet: `${hq1_800} 800w, ${hq1_1200} 1200w` },
  [original2]: { src: hq2_1200, srcSet: `${hq2_800} 800w, ${hq2_1200} 1200w` },
  [original3]: { src: hq3_1200, srcSet: `${hq3_800} 800w, ${hq3_1200} 1200w` },
  [original4]: { src: hq4_1200, srcSet: `${hq4_800} 800w, ${hq4_1200} 1200w` },
  [original5]: { src: hq5_1200, srcSet: `${hq5_800} 800w, ${hq5_1200} 1200w` },
  [original6]: { src: hq6_1200, srcSet: `${hq6_800} 800w, ${hq6_1200} 1200w` },
  [original7]: { src: hq7_1200, srcSet: `${hq7_800} 800w, ${hq7_1200} 1200w` },
  [original8]: { src: hq8_1200, srcSet: `${hq8_800} 800w, ${hq8_1200} 1200w` },
  [original9]: { src: hq9_1200, srcSet: `${hq9_800} 800w, ${hq9_1200} 1200w` },
  [original10]: { src: hq10_1200, srcSet: `${hq10_800} 800w, ${hq10_1200} 1200w` },
  [original11]: { src: hq11_1200, srcSet: `${hq11_800} 800w, ${hq11_1200} 1200w` },
  [original12]: { src: hq12_1200, srcSet: `${hq12_800} 800w, ${hq12_1200} 1200w` },
  [original13]: { src: hq13_1200, srcSet: `${hq13_800} 800w, ${hq13_1200} 1200w` },
};
export const { responsiveImage, heroPreload } = createResponsiveImages(images);
