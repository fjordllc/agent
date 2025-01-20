import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { test as setup } from "@playwright/test";
import { resolve } from "path";

const envPath = resolve(__dirname, "../.env.local");
dotenv.config({ path: envPath });

setup("create new database", async () => {
  console.log("creating new database...");

  const email = "test@example.com";
  const password = "testtest";

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { error } = await supabase.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true,
  });
  if (error) {
    console.error("Failed to create test user:", error);
  }
});
