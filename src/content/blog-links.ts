/**
 * Internal links between the blog and the main site, so blog posts are not orphaned.
 * Posts are synced automatically from the blog service; any new post that is not listed
 * here falls back to the keyword-based suggestions in components/next-steps.tsx.
 */
export const BLOG_TITLES: Record<string, string> = {
  "fence-removal-cost": "Fence Removal Cost in 2026: Per Foot, by Material, and in Denver",
  "deck-removal-cost": "Deck Removal Cost in 2026: Prices, Factors and Hauling",
  "shed-removal-cost": "Shed Removal Cost in Denver: What You'll Pay",
  "hot-tub-removal-cost": "Hot Tub Removal Cost: What to Expect in Denver and Parker",
  "yard-waste-removal-cost": "Yard Waste Removal Cost: What You'll Pay in 2026",
  "dirt-removal-denver": "Dirt Removal in Douglas County: Options, Rules and Costs",
  "tree-limb-disposal": "Tree Limb Disposal in Denver: Every Option, Rules and Costs",
  "apartment-cleanout-cost": "Apartment Cleanout Cost: What to Expect in 2026",
  "previous-owner-left-junk": "Previous Owner Left Junk Behind? What to Do After Closing",
  "furniture-disposal-denver": "Furniture Disposal in Denver: Every Option, Cost and Rule",
  "eco-friendly-junk-removal":
    "Eco-Friendly Junk Removal: What It Means and How to Do It in Denver",
  "junk-removal-cost": "Junk Removal Cost: What You'll Pay in Denver in 2026",
  "do-you-tip-junk-haulers": "Do You Tip Junk Haulers? What's Normal and How Much",
  "basement-cleanout-cost": "Basement Cleanout Cost: What You'll Pay in 2026",
  "concrete-disposal-denver":
    "Concrete Disposal in Douglas County: Where It Goes and What It Costs",
  "how-to-prepare-for-junk-removal": "How to Prepare for Junk Removal: A Step-by-Step Checklist",
  "air-conditioner-disposal": "Air Conditioner Disposal: Legal, Free and Paid Ways to Do It",
  "crawl-space-cleanout": "Crawl Space Cleanout for Homeowners: Clear It Before Encapsulation",
  "lawn-mower-disposal": "Lawn Mower Disposal: Drain Fluids, Then Hire a Local U.S. Hauler",
  "above-ground-pool-removal": "Pool Removal Costs: Photo Quotes for Above Ground Pool Owners",
  "office-cleanout-denver": "Denver Office Cleanouts: 4 E-Waste Types Businesses Can’t Landfill",
};

/** Descriptive anchor text for each page a post can point to. */
export const LINK_LABELS: Record<string, string> = {
  "/pricing": "Junk removal pricing",
  "/instant-estimate": "Get an instant estimate",
  "/how-it-works": "How junk removal works",
  "/faq": "Junk removal FAQ",
  "/about": "About the EZ Haulaway crew",
  "/what-we-take": "What we haul away",
  "/service-areas/denver": "Junk removal in Denver",
  "/services/house-and-estate-cleanouts": "House & estate cleanouts",
  "/services/rental-cleanout-and-make-ready": "Rental cleanouts and make-ready haul-off",
  "/services/construction-debris-removal": "Construction debris removal",
  "/services/light-demolition": "Light demolition",
  "/services/appliance-removal": "Appliance removal",
  "/services/yard-and-landscaping-debris": "Yard & landscaping debris removal",
  "/services/sod-and-lawn-removal": "Sod and lawn removal",
  "/services/dirt-rock-mulch-delivery": "Dirt, rock, and mulch delivery",
  "/services/deck-removal": "Deck removal",
  "/services/fence-removal": "Fence removal",
  "/services/shed-removal": "Shed removal",
  "/services/hot-tub-removal": "Hot tub removal",
  "/services/commercial-junk-removal": "Commercial junk removal",
  "/services/electronics-and-e-waste-removal": "Electronics & e-waste removal",
  "/services/furniture-removal": "Furniture removal",
};

/** "Related services" links shown at the bottom of each post (2 to 3 each). */
export const BLOG_RELATED: Record<string, string[]> = {
  "junk-removal-cost": ["/pricing", "/instant-estimate", "/how-it-works"],
  "basement-cleanout-cost": ["/services/house-and-estate-cleanouts", "/instant-estimate"],
  "crawl-space-cleanout": ["/services/house-and-estate-cleanouts", "/instant-estimate"],
  "how-to-prepare-for-junk-removal": ["/how-it-works", "/faq", "/what-we-take"],
  "do-you-tip-junk-haulers": ["/faq", "/about"],
  "eco-friendly-junk-removal": ["/what-we-take", "/about"],
  "concrete-disposal-denver": [
    "/services/construction-debris-removal",
    "/services/light-demolition",
  ],
  "air-conditioner-disposal": ["/services/appliance-removal", "/what-we-take"],
  "lawn-mower-disposal": ["/services/yard-and-landscaping-debris", "/what-we-take"],
  "above-ground-pool-removal": ["/services/light-demolition", "/instant-estimate"],
  "office-cleanout-denver": [
    "/services/commercial-junk-removal",
    "/services/electronics-and-e-waste-removal",
  ],
  "fence-removal-cost": ["/services/fence-removal", "/instant-estimate"],
  "deck-removal-cost": ["/services/deck-removal", "/instant-estimate"],
  "shed-removal-cost": ["/services/shed-removal", "/instant-estimate"],
  "hot-tub-removal-cost": ["/services/hot-tub-removal", "/instant-estimate"],
  "yard-waste-removal-cost": [
    "/services/yard-and-landscaping-debris",
    "/services/sod-and-lawn-removal",
  ],
  "dirt-removal-denver": [
    "/services/dirt-rock-mulch-delivery",
    "/services/yard-and-landscaping-debris",
  ],
  "tree-limb-disposal": ["/services/yard-and-landscaping-debris", "/instant-estimate"],
  "apartment-cleanout-cost": ["/services/rental-cleanout-and-make-ready", "/instant-estimate"],
  "furniture-disposal-denver": ["/services/furniture-removal", "/service-areas/denver"],
  "christmas-tree-disposal": ["/services/yard-and-landscaping-debris", "/instant-estimate"],
};

/** Full document title and meta description for a post whose synced title is a weak snippet. */
export const BLOG_HEAD_OVERRIDES: Record<string, { title: string; description: string }> = {
  "furniture-disposal-denver": {
    title: "Furniture Disposal in Denver, CO | Costs & Options",
    description:
      "Furniture disposal in Denver: city large-item pickup, donation rules, drop-off, and what a paid haul-away costs. How to choose and how to prepare.",
  },
};

/** Short quote prompt shown at the top of a post, for posts that already rank for hauling-away searches. */
export const BLOG_CALLOUTS: Record<string, { text: string; href: string; label: string }> = {
  "furniture-disposal-denver": {
    text: "Skip the heavy lifting. We carry furniture out of homes and offices across Denver and Parker and haul it away in one visit.",
    href: "/services/furniture-removal",
    label: "See furniture removal in Denver",
  },
};

/** "Helpful guides" blocks (max 2 posts) shown near the bottom of main-site pages. */
export const PAGE_GUIDES: Record<string, string[]> = {
  "/pricing": ["junk-removal-cost", "basement-cleanout-cost"],
  "/faq": ["how-to-prepare-for-junk-removal", "do-you-tip-junk-haulers"],
  "/how-it-works": ["how-to-prepare-for-junk-removal"],
  "/about": ["eco-friendly-junk-removal"],
  "/services/house-and-estate-cleanouts": ["basement-cleanout-cost", "previous-owner-left-junk"],
  "/services/appliance-removal": ["air-conditioner-disposal"],
  "/services/construction-debris-removal": ["concrete-disposal-denver"],
  "/services/yard-and-landscaping-debris": ["yard-waste-removal-cost", "tree-limb-disposal"],
  "/services/sod-and-lawn-removal": ["yard-waste-removal-cost"],
  "/services/dirt-rock-mulch-delivery": ["dirt-removal-denver"],
  "/services/light-demolition": ["above-ground-pool-removal"],
  "/services/deck-removal": ["deck-removal-cost"],
  "/services/fence-removal": ["fence-removal-cost"],
  "/services/shed-removal": ["shed-removal-cost"],
  "/services/hot-tub-removal": ["hot-tub-removal-cost"],
  "/services/rental-cleanout-and-make-ready": ["apartment-cleanout-cost"],
  "/services/commercial-junk-removal": ["office-cleanout-denver"],
  "/services/furniture-removal": ["furniture-disposal-denver"],
};
