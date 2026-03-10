export interface Product {
  id: number
  name: string
  collection: string
  material: string
  finish: string
  dimensions: string
  application: string
  image: string
  description: string
  features: string[]
  specifications: {
    thickness: string
    weight: string
    waterAbsorption: string
    slipResistance: string
    frostResistant: boolean
    rectified: boolean
  }
  colors: string[]
  relatedProducts: number[]
  gallery: string[]
}

export const products: Product[] = [
  {
    id: 1,
    name: "Carrara Bianco",
    collection: "Carrara Elegance",
    material: "Marble",
    finish: "Polished",
    dimensions: "60x120 cm",
    application: "Floor, Wall",
    image: "/images/product-1.jpg",
    description: "Experience the timeless beauty of Italian Carrara marble. This exquisite surface features distinctive grey veining on a pristine white background, bringing understated luxury to any space. Each piece is unique, ensuring your installation is truly one-of-a-kind.",
    features: [
      "Natural Italian marble",
      "Unique veining patterns",
      "High polish finish",
      "Suitable for underfloor heating",
      "Indoor use recommended"
    ],
    specifications: {
      thickness: "10mm",
      weight: "26 kg/m²",
      waterAbsorption: "<0.1%",
      slipResistance: "R9",
      frostResistant: false,
      rectified: true
    },
    colors: ["White", "Grey"],
    relatedProducts: [5, 10, 11],
    gallery: ["/images/product-1.jpg", "/images/product-detail-1.jpg", "/images/product-detail-3.jpg", "/images/collection-marble.jpg"]
  },
  {
    id: 2,
    name: "Nero Assoluto",
    collection: "Modern Essentials",
    material: "Porcelain",
    finish: "Matte",
    dimensions: "80x80 cm",
    application: "Floor",
    image: "/images/product-2.jpg",
    description: "A bold statement in contemporary design. Nero Assoluto porcelain tiles deliver pure, uncompromising black with a sophisticated matte finish. The large format creates seamless expanses of deep color, perfect for dramatic modern interiors.",
    features: [
      "Ultra-resistant porcelain",
      "Anti-slip matte finish",
      "Minimal grout lines",
      "Easy maintenance",
      "Commercial grade durability"
    ],
    specifications: {
      thickness: "9mm",
      weight: "20 kg/m²",
      waterAbsorption: "<0.05%",
      slipResistance: "R10",
      frostResistant: true,
      rectified: true
    },
    colors: ["Black"],
    relatedProducts: [8, 11, 3],
    gallery: ["/images/product-2.jpg", "/images/product-detail-4.jpg", "/images/space-living.jpg", "/images/product-detail-2.jpg"]
  },
  {
    id: 3,
    name: "Oak Natural",
    collection: "Oak Heritage",
    material: "Porcelain",
    finish: "Textured",
    dimensions: "20x120 cm",
    application: "Floor",
    image: "/images/product-3.jpg",
    description: "Capture the warmth of natural oak with the durability of porcelain. Our Oak Natural planks feature realistic wood grain textures and warm honey tones, creating inviting spaces that withstand the demands of modern living.",
    features: [
      "Authentic wood grain texture",
      "Warm natural tones",
      "Scratch resistant surface",
      "Waterproof",
      "Easy click installation"
    ],
    specifications: {
      thickness: "10mm",
      weight: "22 kg/m²",
      waterAbsorption: "<0.05%",
      slipResistance: "R10",
      frostResistant: true,
      rectified: true
    },
    colors: ["Honey Oak", "Natural Oak"],
    relatedProducts: [12, 2, 8],
    gallery: ["/images/product-3.jpg", "/images/collection-wood.jpg", "/images/space-bedroom.jpg", "/images/product-detail-4.jpg"]
  },
  {
    id: 4,
    name: "Geometric Wave",
    collection: "Artisan Walls",
    material: "Ceramic",
    finish: "3D Textured",
    dimensions: "30x60 cm",
    application: "Wall",
    image: "/images/product-4.jpg",
    description: "Transform walls into sculptural works of art. Geometric Wave features undulating 3D patterns that play with light and shadow, creating dynamic surfaces that captivate and inspire. Perfect for feature walls and statement spaces.",
    features: [
      "Three-dimensional surface",
      "Hand-crafted appearance",
      "Light-reactive design",
      "Statement piece quality",
      "Easy wall installation"
    ],
    specifications: {
      thickness: "12mm",
      weight: "18 kg/m²",
      waterAbsorption: "3%",
      slipResistance: "N/A",
      frostResistant: false,
      rectified: false
    },
    colors: ["Warm Beige", "Cream"],
    relatedProducts: [9, 11, 5],
    gallery: ["/images/product-4.jpg", "/images/space-walls.jpg", "/images/product-detail-3.jpg", "/images/inspiration-4.jpg"]
  },
  {
    id: 5,
    name: "Travertine Classico",
    collection: "Natural Stone",
    material: "Travertine",
    finish: "Honed",
    dimensions: "60x60 cm",
    application: "Floor, Wall",
    image: "/images/product-5.jpg",
    description: "Classic Mediterranean beauty meets modern sophistication. Our honed travertine showcases the natural variations and warm cream tones that have graced the finest buildings for millennia, now available for contemporary interiors.",
    features: [
      "Natural travertine stone",
      "Filled and honed finish",
      "Classic cream tones",
      "Timeless appeal",
      "Interior and exterior use"
    ],
    specifications: {
      thickness: "12mm",
      weight: "30 kg/m²",
      waterAbsorption: "1-2%",
      slipResistance: "R10",
      frostResistant: true,
      rectified: false
    },
    colors: ["Cream", "Ivory", "Walnut"],
    relatedProducts: [1, 10, 7],
    gallery: ["/images/product-5.jpg", "/images/product-detail-1.jpg", "/images/space-bathroom.jpg", "/images/inspiration-2.jpg"]
  },
  {
    id: 6,
    name: "Brass Luxe Faucet",
    collection: "Fixtures",
    material: "Brass",
    finish: "Brushed",
    dimensions: "Standard",
    application: "Bathroom, Kitchen",
    image: "/images/product-6.jpg",
    description: "Elevate your space with the warm glow of brushed brass. Our Luxe Faucet combines timeless elegance with modern functionality, featuring smooth single-lever operation and a durable PVD finish that resists tarnishing and fingerprints.",
    features: [
      "Solid brass construction",
      "PVD brushed finish",
      "Single-lever ceramic cartridge",
      "Water-saving aerator",
      "5-year warranty"
    ],
    specifications: {
      thickness: "N/A",
      weight: "1.8 kg",
      waterAbsorption: "N/A",
      slipResistance: "N/A",
      frostResistant: false,
      rectified: false
    },
    colors: ["Brushed Brass", "Polished Brass"],
    relatedProducts: [1, 5, 9],
    gallery: ["/images/product-6.jpg", "/images/inspiration-1.jpg", "/images/inspiration-3.jpg", "/images/space-bathroom.jpg"]
  },
  {
    id: 7,
    name: "Terracotta Hex",
    collection: "Artisan Collection",
    material: "Terracotta",
    finish: "Natural",
    dimensions: "20x23 cm",
    application: "Floor",
    image: "/images/product-7.jpg",
    description: "Embrace the artisanal charm of handcrafted terracotta. Each hexagonal tile carries the character of traditional craftsmanship, with subtle variations in color and texture that create floors with warmth, depth, and authentic Mediterranean character.",
    features: [
      "Handcrafted terracotta",
      "Natural color variations",
      "Hexagonal format",
      "Sealed for protection",
      "Ages beautifully over time"
    ],
    specifications: {
      thickness: "15mm",
      weight: "35 kg/m²",
      waterAbsorption: "8-12%",
      slipResistance: "R11",
      frostResistant: false,
      rectified: false
    },
    colors: ["Terracotta", "Earth", "Rust"],
    relatedProducts: [5, 9, 3],
    gallery: ["/images/product-7.jpg", "/images/inspiration-4.jpg", "/images/space-kitchen.jpg", "/images/product-detail-2.jpg"]
  },
  {
    id: 8,
    name: "Concrete Grey",
    collection: "Industrial",
    material: "Porcelain",
    finish: "Matte",
    dimensions: "90x90 cm",
    application: "Floor, Wall",
    image: "/images/product-8.jpg",
    description: "Channel the raw beauty of industrial architecture. Concrete Grey captures the essence of cast concrete with its subtle tonal variations and authentic surface texture, delivering urban sophistication in an ultra-durable porcelain format.",
    features: [
      "Authentic concrete look",
      "Extra-large format",
      "Through-body color",
      "Minimal maintenance",
      "Commercial grade"
    ],
    specifications: {
      thickness: "10mm",
      weight: "23 kg/m²",
      waterAbsorption: "<0.05%",
      slipResistance: "R10",
      frostResistant: true,
      rectified: true
    },
    colors: ["Light Grey", "Medium Grey", "Anthracite"],
    relatedProducts: [2, 11, 3],
    gallery: ["/images/product-8.jpg", "/images/space-living.jpg", "/images/product-detail-4.jpg", "/images/inspiration-6.jpg"]
  },
  {
    id: 9,
    name: "Sage Subway",
    collection: "Classic Kitchen",
    material: "Ceramic",
    finish: "Glossy",
    dimensions: "7.5x15 cm",
    application: "Wall",
    image: "/images/product-9.jpg",
    description: "A fresh take on the timeless subway tile. Our Sage Subway brings sophisticated color to classic form, with a glossy glaze that catches light beautifully. Perfect for kitchen backsplashes and bathroom walls that need a touch of nature.",
    features: [
      "Hand-glazed finish",
      "Subtle color depth",
      "Easy to clean",
      "Classic brick lay pattern",
      "Coordinates with neutrals"
    ],
    specifications: {
      thickness: "8mm",
      weight: "15 kg/m²",
      waterAbsorption: "10%",
      slipResistance: "N/A",
      frostResistant: false,
      rectified: false
    },
    colors: ["Sage Green", "White", "Sky Blue"],
    relatedProducts: [6, 4, 7],
    gallery: ["/images/product-9.jpg", "/images/space-kitchen.jpg", "/images/product-detail-2.jpg", "/images/inspiration-6.jpg"]
  },
  {
    id: 10,
    name: "Onyx Honey",
    collection: "Luxury Stone",
    material: "Onyx",
    finish: "Polished",
    dimensions: "120x260 cm",
    application: "Wall, Feature",
    image: "/images/product-10.jpg",
    description: "The crown jewel of natural stone. Our Onyx Honey slabs reveal nature's artistry with dramatic veining and warm, translucent tones. When backlit, these exceptional pieces become luminous focal points of unparalleled beauty.",
    features: [
      "Natural onyx stone",
      "Bookmatched slabs available",
      "Suitable for backlighting",
      "Statement piece quality",
      "Each piece is unique"
    ],
    specifications: {
      thickness: "20mm",
      weight: "55 kg/m²",
      waterAbsorption: "<0.1%",
      slipResistance: "R9",
      frostResistant: false,
      rectified: false
    },
    colors: ["Honey", "Amber", "Gold"],
    relatedProducts: [1, 5, 4],
    gallery: ["/images/product-10.jpg", "/images/inspiration-2.jpg", "/images/space-walls.jpg", "/images/product-detail-3.jpg"]
  },
  {
    id: 11,
    name: "Pure White",
    collection: "Modern Essentials",
    material: "Porcelain",
    finish: "Matte",
    dimensions: "60x120 cm",
    application: "Wall",
    image: "/images/product-11.jpg",
    description: "Simplicity perfected. Pure White delivers the clean, minimal aesthetic essential to modern design. The matte finish eliminates glare while the large format creates serene, uninterrupted surfaces that serve as the perfect backdrop.",
    features: [
      "Ultra-clean white",
      "No visible texture",
      "Anti-glare matte surface",
      "Large format elegance",
      "Versatile neutral base"
    ],
    specifications: {
      thickness: "8mm",
      weight: "18 kg/m²",
      waterAbsorption: "<0.05%",
      slipResistance: "N/A",
      frostResistant: true,
      rectified: true
    },
    colors: ["Pure White", "Warm White"],
    relatedProducts: [2, 8, 1],
    gallery: ["/images/product-11.jpg", "/images/space-bathroom.jpg", "/images/product-detail-1.jpg", "/images/inspiration-5.jpg"]
  },
  {
    id: 12,
    name: "Walnut Herringbone",
    collection: "Oak Heritage",
    material: "Porcelain",
    finish: "Textured",
    dimensions: "10x60 cm",
    application: "Floor",
    image: "/images/product-12.jpg",
    description: "Classic pattern, modern performance. Our Walnut Herringbone tiles feature rich, warm tones and authentic wood texture designed specifically for the timeless chevron pattern. Create stunning geometric floors that last a lifetime.",
    features: [
      "Perfect for herringbone pattern",
      "Rich walnut tones",
      "Authentic grain texture",
      "Precision-cut for pattern work",
      "Durable porcelain surface"
    ],
    specifications: {
      thickness: "10mm",
      weight: "22 kg/m²",
      waterAbsorption: "<0.05%",
      slipResistance: "R10",
      frostResistant: true,
      rectified: true
    },
    colors: ["Walnut", "Dark Oak"],
    relatedProducts: [3, 8, 2],
    gallery: ["/images/product-12.jpg", "/images/collection-wood.jpg", "/images/space-living.jpg", "/images/product-detail-4.jpg"]
  },
]

export function getProductById(id: number): Product | undefined {
  return products.find(p => p.id === id)
}

export function getRelatedProducts(ids: number[]): Product[] {
  return products.filter(p => ids.includes(p.id))
}
