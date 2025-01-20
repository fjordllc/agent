import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { test as teardown } from "@playwright/test";
import { resolve } from "path";

const envPath = resolve(__dirname, "../.env.local");
dotenv.config({ path: envPath });

teardown("delete database", async () => {
  console.log("deleting test database...");

  const email = "test@example.com";

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SERVICE_ROLE_KEY!,
  );

  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) return console.error("Failed to retrieve users:", error);

  const testUser = data.users.find((user) => user.email === email);
  if (!testUser) return console.log("Test user not found.");

  const { error: deleteError } = await supabase.auth.admin.deleteUser(
    testUser.id,
  );
  if (deleteError)
    return console.error("Failed to delete test user:", deleteError);

  console.log("Test user deleted.");
});
