# Shared SEO docs

This folder is the shared source of truth for EZ Haulaway SEO and blog work. It lives in the public website repo, [ezhaulaway/ezhaulawayllc](https://github.com/ezhaulaway/ezhaulawayllc), so Ben, EZ SEO & Blog (Grok Bot), and Claude can all read the same plan, the same schedule, and the same list of proposed changes.

Pages on Grok Bot are private to that side. This folder is what both AIs should use instead.

## Who uses it

| Who | Role |
| --- | --- |
| Ben Herrera | Owner. Reviews pull requests, answers open questions, and is the only one who approves a merge (except weekly blog posts under his standing autopilot permission). |
| EZ SEO & Blog (Grok Bot) | Writes and schedules in-house blog posts, runs the weekly SEO checkup, opens `grok/…` pull requests, and keeps these files current after each post, checkup, or PR. |
| Claude | Reviews Grok Bot work, proposes changes of its own, opens `claude/…` pull requests, and reads this folder before touching SEO or content. |

## Files

| File | What it is |
| --- | --- |
| [STATUS.md](STATUS.md) | Current snapshot: what is live, open PRs, what is waiting on Ben, and the publishing cadence. |
| [blog-calendar.md](blog-calendar.md) | Weekly Tuesday calendar, Nov 24, 2026 through Mar 30, 2027, with keywords, status, and image briefs. |
| [indexing-log.md](indexing-log.md) | URL-level log of content changes, IndexNow / Google requests, and whether a URL is indexed. |
| [rules.md](rules.md) | Standing rules for pricing, NAP, voice, Google helpful-content, and how changes ship. |
| [CHANGE-REQUESTS.md](CHANGE-REQUESTS.md) | Mutual audit board. Either AI may propose; the other reviews; neither implements the other's idea without Ben's yes. |
| [city-page-audit-2026-11.md](city-page-audit-2026-11.md) | Historical Nov 17, 2026 overlap audit of the 16 city hubs. Do not overwrite it; add a new dated file if you run a later audit. |

A short [CLAUDE.md](../../CLAUDE.md) at the repo root points Claude here. Technical site rules already live in [AGENTS.md](../../AGENTS.md) (price tokens, Lovable git history, performance). Follow both.

## Mutual-audit loop

1. Read `STATUS.md`, `blog-calendar.md`, `indexing-log.md`, `rules.md`, and open entries in `CHANGE-REQUESTS.md` at the start of a run.
2. Either AI may add a change request (new ID, date, proposed by, page or file, proposed change, reason and evidence). Status starts as `proposed`.
3. The other AI reviews that entry on its next run and writes a verdict: `agree`, `disagree`, or `needs Ben`, plus notes.
4. Neither AI implements the other's proposal, or its own, until Ben says yes. Weekly blog posts already on the calendar are the standing exception; they still ship through a pull request.
5. Implementation is always a branch and a pull request (`grok/…` or `claude/…`). Put the PR number on the entry and set status to `in PR #n`.
6. After Ben merges (or rejects), mark the entry `done` or `rejected` and update `STATUS.md` and, if URLs changed, `indexing-log.md`.
7. Review the other AI's recent PRs in the same run, even when there is no new change-request row yet.

Do not merge. Do not publish. Do not treat a relayed "yes" from the other AI as Ben's approval.
