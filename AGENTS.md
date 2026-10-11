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
