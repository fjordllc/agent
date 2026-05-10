# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Fjord Agent — エンジニア紹介の管理ツール。Next.js (App Router) + Supabase で構築。詳細は [Agent Wiki](https://github.com/fjordllc/agent/wiki) を参照。

## よく使うコマンド

```console
npm run dev              # 開発サーバー (http://localhost:3000)
npm run build            # 本番ビルド
npm run lint             # ESLint
npm run format           # eslint --fix + prettier -w
npm run test             # component (jest) + e2e (playwright) を順に実行
npm run test:component   # Jest のみ
npm run test:e2e         # Playwright のみ
```

単一テスト実行:

```console
npx jest path/to/file.test.tsx
npx jest -t "テスト名の部分一致"
npx playwright test e2e/login_then_logout.test.ts
```

Supabase ローカル環境:

```console
npx supabase start           # ローカルDB起動
npx supabase db reset        # マイグレーション + seed.sql 適用
npx supabase status -o env \
  --override-name api.url=NEXT_PUBLIC_SUPABASE_URL \
  --override-name auth.anon_key=NEXT_PUBLIC_SUPABASE_ANON_KEY
                              # .env.local 用の値を出力
```

DB スキーマを変更したら `supabase/database.types.ts` の再生成が必要。

## 環境セットアップ

- Node.js は `.tool-versions` / `.mise.toml` で固定 (22.22.2)。mise 推奨。
- `.env.local.example` を `.env.local` にコピーし、`npx supabase status` の値で埋める。
  - **Publishable key** (Supabase CLI 2.86以降のラベル) を `NEXT_PUBLIC_SUPABASE_ANON_KEY` に設定する。JWT 形式は従来の anon key と互換のため変数名はそのまま。

## アーキテクチャ

### ディレクトリ

- `src/app/` — Next.js App Router。ルートごとのページ (`auth/`, `companies/`, `dashboard/`, `login/`, `signup/`, `private/`, `docs/`, `tos/`, `privacy/` など)。
- `src/components/` — 再利用 UI。shadcn/ui (`components.json`) ベース。
- `src/lib/`
  - `supabase.ts` — クライアント側の Supabase シングルトン。
  - `database.types.ts` — `supabase/database.types.ts` から派生する DB 型。
- `src/utils/supabase/` — SSR 用クライアント生成と middleware (`updateSession`) を提供。
- `src/proxy.ts` — Next.js middleware エントリ。`updateSession` を呼んで認証セッションを更新する。`matcher` で静的アセットを除外。
- `src/contexts/`, `src/hooks/` — React コンテキストとフック。
- `src/schemas/` — Zod による入力スキーマ。`react-hook-form` + `@hookform/resolvers` と組み合わせて使用。
- `src/i18n/` — 多言語化 (現在は ja のみ)。
- `src/types/` — 共有型。
- `src/mocks/` — テスト用モック。
- `supabase/` — `migrations/`, `seed.sql`, `config.toml`, メールテンプレート、生成型定義。
- `e2e/` — Playwright テスト。`helpers/` と `constants.ts` を共有。

### 認証フロー

Supabase Auth + `@supabase/ssr` を使った Cookie ベースの SSR セッション。`src/proxy.ts` (Next.js middleware) が全リクエストで `updateSession` を実行し、サーバーコンポーネント・Route Handler でも有効なセッションを維持する。クライアント側は `src/lib/supabase.ts`、サーバー側は `src/utils/supabase/` のヘルパーを使い分ける。

### スタイリング

Tailwind CSS + shadcn/ui (`tailwindcss-animate`, `@tailwindcss/typography`)。`components.json` の設定で `npx shadcn` から追加可能。

### テスト構成

- **Jest** (`jest.config.ts`): `jsdom` 環境、`@/*` → `src/*` のエイリアス、`/e2e/` を除外。`next/jest` で Next.js 設定と `.env` を読み込む。`babel-jest` で変換 (SWC ではない)。
- **Playwright** (`playwright.config.ts`): `e2e/` を実行、CI では `retries: 2`/`workers: 1`。`webServer` が `npm run dev` を起動 (`reuseExistingServer: true`)。テストは Supabase ローカル環境が起動済みである前提。
- **supawright**: テスト用 Supabase ヘルパー。

## CI

`.github/workflows/ci.yml` は main 以外の push で動く。`lint` と `test` ジョブが並列。`test` ジョブは `npx supabase start` → `db reset` → `.env.local` 生成 → `npm run build` → `npm run test` の流れ。Playwright レポートを artifact として保存。

## デプロイ

Vercel にデプロイされる。`next.config.js` で `turbopack.root` を明示し複数 lockfile 警告を抑止している。
