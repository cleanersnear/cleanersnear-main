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

interface DeepCleaningPageProps {
  params: Promise<{
    suburb: string;
  }>;
}

export default function DeepCleaningPage({ params }: DeepCleaningPageProps) {
  const { suburb } = use(params)
  
  const service = {
    id: 'deep-cleaning',
    title: 'Deep Cleaning',
    category: 'popular',
    type: 'deep-cleaning'
  } as const

  return (
    <MainLayout>
      <FloatingBookNow service={service} />
      <div className="mt-32">
        <DeepCleaningHero suburb={suburb} />
        <MobileWhatsIncluded />
        <ServiceIntro service={service} />
        <BeforeAfterGallery serviceSlug="deep-cleaning" />
        <PricingSection service={service} />
        <ReviewsSection />
        <FAQSection />
        <RequestCallback service={service} />
      </div>
    </MainLayout>
  )
}
