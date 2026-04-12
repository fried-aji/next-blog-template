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
    ├── actions/             # Server Actions
    ├── app/                 # App Router
    │   ├── (pages)/         # ページレイアウトグループ
    │   │   ├── about/       # About ページ
    │   │   └── blog/        # ブログ一覧・記事詳細
    │   │       └── [slug]/  # 動的ルート（記事詳細）
    │   ├── layout.tsx       # ルートレイアウト
    │   ├── page.tsx         # トップページ
    │   ├── error.tsx        # エラーページ
    │   ├── not-found.tsx    # 404 ページ
    │   ├── robots.ts        # robots.txt
    │   ├── sitemap.ts       # サイトマップ
    │   └── manifest.ts      # Web App Manifest
    ├── components/
    │   ├── helper/          # ユーティリティコンポーネント
    │   ├── layout/          # ヘッダー等のレイアウト
    │   └── ui/              # 汎用 UI コンポーネント
    ├── constants/           # 定数
    ├── content/
    │   └── blog/            # ブログ記事（.mdx）
    ├── hooks/               # カスタムフック
    ├── lib/                 # ユーティリティ関数
    ├── schemas/             # バリデーションスキーマ
    ├── stores/              # 状態管理
    ├── styles/              # CSS ファイル
    ├── types/               # 型定義
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
