# Multi-Page Build: EZ Haulaway vs. Jolly Junk & V&J Junk Removal

## What the two competitors are doing

I scanned both sites in full.

**Jolly Junk (jollyjunk.com)** — ~63 pages.
- Hub pages: How It Works, What We Take, Service Areas, Book Now, Contact Us, Privacy Policy.
- ~20 service pages, each its own URL: appliance removal, furniture removal, carpet removal, hot tub removal, light demolition, construction debris, yard debris, trash, garage / house / basement / attic / storage-unit cleanouts, office furniture, fence removal, deck / shed / playset / small-building demolition.
- ~37 city pages (Denver, Aurora, Parker, Littleton, Centennial, Castle Rock, Lakewood, Arvada, Thornton, Golden, Lone Tree, Highlands Ranch, and many more), each with a paragraph of real local color.
- Strong signals: a 6-step "how our service works", an online booking button with a $20 discount, a live Google review feed (4.9 / 1,096 reviews), and heavy internal linking between service pages and city pages.
- Weak spots: no pricing page at all, dated design, thin repetitive city copy, some links still point at their old staging domain.

**V&J Junk Removal (vjjunkremoval.com)** — ~80 pages.
- Hub pages: How It Works, What We Take, Pricing, Service Area, Get an Estimate, Contact Us, plus Privacy / Terms / Acceptable Use.
- ~60 very specific item pages under `/what-we-take/` (mattress, box spring, hot tub, exercise equipment, TV & monitor, e-waste, concrete, drywall, shingles, pallets, tree branches, hoarding cleanup, estate cleanout, emergency removal, and many more).
- 11 city pages under `/service-area/`.
- Strong signals: a real **pricing page with load sizes and prices** ($99 minimum, 1/6 load $150 through full truck $600), "free estimate / available 24/7" on every page, a two-step estimate form on every page, Google review widget (419 reviews), eco/donation angle.
- Weak spots: one city's name (Aurora) is left in copy on pages that aren't about Aurora, near-duplicate thin pages, cluttered layout, a slow form with reCAPTCHA friction.

**What beats both:** their page structure plus your real crew photos, your real reviews, clean modern design, transparent pricing, and clearly written original copy — no duplicated or padded text.

## What I'll build

Everything below is written fresh for EZ Haulaway. No competitor text is copied.

### Navigation
Header becomes: **What We Take · How It Works · Pricing · Service Areas · About · Contact**, with the phone number and the Get a Free Quote button always visible. Mobile menu mirrors it. Footer gets full link columns to every page so Google can crawl the whole site.

### Pages (phase 1 — 24 pages)

Hub pages:
1. `/what-we-take` — grid linking to every service page
2. `/how-it-works` — expanded version of your 3-step process
3. `/pricing` — how pricing works and what's included
4. `/service-areas` — all 15 cities, each linking to its own page
5. `/about` — Ben & Zoe, the real story
6. `/contact` — phone, text, email, hours, quote form
7. `/privacy-policy`

Service pages (each with its own headline, original copy, FAQ, photos, and calls to action):
8. Furniture Removal
9. Appliance Removal
10. Hot Tub Removal
11. Light Demolition
12. Deck & Fence Removal
13. Construction Debris Removal
14. Yard & Landscaping Debris
15. Garage Cleanouts
16. House & Estate Cleanouts
17. Mattress & Bulky Item Removal
18. Electronics & E-Waste Removal
19. Commercial & Office Junk Removal

City pages (5 strongest markets to start):
20. Parker · 21. Castle Rock · 22. Centennial · 23. Highlands Ranch · 24. Lone Tree

### Phase 2 (after you approve phase 1)
The remaining 10 city pages — Denver, Aurora, Lakewood, Thornton, Arvada, Westminster, Littleton, Commerce City, Englewood, Northglenn, Broomfield — plus more niche item pages if you want to match V&J's long tail.

### Page templates
Each service page: H1 naming the service + Denver metro, short intro, what's included, what we take / don't take, how it works, photos, 3-4 FAQs, links to related services and city pages, quote + call buttons.

Each city page: H1 "Junk Removal in {City}, CO", short original intro, services offered there, why locals use EZ Haulaway, nearby areas, FAQ, quote + call buttons.

## Things I need from you

- **Pricing page**: V&J publishes exact load prices. I will not invent yours. Tell me your load pricing or minimum, or I'll build the page explaining that quotes are free, on-site, and all-inclusive with no surprise fees — still a real page, just no numbers.
- **Email address** for the contact page. Without one I'll use phone/text only.
- **Business hours** — otherwise I'll leave hours off rather than guess.
- Your phone `720-614-7223` carries over to every page.

## Technical details

- New routes under `src/routes/` (TanStack file routes): `what-we-take.tsx`, `how-it-works.tsx`, `pricing.tsx`, `service-areas.tsx`, `services.$slug.tsx`, `service-areas.$city.tsx`, `about.tsx`, `contact.tsx`, `privacy-policy.tsx` — dynamic routes driven by content data files so pages are consistent and easy to extend.
- Content lives in `src/content/services.ts` and `src/content/locations.ts` (slug, title, meta, copy, FAQs, image, related links) — one place to edit all copy.
- Shared layout extracted from `home-page.tsx` into `SiteHeader` / `SiteFooter` components; the existing quote modal, styling, colors, and homepage sections stay exactly as they are.
- Per-route `head()` with unique title, description, og:title, og:description, og:type, twitter:card. LocalBusiness + FAQPage JSON-LD on relevant pages.
- `public/sitemap.xml` listing every route, referenced from `robots.txt`.
- Existing photos reused across service pages (deck photo finally gets used); no new uploads needed.
- Verify with `bunx tsc --noEmit` and Playwright desktop + mobile screenshots of a sample of new pages.
