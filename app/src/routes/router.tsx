
/* eslint-disable react-refresh/only-export-components */

import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from '@tanstack/react-router'

import { MainLayout } from '@/components/layout/MainLayout'

import { getAuthToken } from '@/services/api'
import { getCurrentUser } from '@/services/auth-service'

// Páginas do KURIO Marketplace.
import { HomePage } from '@/pages/HomePage'
import { NFTDetailsPage } from '@/pages/NFTDetailsPage'
import { CartPage } from '@/pages/CartPage'
import { CheckoutPage } from '@/pages/CheckoutPage'
import { ConfirmationPage } from '@/pages/ConfirmationPage'
import { LoginPage } from '@/pages/LoginPage'
import { SignupPage } from '@/pages/SignupPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { WalletsPage } from '@/pages/WalletsPage'

/**
 * M16 — Parâmetros de busca do catálogo.
 *
 * Os valores são validados ao entrar na Home.
 * Parâmetros inválidos recebem valores seguros.
 */
type CatalogSearch = {
  category?: string
  network?: string
  sort?: 'default' | 'price-asc' | 'price-desc'
  page?: number
  maxPrice?: number
  tab?: 'all' | 'new' | 'trending'
}

const allowedSortOptions = [
  'default',
  'price-asc',
  'price-desc',
] as const

const allowedTabs = [
  'all',
  'new',
  'trending',
] as const

function validateCatalogSearch(
  search: Record<string, unknown>,
): CatalogSearch {
  const result: CatalogSearch = {}

  if (
    typeof search.category === 'string' &&
    search.category.trim().length > 0
  ) {
    result.category = search.category.trim()
  }

  if (
    typeof search.network === 'string' &&
    search.network.trim().length > 0
  ) {
    result.network = search.network.trim()
  }

  if (
    typeof search.sort === 'string' &&
    allowedSortOptions.some(
      (option) => option === search.sort,
    )
  ) {
    result.sort = search.sort as CatalogSearch['sort']
  }

  const page =
    typeof search.page === 'number'
      ? search.page
      : typeof search.page === 'string'
        ? Number(search.page)
        : NaN

  if (
    Number.isSafeInteger(page) &&
    page >= 1
  ) {
    result.page = page
  }

  const maxPrice =
    typeof search.maxPrice === 'number'
      ? search.maxPrice
      : typeof search.maxPrice === 'string'
        ? Number(search.maxPrice)
        : NaN

  if (
    Number.isFinite(maxPrice) &&
    maxPrice >= 0.02 &&
    maxPrice <= 12.3
  ) {
    result.maxPrice = maxPrice
  }

  if (
    typeof search.tab === 'string' &&
    allowedTabs.some(
      (tab) => tab === search.tab,
    )
  ) {
    result.tab = search.tab as CatalogSearch['tab']
  }

  return result
}

/**
 * M16.26.6.1 — Verificação de sessão.
 *
 * Não basta verificar se existe um token:
 * precisamos consultar a API simulada
 * para confirmar se ele continua válido.
 */
async function requireAuth() {
  const token = getAuthToken()

  if (!token) {
    throw redirect({
      to: '/login',
      replace: true,
    })
  }

  try {
    await getCurrentUser()
  } catch (error: unknown) {
    /*
     * O interceptor do Axios remove o token
     * quando a API responde HTTP 401.
     *
     * Se isso aconteceu, redirecionamos
     * o visitante para o login.
     *
     * Outros erros são propagados.
     */
    if (!getAuthToken()) {
      throw redirect({
        to: '/login',
        replace: true,
      })
    }

    throw error
  }
}

/**
 * Layout compartilhado por todas as páginas.
 */
function RootLayout() {
  return <MainLayout />
}

/**
 * Rota raiz da aplicação.
 */
const rootRoute = createRootRoute({
  component: RootLayout,
})

/**
 * 01 — Home / Marketplace
 *
 * Os filtros são representados na URL.
 */
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
  validateSearch: validateCatalogSearch,
})

/**
 * 02 — Detalhes do NFT
 */
const nftRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/nft/$nftId',
  component: NFTDetailsPage,
})

/**
 * 03 — Carrinho
 */
const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: CartPage,
})

/**
 * 04 — Checkout
 */
const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/checkout',
  component: CheckoutPage,
})

/**
 * 05 — Confirmação
 */
const confirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/confirmation',
  component: ConfirmationPage,
})

/**
 * 06 — Login
 */
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
})

/**
 * 07 — Cadastro
 */
const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signup',
  component: SignupPage,
})

/**
 * 08 — Perfil (rota protegida)
 */
const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: ProfilePage,
  beforeLoad: requireAuth,
})

/**
 * 09 — Carteiras digitais (rota protegida)
 */
const walletsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/wallets',
  component: WalletsPage,
  beforeLoad: requireAuth,
})

/**
 * Árvore centralizada das nove rotas.
 */
const routeTree = rootRoute.addChildren([
  homeRoute,
  nftRoute,
  cartRoute,
  checkoutRoute,
  confirmationRoute,
  loginRoute,
  signupRoute,
  profileRoute,
  walletsRoute,
])

/**
 * Instância principal do TanStack Router.
 */
export const router = createRouter({
  routeTree,
})

/**
 * Tipagem segura das rotas.
 */
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
