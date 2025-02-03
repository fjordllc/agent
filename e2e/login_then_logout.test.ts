import { expect } from "@playwright/test";
import { withSupawright } from "supawright";
import type { Database } from "./database.types";
import { describe } from "node:test";

const test = withSupawright<Database, "public">(["public"]);

describe("Login and Logout E2E test", () => {
  const validEmail = "admin@example.com";
  const validPassword = "testtest";

  test.beforeEach(async ({ supawright }) => {
    const user = await supawright.create("users", {
      email: "some-email@supawrightmail.com",
      id: "acfeb157-6c90-4d70-ad96-1d6361c1874e",
    });
    console.log(user);
  });

  test("retrieve test user indicated in Wiki", async ({ supawright }) => {
    const { data: testUsers } = await supawright
      .supabase()
      .from("users")
      .select();
    const testUser = testUsers?.[0] || null;
    expect(testUser?.email, validEmail);
    console.log(testUser);
  });

  test("Should Success Login with valid Email and Password then Logout", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/");
    await page.getByRole("link", { name: "ログイン" }).click();

    await page.getByPlaceholder("name@example.com").fill(validEmail);
    await page.getByLabel("Password").fill(validPassword);
    await page.getByRole("button", { name: "ログイン" }).click();

    const logoutButton = page.getByRole("link", { name: "ログアウト" });
    await expect(logoutButton).toBeVisible();

    /** 現在リロードしないと画面が更新されずログイン、サインインが表示されない **/
    await logoutButton.click();
    await page.waitForTimeout(1500);

    await page.reload();

    const loginButton = page.getByRole("link", { name: "ログイン" });
    const signInButton = page.getByRole("link", { name: "ユーザー登録" });

    await expect(loginButton).toBeVisible();
    await expect(signInButton).toBeVisible();
  });

  test("Should Fail Login with Invalid Email and Password", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/");
    await page.getByRole("link", { name: "ログイン" }).click();

    await page.getByPlaceholder("name@example.com").fill("invalid@example.com");
    await page.getByLabel("Password").fill("invalidpassword");
    await page.getByRole("button", { name: "ログイン" }).click();

    const loginButton = page.getByRole("button", { name: "ログイン" });
    await expect(loginButton).toBeVisible();
  });
});
