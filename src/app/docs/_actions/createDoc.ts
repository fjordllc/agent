"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabaseServer";

export async function createDoc(formData: FormData) {
  const titleRaw = formData.get("title");
  const bodyRaw = formData.get("body");

  if (typeof titleRaw !== "string" || typeof bodyRaw !== "string") {
    throw new Error("Invalid form data");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error(`ログインが必要です`);
    return;
  }

  const { error } = await supabase
    .from("docs")
    .insert([
      {
        titleRaw,
        bodyRaw,
        user_id: user.id,
        last_updated_user_id: user.id,
      },
    ])
    .select("id")
    .single();

  if (error) {
    console.error(
      `ドキュメントの新規作成に失敗しました。 ${error.code} ${error.message}`,
    );
    return;
  }

  redirect("/docs");
}
