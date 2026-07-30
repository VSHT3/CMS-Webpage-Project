# Homepage Redesign — Design

Date: 2026-07-30
Branch: `feat/homepage-redesign`
Status: approved for planning

## Problem

The homepage at `src/pages/index.astro` (947 lines) has five bands: hero, intro
ribbon, a four-card link grid, a PARU Uaxactun band, and a second four-card link
grid. Observed problems, verified against the rendered page and the repository:

1. **No imagery below the hero.** The page is text-only after the first screen,
   on a site for an archaeology research center.
2. **Two link menus do the same job.** `domains-section` ("Start with the section
   that matches your visit") and `institute-section` ("Find the part of the center
   you actually need") are both wayfinding grids, and both list Research and
   Publications. The site nav already covers this once.
3. **No signal of activity.** No recent work, no upcoming events. The center reads
   as dormant.
4. **Copy addresses the developer.** `"organized as a project archive, not a vague
   feature block"` is design-review language shipped to visitors.
5. **One flat tone.** Every band is transparent over a single body gradient, so the
   page is one continuous field with no chapter structure.
6. **No webfont is loaded.** `--site-font` is `'Palatino Linotype', Palatino, 'Book
   Antiqua', Georgia, serif` — a system chain that resolves differently on every
   platform. All display type, eyebrows, buttons and metadata are set in it.
7. **The flagship digital output is invisible.** The Potbelly Sculptures 3D database
   (26 photogrammetric records) and GIS database are the newest and most
   distinctive work and are not referenced on the homepage.
8. **Incoherent hero affordance.** The "Load view" button presents the 3D model as
   click-to-load, but `index.astro:237-262` already auto-loads it on
   `requestIdleCallback` + `IntersectionObserver`. The button fires itself.
9. **Dead dependency.** `tailwindcss` and `@tailwindcss/vite` are wired into
   `astro.config.mjs`; there are zero Tailwind utility classes in `src/`.

## Decisions

Settled with the user during brainstorming:

| Question | Decision |
| --- | --- |
| Scope | Visual craft **and** structure. Content facts unchanged; sections may be merged, dropped, reordered; weak copy lines may be rewritten. |
| Audience | Academic peers **and** general public, co-equal. |
| Flagship | Potbelly Sculptures databases lead; PARU Uaxactun second. |
| Visual direction | Deepen the existing dark teal identity. Not a light theme, not photography-led. |
| Activity signal | Auto-derived from `potbelly-models.json`, plus one hand-edited notice string. |
| Typography | Source Serif 4 (display + body) with Geist (UI microtype). |
| Blast radius | Global tokens (font, palette, spacing) change site-wide; layout work is homepage-only. Nav and Footer are not restructured. |
| Radius language | Restrained nested mounts — 10px outer shell, 6px inner core — on media only. Text and rules stay square. |
| `Visitors` stat | Kept, and kept visible. Not relocated to the footer. |
| `"not a vague feature block"` | Cut. |

### Why not squircles

The premium-UI default would be `rounded-[2rem]` squircles with nested enclosures
throughout. Rejected after rendering an A/B/C comparison against the real palette
and a real poster: 2rem squircles plus pill buttons read as product UI and fight
the archival tone that square rules currently establish. The restrained 10/6px
mount was chosen for a functional reason as well as a tonal one — the 26 potbelly
posters are baked with their own background teal, which does not match the page
teal. A flush square edge turns that mismatch into a visible seam; a mount reads
as deliberate matting.

## Foundations

### Type

Three token roles replace the single `--site-font`:

| Token | Face | Applied to |
| --- | --- | --- |
| `--site-font-display` | Source Serif 4 Variable | `h1`–`h3`, pull quotes |
| `--site-font-body` | Source Serif 4 Variable | body copy, leads |
| `--site-font-ui` | Geist Variable | eyebrows, labels, buttons, dates, record codes |

Self-hosted in `public/fonts/`. Subset to `latin` + `latin-ext` — Slovak diacritics
are required (`Štúrova`, member names). Two variable WOFF2 files, both preloaded
in `Layout.astro`'s `<head>`, `font-display: swap`, with `size-adjust`,
`ascent-override` and `descent-override` on the fallback `@font-face` so swap
causes no layout shift.

Moving eyebrows, buttons and metadata off the serif onto Geist is the single
largest perceived-quality change. Uppercase letterspaced Palatino currently
renders soft at small sizes.

### Palette

`html` and `body` currently paint the same 180° gradient and every section is
transparent. Replace with a flat deep base; bands paint themselves from a
four-step tonal scale so the page reads as chapters.

```
--site-bg-abyss    oklch(0.12 0.020 204)   flagship / full-bleed media
--site-bg-deep     oklch(0.15 0.022 202)   base page
--site-bg          oklch(0.19 0.030 204)   standard chapters
--site-bg-raised   oklch(0.24 0.028 198)   cards, mounts, panels
```

Hue stays in 198–205. `--site-gold` `oklch(0.76 0.08 92)` and `--site-teal`
`oklch(0.68 0.075 178)` remain accents only.

Contrast was computed for this palette before planning, not deferred. Ratios
against each background tier:

| | abyss | deep | bg | raised |
| --- | --- | --- | --- | --- |
| `--site-text` | 15.05 | 14.56 | 13.63 | 12.11 |
| `--site-text-strong` | 17.52 | 16.96 | 15.87 | 14.10 |
| `--site-text-dim` | 8.89 | 8.61 | 8.05 | 7.16 |
| `--site-gold` | 9.46 | 9.15 | 8.56 | 7.61 |
| `--site-teal` | 7.29 | 7.06 | 6.61 | 5.87 |

Every pair clears WCAG AA body text (4.5:1); all but teal-on-raised clear AAA
(7:1). No combination in this palette requires a size or weight exception. The
figures still get re-checked against the rendered page during verification, since
`color-mix` compositing and image backdrops can differ from the flat values.

The scale is **additive**. `--site-surface`, `--site-surface-raised` and
`--site-bg-alt` keep their current values and are not removed — the other 36
pages reference them, and repointing them is out of scope. Only `--site-bg` and
`--site-bg-deep` have their values adjusted; `--site-bg-abyss` and
`--site-bg-raised` are new. `--site-bg-raised` is introduced as a semantic alias
for the mount surface rather than a replacement for `--site-surface`.

### Material

Media containers only:

- Outer shell: `border-radius: 10px`, `1px` hairline `--site-border`, `6px` padding,
  background `color-mix(in oklab, var(--site-bg-raised) 55%, transparent)`.
- Inner core: `border-radius: 6px`, `overflow: hidden`, one inset highlight
  `inset 0 1px 0 oklch(1 0 0 / 0.07)`.

Text blocks, rules, fact rails and wayfinding rows stay square.

### Spacing

Chapter padding moves from `clamp(2.5rem, 6vw, 5rem)` to
`clamp(4.5rem, 9vw, 9rem)`. Text track stays `min(1180px, calc(100% - 2rem))`;
flagship media gets a wider `min(1440px, calc(100% - 2rem))` track.

### Motion

`--site-ease-out: cubic-bezier(0.22, 1, 0.36, 1)` is retained and used everywhere.
No `linear`, no `ease-in-out`. The existing `IntersectionObserver` reveal is
extended to stagger direct children at 60ms increments. Only `transform` and
`opacity` animate. Every new animated selector must be listed in the existing
`prefers-reduced-motion: reduce` block.

## Page structure

Eight bands replace five. Two of the five were duplicates.

```
1 Hero              identity, fact rail, live 3D model
2 Notice            single editable string; renders nothing when null
3 Scope band        Maya/Nahua regions + discipline list, compressed to one ruled line
4 Potbelly flagship abyss chapter, poster mosaic, links to 3D + GIS databases
5 Recently digitised auto strip, six newest records
6 PARU Uaxactun     secondary band, reconstruction render, four ruled rows
7 Wayfinding        one consolidated six-entry grid
8 Closer            address and contact, above the existing Footer
```

Mapping from the current page: `intro-ribbon` is compressed into band 3, not cut.
`domains-section` and `institute-section` merge into band 7.

### 1 · Hero

Eyebrow, `h1` and lead keep their current text. The three equal-weight buttons
gain hierarchy: **Research** (`/grants-and-investigations`) becomes the single
primary action, **About CMS** and **Publications** become quiet secondary links.
Research leads because it is the one destination both audiences want. Today all
three carry identical visual weight, which establishes no hierarchy at all.

Fact rail keeps four slots:

| Slot | Value |
| --- | --- |
| Founded | 2015 |
| Flagship fieldwork | PARU Uaxactun since 2016 |
| Digitised records | derived from `potbelly-models.json` length |
| Visitors | GoatCounter, marked as a live value |

`Core strength — Research, collections, doctoral support` is replaced by the
record count: it is specific, it is a number, and it updates itself.

The `Visitors` slot is visually marked as live (a small indicator) so it does not
read as a historical fact peer to "Founded 2015". It stays in the rail.

Right side: the poster renders immediately inside a mount. The model auto-loads
exactly as it does today (`requestIdleCallback` → `IntersectionObserver` →
`model-viewer`). The load button demotes to a small corner affordance that
surfaces only when auto-load has failed, preserving the existing retry path. The
caption carries the record code instead of the generic "Collection object".

### 2 · Notice

One exported value at the top of `index.astro`:

```ts
const notice: { label: string; text: string; href?: string } | null = null;
```

When `null`, the band does not render — no empty container, no residual spacing.
When set, it renders as a slim gold-ruled band directly beneath the hero.

### 3 · Scope band

The current intro ribbon's substance is retained: the Maya and Nahua regions and
the discipline list are precisely what a peer scans for. Compressed from two
paragraphs to one ruled line plus the existing "Read the history" link.

Exact copy, so this is not left open at implementation time:

> Focused on the Maya and Nahua regions, across archaeology, epigraphy, astronomy,
> manuscripts, iconography, religion, historical thought, collections, and teaching.

The second current paragraph ("The site gathers the center's institutional
information, research activity, publications, collections, education, conferences,
and contact details") is **cut**. It describes the website's own table of contents,
which band 7 now does structurally.

### 4 · Potbelly flagship

Full-bleed `--site-bg-abyss` chapter on the 1440px track.

Left column: eyebrow, `h2`, two-sentence lead, links to
`/potbelly-sculptures/3d-database` and `/potbelly-sculptures/gis-database`, and a
metric line (record count · downloadable source meshes · GIS layers).

Right column: an asymmetric mosaic of five posters in mounts at varying sizes.
Each poster links to `/potbelly-sculptures/3d-database#<id>`. Deep-linking is
already supported — `3d-database.astro:511` reads `window.location.hash` and
selects the matching record, and `:452` writes it back.

The five are **evenly sampled across the full catalogue by index**, not taken from
the newest end. This is deliberate: band 5 shows the six newest records, so
drawing the mosaic from the same end would render the same posters twice on one
page. Even sampling also makes the mosaic represent the catalogue's range rather
than its most recent week.

Below 768px the mosaic collapses to a single column at equal sizes.

### 5 · Recently digitised

The six newest records from `potbelly-models.json`, each a poster mount with
record code and date in Geist.

Sorting must be defensive: some records have `date: null`. Null dates sort last;
they must never crash the comparator or surface as `Invalid Date`.

Six-up grid on desktop, scroll-snap carousel below 768px.

### 6 · PARU Uaxactun

Standard `--site-bg` chapter. Copy rewritten to remove the meta-language line.
The four sub-links (History, Maps and papers, Investigations, Artefacts) become
ruled rows. One image: `Image3_001_3rkHXPjTVctvRGNIwGZvP` — the 3D site
reconstruction render. Verified as PARU material: it appears only on
`paru-uaxactun-gallery`, captioned "PARU Uaxactun - Gallery visual material". It
is the only image-class asset that is research output rather than a phone
snapshot or stock photography.

### 7 · Wayfinding

One grid, six entries, replacing both current link grids:

| Label | Destination |
| --- | --- |
| Research & grants | `/grants-and-investigations` |
| Publications | `/publications` |
| Collections | `/collection-archaeological-collection` |
| Ferdinand Anders Library | `/ferdinand-anders-library` |
| PhD program | `/education-phd-program` |
| Bratislava Maya Meetings | `/bratislava-maya-meetings-history` |

Three columns on desktop, two on tablet, one below 768px.

### 8 · Closer

Štúrova 9 / Faculty of Arts, Comenius University Bratislava, with contact and
members links. Sits above the existing `Footer` component, which is unchanged.

## Code organization

`index.astro` is 947 lines. Eight bands in one file would exceed 1400. Split:

```
src/components/home/HomeHero.astro
src/components/home/HomeNotice.astro
src/components/home/HomeScope.astro
src/components/home/HomePotbelly.astro
src/components/home/HomeRecent.astro
src/components/home/HomeParu.astro
src/components/home/HomeWayfinding.astro
src/components/home/HomeCloser.astro
src/lib/potbelly.ts
```

Each band component owns its own markup and scoped styles and takes only the
props it needs. `index.astro` becomes composition plus the notice value.

`src/lib/potbelly.ts` holds the `ModelRecord` type, the null-safe date
comparator, and the derivations (`totalRecords`, `newest(n)`). `3d-database.astro`
currently declares its own `ModelRecord` interface inline and reads the JSON
directly; it is migrated to the shared module so there is one source of truth.

Global tokens and `@font-face` declarations live in `Layout.astro`'s existing
`is:global` style block.

## Performance

- At most 11 posters render (5 mosaic + 6 strip) out of 26. Every `<img>` carries
  explicit `width`/`height`, `decoding="async"`, and `loading="lazy"` past the
  first two.
- One GLB, ~315 KB, loaded on idle exactly as today. The 62 MB model directory is
  never bulk-loaded.
- Two preloaded WOFF2 files, latin + latin-ext subsets.
- `content-visibility: auto` is retained on below-fold chapters, with
  `contain-intrinsic-size` updated to match the new band heights.
- No `backdrop-filter` on scrolling content.
- Remove `tailwindcss` and `@tailwindcss/vite` from `package.json` and the
  `vite.plugins` array in `astro.config.mjs`.

## Accessibility

- Heading order: one `h1`, bands use `h2`, cards use `h3`.
- Contrast verified at WCAG AA for body text on all four background tiers.
- Every interactive element keeps a visible `:focus-visible` ring; the existing
  gold outline pattern is retained.
- The poster mosaic and record strip are lists of links with meaningful accessible
  names (record code plus date, not "image").
- `prefers-reduced-motion: reduce` disables every reveal, stagger and hover
  transform introduced.
- The notice band, when present, is not an `aria-live` region — it is static
  content at page load.

## Verification

1. `npm run build` succeeds with no new warnings.
2. Homepage rendered at 1512px and 390px; both compared against the pre-change
   screenshots.
3. Contrast sampled on body and dim text over all four background tiers.
4. Keyboard traversal of the full page: focus order matches visual order, every
   focus state visible.
5. `prefers-reduced-motion: reduce` emulated; no motion occurs.
6. Deep link `/potbelly-sculptures/3d-database#<id>` from a homepage poster selects
   the correct record.
7. Notice value set and unset; the band renders and fully disappears.
8. Three legacy Webstudio pages spot-checked for regressions from the global font
   and token change — `about-us`, `publications`, and the heaviest
   `WebstudioPage.astro` consumer.
9. Visitor counter still renders a value; it is assigned via `textContent` only.
   The GoatCounter response is a preformatted string using U+202F as the thousands
   separator, so it must never be parsed as a number.

## Out of scope

- Nav and Footer restructuring. They inherit the new tokens; their layout is
  untouched.
- Restructuring any of the other 36 pages.
- A news or events content collection. `content.config.ts` stays empty.
- Replacing the weak photographic assets. The stock rainforest image
  (`the-1865639`) and the phone snapshots are simply not used on the homepage.
- Light theme, and any change to the site's dark identity.
