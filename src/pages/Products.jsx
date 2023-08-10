import { useEffect, useState } from 'react'
import { CategoryService, ProductService } from '../services'
import { useAPI } from '../hooks/useAPI'
import { Product } from '../components/Product'
import { FetchErrorMessage } from '../components/FetchErrorMessage'
import { FetchLoading } from '../components/FetchLoading'
import { Layout } from '../components/Layout'

export function ProductsPage () {
  const api = useAPI()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  const fetchProducts = async (reset = false) => {
    api.startRequest()

    const response = await ProductService.getAll({
      page: reset
        ? 1
        : api.page,
      category: selectedCategory,
      limit: 10
    })

    if (!response.success) {
      return api.endRequest({ newError: true })
    }

    setProducts(response.data.docs)
    api.endRequest({ totalPages: response.data.totalPages })
  }

  const fetchCategories = async () => {
    const response = await CategoryService.getAll()

    if (response.success) {
      setCategories(response.data)
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchProducts(true)
  }, [selectedCategory])

  if (api.error) {
    return (
      <Layout>
        <FetchErrorMessage />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="flex gap-5 h-full w-full">
        <aside className="bg-white h-full min-w-[200px] p-5">
          <h3 className="mb-5 font-bold text-xl">Categories</h3>

          <div className="flex flex-col gap-1">
            <a
              onClick={() => setSelectedCategory('')}
              className={`cursor-pointer ${!selectedCategory ? 'font-bold' : ''}`}>
              All
            </a>

            {
              categories.map((category) => (
                <a
                  className={`cursor-pointer ${selectedCategory === category._id ? 'font-bold' : ''}`}
                  key={category._id}
                  onClick={() => setSelectedCategory(category._id)}>
                  {category.name}
                </a>
              ))
            }
          </div>
        </aside>

        {
          !api.loading && (
            <section
              className="w-full grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-10 flex-1">
              {
                products.map(product => (
                  <Product key={product._id} product={product} />
                ))
              }
            </section>
          )
        }

        {
          api.loading && (
            <FetchLoading />
          )
        }
      </div>
    </Layout>
  )
}
