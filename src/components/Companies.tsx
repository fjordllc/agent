import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Database } from "@/lib/database.types";
import Link from "next/link";

type ICompany = Database["public"]["Tables"]["companies"]["Row"];

export default function Companies() {
  const [companies, setCompanies] = useState<ICompany[]>();

  useEffect(() => {
    async function init() {
      await loginTest(); 
      await fetchCompanies();
    }
    init();
  }, []);

  async function loginTest() {
    console.log("🔑 ログインを試行...");
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "admin@example.com",
      password: "testtest",
    });

    console.log("🔑 ログイン結果:", data, error);
    
    const { data: session, error: sessionError } = await supabase.auth.getSession();
    console.log("🔑 セッション取得:", session, sessionError);
  }

  async function fetchCompanies() {
    console.log("🔍 認証ユーザーを確認...");
    const { data: user, error: authError } = await supabase.auth.getUser();
    console.log("👤 User:", user);
    if (authError) console.error("❌ Auth Error:", authError.message);

    console.log("🔍 認証セッションを確認...");
    const { data: session, error: sessionError } = await supabase.auth.getSession();
    console.log("🔑 Session:", session);
    if (sessionError) console.error("❌ Session Error:", sessionError.message);

    console.log("📡 会社情報を取得...");
    const { data, error } = await supabase.from("companies").select("*");
    console.log("Fetched Data:", data);
    console.log("Fetch Error:", error);

    if (error) {
      console.error("❌ データ取得エラー:", error.message);
    }
    if (data) {
      setCompanies(data);
    }
  }

  return (
    <>
      <div className="py-6 px-4 bg-white">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
          企業
        </h1>

        <div className="sm:flex">
          <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
            <Link
              href="/companies/new"
              className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
            >
              追加
            </Link>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden">
            <table
              className="table-fixed min-w-full border border-black"
              style={{ borderCollapse: "collapse", width: "100%" }}
            >
              <thead className="bg-gray-100 border border-black">
                <tr className="border border-black">
                  <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase border border-black">Id</th>
                  <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase border border-black">Name</th>
                  <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase border border-black">Website</th>
                  <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase border border-black">Memo</th>
                  <th scope="col" className="p-4"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-black">
                {companies?.map((company) => {
                  return <Company key={company.id} company={company} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

type CompanyProps = {
  company: ICompany;
};

function Company({ company }: CompanyProps) {
  return (
    <tr className="hover:bg-gray-100 border border-black">
      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900 border border-black">{company.id}</td>
      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900 border border-black">{company.name}</td>
      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900 border border-black">
        <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a>
      </td>
      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900 border border-black">{company.memo}</td>
      <td className="p-4 whitespace-nowrap space-x-2 border border-black">
        <button type="button" className="text-white bg-cyan-600 hover:bg-cyan-700 px-3 py-2">編集</button>
        <button type="button" className="text-white bg-red-600 hover:bg-red-800 px-3 py-2">削除</button>
      </td>
    </tr>
  );
}
