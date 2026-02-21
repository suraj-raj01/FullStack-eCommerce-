import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"

type Product = {
    id: string
    title: string
    description: string
    image: string
    more: string
}

// 🔹 Dummy data (replace with API later)
const products: Product[] = [
    {
        id: "1",
        title: "Wireless Headphones",
        description: "Experience premium sound quality with noise cancellation.",
        image: "https://m.media-amazon.com/images/I/71GI0RNH4pL._SX679_.jpg",
        more:"Explore all",
    },
    {
        id: "2",
        title: "Smart Watch",
        description: "Track your fitness and stay connected on the go.",
        image: "https://m.media-amazon.com/images/I/81sju4aJc5L._SL1500_.jpg",
        more:"Explore all",
    },
    {
        id: "3",
        title: "Gaming Mouse",
        description: "High precision mouse designed for pro gamers.",
        image: "https://m.media-amazon.com/images/I/71R0TM3sefL._SL1500_.jpg",
        more:"Explore all",
    },
    {
        id: "4",
        title: "Gaming Mouse",
        description: "High precision mouse designed for pro gamers.",
        image: "https://m.media-amazon.com/images/I/719wIJ+WNRL._SX679_.jpg",
        more:"Explore all",
    },
]

export default function TrandingProducts() {
    return (
        <section className="w-full absolute top-80 py-5">
            <div className="max-w-full mx-auto px-2 md:px-2">

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {products.map((product) => (
                        <Card
                            key={product.id}
                            className="overflow-hidden flex items-start justify-between p-1 rounded-xs hover:shadow-md transition"
                        >
                            {/* Image */}
                            <div className="w-full aspect-3/2 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                                />
                            </div>

                            {/* Content */}
                            <CardContent className="p-1 space-y-1">
                                <h3 className="text-lg font-semibold line-clamp-1">
                                    {product.title}
                                </h3>

                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {product.description}
                                </p>
                                <Link to={`/products/${product.id}`} className="font-semibold text-sm text-blue-400">{product.more}</Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>

            </div>
        </section>
    )
}