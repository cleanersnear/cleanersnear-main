'use client'

import { use } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import EOLHero from './components/EOLHero'
import QuickStats from './components/QuickStats'
import ServiceIntro from './components/ServiceIntro'
import PricingSection from './components/PricingSection'
import MobileWhatsIncluded from './components/MobileWhatsIncluded'
import BeforeAfterGallery from '../../../services/components/BeforeAfterGallery'
import ReviewsSection from './components/ReviewsSection'
import FAQSection from './components/FAQSection'
import RequestCallback from '../../../services/components/RequestCallback'
import FloatingBookNow from '../../../services/components/FloatingBookNow'
import { getLocalBusinessSchema } from './schema'
import Script from 'next/script'

interface PageProps {
  params: Promise<{
    suburb: string;
  }>;
}

export default function EndOfLeaseCleaning({ params }: PageProps) {
  const resolvedParams = use(params)
  const service = {
    id: 'end-of-lease-cleaning',
    title: 'End of Lease Cleaning',
    category: 'popular',
    type: 'end-of-lease-cleaning'
  } as const

  const schema = getLocalBusinessSchema(resolvedParams.suburb)

  return (
    <MainLayout>
      <Script
        id="end-of-lease-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <FloatingBookNow service={service} />
      <div className="mt-32">
        <EOLHero suburb={resolvedParams.suburb} />
        <QuickStats />
        <MobileWhatsIncluded />
        <ServiceIntro service={service} suburb={resolvedParams.suburb} />
        <BeforeAfterGallery serviceSlug="end-of-lease-cleaning" />
        <PricingSection service={service} />
        <ReviewsSection suburb={resolvedParams.suburb} />
        <FAQSection suburb={resolvedParams.suburb} />
        <RequestCallback service={service} />
      </div>
    </MainLayout>
  )
} 