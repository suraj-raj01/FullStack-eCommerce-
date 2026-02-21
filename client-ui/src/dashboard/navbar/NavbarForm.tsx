import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import BASE_URL from "@/Config"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export default function NavbarForm() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        logo: "",
        location: "",
        signin: "",
    })

    const [logoFile, setLogoFile] = useState<File | null>(null)
    const [preview, setPreview] = useState("")
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)

    // ================= FETCH FOR EDIT =================
    useEffect(() => {
        if (!id) return

        const fetchNavbar = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/admin/navbar/${id}`)
                const data = res.data?.data
                // console.log(data)
                setForm(data)
                setPreview(data.logo)
            } catch (err) {
                console.error(err)
            }
        }

        fetchNavbar()
    }, [id])

    // ================= HANDLE CHANGE =================
    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    // ================= LOGO SELECT =================
    const handleLogoChange = (e: any) => {
        const file = e.target.files[0]
        if (!file) return

        setLogoFile(file)
        setPreview(URL.createObjectURL(file))
    }

    // ================= UPLOAD LOGO =================
    const uploadLogo = async () => {
        if (!logoFile) return form.logo

        setUploading(true)
        try {
            const fd = new FormData()
            fd.append("image", logoFile)

            const res = await axios.post(
                `${BASE_URL}/api/admin/upload/single`,
                fd
            )

            return res.data.url
        } catch (err) {
            console.error("Logo upload failed", err)
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
            // 🔥 upload logo first
            const logoUrl = await uploadLogo()

            const payload = {
                ...form,
                logo: logoUrl,
            }

            if (id) {
                await axios.put(`${BASE_URL}/api/admin/navbar/${id}`, payload)
            } else {
                await axios.post(`${BASE_URL}/api/admin/navbar`, payload)
            }

            navigate("/dashboard/navbartable")
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-3">
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
                                <h1 className="text-3xl font-bold tracking-tight">Navbar</h1>
                                <p className="text-muted-foreground">
                                    Manage and track all the navbar section
                                </p>
                            </div>
                        </>
                    )}
                </div>
                {loading ? (
                    <Skeleton className="h-10 w-32" />
                ) : (
                    <Button onClick={() => { navigate("/dashboard/navbartable   ") }}>
                        Navbar Table
                    </Button>
                )}
            </div>
            <div className="p-4 mt-10 max-w-3xl border mx-auto">
                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">

                    {/* TITLE */}
                    <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            placeholder="Location"
                        />
                    </div>

                    {/* SIGNIN */}
                    <div className="space-y-2">
                        <Label>Signin Text *</Label>
                        <Input
                            name="signin"
                            value={form.signin}
                            onChange={handleChange}
                            placeholder="Sign in"
                            required
                        />
                    </div>

                    {/* LOGO */}
                    <div className="space-y-2 md:col-span-2">
                        <Label>Logo *</Label>
                        <Input type="file" accept="image/*" onChange={handleLogoChange} />
                    </div>

                    {/* PREVIEW */}
                    {preview && (
                        <div className="md:col-span-2">
                            <img
                                src={preview}
                                alt="logo preview"
                                className="h-20 rounded-xs border object-contain p-2"
                            />
                        </div>
                    )}

                    {/* SUBMIT */}
                    <div className="md:col-span-2">
                        <Button
                            type="submit"
                            disabled={loading || uploading}
                            className="w-full"
                        >
                            {uploading
                                ? "Uploading logo..."
                                : loading
                                    ? "Saving..."
                                    : id
                                        ? "Update Navbar"
                                        : "Create Navbar"}
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    )
}