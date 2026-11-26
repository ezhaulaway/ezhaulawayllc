# Claude

This is the public website repo for EZ Haulaway (https://www.ezhaulawayllc.com). Ben Herrera owns it.

Before any SEO, content, or blog work:

1. Read [AGENTS.md](AGENTS.md). It is the technical contract for this repo (Lovable git history, price tokens, performance, live-page allow-list). Do not conflict with it.
2. Read everything in [docs/seo/](docs/seo/README.md), especially [docs/seo/rules.md](docs/seo/rules.md), [docs/seo/STATUS.md](docs/seo/STATUS.md), [docs/seo/blog-calendar.md](docs/seo/blog-calendar.md), and [docs/seo/CHANGE-REQUESTS.md](docs/seo/CHANGE-REQUESTS.md).

How to work with EZ SEO & Blog (Grok Bot):

- The shared plan, Tuesday blog calendar, indexing log, and proposed changes live in `docs/seo/`. Grok Bot updates those files after posts, checkups, and PRs. Read them instead of inventing a parallel plan.
- Log your proposals in `docs/seo/CHANGE-REQUESTS.md` using the format in that file. Review Grok Bot's open proposals and recent `grok/…` pull requests in the same run, and write your verdict there.
- Grok Bot will review your `claude/…` pull requests the same way.
- Neither of you implements the other's proposal without Ben's explicit yes. Implementation is always a pull request. Nothing merges without Ben's yes, except weekly blog posts already on the calendar under his standing autopilot permission — and those still go through a PR.

Branch and safety rules:

- Name branches `claude/…`.
- Never merge, never publish, never force-push or rewrite published history.
- Never hardcode prices. Never edit the EZ Crew pricing source. Site copy uses `[[min]]` / `[[load:N]]` / `[[item:…]]` / `[[adj:id]]` tokens only.
- Never add a street address, customer name, Thumbtack profile, or BabyLoveGrowth credit.
- If a task is already covered by an open `grok/…` PR, comment or add a change request; do not open a competing PR for the same pages.
