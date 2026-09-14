# Design Refinements: Services, Ben & Zoe Photo, Timelapse Video

## 1. Cleaner services section

Remove the photo strips from the service cards. Every card becomes the same simple thing: icon tile, service name, short description. Same height, same rhythm, easy to scan.

Photography stays in the section, but as one restrained backdrop instead of six competing images:

- One strong real job photo (the crew and branded trailer during the yard cleanup) sits behind the whole services section.
- A heavy warm-neutral overlay plus a soft gradient sits on top, so the photo reads as texture, not scenery.
- Cards themselves stay solid, opaque surfaces with clear borders, so no small text ever sits directly on photography.
- The expanded "View All Services" list also drops its small thumbnails and stays a clean text list.

Photos removed here (furniture, cleanout, debris, hot tub, deck, electronics) are no longer shown on the homepage. They stay uploaded and available for future service pages.

## 2. Ben & Zoe photo

The section currently forces the portrait into a wide box, which cuts the tops of their heads. Fix, prioritizing the full original composition over filling a box:

- Show the whole photo — nothing of their heads, faces, or the portrait's important area gets cut.
- Match the container to the photo's own proportions so it displays naturally, rather than cropping to a fixed shape.
- If any container shape still causes awkward cropping, fit the whole image inside the frame on a clean neutral background instead of cropping.
- Same treatment on mobile: full width, complete photo, nothing cut.
- No stretching or distortion.

## 3. "See EZ Haulaway in Action" video section

New section placed after How It Works, before Why Choose EZ Haulaway.

- Headline: See EZ Haulaway in Action
- Copy: "See how quickly a cluttered space can become a clean one."
- One large, premium video frame, centered, rounded, bordered — responsive on desktop and mobile.
- Muted by default, standard play/pause controls, no autoplay, no loop.
- Poster image: the hero-style real job photo, so the frame looks finished before playback.

Until the real timelapse file is uploaded, the frame shows the poster with a play affordance and a small, clearly-worded note that the real video goes here. As soon as you send the video file, it drops straight into this same frame — no stock or generated replacement.

## Out of scope

Navigation, hero, typography, colors, CTA hierarchy, reviews, FAQ, service area, and footer stay exactly as they are.

## Technical details

- `services` data drops the `image` field; card markup renders icon + title + text only.
- Section background: absolutely positioned `<img>` with `object-cover` plus an overlay layer using existing semantic tokens; content wrapped in a `relative` container. `aria-hidden` on the decorative image.
- Ben & Zoe: read the source image's intrinsic dimensions and size the container to that ratio; render with `object-contain` on a neutral `bg-muted` frame (or a matched-ratio `object-cover` only if it provably crops nothing). Never `object-center` cover on a mismatched ratio.
- Video: native `<video controls muted playsinline preload="metadata" poster={...}>`; no `autoplay`, no `loop`.
- Verify desktop and mobile rendering with screenshots after the change.
