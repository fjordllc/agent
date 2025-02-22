import { describe } from 'node:test'
import { expect } from '@playwright/test'
import { withSupawright } from 'supawright'
import type { Database } from '../src/lib/database.types'
import { E2E_CONFIG } from './constants'
import { clearMailbox, getConfirmationLink } from './helpers/inbucket'

const test = withSupawright<Database, 'public'>(['public'])

describe('Signup', () => {
  const testPassword = 'test_password'
  const generateTestEmail = () => `test${Date.now()}@example.com`

  test('Should Success Signup with valid Email and Password', async ({
    page,
  }) => {
    const testEmail = generateTestEmail()

    await clearMailbox(testEmail)

    await page.goto(E2E_CONFIG.BASE_URL)
    await page.getByRole('link', { name: 'ユーザー登録' }).click()

    await page.getByPlaceholder('name@example.com').fill(testEmail)
    await page.getByLabel('Password').fill(testPassword)
    await page.getByRole('button', { name: 'サインアップ' }).click()

    const confirmationLink = await getConfirmationLink(testEmail)
    await page.goto(confirmationLink)

    // 確認処理の完了を待機
    await page.waitForTimeout(5000)

    // ダッシュボードへのリダイレクトを待機
    await page.waitForURL(/.*dashboard/, { timeout: 30000 })

    // 現在のURLを確認
    const currentUrl = page.url()
    console.log('Current URL after confirmation:', currentUrl)
    expect(currentUrl).toMatch(/.*dashboard/)
    await expect(page.getByRole('link', { name: 'ログアウト' })).toBeVisible()
  })

  test('Should Fail Signup with Existing Email', async ({
    page,
    supawright,
  }) => {
    const testEmail = generateTestEmail()
    await supawright.createUser({
      email: testEmail,
      password: testPassword,
      email_confirm: true,
    })

    await page.goto(E2E_CONFIG.BASE_URL)
    await page.getByRole('link', { name: 'ユーザー登録' }).click()

    await page.getByPlaceholder('name@example.com').fill(testEmail)
    await page.getByLabel('Password').fill(testPassword)
    await page.getByRole('button', { name: 'サインアップ' }).click()

    await expect(
      page.getByText('このメールアドレスは既に登録されています')
    ).toBeVisible()
    await expect(page).toHaveURL(/.*signup/)
  })
})
