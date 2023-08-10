import { Link } from 'react-router-dom'
import { useCart } from '../providers/CartProvider'

export function Header () {
  const { cartCount } = useCart()

  return (
    <header className="w-full p-6 bg-white flex justify-between sticky top-0 left-0">
      <Link to="/" className="font-bold">My Store</Link>

      <nav>
        <ul className="flex gap-5">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/cart">Cart ({cartCount})</Link></li>
        </ul>
      </nav>
    </header>
  )
}
