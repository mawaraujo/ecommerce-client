import { API_URL } from '../constants/api'
import { BaseService } from './baseService'

export class ProductService extends BaseService {
  static async getAll ({ page = 1, limit = 10, category = '' }) {
    try {
      const url = `${API_URL}/products?page=${page}&limit=${limit}&category=${category}`
      const request = await fetch(url)
      const data = await request.json()

      if (request.status !== 200) {
        throw Error('Server error')
      }

      return this.buildResponse(data, null)
    } catch (error) {
      return this.buildResponse(null, error)
    }
  }

  static async get (product) {
    try {
      const url = `${API_URL}/products/${product}`
      const request = await fetch(url)
      const data = await request.json()

      if (request.status !== 200) {
        throw Error('Product not found')
      }

      return this.buildResponse(data, null)
    } catch (error) {
      return this.buildResponse(null, error)
    }
  }
}
