import { test, expect } from "@playwright/test";

test.describe("ユーザー認証のテスト", () => {
  const validEmail =
    process.env.EMAIL ??
    (() => {
      throw new Error("EMAIL is not defined");
    })();
  const validPassword =
    process.env.PASSWORD ??
    (() => {
      throw new Error("PASSWORD is not defined");
    })();

  test("有効なユーザー情報でログインし、ログアウトできる", async ({ page }) => {
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

  test("無効なユーザー情報でログインに失敗する", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.getByRole("link", { name: "ログイン" }).click();

    await page.getByPlaceholder("name@example.com").fill("invalid@example.com");
    await page.getByLabel("Password").fill("invalidpassword");
    await page.getByRole("button", { name: "ログイン" }).click();

    await expect(page).toHaveURL("http://localhost:3000/error");

    const loginButton = page.getByRole("button", { name: "ログイン" });
    await expect(loginButton).toBeVisible();
  });
});
