import { useEffect, useState } from 'react'
import { type ColumnDef } from '@tanstack/react-table'
import axios from 'axios'
import { DataTable } from '@/components/ui/data-table'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { Trash, Edit, MoreHorizontal, Eye } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useNavigate } from 'react-router-dom'
import api from "@/Config"
import { toast } from 'sonner'

type Roles = {
    role: string,
}

type Navbar = {
    _id: string,
    logo: string,
    location: string,
    signin: string,
    roleId: Roles[]
}


export default function UserTable() {
    const [navbar, setNavbar] = useState<Navbar[]>([])
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(1)
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState<string>('')

    const fetchCategories = async () => {
        try {
            setLoading(true)
            let response
            if (searchQuery) {
                response = await axios.post(`${api}/api/admin/users/searchuser/${searchQuery}`)
                setNavbar(response?.data?.data || [])
                console.log(response.data, "search data");
            } else {
                response = await axios.get(`${api}/api/admin/users/getuser`)
                setNavbar(response?.data?.data || [])
                setPage(response.data.currentPage)
                setPageCount(response.data.pageCount)
                // console.log("userdata data", response.data)
            }
            const { data } = response
            setPageCount(data.totalPages || 1)
        } catch (error) {
            console.error('Error fetching users:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [page, searchQuery])


    const deleteUser = async (id: any) => {
        try {
            await axios.delete(`${api}/api/admin/users/deleteuser/${id}`)
            toast.success('User deleted successfully')
            fetchCategories();
        } catch (error) {
            console.error('Error deleting permission:', error)
            alert('Failed to delete Role. Please try again.')
        }
    }

    const navigate = useNavigate();
    const viewpage = (id: any) => {
        navigate(`/dashboard/users/${id}/view`)
    }


    const columns: ColumnDef<Navbar>[] = [
        {
            accessorKey: 'profile',
            header: "Profile",
        },
        {
            accessorKey: 'name',
            header: "Name",
        },
        {
            accessorKey: 'email',
            header: "Email",
        },
        {
            accessorKey: 'roleId',
            header: "Roles",
            cell: ({ row }) => {
                return (
                    <div>
                        {row && row.original.roleId?.map((item: any, index: number) => (
                            <span key={index} className="mr-2">
                                {item.role}
                            </span>
                        ))}
                    </div>
                );
            }
        },
        {
            header: "Action",
            id: "actions",
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 sm:h-auto sm:w-auto sm:px-2">
                            <MoreHorizontal className="h-4 w-4" />
                            {/* <span className="hidden sm:inline">Actions</span> */}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => viewpage(row.original._id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/dashboard/users/${row.original._id}`)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteUser(row.original._id)}>
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ]


    const handleSearch = (query: string) => {
        setSearchQuery(query)
    }

    return (
        <section className="p-3">
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
                    <Button onClick={() => { navigate("/dashboard/users") }}>
                        Create User
                    </Button>
                )}
            </div>

            <div className="w-full overflow-x-auto">
                <DataTable
                    columns={columns}
                    data={navbar}
                    pageCount={pageCount}
                    currentPage={page}
                    onPageChange={setPage}
                    onSearch={handleSearch}
                    isLoading={loading}
                />
            </div>
        </section>
    )
}