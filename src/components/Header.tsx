import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { AuthError } from "@supabase/supabase-js";

export default async function Header() {
  const supabase = await createClient();
  let user = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data?.user;
  } catch (error) {
    if (error instanceof AuthError) {
      alert(error.message);
      console.error("Authentication error:", error.message);
    } else {
      throw error;
    }
  }

  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          Fjord Agent
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {user ? (
            <li>
              <Link href="/logout">ログアウト</Link>
            </li>
          ) : (
            <>
              <li>
                <Link href="/signup">ユーザー登録</Link>
              </li>
              <li>
                <Link href="/login">ログイン</Link>
              </li>
            </>
          )}
          <li>
            <details>
              <summary>ダミー</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li>
                  <a>Link 1</a>
                </li>
                <li>
                  <a>Link 2</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}
