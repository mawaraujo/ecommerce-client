import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAPI } from '../hooks/useAPI'
import { ProductService } from '../services'
import { Layout } from '../components/Layout'

import { FetchLoading } from '../components/FetchLoading'
import { Cart } from '../utils/cart'
import { useCart } from '../providers/CartProvider'

export function ProductPage () {
  const { updateCartCount } = useCart()
  const api = useAPI()
  const params = useParams()
  const [product, setProduct] = useState(null)

  const addToCart = () => {
    Cart.add(product._id)
    updateCartCount()
  }

  const fetchProduct = async () => {
    if (!params.product) {
      api.endRequest({
        newError: true,
        newErrorMessage: 'Product not found'
      })
      return
    }

    api.startRequest()
    const response = await ProductService.get(params.product)

    if (!response.success) {
      api.endRequest({
        newError: true,
        newErrorMessage: 'Internal Server Error'
      })
      return
    }

    setProduct(response.data)
    api.endRequest({})
  }

  useEffect(() => {
    fetchProduct()
  }, [params])

  if (api.loading) {
    return (
      <Layout>
        <FetchLoading />
      </Layout>
    )
  }

  if (!api.loading && api.error) {
    return (
     <Layout>
        <div className="flex flex-col items-center">
          <h1 className="">Error ocurred</h1>
          <h2 className="mb-10">{api.errorMessage}</h2>

          <Link to="/">Back to home</Link>
        </div>
     </Layout>
    )
  }

  return (
    <Layout>
      <article className="mb-10">
        <picture className="w-full h-full">
          <img
            className="object-cover w-full h-full"
            src={product.image}
            alt={product.name}
            width="100%"
            height="100%" />
        </picture>

        <h1 className="font-bold text-2xl mb-2">{product.name}</h1>
        <p>{product.description}</p>
      </article>

      <button
        className="cursor-pointer"
        onClick={addToCart}>
        Add to cart
      </button>
    </Layout>
  )
}
