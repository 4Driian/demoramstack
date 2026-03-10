"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Instagram } from "lucide-react"

const inspirationImages = [
  { id: 1, src: "/images/inspiration-1.jpg", alt: "Premium faucet detail" },
  { id: 2, src: "/images/inspiration-2.jpg", alt: "Marble texture" },
  { id: 3, src: "/images/inspiration-3.jpg", alt: "Modern vanity" },
  { id: 4, src: "/images/inspiration-4.jpg", alt: "Ceramic tiles" },
  { id: 5, src: "/images/inspiration-5.jpg", alt: "Luxury shower" },
  { id: 6, src: "/images/inspiration-6.jpg", alt: "Kitchen detail" },
]

export function Inspiration() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-24 bg-secondary">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Instagram className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
              @ramstack
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">
            Follow Our Inspiration
          </h2>
        </div>

        {/* Image Grid */}
        <div
          className={`grid grid-cols-3 md:grid-cols-6 gap-2 lg:gap-4 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {inspirationImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative aspect-square overflow-hidden cursor-pointer rounded-xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="w-6 h-6 text-warm-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
