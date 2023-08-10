import { API_URL } from '../constants/api'
import { BaseService } from './baseService'

export class CategoryService extends BaseService {
  static async getAll () {
    try {
      const url = `${API_URL}/categories`
      const request = await fetch(url)
      const data = await request.json()

      return this.buildResponse(data, null)
    } catch (error) {
      return this.buildResponse(null, error)
    }
  }
}
