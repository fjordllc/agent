import { describe } from "node:test";
import { expect } from "@playwright/test";
import { withSupawright } from "supawright";
import type { Database } from "@/lib/database.types";

const test = withSupawright<Database, "public">(["public"]);
const currentDate = "2025-02-08T23:00:38.455Z";

describe("DocList E2E test", () => {
  test.beforeEach(async ({ supawright }) => {
    await supawright.create("public", "docs", {
      title: "Test Document",
      body: "This is a test document.",
      created_at: currentDate,
      updated_at: currentDate,
      user_id: 555,
      last_updated_user_id: 555,
    });
  });
  test("should display test docs", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.getByRole("link", { name: "Docs" }).click();
    await expect(
      page.locator('p:has-text("This is a test document.")').first(),
    ).toHaveText("This is a test document.");
  });
  test("should display test docs in detail screen", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.getByRole("link", { name: "Docs" }).click();
    await page.getByRole("link", { name: "Test Document" }).first().click();
    await page.waitForLoadState("networkidle");
    await page.getByRole("heading", { name: "Test Document" }).waitFor();
    await expect(
      page.getByRole("heading", { name: "Test Document" }),
    ).toBeVisible();
    await expect(
      page.locator('p:has-text("This is a test document.")'),
    ).toHaveText("This is a test document.");
    await expect(page.locator('p:has-text("User ID:")')).toHaveText(
      "User ID: 555",
    );
    await expect(page.locator('p:has-text("Last Updated By:")')).toHaveText(
      "Last Updated By: 555",
    );
    await expect(page.locator('p:has-text("Created At:")')).toHaveText(
      `Created At: ${new Date(currentDate).toLocaleString("en-US", { timeZone: "UTC" })}`,
    );
    await expect(page.locator('p:has-text("Updated At:")')).toHaveText(
      `Updated At: ${new Date(currentDate).toLocaleString("en-US", { timeZone: "UTC" })}`,
    );
  });
});
