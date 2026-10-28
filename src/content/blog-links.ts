/**
 * Internal links between the blog and the main site, so blog posts are not orphaned.
 * Posts are synced automatically from the blog service; any new post that is not listed
 * here falls back to the keyword-based suggestions in components/next-steps.tsx.
 */
export const BLOG_TITLES: Record<string, string> = {
  "fence-removal-cost": "Fence Removal Cost in 2026: Per Foot, by Material, and in Denver",
  "furniture-disposal-denver": "Furniture Disposal in Denver: Every Option, Cost and Rule",
  "eco-friendly-junk-removal": "Eco-Friendly Junk Removal: What It Means and How to Do It in Denver",
  "junk-removal-cost": "Junk Removal Cost: What You'll Pay in Denver in 2026",
  "do-you-tip-junk-haulers": "Do You Tip Junk Haulers? What's Normal and How Much",
  "basement-cleanout-cost": "Basement Cleanout Cost: What You'll Pay in 2026",
  "concrete-disposal-denver": "Concrete Disposal in Douglas County: Where It Goes and What It Costs",
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
  "/services/basement-and-attic-cleanouts": "Basement & attic cleanouts",
  "/services/house-and-estate-cleanouts": "House & estate cleanouts",
  "/services/construction-debris-removal": "Construction debris removal",
  "/services/light-demolition": "Light demolition",
  "/services/appliance-removal": "Appliance removal",
  "/services/yard-and-landscaping-debris": "Yard & landscaping debris removal",
  "/services/deck-and-fence-removal": "Deck & fence removal",
  "/services/commercial-junk-removal": "Commercial junk removal",
  "/services/electronics-and-e-waste-removal": "Electronics & e-waste removal",
  "/services/furniture-removal": "Furniture removal",
};

/** "Related services" links shown at the bottom of each post (2 to 3 each). */
export const BLOG_RELATED: Record<string, string[]> = {
  "junk-removal-cost": ["/pricing", "/instant-estimate", "/how-it-works"],
  "basement-cleanout-cost": ["/services/basement-and-attic-cleanouts", "/pricing"],
  "crawl-space-cleanout": ["/services/basement-and-attic-cleanouts", "/services/house-and-estate-cleanouts"],
  "how-to-prepare-for-junk-removal": ["/how-it-works", "/faq", "/what-we-take"],
  "do-you-tip-junk-haulers": ["/faq", "/about"],
  "eco-friendly-junk-removal": ["/what-we-take", "/about"],
  "concrete-disposal-denver": ["/services/construction-debris-removal", "/services/light-demolition"],
  "air-conditioner-disposal": ["/services/appliance-removal", "/what-we-take"],
  "lawn-mower-disposal": ["/services/yard-and-landscaping-debris", "/what-we-take"],
  "above-ground-pool-removal": ["/services/light-demolition", "/services/deck-and-fence-removal"],
  "office-cleanout-denver": ["/services/commercial-junk-removal", "/services/electronics-and-e-waste-removal"],
  "fence-removal-cost": ["/services/deck-and-fence-removal", "/pricing"],
  "furniture-disposal-denver": ["/services/furniture-removal", "/service-areas/denver"],
};

/** "Helpful guides" blocks (max 2 posts) shown near the bottom of main-site pages. */
export const PAGE_GUIDES: Record<string, string[]> = {
  "/pricing": ["junk-removal-cost", "basement-cleanout-cost"],
  "/faq": ["how-to-prepare-for-junk-removal", "do-you-tip-junk-haulers"],
  "/how-it-works": ["how-to-prepare-for-junk-removal"],
  "/about": ["eco-friendly-junk-removal"],
  "/services/basement-and-attic-cleanouts": ["basement-cleanout-cost", "crawl-space-cleanout"],
  "/services/appliance-removal": ["air-conditioner-disposal"],
  "/services/construction-debris-removal": ["concrete-disposal-denver"],
  "/services/yard-and-landscaping-debris": ["lawn-mower-disposal"],
  "/services/light-demolition": ["above-ground-pool-removal"],
  "/services/commercial-junk-removal": ["office-cleanout-denver"],
  "/services/deck-and-fence-removal": ["fence-removal-cost"],
  "/services/furniture-removal": ["furniture-disposal-denver"],
};
