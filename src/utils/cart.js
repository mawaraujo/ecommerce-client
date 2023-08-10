import { LOCAL_STORAGE_CART_NAME } from '../constants/application'

export class Cart {
  /**
   *
   * @param {string} product
   * @return {void}
   */
  static createCart (product) {
    const cart = [
      {
        product,
        quantity: 1
      }
    ]

    localStorage.setItem(LOCAL_STORAGE_CART_NAME, JSON.stringify(cart))
  }

  /**
   *
   * @param {string} product
   * @return {void}
   */
  static add (product) {
    const item = localStorage.getItem(LOCAL_STORAGE_CART_NAME)

    if (!item) {
      this.createCart(product)
      return
    }

    let cart = JSON.parse(item)
    const itemIndex = cart.findIndex(i => i.product === product)

    if (itemIndex === -1) {
      cart.push({
        product,
        quantity: 1
      })
    } else {
      cart[itemIndex].quantity = cart[itemIndex].quantity + 1
    }

    cart = JSON.stringify(cart)
    localStorage.setItem(LOCAL_STORAGE_CART_NAME, cart)
  }

  /**
   *
   * @param {string} product
   * @return {void}
   */
  static remove (product) {
    const item = localStorage.getItem(LOCAL_STORAGE_CART_NAME)

    if (!item) {
      return
    }

    let cart = JSON.parse(item)
    const itemIndex = cart.findIndex(i => i.product === product)

    if (cart[itemIndex].quantity > 1) {
      cart[itemIndex].quantity = cart[itemIndex].quantity - 1
    } else {
      cart = cart.filter(c => c.product !== product)
    }

    cart = JSON.stringify(cart)
    localStorage.setItem(LOCAL_STORAGE_CART_NAME, cart)
  }

  /**
   * @return {void}
   */
  static removeAll () {
    localStorage.removeItem(LOCAL_STORAGE_CART_NAME)
  }

  /**
   *
   * @return {number}
   */
  static count () {
    let item = localStorage.getItem(LOCAL_STORAGE_CART_NAME)
    if (!item) {
      return 0
    }

    item = JSON.parse(item)
    return item.length
  }
}
