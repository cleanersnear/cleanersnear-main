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
      title: "Kitchen",
      items: [
        "Deep clean and degrease all kitchen surfaces",
        "Clean inside and outside of cabinets",
        "Thorough cleaning of countertops and backsplash",
        "Clean and sanitize sink and taps",
        "Clean all appliances exteriors",
        "Wipe down light switches and doorknobs",
        "Sweep and mop floors"
      ]
    },
    {
      title: "Bathrooms",
      items: [
        "Deep clean and sanitize toilet",
        "Clean and descale shower/bathtub",
        "Clean vanity, sink and taps",
        "Clean mirrors and glass surfaces",
        "Wipe down tiles and grout",
        "Sanitize all surfaces",
        "Sweep and mop floors"
      ]
    }
  ]

  const additionalSections = [
    {
      title: "Living Areas & Bedrooms",
      items: [
        "Dust and wipe all surfaces",
        "Clean window sills and tracks",
        "Wipe down light fixtures",
        "Clean door frames and doors",
        "Remove cobwebs",
        "Vacuum carpets thoroughly",
        "Sweep and mop hard floors"
      ]
    },
    {
      title: "Additional Services",
      items: [
        "Inside window cleaning",
        "Skirting boards cleaning",
        "Power points and switches cleaning",
        "Thorough vacuuming all areas",
        "Detailed floor mopping",
        "Air vents dusting"
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
                Professional Move In & Out Cleaning Services in Melbourne
              </h2>
              <p className="text-gray-600 mb-8">
                Start fresh in your new home or leave your old one spotless with our comprehensive move in/out cleaning service. Our experienced team ensures every corner meets the highest standards of cleanliness, whether you&apos;re moving in or moving out. We understand the importance of a thorough clean during transitions and deliver exceptional results every time.
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
              <h3 className="text-2xl font-bold mb-4">Book Your Move In/Out Clean</h3>
              
              {/* Moving In Service */}
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500 font-medium">Moving In Service</div>
                <div className="flex items-baseline gap-1">
                  <div className="text-3xl font-bold text-[#1E3D8F]">$48.50</div>
                  <div className="text-gray-500">/hour</div>
                </div>
                <div className="text-sm text-gray-500 mt-1">Professional move-in cleaning</div>
              </div>

              {/* Moving Out Service */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500 font-medium">Moving Out Service</div>
                <div className="flex items-baseline gap-1">
                  <div className="text-3xl font-bold text-[#1E3D8F]">$63.05</div>
                  <div className="text-gray-500">/hour</div>
                </div>
                <div className="text-sm text-gray-500 mt-1">Thorough move-out cleaning</div>
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