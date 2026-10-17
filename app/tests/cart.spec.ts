
import { test, expect } from '@playwright/test'

test.describe('KURIO — Carrinho de compras', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')

    // Cada teste começa com o carrinho vazio.
    await page.evaluate(() => {
      localStorage.clear()
    })
  })

  test('deve mostrar mensagem quando o carrinho está vazio', async ({ page }) => {
    await page.goto('/cart')

    await expect(
      page.getByRole('heading', {
        name: 'Meu carrinho',
      }),
    ).toBeVisible()

    await expect(
      page.getByRole('heading', {
        name: 'Seu carrinho está vazio',
      }),
    ).toBeVisible()

    await expect(
  page.getByRole('main').getByRole('link', {
    name: 'Explorar NFTs',
    exact: true,
  }),
).toBeVisible()
  })

  test('deve permitir voltar ao catálogo', async ({ page }) => {
    await page.goto('/cart')

    await page.getByRole('link', {
      name: 'Continuar explorando',
    }).click()

    await expect(page).toHaveURL(/\/#catalogo/)

    await expect(
      page.getByRole('heading', {
        name: 'Descubra NFTs',
      }),
    ).toBeVisible()
  })
})


  test('deve adicionar um NFT ao carrinho e manter após recarregar', async ({ page }) => {
    await page.goto('/')

    const nftCard = page.locator('[data-nft-id]').first()
    await expect(nftCard).toBeVisible()

    const nftName = await nftCard.locator('h3').innerText()

    await nftCard.getByRole('link', {
      name: /ver detalhes do NFT/i,
    }).click()

    await expect(
      page.getByRole('heading', { name: nftName, exact: true }),
    ).toBeVisible()

    await page.getByRole('button', {
      name: 'Comprar',
      exact: true,
    }).click()

    await expect(page).toHaveURL(/\/cart/)

    const cartItems = page.getByRole('region', {
      name: 'NFTs no carrinho',
    })

    await expect(cartItems).toContainText(nftName)

    await page.reload()

    await expect(cartItems).toContainText(nftName)
  })

  test('deve aumentar e diminuir a quantidade no carrinho', async ({ page }) => {
    await page.goto('/')

    const nftCard = page.locator('[data-nft-id]').first()
    const nftName = await nftCard.locator('h3').innerText()

    await nftCard.getByRole('link', {
      name: /ver detalhes do NFT/i,
    }).click()

    await page.getByRole('button', {
      name: 'Comprar',
      exact: true,
    }).click()

    await expect(page).toHaveURL(/\/cart/)

    const cartItems = page.getByRole('region', {
      name: 'NFTs no carrinho',
    })

    const increaseButton = cartItems.getByRole('button', {
      name: `Aumentar quantidade de ${nftName}`,
    })

    const decreaseButton = cartItems.getByRole('button', {
      name: `Diminuir quantidade de ${nftName}`,
    })

    await expect(decreaseButton).toBeDisabled()

    await increaseButton.click()

    await expect(decreaseButton).toBeEnabled()

    await decreaseButton.click()

    await expect(decreaseButton).toBeDisabled()
  })

  test('deve remover um NFT do carrinho', async ({ page }) => {
    await page.goto('/')

    const nftCard = page.locator('[data-nft-id]').first()
    const nftName = await nftCard.locator('h3').innerText()

    await nftCard.getByRole('link', {
      name: /ver detalhes do NFT/i,
    }).click()

    await page.getByRole('button', {
      name: 'Comprar',
      exact: true,
    }).click()

    await expect(page).toHaveURL(/\/cart/)

    await page.getByRole('button', {
      name: `Remover ${nftName} do carrinho`,
    }).click()

    await expect(
      page.getByRole('heading', {
        name: 'Seu carrinho está vazio',
      }),
    ).toBeVisible()
  })

