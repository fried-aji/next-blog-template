@AGENTS.md

# 実装のルール
※参考：https://zenn.dev/k_mori/books/24320553af0956/viewer/2808af

## コード品質の担保
プルリクエスト提出前、およびAIエージェントがコードを変更または追加した際には、必ず以下のチェックを実施。


| チェック項目 | コマンド |
| ---- | ---- |
| フォーマット（oxfmt） | `pnpm format` |
| 静的解析（oxlint） | `pnpm lint` |
| TypeScriptの型エラーチェック | `pnpm typecheck` |
| ビルドエラーの確認 | `pnpm build` |

ただし、プルリクエストを分割した際に認識済みのエラーが残る場合は、その限りではない。段階的な改善を許容しつつ、最終的には全てのチェックをパスすることが絶対。

---

## TypeScript必須
すべてのコードはTypeScriptで記述。型安全性を確保することで、ランタイムエラーを減らし、リファクタリングの安全性を高める。

---

## 型定義は type で統一
型定義は interface ではなく type で統一。

---

## コメントは細かく記載
コードの意図や背景のコメントは細かく記載。特にライブラリを使用する場合、使用している関数やhooks、プロパティの意味や説明を詳細に記述すること。

```ts
export function UserSearchResult() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users', searchConditions],
    queryFn: () => fetchUser(userId),
    staleTime: Infinity, // 自動再取得を抑制し、ユーザー操作をトリガーに再取得を手動で制御したいため
    refetchOnMount: false, // SSRとの二重フェッチを避けるため
    placeholderData: keepPreviousData, // 再検索時も前回の検索結果を表示し続けるため
    ...
    ...
  });
}
```

---

## ディレクトリ構成
Next.jsのファイルベースルーティングとコロケーションパターンに準拠したディレクトリ構成を採用。
あくまでベースとなる構成のため、プロジェクトにおいて使用しない機能や追加で必要なものが発生した際は適宜カスタマイズすること。

```bash
src/
├─ app/                          // 画面・機能単位
│  ├─ (private)/                 // ログイン必須
│  │  ├─ actions/                // 固有Server Actions
│  │  ├─ apis/                   // 固有APIクライアント
│  │  ├─ components/             // 固有コンポーネント
│  │  ├─ constants/              // 固有定数
│  │  ├─ hooks/                  // 固有カスタムフック
│  │  ├─ stores/                 // 固有ストア（単一画面内だが階層が深く、複数コンポーネントで共有するようなデータ管理）
│  │  ├─ providers/              // 固有プロバイダー
│  │  ├─ schemas/                // 固有スキーマ
│  │  ├─ types/                  // 固有型定義
│  │  ├─ utils/                  // 固有ユーティリティ関数
│  │  └─ layout.tsx              // private用レイアウト
│  │
│  ├─ (public)/                  // ログイン任意
│  │  └─ layout.tsx              // public用レイアウト
│  │
│  └─ api/                       // Route Handlers（クライアントフェッチのBFF用）
│
├─ actions/                      // 汎用Server Actions
├─ apis/                         // 汎用APIクライアント
├─ components/                   // 汎用コンポーネント
├─ constants/                    // 汎用定数
├─ hooks/                        // 汎用カスタムフック
├─ stores/                       // グローバルストア
├─ providers/                    // 汎用プロバイダー
├─ lib/                          // ライブラリ関連
├─ schemas/                      // 汎用スキーマ
├─ types/                        // 汎用型定義
└─ utils/                        // ユーティリティ関数
```

---

### 基本方針

#### Featureベースの構成（コロケーション）
Next.jsのファイルベースルーティングとコロケーションパターンに準拠し、画面・機能固有のファイルは、対応するpage.tsxと同階層のディレクトリに配置し、複数箇所で使用するファイルは、appと同階層のディレクトリ内に配置する。
関連するコードを近くに配置することで、「このファイルがどこで使われているか」が明確になり、不要なファイルの削除や影響範囲の把握が容易になる。

#### プライベートフォルダの活用
画面ではないが機能として独立しているものは、プライベートフォルダ（_xxxxx）を使用すること。

#### ルートグループによる認証の分離
(private) と (public) のルートグループを使用し、認証の有無でディレクトリを分割。これにより、認証状態に応じたレイアウトやヘッダーの適用が明確になる。
また、認証が必要ない画面は静的レンダリングになることが多いため、Full Route Cache（≒SSG）を確実に適用させるためにも分離を推奨する。

### 詳細なルール

#### ルートレイアウトの制約
ルートレイアウト（app/layout.tsx）は必ずサーバーコンポーネントにし、直接動的API（cookies()、headers()など）を使用することは禁止とする。理由は以下の通り。

##### Full Route Cacheの対象外になる
ルートレイアウトで動的APIを使用すると、全画面が動的レンダリング（≒SSR）になるため、Full Route Cache（≒SSG）が使えなくなる。

##### PPRの恩恵が受けられなくなる
PPR（Partial Prerendering）の機能である、ルート内での静的レンダリング（≒SSG）と動的レンダリング（≒SSR）の併用による最適化の恩恵が受けられなくなる。

#### APIクライアントの配置ルール
apis直下のファイルは、リソース単位で配置し、サーバー用かクライアント用（GETのみ）かによってドット記法を使用する。

```bash
apis/
├─ users.server.ts   // サーバー用APIクライアント
└─ users.client.ts   // クライアント用APIクライアント（GETのみ）
```

基本方針としてサーバーフェッチはServer Componentsで直接行い、クライアントフェッチは、TanStack QueryとRoute Handlerを使用する。
APIクライアントをサーバー用とクライアント用で分ける理由は以下の通り。

1. セキュリティの観点
サーバー用のAPIクライアントでは、アクセストークン付与などの機密情報を扱う処理を直接行う。 
一方、クライアント用のAPIクライアントは、Route Handlerのエンドポイントを叩くため、機密情報を扱う処理をAPIクライアントに記載しない。
また、登録や更新は必ずServer Actionsで実行するため、クライアント用のAPIクライアントではGETのみを定義する。

2. エラー時のレスポンスの違い
サーバーフェッチのエラー時はResult型でレスポンスする。一方、クライアントフェッチでのエラーは、useQueryの戻り値のerrorに委任するため、エラーをthrowする必要がある。
この2つの違いがあるため、サーバー用とクライアント用でファイルを分けている。

##### サンプルコード
- サーバー用のAPIクライアント

```ts:apis/users.server.ts
import { request } from '@/lib/request'; // アクセストークン付与などを行っている共通関数
import type { Result } from '@/types/result';
import type { User } from '@/types/user';

// サーバー用APIクライアント
// 共通のrequest関数をラップし、Result型でレスポンス
export async function fetchUser(userId: string): Promise<Result<User>> {
  return await request<User>(`/api/users/${userId}`); // request内で直接外部APIを叩いている
}
```

- クライアント用のAPIクライアント

```ts:apis/users.client.ts
import type { User } from '@/types/user';

// クライアント用APIクライアント
// Route Handlerを叩き、失敗時はエラーをthrow
export async function fetchUser(userId: string): Promise<User> {
  const res = await fetch(`/api/users/${userId}`); // Route Handlerのエンドポイントを叩く

  if (!res.ok) {
    throw new Error('Failed to fetch user'); // エラーをthrowし、useQuery側でエラーを管理
  }

  return await res.json();
}
```

※登録や更新は必ずServer Actionsで実行するため、クライアント用のAPIクライアントでは定義せず、apis/xxx.server.tsに定義する（クライアント用のAPIクライアントではGETのみを定義すること）

#### Server Actionsとの連携
actions直下のServer Actions関数では、直接fetch処理は書かず、apis直下のAPIクライアントをimportして使用（API通信とServer Actionsでのロジックを分離し、保守性を高める）

```ts:actions/users.ts
'use server';

import { updateUser } from '@/apis/users.server';
import type { Result } from '@/types/result';
import type { User } from '@/types/user';

// Server Actions
// apis直下のAPIクライアントを使用
export async function updateUserAction(userId: string): Promise<Result<User>> {
  const result await updateUser(userId);

  if(result.isSuccess) {
    // 更新成功時のみ、Data Cacheを削除
    revalidateTag(`users-${userId}`);
  }

  return result;
}
```

#### ファイル・ディレクトリの命名規則

app配下のルーティングになるものは、Google検索におけるURL構造のベストプラクティスに沿ってケバブケースに、ファイル名はJavaScriptの慣習に沿ってキャメルケースとし、コンポーネントはReactのルールに沿ってアッパーキャメルケースとする。

| 対象 | 命名規則 | 例 |
| ---- | ---- | ---- |
| `app`配下のルーティングになるディレクトリ | ケバブケース | `user-profile/`, `search-results/` |
| コンポーネントのファイル | アッパーキャメルケース | `UserProfile.tsx,` `SearchForm.tsx` |
| その他のディレクトリ・ファイル | キャメルケース | `fetchUser.ts`, `userSchema.ts` |