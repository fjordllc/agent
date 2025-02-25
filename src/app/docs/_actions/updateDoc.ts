"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

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
  const supabase = await createClient();
  await supabase.from("docs").update({ title, body }).eq("id", Number(id));

  redirect(`/docs/${id}`);
}
