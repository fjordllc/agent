import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

test("テストユーザーでログインのテストをしてログアウトをする", async ({
  page,
}) => {
  const email =
    process.env.EMAIL ??
    (() => {
      throw new Error("EMAIL is not defined");
    })();
  const password =
    process.env.PASSWORD ??
    (() => {
      throw new Error("PASSWORD is not defined");
    })();

  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "ログイン" }).click();
  await page.getByPlaceholder("name@example.com").click();
  await page.getByPlaceholder("name@example.com").fill(email);
  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "ログイン" }).click();

  const logoutButton = page.getByRole("link", { name: "ログアウト" });
  await expect(logoutButton).toBeVisible();

  await page.getByRole("link", { name: "ログアウト" }).click();
  await page.goto("http://localhost:3000/");

  /** 現在リロードしないと画面が更新されずログイン、サインインが表示されない **/
  await page.reload();

  const loginButton = page.getByRole("link", { name: "ログイン" });
  const signInButton = page.getByRole("link", { name: "ユーザー登録" });
  await expect(loginButton).toBeVisible();
  await expect(signInButton).toBeVisible();
});
