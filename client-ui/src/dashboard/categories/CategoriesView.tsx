import BASE_URL from "@/Config"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

type Subcategory = {
  _id: string
  name: string
  brands: string[]
}

type Category = {
  _id: string
  categories: string
  subcategories: Subcategory[]
  createdAt: string
}

export default function CategoriesView() {

  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)

  const { id } = useParams()

  const fetchCategory = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/category/${id}`)
      setCategory(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) fetchCategory()
  }, [id])

  if (loading) return <div className="p-4">Loading category...</div>

  if (!category) return <div className="p-4">Category not found</div>

  return (
    <div className="p-4 space-y-6">

      {/* Category Name */}
      <h2 className="text-lg font-semibold mb-3">
        {category.categories}
      </h2>

      {/* Subcategories */}
      <div className="flex flex-wrap gap-3 items-start">

        {category.subcategories?.map(sub => (
          <div key={sub._id} className="border p-3 w-fit">

            <h3 className="font-medium text-sm mb-2">
              {sub.name}
            </h3>

            {/* Brands */}
            <div className="flex flex-wrap gap-2">
              {sub.brands?.map((brand, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-gray-100 border"
                >
                  {brand}
                </span>
              ))}
            </div>

          </div>
        ))}

      </div>

    </div>
  )
}


