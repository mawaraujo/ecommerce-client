import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { Router } from './pages/Root'
import { CartProvider } from './providers/CartProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={Router} />
    </CartProvider>
  </React.StrictMode>
)
