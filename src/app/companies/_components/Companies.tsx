import { useEffect, useState } from "react";
import supabase from "../../../lib/supabase";
import { Database } from "../../../lib/database.types";

type ICompany = Database["public"]["Tables"]["companies"]["Row"];

export default function Companies() {
  const [companies, setCompanies] = useState<ICompany[]>();

  useEffect(() => {
    fetchCompanies();
  }, []);

  async function fetchCompanies() {
    const { data } = await supabase.from("companies").select("*");
    if (data) setCompanies(data);
  }

  return (
    <div id="app-companies" className="w-full">
      <div className="overflow-x-auto">
        <div className="align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden">
            <table className="table-fixed min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  <th
                    scope="col"
                    className="p-2 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    className="p-2 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="p-2 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    Website
                  </th>
                  <th
                    scope="col"
                    className="p-2 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    Memo
                  </th>
                  <th scope="col" className="p-4"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {companies?.map((company) => {
                  return <Company key={company.id} company={company} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

type CompanyProps = {
  company: ICompany;
};

function Company({ company }: CompanyProps) {
  return (
    <tr className="hover:bg-indigo-100">
      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
        {company.id}
      </td>
      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
        {company.name}
      </td>
      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
        {company.website}
      </td>
      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
        {company.memo}
      </td>
      <td className="p-4 whitespace-nowrap space-x-2">
        <button
          type="button"
          data-modal-toggle="user-modal"
          className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
        >
          編集
        </button>
        <button
          type="button"
          data-modal-toggle="delete-user-modal"
          className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
        >
          削除
        </button>
      </td>
    </tr>
  );
}
