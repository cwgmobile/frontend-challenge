
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { getNFTById } from '@/data/nfts'
import {
  CartContext,
  type CartContextValue,
  type CartProduct,
} from '@/contexts/cart-context'

const STORAGE_KEY = 'kurio-cart-v1'

interface CartItem {
  nftId: string
  quantity: number
}

// Recupera apenas itens válidos do catálogo.
// Os preços sempre vêm da fonte central de NFTs.
function readStoredCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)

    if (!stored) return []

    const parsed: unknown = JSON.parse(stored)

    if (!Array.isArray(parsed)) return []

    const quantities = new Map<string, number>()

    for (const item of parsed) {
      if (
        typeof item !== 'object' ||
        item === null ||
        !('nftId' in item) ||
        !('quantity' in item)
      ) {
        continue
      }

      const { nftId, quantity } = item

      if (
        typeof nftId !== 'string' ||
        typeof quantity !== 'number' ||
        !Number.isSafeInteger(quantity) ||
        quantity < 1
      ) {
        continue
      }

      const nft = getNFTById(nftId)

      if (!nft || nft.price === null) continue

      const previousQuantity = quantities.get(nftId) ?? 0
      const nextQuantity = previousQuantity + quantity

      if (Number.isSafeInteger(nextQuantity)) {
        quantities.set(nftId, nextQuantity)
      }
    }

    return Array.from(quantities, ([nftId, quantity]) => ({
      nftId,
      quantity,
    }))
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(readStoredCart)

  // Preserva os itens após atualizar ou reabrir a página.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems))
    } catch {
      // O carrinho permanece funcional durante a sessão.
    }
  }, [cartItems])

  const addItem = useCallback((nftId: string, quantity = 1) => {
    const nft = getNFTById(nftId)

    if (
      !nft ||
      nft.price === null ||
      !Number.isSafeInteger(quantity) ||
      quantity < 1
    ) {
      return
    }

    setCartItems((current) => {
      const existing = current.find((item) => item.nftId === nftId)

      if (!existing) {
        return [...current, { nftId, quantity }]
      }

      const nextQuantity = existing.quantity + quantity

      if (!Number.isSafeInteger(nextQuantity)) return current

      return current.map((item) =>
        item.nftId === nftId
          ? { ...item, quantity: nextQuantity }
          : item,
      )
    })
  }, [])

  const updateQuantity = useCallback(
    (nftId: string, quantity: number) => {
      if (!Number.isSafeInteger(quantity) || quantity < 1) return

      setCartItems((current) =>
        current.map((item) =>
          item.nftId === nftId ? { ...item, quantity } : item,
        ),
      )
    },
    [],
  )

  const removeItem = useCallback((nftId: string) => {
    setCartItems((current) =>
      current.filter((item) => item.nftId !== nftId),
    )
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  // Calcula os valores com base no catálogo original.
  const items = useMemo<CartProduct[]>(
    () =>
      cartItems.flatMap((item) => {
        const nft = getNFTById(item.nftId)

        if (!nft || nft.price === null) return []

        return [
          {
            ...item,
            nft,
            subtotal: nft.price * item.quantity,
          },
        ]
      }),
    [cartItems],
  )

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  )

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.subtotal, 0),
    [items],
  )

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      subtotal,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [
      items,
      itemCount,
      subtotal,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    ],
  )

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
