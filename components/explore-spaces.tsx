"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const spaces = [
  {
    id: 1,
    name: "Bathroom",
    image: "/images/space-bathroom.jpg",
    href: "/products?space=bathroom",
  },
  {
    id: 2,
    name: "Kitchen",
    image: "/images/space-kitchen.jpg",
    href: "/products?space=kitchen",
  },
  {
    id: 3,
    name: "Living Room",
    image: "/images/space-living.jpg",
    href: "/products?space=living",
  },
  {
    id: 4,
    name: "Bedroom",
    image: "/images/space-bedroom.jpg",
    href: "/products?space=bedroom",
  },
  {
    id: 5,
    name: "Outdoor",
    image: "/images/space-outdoor.jpg",
    href: "/products?space=outdoor",
  },
  {
    id: 6,
    name: "Walls",
    image: "/images/space-walls.jpg",
    href: "/products?space=walls",
  },
]

export function ExploreSpaces() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    cardsRef.current.forEach((card, index) => {
      if (card) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index])
              }, index * 150)
            }
          },
          { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
        )
        observer.observe(card)
        observers.push(observer)
      }
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  return (
    <section
      ref={sectionRef}
      id="spaces"
      className="py-20 lg:py-28 bg-secondary"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Header - Description below title */}
        <div className="mb-12 lg:mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3 block">
            Inspiration
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-5">
            Explore by Space
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
            Find the perfect materials for every room. Our collections are
            designed to complement any architectural vision.
          </p>
        </div>

        {/* Spaces Grid - Rounded corners, improved hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {spaces.map((space, index) => (
            <div
              key={space.id}
              ref={(el) => { cardsRef.current[index] = el }}
              className={`group transition-all duration-700 ease-out ${
                visibleCards.includes(index)
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-16 scale-95"
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Link href={space.href} className="block">
                <div className="relative aspect-[2/3] overflow-hidden rounded-2xl">
                  <Image
                    src={space.image}
                    alt={space.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Darkening overlay on hover */}
                  <div className={`absolute inset-0 bg-charcoal/30 transition-opacity duration-500 ${
                    hoveredCard === index ? "opacity-60" : "opacity-0"
                  }`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />

                  {/* Centered Arrow on hover */}
                  <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                    hoveredCard === index ? "opacity-100 scale-100" : "opacity-0 scale-75"
                  }`}>
                    <div className="p-4 bg-warm-white rounded-full shadow-xl">
                      <ArrowUpRight className="w-6 h-6 text-charcoal" />
                    </div>
                  </div>

                  {/* Overlay Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                    <h3 className="font-serif text-2xl lg:text-3xl text-warm-white">
                      {space.name}
                    </h3>
                  </div>

                  {/* Hover Border */}
                  <div className={`absolute inset-0 rounded-2xl border-2 transition-colors duration-300 ${
                    hoveredCard === index ? "border-warm-white/50" : "border-transparent"
                  }`} />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
