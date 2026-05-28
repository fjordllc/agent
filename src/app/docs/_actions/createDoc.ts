"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { createDoc as createDocRecord } from "@/server/services/docs";

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

  try {
    await createDocRecord({
      title,
      body,
      userId: user.id,
      lastUpdatedUserId: user.id,
    });
  } catch (error) {
    return {
      error: `ドキュメントの新規作成に失敗しました。 ${
        error instanceof Error ? error.message : ""
      }`,
    };
  }

  redirect("/docs");
}
