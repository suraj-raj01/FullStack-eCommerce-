import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "@/Config";
import { toast } from "sonner";

type Users = {
    _id: string
    role: string
    name: string
    email: string
    password: string
    profile: string
    roleId: string
}

export default function UserForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        profile: '',
        roleId: '',
    });

    const [roles, setRole] = useState<Users[]>([]);
    const [loading, setLoading] = useState(false); // form submit
    const [rolesLoading, setRolesLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // console.log(formData, "formdata");
    };

    const handleRoleChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            roleId: value,
        }));
    };

    const { id } = useParams();
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [preview, setPreview] = useState("")
    const [defaultrole, setDefaultRole] = useState("")


    const handleImageChange = (e: any) => {
        const file = e.target.files[0]
        if (!file) return

        setImageFile(file)
        setPreview(URL.createObjectURL(file))
    }

    const uploadImageToCloudinary = async () => {
        if (!imageFile) return ""

        setImageLoading(true)
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
            toast.error("Image upload failed")
            return ""
        } finally {
            setImageLoading(false)
        }
    }

    const fetchRoles = async () => {
        setRolesLoading(true)
        try {
            const response = await axios.get(
                `${BASE_URL}/api/admin/roles/getrole`
            )
            setRole(response?.data?.data || [])
        } catch (error) {
            console.error("Error fetching roles:", error)
        } finally {
            setRolesLoading(false)
        }
    }

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const response = await axios.get(
                `${BASE_URL}/api/admin/users/getuserbyid/${id}`
            )
            setPreview(response?.data?.data?.profile)
            setDefaultRole(response?.data?.data?.roleId[0].role || "")
            setFormData({
                name: response?.data?.data?.name,
                email: response?.data?.data?.email,
                password: response?.data?.data?.password,
                profile: response?.data?.data?.profile,
                roleId: response?.data?.data?.roleId,
            });
        } catch (error) {
            console.error("Error fetching roles:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (id) fetchUsers();
    }, [id])

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setLoading(true)

        try {
            const imageUrl = await uploadImageToCloudinary()

            const payload = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                roleId: formData.roleId,
                profile:imageUrl?(imageUrl): formData.profile,
            }

            if (id) {
                await axios.put(
                    `${BASE_URL}/api/admin/users/updateuser/${id}`,
                    payload
                )
            } else {
                await axios.post(
                    `${BASE_URL}/api/admin/users/createuser`,
                    payload
                )
            }
            toast.success(id ? "User updated successfully" : "User created successfully")
            setFormData({
                name: "",
                email: "",
                password: "",
                roleId: "",
                profile: "",
            })
            navigate("/dashboard/userstable") // ✅ SPA navigation
        } catch (error: any) {
            console.error("Error creating user:", error)
            toast.error(error?.response?.data?.message || "Failed to create user")
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="p-3">
            <div className="flex justify-between items-center mb-4">
                <div>
                    {loading ? (
                        <>
                            <Skeleton className="h-9 w-32 mb-2" />
                            <Skeleton className="h-5 w-48" />
                        </>
                    ) : (
                        <>
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                                <p className="text-muted-foreground">
                                    Manage and track all the users
                                </p>
                            </div>
                        </>
                    )}
                </div>
                {loading ? (
                    <Skeleton className="h-10 w-32" />
                ) : (
                    <Button onClick={() => { navigate("/dashboard/userstable") }}>

                        Users Table
                    </Button>
                )}
            </div>

            <div className="flex items-center justify-center w-full gap-0">
                <form className="grid gap-4 md:w-2xl border p-5 mt-3 rounded-xs" onSubmit={handleSubmit}>
                    <div className="grid gap-0">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Enter name"
                            value={formData.name}
                            onChange={handleInput}
                            required
                        />
                    </div>

                    <div className="grid gap-0">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleInput}
                            required
                        />
                    </div>

                    {id ? (
                        ""
                    ) : (
                        <div className="grid gap-0">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleInput}
                                required
                            />
                        </div>
                    )}

                    <div className="grid gap-0">
                        <Label htmlFor="profile">Profile Image</Label>
                        <div className="space-y-2 md:col-span-1">
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
                    </div>

                    <div className="grid gap-0">
                        <Label>Select role</Label>
                        <Select defaultValue={defaultrole} value={formData.roleId} onValueChange={handleRoleChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                {roles.map((role) => (
                                    <SelectItem key={role._id} value={role._id}>
                                        {role.role}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                    </div>

                    <Button
                        type="submit"
                        variant="default"
                        disabled={loading || imageLoading || rolesLoading}
                    >
                        {loading ? "loading..." : id ? "Update" : "Create"}
                    </Button>
                </form>
            </div>
        </section>
    );
};

