import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import supabase from "../lib/supabase";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  async function signOut() {
    await supabase.auth.signOut();
    alert("ログアウトしました。");
    router.push("/");
    router.reload();
  }

  return (
    <nav className="bg-white border-b border-gray-200 fixed z-30 w-full h-16">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <a
              href="https://demo.themesberg.com/windster/"
              className="text-xl font-bold flex items-center lg:ml-2.5"
            >
              <Image src="pjord.svg" className="h-8 mr-2" alt="Logo" />
              <span className="self-center whitespace-nowrap">Fjord Agent</span>
            </a>
          </div>
          <div className="flex items-center">
            <button onClick={signOut}>
              <ArrowLeftOnRectangleIcon className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
