<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## JOMOVERSE structure
- Home sections live in `src/components/site/Sections.tsx` and are reused by inner routes; keep copy there, not duplicated per route.
- 3D (starfield, astronaut, globe) lives in `src/components/three/*` and is only loaded via `React.lazy` behind `<ClientOnly>` — three.js must never enter the SSR graph.
- Showcase tiles come from `src/data/showcase.ts`; form option lists from `src/config/forms.ts` and INR presets from `src/config/budget.ts` so non-devs can edit them.
- Registrations insert directly from the browser into insert-only tables (anon INSERT policy, no SELECT) — no server function needed.
- Keep brand colours in the Tailwind v4 CSS theme; client-only Three.js scenes resolve those same CSS variables through sceneTheme so lighting cannot drift from the UI palette.
- Derive logo variants and the favicon from uploaded pixels, keeping the explicitly requested public logo path; never redraw the brand artwork.

- Share registration rendering and validation through the mission modules for route, embedded and dialog entries so all paths save the same fields; drafts stay browser-local and analytics omit personal answers.
