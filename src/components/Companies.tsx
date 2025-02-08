import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Database } from "@/lib/database.types";
import Link from "next/link";

type ICompany = Database["public"]["Tables"]["companies"]["Row"];

export default function Companies() {
  const [companies, setCompanies] = useState<ICompany[]>();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function init() {
      const { data } = await supabase.auth.getSession();
      if (!data?.session) {
        await handleLogin();
      }
      if (isMounted) {
        await fetchCompanies();
      }
    }

    init();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (isMounted) {
        setSession(session);
      }
    });

    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  async function handleLogin() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "admin@example.com",
      password: "testtest",
    });

    if (error) {
      console.error("ログイン失敗:", error);
    } else {
      console.log("ログイン成功:", data);
      setSession(data.session ?? null);
    }
  }

  async function fetchCompanies() {
    const { data, error } = await supabase.from("companies").select("*");
    if (error) {
      console.error("データ取得エラー:", error);
    }
    if (data) {
      setCompanies(data);
    }
  }

  return (
    <>
      <div className="py-6 px-4 bg-white">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">企業</h1>

        <h2 className="text-gray-500">ログインユーザー: {session?.user?.email ?? "未ログイン"}</h2>

        {session ? (
          <button
            className="ml-4 px-3 py-2 bg-red-600 text-white"
            onClick={async () => {
              await supabase.auth.signOut();
              setSession(null);
            }}
          >
            ログアウト
          </button>
        ) : (
          <button className="ml-4 px-3 py-2 bg-cyan-600 text-white" onClick={handleLogin}>
            ログイン
          </button>
        )}

        <div className="sm:flex">
          <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
            <Link href="/companies/new" className="text-white bg-cyan-600 px-3 py-2">追加</Link>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden">
            <table className="table-fixed min-w-full border border-black">
              <thead className="bg-gray-100 border border-black">
                <tr className="border border-black">
                  <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase border border-black">Id</th>
                  <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase border border-black">Name</th>
                  <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase border border-black">Website</th>
                  <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase border border-black">Memo</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-black">
                {companies?.map((company) => (
                  <Company key={company.id} company={company} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

function Company({ company }: { company: ICompany }) {
  return (
    <tr className="hover:bg-gray-100 border border-black">
      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900 border border-black">{company.id}</td>
      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900 border border-black">{company.name}</td>
      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900 border border-black">
        <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a>
      </td>
      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900 border border-black">{company.memo}</td>
      <td className="p-4 whitespace-nowrap space-x-2 border border-black">
        <button className="text-white bg-cyan-600 hover:bg-cyan-700 px-3 py-2">編集</button>
        <button className="text-white bg-red-600 hover:bg-red-800 px-3 py-2">削除</button>
      </td>
    </tr>
  );
}
