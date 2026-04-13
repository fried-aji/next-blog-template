# Next.js BLOG Template

Next.jsの練習用に作成したブログサイトのテンプレートです。

## 必要なツール

| ツール | バージョン | 用途 |
|--------|-----------|------|
| [mise](https://mise.jdx.dev/) | — | Node.js・pnpm のバージョン管理 |
| Node.js | 24.14.1 | ランタイム |
| pnpm | 10.33.0 | パッケージマネージャー |

mise を使ってバージョンを揃えます：

```bash
$ mise install
```

## 環境準備

```bash
$ pnpm i
$ pnpm dev
```

## スクリプト

| コマンド | 説明 |
|---------|------|
| `pnpm dev` | 開発サーバーを起動 |
| `pnpm dev:trace` | Turbopack トレース付きで開発サーバーを起動 |
| `pnpm build` | プロダクションビルド |
| `pnpm build:heapprofile` | ヒーププロファイル付きでビルド |
| `pnpm start` | プロダクションサーバーを起動 |
| `pnpm lint` | oxlint で `src/` を静的解析 |
| `pnpm lint:fix` | oxlint で自動修正 |
| `pnpm format` | oxfmt でフォーマット |
| `pnpm format:check` | oxfmt でフォーマットチェック |

## ディレクトリ構造

```
.
├── public/                  # 静的ファイル
└── src/
    ├── actions/             # 汎用Server Actions
    ├── app/                 # App Router
    │   ├── (pages)/         # ページレイアウトグループ
    │   ├── layout.tsx       # ルートレイアウト
    │   ├── page.tsx         # トップページ
    │   ├── error.tsx        # エラーページ
    │   ├── not-found.tsx    # 404 ページ
    │   ├── robots.ts        # robots.txt
    │   ├── sitemap.ts       # サイトマップ
    │   └── manifest.ts      # Web App Manifest
    ├── components/          # 汎用コンポーネント
    ├── constants/           # 汎用定数
    ├── content/             # 記事データ（.mdx）
    ├── hooks/               # 汎用カスタムフック
    ├── lib/                 # ライブラリ関連
    ├── schemas/             # 汎用バリデーションスキーマ
    ├── stores/              # 状態管理
    ├── styles/              # グローバルCSS（Tailwind）
    ├── types/               # 汎用型定義
    ├── utils/               # ユーティリティ関数
    └── mdx-components.tsx   # MDX コンポーネントマッピング
```

## Next MCP の使用方法

[next-devtools-mcp](https://github.com/next-devtools/next-devtools-mcp) (
`.mcp.json`)により、開発サーバーの状態をAIエージェントから確認できるようになっています。

Claude CodeなどのMCP対応クライアントで開くと自動的に有効になります。

### 提供されるツールの例
- `nextjs_docs` — Next.js ドキュメントを検索
- `nextjs_call` — Next.js の API を呼び出し
- `browser_eval` — ブラウザで JavaScript を実行して動作確認

## 参考リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
