'use client'

import MainLayout from '@/components/layout/MainLayout'
import Hero from './components/Hero'
import { ServicesSection } from './components/ServicesSection'
import { Testimonials } from './components/Testimonials'
import { WhatsIncluded } from './components/WhatsIncluded'
import { Subscription } from './components/Subscription'
import FAQs from './components/FAQs'
import HomeLatestBlogs from '@/components/Home/HomeBlogs/HomeLatestBlogs'
import TrustedOrganizations from './components/TrustedOrganizations'

export default function ServicesPage() {
  return (
    <MainLayout>
      <div className="mt-24 bg-white">
        <Hero />
        {/* SEO JSON-LD for WebPage, ItemList (services) and FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'Cleaning Services Melbourne',
              url: 'https://www.cleaningprofessionals.com.au/services',
              description:
                'Regular house cleaning, deep/spring cleans, end of lease bond cleans, NDIS and commercial office cleaning in Melbourne.',
              mainEntity: {
                '@type': 'ItemList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Regular Cleaning', url: 'https://www.cleaningprofessionals.com.au/services/regular-cleaning' },
                  { '@type': 'ListItem', position: 2, name: 'Once-Off Cleaning', url: 'https://www.cleaningprofessionals.com.au/services/once-off-cleaning' },
                  { '@type': 'ListItem', position: 3, name: 'NDIS Cleaning', url: 'https://www.cleaningprofessionals.com.au/services/ndis-cleaning' },
                  { '@type': 'ListItem', position: 4, name: 'End of Lease Cleaning', url: 'https://www.cleaningprofessionals.com.au/services/end-of-lease-cleaning' },
                  { '@type': 'ListItem', position: 5, name: 'Commercial Cleaning', url: 'https://www.cleaningprofessionals.com.au/services/commercial-cleaning' },
                ],
              },
              faq: {
                '@type': 'FAQPage',
                mainEntity: [
                  { '@type': 'Question', name: 'How long does a standard clean take?', acceptedAnswer: { '@type': 'Answer', text: 'Most regular cleans take 2–4 hours depending on home size and selected tasks.' } },
                  { '@type': 'Question', name: 'Do you bring your own supplies?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Our cleaners bring professional products and equipment.' } },
                  { '@type': 'Question', name: 'Can I reschedule?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, please give 24 hours’ notice to avoid fees.' } },
                ],
              },
            }),
          }}
        />
        <ServicesSection />
        <Testimonials />
        <WhatsIncluded />
        <TrustedOrganizations />
         <FAQs />
        <HomeLatestBlogs />
        <Subscription />
       
      </div>
    </MainLayout>
  )
}


