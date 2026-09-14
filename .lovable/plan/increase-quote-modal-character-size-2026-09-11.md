# Increase Quote Modal Character Size

## Goal
Make the character image in the "Get a Free Quote" modal noticeably larger while keeping its placement, transparent background, and full-body visibility intact.

## Changes
- In `src/components/home-page.tsx`, update the character image inside the `QuoteButton` `DialogHeader`.
- Increase rendered height from the current `h-16 sm:h-20` to `h-24 sm:h-28`.
- Keep `w-auto`, `object-contain`, no background, no crop, and vertical centering next to the heading/subheading block.
- Maintain existing modal layout, fields, typography, buttons, and behavior.

## Validation
- Run `bunx tsc --noEmit` to confirm no type errors.
- Capture Playwright desktop and mobile screenshots of the opened quote modal to verify the character remains fully visible, transparent-backed, and proportionate.
