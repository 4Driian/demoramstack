"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const heroImages = [
  "/images/hero-interior.jpg",
  "/images/space-bathroom.jpg",
  "/images/space-kitchen.jpg",
  "/images/space-living.jpg",
]

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLElement>(null)

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        if (rect.bottom > 0) {
          setScrollY(window.scrollY)
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Auto-change images every 5 seconds
  useEffect(() => {
    setIsVisible(true)
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const parallaxOffset = scrollY * 0.4
  const scaleValue = 1 + scrollY * 0.0003
  const opacityValue = Math.max(0, 1 - scrollY * 0.001)

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Images with transitions */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${parallaxOffset}px) scale(${scaleValue})`,
          willChange: "transform",
        }}
      >
        {heroImages.map((image, index) => (
          <div
            key={image}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{
              opacity: index === currentImageIndex ? 1 : 0,
            }}
          >
            <Image
              src={image}
              alt={`Luxury interior with premium surfaces ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-charcoal/60" />
      </div>

      {/* Content */}
      <div 
        className="relative h-full flex flex-col justify-end pb-20 lg:pb-32 max-w-[1400px] mx-auto px-6 lg:px-12"
        style={{ opacity: opacityValue }}
      >
        <div className="max-w-3xl">
          <h1
            className={`font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-warm-white leading-[1.1] mb-6 transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <span className="block text-pretty">Surfaces that</span>
            <span className="block italic">define spaces</span>
          </h1>

          <p
            className={`text-warm-white/80 text-lg md:text-xl max-w-xl mb-10 leading-relaxed transition-all duration-1000 delay-200 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Discover our curated collection of premium tiles, finishes, and
            architectural materials designed for spaces that inspire.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-400 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <Link
              href="/products"
              className="group inline-flex items-center justify-center gap-3 bg-warm-white text-charcoal px-8 py-4 rounded-lg text-sm tracking-wider uppercase transition-all duration-300 hover:bg-warm-white/90"
            >
              <span>Explore Materials</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/showrooms"
              className="group inline-flex items-center justify-center gap-3 border border-warm-white/50 text-warm-white px-8 py-4 rounded-lg text-sm tracking-wider uppercase transition-all duration-300 hover:bg-warm-white/10"
            >
              <span>Visit Showroom</span>
            </Link>
          </div>
        </div>

        {/* Image Indicators */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 transition-all duration-1000 delay-700 ease-out ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === currentImageIndex
                  ? "w-8 bg-warm-white"
                  : "w-3 bg-warm-white/40 hover:bg-warm-white/60"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
