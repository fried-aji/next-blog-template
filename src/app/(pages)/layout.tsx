import type { Metadata } from 'next';

import { siteOgp } from '@/constants';

export const metadata: Metadata = {
  openGraph: {
    ...siteOgp,
    type: 'article',
  },
};

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
