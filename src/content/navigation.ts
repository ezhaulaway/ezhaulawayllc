import { SERVICE_AREAS } from "@/content/service-areas";

/** Lightweight link identities. Cities come from the service-area list; names stay aligned with service content. */
export const services: Array<{ slug: string; name: string; cityPages?: false }> = [
  { slug: "furniture-removal", name: "Furniture Removal" },
  { slug: "appliance-removal", name: "Appliance Removal" },
  { slug: "hot-tub-removal", name: "Hot Tub Removal" },
  { slug: "light-demolition", name: "Light Demolition" },
  { slug: "deck-removal", name: "Deck Removal" },
  { slug: "fence-removal", name: "Fence Removal", cityPages: false },
  { slug: "construction-debris-removal", name: "Construction Debris Removal" },
  { slug: "yard-and-landscaping-debris", name: "Yard & Landscaping Debris" },
  { slug: "sod-and-lawn-removal", name: "Sod & Lawn Removal", cityPages: false },
  { slug: "dirt-rock-mulch-delivery", name: "Dirt, Rock & Mulch Delivery", cityPages: false },
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
  { slug: "rental-cleanout-and-make-ready", name: "Rental Cleanout & Make-Ready", cityPages: false },
];

export const locations = SERVICE_AREAS.map(({ slug, city }) => ({ slug, city }));