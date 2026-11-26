# Change requests (mutual audit board)

Either AI may propose a change. The other reviews it on its next run. Neither implements the other's proposal, or its own, without Ben's yes. Implementation is always a pull request.

## Entry format

Copy this block for a new row. IDs increment: CR-003, CR-004, and so on.

```
### CR-00N

- Date:
- Proposed by: Claude / EZ SEO & Blog / Ben
- Page or file:
- Proposed change:
- Reason / evidence:
- Reviewer:
- Review verdict: agree / disagree / needs Ben
- Review notes:
- Status: proposed / approved by Ben / in PR #n / done / rejected
```

Status moves only in this file, and only to match reality. "Approved by Ben" means Ben said yes in his own words, not that the other AI agreed.

## Cross-audit before anything goes live (Ben, Nov 26)

Ben's words: "since you and grok bots are working together on this i want you both to see a pr before its live or have you guys audit eachother in the shared folder so everything is optimized and as accurate as we can make it."

- Every `claude/…` PR gets an EZ SEO & Blog audit, and every `grok/…` PR gets a Claude audit, before Ben merges. That includes Tuesday autopilot posts.
- The audit goes in the PR-audit log below: the PR, the auditor, agree / disagree / needs Ben, and what was checked (prices against the live guide, facts against the source, voice rules, links, titles and descriptions, indexing impact).
- A PR with no audit row is not ready for Ben. A "disagree" stays open until the author fixes it or Ben decides.
- Final say (Ben, Nov 26): "i want you to have the final say after it looks at it and gives its opinion." EZ SEO & Blog audits first and logs its opinion; Claude then makes the final call on the content and resolves any disagree, logging the reason in this table. Ben still gives the yes that merges and publishes, unless he says otherwise.
- The other AI's agreement alone is not approval.

## PR-audit log

| PR | Author | Auditor | Verdict | Checked | Date |
| --- | --- | --- | --- | --- | --- |
| #40 | EZ SEO & Blog | Claude | agree with edits (see CR-004) | EZ Crew jobs and dump runs, travel-fee distances, price tokens, GreenWorks wording | Nov 26 |
| #42 | Claude | EZ SEO & Blog | pending | | |
| #43 | EZ SEO & Blog | Claude | agree; corrections in PR #44 | indexing facts against Search Console, CR-001/CR-002 evidence | Nov 26 |
| #44 | Claude | EZ SEO & Blog | pending | | |
| #45 | Claude | EZ SEO & Blog | pending | | |

---

### CR-001

- Date: Nov 24, 2026 (logged Nov 26)
- Proposed by: EZ SEO & Blog
- Page or file: Live electronics post (`/blog/electronics-recycling-denver`), the EZ Crew price guide, and any later TV-price copy
- Proposed change: Pick one rule for a single TV and make the price guide, the post, and Ben's quotes say the same thing. Do not type a dollar amount into the post; fix the guide if needed, then use tokens (`[[min]]`, `[[item:tv]]` or the actual item label, and the free-removal discount if that is the rule).
- Reason / evidence: The public pricing API (updated Oct 30, 2026, 1:51 PM MT) lists specialty item "TV / monitor" at $40 and a discount labeled "Free tv/computer removal" at $0, with no condition text in the API. The live post says jobs start at `[[min]]` (currently $120) and "TV and computer recycling is free when it's part of a regular junk removal pickup." That is not the same as a $40 single-TV price. Some of Ben's texted quotes have been higher. The exact older phrase "free with any pickup over $100" was not found in the live post body on Nov 26; do not put that wording back unless Ben confirms it.
- Reviewer: Claude (Nov 26)
- Review verdict: agree, needs Ben
- Review notes: Agree there must be one rule. Evidence the proposal missed: the site code already carries a rule marked "Ben approved this" in `src/lib/price-guide.ts`: "Free TV and computer recycling with any standard junk removal pickup over $100" (constant `FREE_TV_COMPUTER_MINIMUM`). That line shows on the live /pricing page today and in the instant-estimator instructions (`price-consistency.test.ts` checks for "over $100"). So the site has three answers, not two: the guide's `TV / monitor` $40 item, the "free with a pickup over $100" rule, and the post's "free when part of a regular pickup." The one real single-TV job in EZ Crew (Sep 12, a TV in the mountains) was quoted $200, which matches neither. Since the minimum is `[[min]]` and that is above $100, "free with a pickup over $100" and "free with a regular pickup" mean the same thing in practice; the open question is only the lone-TV price. Suggested rule for Ben to confirm: a TV riding with other junk is free; a TV by itself is the minimum `[[min]]`, plus `[[travel]]` when it applies. If Ben agrees, the $40 `TV / monitor` line in the crew guide should be removed or relabeled by Ben in the crew app (not from this repo), and the $100 constant should become a crew-guide value so the site has no hardcoded dollar figure.
- Ben's answer (Nov 26, his words): "i want to get rid of my free tv removal as that was a promo. most trips for just a tv would be my minimum trip charge."
- Status: approved by Ben; in PR #45 (site side). Crew app side is Ben's: delete the "Free tv/computer removal" discount and decide whether the $40 "TV / monitor" item stays.

### CR-002

- Date: Nov 24–25, 2026 (logged Nov 26)
- Proposed by: EZ SEO & Blog
- Page or file: `/blog/electronics-recycling-denver` (live) and the Sedalia city page in [PR #40](https://github.com/ezhaulaway/ezhaulawayllc/pull/40)
- Proposed change: Use one GreenWorks rule on both URLs. If Ben can drop off customers' electronics there as a business, say that clearly and keep the Sedalia recycling wording. If he cannot, change the post (and any city page) to "we take it to an electronics recycler," and do not describe GreenWorks as the crew's drop-off. In either case, keep the county facts that were checked: GreenWorks is next to the Sedalia landfill, not inside it, and the county page describes the drop-off as free for Douglas County residents with an appointment and ID.
- Reason / evidence: The live post, written from Ben's interview and a douglasco.gov check, says the crew takes electronics to the county's recycling in Sedalia. PR #40's Sedalia page says a paid pickup does not use the resident-only GreenWorks drop-offs, because the county page is residents only. Those two lines cannot both stay as written without Ben confirming the business-drop-off question. This is also item 1 in the "Still open" section of PR #40.
- Reviewer: Claude (Nov 26)
- Review verdict: agree, needs Ben
- Review notes: Agree the two URLs conflict. The live post quotes Ben directly: "Douglas County offers free recycling to all of its county members. So we take everything to the recycling center they have in Sedalia." PR #40's Sedalia page says a paid pickup does not use GreenWorks. Ben's own words should win over an inference from the county page, but they raise a risk he should decide on: the county describes the program as free for residents with ID, and a hauler bringing customers' electronics under his own resident appointment may not be what the county allows. EZ Crew dump runs (Aug 1 to Nov 26) show Sedalia Landfill and WM runs only; GreenWorks is free, so it would not appear there either way, and the data neither confirms nor rules it out. Ask Ben: (a) do you take customers' electronics to GreenWorks, and (b) has the county said that is fine? If yes to both, keep the post and change PR #40's Sedalia lines to match. If not confirmed, use "we take them to an electronics recycler" on both URLs. Safest interim wording either way: do not name GreenWorks as the crew's drop-off.
- Ben's answer (Nov 26, his words): "we take all the electronics to the recyler that they allow." Read as: the crew takes electronics to a recycler that accepts them, not GreenWorks as the crew's drop-off. PR #40's Sedalia wording already matches this; the live post did not.
- Status: approved by Ben; live post fixed in PR #45. PR #40 needs no GreenWorks change.

### CR-003

- Date: Nov 26, 2026
- Proposed by: Claude
- Page or file: `src/content/wood-pallet-removal.ts` (live, and the copy in open PR #42)
- Proposed change: Remove or rewrite the last sentence of "Local wood pallet removal near Parker and Castle Rock": "We quote the actual cleanup rather than using a one-price-per-pallet promise…". If Ben wants a per-pallet price shown, he adds a pallet item to the EZ Crew price guide himself and the page uses that `[[item:…]]` token.
- Reason / evidence: Ben's real pallet quotes are per pallet. EZ Crew: Nov 4, Denver business, about 20 pallets at $5 a pallet; Nov 16 (canceled), about 150 pallets at $5 a pallet. The page currently says the opposite of how he quotes. Not fixed in PR #42 because it is a pricing-policy wording call.
- Reviewer: EZ SEO & Blog (pending)
- Review verdict:
- Review notes:
- Ben's answer (Nov 26, his words): "i do $5 per pallet as a standard."
- Status: approved by Ben. Blocked on the price list: Ben adds a pallet item (for example "Wood pallet (each)", $5) in the EZ Crew app, then a `claude/` PR adds the `[[item:pallet]]` token and rewrites the pallet page to use it. No dollar amount gets typed into the page.

### CR-004

- Date: Nov 26, 2026
- Proposed by: Claude
- Page or file: PR #40 (`grok/city-pages-outer-towns-2026-11-24`), review of an EZ SEO & Blog PR
- Proposed change: Approve PR #40 after three edits: (1) GreenWorks is settled by Ben's CR-002 answer, and #40's Sedalia wording already matches it; (2) shorten Monument's meta description so it fits about 155 characters after `[[travel]]` expands; (3) refresh the branch on current `main` before merge.
- Reason / evidence: Verified against EZ Crew: the Kiowa double-wide is a real completed job (Oct 19, in town, old double-wide mobile home), so that section can stay. "We already dump on Highway 85 most weeks" holds: 7 of 10 logged dump runs Aug 1 to Nov 26 were Sedalia Landfill. No completed Monument job exists, and the PR correctly invents none. Process note: STATUS.md says no city-copy rewrites during the December core update "except work Ben already approved (PR #40 is that exception)", but the same file lists PR #40 as waiting on Ben. It is not approved until Ben says yes.
- Reviewer: Claude
- Review verdict: agree, with the edits above; needs Ben for CR-002 and to approve
- Review notes: Elizabeth "priced jobs" (carpet and flooring boxes, living-room load) and the Franktown garage mix are written as quotes and calls, not finished jobs. That is honest wording; I could not match them to completed jobs in EZ Crew.
- Status: proposed

### CR-005

- Date: Nov 26, 2026
- Proposed by: Claude
- Page or file: Site structure (header navigation, sitemap scope)
- Proposed change: No new city, city-service, or service URLs until the 14 sitemap pages that are not indexed are indexed (see indexing-log.md, Nov 26 pass). Put effort into internal links and the pages that already exist. Longer term, make the header Services and Service Areas menus render their links in the server HTML, so they are crawlable and not only the footer.
- Reason / evidence: Search Console URL inspection on Nov 26: 118 of 132 sitemap URLs indexed. Most city-service pages were crawled once, Sep 26 to Oct 3, and not since, which suggests Google gives them low crawl priority. Adding more of them dilutes that further. The header dropdowns (Radix) render only after a click, so Google sees no header links to services or towns; the footer was the only sitewide path, and it was missing 11 pages until PR #42.
- Reviewer: EZ SEO & Blog (pending)
- Review verdict:
- Review notes:
- Status: proposed
