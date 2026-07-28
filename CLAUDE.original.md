# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # dev server (localhost:4321)
npm run build      # production build → /dist
npm run preview    # preview built site
npm run check      # astro type-check
```

## Architecture

**Stack:** Astro 6 + React 19 (islands) + Tailwind CSS 4 (via Vite plugin). Center for Mesoamerican Studies, Comenius University Bratislava.

### Two-tier routing strategy

1. **Legacy Astro route** — `src/pages/[...slug].astro` catches all slugs, maps them to `legacy/source-html/{slug}/index.html`, processes via `src/layouts/WebstudioPage.astro`. 36 pages served this way.

2. **Native Astro pages** — `src/pages/index.astro` (homepage) and future pages. Full Astro components, no legacy processing.

**To convert a legacy page to native Astro:** create `src/pages/{route}.astro`, it will shadow the catch-all route automatically.

### Key files

| File | Role |
|------|------|
| `src/layouts/Layout.astro` | Base layout — nav + slot + footer + global CSS tokens |
| `src/layouts/WebstudioPage.astro` | Reads legacy HTML, sanitizes/restructures, outputs semantic HTML |
| `src/components/Nav.astro` | Sticky nav with multi-level dropdowns + PDF search (scans all 36 legacy files at build) |
| `src/components/WebstudioContent.astro` | Simple HTML injector — currently unused |
| `legacy/source-html/` | 36 read-only Webstudio HTML files (reference only, never edit) |

### WebstudioPage.astro pipeline

Reads `legacy/source-html/{slug}/index.html` → strips Webstudio header/footer divs → whitelist-filters tags/attrs → generates responsive `<picture>` srcsets → converts non-map iframes to click-to-load privacy placeholders → styles PDF links as buttons → adds scroll-reveal via IntersectionObserver.

Allowed output tags: `h1–h6, p, section, article, ul, ol, li, a, img, iframe, figure, figcaption, blockquote, hr, br`. All else stripped.

### Assets

- `public/assets/` — images, logos, 3D model (`models/statue-compressed.glb`), vendor JS (`vendor/model-viewer.min.js`)
- `public/assets/optimized/` — webp srcsets at 720w/1200w/1800w (filename pattern: `{base}-{720|1200|1800}.webp`)
- `public/legacy-assets/` — PDFs and uploaded files

### Design tokens (CSS vars in `Layout.astro`)

All colors are OKLCH. Key vars:
- `--site-bg` / `--site-bg-alt` / `--site-bg-deep` — dark teal background scale
- `--site-gold: oklch(0.76 0.08 92)` — accent / download button color
- `--site-teal: oklch(0.68 0.075 178)` — links
- `--site-text` / `--site-text-strong` / `--site-text-dim` — text scale
- `--site-font: 'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif`

No Tailwind config file — Tailwind v4 uses Vite plugin only. Custom colors go in CSS vars, not Tailwind config.

### PDF search

Nav.astro scans all 36 legacy HTML files at build time, extracts PDF links, embeds as JSON. Search runs client-side with multi-term scoring. No runtime indexing.

### Deploy

`npm run build` → `/dist` → copy to Coolify VPS. Fully static, no backend.
Update `site` in `astro.config.mjs` once domain is confirmed (currently placeholder).

---

## Behavioral guidelines

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

### 1. Think Before Coding

Before implementing:
- State assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

Minimum code that solves the problem. Nothing speculative.

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

### 3. Surgical Changes

Touch only what you must. Clean up only your own mess.

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

### 4. Goal-Driven Execution

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```
