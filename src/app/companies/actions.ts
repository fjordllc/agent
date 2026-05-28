"use server";

import { redirect } from "next/navigation";
import { createCompany } from "@/server/services/companies";

export async function createCompanyAction(input: {
  name: string;
  website?: string;
  memo?: string;
}) {
  await createCompany({
    name: input.name,
    website: input.website || null,
    memo: input.memo || null,
  });

  redirect("/companies");
}
