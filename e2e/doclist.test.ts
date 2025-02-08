import { describe } from "node:test";
import { expect } from "@playwright/test";
import { withSupawright } from "supawright";
import type { Database } from "@/lib/database.types";

const test = withSupawright<Database, "public">(["public"]);

describe("DocList E2E test", () => {
  test.beforeEach(async ({ supawright }) => {
    await supawright.create("public", "docs", {
      title: "Test Document",
      body: "This is a test document.",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: 555,
      last_updated_user_id: 555,
    });
  });
  test("should display test docs", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.getByRole("link", { name: "Docs" }).click();
    await expect(page.getByText("This is a test document.")).toBeVisible();
  });
});
