import { asc } from "drizzle-orm";
import { getDb } from "@/server/db";
import { companies, type Company, type NewCompany } from "@/server/db/schema";

export async function listCompanies(): Promise<Company[]> {
  return getDb().select().from(companies).orderBy(asc(companies.name));
}

export async function createCompany(input: NewCompany): Promise<void> {
  await getDb().insert(companies).values(input);
}
