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

As of Nov 26, 9:20 AM MT. #43 and #48 merged this morning; #42, #44 and #45 merged and published at about 9:17 AM MT on Ben's go. Every PR below has an audit row in [CHANGE-REQUESTS.md](CHANGE-REQUESTS.md).

| PR | Branch | What | Status |
| --- | --- | --- | --- |
| [#40](https://github.com/ezhaulaway/ezhaulawayllc/pull/40) | `grok/city-pages-outer-towns-2026-11-24` | Unique local copy for Monument, Elizabeth, Sedalia, Franktown, and Kiowa. | EZ SEO & Blog to update before merge: GreenWorks wording (CR-002), Monument meta length, two public-facility street addresses, Monument landlord card. See CR-004. |

PRs sometimes mentioned as still open are already merged: [#20](https://github.com/ezhaulaway/ezhaulawayllc/pull/20) (schema sameAs, Nov 10) and [#24](https://github.com/ezhaulaway/ezhaulawayllc/pull/24) (security hardening, Nov 18). No open follow-up "migration" PR was found.

A promised small-fixes PR on `grok/audit-small-fixes-2026-11-23` was never opened (no branch, no PR). The live furniture pages still say "Pianos start at starting at $375." The Littleton city page still has the "more than 300 decks" line. A visible BabyLoveGrowth *brand card* was not found on the home, about, or furniture pages this check; imported post images on `/blog` still load from a `blog-images/babylovegrowth/` storage path.

## Ben's answers, Nov 26

- Same-day pickup: yes, with a "text by noon" cutoff. A same-day page can be proposed (CR-006); it is a new URL, so it waits on CR-005 unless Ben says otherwise.
- Sunday hours: never. Do not add Sunday or "Sunday by appointment" anywhere.

- Free TV/computer removal was a promo and is over. A TV-only trip is the minimum. Site change in PR #45; Ben removes the discount in the crew app.
- Electronics go to a recycler that accepts them (not GreenWorks as the crew's drop-off). Live post fixed in PR #45.
- Pallets are $5 each as a standard. Ben adds the item to the crew price list; then the pallet page uses a token.
- Yes on PR #42. EZ SEO & Blog audited it; the fix it asked for is applied.
- New rule: each AI audits the other's PR before it goes live (see CHANGE-REQUESTS.md).

## Waiting on Ben

1. In the EZ Crew app: delete the $0 "Free tv/computer removal" discount, and remove or replace the $40 "TV / monitor" item so a TV-only trip has no published price below the minimum (CR-001).
2. In the EZ Crew app: add a pallet item at $5 each, for example "Wood pallet (each)", so the pallet page can show it with a token (CR-003).
3. Sign in to Google Search Console on the Grok Bot computer, if Grok Bot should request indexing itself. Claude can request it through Ben's Chrome.
4. Dec 1 interview answers and a donation-quality furniture photo, by Monday night, Nov 30. Questions and the image brief are in [blog-calendar.md](blog-calendar.md). The post still ships if either is missing, using the named fallback photo.
5. Is "same-week is common, and same-day when available" accurate for Lone Tree? That wording went live in PR #35.
6. PR #40 local-job questions (Perry Park travel fee, any unlogged Monument or Sedalia jobs). The Kiowa double-wide is verified in EZ Crew (Oct 19).
7. Whether to draft replies to the six unanswered Google reviews.

Answered Nov 26 and moved to "Ben's answers" above: GreenWorks (CR-002), single-TV price (CR-001), pallets (CR-003).

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
