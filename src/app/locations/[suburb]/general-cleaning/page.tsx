'use client'

import { use } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import GeneralCleaningHero from './components/GeneralCleaningHero'
import BeforeAfterGallery from '../components/BeforeAfterGallery'
import ServiceIntro from './components/ServiceIntro'
import MobileWhatsIncluded from './components/MobileWhatsIncluded'
import PricingSection from './components/PricingSection'
import FloatingBookNow from '../components/FloatingBookNow'
import ReviewsSection from './components/ReviewsSection'
import FAQSection from './components/FAQSection'
import RequestCallback from '../components/RequestCallback'

interface GeneralCleaningPageProps {
  params: Promise<{
    suburb: string;
  }>;
}

export default function GeneralCleaningPage({ params }: GeneralCleaningPageProps) {
  const { suburb } = use(params)
  
  const service = {
    id: 'general-cleaning',
    title: 'General Cleaning',
    category: 'popular',
    type: 'general-cleaning'
  } as const

  return (
    <MainLayout>
      <FloatingBookNow service={service} />
      <div className="mt-32">
        <GeneralCleaningHero suburb={suburb} />
        <MobileWhatsIncluded />
        <ServiceIntro service={service} />
        <BeforeAfterGallery serviceSlug="general-cleaning" />
        <PricingSection service={service} />
        <ReviewsSection />
        <FAQSection />
        <RequestCallback service={service} />
      </div>
    </MainLayout>
  )
} 