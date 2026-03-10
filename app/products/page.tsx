"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { products } from "@/lib/products"
import { ArrowUpRight, X, SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

// Filter options
const filterOptions = {
  material: ["Marble", "Porcelain", "Ceramic", "Travertine", "Terracotta", "Brass", "Onyx"],
  finish: ["Polished", "Matte", "Textured", "Honed", "Glossy", "3D Textured", "Natural", "Brushed"],
  application: ["Floor", "Wall", "Bathroom", "Kitchen", "Feature"],
  collection: ["Carrara Elegance", "Modern Essentials", "Oak Heritage", "Artisan Walls", "Natural Stone", "Fixtures", "Artisan Collection", "Industrial", "Classic Kitchen", "Luxury Stone"],
}

function ProductsPageContent() {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState<Record<string, string[]>>({
    material: [],
    finish: [],
    application: [],
    collection: [],
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [visibleProducts, setVisibleProducts] = useState<number[]>([])
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const productRefs = useRef<(HTMLDivElement | null)[]>([])

  // Initialize filters from URL params
  useEffect(() => {
    const collectionParam = searchParams.get("collection")
    const spaceParam = searchParams.get("space")
    
    if (collectionParam) {
      const matchingCollections = filterOptions.collection.filter(c => 
        c.toLowerCase().includes(collectionParam.toLowerCase())
      )
      if (matchingCollections.length > 0) {
        setFilters(prev => ({ ...prev, collection: matchingCollections }))
      }
    }
    
    if (spaceParam) {
      const spaceToApplication: Record<string, string[]> = {
        bathroom: ["Bathroom", "Wall", "Floor"],
        kitchen: ["Kitchen", "Wall"],
        living: ["Floor", "Wall"],
        bedroom: ["Floor"],
        outdoor: ["Floor"],
        walls: ["Wall", "Feature"],
      }
      const apps = spaceToApplication[spaceParam] || []
      if (apps.length > 0) {
        setFilters(prev => ({ ...prev, application: apps }))
      }
    }
  }, [searchParams])

  // Product visibility animation
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    productRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisibleProducts(prev => [...prev, index])
              }, index * 50)
            }
          },
          { threshold: 0.1 }
        )
        observer.observe(ref)
        observers.push(observer)
      }
    })

    return () => observers.forEach(obs => obs.disconnect())
  }, [filters])

  // Toggle filter
  const toggleFilter = (category: string, value: string) => {
    setFilters(prev => {
      const current = prev[category] || []
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter(v => v !== value) }
      }
      return { ...prev, [category]: [...current, value] }
    })
    setVisibleProducts([])
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      material: [],
      finish: [],
      application: [],
      collection: [],
    })
    setVisibleProducts([])
  }

  // Filter products
  const filteredProducts = products.filter(product => {
    const materialMatch = filters.material.length === 0 || filters.material.includes(product.material)
    const finishMatch = filters.finish.length === 0 || filters.finish.includes(product.finish)
    const applicationMatch = filters.application.length === 0 || filters.application.some(a => product.application.includes(a))
    const collectionMatch = filters.collection.length === 0 || filters.collection.includes(product.collection)
    
    return materialMatch && finishMatch && applicationMatch && collectionMatch
  })

  const activeFilterCount = Object.values(filters).flat().length

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-secondary">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
            Our Materials
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Products & Materials
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Explore our curated catalog of premium surfaces, finishes, and fixtures. 
            Each material is selected for its exceptional quality and design potential.
          </p>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-12 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Filter Bar */}
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-border">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 text-sm tracking-wider uppercase text-foreground hover:text-muted-foreground transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 bg-foreground text-background text-xs flex items-center justify-center rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>
            <span className="text-sm text-muted-foreground">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Filter Panel */}
            <div
              className={cn(
                "lg:w-64 shrink-0 transition-all duration-300 overflow-hidden",
                isFilterOpen ? "max-h-[2000px] opacity-100 mb-8 lg:mb-0" : "max-h-0 lg:max-h-none opacity-0 lg:opacity-100"
              )}
            >
              <div className="space-y-8">
                {Object.entries(filterOptions).map(([category, options]) => (
                  <div key={category}>
                    <h3 className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {options.map(option => (
                        <button
                          key={option}
                          onClick={() => toggleFilter(category, option)}
                          className={cn(
                            "px-3 py-1.5 text-sm border transition-all duration-200 rounded-lg",
                            filters[category]?.includes(option)
                              ? "bg-foreground text-background border-foreground"
                              : "bg-transparent text-foreground border-border hover:border-foreground"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg mb-4">No products match your filters.</p>
                  <button
                    onClick={clearFilters}
                    className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                  {filteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      ref={(el) => { productRefs.current[index] = el }}
                      className={cn(
                        "group transition-all duration-700",
                        visibleProducts.includes(index)
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-8"
                      )}
                      onMouseEnter={() => setHoveredProduct(index)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      <Link href={`/products/${product.id}`} className="block">
                        {/* Product Image - Rounded corners */}
                        <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4 rounded-2xl">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          
                          {/* Darkening overlay on hover */}
                          <div className={cn(
                            "absolute inset-0 bg-charcoal/20 transition-opacity duration-300",
                            hoveredProduct === index ? "opacity-100" : "opacity-0"
                          )} />
                          
                          {/* Centered arrow on hover */}
                          <div className={cn(
                            "absolute inset-0 flex items-center justify-center transition-all duration-300",
                            hoveredProduct === index ? "opacity-100 scale-100" : "opacity-0 scale-75"
                          )}>
                            <div className="p-4 bg-warm-white rounded-full shadow-xl">
                              <ArrowUpRight className="w-5 h-5 text-charcoal" />
                            </div>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div>
                          <span className="text-xs tracking-wider text-muted-foreground uppercase">
                            {product.collection}
                          </span>
                          <h3 className="font-serif text-xl text-foreground mt-1 mb-2 group-hover:text-muted-foreground transition-colors">
                            {product.name}
                          </h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                            <span>{product.material}</span>
                            <span>{product.finish}</span>
                            <span>{product.dimensions}</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-background">
        <Header />
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-secondary">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="animate-pulse">
              <div className="h-4 w-24 bg-muted rounded mb-4" />
              <div className="h-12 w-96 bg-muted rounded mb-6" />
              <div className="h-6 w-2/3 bg-muted rounded" />
            </div>
          </div>
        </section>
        <Footer />
      </main>
    }>
      <ProductsPageContent />
    </Suspense>
  )
}
