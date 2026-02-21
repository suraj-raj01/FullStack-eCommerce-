import { useEffect, useState } from "react"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useNavigate, useParams } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"
import BASE_URL from "@/Config"

// ================= TYPES =================
type Variant = {
  name: string
  value: string
  price: number
  stock: number
  sku: string
}

type ProductImage = {
  url: string
  public_id?: string
}

type Category = {
  _id: string
  categories: string
  subcategories: {
    name: string
    brands: string[]
  }[]
}

export default function ProductForm() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<any>(null)

  const [tagInput, setTagInput] = useState("")

  // ================= FORM =================
  const [form, setForm] = useState({
    name: "",
    description: "",
    shortDescription: "",
    brand: "",
    category: "",
    subcategory: "",

    price: 0,
    salePrice: 0,
    costPrice: 0,
    currency: "INR",

    stock: 0,
    sku: "",
    lowStockThreshold: 5,

    variants: [] as Variant[],

    images: [] as ProductImage[],
    defaultImage: "",

    shipping: {
      weight: 0,
      dimensions: { length: 0, width: 0, height: 0 },
      isFreeShipping: false,
    },

    isFeatured: false,
    isActive: true,
    status: "published",

    metaTitle: "",
    metaDescription: "",

    tags: [] as string[],
  })

  const navigate = useNavigate();
  const { id } = useParams();

  const loadProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/products/${id}`)
      setForm(res.data?.data)
      // console.log(res.data?.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (id) {
      loadProducts()
    }
  }, [id])


  // ================= LOAD CATEGORY =================
  useEffect(() => {
    axios.get(`${BASE_URL}/api/admin/category`).then(res => setCategories(res.data))
  }, [])

  // ================= COMMON CHANGE =================
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
            ? Number(value)
            : value,
    }))
  }

  // ================= CATEGORY FLOW =================
  const handleCategoryChange = (value: string) => {
    const cat = categories.find(c => c.categories === value) || null
    setSelectedCategory(cat)
    setSelectedSubcategory(null)

    setForm(prev => ({
      ...prev,
      category: value,
      subcategory: "",
      brand: "",
    }))
  }

  const handleSubcategoryChange = (value: string) => {
    const sub = selectedCategory?.subcategories.find(s => s.name === value)
    setSelectedSubcategory(sub)

    setForm(prev => ({
      ...prev,
      subcategory: value,
      brand: "",
    }))
  }

  // ================= VARIANTS =================
  const addVariant = () => {
    setForm(prev => ({
      ...prev,
      variants: [
        ...prev.variants,
        { name: "", value: "", price: 0, stock: 0, sku: "" },
      ],
    }))
  }

  const removeVariant = (i: number) => {
    setForm(prev => ({
      ...prev,
      variants: prev.variants.filter((_, idx) => idx !== i),
    }))
  }

  const handleVariantChange = (i: number, field: keyof Variant, value: any) => {
    const updated = [...form.variants]
    updated[i] = { ...updated[i], [field]: value }
    setForm(prev => ({ ...prev, variants: updated }))
  }

  // ================= TAGS =================
  const addTag = () => {
    if (!tagInput.trim()) return
    setForm(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }))
    setTagInput("")
  }

  const removeTag = (i: number) => {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.filter((_, idx) => idx !== i),
    }))
  }

  // ================= SHIPPING CHANGE =================
  const handleShippingChange = (
    field: string,
    value: number | boolean
  ) => {
    setForm(prev => ({
      ...prev,
      shipping: {
        ...prev.shipping,
        [field]: value,
      },
    }))
  }

  // ================= DIMENSION CHANGE =================
  const handleDimensionChange = (
    field: "length" | "width" | "height",
    value: number
  ) => {
    setForm(prev => ({
      ...prev,
      shipping: {
        ...prev.shipping,
        dimensions: {
          ...prev.shipping.dimensions,
          [field]: value,
        },
      },
    }))
  }

  // ================= IMAGE UPLOAD =================
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const fd = new FormData()

    // ✅ MUST match backend → "images"
    Array.from(files).forEach((file) => {
      fd.append("images", file)
    })

    setLoading(true)

    try {
      const res = await axios.post(
        `${BASE_URL}/api/admin/upload/multiple`,
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      const uploadedFiles = res.data.files

      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedFiles],
        defaultImage:
          prev.defaultImage || uploadedFiles?.[0]?.url || "",
      }))
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const removeImage = (index: number) => {
    setForm((prev) => {
      const updated = prev.images.filter((_, i) => i !== index)

      return {
        ...prev,
        images: updated,
        defaultImage:
          prev.defaultImage === prev.images[index]?.url
            ? updated[0]?.url || ""
            : prev.defaultImage,
      }
    })
  }

  // ================= SUBMIT =================

  const handleSubmit = async () => {
    try {
      setLoading(true)
      if (id) {
        await axios.put(`${BASE_URL}/api/admin/products/${id}`, form);
      } else {
        await axios.post(`${BASE_URL}/api/admin/products`, form);
      }
      toast.success("Products created Successfully ✅")
      navigate("/dashboard/productstable")
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  // ================= STEPS META =================
  const steps = [
    "Basic Info",
    "Pricing & Inventory",
    "Variants & Tags",
    "Images, Shipping & SEO",
  ]

  // ================= UI =================
  return (
    <div className="p-3 space-y-8">
      <div className="flex mb-5 flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
        <div>
          {loading ? (
            <>
              <Skeleton className="h-9 w-32 mb-2" />
              <Skeleton className="h-5 w-48" />
            </>
          ) : (
            <>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                <p className="text-muted-foreground">
                  Manage and track all the products
                </p>
              </div>
            </>
          )}
        </div>
        {loading ? (
          <Skeleton className="h-10 w-32" />
        ) : (
          <Button onClick={() => { navigate("/dashboard/productstable") }}>
            Products Table
          </Button>
        )}
      </div>
      {/* ===== STEPPER ===== */}
      <div className="flex flex-wrap gap-3">
        {steps.map((title, index) => {
          const s = index + 1
          return (
            <div
              key={s}
              onClick={() => setStep(s)}
              className={`px-4 py-2 cursor-pointer rounded-xs text-sm font-medium ${step === s ? "bg-black text-white" : "bg-gray-200"
                }`}
            >
              {s}. {title}
            </div>
          )
        })}
      </div>

      {/* ================= STEP 1 ================= */}
      {step === 1 && (
        <div className="grid border p-1 md:p-5 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Product Name</Label>
            <Input name="name" value={form.name} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label>Categories</Label>
            {/* Category */}
            <Select value={form.category || ""} onValueChange={handleCategoryChange} >
              <SelectTrigger className="w-full"><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent >
                {categories.map(cat => (
                  <SelectItem key={cat._id} value={cat.categories}>
                    {cat.categories}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Categories</Label>
            {/* Sub Category */}
            <Select onValueChange={handleSubcategoryChange} disabled={!selectedCategory}>
              <SelectTrigger className="w-full"><SelectValue placeholder="Subcategory" /></SelectTrigger>
              <SelectContent>
                {selectedCategory?.subcategories.map((s, i) => (
                  <SelectItem key={i} value={s.name}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Brand</Label>
            <Select onValueChange={v => setForm(p => ({ ...p, brand: v }))}>
              <SelectTrigger className="w-full"><SelectValue placeholder="Select brand" /></SelectTrigger>
              <SelectContent>
                {selectedSubcategory?.brands?.map((b: string, i: number) => (
                  <SelectItem key={i} value={b}>{b}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label>Description</Label>
            <Textarea name="description" value={form.description} onChange={handleChange} />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label>Short Description</Label>
            <Textarea name="shortDescription" value={form.shortDescription} onChange={handleChange} />
          </div>

        </div>
      )}

      {/* ================= STEP 2 ================= */}
      {step === 2 && (
        <div className="grid border p-1 md:p-5 md:grid-cols-3 gap-4">

          <div className="space-y-1">
            <label className="text-sm font-medium">Price</label>
            <Input
              name="price"
              type="number"
              placeholder="Enter price"
              value={form.price}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Sale Price</label>
            <Input
              name="salePrice"
              type="number"
              placeholder="Enter sale price"
              value={form.salePrice}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Cost Price</label>
            <Input
              name="costPrice"
              type="number"
              placeholder="Enter cost price"
              value={form.costPrice}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Stock</label>
            <Input
              name="stock"
              type="number"
              placeholder="Enter stock"
              value={form.stock}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">SKU</label>
            <Input
              name="sku"
              placeholder="Enter SKU"
              value={form.sku}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Low Stock Threshold</label>
            <Input
              name="lowStockThreshold"
              type="number"
              placeholder="Low stock alert"
              value={form.lowStockThreshold}
              onChange={handleChange}
            />
          </div>

        </div>
      )}

      {/* ================= STEP 3 ================= */}
      {step === 3 && (
        <div className="space-y-6 border p-1 md:p-5">

          <Button type="button" onClick={addVariant}>+ Add Variant</Button>

          {form.variants.map((v, i) => (
            <div
              key={i}
              className="grid md:grid-cols-5 gap-3 border p-4 rounded-xs"
            >
              {/* Name */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Variant Name</label>
                <Input
                  placeholder="e.g. Color"
                  value={v.name}
                  onChange={(e) =>
                    handleVariantChange(i, "name", e.target.value)
                  }
                />
              </div>

              {/* Value */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Variant Value</label>
                <Input
                  placeholder="e.g. Red"
                  value={v.value}
                  onChange={(e) =>
                    handleVariantChange(i, "value", e.target.value)
                  }
                />
              </div>

              {/* Price */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Price</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={v.price}
                  onChange={(e) =>
                    handleVariantChange(i, "price", Number(e.target.value) || 0)
                  }
                />
              </div>

              {/* Stock */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Stock</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={v.stock}
                  onChange={(e) =>
                    handleVariantChange(i, "stock", Number(e.target.value) || 0)
                  }
                />
              </div>

              {/* Remove Button */}
              <div className="flex items-end">
                <Button
                  type="button"
                  variant="destructive"
                  className="w-full"
                  onClick={() => removeVariant(i)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}

          {/* TAGS */}
          <div className="">
            <label className="text-sm font-medium">Add Tags</label>
            <div className="flex gap-2">
              <Input value={tagInput} placeholder="new" onChange={e => setTagInput(e.target.value)} />
              <Button type="button" onClick={addTag}>Add Tag</Button>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            {form.tags.map((t, i) => (
              <span key={i} onClick={() => removeTag(i)} className="bg-gray-200 px-2 py-1 rounded cursor-pointer">
                {t} ❌
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ================= STEP 4 ================= */}
      {step === 4 && (
        <div className="space-y-4 border p-1 md:p-5">

          <div className="space-y-2">
            <label className="text-sm font-medium">Upload Images</label>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-10 gap-4">
            {form.images.map((img, i) => (
              <div key={i} className="relative group">
                <img
                  src={img.url}
                  alt="product"
                  className={`w-20 h-18 object-cover rounded-lg border ${form.defaultImage === img.url
                    ? "ring-2 ring-black"
                    : ""
                    }`}
                />

                {/* remove */}
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute -top-2 cursor-pointer -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
                >
                  ✕
                </button>

                {/* set default */}
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      defaultImage: img.url,
                    }))
                  }
                  className="absolute cursor-pointer bottom-1 left-1 text-[10px] bg-black/70 text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100"
                >
                  Make Default
                </button>
              </div>
            ))}
          </div>

          {/* ================= SHIPPING ================= */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Shipping Details</h3>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Weight */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Weight (kg)</label>
                <Input
                  type="number"
                  value={form.shipping.weight}
                  onChange={(e) =>
                    handleShippingChange("weight", Number(e.target.value))
                  }
                  placeholder="0"
                />
              </div>

              {/* Length */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Length (cm)</label>
                <Input
                  type="number"
                  value={form.shipping.dimensions.length}
                  onChange={(e) =>
                    handleDimensionChange("length", Number(e.target.value))
                  }
                  placeholder="0"
                />
              </div>

              {/* Width */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Width (cm)</label>
                <Input
                  type="number"
                  value={form.shipping.dimensions.width}
                  onChange={(e) =>
                    handleDimensionChange("width", Number(e.target.value))
                  }
                  placeholder="0"
                />
              </div>

              {/* Height */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Height (cm)</label>
                <Input
                  type="number"
                  value={form.shipping.dimensions.height}
                  onChange={(e) =>
                    handleDimensionChange("height", Number(e.target.value))
                  }
                  placeholder="0"
                />
              </div>
            </div>

            {/* Free Shipping */}
            <div className="flex items-center gap-2 justify-start pt-2">
              <Input
                type="checkbox"
                checked={form.shipping.isFreeShipping}
                className="w-fit"
                onChange={(e) =>
                  handleShippingChange("isFreeShipping", e.target.checked)
                }
              />
              <label className="text-sm font-medium">Free Shipping</label>
            </div>
          </div>

          {/* SHIPPING */}
          <div className="grid md:grid-cols-4 gap-3">
            <Input name="metaTitle" placeholder="Meta Title" value={form.metaTitle} onChange={handleChange} />
            <Input name="metaDescription" placeholder="Meta Description" value={form.metaDescription} onChange={handleChange} />
          </div>

          <Button onClick={handleSubmit} disabled={loading}>
            {id ? "Update Product" : "Create Product"}
          </Button>
        </div>
      )}

      {/* NAV */}
      <div className="flex gap-4">
        {step > 1 && <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>}
        {step < 4 && <Button onClick={() => setStep(step + 1)}>Next</Button>}
      </div>
    </div>
  )
}