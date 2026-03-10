import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturedCollections } from "@/components/featured-collections"
import { ExploreSpaces } from "@/components/explore-spaces"
import { ShowroomCTA } from "@/components/showroom-cta"
import { Inspiration } from "@/components/inspiration"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <FeaturedCollections />
      <ExploreSpaces />
      <ShowroomCTA />
      <Inspiration />
      <Footer />
    </main>
  )
}
