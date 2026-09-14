# Add EZ Haulaway Photos to the Homepage

## Placement for Each Photo

| Photo | Where it goes | Why |
|---|---|---|
| Crew loading an appliance dolly (branded truck) | **Hero** — replaces the photo placeholder | Strongest shot: real crew, branded trailer, action. Shows instantly what the company does. |
| Ben thumbs-up selfie at jobsite | **Why EZ Haulaway** section, beside the four trust reasons | Puts a real, friendly face behind "dependable service" claims. |
| Ben & Zoe portrait | **Meet Ben & Zoe** section — fills the labeled photo slot | Exactly what that section was designed for. |
| Construction debris cleanup (branded trailer) | **Yard & Construction Debris** service card | Real branded job photo matching the category. |
| Living room interior | **Furniture** service card | Clean visual for furniture removal. |
| Fridge/appliance photo is used in the hero, so the **Appliances** card uses the hot-tub-style image approach — see below | | |
| Hot tub by the lake | **Hot Tubs & Light Demolition** service card | Direct category match. |
| Deck on back of house | **Deck & pergola removal** item in the expanded "View All Services" list | Real local deck photo; Ben's deck experience is a selling point. |
| Backyard waste cleanup (branded trailer) | **Property Cleanouts** service card | Shows crew clearing a property. |
| Retro computer render | **Electronics removal** item in the expanded services list | Category match; stylized render works at small size. |
| AI illustrated character (branded uniform) | **Quote dialog** as a small friendly accent, clearly an illustration | Adds personality without presenting it as a real person. Not used in the hero or anywhere it could be mistaken for a real photo. |

The Appliances service card keeps its icon for now since its best photo is used in the hero (reusing the same image twice on one page looks repetitive). If you'd rather have the fridge photo on the card and a different hero, say so.

## Work

1. Upload all 10 photos as CDN assets (`.asset.json` pointers) from the uploaded AVIF files.
2. Add images to the six service cards (small photo header above title where mapped; Appliances and Household Junk keep icon tiles).
3. Replace the hero placeholder with the appliance-dolly job photo, keeping the "We do the heavy lifting" caption card.
4. Add the Ben thumbs-up photo to the Why EZ Haulaway section.
5. Fill the Meet Ben & Zoe photo slot with the portrait.
6. Add deck and electronics images to the expanded services list items.
7. Add the illustrated character as a small accent in the quote dialog.
8. Before & After section keeps its labeled placeholders — none of these photos are true before/after pairs.

## Technical Details

- Photos are AVIF; uploaded as-is to the CDN (AVIF is supported by all modern browsers). Images get descriptive alt text, explicit dimensions, and lazy loading below the fold.
- Card images use consistent aspect ratios with `object-cover` so mixed orientations don't break the grid.
- Verify desktop and mobile rendering with screenshots afterward.
