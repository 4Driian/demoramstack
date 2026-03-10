'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, Loader2, ArrowRight, X, Maximize2, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

type ApplicationType = 'floor' | 'wall' | 'ceiling' | 'accent' | 'custom'

interface AIVisualizationProps {
  productName: string
  productImage: string
  productMaterial: string
  productFinish: string
  productCollection: string
}

export function AIVisualization({
  productName,
  productImage,
  productMaterial,
  productFinish,
  productCollection,
}: AIVisualizationProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [showBeforeAfter, setShowBeforeAfter] = useState(false)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [applicationType, setApplicationType] = useState<ApplicationType>('floor')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const applicationTypes: { value: ApplicationType; label: string }[] = [
    { value: 'floor', label: 'Floor' },
    { value: 'wall', label: 'Wall' },
    { value: 'ceiling', label: 'Ceiling' },
    { value: 'accent', label: 'Accent' },
    { value: 'custom', label: 'Custom' },
  ]

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0])
    }
  }

  const handleFileUpload = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
        setGeneratedImage(null)
        setShowBeforeAfter(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate = async () => {
    if (!uploadedImage) return

    setIsGenerating(true)
    try {
      // TODO: Replace with actual AI API call
      // Example implementation:
      // const response = await fetch('/api/visualize', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     uploadedImage,
      //     productImage,
      //     productName,
      //     productMaterial,
      //     applicationType,
      //   }),
      // })
      // const data = await response.json()
      // setGeneratedImage(data.result)

      // Simulated delay (remove this when integrating real API)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock generated image - replace with actual API response
      setGeneratedImage(uploadedImage)
      setShowBeforeAfter(true)
    } catch (error) {
      console.error('Generation failed:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleReset = () => {
    setUploadedImage(null)
    setGeneratedImage(null)
    setShowBeforeAfter(false)
    setSliderPosition(50)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-background via-background to-secondary/30">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Premium Section Header */}
        <div className="mb-16 lg:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-foreground rounded-full" />
            <span className="text-xs tracking-[0.4em] uppercase font-semibold text-foreground">
              RamView AI
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
            See It In Your Space
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Upload a photo of your environment and visualize exactly how {productName} will transform your space in real-time using our advanced AI technology.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Material & Controls */}
          <div className="space-y-8">
            {/* Material Summary Card */}
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-secondary via-secondary/50 to-background border border-border/50 hover:border-border transition-all duration-300 group">
              {/* Material Image with Gradient Overlay */}
              <div className="relative h-72 overflow-hidden bg-secondary">
                <Image
                  src={productImage}
                  alt={productName}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/20 to-transparent" />
              </div>

              {/* Material Info */}
              <div className="p-8">
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3 font-semibold">
                  {productCollection}
                </p>
                <h3 className="font-serif text-2xl lg:text-3xl text-foreground mb-6">
                  {productName}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-border/30">
                    <span className="text-sm text-muted-foreground font-medium">Material</span>
                    <span className="text-sm text-foreground font-semibold">{productMaterial}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-muted-foreground font-medium">Finish</span>
                    <span className="text-sm text-foreground font-semibold">{productFinish}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Selector */}
            <div className="rounded-2xl bg-background border border-border/50 p-7 backdrop-blur-sm">
              <p className="text-sm font-semibold text-foreground mb-5">Where would you like to apply it?</p>
              <div className="grid grid-cols-2 gap-3">
                {applicationTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setApplicationType(type.value)}
                    className={cn(
                      'py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 tracking-wide',
                      applicationType === type.value
                        ? 'bg-foreground text-background shadow-lg scale-105'
                        : 'bg-secondary text-foreground hover:bg-secondary/80 border border-border/50 hover:border-border'
                    )}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Upload Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                'relative rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-sm',
                isDragging
                  ? 'border-foreground bg-foreground/8'
                  : 'border-border/50 hover:border-border bg-secondary/40 hover:bg-secondary/60'
              )}
            >
              <div className="p-10 lg:p-12 text-center">
                {uploadedImage ? (
                  <div className="space-y-5">
                    <div className="relative w-24 h-24 mx-auto rounded-xl overflow-hidden border border-border shadow-md">
                      <Image
                        src={uploadedImage}
                        alt="Uploaded space"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">Ready to Generate</p>
                      <p className="text-xs text-muted-foreground mb-4">
                        Click to upload a different image
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          fileInputRef.current?.click()
                        }}
                        className="text-xs tracking-widest uppercase text-foreground font-semibold hover:text-muted-foreground transition-colors"
                      >
                        Change Image
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-foreground/10">
                      <Upload className="w-7 h-7 text-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">
                        Upload Your Space
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Drag and drop or click to select an image
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Generate Button */}
            {uploadedImage && (
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className={cn(
                  'w-full py-4 px-6 rounded-xl font-semibold tracking-widest uppercase text-sm transition-all duration-300 flex items-center justify-center gap-3',
                  isGenerating
                    ? 'bg-foreground/40 text-background cursor-not-allowed'
                    : 'bg-foreground text-background hover:bg-foreground/90 active:scale-95 shadow-lg'
                )}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Generating Preview...</span>
                  </>
                ) : (
                  <>
                    <span>Apply on {applicationTypes.find(t => t.value === applicationType)?.label}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>

          {/* Right Column - Preview Area */}
          <div className="flex flex-col items-stretch">
            {!uploadedImage ? (
              // Empty State
              <div className="h-96 md:h-[550px] lg:h-[600px] bg-gradient-to-br from-secondary to-secondary/50 border border-border/30 rounded-2xl flex items-center justify-center overflow-hidden group hover:border-border transition-all duration-300">
                <div className="text-center px-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-foreground/5 mb-6 group-hover:bg-foreground/10 transition-colors duration-300">
                    <Maximize2 className="w-10 h-10 text-foreground/30" />
                  </div>
                  <p className="text-base text-muted-foreground font-medium">
                    Upload an image to preview
                  </p>
                </div>
              </div>
            ) : showBeforeAfter && generatedImage ? (
              // Before/After Preview
              <div className="space-y-5">
                {/* Comparison Slider */}
                <div className="relative h-96 md:h-[550px] lg:h-[600px] bg-secondary border border-border/30 rounded-2xl overflow-hidden group">
                  {/* After Image (Background) */}
                  <div className="absolute inset-0">
                    <Image
                      src={generatedImage}
                      alt="With material"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Before Image (Overlay on left) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${100 - sliderPosition}%` }}
                  >
                    <Image
                      src={uploadedImage}
                      alt="Original"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Slider Handle */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-warm-white cursor-col-resize transition-all"
                    style={{ left: `${100 - sliderPosition}%` }}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      const handleMouseMove = (moveEvent: MouseEvent) => {
                        const container = e.currentTarget?.parentElement
                        if (!container) return
                        const rect = container.getBoundingClientRect()
                        const newPos = ((moveEvent.clientX - rect.left) / rect.width) * 100
                        setSliderPosition(Math.max(0, Math.min(100, newPos)))
                      }

                      const handleMouseUp = () => {
                        document.removeEventListener('mousemove', handleMouseMove)
                        document.removeEventListener('mouseup', handleMouseUp)
                      }

                      document.addEventListener('mousemove', handleMouseMove)
                      document.addEventListener('mouseup', handleMouseUp)
                    }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-warm-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="w-5 h-5 text-charcoal" />
                    </div>
                  </div>

                  {/* Labels */}
                  <div className="absolute bottom-5 left-5 text-xs font-semibold text-warm-white bg-charcoal/70 backdrop-blur-sm px-4 py-2 rounded-full">
                    Original
                  </div>
                  <div className="absolute bottom-5 right-5 text-xs font-semibold text-warm-white bg-charcoal/70 backdrop-blur-sm px-4 py-2 rounded-full">
                    With {productName}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handleReset}
                    className="flex-1 py-3 px-6 rounded-xl border border-border text-foreground font-semibold tracking-wider uppercase text-sm transition-all duration-300 hover:bg-foreground hover:text-background hover:border-foreground active:scale-95"
                  >
                    Try Another
                  </button>
                  <button className="flex-1 py-3 px-6 rounded-xl bg-foreground text-background font-semibold tracking-wider uppercase text-sm transition-all duration-300 hover:bg-foreground/90 active:scale-95">
                    Contact Sales
                  </button>
                </div>
              </div>
            ) : isGenerating ? (
              // Loading State
              <div className="h-96 md:h-[550px] lg:h-[600px] bg-gradient-to-br from-secondary to-secondary/50 border border-border/30 rounded-2xl flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-foreground/10 mb-6">
                    <Loader2 className="w-8 h-8 text-foreground animate-spin" />
                  </div>
                  <p className="text-foreground font-semibold mb-2">Generating Preview</p>
                  <p className="text-sm text-muted-foreground">
                    Our AI is applying {productName} to your space
                  </p>
                </div>
              </div>
            ) : uploadedImage ? (
              // Ready to Generate State
              <div className="h-96 md:h-[550px] lg:h-[600px] bg-gradient-to-br from-secondary to-secondary/50 border border-border/30 rounded-2xl flex items-center justify-center overflow-hidden group hover:border-border transition-all duration-300">
                <div className="text-center px-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-foreground/10 mb-6 group-hover:bg-foreground/15 transition-colors duration-300">
                    <ArrowRight className="w-8 h-8 text-foreground/50" />
                  </div>
                  <p className="text-base text-muted-foreground font-medium">
                    Click generate to preview
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
