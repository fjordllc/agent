"use server";

import { createClient } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

export async function updateDoc(formData: FormData) {
  const titleRaw = formData.get("title");
  const bodyRaw = formData.get("body");
  const idRaw = formData.get("id");

  if (
    typeof titleRaw !== "string" ||
    typeof bodyRaw !== "string" ||
    typeof idRaw !== "string"
  ) {
    throw new Error("Invalid form data");
  }
  const supabase = await createClient();
  await supabase
    .from("docs")
    .update({ titleRaw, bodyRaw })
    .eq("id", Number(idRaw));

  redirect(`/docs/${idRaw}`);
}
