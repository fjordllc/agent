import { describe } from "node:test";
import { expect } from "@playwright/test";
import { withSupawright } from "supawright";
import type { Database } from "@/lib/database.types";

const test = withSupawright<Database, "public">(["public"]);

describe("DocList E2E test", () => {
  test.describe.serial("document detail", () => {
    test.beforeEach(async ({ supawright }) => {
      await supawright.create("public", "docs", {
        title: "Test Document",
        body: "This is a test document.",
        user_id: "acfeb157-6c90-4d70-ad96-1d6361c1874e",
        last_updated_user_id: "acfeb157-6c90-4d70-ad96-1d6361c1874e",
      });
    });

    describe("document detail", () => {
      test("should display test docs in detail screen", async ({ page }) => {
        await page.goto("http://localhost:3000/");

        await page.getByRole("link", { name: "Docs" }).click();
        await page.waitForLoadState("networkidle");
        await expect(page.getByText("Test Document")).toBeVisible();
        await page.getByText("Test Document").click();
        await page.waitForLoadState("networkidle");
        await expect(
          page.locator('div:has-text("Test Document")').first(),
        ).toBeVisible();
        await expect(
          page.locator('p:has-text("This is a test document.")'),
        ).toBeVisible();
        await expect(page.locator('p:has-text("User:")')).toBeVisible();
        await expect(page.locator('p:has-text("Created At:")')).toBeVisible();
        await expect(page.locator('p:has-text("Updated At:")')).toBeVisible();
      });
    });

    test("delete doc in detail screen", async ({ page }) => {
      await page.goto("http://localhost:3000/");

      await page.getByRole("link", { name: "Docs" }).click();
      await page.waitForLoadState("networkidle");
      await expect(page.getByText("Test Document")).toBeVisible();
      await page.getByText("Test Document").click();
      await page.waitForLoadState("networkidle");

      page.once("dialog", async (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`);
        await dialog.accept();
      });

      await page.getByRole("button", { name: "削除する" }).click();
      await page.waitForLoadState("networkidle");
      await expect(
        page.locator('p:has-text("This is a test document.")'),
      ).toHaveCount(0);
    });
  });
});
