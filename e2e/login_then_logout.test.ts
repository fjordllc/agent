import { describe } from "node:test";
import { expect, test as baseTest } from "@playwright/test";
import { withSupawright } from "supawright";
import type { Database } from "../src/lib/database.types";
import { E2E_CONFIG } from "./constants";

const test = withSupawright<Database, "public">(["public"]);

describe("Login and Logout E2E test", () => {
  let validEmail: string | undefined;
  const e2ePassword = "e2e_password";

  test.beforeEach(async ({ supawright }) => {
    const attributes = {
      password: e2ePassword,
      email_confirm: true,
    };
    const user = await supawright.createUser(attributes);
    validEmail = user.email;
  });

  test("Should Success Login with valid Email and Password then Logout", async ({
    page,
  }) => {
    await page.goto(`${E2E_CONFIG.BASE_URL}/`);
    await page.getByRole("link", { name: "ログイン" }).click();

    console.log(`valid email: ${validEmail}`);

    await page.getByPlaceholder("name@example.com").fill(validEmail ?? "");
    await page.getByLabel("Password").fill(e2ePassword);
    await page.getByRole("button", { name: "ログイン" }).click();

    const logoutButton = page.getByRole("link", { name: "ログアウト" });
    await expect(logoutButton).toBeVisible({ timeout: 10000 });

    /** 現在リロードしないと画面が更新されずログイン、サインインが表示されない **/
    await logoutButton.click();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);

    await page.reload();

    const loginButton = page.getByRole("link", { name: "ログイン" });
    const signInButton = page.getByRole("link", { name: "ユーザー登録" });

    await expect(loginButton).toBeVisible();
    await expect(signInButton).toBeVisible();
  });

  test("Should Fail Login with Invalid Email and Password", async ({
    page,
  }) => {
    await page.goto(`${E2E_CONFIG.BASE_URL}/`);
    await page.getByRole("link", { name: "ログイン" }).click();

    await page.getByPlaceholder("name@example.com").fill("invalid@example.com");
    await page.getByLabel("Password").fill("invalidpassword");
    await page.getByRole("button", { name: "ログイン" }).click();

    const loginButton = page.getByRole("button", { name: "ログイン" });
    await expect(loginButton).toBeVisible();
  });
});
