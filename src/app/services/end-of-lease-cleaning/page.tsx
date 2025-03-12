import MainLayout from '@/components/layout/MainLayout'
import EOLHero from './components/EOLHero'
import QuickStats from './components/QuickStats'
import ServiceIntro from './components/ServiceIntro'
import PricingSection from './components/PricingSection'
import MobileWhatsIncluded from './components/MobileWhatsIncluded'
import BeforeAfterGallery from './components/BeforeAfterGallery'
import ReviewsSection from './components/ReviewsSection'
import FAQSection from './components/FAQSection'
import RequestCallback from './components/RequestCallback'
import FloatingBookNow from './components/FloatingBookNow'
import { metadata } from './metadata'
import { getLocalBusinessSchema } from './schema'
import Script from 'next/script'

export { metadata }

const service = {
  id: 'end-of-lease-cleaning',
  title: 'End of Lease Cleaning',
  category: 'popular',
  type: 'end-of-lease-cleaning'
} as const

export default function EndOfLeaseCleaning() {
  return (
    <MainLayout>
      <Script id="local-business-schema" type="application/ld+json">
        {JSON.stringify(getLocalBusinessSchema())}
      </Script>
      <FloatingBookNow />
      <div className="mt-32">
        <section id="hero">
          <EOLHero />
        </section>
        <section id="quick-stats">
          <QuickStats />
        </section>
        <section id="whats-included">
          <MobileWhatsIncluded />
        </section>
        <section id="service-intro">
          <ServiceIntro service={service} />
        </section>
        <section id="gallery">
          <BeforeAfterGallery />
        </section>
        <section id="pricing">
          <PricingSection service={service} />
        </section>
        <section id="reviews">
          <ReviewsSection />
        </section>
        <section id="faq">
          <FAQSection />
        </section>
        <section id="contact">
          <RequestCallback />
        </section>
      </div>
    </MainLayout>
  )
} 