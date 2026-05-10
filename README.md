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
*Project URL* (旧 API URL) を`NEXT_PUBLIC_SUPABASE_URL`に、*Publishable key* (旧 anon key) を`NEXT_PUBLIC_SUPABASE_ANON_KEY`に設定する。

`.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=Project URLを設定する
NEXT_PUBLIC_SUPABASE_ANON_KEY=Publishable keyを設定する
```

> Supabase CLI 2.86以降で`supabase status`の出力ラベルが変更されたが、JWT としては従来のanon keyと互換のため`NEXT_PUBLIC_SUPABASE_ANON_KEY`という変数名はそのまま使える。
> 表形式の出力をシェルで扱いにくい場合は、以下のコマンドで直接`.env`形式の出力が得られる:
>
> ```console
> npx supabase status -o env \
>   --override-name api.url=NEXT_PUBLIC_SUPABASE_URL \
>   --override-name auth.anon_key=NEXT_PUBLIC_SUPABASE_ANON_KEY
> ```

## 実行

```console
npm run dev
```

`http://localhost:3000/`にアクセスする。

## その他

[Agent Wiki](https://github.com/fjordllc/agent/wiki)
