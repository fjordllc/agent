import Companies from "@components/Companies";
import { listCompanies } from "@/server/services/companies";

export default async function CompaniesPage() {
  const companies = await listCompanies();

  return (
    <>
      <Companies companies={companies} />
    </>
  );
}
