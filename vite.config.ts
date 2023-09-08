import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import manifest from './src/assets/manifest';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';

export default defineConfig({
  define: {
    'import.meta.env.APP_VERSION': JSON.stringify(process.env.npm_package_version),
    'process.env.NODE_ENV': '"production"',
  },
  plugins: [
    sveltekit(),
    purgeCss(),
    SvelteKitPWA({
      strategies: 'injectManifest',
      manifest,
      minify: false,
      devOptions: {
        enabled: true,
        suppressWarnings: process.env.SUPPRESS_WARNING === 'true',
        type: 'module',
        navigateFallback: '/',
      },
    }),
  ],
  server: {
    host: '0.0.0.0',
  },
});
