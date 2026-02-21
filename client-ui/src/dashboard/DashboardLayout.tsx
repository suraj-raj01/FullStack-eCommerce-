import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function DashboardLayout() {

  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user")
      if (userData) {
        setUser(JSON.parse(userData))
      }
    } catch (err) {
      console.error("Invalid user in localStorage")
    }
  }, [])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex px-3 items-center justify-between border-b shadow-xs sticky top-0 backdrop-blur-2xl h-16 shrink-0 gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center justify-start">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />

          </div>
          <div className="flex items-center gap-2">
            <Button size='icon' className="rounded-full" variant='outline'>
              {user ? (
                <img src={user.user.profile} alt="" />
              ) : "G"}
            </Button>
            <Separator
              orientation="vertical"
              className="data-[orientation=vertical]:h-8"
            />
            {user ? (
              <div className="flex flex-col gap-0">
                <span className="font-medium">{user.user?.name}</span>
                <span className="text-xs -mt-1 text-gray-400">{user.user?.email}</span>
              </div>
            ) : (
              <div className="flex flex-col gap-0">
                <span className="font-medium">{"GUEST"}</span>
                <span className="text-xs -mt-1 text-gray-400">{"guest@gmail.com"}</span>
              </div>
            )}
          </div>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
