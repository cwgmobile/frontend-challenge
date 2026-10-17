
import { http, HttpResponse } from 'msw'
import { nfts, getNFTById } from '../data/nfts'
import type { NFT } from '../data/nfts'
import { orderHandlers } from './order-handlers'

/**
 * KURIO — API REST simulada
 *
 * M16.26.5.1 — Autenticação persistente
 * M16.27.3 — Integração dos pedidos
 *
 * Catálogo:
 * GET /api/health
 * GET /api/nfts
 * GET /api/nfts/:nftId
 *
 * Autenticação:
 * POST /api/auth/login
 * POST /api/auth/signup
 * GET /api/auth/me
 * POST /api/auth/logout
 *
 * Pedidos (order-handlers.ts):
 * POST /api/orders
 * GET /api/orders/:orderId
 *
 * Ambiente demonstrativo.
 * Não utilizar como backend de produção.
 */

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 9
const MAX_LIMIT = 100
const MAX_PRICE = 12.3

const SESSION_DURATION_MS = 60 * 60 * 1000

const USERS_STORAGE_KEY = 'kurio-mock-users-v2'
const SESSIONS_STORAGE_KEY = 'kurio-mock-sessions-v2'

type SortOption =
  | 'default'
  | 'price-asc'
  | 'price-desc'

type CatalogTab =
  | 'all'
  | 'new'
  | 'trending'

interface MockUser {
  id: string
  name: string
  email: string
  passwordHash: string
}

interface PublicUser {
  id: string
  name: string
  email: string
}

interface MockSession {
  token: string
  userId: string
  expiresAt: number
}

interface LoginPayload {
  email?: unknown
  password?: unknown
}

interface SignupPayload {
  name?: unknown
  email?: unknown
  password?: unknown
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

/**
 * Hash demonstrativo SHA-256.
 *
 * Não substitui Argon2/bcrypt com salt
 * e autenticação feita em servidor.
 */
async function hashPassword(
  password: string,
): Promise<string> {
  const encoded = new TextEncoder().encode(password)

  const digest = await crypto.subtle.digest(
    'SHA-256',
    encoded,
  )

  return Array.from(new Uint8Array(digest))
    .map((byte) =>
      byte.toString(16).padStart(2, '0'),
    )
    .join('')
}

function readStorage<T>(
  key: string,
  fallback: T,
): T {
  try {
    const raw = localStorage.getItem(key)

    if (!raw) {
      return fallback
    }

    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeStorage<T>(
  key: string,
  value: T,
): boolean {
  try {
    localStorage.setItem(
      key,
      JSON.stringify(value),
    )

    return true
  } catch {
    return false
  }
}

function getUsers(): MockUser[] {
  const stored = readStorage<unknown>(
    USERS_STORAGE_KEY,
    [],
  )

  if (!Array.isArray(stored)) {
    return []
  }

  return stored.filter(
    (item): item is MockUser =>
      typeof item === 'object' &&
      item !== null &&
      typeof item.id === 'string' &&
      typeof item.name === 'string' &&
      typeof item.email === 'string' &&
      typeof item.passwordHash === 'string',
  )
}

function getSessions(): MockSession[] {
  const stored = readStorage<unknown>(
    SESSIONS_STORAGE_KEY,
    [],
  )

  if (!Array.isArray(stored)) {
    return []
  }

  return stored.filter(
    (item): item is MockSession =>
      typeof item === 'object' &&
      item !== null &&
      typeof item.token === 'string' &&
      typeof item.userId === 'string' &&
      typeof item.expiresAt === 'number',
  )
}

function saveSessions(
  sessions: MockSession[],
): boolean {
  return writeStorage(
    SESSIONS_STORAGE_KEY,
    sessions,
  )
}

function toPublicUser(
  user: MockUser,
): PublicUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  }
}

async function findUserByEmail(
  email: string,
): Promise<MockUser | null> {
  const normalized = normalizeEmail(email)

  const storedUser = getUsers().find(
    (user) =>
      normalizeEmail(user.email) === normalized,
  )

  if (storedUser) {
    return storedUser
  }

  if (normalized === 'demo@kurio.com') {
    return {
      id: 'user-demo-001',
      name: 'Usuário Demonstração',
      email: 'demo@kurio.com',
      passwordHash: await hashPassword(
        'Kurio123!',
      ),
    }
  }

  return null
}

function createSession(user: MockUser) {
  const token = crypto.randomUUID()

  const session: MockSession = {
    token,
    userId: user.id,
    expiresAt:
      Date.now() + SESSION_DURATION_MS,
  }

  const activeSessions = getSessions().filter(
    (item) => item.expiresAt > Date.now(),
  )

  if (
    !saveSessions([
      ...activeSessions,
      session,
    ])
  ) {
    return null
  }

  return {
    token,
    user: toPublicUser(user),
  }
}

function readBearerToken(
  request: Request,
): string | null {
  const authorization = request.headers.get(
    'Authorization',
  )

  if (
    !authorization?.startsWith('Bearer ')
  ) {
    return null
  }

  return (
    authorization.slice(7).trim() || null
  )
}

async function getSessionUser(
  request: Request,
): Promise<PublicUser | null> {
  const token = readBearerToken(request)

  if (!token) {
    return null
  }

  const session = getSessions().find(
    (item) => item.token === token,
  )

  if (!session) {
    return null
  }

  if (session.expiresAt <= Date.now()) {
    saveSessions(
      getSessions().filter(
        (item) => item.token !== token,
      ),
    )

    return null
  }

  if (
    session.userId === 'user-demo-001'
  ) {
    const demoUser = await findUserByEmail(
      'demo@kurio.com',
    )

    return demoUser
      ? toPublicUser(demoUser)
      : null
  }

  const user = getUsers().find(
    (item) => item.id === session.userId,
  )

  return user
    ? toPublicUser(user)
    : null
}

function parsePositiveInteger(
  value: string | null,
  fallback: number,
): number {
  if (
    value === null ||
    value.trim() === ''
  ) {
    return fallback
  }

  const parsed = Number(value)

  if (
    !Number.isSafeInteger(parsed) ||
    parsed < 1
  ) {
    return fallback
  }

  return parsed
}

function parseMaxPrice(
  value: string | null,
): number {
  if (
    value === null ||
    value.trim() === ''
  ) {
    return MAX_PRICE
  }

  const parsed = Number(value)

  if (
    !Number.isFinite(parsed) ||
    parsed < 0.02 ||
    parsed > MAX_PRICE
  ) {
    return MAX_PRICE
  }

  return parsed
}

function parseSort(
  value: string | null,
): SortOption {
  if (
    value === 'price-asc' ||
    value === 'price-desc'
  ) {
    return value
  }

  return 'default'
}

function parseTab(
  value: string | null,
): CatalogTab {
  if (
    value === 'new' ||
    value === 'trending'
  ) {
    return value
  }

  return 'all'
}

function sortNFTs(
  items: NFT[],
  sort: SortOption,
): NFT[] {
  const sorted = [...items]

  if (sort === 'price-asc') {
    sorted.sort(
      (a, b) =>
        (a.price ?? Infinity) -
        (b.price ?? Infinity),
    )
  }

  if (sort === 'price-desc') {
    sorted.sort((a, b) => {
      if (a.price === null) return 1
      if (b.price === null) return -1

      return b.price - a.price
    })
  }

  return sorted
}

export const handlers = [
  /**
   * M16.27.3 — Endpoints de pedidos
   *
   * POST /api/orders
   * GET /api/orders/:orderId
   */
  ...orderHandlers,

  /**
   * API HEALTH
   */
  http.get('/api/health', () => {
    return HttpResponse.json({
      status: 'ok',
      application: 'KURIO NFT Marketplace',
      environment: 'mock',
    })
  }),

  /**
   * NFT CATALOG
   */
  http.get(
    '/api/nfts',
    ({ request }) => {
      const url = new URL(request.url)
      const params = url.searchParams

      const category =
        params.get('category')?.trim() ||
        null

      const network =
        params.get('network')?.trim() ||
        null

      const maxPrice = parseMaxPrice(
        params.get('maxPrice'),
      )

      const sort = parseSort(
        params.get('sort'),
      )

      const tab = parseTab(
        params.get('tab'),
      )

      const page = parsePositiveInteger(
        params.get('page'),
        DEFAULT_PAGE,
      )

      const limit = Math.min(
        parsePositiveInteger(
          params.get('limit'),
          DEFAULT_LIMIT,
        ),
        MAX_LIMIT,
      )

      const tabItems =
        tab === 'all' ? [...nfts] : []

      const filteredItems = tabItems.filter(
        (nft) => {
          const matchesCategory =
            category === null ||
            nft.category === category

          const matchesNetwork =
            network === null ||
            nft.network === network

          const matchesPrice =
            nft.price === null
              ? maxPrice === MAX_PRICE
              : nft.price <= maxPrice

          return (
            matchesCategory &&
            matchesNetwork &&
            matchesPrice
          )
        },
      )

      const sortedItems = sortNFTs(
        filteredItems,
        sort,
      )

      const total = sortedItems.length

      const totalPages = Math.max(
        1,
        Math.ceil(total / limit),
      )

      const currentPage = Math.min(
        page,
        totalPages,
      )

      const startIndex =
        (currentPage - 1) * limit

      const paginatedItems =
        sortedItems.slice(
          startIndex,
          startIndex + limit,
        )

      return HttpResponse.json({
        data: paginatedItems,
        total,
        page: currentPage,
        limit,
        totalPages,
        filters: {
          category,
          network,
          maxPrice,
          sort,
          tab,
        },
      })
    },
  ),

  /**
   * NFT DETAIL
   */
  http.get(
    '/api/nfts/:nftId',
    ({ params }) => {
      const nftId = String(
        params.nftId,
      )

      const nft = getNFTById(nftId)

      if (!nft) {
        return HttpResponse.json(
          {
            error: 'NFT_NOT_FOUND',
            message: 'NFT não encontrado.',
          },
          { status: 404 },
        )
      }

      return HttpResponse.json({
        data: nft,
      })
    },
  ),

  /**
   * LOGIN
   */
  http.post(
    '/api/auth/login',
    async ({ request }) => {
      let payload: LoginPayload

      try {
        payload =
          (await request.json()) as LoginPayload
      } catch {
        return HttpResponse.json(
          {
            error: 'INVALID_BODY',
            message:
              'Corpo da requisição inválido.',
          },
          { status: 400 },
        )
      }

      const email =
        typeof payload?.email === 'string'
          ? normalizeEmail(payload.email)
          : ''

      const password =
        typeof payload?.password === 'string'
          ? payload.password
          : ''

      if (!email || !password) {
        return HttpResponse.json(
          {
            error: 'VALIDATION_ERROR',
            message:
              'Informe e-mail e senha.',
          },
          { status: 400 },
        )
      }

      const user =
        await findUserByEmail(email)

      const suppliedPasswordHash =
        await hashPassword(password)

      if (
        !user ||
        user.passwordHash !==
          suppliedPasswordHash
      ) {
        return HttpResponse.json(
          {
            error: 'INVALID_CREDENTIALS',
            message:
              'E-mail ou senha inválidos.',
          },
          { status: 401 },
        )
      }

      const session = createSession(user)

      if (!session) {
        return HttpResponse.json(
          {
            error: 'STORAGE_UNAVAILABLE',
            message:
              'Não foi possível salvar a sessão demonstrativa.',
          },
          { status: 503 },
        )
      }

      return HttpResponse.json({
        data: session,
      })
    },
  ),

  /**
   * SIGNUP
   */
  http.post(
    '/api/auth/signup',
    async ({ request }) => {
      let payload: SignupPayload

      try {
        payload =
          (await request.json()) as SignupPayload
      } catch {
        return HttpResponse.json(
          {
            error: 'INVALID_BODY',
            message:
              'Corpo da requisição inválido.',
          },
          { status: 400 },
        )
      }

      const name =
        typeof payload?.name === 'string'
          ? payload.name.trim()
          : ''

      const email =
        typeof payload?.email === 'string'
          ? normalizeEmail(payload.email)
          : ''

      const password =
        typeof payload?.password === 'string'
          ? payload.password
          : ''

      const validEmail =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          email,
        )

      if (
        name.length < 2 ||
        !validEmail ||
        password.length < 8
      ) {
        return HttpResponse.json(
          {
            error: 'VALIDATION_ERROR',
            message:
              'Informe nome, e-mail válido e senha com pelo menos 8 caracteres.',
          },
          { status: 400 },
        )
      }

      const existingUser =
        await findUserByEmail(email)

      if (existingUser) {
        return HttpResponse.json(
          {
            error:
              'EMAIL_ALREADY_EXISTS',
            message:
              'Este e-mail já está cadastrado.',
          },
          { status: 409 },
        )
      }

      const user: MockUser = {
        id: crypto.randomUUID(),
        name,
        email,
        passwordHash:
          await hashPassword(password),
      }

      const users = getUsers()

      if (
        !writeStorage(
          USERS_STORAGE_KEY,
          [...users, user],
        )
      ) {
        return HttpResponse.json(
          {
            error: 'STORAGE_UNAVAILABLE',
            message:
              'Não foi possível salvar o cadastro demonstrativo.',
          },
          { status: 503 },
        )
      }

      const session = createSession(user)

      if (!session) {
        return HttpResponse.json(
          {
            error: 'STORAGE_UNAVAILABLE',
            message:
              'Cadastro criado, mas não foi possível iniciar a sessão.',
          },
          { status: 503 },
        )
      }

      return HttpResponse.json(
        {
          data: session,
        },
        { status: 201 },
      )
    },
  ),

  /**
   * CURRENT USER
   */
  http.get(
    '/api/auth/me',
    async ({ request }) => {
      const user =
        await getSessionUser(request)

      if (!user) {
        return HttpResponse.json(
          {
            error: 'UNAUTHORIZED',
            message:
              'Sessão ausente, inválida ou expirada.',
          },
          { status: 401 },
        )
      }

      return HttpResponse.json({
        data: user,
      })
    },
  ),

  /**
   * LOGOUT
   */
  http.post(
    '/api/auth/logout',
    ({ request }) => {
      const token =
        readBearerToken(request)

      const sessions = getSessions()

      const session = sessions.find(
        (item) => item.token === token,
      )

      if (
        !session ||
        session.expiresAt <= Date.now()
      ) {
        return HttpResponse.json(
          {
            error: 'UNAUTHORIZED',
            message:
              'Sessão não encontrada.',
          },
          { status: 401 },
        )
      }

      if (
        !saveSessions(
          sessions.filter(
            (item) =>
              item.token !== token,
          ),
        )
      ) {
        return HttpResponse.json(
          {
            error: 'STORAGE_UNAVAILABLE',
            message:
              'Não foi possível encerrar a sessão.',
          },
          { status: 503 },
        )
      }

      return HttpResponse.json({
        success: true,
        message: 'Sessão encerrada.',
      })
    },
  ),
]
