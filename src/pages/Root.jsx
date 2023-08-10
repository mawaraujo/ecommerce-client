import { ProductPage } from './Product'
import { ProductsPage } from './Products'
import { createBrowserRouter } from 'react-router-dom'

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <ProductsPage />
  },
  {
    path: '/product/:product',
    element: <ProductPage />
  }
])
