import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

type Role = {
  _id: string
  role: string
}

type User = {
  _id: string
  name: string
  email: string
  profile: string
  roleId?: Role[]
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user")
      if (userData) {
        const parsedData = JSON.parse(userData)
        setUser(parsedData.user)
      }
    } catch (err) {
      console.error("Invalid user in localStorage")
    }
  }, [])

  // ✅ loading state
  if (!user) {
    return <div className="p-6 uppercase">
      <p className="text-red-600 font-bold">Unauthorized</p>
      <span>Guest User</span>
    </div>
  }

  return (
    <div className="flex items-center md:flex-row flex-col justify-start gap-2 p-3">
      <div className="w-full flex justify-start">
        <div className="w-full max-w-auto h-85 border shadow-md rounded-xs p-5 bg-white">

          {/* Header with button */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold">User Profile</h3>

            <Button variant="outline" size="sm">
              <Link to={`/dashboard/users/${user._id}`}>
                Edit User
              </Link>
            </Button>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-6">
            <img
              src={user.profile}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border-5"
            />

            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {user.name}
              </h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 border-t" />

          {/* Details */}
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-sm text-gray-500">User ID</p>
              <p className="font-medium break-all">{user._id}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Roles</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {user.roleId?.length ? (
                  user.roleId.map((role) => (
                    <span
                      key={role._id}
                      className="text-sm font-semibold border px-2 py-1 rounded-xs bg-muted"
                    >
                      {role.role}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-400">
                    No roles assigned
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-start">
        <div className="w-full max-w-auto border h-85 shadow-md rounded-xs p-5 bg-white">
        </div>
      </div>
    </div>
  )
}