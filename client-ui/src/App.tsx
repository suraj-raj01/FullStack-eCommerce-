import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Suspense, lazy } from "react"
// Auth (lazy)
const Login = lazy(() => import("./auth/Login"))
const LoginLayout = lazy(() => import("./auth/LoginLayout"))
const Auth = lazy(() => import("./auth/Auth"))
const Register = lazy(() => import("./auth/Register").then(m => ({ default: m.Register })))
const ForgetPassword = lazy(() => import("./auth/ForgetPassword").then(m => ({ default: m.ForgetPassword })))
const ResetPassword = lazy(() => import("./auth/ResetPassword").then(m => ({ default: m.ResetPassword })))

// Layouts
const DashboardLayout = lazy(() => import("./dashboard/DashboardLayout"))
const Dashboard = lazy(() => import("./dashboard/Dashboard"))
const Home = lazy(() => import("./pages/Home"))
const Layout = lazy(() => import("./Layout"))

// Users
const UserForm = lazy(() => import("./dashboard/users/users/UserForm"))
const CustomerTable = lazy(() => import("./dashboard/users/customers/CustomerTable"))
const UserTable = lazy(() => import("./dashboard/users/users/UsersTable"))
const UsersView = lazy(() => import("./dashboard/users/users/UsersView"))

// Products
const ProductInsert = lazy(() => import("./dashboard/products/ProductForm"))
const ProductsTable = lazy(() => import("./dashboard/products/ProductsTable"))
const ProductView = lazy(() => import("./dashboard/products/ProductView"))

// Categories
const CategoryForm = lazy(() => import("./dashboard/categories/CategoriesForm"))
const CategoryTable = lazy(() => import("./dashboard/categories/CategoriesTable"))
const CategoriesView = lazy(() => import("./dashboard/categories/CategoriesView"))

// Hero
const HeroForm = lazy(() => import("./dashboard/hero/HeroForm"))
const HeroTable = lazy(() => import("./dashboard/hero/HeroTable"))
const HeroView = lazy(() => import("./dashboard/hero/HeroView"))

// Navbar
const NavbarForm = lazy(() => import("./dashboard/navbar/NavbarForm"))
const NavbarTable = lazy(() => import("./dashboard/navbar/NavbarTable"))
const NavbarView = lazy(() => import("./dashboard/navbar/NavbarView"))

// Auth management
const RoleTable = lazy(() => import("./dashboard/authentication/roles/RoleTable"))
const PermissionTable = lazy(() => import("./dashboard/authentication/permissions/PermissionTable"))

// Analytics
const Analytics = lazy(() => import("./dashboard/analytics/Analytics"))
const KPI = lazy(() => import("./dashboard/analytics/KPI"))

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        }
      >
        <Routes>
          {/* Public */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
          </Route>


          {/* Authentication */}
          <Route path="/auth" element={<LoginLayout />}>
            <Route index element={<Auth />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Register />} />
            <Route path="forgetpassword" element={<ForgetPassword />} />
            <Route path="resetpassword" element={<ResetPassword />} />
          </Route>

          {/* Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout/>}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Dashboard />} />
            <Route path="roles" element={<RoleTable />} />
            <Route path="permissions" element={<PermissionTable />} />

            <Route path="analytics" element={<Analytics />} />
            <Route path="kpis" element={<KPI />} />

            <Route path="products" element={<ProductInsert />} />
            <Route path="products/:id" element={<ProductInsert />} />
            <Route path="products/:id/view" element={<ProductView />} />
            <Route path="productstable" element={<ProductsTable />} />

            <Route path="categories" element={<CategoryForm />} />
            <Route path="categories/:id" element={<CategoryForm />} />
            <Route path="categories/:id/view" element={<CategoriesView />} />
            <Route path="categoriestable" element={<CategoryTable />} />

            <Route path="hero" element={<HeroForm />} />
            <Route path="hero/:id" element={<HeroForm />} />
            <Route path="hero/:id/view" element={<HeroView />} />
            <Route path="herotable" element={<HeroTable />} />

            <Route path="navbar" element={<NavbarForm />} />
            <Route path="navbar/:id" element={<NavbarForm />} />
            <Route path="navbar/:id/view" element={<NavbarView />} />
            <Route path="navbartable" element={<NavbarTable />} />

            <Route path="users" element={<UserForm />} />
            <Route path="users/:id" element={<UserForm />} />
            <Route path="users/:id/view" element={<UsersView />} />
            <Route path="userstable" element={<UserTable />} />
            <Route path="customerstable" element={<CustomerTable />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}