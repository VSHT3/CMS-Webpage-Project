# CLAUDE.md

## Commands

```bash
npm run dev        # dev server (localhost:4321)
npm run build      # production build → /dist
npm run preview    # preview built site
npm run check      # astro type-check
```

## Architecture

**Stack:** Astro 6 + React 19 (islands) + Tailwind CSS 4 (via Vite plugin). Mesoamerica research institute site.

**Migration strategy — two kinds of pages:**

1. **Static Webstudio pages** — files in `public/` (page folders, each with `index.html`). Served as-is. Webstudio CSS/JS lives in `public/assets/`. To edit a page: create `src/pages/[route].astro`, delete `public/[route]/`.

2. **Astro pages** (future) — `.astro` files in `src/pages/`. Use `WebstudioContent.astro` to inject Webstudio HTML from `legacy/source-html/` while keeping Webstudio CSS references. Eventually replace with full Astro components.

**Reference HTML:** `legacy/source-html/` — copies of original Webstudio HTML for reading/converting.

**Assets:**
- `public/assets/` — Webstudio CSS, JS chunks, images (paths referenced as `/assets/...`)
- `public/legacy-assets/` — PDFs and other uploaded files

**Deploy:** `npm run build` → serve `/dist` on Coolify VPS (same as previous project).

**Site URL:** update `astro.config.mjs` once domain is known.
