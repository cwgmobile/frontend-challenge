
import { test, expect, type Page } from '@playwright/test'

async function addNFTToCart(page: Page) {
  await page.goto('/')

  // Garante um carrinho vazio antes da compra.
  await page.evaluate(() => localStorage.clear())
  await page.reload()

  const nftCard = page.locator('[data-nft-id]').first()
  await expect(nftCard).toBeVisible()

  const nftName = await nftCard.locator('h3').innerText()

  await nftCard.getByRole('link', {
    name: /ver detalhes do NFT/i,
  }).click()

  await expect(
    page.getByRole('heading', {
      name: nftName,
      exact: true,
    }),
  ).toBeVisible()

  await page.getByRole('button', {
    name: 'Comprar',
    exact: true,
  }).click()

  await expect(page).toHaveURL(/\/cart/)

  return nftName
}

test.describe('KURIO — Checkout demonstrativo', () => {
  test('deve informar quando o checkout está sem itens', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())

    await page.goto('/checkout')

    await expect(
      page.getByRole('heading', {
        name: 'Seu carrinho está vazio',
      }),
    ).toBeVisible()
  })

  test('deve registrar um pedido demonstrativo', async ({ page }) => {
    const nftName = await addNFTToCart(page)

    await page.getByRole('button', {
      name: 'Conectar e finalizar',
    }).click()

    await expect(page).toHaveURL(/\/checkout/)

    await expect(
      page.getByRole('heading', {
        name: 'Pagamento',
      }),
    ).toBeVisible()

    const summary = page.getByRole('heading', {
      name: 'Resumo da compra',
    }).locator('..')

    await expect(summary).toContainText(nftName)

    // Dados fictícios, exclusivos do ambiente de teste.
    await page.getByPlaceholder(
      'Como deseja ser identificado',
    ).fill('Colecionador Teste')

    await page.getByPlaceholder(
      'Seu usuário',
    ).fill('colecionador_teste')

    await page.getByPlaceholder(
      'Nome do seu perfil',
    ).fill('Perfil de Teste')

    await page.getByPlaceholder(
      'seu@email.com',
    ).fill('teste@exemplo.com')

    await page.locator('select').filter({
      has: page.locator('option[value="Ethereum"]'),
    }).selectOption('Ethereum')

    await page.getByPlaceholder(
      'Endereço 0x da carteira',
    ).fill(`0x${'a'.repeat(40)}`)

    await page.locator('select').filter({
      has: page.locator('option[value="MetaMask"]'),
    }).selectOption('MetaMask')

    await page.getByRole('button', {
      name: 'Registrar pedido demonstrativo',
    }).click()

    await expect(page).toHaveURL(/\/confirmation/, {
      timeout: 15000,
    })

    await expect(
      page.locator('body'),
    ).toContainText(/pedido/i)
  })


  
  test('deve rejeitar endereço de carteira inválido', async ({ page }) => {
    await addNFTToCart(page)

    await page.getByRole('button', {
      name: 'Conectar e finalizar',
    }).click()

    await expect(page).toHaveURL(/\/checkout/)

    await page.getByPlaceholder(
      'Como deseja ser identificado',
    ).fill('Colecionador Teste')

    await page.getByPlaceholder(
      'Seu usuário',
    ).fill('colecionador_teste')

    await page.getByPlaceholder(
      'Nome do seu perfil',
    ).fill('Perfil de Teste')

    await page.getByPlaceholder(
      'seu@email.com',
    ).fill('teste@exemplo.com')

    await page.locator('select').filter({
      has: page.locator('option[value="Ethereum"]'),
    }).selectOption('Ethereum')

    await page.getByPlaceholder(
      'Endereço 0x da carteira',
    ).fill('0x123')

    await page.locator('select').filter({
      has: page.locator('option[value="MetaMask"]'),
    }).selectOption('MetaMask')

    await page.getByRole('button', {
      name: 'Registrar pedido demonstrativo',
    }).click()

    await expect(
      page.getByRole('alert'),
    ).toContainText('Informe um endereço de carteira válido')

    await expect(page).toHaveURL(/\/checkout/)
  })

})
