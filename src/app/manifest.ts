import type { MetadataRoute } from 'next';

import { siteUrl, siteTitle, siteDescription } from '@/constants';

export default function manifest(): MetadataRoute.Manifest {
  return {
    lang: 'ja',
    name: siteTitle,
    short_name: siteTitle,
    description: siteDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      },
      {
        sizes: '180x180',
        src: '/apple-icon.png',
        type: 'image/png',
      },
    ],
    screenshots: [
      {
        sizes: '1200x630',
        src: `${siteUrl}/opengraph-image.png`,
        type: 'image/png',
      },
    ],
  };
}
