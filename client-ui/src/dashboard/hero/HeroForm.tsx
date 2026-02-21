import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import BASE_URL from "@/Config"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

export default function HeroForm() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    button: "",
    link: "",
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState("")
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  // ================= FETCH FOR EDIT =================
  useEffect(() => {
    if (!id) return

    const fetchHero = async () => {
      const res = await axios.get(`${BASE_URL}/api/admin/heroes/${id}`)
      const data = res.data.data

      setForm(data)
      setPreview(data.image)
    }

    fetchHero()
  }, [id])

  // ================= HANDLE CHANGE =================
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // ================= IMAGE SELECT =================
  const handleImageChange = (e: any) => {
    const file = e.target.files[0]
    if (!file) return

    setImageFile(file)
    setPreview(URL.createObjectURL(file))
  }

  // ================= UPLOAD IMAGE =================
  const uploadImageToCloudinary = async () => {
    if (!imageFile) return form.image

    setUploading(true)
    try {
      const fd = new FormData()
      fd.append("image", imageFile)

      const res = await axios.post(
        `${BASE_URL}/api/admin/upload/single`,
        fd
      )

      return res.data.url
    } catch (err) {
      console.error("Image upload failed", err)
      return ""
    } finally {
      setUploading(false)
    }
  }

  // ================= SUBMIT =================
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    try {
      // 🔥 STEP 1: upload image if changed
      const imageUrl = await uploadImageToCloudinary()

      const payload = {
        ...form,
        image: imageUrl,
      }

      // 🔥 STEP 2: save hero
      if (id) {
        await axios.put(`${BASE_URL}/api/admin/heroes/${id}`, payload)
      } else {
        await axios.post(`${BASE_URL}/api/admin/heroes`, payload)
      }
      toast.success(id ? "Hero Updated Successfully ✅" : "Hero Created Successfully ✅")
      navigate("/dashboard/herotable")
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="p-3 w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
        <div>
          {loading ? (
            <>
              <Skeleton className="h-9 w-32 mb-2" />
              <Skeleton className="h-5 w-48" />
            </>
          ) : (
            <>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Hero Carousel</h1>
                <p className="text-muted-foreground">
                  Manage and track all the hero carousels
                </p>
              </div>
            </>
          )}
        </div>
        {loading ? (
          <Skeleton className="h-10 w-32" />
        ) : (
          <Button onClick={() => { navigate("/dashboard/herotable") }}>
            Hero Carousel Table
          </Button>
        )}
      </div>
      <div className="p-4 mt-10 md:max-w-3xl mx-auto border">
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">

          {/* TITLE */}
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* BUTTON */}
          <div className="space-y-2">
            <Label>Button Text</Label>
            <Input
              name="button"
              value={form.button}
              onChange={handleChange}
              required
            />
          </div>

          {/* LINK */}
          <div className="space-y-2 md:col-span-1">
            <Label>Button Link</Label>
            <Input
              name="link"
              value={form.link}
              onChange={handleChange}
              required
            />
          </div>
          {/* IMAGE */}
          <div className="space-y-2 md:col-span-1">
            <Label>Hero Image</Label>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
          {/* PREVIEW */}
          {preview && (
            <div className="md:col-span-1">
              <img
                src={preview}
                alt="preview"
                className="h-20 rounded-xs border object-cover"
              />
            </div>
          )}
          </div>


          {/* DESCRIPTION */}
          <div className="space-y-2 md:col-span-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* SUBMIT */}
          <div className="md:col-span-2">
            <Button
              type="submit"
              disabled={loading || uploading}
              className="w-full"
            >
              {uploading
                ? "Uploading image..."
                : loading
                  ? "Saving..."
                  : id
                    ? "Update Hero"
                    : "Create Hero"}
            </Button>
          </div>

        </form>
      </div>
    </section>
  )
}