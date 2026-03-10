import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturedCollections } from "@/components/featured-collections"
import { ExploreSpaces } from "@/components/explore-spaces"
import { ShowroomCTA } from "@/components/showroom-cta"
import { Inspiration } from "@/components/inspiration"
import { Footer } from "@/components/footer"
import KitchenIslandViewer from "@/components/3d/KitchenIsland"

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <section className="py-16 bg-white w-full">
        <div className="container mx-auto px-4 text-center mb-8">
          <h2 className="text-4xl font-bold tracking-tight mb-4 text-orange-900">Personaliza tu Espacio</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experimenta en 3D con diferentes tipos de mármol para la isla de tu cocina y encuentra el diseño perfecto.
          </p>
        </div>
        <KitchenIslandViewer />
      </section>
      <FeaturedCollections />
      <ExploreSpaces />
      <ShowroomCTA />
      <Inspiration />
      <Footer />
    </main>
  )
}
