import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "./database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase の環境変数が正しく設定されていません！");
}

export async function createSupabaseServerClient() {
  const cookieStore = await cookies(); // Promise を解決

  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: async (newCookies) => {
        const updatedCookies = await cookies(); // 再度取得
        newCookies.forEach(({ name, value, options }) => {
          updatedCookies.set(name, value, options);
        });
      },
    },
  });
}
