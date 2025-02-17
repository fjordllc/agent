import { createSupabaseServerClient } from "@/lib/supabaseServer";
import Link from "next/link";
import { Database } from "@/lib/database.types";

type ICompany = Database["public"]["Tables"]["companies"]["Row"];

export default async function Companies() {
  const supabase = createSupabaseServerClient();

  const { data: user, error: userError } = await supabase.auth.getUser();
  if (userError) {
    console.error("ユーザー認証エラー:", userError.message);
    return <p>ユーザー認証に失敗しました。</p>;
  }

  const { data: companies, error } = await supabase.from("companies").select("*");

  if (error) {
    console.error("企業データの取得に失敗:", error.message);
    return <p>データの取得に失敗しました。</p>;
  }
  
  if (!user?.user) {
    return <p>ログインしてください。</p>;
  }
  
  return (
    <div className="py-6 px-4 bg-white">
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">企業一覧</h1>

      <div className="sm:flex">
        <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
          <Link href="/companies/new" className="text-white bg-cyan-600 px-3 py-2 rounded">
            追加
          </Link>
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
                  <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase border border-black">Actions</th>
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
    </div>
  );
}

function Company({ company }: { company: ICompany }) {
  return (
    <tr className="hover:bg-gray-100">
      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900 border border-black">
        {company.id}
      </td>
      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900 border border-black">
        {company.name}
      </td>
      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900 border border-black">
      {company.website ? (
        <a href={company.website} target="_blank" rel="noopener noreferrer">
          {company.website}
        </a>
      ) : (
        <span>No Website</span>
      )}
      </td>
      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900 border border-black">
        {company.memo}
      </td>
      <td className="p-4 whitespace-nowrap space-x-2 border border-black">
        <button type="button" className="text-white bg-cyan-600 px-3 py-2 rounded hover:bg-cyan-700">
          編集
        </button>
        <button type="button" className="text-white bg-red-600 px-3 py-2 rounded hover:bg-red-800">
          削除
        </button>
      </td>
    </tr>
  );
}
