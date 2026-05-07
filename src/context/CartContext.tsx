import { createContext, useContext, useState, type ReactNode } from "react"

export interface Product {
  id: number
  name: string
  price: string
  priceNum: number
  description: string
  category: string
  badge?: string | null
  badgeColor?: string
}

export interface CartItem extends Product {
  qty: number
}

interface CartContextType {
  items: CartItem[]
  add: (product: Product) => void
  remove: (id: number) => void
  increment: (id: number) => void
  decrement: (id: number) => void
  clear: () => void
  total: number
  count: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const add = (product: Product) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === product.id)
      if (exists) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const remove = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id))

  const increment = (id: number) => setItems((prev) => prev.map((i) => i.id === id ? { ...i, qty: i.qty + 1 } : i))

  const decrement = (id: number) => setItems((prev) => {
    const item = prev.find((i) => i.id === id)
    if (!item) return prev
    if (item.qty === 1) return prev.filter((i) => i.id !== id)
    return prev.map((i) => i.id === id ? { ...i, qty: i.qty - 1 } : i)
  })

  const clear = () => setItems([])

  const total = items.reduce((sum, i) => sum + i.priceNum * i.qty, 0)
  const count = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, add, remove, increment, decrement, clear, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
