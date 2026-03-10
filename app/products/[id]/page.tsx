"use client"

import { useState, useEffect, use, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AIVisualization } from "@/components/ai-visualization"
import { ScrollSection } from "@/components/scroll-section"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { products, getProductById, getRelatedProducts, Product } from "@/lib/products"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Download,
  Mail,
  MapPin,
  Maximize2,
  X,
  ArrowUpRight
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [relatedProductsData, setRelatedProductsData] = useState<Product[]>([])
  const [lightboxZoom, setLightboxZoom] = useState(1)
  const [lightboxPanX, setLightboxPanX] = useState(0)
  const [lightboxPanY, setLightboxPanY] = useState(0)
  const [isDraggingLightbox, setIsDraggingLightbox] = useState(false)
  const lightboxContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const foundProduct = getProductById(parseInt(id))
    if (foundProduct) {
      setProduct(foundProduct)
      setRelatedProductsData(getRelatedProducts(foundProduct.relatedProducts))
    }
    setIsVisible(true)
  }, [id])

  if (!product) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="font-serif text-3xl text-foreground mb-4">Product Not Found</h1>
            <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
              Return to Products
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % product.gallery.length)
    setLightboxZoom(1)
    setLightboxPanX(0)
    setLightboxPanY(0)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + product.gallery.length) % product.gallery.length)
    setLightboxZoom(1)
    setLightboxPanX(0)
    setLightboxPanY(0)
  }

  const handleLightboxZoom = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    const newZoom = Math.max(1, Math.min(3, lightboxZoom * delta))
    setLightboxZoom(newZoom)
  }

  const handleLightboxMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (lightboxZoom <= 1) return
    setIsDraggingLightbox(true)
  }

  const handleLightboxMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingLightbox || lightboxZoom <= 1) return

    const movementX = e.movementX
    const movementY = e.movementY

    const maxPanX = (lightboxZoom - 1) * 25
    const maxPanY = (lightboxZoom - 1) * 25

    setLightboxPanX(prev => Math.max(-maxPanX, Math.min(maxPanX, prev + movementX)))
    setLightboxPanY(prev => Math.max(-maxPanY, Math.min(maxPanY, prev + movementY)))
  }

  const handleLightboxMouseUp = () => {
    setIsDraggingLightbox(false)
  }

  const resetLightboxZoom = () => {
    setLightboxZoom(1)
    setLightboxPanX(0)
    setLightboxPanY(0)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <section className="pt-28 lg:pt-32 pb-4">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/products" className="hover:text-foreground transition-colors">Products</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Hero Section */}
      <section className="pb-12 lg:pb-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Thumbnail Gallery - Left Side (Vertical Stack) */}
            <div className={cn(
              "lg:col-span-2 transition-all duration-1000",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            )}>
              <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
                {product.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={cn(
                      "relative aspect-square overflow-hidden rounded-lg transition-all duration-300 flex-shrink-0 lg:flex-shrink",
                      "w-16 h-16 lg:w-20 lg:h-20",
                      selectedImageIndex === index
                        ? "ring-2 ring-foreground ring-offset-2 opacity-100"
                        : "opacity-50 hover:opacity-75"
                    )}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Main Image & Product Info - Right Side */}
            <div className="lg:col-span-10">
              <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                {/* Main Image - Center (2 cols) */}
                <div className={cn(
                  "lg:col-span-2 transition-all duration-1000",
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                )}>
                  {/* Main Image with Hover Zoom */}
                  <div
                    className="relative aspect-[3/4] overflow-hidden rounded-2xl cursor-zoom-in group"
                    onClick={() => setIsLightboxOpen(true)}
                  >
                    <Image
                      src={product.gallery[selectedImageIndex]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500"
                      priority
                    />
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-300" />
                    <button className="absolute top-4 right-4 p-3 bg-background/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background">
                      <Maximize2 className="w-5 h-5 text-foreground" />
                    </button>
                  </div>
                </div>

                {/* Product Info - Right (1 col, sticky) */}
                <div className={cn(
                  "transition-all duration-1000 delay-200",
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                )}>
                  <div className="lg:sticky lg:top-32">
                    <Link
                      href={`/products?collection=${encodeURIComponent(product.collection)}`}
                      className="text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-4 block"
                    >
                      {product.collection}
                    </Link>

                    <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
                      {product.name}
                    </h1>

                    <p className="text-muted-foreground text-base leading-relaxed mb-8">
                      {product.description}
                    </p>

                    {/* Quick Specs */}
                    <div className="space-y-4 mb-8 p-5 bg-secondary rounded-2xl">
                      <div className="flex items-center justify-between py-2">
                        <span className="text-xs tracking-wider uppercase text-muted-foreground">Material</span>
                        <p className="text-foreground font-medium">{product.material}</p>
                      </div>
                      <div className="flex items-center justify-between py-2 border-t border-border/50">
                        <span className="text-xs tracking-wider uppercase text-muted-foreground">Finish</span>
                        <p className="text-foreground font-medium">{product.finish}</p>
                      </div>
                      <div className="flex items-center justify-between py-2 border-t border-border/50">
                        <span className="text-xs tracking-wider uppercase text-muted-foreground">Dimensions</span>
                        <p className="text-foreground font-medium">{product.dimensions}</p>
                      </div>
                      <div className="flex items-center justify-between py-2 border-t border-border/50">
                        <span className="text-xs tracking-wider uppercase text-muted-foreground">Application</span>
                        <p className="text-foreground font-medium">{product.application}</p>
                      </div>
                    </div>

                    {/* Colors */}
                    <div className="mb-8">
                      <span className="text-xs tracking-wider uppercase text-muted-foreground mb-3 block">Available Colors</span>
                      <div className="flex flex-wrap gap-2">
                        {product.colors.map((color) => (
                          <span
                            key={color}
                            className="px-3 py-2 bg-secondary text-foreground text-xs rounded-lg hover:bg-foreground hover:text-background transition-colors duration-300"
                          >
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col gap-3 mb-8">
                      <Link
                        href="/showrooms"
                        className="inline-flex items-center justify-center gap-3 bg-foreground text-background px-6 py-3 rounded-lg text-sm tracking-wider uppercase transition-all duration-300 hover:bg-foreground/90 active:scale-95"
                      >
                        <MapPin className="w-4 h-4" />
                        <span>See in Showroom</span>
                      </Link>
                      <button
                        className="inline-flex items-center justify-center gap-3 border border-border text-foreground px-6 py-3 rounded-lg text-sm tracking-wider uppercase transition-all duration-300 hover:bg-foreground hover:text-background hover:border-foreground active:scale-95"
                      >
                        <Download className="w-4 h-4" />
                        <span>Request Sample</span>
                      </button>
                    </div>

                    {/* Contact */}
                    <a
                      href="mailto:sales@ramstack.com?subject=Product%20Inquiry"
                      className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Contact specialists</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features & Specifications */}
      <section className="py-12 lg:py-20 bg-secondary">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Features */}
            <ScrollSection animation="fade-left">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-8">Features</h2>
              <ul className="space-y-4">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="p-1 bg-foreground rounded-full mt-1">
                      <Check className="w-3 h-3 text-background" />
                    </div>
                    <span className="text-foreground text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </ScrollSection>

            {/* Specifications */}
            <ScrollSection animation="fade-right">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-8">Specifications</h2>
              <div className="space-y-4">
                <div className="flex justify-between py-4 border-b border-border">
                  <span className="text-muted-foreground">Thickness</span>
                  <span className="text-foreground font-medium">{product.specifications.thickness}</span>
                </div>
                <div className="flex justify-between py-4 border-b border-border">
                  <span className="text-muted-foreground">Weight</span>
                  <span className="text-foreground font-medium">{product.specifications.weight}</span>
                </div>
                <div className="flex justify-between py-4 border-b border-border">
                  <span className="text-muted-foreground">Water Absorption</span>
                  <span className="text-foreground font-medium">{product.specifications.waterAbsorption}</span>
                </div>
                <div className="flex justify-between py-4 border-b border-border">
                  <span className="text-muted-foreground">Slip Resistance</span>
                  <span className="text-foreground font-medium">{product.specifications.slipResistance}</span>
                </div>
                <div className="flex justify-between py-4 border-b border-border">
                  <span className="text-muted-foreground">Frost Resistant</span>
                  <span className="text-foreground font-medium">{product.specifications.frostResistant ? "Yes" : "No"}</span>
                </div>
                <div className="flex justify-between py-4 border-b border-border">
                  <span className="text-muted-foreground">Rectified</span>
                  <span className="text-foreground font-medium">{product.specifications.rectified ? "Yes" : "No"}</span>
                </div>
              </div>
            </ScrollSection>
          </div>
        </div>
      </section>

      {/* AI Visualization Tool */}
      {product && (
        <AIVisualization
          productName={product.name}
          productImage={product.gallery[0]}
          productMaterial={product.material}
          productFinish={product.finish}
          productCollection={product.collection}
        />
      )}

      {/* Related Products */}
      {relatedProductsData.length > 0 && (
        <section className="py-12 lg:py-20">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <ScrollSection animation="fade-up">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
                    You May Also Like
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                    Related Products
                  </h2>
                </div>
                <Link
                  href="/products"
                  className="hidden sm:inline-flex items-center gap-2 text-foreground text-sm tracking-wider uppercase hover:gap-4 transition-all duration-300"
                >
                  <span>View All</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProductsData.map((relatedProduct, index) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.id}`}
                    className="group"
                    style={{
                      animation: `slide-up 0.6s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-4 bg-secondary border border-border/0 group-hover:border-border transition-all duration-500">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/25 transition-colors duration-300" />

                      {/* Hover button at bottom */}
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-charcoal to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6">
                        <button className="px-8 py-3 bg-warm-white text-charcoal font-medium tracking-wider uppercase text-sm rounded-lg transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 hover:bg-warm-white/90 active:scale-95">
                          Ver Producto
                        </button>
                      </div>
                    </div>
                    <span className="text-xs tracking-wider text-muted-foreground uppercase block transition-colors duration-300 group-hover:text-foreground">
                      {relatedProduct.collection}
                    </span>
                    <h3 className="font-serif text-xl text-foreground mt-2 group-hover:text-muted-foreground transition-all duration-300 group-hover:translate-y-[-2px]">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 group-hover:text-foreground/70 transition-colors duration-300">
                      {relatedProduct.material} / {relatedProduct.finish}
                    </p>
                  </Link>
                ))}
              </div>
            </ScrollSection>
          </div>
        </section>
      )}

      {/* Lightbox with Zoom & Pan */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center"
          onClick={() => {
            setIsLightboxOpen(false)
            resetLightboxZoom()
          }}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 p-3 bg-warm-white/10 hover:bg-warm-white/20 rounded-full transition-colors z-10"
            onClick={() => {
              setIsLightboxOpen(false)
              resetLightboxZoom()
            }}
          >
            <X className="w-6 h-6 text-warm-white" />
          </button>

          {/* Previous Button */}
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-warm-white/10 hover:bg-warm-white/20 rounded-full transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            <ArrowLeft className="w-6 h-6 text-warm-white" />
          </button>

          {/* Next Button */}
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-warm-white/10 hover:bg-warm-white/20 rounded-full transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            <ArrowRight className="w-6 h-6 text-warm-white" />
          </button>

          {/* Image Container with Zoom & Pan */}
          <div
            ref={lightboxContainerRef}
            className="relative w-[90vw] h-[90vh] overflow-hidden rounded-lg cursor-grab active:cursor-grabbing"
            onClick={(e) => e.stopPropagation()}
            onWheel={handleLightboxZoom}
            onMouseDown={handleLightboxMouseDown}
            onMouseMove={handleLightboxMouseMove}
            onMouseUp={handleLightboxMouseUp}
            onMouseLeave={handleLightboxMouseUp}
          >
            <div
              style={{
                transform: `scale(${lightboxZoom}) translate(${lightboxPanX}px, ${lightboxPanY}px)`,
                transition: isDraggingLightbox ? 'none' : 'transform 0.2s ease-out',
              }}
              className="w-full h-full flex items-center justify-center"
            >
              <Image
                src={product.gallery[selectedImageIndex]}
                alt={product.name}
                fill
                className="object-contain pointer-events-none"
                priority
              />
            </div>

            {/* Zoom Hint */}
            {lightboxZoom === 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-warm-white/60 pointer-events-none">
                Scroll to zoom • Drag to pan
              </div>
            )}

            {/* Zoom Reset Button */}
            {lightboxZoom > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); resetLightboxZoom(); }}
                className="absolute top-6 left-6 px-3 py-2 bg-warm-white/10 hover:bg-warm-white/20 rounded-lg text-xs text-warm-white transition-colors z-10"
              >
                Reset Zoom
              </button>
            )}
          </div>

          {/* Lightbox indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {product.gallery.map((_, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(index); resetLightboxZoom(); }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  selectedImageIndex === index ? "bg-warm-white w-6" : "bg-warm-white/40"
                )}
              />
            ))}
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
