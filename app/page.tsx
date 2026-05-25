import HeroSection from '@/components/home/HeroSection'
import PropertyGrid from '@/components/property/PropertyGrid'
import AgentsSection from '@/components/home/AgentsSection'
import NewsletterSection from '@/components/home/NewsletterSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PropertyGrid />
      <AgentsSection />
      <NewsletterSection />
    </main>
  )
}
