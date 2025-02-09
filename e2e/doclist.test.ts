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
      user_name: "fjord (フィヨルド)",
      last_updated_user_name: "fjord (フィヨルド)",
    });
  });

  describe("document detail", () => {
    test("should display test docs in detail screen", async ({ page }) => {
      await page.goto("http://localhost:3000/");

      await page.getByRole("link", { name: "Docs" }).click();
      await page.getByRole("link", { name: "Test Document" }).first().click();
      await page.waitForLoadState("networkidle");
      await expect(
        page.locator('p:has-text("This is a test document.")').first(),
      ).toBeVisible();
      await expect(page.locator('p:has-text("User:")')).toBeVisible();
      await expect(page.locator('p:has-text("Created At:")')).toBeVisible();
      await expect(page.locator('p:has-text("Updated At:")')).toBeVisible();
    });
  });
});
