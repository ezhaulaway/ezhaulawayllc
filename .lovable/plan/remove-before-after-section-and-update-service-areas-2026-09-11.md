# Remove Before & After Section and Update Service Areas

## Goal
Make two targeted homepage changes: remove the placeholder Before & After section and replace the Service Areas content with the real list of served Denver metro locations.

## Changes

### 1. Remove the Before & After section
- Delete the entire `<section>` titled `See the Difference a Haul Makes` (the one with the two placeholder image boxes and placeholder copy).
- Remove the now-unused `PhotoPlaceholder` helper component.
- Close up spacing so the remaining surrounding sections (How It Works / video → Why Choose EZ Haulaway → Reviews) flow naturally with no large empty gap.

### 2. Update the Service Areas section
Keep the existing `id="service-area"`, background, and padding. Update only the content inside:

- **Eyebrow:** keep `Service area`.
- **Headline:** `Proudly Serving the Denver Metro Area`
- **Supporting copy:** `EZ Haulaway provides professional junk removal throughout Parker and communities across the Denver metro area.`
- **Locations grid:** Display these 15 cities in a clean, easy-to-scan multi-column layout:
  - Denver, CO
  - Aurora, CO
  - Lakewood, CO
  - Thornton, CO
  - Arvada, CO
  - Westminster, CO
  - Centennial, CO
  - Highlands Ranch, CO
  - Littleton, CO
  - Parker, CO
  - Castle Rock, CO
  - Commerce City, CO
  - Englewood, CO
  - Northglenn, CO
  - Broomfield, CO

- **Layout:**
  - Desktop: balanced multi-column grid (e.g., 3 columns) beside or below the section header.
  - Mobile: stack vertically or use a compact 2-column layout if readability remains good.
  - Each city rendered as a plain-text item inside a semantic list, styled so it can later become a clickable dedicated service-area page without restructuring the markup.

- **Design:** No keyword-stuffing appearance. Use the existing muted card surface, small dot or icon, and readable text. Do not invent distances, maps, or additional location details.

## Out of scope
Do not modify the hero, services, How It Works, video section, Why Choose EZ Haulaway, reviews, About, FAQ, final CTA, navigation, colors, typography, or the global stylesheet.

## Validation
- Run `bunx tsc --noEmit` to confirm no TypeScript errors after removing `PhotoPlaceholder`.
- Use Playwright to capture desktop and mobile screenshots of the area around the former Before & After section and the updated Service Areas section.
- Confirm no console errors and that no large empty gap remains where the removed section was.
