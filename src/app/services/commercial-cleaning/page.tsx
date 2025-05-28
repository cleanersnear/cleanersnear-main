'use client'

import MainLayout from '@/components/layout/MainLayout'
import CommercialCleaningHero from './components/CommercialCleaningHero'
import BeforeAfterGallery from '../components/BeforeAfterGallery'
import ServiceIntro from './components/ServiceIntro'
import MobileWhatsIncluded from './components/MobileWhatsIncluded'
import PricingSection from './components/PricingSection'
import FloatingBookNow from '../components/FloatingBookNow'
import ReviewsSection from './components/ReviewsSection'
import FAQSection from './components/FAQSection'
import RequestCallback from '../components/RequestCallback'
import ProudCommercialPartners from './components/ProudCommercialPartners'

export default function CommercialCleaning() {
  const service = {
    id: 'commercial-cleaning',
    title: 'Commercial Cleaning',
    category: 'popular',
    type: 'commercial-cleaning'
  } as const

  return (
    <MainLayout>
      <FloatingBookNow service={service} />
      <div className="mt-32">
        <CommercialCleaningHero />
        <MobileWhatsIncluded />
        <ServiceIntro service={service} />
        <ProudCommercialPartners />
        <BeforeAfterGallery serviceSlug="commercial-cleaning" />
        <PricingSection service={service} />
        <ReviewsSection />
        <FAQSection />
        <RequestCallback service={service} />
      </div>
    </MainLayout>
  )
}
