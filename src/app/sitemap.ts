import fs from 'node:fs';
import path from 'node:path';

import type { MetadataRoute } from 'next';

import { siteUrl } from '@/constants';
import { getAllPosts } from '@/lib/blog';

function getStaticRoutes(): string[] {
  const appDir = path.join(process.cwd(), 'src/app');

  function scan(dir: string): string[] {
    const routes: string[] = [];

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        const { name } = entry;
        // 動的ルート（[slug] など）はスキップ
        if (name.startsWith('[')) {
          continue;
        }
        routes.push(...scan(path.join(dir, name)));
      } else if (
        entry.name === 'page.tsx' ||
        entry.name === 'page.ts' ||
        entry.name === 'page.jsx' ||
        entry.name === 'page.js'
      ) {
        // ファイルパスをURLに変換
        const relative = path.relative(appDir, dir);
        const segments = relative
          .split(path.sep)
          // ルートグループ (pages) などを除去
          .filter((s) => !(s.startsWith('(') && s.endsWith(')')));
        const route = `/${segments.join('/')}`;
        routes.push(route);
      }
    }

    return routes;
  }

  return scan(appDir);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = getStaticRoutes();

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  return [...staticPages, ...blogPages];
}
