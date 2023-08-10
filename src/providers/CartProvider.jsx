import { useState, createContext, useContext, useEffect } from 'react'
import { Cart } from '../utils/cart'

const CartContext = createContext({ cartCount: 0, updateCartCount: () => {} })

export function CartProvider ({ children }) {
  const [cartCount, setCartCount] = useState(0)

  const updateCartCount = () => {
    setCartCount(Cart.count())
  }

  useEffect(() => {
    updateCartCount()
  }, [])

  return (
    <CartContext.Provider
      value={{
        cartCount,
        updateCartCount
      }}>

      {children && children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
