# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `src/pages/index.astro` as eight chaptered bands with a real
type system, a tonal palette, mounted media, and an activity strip derived from
`potbelly-models.json`.

**Architecture:** Global tokens and `@font-face` live in `Layout.astro`. Shared
visual primitives live in one global stylesheet, `src/styles/home.css`, so that
eight independently-authored band components cannot drift apart stylistically.
Each band is an Astro component in `src/components/home/` owning only its own
layout. `src/lib/potbelly.ts` is the single source of truth for record data and
is shared with the existing 3D database page.

**Tech Stack:** Astro 7, TypeScript, plain CSS with custom properties. No CSS
framework — `tailwindcss` and `@tailwindcss/vite` are removed as part of this
work (wired into `astro.config.mjs`, zero utility classes in `src/`).

## Global Constraints

- Source spec: `docs/superpowers/specs/2026-07-30-homepage-redesign-design.md`.
- **No test framework exists in this repository.** `package.json` defines only
  `dev`, `build`, `preview`, `check`. Verification is `npm run check`,
  `npm run build`, and browser verification against a preview server. Steps that
  claim to run a unit test would be fiction, so this plan does not contain any.
- Palette scale is **additive**: `--site-surface`, `--site-surface-raised` and
  `--site-bg-alt` keep their current values. Only `--site-bg` and
  `--site-bg-deep` change value; `--site-bg-abyss` and `--site-bg-raised` are new.
- Radius: media mounts only — `10px` outer shell, `6px` inner core. Text blocks,
  rules, fact rails and wayfinding rows stay square. No squircles, no pill buttons.
- Easing: `--site-ease-out: cubic-bezier(0.22, 1, 0.36, 1)` everywhere. No
  `linear`, no `ease-in-out`.
- Animate `transform` and `opacity` only. Every animated selector must appear in
  the `prefers-reduced-motion: reduce` block.
- Chapter padding: `clamp(4.5rem, 9vw, 9rem)`.
- Text track `min(1180px, calc(100% - 2rem))`; wide track
  `min(1440px, calc(100% - 2rem))`.
- Fonts: `Source Serif 4` (display + body), `Geist` (UI microtype). Both subsets
  (`latin`, `latin-ext`) declared with `unicode-range`; only `latin` preloaded.
- Every `<img>` carries explicit `width`/`height` and `decoding="async"`;
  `loading="lazy"` on everything below the first two images.
- Copy rule: the string `"not a vague feature block"` must not survive anywhere.
- Icons: inline SVG, 1px stroke, `currentColor`. No icon library.

---

## File Structure

| Path | Responsibility |
| --- | --- |
| `public/fonts/*.woff2` | 4 variable font files (2 families × 2 subsets) |
| `src/layouts/Layout.astro` | `@font-face`, font preloads, global tokens |
| `src/styles/home.css` | Shared visual primitives used by every band |
| `src/lib/potbelly.ts` | Record type, null-safe sorting, derivations |
| `src/components/home/HomeHero.astro` | Band 1 |
| `src/components/home/HomeNotice.astro` | Band 2 |
| `src/components/home/HomeScope.astro` | Band 3 |
| `src/components/home/HomePotbelly.astro` | Band 4 |
| `src/components/home/HomeRecent.astro` | Band 5 |
| `src/components/home/HomeParu.astro` | Band 6 |
| `src/components/home/HomeWayfinding.astro` | Band 7 |
| `src/components/home/HomeCloser.astro` | Band 8 |
| `src/pages/index.astro` | Composition + notice value + page script |
| `src/pages/potbelly-sculptures/3d-database.astro` | Migrated to shared lib |
| `astro.config.mjs`, `package.json` | Tailwind removal |

---

## Task 1: Data layer

**Files:**
- Create: `src/lib/potbelly.ts`
- Modify: `src/pages/potbelly-sculptures/3d-database.astro:1-25`

**Interfaces — Produces:**

```ts
export interface ModelRecord {
  id: string; recordCode: string; title: string;
  date: string | null; dateLabel: string; year: string; sequence: string;
  sourceFormat: string; sourceFileName: string;
  modelUrl: string; posterUrl: string; sourceUrl: string;
  vertices: number; triangles: number; webBytes: number; sourceBytes: number;
}
export const records: ModelRecord[];          // source order, unmodified
export const totalRecords: number;            // 26
export function newest(count: number): ModelRecord[];
export function evenlySampled(count: number): ModelRecord[];
export function recordHref(record: ModelRecord): string;
```

`newest` sorts by `date` descending with **null dates last** — exactly one record
(`my-scene`) has `date: null`. `evenlySampled` picks `count` records spread across
the full catalogue by index, so band 4 never repeats band 5's posters.
`recordHref` returns `/potbelly-sculptures/3d-database#<id>`; deep-linking is
already implemented at `3d-database.astro:511`.

- [ ] Create `src/lib/potbelly.ts` with the interface and four exports above.
- [ ] Replace the inline `ModelRecord` interface and `modelData` import in
      `3d-database.astro` with imports from the shared module. `models.length`
      and `filterYears` behaviour must be unchanged.
- [ ] Run `npm run check`. Expected: no new errors.
- [ ] Commit.

---

## Task 2: Foundations — fonts and tokens

**Files:**
- Modify: `src/layouts/Layout.astro:23-49` (head preloads), `:59-187` (global style)

Font files are already downloaded to `public/fonts/`:
`source-serif-4-latin.woff2` (119.5 KB), `source-serif-4-latin-ext.woff2`
(98.5 KB), `geist-latin.woff2` (28.7 KB), `geist-latin-ext.woff2` (16.1 KB).

Verified glyph coverage: `latin` supplies `á ä é í ó ô ú ý`, `latin-ext` supplies
`č ď ĺ ľ ň ŕ š ť ž`. Both are required for Slovak; the union has no gaps.

- [ ] Add four `@font-face` blocks with `font-weight` ranges, `font-display: swap`
      and the exact `unicode-range` values from the Google CSS2 response.
- [ ] Add fallback `@font-face` blocks with `size-adjust` / `ascent-override` /
      `descent-override` so the swap causes no layout shift.
- [ ] Preload `source-serif-4-latin.woff2` and `geist-latin.woff2` only.
- [ ] Add tokens: `--site-font-display`, `--site-font-body`, `--site-font-ui`,
      `--site-bg-abyss`, `--site-bg-raised`; retarget `--site-bg` to
      `oklch(0.19 0.030 204)` and `--site-bg-deep` to `oklch(0.15 0.022 202)`.
      Keep `--site-font` as an alias so no existing page breaks.
- [ ] Replace the `html`/`body` gradient with a flat `--site-bg-deep` base.
- [ ] Run `npm run build`, then visually spot-check `about-us`, `publications`,
      and one `WebstudioPage.astro` consumer for metric regressions.
- [ ] Commit.

---

## Task 3: Shared primitives stylesheet

**Files:**
- Create: `src/styles/home.css`
- Modify: `src/pages/index.astro` (import it)

**Interfaces — Produces** (every band component consumes these class names):

| Class | Purpose |
| --- | --- |
| `.h-band` | Chapter wrapper, `padding: clamp(4.5rem, 9vw, 9rem) 0` |
| `.h-band--abyss` `--deep` `--base` `--raised` | Background tier |
| `.h-track` / `.h-track--wide` | 1180px / 1440px centred track |
| `.h-eyebrow` | Geist, uppercase, `0.22em` tracking, teal |
| `.h-title` | Source Serif display heading |
| `.h-lead` | Lead paragraph, `66ch` measure |
| `.h-mount` / `.h-mount__core` | 10px shell + 6px core with inset highlight |
| `.h-btn` / `.h-btn--primary` / `.h-btn__icon` | Button with nested icon capsule |
| `.h-link` | Underline-grow text link |
| `.h-row` | Ruled row for list items |
| `.h-reveal` / `.is-visible` | Scroll reveal, staggered by `--h-i` |

This file is global (imported from `index.astro`) rather than scoped per
component. **Deviation from the spec**, made deliberately: the spec assigned
scoped styles to each band, but eight components independently authoring mounts
and eyebrows would drift. Primitives are shared; per-band layout stays scoped.

- [ ] Write `src/styles/home.css` with all primitives above, including the
      `prefers-reduced-motion: reduce` block covering `.h-reveal`, `.h-btn`,
      `.h-row`, `.h-mount` and `.h-link`.
- [ ] Commit.

---

## Task 4: Bands 1 and 4 — hero and Potbelly flagship

These two carry the design language and are built together so the mount, mosaic
and button treatments are settled before the remaining bands copy them.

**Files:**
- Create: `src/components/home/HomeHero.astro`, `src/components/home/HomePotbelly.astro`

Hero: eyebrow, `h1`, lead, one primary action (`Research` →
`/grants-and-investigations`) plus two quiet links (`About CMS`, `Publications`),
and a four-slot fact rail — Founded 2015 · PARU Uaxactun since 2016 · digitised
record count from `totalRecords` · Visitors (`id="visit-count"`, marked live).
Right side: poster in a mount, `model-viewer` auto-loading exactly as the current
`index.astro:237-262` does, load button demoted to a corner affordance shown only
on failure, caption carrying the real record code.

Potbelly: `.h-band--abyss` on `.h-track--wide`. Left column eyebrow, `h2`,
two-sentence lead, links to `/potbelly-sculptures/3d-database` and
`/potbelly-sculptures/gis-database`, metric line. Right column asymmetric mosaic
of `evenlySampled(5)` posters in mounts, each linking `recordHref(record)`.
Single column below 768px.

- [ ] Build both components.
- [ ] Commit.

---

## Task 5: Bands 2, 3, 5, 6, 7, 8

**Files:**
- Create: `HomeNotice.astro`, `HomeScope.astro`, `HomeRecent.astro`,
  `HomeParu.astro`, `HomeWayfinding.astro`, `HomeCloser.astro`

Notice takes `notice: { label, text, href? } | null` and renders nothing when
null. Scope renders the fixed sentence:

> Focused on the Maya and Nahua regions, across archaeology, epigraphy, astronomy,
> manuscripts, iconography, religion, historical thought, collections, and teaching.

plus a `Read the history` link to `/about-us`. Recent renders `newest(6)` as
poster mounts with record code and date, six-up on desktop and scroll-snap below
768px. Paru renders rewritten copy, four ruled rows (History, Maps and papers,
Investigations, Artefacts) and `Image3_001_3rkHXPjTVctvRGNIwGZvP` in a mount.
Wayfinding renders the six-entry grid. Closer renders the address and contact
links.

- [ ] Build all six components.
- [ ] Commit.

---

## Task 6: Composition and cleanup

**Files:**
- Modify: `src/pages/index.astro` (full rewrite), `astro.config.mjs`, `package.json`

- [ ] Rewrite `index.astro` as imports, the `notice` value, band composition, and
      a single script owning the visitor count, model loading and staggered
      reveal observer.
- [ ] Remove `tailwindcss` + `@tailwindcss/vite` from `package.json` and the
      `vite.plugins` array in `astro.config.mjs`.
- [ ] Run `npm run check` and `npm run build`.
- [ ] Commit.

---

## Task 7: Verification

- [ ] `npm run build` clean.
- [ ] Homepage rendered at 1512px and 390px, compared to pre-change screenshots.
- [ ] Contrast sampled on rendered output against the computed table in the spec.
- [ ] Keyboard traversal: focus order matches visual order, all states visible.
- [ ] `prefers-reduced-motion: reduce` emulated; no motion.
- [ ] Poster deep link selects the correct record on the 3D database page.
- [ ] Notice set and unset; band renders and fully disappears.
- [ ] `about-us`, `publications`, and one Webstudio page spot-checked.
- [ ] Visitor counter renders; assigned via `textContent` only, never parsed.
      The GoatCounter response is a preformatted string using U+202F as its
      thousands separator.
- [ ] Grep confirms `"not a vague feature block"` is gone.
