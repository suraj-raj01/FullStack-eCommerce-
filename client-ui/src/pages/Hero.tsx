import { Button } from "@/components/ui/button"
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
import TrandingProducts from "./products/TrandingProducts"

type HeroType = {
  _id: string
  title: string
  description: string
  image: string
  button: string
  link: string
}

export default function Hero() {
  const [hero, setHero] = useState<HeroType[]>([])
  const [loading, setLoading] = useState(true)

  const fetchHero = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/heroes`)
      setHero(res.data?.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHero()
  }, [])

  if (loading) return <div className="p-4">Loading hero...</div>
  if (!hero.length) return <div className="p-4">Hero not found</div>

  return (
    <section className="w-full">
      <Carousel opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {hero.map((item) => (
            // ✅ FULL WIDTH ITEM
            <CarouselItem key={item._id} className="basis-full">
              <div className="relative w-full h-130 md:h-135 lg:h-165 overflow-hidden">

                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                  <div className="max-w-full -mt-50 flex flex-col items-center justify-center mx-auto px-6 text-white space-y-4">

                    <h2 className="text-2xl md:text-4xl font-bold">
                      {item.title}
                    </h2>

                    <p className="max-w-xl text-sm md:text-base opacity-90">
                      {item.description}
                    </p>

                    <Button
                      onClick={() => (window.location.href = item.link)}
                      className="mt-2"
                    >
                      {item.button}
                    </Button>

                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <TrandingProducts/>

        <CarouselPrevious  className="absolute top-40 left-2 md:left-10 cursor-pointer"/>
        <CarouselNext className="absolute top-40 right-2 md:right-10 cursor-pointer" />
      </Carousel>
    </section>
  )
}