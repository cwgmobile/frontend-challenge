
import { test, expect } from '@playwright/test'

test.describe('KURIO — Regressão visual', () => {
  test('deve manter a aparência do cabeçalho', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('header').first()).toBeVisible()

    await page.evaluate(() => document.fonts.ready)

    await expect(page.locator('header').first()).toHaveScreenshot(
      'kurio-header.png',
      {
        animations: 'disabled',
        maxDiffPixelRatio: 0.02,
      },
    )
  })
})
