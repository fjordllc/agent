# Fjord Agent

エンジニア紹介の管理ツール

## インストール

```console
npm install
```

supabaseのローカル環境の立ち上げ。

```console
npx supabase start
```

ローカル環境用の環境変数を設定する。
雛形が`.env.local.example`にあるので`.env.local`としてコピーする。

```console
cp .env.local.example .env.local
```

`npx supabase status`で見れる各種設定値を`.env.local`に書く。
*API URL*は`NEXT_PUBLIC_SUPABASE_URL`に、*anon key*を`NEXT_PUBLIC_SUPABASE_ANON_KEY`に設定する。

`.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=API URLを設定する
NEXT_PUBLIC_SUPABASE_ANON_KEY=anon keyを設定する
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=service role keyを設定する
```

## 実行

```console
npm run dev
```

`http://localhost:3000/`にアクセスする。

## その他

[Agent Wiki](https://github.com/fjordllc/agent/wiki)
