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

export default function HeroView() {

  const [hero, setHero] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)

  const { id } = useParams()

  const fetchCategory = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/heroes/${id}`)
      setHero(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) fetchCategory()
  }, [id])

  if (loading) return <div className="p-4">Loading hero...</div>

  if (!hero) return <div className="p-4">Category not found</div>

  return (
    <div>
        <pre>
            {JSON.stringify(hero, null, 2)}
        </pre>
    </div>
  )
}


