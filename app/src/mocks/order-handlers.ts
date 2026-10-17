
import { http, HttpResponse } from 'msw'
import { getNFTById } from '../data/nfts'

import type {
  CreateOrderInput,
  Order,
  OrderCollector,
  OrderItem,
  OrderNetwork,
  OrderWalletType,
} from '../services/order-service'

/**
 * M16.27.2 — API simulada de pedidos KURIO.
 *
 * Persistência demonstrativa em localStorage.
 * Nenhuma cobrança ou transação blockchain real.
 */

const ORDERS_STORAGE_KEY = 'kurio-mock-orders-v1'
const ESTIMATED_FEE = 0.016

const NETWORKS: OrderNetwork[] = [
  'Ethereum',
  'Polygon',
  'Solana',
]

const WALLET_TYPES: OrderWalletType[] = [
  'MetaMask',
  'WalletConnect',
  'Coinbase Wallet',
]

function errorResponse(
  status: number,
  error: string,
  message: string,
) {
  return HttpResponse.json(
    { error, message },
    { status },
  )
}

function getOrders(): Order[] {
  try {
    const raw = localStorage.getItem(
      ORDERS_STORAGE_KEY,
    )

    if (!raw) return []

    const parsed: unknown = JSON.parse(raw)

    if (!Array.isArray(parsed)) return []

    return parsed.filter(
      (item): item is Order =>
        typeof item === 'object' &&
        item !== null &&
        typeof item.id === 'string' &&
        typeof item.idempotencyKey === 'string' &&
        Array.isArray(item.items),
    )
  } catch {
    return []
  }
}

function saveOrders(orders: Order[]): boolean {
  try {
    localStorage.setItem(
      ORDERS_STORAGE_KEY,
      JSON.stringify(orders),
    )

    return true
  } catch {
    return false
  }
}

function isValidCollector(
  value: unknown,
): value is OrderCollector {
  if (
    typeof value !== 'object' ||
    value === null
  ) {
    return false
  }

  const collector = value as Record<
    string,
    unknown
  >

  const requiredFields = [
    'displayName',
    'username',
    'profileName',
    'email',
    'walletAddress',
  ] as const

  if (
    requiredFields.some(
      (field) =>
        typeof collector[field] !== 'string' ||
        !String(collector[field]).trim(),
    )
  ) {
    return false
  }

  if (
    !NETWORKS.includes(
      collector.network as OrderNetwork,
    ) ||
    !WALLET_TYPES.includes(
      collector.walletType as OrderWalletType,
    )
  ) {
    return false
  }

  const email = String(collector.email)

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return false
  }

  const address = String(
    collector.walletAddress,
  ).trim()

  if (collector.network === 'Solana') {
    // Validação demonstrativa de Base58.
    if (
      !/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(
        address,
      )
    ) {
      return false
    }
  } else if (
    !/^0x[a-fA-F0-9]{40}$/.test(address)
  ) {
    return false
  }

  return true
}

function calculateItems(
  input: CreateOrderInput['items'],
):
  | { items: OrderItem[]; subtotal: number }
  | null {
  if (
    !Array.isArray(input) ||
    input.length === 0
  ) {
    return null
  }

  const seenIds = new Set<string>()
  const items: OrderItem[] = []

  for (const entry of input) {
    if (
      typeof entry !== 'object' ||
      entry === null ||
      typeof entry.nftId !== 'string' ||
      !Number.isSafeInteger(entry.quantity) ||
      entry.quantity < 1 ||
      entry.quantity > 99 ||
      seenIds.has(entry.nftId)
    ) {
      return null
    }

    seenIds.add(entry.nftId)

    const nft = getNFTById(entry.nftId)

    if (
      !nft ||
      nft.price === null ||
      !Number.isFinite(nft.price) ||
      nft.price < 0
    ) {
      return null
    }

    const unitPrice = nft.price
    const itemSubtotal =
      unitPrice * entry.quantity

    items.push({
      nftId: entry.nftId,
      name: nft.name ?? `NFT ${entry.nftId}`,
      quantity: entry.quantity,
      unitPrice,
      subtotal: Number(
        itemSubtotal.toFixed(6),
      ),
    })
  }

  const subtotal = Number(
    items
      .reduce(
        (sum, item) => sum + item.subtotal,
        0,
      )
      .toFixed(6),
  )

  return { items, subtotal }
}

export const orderHandlers = [
  /**
   * POST /api/orders
   *
   * Idempotência baseada no cabeçalho
   * Idempotency-Key.
   */
  http.post('/api/orders', async ({ request }) => {
    const idempotencyKey = request.headers
      .get('Idempotency-Key')
      ?.trim()

    if (
      !idempotencyKey ||
      idempotencyKey.length > 128
    ) {
      return errorResponse(
        400,
        'INVALID_IDEMPOTENCY_KEY',
        'Informe uma chave de idempotência válida.',
      )
    }

    let payload: unknown

    try {
      payload = await request.json()
    } catch {
      return errorResponse(
        400,
        'INVALID_BODY',
        'Corpo da requisição inválido.',
      )
    }

    if (
      typeof payload !== 'object' ||
      payload === null
    ) {
      return errorResponse(
        400,
        'INVALID_BODY',
        'Dados do pedido inválidos.',
      )
    }

    const body = payload as Partial<CreateOrderInput>

    if (!isValidCollector(body.collector)) {
      return errorResponse(
        400,
        'INVALID_COLLECTOR',
        'Dados do colecionador inválidos.',
      )
    }

    const calculated = calculateItems(
      body.items ?? [],
    )

    if (!calculated) {
      return errorResponse(
        400,
        'INVALID_ITEMS',
        'Os NFTs ou as quantidades do pedido são inválidos.',
      )
    }

    const orders = getOrders()

    const existingOrder = orders.find(
      (order) =>
        order.idempotencyKey === idempotencyKey,
    )

    if (existingOrder) {
      return HttpResponse.json({
        data: existingOrder,
      })
    }

    const now = new Date().toISOString()

    const order: Order = {
      id: crypto.randomUUID(),
      userId: null,
      idempotencyKey,
      status: 'pending',
      collector: body.collector,
      items: calculated.items,
      subtotal: calculated.subtotal,
      estimatedFee: ESTIMATED_FEE,
      total: Number(
        (
          calculated.subtotal +
          ESTIMATED_FEE
        ).toFixed(6),
      ),
      createdAt: now,
      updatedAt: now,
    }

    if (!saveOrders([...orders, order])) {
      return errorResponse(
        503,
        'STORAGE_UNAVAILABLE',
        'Não foi possível salvar o pedido demonstrativo.',
      )
    }

    return HttpResponse.json(
      { data: order },
      { status: 201 },
    )
  }),

  /**
   * GET /api/orders/:orderId
   */
  http.get(
    '/api/orders/:orderId',
    ({ params }) => {
      const orderId = String(
        params.orderId,
      )

      const order = getOrders().find(
        (item) => item.id === orderId,
      )

      if (!order) {
        return errorResponse(
          404,
          'ORDER_NOT_FOUND',
          'Pedido não encontrado.',
        )
      }

      return HttpResponse.json({
        data: order,
      })
    },
  ),
]
