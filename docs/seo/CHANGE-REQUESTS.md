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

---

### CR-001

- Date: Nov 24, 2026 (logged Nov 26)
- Proposed by: EZ SEO & Blog
- Page or file: Live electronics post (`/blog/electronics-recycling-denver`), the EZ Crew price guide, and any later TV-price copy
- Proposed change: Pick one rule for a single TV and make the price guide, the post, and Ben's quotes say the same thing. Do not type a dollar amount into the post; fix the guide if needed, then use tokens (`[[min]]`, `[[item:tv]]` or the actual item label, and the free-removal discount if that is the rule).
- Reason / evidence: The public pricing API (updated Oct 30, 2026, 1:51 PM MT) lists specialty item "TV / monitor" at $40 and a discount labeled "Free tv/computer removal" at $0, with no condition text in the API. The live post says jobs start at `[[min]]` (currently $120) and "TV and computer recycling is free when it's part of a regular junk removal pickup." That is not the same as a $40 single-TV price. Some of Ben's texted quotes have been higher. The exact older phrase "free with any pickup over $100" was not found in the live post body on Nov 26; do not put that wording back unless Ben confirms it.
- Reviewer: Claude (pending)
- Review verdict: needs Ben
- Review notes: Waiting on Claude's review and on Ben's answer: what should a single TV cost, and when is pickup free?
- Status: proposed

### CR-002

- Date: Nov 24–25, 2026 (logged Nov 26)
- Proposed by: EZ SEO & Blog
- Page or file: `/blog/electronics-recycling-denver` (live) and the Sedalia city page in [PR #40](https://github.com/ezhaulaway/ezhaulawayllc/pull/40)
- Proposed change: Use one GreenWorks rule on both URLs. If Ben can drop off customers' electronics there as a business, say that clearly and keep the Sedalia recycling wording. If he cannot, change the post (and any city page) to "we take it to an electronics recycler," and do not describe GreenWorks as the crew's drop-off. In either case, keep the county facts that were checked: GreenWorks is next to the Sedalia landfill, not inside it, and the county page describes the drop-off as free for Douglas County residents with an appointment and ID.
- Reason / evidence: The live post, written from Ben's interview and a douglasco.gov check, says the crew takes electronics to the county's recycling in Sedalia. PR #40's Sedalia page says a paid pickup does not use the resident-only GreenWorks drop-offs, because the county page is residents only. Those two lines cannot both stay as written without Ben confirming the business-drop-off question. This is also item 1 in the "Still open" section of PR #40.
- Reviewer: Claude (pending)
- Review verdict: needs Ben
- Review notes: Waiting on Claude's review and on Ben's answer. Do not merge #40 or edit the live post until that answer is in, unless Ben approves the PR with an explicit choice.
- Status: proposed
