
import { api } from './api'

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'rejected'

export type OrderNetwork =
  | 'Ethereum'
  | 'Polygon'
  | 'Solana'

export type OrderWalletType =
  | 'MetaMask'
  | 'WalletConnect'
  | 'Coinbase Wallet'

export interface OrderItemInput {
  nftId: string
  quantity: number
}

export interface OrderItem {
  nftId: string
  name: string
  quantity: number
  unitPrice: number
  subtotal: number
}

export interface OrderCollector {
  displayName: string
  username: string
  profileName: string
  email: string
  walletAddress: string
  network: OrderNetwork
  walletType: OrderWalletType
}

export interface CreateOrderInput {
  idempotencyKey: string
  collector: OrderCollector
  items: OrderItemInput[]
}

export interface Order {
  id: string
  userId: string | null
  idempotencyKey: string
  status: OrderStatus
  collector: OrderCollector
  items: OrderItem[]
  subtotal: number
  estimatedFee: number
  total: number
  createdAt: string
  updatedAt: string
}

interface OrderResponse {
  data: Order
}

/**
 * M16.27.1 — Serviço REST de pedidos.
 *
 * A chave de idempotência deve ser reutilizada
 * quando a mesma tentativa de criação for repetida.
 *
 * Os preços e totais são calculados pela API.
 *
 * Ambiente demonstrativo: nenhuma cobrança real.
 */
export async function createOrder(
  input: CreateOrderInput,
): Promise<Order> {
  const response = await api.post<OrderResponse>(
    '/orders',
    {
      collector: input.collector,
      items: input.items,
    },
    {
      headers: {
        'Idempotency-Key': input.idempotencyKey,
      },
    },
  )

  return response.data.data
}

/**
 * Consulta um pedido pelo identificador.
 */
export async function getOrderById(
  orderId: string,
): Promise<Order> {
  const response = await api.get<OrderResponse>(
    `/orders/${encodeURIComponent(orderId)}`,
  )

  return response.data.data
}
