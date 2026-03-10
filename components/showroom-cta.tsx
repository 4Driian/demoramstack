"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin, Calendar, Phone } from "lucide-react"

export function ShowroomCTA() {
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
    <section ref={sectionRef} className="relative py-24 lg:py-0 bg-primary overflow-hidden">
      {/* Full-width immersive layout */}
      <div className="grid lg:grid-cols-2 min-h-[700px]">
        {/* Image Side - Full bleed */}
        <div
          className={`relative lg:h-auto h-[400px] transition-all duration-1000 ${
            isVisible
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        >
          <Image
            src="/images/showroom.jpg"
            alt="Ramstack Showroom"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-primary/30 lg:block hidden" />
        </div>

        {/* Content Side - Premium immersive feel */}
        <div
          className={`relative bg-primary text-primary-foreground p-10 lg:p-20 flex flex-col justify-center transition-all duration-1000 delay-200 ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-10"
          }`}
        >
          {/* Decorative element */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary-foreground/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary-foreground/5 rounded-full translate-x-1/3 translate-y-1/3" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-primary-foreground/10 rounded-full">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xs tracking-[0.3em] uppercase text-primary-foreground/70">
                Experience In Person
              </span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight">
              Visit Our
              <br />
              <span className="italic">Showrooms</span>
            </h2>

            <p className="text-primary-foreground/80 text-lg lg:text-xl leading-relaxed mb-12 max-w-lg">
              Experience our materials firsthand. Touch the textures, see the
              finishes under natural light, and let our design specialists guide you
              through our premium collections.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary-foreground/60" />
                <span className="text-primary-foreground/80 text-sm">Private Consultations</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-foreground/60" />
                <span className="text-primary-foreground/80 text-sm">Expert Advice</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/showrooms"
                className="group inline-flex items-center justify-center gap-3 bg-primary-foreground text-primary px-8 py-4 rounded-lg text-sm tracking-wider uppercase transition-all duration-300 hover:bg-primary-foreground/90"
              >
                <span>Find a Showroom</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/showrooms#contact"
                className="group inline-flex items-center justify-center gap-3 border border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-lg text-sm tracking-wider uppercase transition-all duration-300 hover:bg-primary-foreground/10"
              >
                <span>Book Appointment</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
