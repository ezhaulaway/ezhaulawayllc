import areaAurora from "@/assets/branded-area-aurora.webp";
import areaCastlePines from "@/assets/branded-area-castle-pines.webp";
import areaCastleRock from "@/assets/branded-area-castle-rock.webp";
import areaCentennial from "@/assets/branded-area-centennial.webp";
import areaDenver from "@/assets/branded-area-denver.webp";
import areaElizabeth from "@/assets/branded-area-elizabeth.webp";
import areaEnglewood from "@/assets/branded-area-englewood.webp";
import areaFranktown from "@/assets/branded-area-franktown.webp";
import areaHighlandsRanch from "@/assets/branded-area-highlands-ranch.webp";
import areaLakewood from "@/assets/branded-area-lakewood.webp";
import areaLittleton from "@/assets/branded-area-littleton.webp";
import areaLoneTree from "@/assets/branded-area-lone-tree.webp";
import areaParker from "@/assets/branded-area-parker.webp";
import areaSedalia from "@/assets/branded-area-sedalia.webp";

export type LocationPhoto = {
  /** Bundled image URL. */
  src: string;
  /** Keyword-rich alt text — city + service + CO. */
  alt: string;
  /** Short on-page caption shown under the photo. */
  caption: string;
};

export const locationPhotos: Record<string, LocationPhoto> = {
  parker: {
    src: areaParker,
    alt: "EZ Haulaway dump trailer loaded during a residential garage cleanout in Parker, CO",
    caption:
      "Illustrated service example: Garage cleanout in Parker, CO — our 14-yard dump trailer loaded with household junk, boxes and old furniture in a single visit.",
  },
  "castle-rock": {
    src: areaCastleRock,
    alt: "Junk removal trailer loaded with old fence panels and yard debris on a Castle Rock, CO property",
    caption:
      "Illustrated service example: Castle Rock, CO acreage cleanup — fence tear-out, shed lumber and landscaping debris hauled off in one load.",
  },
  centennial: {
    src: areaCentennial,
    alt: "Appliance and remodel debris removal in a Centennial, CO driveway by EZ Haulaway",
    caption:
      "Illustrated service example: Centennial, CO remodel cleanout — old cabinets, a dishwasher and a refrigerator loaded straight from the driveway.",
  },
  "highlands-ranch": {
    src: areaHighlandsRanch,
    alt: "Couch, mattress and treadmill removal from a Highlands Ranch, CO basement cleanout",
    caption:
      "Illustrated service example: Highlands Ranch, CO basement cleanout — sectional couch, mattress and treadmill carried out and hauled away.",
  },
  "lone-tree": {
    src: areaLoneTree,
    alt: "Commercial office furniture removal in Lone Tree, CO by EZ Haulaway",
    caption:
      "Illustrated service example: Lone Tree, CO office cleanout — desks, chairs and filing cabinets cleared after hours with no downtime.",
  },
  denver: {
    src: areaDenver,
    alt: "Furniture and mattress junk removal in a Denver, CO alley behind an older home",
    caption:
      "Illustrated service example: Denver, CO alley pickup — couch, mattress and household junk loaded from a tight-access city property.",
  },
  aurora: {
    src: areaAurora,
    alt: "Estate cleanout junk removal at the curb of an Aurora, CO home",
    caption:
      "Illustrated service example: Aurora, CO estate cleanout — furniture, boxes and appliances removed for a rental turnover.",
  },
  littleton: {
    src: areaLittleton,
    alt: "Old deck demolition debris loaded for removal at a Littleton, CO home",
    caption:
      "Illustrated service example: Littleton, CO deck tear-out — old boards, railings and framing demolished and hauled in the same visit.",
  },
  englewood: {
    src: areaEnglewood,
    alt: "Crew carrying a couch out for junk removal at an Englewood, CO home",
    caption:
      "Illustrated service example: Englewood, CO furniture removal — hand-carried out of a tight older property, no curbside prep needed.",
  },
  lakewood: {
    src: areaLakewood,
    alt: "Yard and landscaping debris removal in Lakewood, CO by EZ Haulaway",
    caption:
      "Illustrated service example: Lakewood, CO yard debris haul — branches, brush and old landscape timbers loaded from the driveway.",
  },
  elizabeth: {
    src: areaElizabeth,
    alt: "Rural property cleanout with scrap metal and lumber in Elizabeth, CO",
    caption:
      "Illustrated service example: Elizabeth, CO property cleanout — scrap metal, outbuilding lumber and stored junk cleared from acreage.",
  },
  franktown: {
    src: areaFranktown,
    alt: "Shed demolition and fence removal debris on a Franktown, CO acreage property",
    caption:
      "Illustrated service example: Franktown, CO shed demolition — old outbuilding torn down, fence posts and brush hauled out together.",
  },
  "castle-pines": {
    src: areaCastlePines,
    alt: "Furniture and mattress removal at a Castle Pines, CO home",
    caption:
      "Illustrated service example: Castle Pines, CO furniture swap — old sofa, mattress and moving boxes gone the same week.",
  },
  sedalia: {
    src: areaSedalia,
    alt: "Appliance and yard debris removal at a rural Sedalia, CO mountain home",
    caption:
      "Illustrated service example: Sedalia, CO appliance haul-away — washer, water heater and yard debris off a steep gravel drive.",
  },
};

export const locationPhoto = (slug: string): LocationPhoto | undefined => locationPhotos[slug];
