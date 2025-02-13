import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Docs' }).click();
  await page.getByRole('button', { name: '2' }).click();
  await page.getByRole('button', { name: '◀️' }).click();
  await page.getByRole('button', { name: '⏭️' }).click();
  await page.getByRole('button', { name: '⏮️' }).click();
  await page.getByRole('button', { name: '▶️' }).click();
});
