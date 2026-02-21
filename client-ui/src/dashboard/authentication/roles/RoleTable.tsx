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
import { Trash, Edit, MoreHorizontal } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from '@/components/ui/badge'
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import BASE_URL from '@/Config'
import { toast } from 'sonner'

type Permission = {
  _id: string
  permission: string
  description: string
}

type Roles = {
  permissionId: Permission[]
  _id: string
  role: string
  name: string
  permissions: Permission[]
  roleId: string
}

type FormValues = {
  role: string
  permissionId: string[]
}

export default function Roles() {
  const [roles, setRoles] = useState<Roles[]>([])
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(1)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Roles | null>(null)

  const form = useForm<FormValues>({
    defaultValues: {
      role: "",
      permissionId: []
    }
  })

  const resetForm = () => {
    form.reset({
      role: "",
      permissionId: []
    })
    setEditing(null)
  }

  const handleCreate = () => {
    resetForm()
    setOpen(true)
  }

  const handleEdit = (roleData: Roles) => {
    setEditing(roleData)
    const permissionIds = roleData.permissionId?.map(p => p._id) || []
    form.reset({
      role: roleData.role || roleData.name,
      permissionId: permissionIds
    })
    setOpen(true)
  }

  const fetchPermissions = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/admin/permissions/getpermission`)
      setPermissions(response?.data?.data || [])
    } catch (error) {
      console.error('Error fetching permissions:', error)
    }
  }

  const fetchRoles = async () => {
    try {
      setLoading(true)
      let response
      if (searchQuery) {
        response = await axios.post(`${BASE_URL}/api/admin/roles/searchrole/${searchQuery}`)
        setRoles(response?.data?.data || [])
        setPageCount(1)
      } else {
        response = await axios.get(`${BASE_URL}/api/admin/roles/getrole?page=${page}&limit=5`)
        setRoles(response?.data?.data || [])
        setPage(response.data.currentPage || page)
        setPageCount(response.data.pageCount || response.data.totalPages || 1)
      }
    } catch (error) {
      console.error('Error fetching roles:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRoles()
  }, [page, searchQuery])

  useEffect(() => {
    fetchPermissions()
  }, [])

  const onSubmit = async (values: FormValues) => {
    try {
      if (editing) {
        // UPDATE existing role
        await axios.put(`${BASE_URL}/api/admin/roles/updaterole/${editing._id}`, {
          role: values.role,
          permissionId: values.permissionId
        })
        toast.success("Role updated successfully")
      } else {
        // CREATE new role
        await axios.post(`${BASE_URL}/api/admin/roles/createrole`, {
          role: values.role,
          permissionId: values.permissionId
        })
        toast.success("Role created successfully")
      }

      setOpen(false)
      resetForm()
      fetchRoles()
    } catch (error) {
      console.error('Error saving role:', error)
    }
  }

  const deleteRole = async (id: string) => {
    try {
        await axios.delete(`${BASE_URL}/api/admin/roles/deleterole/${id}`)
        toast.success("Role deleted successfully")
        fetchRoles()
    } catch (error) {
      console.error('Error deleting role:', error)
    }
  }

  const columns: ColumnDef<Roles>[] = [
    {
      accessorKey: 'role',
      header: "Role Name",
      cell: ({ row }) => {
        return row.original.role || row.original.name || 'N/A'
      }
    },
    {
      accessorKey: 'permissionId',
      header: "Permissions",
      cell: ({ row }) => {
        const permissions = row.original.permissionId || row.original.permissions || []
        if (!Array.isArray(permissions) || permissions.length === 0) {
          return <Badge variant="secondary">No permissions</Badge>
        }
        return (
          <div className="flex gap-1 flex-wrap">
            {permissions.slice(0, 3).map((item, index) => (
              <Badge key={index} variant="outline" className='text-xs rounded-xs'>
                {item.permission}
              </Badge>
            ))}
            {permissions.length > 3 && (
              <Badge variant="secondary" className='text-xs rounded-xs'>
                +{permissions.length - 3} more
              </Badge>
            )}
          </div>
        )
      }
    },
    {
      header: "Action",
      id: "actions",
      cell: ({ row }) => {
        const item = row.original
        return (
          <div className='flex items-center justify-start gap-1'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleEdit(item)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit role
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => deleteRole(item._id)}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete role
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setPage(1)
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
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Roles</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Manage and track all the roles
              </p>
            </div>
          )}
        </div>
        {loading ? (
          <Skeleton className="h-10 w-32" />
        ) : (
          <Button onClick={handleCreate} className="w-full sm:w-auto">
            Create New Role
          </Button>
        )}
      </div>


      <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
        <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Role" : "Create Role"}</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="role"
                rules={{ required: "Role name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter role name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="permissionId"
                render={({ field }) => {
                  const allSelected = permissions.length > 0 && field.value?.length === permissions.length
                  const someSelected = field.value?.length > 0 && field.value?.length < permissions.length

                  const handleSelectAll = (checked: boolean) => {
                    if (checked) {
                      field.onChange(permissions.map(p => p._id))
                    } else {
                      field.onChange([])
                    }
                  }

                  return (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Permissions</FormLabel>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="select-all"
                            checked={allSelected}
                            ref={(el) => {
                              if (el && 'indeterminate' in el) {
                                (el as HTMLInputElement).indeterminate = someSelected
                              }
                            }}
                            onCheckedChange={handleSelectAll}
                          />
                          <label
                            htmlFor="select-all"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            Select All ({field.value?.length || 0}/{permissions.length})
                          </label>
                        </div>
                      </div>
                      <div className="space-y-2 max-h-48 overflow-y-auto border rounded-md p-3">
                        {permissions.map((permission) => (
                          <div key={permission._id} className="flex items-center space-x-2">
                            <Checkbox
                              id={permission._id}
                              checked={field.value?.includes(permission._id)}
                              onCheckedChange={(checked) => {
                                const updatedValue = checked
                                  ? [...(field.value || []), permission._id]
                                  : (field.value || []).filter(id => id !== permission._id)
                                field.onChange(updatedValue)
                              }}
                            />
                            <div className="flex-1">
                              <label
                                htmlFor={permission._id}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                              >
                                {permission.permission}
                              </label>
                              <p className="text-xs text-muted-foreground">
                                {permission.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      {permissions.length === 0 && (
                        <p className="text-sm text-muted-foreground">No permissions available</p>
                      )}
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />

              <DialogFooter className="gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => { setOpen(false); resetForm(); }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editing ? "Update Role" : "Create Role"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <div className="w-full overflow-x-auto">
        <DataTable
          columns={columns}
          data={roles}
          pageCount={pageCount}
          currentPage={page}
          onPageChange={setPage}
          onSearch={handleSearch}
          isLoading={loading}
        />
      </div>

    </div>
  )
}