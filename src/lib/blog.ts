import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';

// src/content/blog/ ディレクトリの絶対パスを取得
// process.cwd() はプロジェクトルート（next.config.ts があるディレクトリ）を返す
const CONTENT_DIR = path.join(process.cwd(), 'src/content/blog');

export type BlogFrontmatter = {
  title: string;
  date: string;
  description: string;
};

export type BlogMDXModule = {
  default: React.ComponentType;
  frontmatter: BlogFrontmatter;
};

export type BlogPost = BlogFrontmatter & {
  slug: string;
};

// .mdxを全件読み込み、frontmatterをパースしてBlogPostの配列として返す
export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(CONTENT_DIR);

  return (
    files
      // .mdx 以外のファイルを除外
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => {
        // ファイル名から拡張子を除いた部分をslugとして使用（例: "hello.mdx" → "hello"）
        const slug = file.replace(/\.mdx$/, '');

        // MDXファイルを文字列として読み込む
        const filePath = path.join(CONTENT_DIR, file);
        const raw = fs.readFileSync(filePath, 'utf8');

        // gray-matterでfrontmatterをパース（dataにfrontmatterのキーバリューが入る）
        const { data } = matter(raw);

        return {
          slug,
          title: data.title as string,
          date: data.date as string,
          description: data.description as string,
        };
      })
      // date の文字列比較で降順ソート（新しい記事が先頭）
      .toSorted((a, b) => (a.date > b.date ? -1 : 1))
  );
}
