# Replace Review Placeholders with Real Google Reviews

## Goal
Update the homepage reviews section to display the three supplied 5-star Google reviews in a clean, trust-building layout.

## Changes

### Section header
- Eyebrow: `CUSTOMER REVIEWS`
- Headline: `What Our Customers Say`
- Supporting copy: `Real 5-star reviews from EZ Haulaway customers on Google.`

### Review cards
Display three cards in a 3-column grid on desktop and a stacked layout on mobile:

1. **Renee Thompson** — ★★★★★
   > “Ben and DJ were seriously AMAZING!! We just moved into our new home and the previous owner left behind way more stuff than we were expecting. Ben and DJ came in and handled literally EVERYTHING. They were so kind, professional, quick, and made what had been a really stressful situation so much easier for us.”

2. **Martin Meza** — ★★★★★
   > “Punctual, fast and extremely friendly, great guy to do business with.”

3. **Devin Hall** — ★★★★★
   > “The team at EZ Haulaway were courteous and skillful. They made the entire process smooth and hassle-free, and the results exceeded my expectations.”

Each card includes:
- A prominent but tasteful row of five filled stars.
- The exact review text, unchanged.
- The customer’s name.
- A small `Google Review` attribution.

### Call to action
- Add a `Read More Reviews on Google` button below the cards linking to `https://share.google/cf9FKoYXCi9K62j84`.
- Open in a new tab with `rel="noopener noreferrer"`.

### Visual treatment
- Use the existing card styling (rounded border, warm white background, readable text).
- Keep the layout static — no carousel or slider.
- Maintain current section spacing and typography.

### Code updates
- Replace the placeholder review loop in `src/components/home-page.tsx` with a static array of the three reviews.
- Swap the `Sparkles` icon for a filled `Star` icon from `lucide-react`.
- Remove the disabled placeholder button.

## Validation
- Run `bunx tsc --noEmit` to confirm type safety.
- Capture desktop and mobile Playwright screenshots of the reviews section to verify the three cards display correctly, text remains readable, and the Google link is present.
- Confirm no console errors on the homepage.
