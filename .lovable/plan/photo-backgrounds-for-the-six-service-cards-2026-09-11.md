# Photo backgrounds for the six service cards

Update only the "What Can We Take Off Your Hands?" section. Everything else on the homepage stays exactly as it is.

## What changes

Each of the six service cards becomes a photo card: the assigned real job photo fills the whole card, a soft dark gradient sits behind the text so it reads clearly, and the icon, title, and description stay in the same place on every card.

- Photo fills the card edge to edge, cropped (never stretched) with a focal point picked per image so the subject stays visible.
- Gradient is strongest at the bottom-left behind the text and fades out toward the top-right, so the photo still shows through.
- Title in white and bold; description in a slightly softer white for hierarchy.
- Icon sits in a small translucent light square that works over photography.
- All six cards keep the same height, padding, corner radius, and text position.
- Desktop hover: a very slight photo zoom and a touch more contrast. No other motion.
- Mobile: same crop logic with card heights tuned so titles and descriptions stay fully readable.

## Photo assignments

| Card | Photo |
| --- | --- |
| Furniture | furniture removal |
| Appliances | appliance removal |
| Household Junk | Residential Junk Removal (new upload) |
| Property Cleanouts | Backyard/property cleanout crew photo — the strongest real cleanout image available |
| Yard & Construction Debris | construction and demolition |
| Hot Tubs & Light Demolition | hot tub removal |

Deck removal stays available for a future light-demolition page and is not forced into the grid.

## Notes

- Only the new Residential Junk Removal image needs uploading; the other five already exist in the project.
- The existing faint section-background photo behind the grid will be removed, since six photo cards plus a background photo would look busy. The section keeps its warm neutral backdrop.
- Section heading, copy, service names, descriptions, "View All Services" list and button, and the grid layout are untouched.

## Technical

- Add a CDN asset pointer for `Residential_Junk_Removal.avif` via `lovable-assets`.
- Extend the `services` array in `src/components/home-page.tsx` with `image` and `objectPosition` fields.
- Each `<article>` becomes `relative isolate overflow-hidden` with an absolutely positioned `<img className="object-cover">` (lazy, empty alt), a gradient overlay div, and the existing content in a relative layer.
- Verify with `bunx tsc --noEmit` and Playwright screenshots at desktop and mobile widths.
