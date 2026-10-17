
import { io, type Socket } from 'socket.io-client'

export interface OrderUpdatedEvent {
  orderId: string
  status: 'pending' | 'confirmed' | 'rejected'
  updatedAt: string
}

export interface NFTUpdatedEvent {
  nftId: string
  updatedAt: string
}

interface ServerToClientEvents {
  'server.connected': (payload: {
    message: string
    timestamp: string
  }) => void
  'order.updated': (payload: OrderUpdatedEvent) => void
  'nft.updated': (payload: NFTUpdatedEvent) => void
}

interface ClientToServerEvents {
  'order.subscribe': (orderId: string) => void
  'order.unsubscribe': (orderId: string) => void
}

export type KurioSocket = Socket<
  ServerToClientEvents,
  ClientToServerEvents
>

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ?? 'http://localhost:3001'

export const socket: KurioSocket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionAttempts: 5,
  timeout: 10000,
})
