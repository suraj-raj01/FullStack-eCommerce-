import {
  LayoutDashboardIcon,
  UserCheck,
  BarChart3,
  Layout,
  Image,
  Package,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
// import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useEffect, useState } from "react"

// This is sample data.
const data = {
  user: {
    name: "GUEST",
    email: "guest@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "ADMIN DASHBOARD",
      logo: LayoutDashboardIcon,
      plan: "Enterprise ",
    },
  ],
  navMain: [
    {
      title: "Authentication",
      url: "#",
      icon: UserCheck,
      isActive: true,
      items: [
        { title: "Profile", url: "/dashboard" },
        { title: "Roles", url: "/dashboard/roles" },
        { title: "Permissions", url: "/dashboard/permissions" },
      ],
    },
    {
      title: "Analytics",
      url: "#",
      icon: BarChart3, // ✅ better
      items: [
        { title: "KPI", url: "/dashboard/kpis" },
        { title: "Analytics", url: "/dashboard/analytics" },
      ],
    },
    {
      title: "Navbar",
      url: "#",
      icon: Layout, // ✅ better
      items: [
        { title: "Navbar", url: "/dashboard/navbartable" },
      ],
    },
    {
      title: "Hero",
      url: "#",
      icon: Image, // ✅ better
      items: [
        { title: "Hero", url: "/dashboard/herotable" },
        { title: "Create Hero", url: "/dashboard/hero" },
      ],
    },
    {
      title: "Products",
      url: "#",
      icon: Package, // ✅ better
      items: [
        { title: "Product", url: "/dashboard/productstable" },
        { title: "Categories", url: "/dashboard/categoriestable" },
      ],
    },
    {
      title: "Users",
      url: "#",
      icon: Users, // ✅ better
      items: [
        { title: "Customers", url: "/dashboard/customerstable" },
        { title: "Users", url: "/dashboard/userstable" },
      ],
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user?.user || data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
