# Update Quote Modal Character Graphic

## Goal
Replace the small character image in the Get a Free Quote modal with the new transparent-background character asset, making it larger and cleanly integrated without changing any other modal element.

## Current State
- The quote modal in `src/components/home-page.tsx` currently shows the previous AI character as a 64 px-tall (`h-16`) image inside `DialogHeader`.
- The image has a `bg-secondary` rectangle and `rounded-md` crop (`object-cover`), which conflicts with the new transparent asset and truncates the full figure.
- The uploaded replacement is `ChatGPT_Image_Sep_10_2026_08_30_36_PM.png` — 1024×1536 RGBA PNG with transparency.

## Changes

### Asset preparation
- Convert the transparent PNG to a high-quality WebP with alpha for smaller file size and broad browser support.
- Upload the resulting file through Lovable Assets and create the pointer file in `src/assets/`.
- Keep the old character asset pointer untouched in case it is referenced elsewhere.

### Code update in `src/components/home-page.tsx`
- Add an import for the new character asset pointer.
- In the `QuoteButton` `DialogHeader`:
  - Replace the existing `mascotAsset` image source with the new asset URL.
  - Remove `bg-secondary`, `rounded-md`, and `object-cover` so the transparent cutout sits on the modal’s warm-white background.
  - Use `object-contain` and set the rendered height to roughly 72–80 px on desktop (`h-20`) and slightly smaller on mobile (`h-16`).
  - Keep `w-auto` so the portrait aspect ratio is preserved and the full character from head to toe remains visible.
  - Increase the gap between the character and the heading/subheading block for breathing room.
  - Keep the flex row vertically centered with `items-center`.
- Leave the dialog title, description, form fields, spacing, typography, buttons, colors, submitted state, and mobile behavior unchanged.

### Validation
- Run `bunx tsc --noEmit` to confirm no type errors.
- Capture Playwright desktop and mobile screenshots of the opened quote modal to verify the character is fully visible, properly sized, transparent-backed, and not cramped.
- Confirm no console errors.
