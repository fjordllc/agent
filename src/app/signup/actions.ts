"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { signupSchema } from "@/schemas/auth";
import { SignupErrorCode, SignupResponse } from "./types";

export async function signup(
  formData: FormData,
): Promise<SignupResponse | never> {
  const supabase = await createClient();

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = signupSchema.safeParse(data);
  if (!result.success) {
    const firstError = result.error.errors[0];
    return {
      error: {
        message: firstError.message,
        code: SignupErrorCode.ValidationError,
        field: firstError.path[0].toString(),
      },
    };
  }

  try {
    const { error } = await supabase.auth.signUp(result.data);

    if (error) {
      if (error.message.includes("User already registered")) {
        return {
          error: {
            message: "このメールアドレスは既に登録されています",
            code: SignupErrorCode.EmailTaken,
            field: "email",
          },
        };
      }

      console.error("Supabase signup error:", error);
      return {
        error: {
          message:
            "アカウントの作成に失敗しました。入力内容をご確認の上、再度お試しください。",
          code: SignupErrorCode.ServerError,
        },
      };
    }

    revalidatePath("/dashboard", "layout");
    return { success: true };
  } catch (error) {
    console.error("Unexpected error during signup:", error);
    return {
      error: {
        message:
          "システムエラーが発生しました。お手数ですが、サポートまでお問い合わせください。",
        code: SignupErrorCode.ServerError,
      },
    };
  }
}
