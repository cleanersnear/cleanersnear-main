'use client'

import { use } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import DeepCleaningHero from './components/DeepCleaningHero'
import BeforeAfterGallery from '../components/BeforeAfterGallery'
import ServiceIntro from './components/ServiceIntro'
import MobileWhatsIncluded from './components/MobileWhatsIncluded'
import PricingSection from './components/PricingSection'
import FloatingBookNow from '../components/FloatingBookNow'
import ReviewsSection from './components/ReviewsSection'
import FAQSection from './components/FAQSection'
import RequestCallback from '../components/RequestCallback'

interface SpringCleaningPageProps {
  params: Promise<{
    suburb: string;
  }>;
}

export default function SpringCleaningPage({ params }: SpringCleaningPageProps) {
  const { suburb } = use(params)
  
  const service = {
    id: 'spring-cleaning',
    title: 'Spring Cleaning',
    category: 'popular',
    type: 'spring-cleaning'
  } as const

  return (
    <MainLayout>
      <FloatingBookNow service={service} />
      <div className="mt-32">
        <DeepCleaningHero suburb={suburb} />
        <MobileWhatsIncluded />
        <ServiceIntro service={service} />
        <BeforeAfterGallery serviceSlug="spring-cleaning" />
        <PricingSection service={service} />
        <ReviewsSection />
        <FAQSection />
        <RequestCallback service={service} />
      </div>
    </MainLayout>
  )
}
