import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ロール取得（userが存在すれば）
  let role: string | null = null;
  if (user) {
    const { data, error } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (data && !error) {
      role = data.role;
    }
  }

  return (
    <header id="app-header" className="bg-indigo-600 text-white">
      <div className="container">
        <div className="flex h-16 items-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold">Fjord Agent</span>
          </Link>
          <NavigationMenu className="ml-auto">
            <NavigationMenuList>
              {user ? (
                <>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="/logout"
                      className={navigationMenuTriggerStyle()}
                    >
                      ログアウト
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  {role && (
                    <NavigationMenuItem>
                      <span className="ml-4 text-sm text-white">
                        ロール: {role}
                      </span>
                    </NavigationMenuItem>
                  )}
                </>
              ) : (
                <>
                  <NavigationMenuItem>
                    <Link
                      href="/signup"
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mr-2"
                    >
                      ユーザー登録
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      href="/login"
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                      ログイン
                    </Link>
                  </NavigationMenuItem>
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
}
