import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://mesoamerica.eu',
  outDir: './dist',
  trailingSlash: 'ignore',
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});
