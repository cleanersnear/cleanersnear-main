'use client'

import MainLayout from '@/components/layout/MainLayout'
import MoveInCleaningHero from './components/MoveInCleaningHero'
import BeforeAfterGallery from '../components/BeforeAfterGallery'
import ServiceIntro from './components/ServiceIntro'
import MobileWhatsIncluded from './components/MobileWhatsIncluded'
import PricingSection from './components/PricingSection'
import FloatingBookNow from '../components/FloatingBookNow'
import ReviewsSection from './components/ReviewsSection'
import FAQSection from './components/FAQSection'
import RequestCallback from '../components/RequestCallback'

export default function MoveInCleaning() {
  const service = {
    id: 'move-in-cleaning',
    title: 'Move In & Out Cleaning',
    category: 'popular',
    type: 'move-in-cleaning'
  } as const

  return (
    <MainLayout>
      <FloatingBookNow service={service} />
      <div className="mt-32">
        <MoveInCleaningHero />
        <MobileWhatsIncluded />
        <ServiceIntro service={service} />
        <BeforeAfterGallery serviceSlug="move-in-cleaning" />
        <PricingSection service={service} />
        <ReviewsSection />
        <FAQSection />
        <RequestCallback service={service} />
      </div>
    </MainLayout>
  )
}
