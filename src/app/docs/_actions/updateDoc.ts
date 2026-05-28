"use server";

import { redirect } from "next/navigation";
import { updateDoc as updateDocRecord } from "@/server/services/docs";

export async function updateDoc(formData: FormData) {
  const title = formData.get("title");
  const body = formData.get("body");
  const id = formData.get("id");

  if (
    typeof title !== "string" ||
    typeof body !== "string" ||
    typeof id !== "string"
  ) {
    throw new Error("Invalid form data");
  }
  await updateDocRecord({ id: Number(id), title, body });

  redirect(`/docs/${id}`);
}
