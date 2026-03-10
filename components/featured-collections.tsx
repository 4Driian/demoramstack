"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

const collections = [
  {
    id: 1,
    name: "Carrara Elegance",
    description:
      "Timeless marble surfaces with distinctive veining patterns, bringing Italian luxury to contemporary spaces.",
    image: "/images/collection-marble.jpg",
    href: "/products?collection=carrara",
  },
  {
    id: 2,
    name: "Ceramic Studio",
    description:
      "Artisanal ceramic tiles with matte finishes and organic textures, perfect for creating warm, tactile environments.",
    image: "/images/collection-ceramic.jpg",
    href: "/products?collection=ceramic",
  },
  {
    id: 3,
    name: "Oak Heritage",
    description:
      "Wood-look porcelain tiles that capture the warmth and grain of natural oak with superior durability.",
    image: "/images/collection-wood.jpg",
    href: "/products?collection=wood",
  },
]

export function FeaturedCollections() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % collections.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + collections.length) % collections.length)
  }, [])

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

  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(nextSlide, 3000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isHovered, nextSlide])

  return (
    <section
      ref={sectionRef}
      id="collections"
      className="py-20 lg:py-28 bg-background"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div
          className={`mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3 block">
            Our Collections
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-5">
            Featured Materials
          </h2>
          <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
            Explore our carefully curated collections, each designed to bring
            character and sophistication to your spaces.
          </p>
        </div>

        {/* Carousel with centered arrows */}
        <div
          className={`relative transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Arrow - Centered vertically, appears on hover */}
          <button
            onClick={prevSlide}
            className={`absolute left-0 lg:-left-6 top-1/2 -translate-y-1/2 z-20 p-4 bg-background/90 backdrop-blur-sm border border-border text-foreground transition-all duration-300 hover:bg-foreground hover:text-background rounded-full shadow-lg ${
              isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            }`}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow - Centered vertically, appears on hover */}
          <button
            onClick={nextSlide}
            className={`absolute right-0 lg:-right-6 top-1/2 -translate-y-1/2 z-20 p-4 bg-background/90 backdrop-blur-sm border border-border text-foreground transition-all duration-300 hover:bg-foreground hover:text-background rounded-full shadow-lg ${
              isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {collections.map((collection) => (
                <div
                  key={collection.id}
                  className="w-full flex-shrink-0"
                >
                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Image */}
                    <div className="relative aspect-[5/4] lg:aspect-[4/4] overflow-hidden rounded-2xl group">
                      <Image
                        src={collection.image}
                        alt={collection.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-charcoal/0 transition-colors duration-500" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center py-6">
                      <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
                        Collection {String(collection.id).padStart(2, "0")}
                      </span>
                      <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
                        {collection.name}
                      </h3>
                      <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
                        {collection.description}
                      </p>
                      <Link
                        href={collection.href}
                        className="group inline-flex items-center gap-3 text-foreground text-sm tracking-wider uppercase transition-all duration-300 hover:gap-5"
                      >
                        <span>Explore Collection</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-10">
            {collections.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-12 bg-foreground"
                    : "w-6 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
