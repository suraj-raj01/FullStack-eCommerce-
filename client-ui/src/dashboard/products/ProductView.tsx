import BASE_URL from "@/Config"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Badge } from "@/components/ui/badge"

export default function ProductView() {
  const [product, setProduct] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState<string>("")

  const { id } = useParams()

  // ================= FETCH =================
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/products/${id}`)
      const data = res.data.data
      setProduct(data)
      setActiveImage(data?.defaultImage || data?.images?.[0]?.url || "")
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) fetchProducts()
  }, [id])

  // ================= STATES =================
  if (loading) return <div className="p-6">Loading product...</div>
  if (!product) return <div className="p-6">Product not found</div>

  // ================= UI =================
  return (
    <div className="p-3 space-y-6">
      {/* ===== TOP SECTION ===== */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* ===== IMAGE GALLERY ===== */}
        <div className="space-y-3">
          <img
            src={activeImage}
            alt={product.name}
            className="w-full h-[350px] object-cover rounded-xs border"
          />

          <div className="flex gap-2 flex-wrap">
            {product.images?.map((img: any) => (
              <img
                alt={product.name}
                key={img._id}
                src={img.url}
                onClick={() => setActiveImage(img.url)}
                className={`w-20 h-20 object-cover cursor-pointer border ${
                  activeImage === img.url ? "ring-2 ring-black" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* ===== BASIC INFO ===== */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>

          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary">{product.category}</Badge>
            <Badge variant="outline">{product.subcategory}</Badge>
            <Badge>{product.brand}</Badge>
          </div>

          <p className="text-gray-600">{product.shortDescription}</p>

          <div className="space-y-1">
            <div className="text-2xl font-bold">
              ₹{product.salePrice || product.price}
            </div>
            {product.salePrice && (
              <div className="text-sm text-gray-500 line-through">
                ₹{product.price}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><b>SKU:</b> {product.sku}</div>
            <div><b>Stock:</b> {product.stock}</div>
            <div><b>Status:</b> {product.status}</div>
            <div><b>Featured:</b> {product.isFeatured ? "Yes" : "No"}</div>
          </div>
        </div>
      </div>

      {/* ===== DESCRIPTION ===== */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Description</h2>
        <p className="text-gray-700 whitespace-pre-line">
          {product.description}
        </p>
      </div>

      {/* ===== VARIANTS ===== */}
      {product.variants?.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Variants</h2>

          <div className="overflow-auto border rounded-xs">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Value</th>
                  <th className="p-2 text-left">Price</th>
                  <th className="p-2 text-left">Stock</th>
                </tr>
              </thead>
              <tbody>
                {product.variants.map((v: any, i: number) => (
                  <tr key={i} className="border-t">
                    <td className="p-2">{v.name}</td>
                    <td className="p-2">{v.value}</td>
                    <td className="p-2">₹{v.price}</td>
                    <td className="p-2">{v.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===== SHIPPING ===== */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Shipping</h2>

        <div className="grid md:grid-cols-4 gap-3 text-sm">
          <div><b>Weight:</b> {product.shipping?.weight}</div>
          <div><b>Length:</b> {product.shipping?.dimensions?.length}</div>
          <div><b>Width:</b> {product.shipping?.dimensions?.width}</div>
          <div><b>Height:</b> {product.shipping?.dimensions?.height}</div>
          <div><b>Free Shipping:</b> {product.shipping?.isFreeShipping ? "Yes" : "No"}</div>
        </div>
      </div>

      {/* ===== TAGS ===== */}
      {product.tags?.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Tags</h2>
          <div className="flex gap-2 flex-wrap">
            {product.tags.map((tag: string, i: number) => (
              <Badge key={i} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* ===== SEO ===== */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">SEO</h2>
        <div className="text-sm space-y-1">
          <div><b>Meta Title:</b> {product.metaTitle}</div>
          <div><b>Meta Description:</b> {product.metaDescription}</div>
        </div>
      </div>
    </div>
  )
}