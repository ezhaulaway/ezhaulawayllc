# Indexing log

How to read this table:

- **Changed** is the date the URL's content or snippet last shipped, in America/Denver, with the PR when known.
- **Bing IndexNow** is the HTTP result of the IndexNow ping (the key file is the `public/<32 hex>.txt` in the repo). "unknown" means no ping was recorded here.
- **Google request** is a manual "Request indexing" in Search Console. As of Nov 26, 2026, that is blocked on Ben signing back in as ben@ezhaulawayllc.com.
- **Indexed?** is only "yes" or "no" when Search Console or a verified site: search has been checked *this period*. Otherwise it is unknown. Do not guess.

EZ SEO & Blog told Ben that 12 URLs changed on Nov 23 and still needed a Google indexing request, along with the Nov 24 electronics post. That exact list of 12 was not recovered as a single saved set. The identifiable content/snippet URLs from the Nov 23 SEO PRs (#28 and #35) are listed below. Sitewide or chrome-only deploys (blog byline, call tracking, pricing "what fits," header Blog link) are noted under Other deploys, not as a made-up list of 12.

## Post and page updates to track

| URL | Changed (America/Denver) | Bing IndexNow | Google request | Indexed? |
| --- | --- | --- | --- | --- |
| https://www.ezhaulawayllc.com/blog/electronics-recycling-denver | Tue Nov 24, 2026, 7:03 AM MT (PR #39) | 200 accepted Nov 24 | Pending Search Console sign-in | unknown |
| https://www.ezhaulawayllc.com/service-areas/denver/furniture-removal | Mon Nov 23, 2026 (PR #28, merged 10:01 AM MT) | unknown | Pending sign-in (part of the Nov 23 set) | unknown |
| https://www.ezhaulawayllc.com/services/furniture-removal | Mon Nov 23, 2026 (PR #28) | unknown | Pending sign-in (part of the Nov 23 set) | unknown |
| https://www.ezhaulawayllc.com/service-areas/centennial | Mon Nov 23, 2026 (PR #28) | unknown | Pending sign-in (part of the Nov 23 set) | unknown |
| https://www.ezhaulawayllc.com/what-we-take | Mon Nov 23, 2026 (PR #28) | unknown | Pending sign-in (part of the Nov 23 set) | unknown |
| https://www.ezhaulawayllc.com/blog/bed-frame-disposal | Mon Nov 23, 2026 (PR #35, merged 10:06 AM MT) | unknown | Pending sign-in (part of the Nov 23 set) | unknown |
| https://www.ezhaulawayllc.com/blog/deck-removal-cost | Mon Nov 23, 2026 (PR #35) | unknown | Pending sign-in (part of the Nov 23 set) | unknown |
| https://www.ezhaulawayllc.com/services/hot-tub-removal | Mon Nov 23, 2026 (PR #35, description only) | unknown | Pending sign-in (part of the Nov 23 set) | unknown |
| https://www.ezhaulawayllc.com/service-areas/lone-tree | Mon Nov 23, 2026 (PR #35, description only) | unknown | Pending sign-in (part of the Nov 23 set) | unknown |
| https://www.ezhaulawayllc.com/service-areas/highlands-ranch | Mon Nov 23, 2026 (PR #35, description only) | unknown | Pending sign-in (part of the Nov 23 set) | unknown |
| https://www.ezhaulawayllc.com/service-areas/aurora | Mon Nov 23, 2026 (PR #35, description only) | unknown | Pending sign-in (part of the Nov 23 set) | unknown |
| https://www.ezhaulawayllc.com/service-areas/castle-pines | Mon Nov 23, 2026 (PR #35, description only) | unknown | Pending sign-in (part of the Nov 23 set) | unknown |
| https://www.ezhaulawayllc.com/ | Mon Nov 23, 2026 (PR #28 also updated the homepage price-range in schema to minimum–full trailer) | unknown | unknown | unknown |
| https://www.ezhaulawayllc.com/service-areas/parker | Mon Nov 23, 2026 (PR #28 schema price range) | unknown | unknown | unknown |
| https://www.ezhaulawayllc.com/service-areas/castle-rock | Mon Nov 23, 2026 (PR #28 schema price range) | unknown | unknown | unknown |
| https://www.ezhaulawayllc.com/blog/christmas-tree-disposal | Mon Nov 16, 2026 (PR #27 rewrite) | unknown | unknown | unknown |
| https://www.ezhaulawayllc.com/blog/previous-owner-left-junk | Wed Nov 18, 2026 (PR #30) | unknown | unknown | unknown |
| https://www.ezhaulawayllc.com/blog/kitchen-cabinet-removal-cost | Fri Nov 20, 2026 (PR #33) | unknown | unknown | unknown |
| https://www.ezhaulawayllc.com/blog/estate-cleanout-cost | Sun Nov 22, 2026 (PR #34) | unknown | unknown | unknown |
| https://www.ezhaulawayllc.com/services/wood-pallet-removal | Live now (HTTP 200 on Nov 26). Copy fix is in open PR #42, not shipped. Search Console had flagged a soft 404. | unknown | unknown | unknown; Claude reported a soft-404 flag |

## Other deploys (not a separate indexing target each)

| When | What | URLs mainly affected |
| --- | --- | --- |
| Mon Nov 23, 9:53 AM MT, PR #31 | Blog author byline fix (production had been serving "Ben") | All in-house blog posts |
| Mon Nov 23, 10:16 AM MT, PR #36 | Phone-call click tracking and a shorter mobile LCP path | Sitewide, especially home and tel: links |
| Mon Nov 23, evening, PRs #37 and #38 | Pricing page 3D trailer fill and "what fits" clips | https://www.ezhaulawayllc.com/pricing |
| Tue Nov 25, 10:26 AM MT, PR #41 | Desktop header "Blog" link | Sitewide chrome; helps discovery of `/blog` |

PR #28 also rewrote stale prices on several *imported* blog posts at render time, and fixed a shared blog image alt that had been the file name. Those posts were not named as a full URL list in the PR body, so they are not invented here.

## Claude's Nov 26 indexing note (PR #42)

PR #42 says Search Console showed a soft 404 on `/services/wood-pallet-removal` and that 13 other sitemap pages were discovered/unknown but not indexed. The PR body does not list those 13 URLs. Add them here once someone pastes the Search Console list. Do not request indexing until Ben has signed back in, and do not assume PR #42 is live until it is merged.

## After the next indexing pass

When Search Console is available again:

1. Request indexing for the electronics post and the Nov 23 snippet/content URLs in the table.
2. Record the request date in this file.
3. Recheck "Indexed?" on the following Monday checkup, and add the 13 discovered/unknown URLs if they are still listed.
