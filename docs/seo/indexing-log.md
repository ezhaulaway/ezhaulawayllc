# Indexing log

How to read this table:

- **Changed** is the date the URL's content or snippet last shipped, in America/Denver, with the PR when known.
- **Bing IndexNow** is the HTTP result of the IndexNow ping (the key file is the `public/<32 hex>.txt` in the repo). "unknown" means no ping was recorded here.
- **Google request** is a manual "Request indexing" in Search Console. Claude can do this through Ben's Chrome (Nov 26). The Grok Bot computer still needs Ben to sign in.
- **Indexed?** is only "yes" or "no" when Search Console or a verified site: search has been checked *this period*. Otherwise it is unknown. Do not guess.

EZ SEO & Blog told Ben that 12 URLs changed on Nov 23 and still needed a Google indexing request, along with the Nov 24 electronics post. That exact list of 12 was not recovered as a single saved set. The identifiable content/snippet URLs from the Nov 23 SEO PRs (#28 and #35) are listed below. Sitewide or chrome-only deploys (blog byline, call tracking, pricing "what fits," header Blog link) are noted under Other deploys, not as a made-up list of 12.

## Post and page updates to track

| URL | Changed (America/Denver) | Bing IndexNow | Google request | Indexed? |
| --- | --- | --- | --- | --- |
| https://www.ezhaulawayllc.com/blog/electronics-recycling-denver | Tue Nov 24, 2026, 7:03 AM MT (PR #39) | 200 accepted Nov 24 | Not needed | yes (Nov 26) |
| https://www.ezhaulawayllc.com/service-areas/denver/furniture-removal | Mon Nov 23, 2026 (PR #28, merged 10:01 AM MT) | unknown | Not needed | yes (Nov 26) |
| https://www.ezhaulawayllc.com/services/furniture-removal | Mon Nov 23, 2026 (PR #28) | unknown | Not needed | yes (Nov 26) |
| https://www.ezhaulawayllc.com/service-areas/centennial | Mon Nov 23, 2026 (PR #28) | unknown | Not needed | yes (Nov 26) |
| https://www.ezhaulawayllc.com/what-we-take | Mon Nov 23, 2026 (PR #28) | unknown | Not needed | yes (Nov 26) |
| https://www.ezhaulawayllc.com/blog/bed-frame-disposal | Mon Nov 23, 2026 (PR #35, merged 10:06 AM MT) | unknown | Not needed | yes (Nov 26) |
| https://www.ezhaulawayllc.com/blog/deck-removal-cost | Mon Nov 23, 2026 (PR #35) | unknown | Not needed | yes (Nov 26) |
| https://www.ezhaulawayllc.com/services/hot-tub-removal | Mon Nov 23, 2026 (PR #35, description only) | unknown | Not needed | yes (Nov 26) |
| https://www.ezhaulawayllc.com/service-areas/lone-tree | Mon Nov 23, 2026 (PR #35, description only) | unknown | Not needed | yes (Nov 26) |
| https://www.ezhaulawayllc.com/service-areas/highlands-ranch | Mon Nov 23, 2026 (PR #35, description only) | unknown | Not needed | yes (Nov 26) |
| https://www.ezhaulawayllc.com/service-areas/aurora | Mon Nov 23, 2026 (PR #35, description only) | unknown | Not needed | yes (Nov 26) |
| https://www.ezhaulawayllc.com/service-areas/castle-pines | Mon Nov 23, 2026 (PR #35, description only) | unknown | Not needed | yes (Nov 26) |
| https://www.ezhaulawayllc.com/ | Mon Nov 23, 2026 (PR #28 also updated the homepage price-range in schema to minimum–full trailer) | unknown | Not needed | yes (Nov 26) |
| https://www.ezhaulawayllc.com/service-areas/parker | Mon Nov 23, 2026 (PR #28 schema price range) | unknown | Not needed | yes (Nov 26) |
| https://www.ezhaulawayllc.com/service-areas/castle-rock | Mon Nov 23, 2026 (PR #28 schema price range) | unknown | Requested Nov 26 (Claude) | no: Discovered, not indexed (Nov 26) |
| https://www.ezhaulawayllc.com/blog/christmas-tree-disposal | Mon Nov 16, 2026 (PR #27 rewrite) | unknown | Not needed | yes (Nov 26) |
| https://www.ezhaulawayllc.com/blog/previous-owner-left-junk | Wed Nov 18, 2026 (PR #30) | unknown | Not needed | yes (Nov 26) |
| https://www.ezhaulawayllc.com/blog/kitchen-cabinet-removal-cost | Fri Nov 20, 2026 (PR #33) | unknown | Not needed | yes (Nov 26) |
| https://www.ezhaulawayllc.com/blog/estate-cleanout-cost | Sun Nov 22, 2026 (PR #34) | unknown | Not needed | yes (Nov 26) |
| https://www.ezhaulawayllc.com/services/wood-pallet-removal | Live now (HTTP 200 on Nov 26). Copy fix is in open PR #42, not shipped. Search Console had flagged a soft 404. | unknown | Not yet; after PR #42 is live | no: Soft 404 (Nov 26) |

## Other deploys (not a separate indexing target each)

| When | What | URLs mainly affected |
| --- | --- | --- |
| Mon Nov 23, 9:53 AM MT, PR #31 | Blog author byline fix (production had been serving "Ben") | All in-house blog posts |
| Mon Nov 23, 10:16 AM MT, PR #36 | Phone-call click tracking and a shorter mobile LCP path | Sitewide, especially home and tel: links |
| Mon Nov 23, evening, PRs #37 and #38 | Pricing page 3D trailer fill and "what fits" clips | https://www.ezhaulawayllc.com/pricing |
| Tue Nov 25, 10:26 AM MT, PR #41 | Desktop header "Blog" link | Sitewide chrome; helps discovery of `/blog` |

PR #28 also rewrote stale prices on several *imported* blog posts at render time, and fixed a shared blog image alt that had been the file name. Those posts were not named as a full URL list in the PR body, so they are not invented here.

## Nov 26 pass (Claude, Search Console URL inspection API plus the Search Console UI)

Ben connected Search Console to OpenSEO on Nov 26, so Claude inspected every URL in both sitemaps (97 site pages, 34 posts, and /blog). Result: 118 of 132 indexed. Both sitemaps read successfully (sitemap.xml Nov 24, 97 pages; blog-sitemap.xml Nov 25, 35 pages). Whole-property Page indexing report (last update Nov 22): 253 indexed, 48 not indexed.

The "Indexed?" and "Google request" columns in the table above were filled from this pass. Two URLs in that table are not indexed: `/service-areas/castle-rock` and `/services/wood-pallet-removal`. The table below is the full not-indexed list.

### Not indexed on Nov 26

| URL | Google status | Last crawl | Google request |
| --- | --- | --- | --- |
| /services/wood-pallet-removal | Soft 404 | Nov 17 | Not yet; wait until PR #42 is live |
| /services/sod-and-lawn-removal | Crawled, currently not indexed | Nov 21 | Not yet (daily quota) |
| /blog/what-can-be-donated | Crawled, currently not indexed | Nov 15 | Not yet; rewrite is the Dec 1 post |
| /services/commercial-junk-removal | Discovered, currently not indexed | never | Not yet; footer link is in PR #42 |
| /service-areas/castle-rock | Discovered, currently not indexed | never | Requested Nov 26 |
| /service-areas/denver | Discovered, currently not indexed | never | Requested Nov 26 |
| /service-areas/lakewood | Discovered, currently not indexed | never | Requested Nov 26 |
| /service-areas/aurora/garage-cleanouts | Discovered, currently not indexed | never | Requested Nov 26 |
| /blog/spring-junk-removal | Discovered, currently not indexed | never | Requested Nov 26 |
| /services/appliance-removal | URL is unknown to Google | never | Requested Nov 26 |
| /services/deck-removal | URL is unknown to Google | never | Requested Nov 26 |
| /service-areas/englewood | URL is unknown to Google | never | Requested Nov 26 |
| /service-areas/sedalia | URL is unknown to Google | never | Requested Nov 26 |
| /blog/water-heater-disposal | URL is unknown to Google | never | Requested Nov 26 |

Ten requests went into Google's priority crawl queue on Nov 26 (Denver, Castle Rock, Lakewood, Aurora garage cleanouts, appliance, deck, Englewood, Sedalia, water heater, spring). That is the usual daily limit.

The second soft 404 in the whole-property report is `https://www.ezhaulawayllc.com/$`, a junk URL last crawled Nov 20. It now redirects to the homepage, so no fix is needed.

Search Console is not blocked on a sign-in for Claude; it works through Ben's Chrome. The electronics post and the Nov 23 URLs above were already indexed on Nov 26, so they need no request.

## Next indexing pass (Monday checkup, Nov 30)

1. Once PR #42 is live, request indexing for `/services/wood-pallet-removal`, `/services/commercial-junk-removal` and `/services/sod-and-lawn-removal`. Request `/blog/what-can-be-donated` after the Dec 1 rewrite ships.
2. Recheck the 14 URLs in the not-indexed table and record each result here with the date.
3. If Denver or Castle Rock still show "never crawled", check the inspected URL form (www, https, no trailing slash) before treating it as a content problem.
