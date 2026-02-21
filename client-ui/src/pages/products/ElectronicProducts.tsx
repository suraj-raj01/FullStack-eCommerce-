import { Card } from "@/components/ui/card"
import BASE_URL from "@/Config"
import axios from "axios"
import { useEffect, useState } from "react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

type Product = {
    id: string
    title: string
    description: string
    defaultImage: string
    more: string
}

export default function ElectronicProducts() {
    const [products, setProducts] = useState<Product[]>([])

    const loadProducts = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/admin/products`)
            setProducts(res.data.data || [])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadProducts()
    }, [])

    if (!products.length) return null

    return (
        <section className="w-full py-6 md:mt-12">
            <div className="max-w-full mx-auto px-2">
                <h2 className="font-bold text-xl md:text-2xl py-5">
                    Electronics Products
                </h2>

                <Carousel opts={{ loop: true }} className="w-full">
                    <CarouselContent>
                        {products.map((product) => (
                            <CarouselItem
                                key={product.id}
                                className="
                  basis-1/2
                  sm:basis-1/3
                  md:basis-1/4
                  lg:basis-1/5
                "
                            >
                                <Card className="overflow-hidden p-0 hover:shadow-md transition">
                                    <div className="w-full aspect-4/3 overflow-hidden">
                                        <img
                                            src={product.defaultImage}
                                            alt={product.title}
                                            className="w-full h-full object-cover hover:scale-105 transition duration-500"
                                        />
                                    </div>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* arrows */}
                    <CarouselPrevious className="absolute rounded-xs h-20 w-10 left-2 md:left-2 cursor-pointer" />
                    <CarouselNext className="absolute rounded-xs h-20 w-10 right-2 md:right-2 cursor-pointer" />
                </Carousel>
            </div>
        </section>
    )
}