import BASE_URL from "@/Config"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

type Navbar = {
  _id: string
  loacation:string
  signin:string
  logo:string
}

export default function NavbarView() {

  const [navbar, setNavbar] = useState<Navbar | null>(null)
  const [loading, setLoading] = useState(true)

  const { id } = useParams()

  const fetchCategory = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/navbar/${id}`)
      setNavbar(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) fetchCategory()
  }, [id])

  if (loading) return <div className="p-4">Loading navbar...</div>

  if (!navbar) return <div className="p-4">Navbar not found</div>

  return (
    <div>
        <pre>
            {JSON.stringify(navbar, null, 2)}
        </pre>
    </div>
  )
}


