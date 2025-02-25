import { describe } from "node:test";
import { expect } from "@playwright/test";
import { withSupawright } from "supawright";
import type { Database } from "@/lib/database.types";
import { E2E_CONFIG } from "../../constants";

const test = withSupawright<Database, "public">(["public"]);

describe("test to create new document", () => {
  let validEmail: string | undefined;
  const password = "e2e_password";
  test.beforeEach(async ({ supawright }) => {
    const attributes = {
      password: password,
      email_confirm: true,
    };
    const user = await supawright.createUser(attributes);
    validEmail = user.email;
  });

  describe("crate a new document", () => {
    test("should display test docs in detail screen", async ({ page }) => {
      await page.goto(E2E_CONFIG.BASE_URL);
      await page.getByRole("link", { name: "ログイン" }).click();
      await page.getByPlaceholder("name@example.com").fill(validEmail ?? "");
      await page.getByLabel("Password").fill(password);
      await page.getByRole("button", { name: "ログイン" }).click();

      await page.getByRole("link", { name: "Docs" }).click();
      await page.waitForLoadState("networkidle");
      await expect(page.getByText("Doc作成")).toBeVisible();
      await page.getByText("Doc作成").click();
      await page.waitForLoadState("networkidle");

      await page
        .getByPlaceholder("Enter title")
        .fill(`this is test title with ${validEmail}`);
      await page.getByPlaceholder("Enter body").fill("this is test body");
      await page.getByRole("button", { name: "Docを公開" }).click();

      await page
        .getByText(`this is test title with ${validEmail}`, { exact: true })
        .click();

      page.once("dialog", async (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`);
        await dialog.accept();
      });

      await page.getByRole("button", { name: "削除する" }).click();

      await expect(
        page.getByText(`this is test title with ${validEmail}`),
      ).not.toBeVisible();
    });
  });
});
