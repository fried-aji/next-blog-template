import type { Metadata } from 'next';

import { siteOgp } from '@/constants';

export function createMetadata(pathname: string, overrides?: Partial<Metadata>): Metadata {
  return {
    alternates: { canonical: pathname },
    openGraph: {
      ...siteOgp,
      url: pathname,
      type: 'article',
    },
    ...overrides,
  };
}
