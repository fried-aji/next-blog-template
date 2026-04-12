import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  trailingSlash: true,
  // logging: {
  //   fetches: {
  //     fullUrl: true,
  //   },
  // },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    rehypePlugins: [
      //
      "rehype-unwrap-images",
    ],
    remarkPlugins: [
      // YAMLブロック（---〜---）をHTMLとしてレンダリングせずスキップ
      "remark-frontmatter",
      // スキップしたYAMLを `export const frontmatter = {...}` に変換
      "remark-mdx-frontmatter",
      // GFM（テーブル・打ち消し線・タスクリスト等）を有効化
      "remark-gfm",
    ],
  },
});

// MDX設定とNext.js設定をマージ
export default withMDX(nextConfig);
