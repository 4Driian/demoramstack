"use client"

import { useState } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MapPin, Phone, Clock, Navigation, Mail, ChevronRight, ExternalLink, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const showrooms = [
  {
    id: 1,
    name: "New York",
    city: "New York City",
    address: "123 Design District, SoHo",
    fullAddress: "123 Design District, SoHo, New York, NY 10012",
    phone: "+1 (212) 555-0101",
    email: "nyc@ramstack.com",
    hours: {
      weekday: "Mon-Fri: 10:00 AM - 7:00 PM",
      weekend: "Sat: 10:00 AM - 6:00 PM, Sun: 12:00 PM - 5:00 PM",
    },
    description: "Our flagship showroom in the heart of SoHo, featuring three floors of premium surfaces and an exclusive designer consultation lounge.",
    mapCoords: { lat: 40.7233, lng: -73.9982 },
    features: ["Designer Consultations", "Material Library", "Sample Service"],
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
  },
  {
    id: 2,
    name: "Los Angeles",
    city: "West Hollywood",
    address: "456 Melrose Avenue",
    fullAddress: "456 Melrose Avenue, West Hollywood, CA 90069",
    phone: "+1 (310) 555-0102",
    email: "la@ramstack.com",
    hours: {
      weekday: "Mon-Fri: 10:00 AM - 6:00 PM",
      weekend: "Sat: 10:00 AM - 5:00 PM, Sun: Closed",
    },
    description: "A sun-filled California showroom showcasing our collections in natural light, with dedicated outdoor living displays.",
    mapCoords: { lat: 34.0830, lng: -118.3695 },
    features: ["Outdoor Collections", "Trade Program", "Installation Partners"],
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
  },
  {
    id: 3,
    name: "Miami",
    city: "Design District",
    address: "789 NE 40th Street",
    fullAddress: "789 NE 40th Street, Miami Design District, FL 33137",
    phone: "+1 (305) 555-0103",
    email: "miami@ramstack.com",
    hours: {
      weekday: "Mon-Fri: 10:00 AM - 7:00 PM",
      weekend: "Sat-Sun: 11:00 AM - 6:00 PM",
    },
    description: "Located in the iconic Miami Design District, featuring tropical-inspired collections and waterfront living solutions.",
    mapCoords: { lat: 25.8127, lng: -80.1926 },
    features: ["Waterproof Collections", "Luxury Stone Gallery", "Virtual Tours"],
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
  },
  {
    id: 4,
    name: "Chicago",
    city: "River North",
    address: "321 W Kinzie Street",
    fullAddress: "321 W Kinzie Street, River North, Chicago, IL 60654",
    phone: "+1 (312) 555-0104",
    email: "chicago@ramstack.com",
    hours: {
      weekday: "Mon-Fri: 9:00 AM - 6:00 PM",
      weekend: "Sat: 10:00 AM - 4:00 PM, Sun: Closed",
    },
    description: "An industrial-chic space in River North, showcasing our complete collection in a restored warehouse setting.",
    mapCoords: { lat: 41.8893, lng: -87.6369 },
    features: ["Architect Services", "Commercial Projects", "Warehouse Stock"],
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
  },
  {
    id: 5,
    name: "Dallas",
    city: "Knox-Henderson",
    address: "555 Knox Street",
    fullAddress: "555 Knox Street, Knox-Henderson, Dallas, TX 75205",
    phone: "+1 (214) 555-0105",
    email: "dallas@ramstack.com",
    hours: {
      weekday: "Mon-Fri: 10:00 AM - 6:00 PM",
      weekend: "Sat: 10:00 AM - 5:00 PM, Sun: Closed",
    },
    description: "Our Texas flagship featuring expansive displays and a dedicated commercial projects center for large-scale installations.",
    mapCoords: { lat: 32.8208, lng: -96.7979 },
    features: ["Large Format Displays", "Commercial Center", "Builder Program"],
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
  },
]

export default function ShowroomsPage() {
  const [selectedShowroom, setSelectedShowroom] = useState(showrooms[0])
  const [isAnimating, setIsAnimating] = useState(false)
  const [expandedGallery, setExpandedGallery] = useState(false)

  const handleSelectShowroom = (showroom: typeof showrooms[0]) => {
    if (showroom.id === selectedShowroom.id) return
    
    setIsAnimating(true)
    setTimeout(() => {
      setSelectedShowroom(showroom)
      setIsAnimating(false)
    }, 300)
  }

  const getGoogleMapsEmbedUrl = (showroom: typeof showrooms[0]) => {
    const { lat, lng } = showroom.mapCoords
    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM${lat}%C2%B0!5e0!3m2!1sen!2sus!4v1234567890`
  }

  const getGoogleMapsDirectionsUrl = (showroom: typeof showrooms[0]) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(showroom.fullAddress)}`
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 bg-secondary">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
            Visit Us
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Our Showrooms
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Experience our materials in person. Touch the textures, see the finishes, 
            and let our specialists guide you through our collections.
          </p>
        </div>
      </section>

      {/* Showroom Selector */}
      <section className="py-12 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Showroom Tabs - Left Side */}
            <div className="lg:col-span-4">
              <h2 className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
                Select Location
              </h2>
              <div className="space-y-3">
                {showrooms.map((showroom) => (
                  <button
                    key={showroom.id}
                    onClick={() => handleSelectShowroom(showroom)}
                    className={cn(
                      "w-full text-left p-5 border transition-all duration-300 group rounded-xl overflow-hidden relative",
                      selectedShowroom.id === showroom.id
                        ? "bg-foreground text-background border-foreground shadow-xl scale-105 origin-left"
                        : "bg-transparent text-foreground border-border hover:border-foreground hover:bg-secondary/50"
                    )}
                  >
                    {/* Background accent */}
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-r from-foreground/10 to-transparent opacity-0 transition-opacity duration-300",
                      selectedShowroom.id === showroom.id && "opacity-100"
                    )} />

                    <div className="flex items-center justify-between relative z-10">
                      <div>
                        <h3 className="font-serif text-xl mb-1 transition-all duration-300">{showroom.name}</h3>
                        <p className={cn(
                          "text-sm transition-colors duration-300",
                          selectedShowroom.id === showroom.id
                            ? "text-background/70"
                            : "text-muted-foreground group-hover:text-foreground/80"
                        )}>
                          {showroom.city}
                        </p>
                      </div>
                      <ChevronRight className={cn(
                        "w-5 h-5 transition-all duration-300",
                        selectedShowroom.id === showroom.id ? "translate-x-2" : "group-hover:translate-x-1"
                      )} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Showroom Details - Right Side */}
            <div className="lg:col-span-8">
              <div className={cn(
                "transition-all duration-500 space-y-8",
                isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              )}>
                {/* Map - Primary Visual */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary border border-border/50 group hover:border-border transition-all duration-300">
                  <iframe
                    src={getGoogleMapsEmbedUrl(selectedShowroom)}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${selectedShowroom.name} Showroom Location`}
                    className="absolute inset-0"
                  />
                  <div className="absolute top-6 left-6 bg-background/95 backdrop-blur-md px-6 py-4 rounded-xl shadow-lg border border-border/50">
                    <h3 className="font-serif text-2xl text-foreground">
                      {selectedShowroom.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{selectedShowroom.city}</p>
                  </div>
                </div>

                {/* Showroom Info Card - Better Organized */}
                <div className="bg-gradient-to-br from-secondary via-secondary/50 to-background rounded-2xl p-8 lg:p-10 border border-border/50 hover:border-border transition-all duration-300">
                  <div className="grid md:grid-cols-2 gap-8 mb-10">
                    {/* Left Column - Essential Info */}
                    <div className="space-y-0">
                      {/* Address */}
                      <div className="py-5 border-b border-border/30">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-background/80 rounded-lg mt-1">
                            <MapPin className="w-5 h-5 text-foreground" />
                          </div>
                          <div>
                            <p className="text-xs tracking-widest uppercase font-semibold text-muted-foreground mb-2">Address</p>
                            <p className="text-foreground font-medium leading-relaxed">{selectedShowroom.fullAddress}</p>
                          </div>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="py-5 border-b border-border/30">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-background/80 rounded-lg mt-1">
                            <Phone className="w-5 h-5 text-foreground" />
                          </div>
                          <div>
                            <p className="text-xs tracking-widest uppercase font-semibold text-muted-foreground mb-2">Phone</p>
                            <a
                              href={`tel:${selectedShowroom.phone}`}
                              className="text-foreground font-medium hover:text-muted-foreground transition-colors"
                            >
                              {selectedShowroom.phone}
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="py-5">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-background/80 rounded-lg mt-1">
                            <Mail className="w-5 h-5 text-foreground" />
                          </div>
                          <div>
                            <p className="text-xs tracking-widest uppercase font-semibold text-muted-foreground mb-2">Email</p>
                            <a
                              href={`mailto:${selectedShowroom.email}`}
                              className="text-foreground font-medium hover:text-muted-foreground transition-colors break-all"
                            >
                              {selectedShowroom.email}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Hours & Features */}
                    <div className="space-y-0">
                      {/* Hours */}
                      <div className="py-5 border-b border-border/30">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-background/80 rounded-lg mt-1">
                            <Clock className="w-5 h-5 text-foreground" />
                          </div>
                          <div>
                            <p className="text-xs tracking-widest uppercase font-semibold text-muted-foreground mb-2">Hours</p>
                            <p className="text-foreground font-medium">{selectedShowroom.hours.weekday}</p>
                            <p className="text-muted-foreground text-sm mt-1">{selectedShowroom.hours.weekend}</p>
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="py-5">
                        <p className="text-xs tracking-widest uppercase font-semibold text-muted-foreground mb-4">Services</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedShowroom.features.map((feature) => (
                            <span
                              key={feature}
                              className="px-3 py-2 bg-background/80 text-xs font-medium text-foreground rounded-lg hover:bg-foreground hover:text-background transition-all duration-300"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-base text-muted-foreground leading-relaxed mb-10 pb-8 border-b border-border/30">
                    {selectedShowroom.description}
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={getGoogleMapsDirectionsUrl(selectedShowroom)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 rounded-lg text-sm tracking-wider font-semibold uppercase transition-all duration-300 hover:bg-foreground/90 active:scale-95"
                    >
                      <Navigation className="w-4 h-4" />
                      <span>Get Directions</span>
                    </a>
                    <a
                      href={`mailto:${selectedShowroom.email}?subject=Showroom%20Visit%20Request`}
                      className="inline-flex items-center justify-center gap-2 border-2 border-foreground text-foreground px-6 py-3 rounded-lg text-sm tracking-wider font-semibold uppercase transition-all duration-300 hover:bg-foreground hover:text-background active:scale-95"
                    >
                      <span>Book Appointment</span>
                    </a>
                    <a
                      href={`tel:${selectedShowroom.phone}`}
                      className="inline-flex items-center justify-center gap-2 border-2 border-foreground text-foreground px-6 py-3 rounded-lg text-sm tracking-wider font-semibold uppercase transition-all duration-300 hover:bg-foreground hover:text-background active:scale-95"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call Now</span>
                    </a>
                  </div>
                </div>

                {/* Images of the Place - Expandable Section */}
                <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-background to-secondary/30 overflow-hidden">
                  <button
                    onClick={() => setExpandedGallery(!expandedGallery)}
                    className="w-full px-8 py-6 lg:py-7 flex items-center justify-between hover:bg-secondary/40 transition-all duration-300 group"
                  >
                    <div className="text-left">
                      <h4 className="font-serif text-xl lg:text-2xl text-foreground mb-1">Images of the Place</h4>
                      <p className="text-sm text-muted-foreground">Explore our showroom in detail</p>
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-6 h-6 text-foreground transition-transform duration-300 flex-shrink-0 ml-4",
                        expandedGallery && "rotate-180"
                      )}
                    />
                  </button>

                  {/* Expanded Gallery */}
                  {expandedGallery && (
                    <div className="border-t border-border/30 px-8 py-8">
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((index) => (
                          <div
                            key={index}
                            className="relative aspect-square overflow-hidden rounded-xl bg-secondary border border-border/50 group"
                            style={{
                              animation: `slide-up 0.5s ease-out ${index * 0.05}s both`,
                            }}
                          >
                            <Image
                              src={selectedShowroom.imageUrl}
                              alt={`Showroom view ${index}`}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
