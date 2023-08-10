import { Link } from 'react-router-dom'
import { Cart } from '../utils/cart'
import { useCart } from '../providers/CartProvider'

export function Product ({ product }) {
  const { updateCartCount } = useCart()
  const productLink = `/product/${product._id}`

  const addProductToCart = () => {
    Cart.add(product._id)
    updateCartCount()
  }

  return (
      <article
        className="flex flex-col w-100 h-100">
        <Link to={productLink}>
          <picture>
            <img
              className="object-cover bg-gray-200 w-full h-[150px]"
              src={product.image} />
          </picture>
        </Link>

        <div className="bg-gray-200 p-3">
          <Link to={productLink}>
            <h2 className="font-bold">{product.name}</h2>
            <p className="text-gray-500">${product.price}</p>
          </Link>

          <button
            onClick={addProductToCart}
            className="mt-3 pointer w-full text-center hover:text-gray-300 transition-all">
            Add to cart
          </button>
        </div>
      </article>
  )
}
