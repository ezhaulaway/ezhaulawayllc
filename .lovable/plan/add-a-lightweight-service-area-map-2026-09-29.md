# Add a Lightweight Service-Area Map

## Goal
Add a fast, mobile-friendly map to the Service Areas page that clearly shows EZ Haulaway's coverage without adding paid map requests.

## Changes
- Add a dedicated service-area map directly below the Service Areas introduction and above the city cards.
- Use a lightweight local map graphic with the served Denver-area cities positioned geographically and a clear outlined coverage region.
- Highlight Parker as the home base and make every city label link to its existing city page.
- Match the existing red, charcoal, and light/dark color system, with an accessible city list beside the map on larger screens.
- Keep the existing city cards and all other pages unchanged.

## Technical details
- Build the map as a local React/SVG component, so it requires no Google Maps API key, external map tiles, tracking, or usage fees.
- Store city coordinates with the map component; the existing location list remains the source for names and links.
- Add one architecture note documenting the deliberate no-API map approach.

## Validation
- Confirm every map marker links to the correct service-area page.
- Check the map at desktop and mobile sizes in both light and dark modes.
- Confirm the page has no console errors and the latest build succeeds.
