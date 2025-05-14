import { Suspense } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import NDISCleaningHero from './components/NDISCleaningHero'
import BeforeAfterGallery from '../components/BeforeAfterGallery'
import ServiceIntro from './components/ServiceIntro'
import MobileWhatsIncluded from './components/MobileWhatsIncluded'
import PricingSection from './components/PricingSection'
import FloatingBookNow from '../components/FloatingBookNow'
import ReviewsSection from './components/ReviewsSection'
import FAQSection from './components/FAQSection'
import RequestCallback from '../components/RequestCallback'
import { ServiceBase } from '@/app/quick-book/types/service'
import { schema } from './schema'

const ndisCleaningService: ServiceBase = {
  id: 'ndis-cleaning',
  title: 'NDIS House Cleaning',
  description: 'Professional NDIS registered cleaning service with qualified support workers',
  category: 'popular',
  type: 'ndis-cleaning'
}

export default function NDISCleaningPage() {
  return (
    <MainLayout>
      <FloatingBookNow service={ndisCleaningService} />
      <div className="mt-32">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        
        <NDISCleaningHero />
        <MobileWhatsIncluded />
        <ServiceIntro service={ndisCleaningService} />
        <BeforeAfterGallery serviceSlug="ndis-cleaning" />

        <Suspense fallback={<div>Loading...</div>}>
          <PricingSection service={ndisCleaningService} />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <ReviewsSection />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <FAQSection />
        </Suspense>

        <RequestCallback service={ndisCleaningService} />
      </div>
    </MainLayout>
  )
} 