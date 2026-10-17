
import { test, expect } from '@playwright/test'

test.describe('KURIO — Marketplace', () => {
  test('deve carregar a página inicial e o catálogo', async ({ page }) => {
    await page.goto('/')

    await expect(
      page.getByRole('heading', {
        name: /seja dono do futuro da arte digital/i,
      }),
    ).toBeVisible()

    await expect(
      page.getByRole('heading', { name: 'Descubra NFTs' }),
    ).toBeVisible()

    await expect(
       page.getByRole('link', { name: 'Explorar', exact: true }),
    ).toHaveAttribute('href', '#catalogo')

    await expect(
      page.getByRole('region', { name: 'Descubra NFTs' }),
    ).toBeVisible()
  })

  test('deve permitir navegar para a página de login', async ({ page }) => {
    await page.goto('/login')

    await expect(page).toHaveURL(/\/login/)
    await expect(page.locator('body')).toBeVisible()
  })

  test('deve abrir a página do carrinho', async ({ page }) => {
    await page.goto('/cart')

    await expect(page).toHaveURL(/\/cart/)
    await expect(page.locator('body')).toBeVisible()
  })

  test('deve filtrar NFTs por categoria e atualizar a URL', async ({ page }) => {
    await page.goto('/')

    const filters = page.getByRole('complementary', {
      name: 'Filtros do catálogo',
    })

    const category = filters.getByRole('button', {
      name: /arte digital/i,
    })

    await category.click()

    await expect(page).toHaveURL(/category=Arte/)
    await expect(category).toHaveAttribute('aria-pressed', 'true')

    await filters.getByRole('button', {
      name: 'Limpar categoria',
    }).click()

    await expect(page).not.toHaveURL(/category=/)
  })

  test('deve filtrar NFTs por rede', async ({ page }) => {
    await page.goto('/')

    const filters = page.getByRole('complementary', {
      name: 'Filtros do catálogo',
    })

    const ethereum = filters.getByRole('button', {
      name: /ethereum/i,
    })

    await ethereum.click()

    await expect(page).toHaveURL(/network=Ethereum/)
    await expect(ethereum).toHaveAttribute('aria-pressed', 'true')

    await filters.getByRole('button', {
      name: 'Limpar rede',
    }).click()

    await expect(page).not.toHaveURL(/network=/)
  })

  test('deve alternar as abas do catálogo', async ({ page }) => {
    await page.goto('/')

    const newTab = page.getByRole('tab', {
      name: 'Novos lançamentos',
    })

    await newTab.click()

    await expect(newTab).toHaveAttribute('aria-selected', 'true')
    await expect(page).toHaveURL(/tab=new/)

    await page.getByRole('tab', {
      name: 'Todos os NFTs',
    }).click()

    await expect(page).not.toHaveURL(/tab=/)
  })

  test('deve ordenar NFTs por menor preço', async ({ page }) => {
    await page.goto('/')

    const sorting = page.getByRole('combobox', {
      name: 'Ordenar por',
    })

    await sorting.selectOption('price-asc')

    await expect(sorting).toHaveValue('price-asc')
    await expect(page).toHaveURL(/sort=price-asc/)

    await sorting.selectOption('default')

    await expect(page).not.toHaveURL(/sort=/)
  })

  test('deve manter filtros ao recarregar a página', async ({ page }) => {
    await page.goto('/?network=Polygon&sort=price-desc')

    const filters = page.getByRole('complementary', {
      name: 'Filtros do catálogo',
    })

    await expect(
      filters.getByRole('button', { name: /polygon/i }),
    ).toHaveAttribute('aria-pressed', 'true')

    await expect(
      page.getByRole('combobox', { name: 'Ordenar por' }),
    ).toHaveValue('price-desc')

    await page.reload()

    await expect(
      filters.getByRole('button', { name: /polygon/i }),
    ).toHaveAttribute('aria-pressed', 'true')

    await expect(
      page.getByRole('combobox', { name: 'Ordenar por' }),
    ).toHaveValue('price-desc')
  })
})
