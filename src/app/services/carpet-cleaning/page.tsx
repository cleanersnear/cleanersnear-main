'use client'

import { Suspense } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import CarpetCleaningHero from './components/CarpetCleaningHero'
import { ServiceBase } from '@/app/quick-book/types/service'
import BeforeAfterGallery from '../components/BeforeAfterGallery'
import FloatingBookNow from '../components/FloatingBookNow'
import RequestCallback from '../components/RequestCallback'
import MobileWhatsIncluded from './components/MobileWhatsIncluded'
import PricingSection from './components/PricingSection'
import ReviewsSection from './components/ReviewsSection'
import FAQSection from './components/FAQSection'
import ServiceIntro from './components/ServiceIntro'

const carpetCleaningService: ServiceBase = {
  id: 'carpet-cleaning',
  title: 'Professional Carpet Cleaning',
  description: 'Expert carpet cleaning services with eco-friendly solutions',
  category: 'popular',
  type: 'carpet-cleaning'
}

export default function CarpetCleaningPage() {
  return (
    <MainLayout>
      <FloatingBookNow service={carpetCleaningService} />
      <div className="mt-32">
        <CarpetCleaningHero />
        <MobileWhatsIncluded />
        <ServiceIntro service={carpetCleaningService} />
        <BeforeAfterGallery serviceSlug="carpet-cleaning" />
        <Suspense fallback={<div>Loading...</div>}>
          <PricingSection service={carpetCleaningService} />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <ReviewsSection />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <FAQSection />
        </Suspense>
        <RequestCallback service={carpetCleaningService} />
      </div>
    </MainLayout>
  )
} 