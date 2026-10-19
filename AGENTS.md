<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Prices come from the crew app (ezhaulawaycrew /api/public/pricing) via src/lib/price-store.ts; write prices in content as [[min]]/[[labor]]/[[load:N]]/[[item:Name]]/[[adj:id]] tokens, never literal dollar amounts — so the app stays the single price control center.
- The Service Areas page uses a local SVG coverage map rather than a map API, keeping it fast, private, and free of usage charges.
- MCP server (public, read-only) lives in src/lib/mcp/; tools expose only public site data — never leads or customer tables.
- The dedicated `/instant-estimate` campaign page reuses `AiEstimator`; keep estimate generation and lead submission in that shared component so pricing and lead behavior cannot drift.
- City content sections may declare contextual service links in location data; the shared city renderer uses typed local city-service routes so each topic links to its own city page without duplicating page templates.
- Service content may opt out of city pages with `cityPages: false`; local directories and navigation then link to its global service page, avoiding thin duplicated city routes.
- Service sections may declare contextual service links in content data; the shared service renderer renders these with typed routes to keep editorial links reusable.
- Homepage FAQ answers live in shared content consumed by both the accordion and route structured data so the visible answers and search metadata cannot drift.
- Header, footer, and homepage link directories use lightweight navigation identities rather than full service/city content; keep identities and ordering aligned so detailed page copy stays outside their initial download.
- The homepage loads the shared estimator near its section, and shared quote forms load on demand; preserve the estimator intro in initial HTML so content remains visible without downloading form logic immediately.
- Dynamic city/service route loaders import detailed content on demand, including custom city-service copy, so unrelated routes do not pull those datasets into the homepage's critical download.
- Shared web fonts load as non-render-blocking stylesheets activated after hydration, with system fallbacks and a no-JavaScript stylesheet, so text can paint without waiting on font servers.
