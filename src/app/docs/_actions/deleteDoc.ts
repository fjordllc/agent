"use server";

import { redirect } from "next/navigation";
import { deleteDoc as deleteDocRecord } from "@/server/services/docs";

export async function deleteDoc(formData: FormData) {
  const id = formData.get("id");

  if (typeof id !== "string") {
    throw new Error("Invalid form data");
  }

  await deleteDocRecord(Number(id));

  redirect("/docs");
}
