
import { createContext } from 'react'
import type { NFT } from '@/data/nfts'

export interface CartProduct {
  nftId: string
  quantity: number
  nft: NFT
  subtotal: number
}

export interface CartContextValue {
  items: CartProduct[]
  itemCount: number
  subtotal: number
  addItem: (nftId: string, quantity?: number) => void
  updateQuantity: (nftId: string, quantity: number) => void
  removeItem: (nftId: string) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextValue | undefined>(
  undefined,
)
