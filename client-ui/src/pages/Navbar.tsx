import axios from "axios"
import { useEffect, useState } from "react"
import { Search, ShoppingCart, Heart, MapPin, Menu } from "lucide-react"
import BASE_URL from "@/Config"

import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { DialogTitle } from "@/components/ui/dialog"
import { Link } from "react-router-dom"
import LanguageDropdown from "./components/LanguageDropdown"

type CategoryType = {
    _id: string
    categories: string
}

type NavbarType = {
    _id: string
    location: string
    signin: string
    logo: string
    url: string
}

export default function Navbar() {
    const [navbar, setNavbar] = useState<NavbarType | null>(null)
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [category, setCategory] = useState<CategoryType[] | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchNavbar = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/admin/navbar`)
            setNavbar(res.data?.data?.[0] || null)
            // console.log(res.data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }
    const fetchCategory = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/admin/category`)
            setCategory(res.data || null)
            // console.log(res.data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchNavbar();
        fetchCategory();
    }, [])

    if (loading) return <div className="p-4">Loading navbar...</div>
    if (!navbar) return <div className="p-4">Navbar not found</div>

    return (
        <nav className="sticky top-0 z-40 w-full border-b bg-background">
            {/* 🔹 Top Row */}
            <div className="max-w-full mx-auto md:px-10 px-3 py-3 flex items-center gap-3">

                {/* Mobile Menu */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu />
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="left" className="p-2 flex items-start justify-start">
                        {/* <p className="font-semibold text-lg">Menu</p> */}
                        <DialogTitle>
                            <img
                                src={navbar.logo}
                                alt="logo"
                                className="h-8 object-contain"
                            />
                        </DialogTitle>
                        <Button variant="ghost" className="w-full justify-start">
                            <Heart size={18} /> Wishlist
                        </Button>

                        <Button variant="ghost" className="w-full justify-start -mt-5">
                            <ShoppingCart size={18} /> Cart
                        </Button>

                        <Button variant="outline" className="w-full">
                            {navbar.signin}
                        </Button>
                    </SheetContent>
                </Sheet>

                {/* Logo */}
                <img
                    src={navbar.logo}
                    alt="logo"
                    className="h-9 object-contain"
                />

                {/* <LanguageDropdown /> */}

                {/* ✅ MOBILE RIGHT ICONS (NEW) */}
                <div className="ml-auto flex md:hidden items-center gap-1">
                    <Button variant="ghost" size="icon">
                        <Heart />
                    </Button>

                    <Button variant="ghost" size="icon" className="relative">
                        <ShoppingCart />
                        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs px-1 rounded-full">
                            0
                        </span>
                    </Button>
                </div>

                {/* Location (desktop only — unchanged) */}
                <div className="hidden px-8 md:flex md:flex-col items-center text-sm text-muted-foreground">
                    <span>{navbar.location}</span>
                    <div className="flex items-center cursor-pointer justify-center gap-2 font-bold">
                        <MapPin size={16} />
                        Use Current Location
                    </div>
                </div>

                {/* Search (desktop only — unchanged) */}
                <div className="flex-1 hidden md:flex">
                    <div className="flex w-full items-center justify-center">
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-fit shadow-none border-r-0">
                                <SelectValue placeholder="All" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {category?.length ? (
                                    category.map((item: CategoryType) => (
                                        <SelectItem key={item._id} value={item.categories}>
                                            {item.categories}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <SelectItem value="loading" disabled>
                                        Loading...
                                    </SelectItem>
                                )}
                            </SelectContent>
                        </Select>

                        <Input
                            type="text"
                            placeholder="Search products..."
                            className="w-full focus-visible:border-none focus-visible:ring-1 px-3 border-l rounded-none py-2 shadow-none outline-none"
                        />

                        <Button className="w-15 px-8">
                            <Search size={20} />
                        </Button>
                    </div>
                </div>

                {/* Right Icons (desktop only — unchanged) */}
                <div className="hidden md:flex items-center gap-3">
                    <LanguageDropdown />
                    <div className="">
                        <Button variant="ghost" size="icon" className="cursor-pointer">
                            <Heart />
                        </Button>

                        <Button variant="ghost" size="icon" className="relative -ml-2 cursor-pointer">
                            <ShoppingCart className="" />
                            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs px-1 rounded-full">
                                0
                            </span>
                        </Button>
                    </div>

                    <Button variant="outline" className="cursor-pointer">
                        <Link to='/auth/login'>{navbar.signin}</Link>
                    </Button>
                </div>
            </div>

            {/* ✅ MOBILE SEARCH BAR (NEW) */}
            <div className="md:hidden px-3 pb-3">
                <div className="flex w-full">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory} defaultValue={selectedCategory}>
                        <SelectTrigger className="w-fit shadow-none border-r-0">
                            <SelectValue placeholder="All" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            {category?.length ? (
                                category.map((item: CategoryType) => (
                                    <SelectItem key={item._id} value={item.categories}>
                                        {item.categories}
                                    </SelectItem>
                                ))
                            ) : (
                                <SelectItem value="loading" disabled>
                                    Loading...
                                </SelectItem>
                            )}
                        </SelectContent>
                    </Select>
                    <Input
                        type="text"
                        placeholder="Search products..."
                        className="border-l border-r-0"
                    />
                    <Button className="rounded-l-none w-12">
                        <Search size={18} />
                    </Button>
                </div>
            </div>
        </nav>
    )
}