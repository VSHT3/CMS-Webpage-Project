# Center for Mesoamerican Studies — Website

Website for the Center for Mesoamerican Studies, Faculty of Arts, Comenius University Bratislava.

## Stack

- **Astro 6** — static site generation, View Transitions
- **React 19** — islands only
- **Tailwind CSS 4** — via Vite plugin, no config file

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

Two-tier: native Astro pages in `src/pages/` shadow the catch-all `[...slug].astro`, which serves 36 legacy Webstudio HTML pages from `legacy/source-html/`.

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

See `CLAUDE.md` for full architecture notes.
