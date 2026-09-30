# Instant estimate campaign page

## Goal
Create `/instant-estimate` as a focused, mobile-first page for paid ads and organic searches about fast junk-removal pricing. Reuse the working estimator and the crew app’s live pricing so the page stays accurate without duplicating the quote logic.

## What I’ll build
- A compact first screen with the headline **“Instant Junk Removal Quote Online — No Phone Call Required”**, Parker/Castle Rock/Denver Metro context, and the estimator immediately visible.
- A simpler estimator presentation for this page: snap up to four photos or describe the items, receive the preliminary range first, then enter name, phone, address, and preferred day to request the confirmed quote.
- Clear trust signals near the upload area: local Parker ownership, Google review credibility, no obligation, and a photo-privacy statement.
- Three short steps that match the real flow: show the junk, see the estimate, then request the actual quote and preferred day.
- A concise comparison section showing why this is easier than waiting for an on-site estimate.
- Useful search content and FAQs around instant online junk-removal quotes, estimates by photo, pricing factors, service coverage, and the difference between a preliminary estimate and the confirmed on-site price.
- Strong calls to action throughout, plus phone/text fallback for visitors who prefer it.

## Search and campaign setup
- Unique title, description, canonical URL, social metadata, and service/FAQ structured data for `https://www.ezhaulawayllc.com/instant-estimate`.
- Natural use of high-intent phrases such as “instant junk removal quote online,” “junk removal cost estimator,” “junk removal estimate by photo,” and “free junk removal estimate” without keyword stuffing.
- Add the page to the main navigation, mobile menu, sitemap, and relevant internal links so both visitors and search engines can find it.

## Technical details
- Extend the existing estimator with page-specific heading/layout options rather than creating a second pricing or lead workflow.
- Keep all prices sourced from the crew app through the existing shared price store.
- Preserve the current two-stage lead flow and private crew feed; no new customer-data exposure.
- Add the new route file and update project architecture notes only where the new reusable presentation requires it.

## Validation
- Test photo upload, description-only estimating, estimate display, and post-estimate contact fields.
- Check desktop and mobile in light and dark modes.
- Confirm metadata, canonical URL, navigation, sitemap entry, no browser errors, and a clean build.
