# SEO status

Snapshot as of Thursday, Nov 26, 2026, America/Denver. Facts below were checked against the live site, the GitHub repo, the public pricing API, and the work leading up to this file. Do not treat guesses as updates; mark unknowns as unknown and fix them in the next pass.

## Live recently

| When (America/Denver) | What | Proof |
| --- | --- | --- |
| Tue Nov 24, 7:03 AM MT | [Electronics Recycling in Denver and Douglas County](https://www.ezhaulawayllc.com/blog/electronics-recycling-denver) went live. Target keyword: electronics recycling denver. On `/blog` and in `/blog-sitemap.xml`. | [PR #39](https://github.com/ezhaulaway/ezhaulawayllc/pull/39), squash `4fb0d15`. |
| Mon Nov 23, morning–evening | Search snippets and related site updates: Denver furniture, general furniture, Centennial, what-we-take, bed-frame and deck blog titles, hot tub description, four city descriptions, blog byline fix, phone-call click tracking, and the pricing-page trailer "what fits" work. | PRs [#28](https://github.com/ezhaulaway/ezhaulawayllc/pull/28), [#31](https://github.com/ezhaulaway/ezhaulawayllc/pull/31), [#35](https://github.com/ezhaulaway/ezhaulawayllc/pull/35), [#36](https://github.com/ezhaulaway/ezhaulawayllc/pull/36), [#37](https://github.com/ezhaulaway/ezhaulawayllc/pull/37), [#38](https://github.com/ezhaulaway/ezhaulawayllc/pull/38). |
| Tue Nov 25, 10:26 AM MT | "Blog" link added to the desktop header (mobile and footer already had it). | [PR #41](https://github.com/ezhaulaway/ezhaulawayllc/pull/41), merge `c42a65bc`, Claude. |

Earlier in-house posts still live: [Christmas tree disposal](https://www.ezhaulawayllc.com/blog/christmas-tree-disposal) (Nov 16 rewrite, PR #27), [Previous owner left junk](https://www.ezhaulawayllc.com/blog/previous-owner-left-junk) (Nov 18, PR #30), [Kitchen cabinet removal cost](https://www.ezhaulawayllc.com/blog/kitchen-cabinet-removal-cost) (Nov 20, PR #33), [Estate cleanout cost](https://www.ezhaulawayllc.com/blog/estate-cleanout-cost) (Nov 22, PR #34).

Ben's Nov 4 yard-waste URL, `/blog/yard-waste-brush-removal-cost-parker`, now 301s to the imported post at `/blog/yard-waste-removal-cost` (`BLOG_SLUG_REDIRECTS` in `src/content/redirects.ts`). The blog plan had called for the opposite merge (imported post into Ben's URL). Flag this before changing either URL.

## Open pull requests

Only two PRs are open as of this snapshot. Neither should be merged without Ben's yes.

| PR | Branch | What | Status |
| --- | --- | --- | --- |
| [#40](https://github.com/ezhaulaway/ezhaulawayllc/pull/40) | `grok/city-pages-outer-towns-2026-11-24` | Unique local copy for Monument, Elizabeth, Sedalia, Franktown, and Kiowa. | Open since Mon Nov 24, 7:49 PM MT. Waiting on Ben. Head is still based on the electronics commit; `#41` has landed on `main` since then, so the branch may need a refresh before merge. Open questions in the PR body: GreenWorks business drop-off, Perry Park travel fee, whether to keep the Kiowa double-wide and Franktown garage mix, Monument meta length after `[[travel]]` expands. |
| [#42](https://github.com/ezhaulaway/ezhaulawayllc/pull/42) | `claude/indexing-fixes` | Footer now links every service and service area; wood-pallet page copy reworked after a Search Console soft-404 flag. Also notes 13 other sitemap pages as discovered/unknown (list not in the PR body). | Open since Thu Nov 26, 7:58 AM MT. Waiting on Ben. Claude should still get a review from EZ SEO & Blog on the next run; log it in [CHANGE-REQUESTS.md](CHANGE-REQUESTS.md) if anything should change. |

PRs sometimes mentioned as still open are already merged: [#20](https://github.com/ezhaulaway/ezhaulawayllc/pull/20) (schema sameAs, Nov 10) and [#24](https://github.com/ezhaulaway/ezhaulawayllc/pull/24) (security hardening, Nov 18). No open follow-up "migration" PR was found.

A promised small-fixes PR on `grok/audit-small-fixes-2026-11-23` was never opened (no branch, no PR). The live furniture pages still say "Pianos start at starting at $375." The Littleton city page still has the "more than 300 decks" line. A visible BabyLoveGrowth *brand card* was not found on the home, about, or furniture pages this check; imported post images on `/blog` still load from a `blog-images/babylovegrowth/` storage path.

## Waiting on Ben

1. Sign back in to [Google Search Console](https://search.google.com/search-console) as ben@ezhaulawayllc.com on the Grok Bot computer, so Google indexing can be requested for the electronics post and the Nov 23 page updates. Bing IndexNow already accepted the electronics post (HTTP 200, Nov 24).
2. Can the crew drop off customers' electronics at Douglas County GreenWorks as a business, or is that residents-only? This also affects wording in PR #40 vs. the live electronics post. See [CR-002](CHANGE-REQUESTS.md#cr-002).
3. What should a single TV cost? The Oct 30, 2026 price guide has both "TV / monitor" at $40 and a "Free tv/computer removal" discount at $0. The live post says TV and computer recycling is free when it is part of a regular junk removal pickup (jobs start at the minimum). Quotes Ben has sent have not always matched. See [CR-001](CHANGE-REQUESTS.md#cr-001).
4. Dec 1 interview answers and a donation-quality furniture photo, by Monday night, Nov 30. Questions and the image brief are in [blog-calendar.md](blog-calendar.md). The post still ships if either is missing, using the named fallback photo.
5. Is "same-week is common, and same-day when available" accurate for Lone Tree? That wording went live in PR #35.
6. PR #40 local-job questions (Kiowa double-wide, Franktown garage mix, Perry Park travel fee, any unlogged Monument or Sedalia jobs).
7. Optional: electronics Q4 (a single-TV price, which overlaps item 3) and whether Ben usually does not resell electronics.
8. Whether to draft replies to the six unanswered Google reviews (including Paul Cattich, Nov 18).

## Cadence

| When | What |
| --- | --- |
| Tuesdays, 7:00 AM MT | Blog autopilot publishes the week's post under Ben's standing Nov 15, 2026 permission. Next up: Tue Dec 1 rewrite of `/blog/what-can-be-donated`. Dec 22 (Christmas week) is off. |
| Wednesdays, 9:00 AM MT | Interview routine sends next Tuesday's topic, four voice questions, and the image brief. |
| Mondays, 8:00 AM MT | Weekly SEO checkup. |
| Daily, quietly | Core-update watcher. Google's November 2026 core update was reported finished around Nov 25; a December 2026 core update was reported starting the same day. Do not rewrite more city or service copy while that December update is rolling out, except work Ben already approved (PR #40 is that exception). When the update finishes, send Ben a before-and-after report with five next steps. |

## Other watch items

- Lovable noted the site database is on the Tiny size plan and can struggle if traffic spikes. Mini is their recommendation. That is Ben's call; it is not an SEO content change.
- MerchantCircle was verified fixed Nov 25. Still waiting on earlier listing follow-ups is not tracked in this folder unless someone adds it here.
- GPTZero rated the Nov 24 electronics post as AI-written after one voice rewrite; a second scan hit a sign-up wall. Use Ben's interview answers on the next posts.
