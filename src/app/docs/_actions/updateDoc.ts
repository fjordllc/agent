"use server";

import { createClient } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

export async function updateDoc(formData: FormData) {
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;
  const id = formData.get("id") as string;

  const supabase = await createClient();
  await supabase.from("docs").update({ title, body }).eq("id", Number(id));

  redirect(`/docs/${id}`);
}
