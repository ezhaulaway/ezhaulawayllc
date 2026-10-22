import { createResponsiveImages } from "./responsive-images";
import original0 from "@/assets/branded-area-aurora.webp";
import variant0_640 from "@/assets/branded-area-aurora-speed-640.webp.asset.json";
import variant0_700 from "@/assets/branded-area-aurora-speed-700.webp.asset.json";
import variant0_1000 from "@/assets/branded-area-aurora-speed-1000.webp.asset.json";
import original1 from "@/assets/branded-area-castle-pines.webp";
import variant1_640 from "@/assets/branded-area-castle-pines-speed-640.webp.asset.json";
import variant1_700 from "@/assets/branded-area-castle-pines-speed-700.webp.asset.json";
import variant1_1000 from "@/assets/branded-area-castle-pines-speed-1000.webp.asset.json";
import original2 from "@/assets/branded-area-castle-rock.webp";
import variant2_640 from "@/assets/branded-area-castle-rock-speed-640.webp.asset.json";
import variant2_700 from "@/assets/branded-area-castle-rock-speed-700.webp.asset.json";
import variant2_1000 from "@/assets/branded-area-castle-rock-speed-1000.webp.asset.json";
import original3 from "@/assets/branded-area-centennial.webp";
import variant3_640 from "@/assets/branded-area-centennial-speed-640.webp.asset.json";
import variant3_700 from "@/assets/branded-area-centennial-speed-700.webp.asset.json";
import variant3_1000 from "@/assets/branded-area-centennial-speed-1000.webp.asset.json";
import original4 from "@/assets/branded-area-denver.webp";
import variant4_640 from "@/assets/branded-area-denver-speed-640.webp.asset.json";
import variant4_700 from "@/assets/branded-area-denver-speed-700.webp.asset.json";
import variant4_1000 from "@/assets/branded-area-denver-speed-1000.webp.asset.json";
import original5 from "@/assets/branded-area-elizabeth.webp";
import variant5_640 from "@/assets/branded-area-elizabeth-speed-640.webp.asset.json";
import variant5_700 from "@/assets/branded-area-elizabeth-speed-700.webp.asset.json";
import variant5_1000 from "@/assets/branded-area-elizabeth-speed-1000.webp.asset.json";
import original6 from "@/assets/branded-area-englewood.webp";
import variant6_640 from "@/assets/branded-area-englewood-speed-640.webp.asset.json";
import variant6_700 from "@/assets/branded-area-englewood-speed-700.webp.asset.json";
import variant6_1000 from "@/assets/branded-area-englewood-speed-1000.webp.asset.json";
import original7 from "@/assets/branded-area-franktown.webp";
import variant7_640 from "@/assets/branded-area-franktown-speed-640.webp.asset.json";
import variant7_700 from "@/assets/branded-area-franktown-speed-700.webp.asset.json";
import variant7_1000 from "@/assets/branded-area-franktown-speed-1000.webp.asset.json";
import original8 from "@/assets/branded-area-highlands-ranch.webp";
import variant8_640 from "@/assets/branded-area-highlands-ranch-speed-640.webp.asset.json";
import variant8_700 from "@/assets/branded-area-highlands-ranch-speed-700.webp.asset.json";
import variant8_1000 from "@/assets/branded-area-highlands-ranch-speed-1000.webp.asset.json";
import original9 from "@/assets/branded-area-lakewood.webp";
import variant9_640 from "@/assets/branded-area-lakewood-speed-640.webp.asset.json";
import variant9_700 from "@/assets/branded-area-lakewood-speed-700.webp.asset.json";
import variant9_1000 from "@/assets/branded-area-lakewood-speed-1000.webp.asset.json";
import original10 from "@/assets/branded-area-littleton.webp";
import variant10_640 from "@/assets/branded-area-littleton-speed-640.webp.asset.json";
import variant10_700 from "@/assets/branded-area-littleton-speed-700.webp.asset.json";
import variant10_1000 from "@/assets/branded-area-littleton-speed-1000.webp.asset.json";
import original11 from "@/assets/branded-area-lone-tree.webp";
import variant11_640 from "@/assets/branded-area-lone-tree-speed-640.webp.asset.json";
import variant11_700 from "@/assets/branded-area-lone-tree-speed-700.webp.asset.json";
import variant11_1000 from "@/assets/branded-area-lone-tree-speed-1000.webp.asset.json";
import original12 from "@/assets/branded-area-parker.webp";
import variant12_640 from "@/assets/branded-area-parker-speed-640.webp.asset.json";
import variant12_700 from "@/assets/branded-area-parker-speed-700.webp.asset.json";
import variant12_1000 from "@/assets/branded-area-parker-speed-1000.webp.asset.json";
import original13 from "@/assets/branded-area-sedalia.webp";
import variant13_640 from "@/assets/branded-area-sedalia-speed-640.webp.asset.json";
import variant13_700 from "@/assets/branded-area-sedalia-speed-700.webp.asset.json";
import variant13_1000 from "@/assets/branded-area-sedalia-speed-1000.webp.asset.json";

const images = {
  [original0]: { src: variant0_1000.url, srcSet: `${variant0_640.url} 640w, ${variant0_700.url} 700w, ${variant0_1000.url} 1000w` },
  [original1]: { src: variant1_1000.url, srcSet: `${variant1_640.url} 640w, ${variant1_700.url} 700w, ${variant1_1000.url} 1000w` },
  [original2]: { src: variant2_1000.url, srcSet: `${variant2_640.url} 640w, ${variant2_700.url} 700w, ${variant2_1000.url} 1000w` },
  [original3]: { src: variant3_1000.url, srcSet: `${variant3_640.url} 640w, ${variant3_700.url} 700w, ${variant3_1000.url} 1000w` },
  [original4]: { src: variant4_1000.url, srcSet: `${variant4_640.url} 640w, ${variant4_700.url} 700w, ${variant4_1000.url} 1000w` },
  [original5]: { src: variant5_1000.url, srcSet: `${variant5_640.url} 640w, ${variant5_700.url} 700w, ${variant5_1000.url} 1000w` },
  [original6]: { src: variant6_1000.url, srcSet: `${variant6_640.url} 640w, ${variant6_700.url} 700w, ${variant6_1000.url} 1000w` },
  [original7]: { src: variant7_1000.url, srcSet: `${variant7_640.url} 640w, ${variant7_700.url} 700w, ${variant7_1000.url} 1000w` },
  [original8]: { src: variant8_1000.url, srcSet: `${variant8_640.url} 640w, ${variant8_700.url} 700w, ${variant8_1000.url} 1000w` },
  [original9]: { src: variant9_1000.url, srcSet: `${variant9_640.url} 640w, ${variant9_700.url} 700w, ${variant9_1000.url} 1000w` },
  [original10]: { src: variant10_1000.url, srcSet: `${variant10_640.url} 640w, ${variant10_700.url} 700w, ${variant10_1000.url} 1000w` },
  [original11]: { src: variant11_1000.url, srcSet: `${variant11_640.url} 640w, ${variant11_700.url} 700w, ${variant11_1000.url} 1000w` },
  [original12]: { src: variant12_1000.url, srcSet: `${variant12_640.url} 640w, ${variant12_700.url} 700w, ${variant12_1000.url} 1000w` },
  [original13]: { src: variant13_1000.url, srcSet: `${variant13_640.url} 640w, ${variant13_700.url} 700w, ${variant13_1000.url} 1000w` },
};
export const { responsiveImage, heroPreload } = createResponsiveImages(images);
