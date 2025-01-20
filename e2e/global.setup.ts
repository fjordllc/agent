import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { test as setup } from "@playwright/test";
import { resolve } from "path";

const envPath = resolve(__dirname, "../.env.local");
dotenv.config({ path: envPath });

setup("create new database", async () => {
  console.log("creating new database...");

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const { error } = await supabase.auth.signUp({
    email: "admin@example.com",
    password: "123",
  });

  if (error) {
    console.error("Signup failed:", error.message);
  } else {
    console.log("Signup successful");
  }
});
