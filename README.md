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

Native Astro pages in `src/pages/` own matching routes and shadow any same-path source in `legacy/source-html/`. Publications (`/publications`) and the PARU archaeological reports catalogue (`/paru-uaxactun-papers`) are native pages.

The catch-all `[...slug].astro` still serves the remaining legacy sources through `WebstudioPage.astro`. `WebstudioPage.astro` renders substantive legacy content and gives heading-only stubs an honest pending state with `noindex`, so search engines do not index them.

The MayaCal tools are available at `/mayacal/almanac-database` and `/mayacal/almanac-model`, linked from the research project and site search. Each Astro page embeds its self-contained application from `public/mayacal/<tool>/viewer/`, with a separate full-screen link. The model application is supplied in `Almanac_model.zip`; keep its scripts, styles, glyphs, and funding logo together when updating it. These assets are bundled into the static build and require no persistent volume.

## PDFs

Most files in `public/assets/pdfs/` are gitignored and live on the persistent Coolify volume. Six current grant deliverables are tracked deployment assets: the four MayaCal reports, the funded Potbelly preliminary database, and the Potbelly final report. Structure:

```
public/assets/pdfs/
  grants/
  publications/
  reports/uaxactun/
  reports/peten/
```

At container startup, `docker/40-seed-grant-pdfs.sh` refreshes those six canonical files in the mounted PDF volume from the versions bundled with the image.

To temporarily withhold a PDF, list its current and legacy URL paths in [`docker/withheld-pdfs.map`](docker/withheld-pdfs.map). The catalogue entry stays visible, PDF buttons and search previews disappear, and nginx returns a non-cacheable 404 for direct requests. The files stay on the Coolify volume.

To restore a publication, keep the existing PDF or upload a replacement to its current path on the volume (use the `/assets/pdfs/` entry for that title). Then remove both paths for that title from the list and redeploy. Leave `withheld-pdfs.map` in place even when it has no entries.

## Deploy

Build with Docker (multi-stage Node → nginx):

```bash
docker build -t cms-web .
```

Or push to GitHub and let Coolify build from the Dockerfile. Mount the PDF directory as a persistent volume:

- Container path: `/usr/share/nginx/html/assets/pdfs`
- Host path: `/data/coolify/applications/<app-id>/pdfs`

Live at: [mesoamerica.eu](https://mesoamerica.eu)
