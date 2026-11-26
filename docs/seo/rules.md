# Standing SEO and content rules

Read this before proposing or writing a change. Technical site rules in [AGENTS.md](../../AGENTS.md) still apply, especially price tokens and Lovable git history.

## Pricing

- The only price source is the EZ Crew price guide, via the site's price tokens and the public pricing API: https://ezhaulawaycrew.lovable.app/api/public/pricing (loaded in the app through `src/lib/price-store.ts`).
- In content, write tokens only: `[[min]]`, `[[labor]]`, `[[travel]]`, `[[load:0-8]]` (quarter `[[load:2]]`, half `[[load:4]]`, full `[[load:8]]`), `[[item:Name]]`, `[[adj:id]]`.
- Never hardcode a dollar amount in page or post copy. When a token's unit already includes words like "starting at," do not also write "start at" in front of it (this is what produced "Pianos start at starting at $375" on the furniture pages).
- Do not invent labor averages, tear-out averages, or job prices. Do not change the pricing API or the crew app's price list from this repo.

## Name, address, phone (NAP)

Use this everywhere, including schema, listings copy, and posts:

- Business name: **EZ Haulaway** (not "EZ Haulaway LLC" in customer-facing NAP, unless a legal form requires the legal name)
- Phone: **(720) 614-7223**
- Website: **https://www.ezhaulawayllc.com**
- Email: **ben@ezhaulawayllc.com**
- Hours: **Mon–Sat, 7am–7pm**
- City: **Parker, CO 80134**
- Slogan: **EZ in, junk out**

Never show a street address on the site, listings, or social. If an official form requires one, the address to use is 14918 Delhi Ave, Parker, CO 80134. Carlson Dr is the old address; do not use it. Do not put the address or hours on Facebook.

## Voice and evidence

- Write in Ben Herrera's voice, built on real EZ Crew jobs and Ben's own interview answers. Save answers word for word in the interview notes, then use them.
- Short and plain. Answer first. Few or no em dashes. No hype, no emojis, no invented claims.
- No AI slop. No fake reviews, fake stats, fake jobs, or fake authors. The published author is Ben Herrera / EZ Haulaway.
- No customer names, customer phones, street addresses, house numbers, or license plates.
- Fact-check disposal rules, hours, and "who can drop off" against the official city or county page at draft time. If you cannot confirm it, leave it out or flag it for Ben.

## Google helpful-content

- No doorway pages and no scaled city or neighborhood pages that only swap the place name.
- City pages need facts only that city has: the drive from Parker, the travel-fee line, local disposal options, and work actually seen there. Do not spin a template.
- Do not create a new URL that competes with a page or post already targeting that search. Rewrites of imported posts keep the existing URL.
- Honest authorship. Do not add BabyLoveGrowth (or any other writing service) as an author, brand card, or visible credit.

## How changes ship

- All code and content changes go through a branch and a pull request. Grok Bot uses `grok/…`. Claude uses `claude/…`.
- Nothing merges or publishes without Ben's own explicit yes. Relayed approval from the other AI does not count.
- Exception: weekly in-house blog posts already on the calendar, under Ben's standing autopilot permission of Nov 15, 2026. Those still go out through a PR, then the Tuesday 7:00 AM MT publish.
- Do not force-push, rebase, or amend commits that are already on a shared or published branch (see AGENTS.md / Lovable).
- No paid listings or upgrades unless Ben asks. No Thumbtack (profile was deleted Nov 13, 2026; do not add it back). No BabyLoveGrowth imports or credits.

## Reports

Every SEO report to Ben ends with:

1. Five actionable next steps, each with a metric and a target.
2. A short scorecard of the period (clicks, impressions, position or CTR, and any leads or calls you can actually measure).

## LinkedIn or other reposts (when Marketing asks)

- Wait until the post is indexed, usually 3–7 days.
- Prefer a native summary in Ben's voice with a link back. If someone writes a LinkedIn article, it must be reworded and marked "Originally published at …" (LinkedIn cannot set a canonical).
- Prices must match EZ Crew. No customer details. Same business name and phone as the site.
- Nothing posts without Ben's own yes.
