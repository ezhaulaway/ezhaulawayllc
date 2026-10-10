// Pricing source of truth — from the EZ Haulaway printed price guides.
// Trailer: 16' x 8' x 3' dump trailer, approx. 14 cubic yards.

export const TRAILER_SPEC = {
  length: "16'",
  width: "8'",
  height: "3'",
  cubicYards: 14,
};

export const MINIMUM_CHARGE = 150;
export const LABOR_RATE = 50; // per hour, per crew member

export type LoadLevel = {
  /** eighths of trailer filled; 0 = minimum / small load */
  eighths: number;
  label: string;
  shortLabel: string;
  volume: string;
  price: number;
};

export const LOAD_LEVELS: LoadLevel[] = [
  { eighths: 0, label: "Minimum / small load", shortLabel: "Min", volume: "Small pickup", price: 150 },
  { eighths: 1, label: "1/8 trailer", shortLabel: "⅛", volume: "1.75 yd³", price: 175 },
  { eighths: 2, label: "1/4 trailer", shortLabel: "¼", volume: "3.5 yd³", price: 275 },
  { eighths: 3, label: "3/8 trailer", shortLabel: "⅜", volume: "5.25 yd³", price: 350 },
  { eighths: 4, label: "1/2 trailer", shortLabel: "½", volume: "7.0 yd³", price: 450 },
  { eighths: 5, label: "5/8 trailer", shortLabel: "⅝", volume: "8.75 yd³", price: 550 },
  { eighths: 6, label: "3/4 trailer", shortLabel: "¾", volume: "10.5 yd³", price: 650 },
  { eighths: 7, label: "7/8 trailer", shortLabel: "⅞", volume: "12.25 yd³", price: 725 },
  { eighths: 8, label: "Full trailer", shortLabel: "Full", volume: "14 yd³", price: 800 },
];


export type SpecialtyItem = { item: string; price: string };

export const SPECIALTY_ITEMS: SpecialtyItem[] = [
  { item: "AC unit", price: "$50–$75" },
  { item: "Aquarium", price: "$100" },
  { item: "Basketball hoop and stand", price: "$125" },
  { item: "Bicycle (adult size)", price: "$40" },
  { item: "Bookshelf", price: "$50" },
  { item: "Box spring", price: "$75" },
  { item: "BBQ grill", price: "$75" },
  { item: "Cabinet / bottom of hutch", price: "$85" },
  { item: "Cable machine", price: "$150–$250" },
  { item: "Chair — office", price: "$40" },
  { item: "Chair — recliner", price: "$85" },
  { item: "Chest freezer", price: "$100" },
  { item: "Computer monitor", price: "$40" },
  { item: "Copier / printer — commercial", price: "$150" },
  { item: "Couch", price: "$60 per cushion" },
  { item: "Dehumidifier", price: "$50–$65" },
  { item: "Desk (large)", price: "$100" },
  { item: "Desk (small)", price: "$75" },
  { item: "Dining room set (table + 4 chairs)", price: "$150" },
  { item: "Dining room set (table + 6 chairs)", price: "$200" },
  { item: "Dishwasher", price: "$75" },
  { item: "Dresser / bureau", price: "$85" },
  { item: "Elliptical", price: "$100–$150" },
  { item: "Entertainment center", price: "$175" },
  { item: "Filing cabinet (small)", price: "$50" },
  { item: "Filing cabinet (tall)", price: "$100" },
  { item: "Freezer (large)", price: "$125" },
  { item: "Furnace", price: "$350–$400" },
  { item: "Futon", price: "$100" },
  { item: "Hockey / lacrosse net", price: "$60" },
  { item: "Hot tub", price: "Starting at $500" },
  { item: "Hutch (dining room)", price: "$300–$400" },
  { item: "Lawn mower (push)", price: "$50" },
  { item: "Lawn mower (ride-on)", price: "Starting at $225" },
  { item: "Mattress", price: "$100" },
  { item: "Mini freezer", price: "$50" },
  { item: "Mini fridge", price: "$60" },
  { item: "Mirror", price: "$25" },
  { item: "Ottoman", price: "$40" },
  { item: "Pallet", price: "$30" },
  { item: "Piano", price: "Starting at $375" },
  { item: "Printer (home)", price: "$30" },
  { item: "Propane tank", price: "$30" },
  { item: "Refrigerator (full size)", price: "$125" },
  { item: "Refrigerator (side by side)", price: "$150" },
  { item: "Stationary bike", price: "$75" },
  { item: "Stove", price: "$85" },
  { item: "Swing set", price: "Starting at $300" },
  { item: "Table (coffee)", price: "$50" },
  { item: "Table (night stand)", price: "$30" },
  { item: "Table (dining room)", price: "$100" },
  { item: "Treadmill", price: "$150" },
  { item: "Trash bag (average)", price: "$50" },
  { item: "Washer / dryer (each)", price: "$100" },
  { item: "Water heater", price: "$125" },
  { item: "Workbench in basement", price: "$200" },
];
