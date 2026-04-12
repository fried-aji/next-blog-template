import '@/styles/app.css';
import type { Metadata } from 'next';
import { Noto_Sans, Noto_Sans_JP } from 'next/font/google';

import { Header } from '@/components/layout/Header';
import { siteUrl, siteTitle, siteDescription, siteOgp } from '@/constants';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-ns',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-ns-jp',
});

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`,
  },
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  // ogp
  openGraph: {
    ...siteOgp,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${notoSans.variable} ${notoSansJP.variable} antialiased`}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
