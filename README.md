# Center for Mesoamerican Studies — Website

Website for the Center for Mesoamerican Studies, Faculty of Arts, Comenius University Bratislava.

## Stack

- **Astro 7** — static site generation, View Transitions
- **Tailwind CSS 4** — via Vite plugin, no config file

No UI framework. Every component is `.astro`; there are no client islands.

## Development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # output → /dist
npm run preview    # preview /dist locally
npm run check      # type-check
```

Requires Node ≥ 22.12.0 (see `.node-version`).

## Routing

Two-tier: native Astro pages in `src/pages/` shadow the catch-all `[...slug].astro`, which serves the remaining legacy Webstudio HTML pages from `legacy/source-html/`.

Of the 32 legacy sources, 10 are already shadowed by native pages and only `/events` and `/publications` still carry real content. The other 19 are unwritten stubs — heading, `<hr>`, nothing else. Handling for those (an honest "being prepared" state plus `noindex`) lives on the unmerged `feat/mobile-nav-redesign` branch.

## PDFs

`public/assets/pdfs/` is gitignored. Upload manually to the server or mount as a persistent volume in Coolify. Structure:

```
public/assets/pdfs/
  grants/
  publications/
  reports/uaxactun/
  reports/peten/
```

## Deploy

Build with Docker (multi-stage Node → nginx):

```bash
docker build -t cms-web .
```

Or push to GitHub and let Coolify build from the Dockerfile. Mount the PDF directory as a persistent volume:

- Container path: `/usr/share/nginx/html/assets/pdfs`
- Host path: `/data/coolify/applications/<app-id>/pdfs`

Live at: [cms.fedu.uniba.sk](https://cms.fedu.uniba.sk)
