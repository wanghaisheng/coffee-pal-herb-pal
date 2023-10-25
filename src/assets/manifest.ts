import type { ManifestOptions } from 'vite-plugin-pwa';
import { routes } from '../lib/config/routes';

export default {
  name: 'Coffee Pal',
  short_name: 'Coffee Pal',
  description: 'Collection of tools related to preparing coffee.',
  categories: ['productivity', 'utilities'],
  id: '/',
  start_url: '/',
  lang: 'en-US',
  dir: 'ltr',
  display: 'standalone',
  orientation: 'any',
  theme_color: '#081638',
  background_color: '#dbdee7',
  handle_links: 'preferred',
  launch_handler: {
    client_mode: ['focus-existing', 'auto'],
  },
  icons: [
    {
      src: 'icons/icon192_any.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: 'icons/icon192_maskable.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'maskable',
    },
    {
      src: 'icons/icon512_any.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: 'icons/icon512_maskable.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable',
    },
  ],
  screenshots: [
    {
      src: 'screenshots/desktop/journal-overview.jpeg',
      sizes: '1400x800',
      type: 'image/jpeg',
      form_factor: 'wide',
      label: 'Brewing Journal',
    },
    {
      src: 'screenshots/desktop/journal-add-entry.jpeg',
      sizes: '1400x800',
      type: 'image/jpeg',
      form_factor: 'wide',
      label: 'Brewing Journal New Entry',
    },
    {
      src: 'screenshots/desktop/my-coffees-overview.jpeg',
      sizes: '1400x800',
      type: 'image/jpeg',
      form_factor: 'wide',
      label: 'My Coffees',
    },
    {
      src: 'screenshots/desktop/calculator.jpeg',
      sizes: '1400x800',
      type: 'image/jpeg',
      form_factor: 'wide',
      label: 'Brewing Calculator',
    },
    {
      src: 'screenshots/desktop/drip-counter.jpeg',
      sizes: '1400x800',
      type: 'image/jpeg',
      form_factor: 'wide',
      label: 'Drip Counter',
    },
    {
      src: 'screenshots/mobile/journal-overview.jpeg',
      sizes: '412x915',
      type: 'image/jpeg',
      form_factor: 'narrow',
      label: 'Brewing Journal',
    },
    {
      src: 'screenshots/mobile/journal-add-entry.jpeg',
      sizes: '412x915',
      type: 'image/jpeg',
      form_factor: 'narrow',
      label: 'Brewing Journal New Entry',
    },
    {
      src: 'screenshots/mobile/my-coffees-overview.jpeg',
      sizes: '412x915',
      type: 'image/jpeg',
      form_factor: 'narrow',
      label: 'My Coffees',
    },
    {
      src: 'screenshots/mobile/calculator.jpeg',
      sizes: '412x915',
      type: 'image/jpeg',
      form_factor: 'narrow',
      label: 'Brewing Calculator',
    },
    {
      src: 'screenshots/mobile/drip-counter.jpeg',
      sizes: '412x915',
      type: 'image/jpeg',
      form_factor: 'narrow',
      label: 'Drip Counter',
    },
  ],
  shortcuts: routes.slice(0, 4).map(({ href, label, shortcutIcon }) => ({
    name: label,
    url: href,
    icons: shortcutIcon ? [shortcutIcon] : undefined,
  })),
  edge_side_panel: {
    preferred_width: 660,
  },
} satisfies Partial<ManifestOptions>;
