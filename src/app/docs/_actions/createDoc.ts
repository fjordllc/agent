"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function createDoc(formData: FormData) {
  const title = formData.get("title");
  const body = formData.get("body");

  if (typeof title !== "string" || typeof body !== "string") {
    return { error: "Invalid form data" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "ログインが必要です" };
  }

  const { error } = await supabase
    .from("docs")
    .insert([
      {
        title,
        body,
        user_id: user.id,
        last_updated_user_id: user.id,
      },
    ])
    .select("id")
    .single();

  if (error) {
    return {
      error: `ドキュメントの新規作成に失敗しました。 ${error.code} ${error.message}`,
    };
  }

  redirect("/docs");
}
