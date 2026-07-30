import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://mesoamerica.eu',
  outDir: './dist',
  trailingSlash: 'ignore',

  vite: {
    plugins: [tailwindcss()]
  }
});
