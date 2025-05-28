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
import { use } from 'react'
import { getLocalBusinessSchema } from './schema'

interface CommercialCleaningPageProps {
  params: Promise<{ suburb: string }>
}

export default function CommercialCleaningPage({ params }: CommercialCleaningPageProps) {
  const { suburb } = use(params)
  const service = {
    id: 'commercial-cleaning',
    title: 'Commercial Cleaning',
    category: 'popular',
    type: 'commercial-cleaning',
    suburb
  } as const

  const schema = getLocalBusinessSchema(suburb)

  return (
    <MainLayout>
      <FloatingBookNow service={service} />
      <div className="mt-32">
        {/* SEO Schema */}
        <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <CommercialCleaningHero suburb={suburb} />
        <MobileWhatsIncluded/>
        <ServiceIntro service={service} suburb={suburb} />
        <ProudCommercialPartners/>
        <BeforeAfterGallery serviceSlug="commercial-cleaning" />
        <PricingSection service={service}/>
        <ReviewsSection suburb={suburb} />
        <FAQSection suburb={suburb} />
        <RequestCallback service={service}/>
      </div>
    </MainLayout>
  )
}
