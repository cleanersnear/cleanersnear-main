'use client'

import { Check } from 'lucide-react'
import { ServiceBase } from '@/app/quick-book/types/service'
import BookNowButton from '../../components/BookNowButton'

interface ServiceIntroProps {
  service: ServiceBase
}

export default function ServiceIntro({ service }: ServiceIntroProps) {
  const handleScrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section')
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const includedSections = [
    {
      title: "All Areas",
      items: [
        "Light tidy up and organization",
        "Empty bins",
        "Dust and wipe skirting boards",
        "Clean accessible light switches",
        "Dust all reachable surfaces",
        "Clean mirrors and glasses",
        "Vacuum all accessible floors",
        "Mop all hard floors",
        "Laundry room surfaces"
      ]
    },
    {
      title: "Bathrooms & Toilets",
      items: [
        "Scrub and clean shower/bath",
        "Clean and sanitize sinks",
        "Wipe down benches",
        "Clean mirrors",
        "Clean and polish tapware",
        "Clean cupboards (exterior)",
        "Clean and disinfect toilet",
        "Clean shower glass/screen",
        "Vacuum and mop floors"
      ]
    }
  ]

  const additionalSections = [
    {
      title: "Kitchen",
      items: [
        "Clean stovetop thoroughly",
        "Clean rangehood exterior",
        "Wipe all benchtops",
        "Clean visible appliances (general household)",
        "Clean and polish sink",
        "Clean microwave inside and out",
        "Clean cupboards (exterior)"
      ]
    },
    {
      title: "Bedrooms & Living Areas",
      items: [
        "Dust and wipe all surfaces",
        "Vacuum carpets and rugs",
        "Clean mirrors and windows",
        "Vacuum accessible areas under furniture",
        "Make beds / general organizing (if requested)",
        "Empty bins"
      ]
    }
  ]

  return (
    <section className="md:py-12 hidden md:block">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Content Area */}
          <div className="lg:col-span-2 hidden md:block">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-[#1E3D8F] mb-6">
                Professional House Cleaning Services in Melbourne
              </h2>
              <p className="text-gray-600 mb-8">
                Experience reliable and thorough home cleaning with our professional service. Our standard clean includes a comprehensive range of tasks to keep your home fresh and clean. Additional services can be added based on your specific needs.
              </p>

              {/* Service Features */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {includedSections.map((section) => (
                  <div key={section.title} className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-bold text-xl mb-4">{section.title}</h3>
                    <ul className="space-y-3">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-start">
                          <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {additionalSections.map((section) => (
                  <div key={section.title} className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-bold text-xl mb-4">{section.title}</h3>
                    <ul className="space-y-3">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-start">
                          <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 hidden md:block">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-32">
              <h3 className="text-2xl font-bold mb-4">Book Your Clean</h3>
              
              {/* Weekly Clean Price */}
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500 font-medium">Weekly Clean</div>
                <div className="flex items-baseline gap-1">
                  <div className="text-3xl font-bold text-[#1E3D8F]">$76</div>
                  <div className="text-gray-500">/clean</div>
                </div>
                <div className="text-sm text-gray-500 mt-1">Best value for regular cleaning</div>
              </div>

              {/* Once-off Clean Price */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500 font-medium">Once-off Clean</div>
                <div className="flex items-baseline gap-1">
                  <div className="text-3xl font-bold text-[#1E3D8F]">$90</div>
                  <div className="text-gray-500">/clean</div>
                </div>
                <div className="text-sm text-gray-500 mt-1">Perfect for occasional cleaning</div>
              </div>

              <div className="mb-4">
                <BookNowButton service={service} />
              </div>
              <button
                onClick={handleScrollToPricing}
                className="block w-full border-2 border-[#1E3D8F] text-[#1E3D8F] text-center py-3 rounded-md hover:bg-[#1E3D8F] hover:text-white transition-all"
              >
                See Detailed Pricing
              </button>

              {/* Operating Hours */}
              <div className="mt-8">
                <h4 className="font-bold mb-4">Operating Hours</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>8am – 8pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>9am - 7pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>9am - 8pm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 