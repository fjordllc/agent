# Fjord Agent

エンジニア紹介の管理ツール

## インストール

```console
npm install
```

supabaseのローカル環境の立ち上げ

```console
npx supabase start
```

ローカル環境用の環境変数を設定

```console
cp .env.local.example .env.local
```

`npx supabase status`で各種設定値が見れるのでその中の*API URL*を`NEXT_PUBLIC_SUPABASE_URL`に、*anon key*を`NEXT_PUBLIC_SUPABASE_ANON_KEY`に設定する。

```
NEXT_PUBLIC_SUPABASE_URL=API URLを設定する
NEXT_PUBLIC_SUPABASE_ANON_KEY=anon keyを設定する
```

## 実行

```console
npm run dev
```

`http://localhost:3000/`にアクセスする。
