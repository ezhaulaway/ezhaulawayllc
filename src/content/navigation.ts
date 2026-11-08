import { SERVICE_AREAS } from "@/content/service-areas";

/** Lightweight link identities. Cities come from the service-area list; names stay aligned with service content. */
export const services: Array<{ slug: string; name: string; cityPages?: false }> = [
  { slug: "furniture-removal", name: "Furniture Removal" },
  { slug: "appliance-removal", name: "Appliance Removal" },
  { slug: "hot-tub-removal", name: "Hot Tub Removal" },
  { slug: "light-demolition", name: "Light Demolition" },
  { slug: "deck-and-fence-removal", name: "Deck & Fence Removal" },
  { slug: "construction-debris-removal", name: "Construction Debris Removal" },
  { slug: "yard-and-landscaping-debris", name: "Yard & Landscaping Debris" },
  { slug: "garage-cleanouts", name: "Garage Cleanouts" },
  { slug: "house-and-estate-cleanouts", name: "House & Estate Cleanouts" },
  { slug: "mattress-and-bulky-item-removal", name: "Mattress & Bulky Item Removal" },
  { slug: "electronics-and-e-waste-removal", name: "Electronics & E-Waste Removal" },
  { slug: "shed-removal", name: "Shed Removal" },
  { slug: "commercial-junk-removal", name: "Commercial Junk Removal" },
  { slug: "wood-pallet-removal", name: "Wood Pallet Removal", cityPages: false },
  { slug: "dumpster-rental-alternative", name: "Dumpster Rental Alternative", cityPages: false },
  { slug: "hoarder-cleanout", name: "Hoarder Cleanout", cityPages: false },
  { slug: "storage-unit-cleanout", name: "Storage Unit Cleanout", cityPages: false },
  { slug: "eviction-cleanout-and-trash-out", name: "Eviction Cleanout & Trash Out", cityPages: false },
  { slug: "apartment-make-ready-haul-off", name: "Apartment Make-Ready Haul-Off", cityPages: false },
  { slug: "basement-and-attic-cleanouts", name: "Basement & Attic Cleanouts", cityPages: false },
  { slug: "realtor-and-attorney-cleanouts", name: "Cleanouts for Realtors & Attorneys", cityPages: false },
];

export const locations = SERVICE_AREAS.map(({ slug, city }) => ({ slug, city }));