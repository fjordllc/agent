// 📂 src/lib/supabaseServer.ts

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "./database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase の環境変数が正しく設定されていません！");
}

// サーバーサイド（Next.js のサーバーコンポーネント用）の Supabase クライアント
export function createSupabaseServerClient() {  // ← `export function` にする！
  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => cookies().getAll(),
    },
  });
}
