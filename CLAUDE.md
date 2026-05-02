# CLAUDE.md

Guidance for Claude Code (claude.ai/code) in this repo.

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

1. **Legacy Astro route** — `src/pages/[...slug].astro` catches all slugs, maps to `legacy/source-html/{slug}/index.html`, processes via `src/layouts/WebstudioPage.astro`. 36 pages.

2. **Native Astro pages** — `src/pages/index.astro` (homepage) + future pages. Full Astro components, no legacy processing.

**Convert legacy to native:** create `src/pages/{route}.astro` — shadows catch-all automatically.

### Key files

| File | Role |
|------|------|
| `src/layouts/Layout.astro` | Base layout — nav + slot + footer + global CSS tokens |
| `src/layouts/WebstudioPage.astro` | Reads legacy HTML, sanitizes/restructures, outputs semantic HTML |
| `src/components/Nav.astro` | Sticky nav + multi-level dropdowns + PDF search (scans all 36 legacy files at build) |
| `src/components/WebstudioContent.astro` | Simple HTML injector — currently unused |
| `legacy/source-html/` | 36 read-only Webstudio HTML files (never edit) |

### WebstudioPage.astro pipeline

Reads `legacy/source-html/{slug}/index.html` → strips Webstudio header/footer divs → whitelist-filters tags/attrs → generates responsive `<picture>` srcsets → converts non-map iframes to click-to-load privacy placeholders → styles PDF links as buttons → adds scroll-reveal via IntersectionObserver.

Allowed tags: `h1–h6, p, section, article, ul, ol, li, a, img, iframe, figure, figcaption, blockquote, hr, br`. All else stripped.

### Assets

- `public/assets/` — images, logos, 3D model (`models/statue-compressed.glb`), vendor JS (`vendor/model-viewer.min.js`)
- `public/assets/optimized/` — webp srcsets at 720w/1200w/1800w (pattern: `{base}-{720|1200|1800}.webp`)
- `public/assets/pdfs/` — PDFs (gitignored, upload to server manually). Subdirs: `grants/`, `publications/`, `reports/uaxactun/`, `reports/peten/`

### Design tokens (CSS vars in `Layout.astro`)

All colors OKLCH. Key vars:
- `--site-bg` / `--site-bg-alt` / `--site-bg-deep` — dark teal background scale
- `--site-gold: oklch(0.76 0.08 92)` — accent / download button color
- `--site-teal: oklch(0.68 0.075 178)` — links
- `--site-text` / `--site-text-strong` / `--site-text-dim` — text scale
- `--site-font: 'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif`

No Tailwind config file — v4 uses Vite plugin only. Custom colors go in CSS vars, not Tailwind config.

### PDF search

`Nav.astro` scans all 36 legacy HTML files at build, extracts PDF links, embeds as JSON. Search runs client-side with multi-term scoring. No runtime indexing.

### Git workflow

Always merge with `--no-ff` to preserve visible branch structure in the graph:
```bash
git merge --no-ff <branch>
```
Never use `--ff-only`. Delete merged branches after: `git branch -d <branch> && git push origin --delete <branch>`.

### Deploy

`npm run build` → `/dist` → copy to Coolify VPS. Fully static, no backend.
Update `site` in `astro.config.mjs` once domain confirmed (currently placeholder).

---

## Behavioral guidelines

**Tradeoff:** Guidelines bias toward caution over speed. For trivial tasks, use judgment.

### 1. Think Before Coding

Before implementing:
- State assumptions. If uncertain, ask.
- Multiple interpretations → present them, don't pick silently.
- Simpler approach exists → say so. Push back when warranted.
- Unclear → name what's confusing. Ask.

### 2. Simplicity First

Minimum code that solves problem. Nothing speculative.

- No features beyond what was asked.
- No abstractions for single-use code.
- No unrequested "flexibility" or "configurability".
- No error handling for impossible scenarios.
- 200 lines when 50 works → rewrite.

### 3. Surgical Changes

Touch only what you must. Clean up only your own mess.

Editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things not broken.
- Match existing style.
- Unrelated dead code → mention, don't delete.

Your changes create orphans:
- Remove imports/variables/functions YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

### 4. Goal-Driven Execution

Transform tasks to verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write test reproducing it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

Multi-step tasks, state brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- For cross-module "how does X relate to Y" questions, prefer `graphify query "<question>"`, `graphify path "<A>" "<B>"`, or `graphify explain "<concept>"` over grep — these traverse the graph's EXTRACTED + INFERRED edges instead of scanning files
- After modifying code files in this session, run `graphify update .` to keep the graph current (AST-only, no API cost)
