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
        "Deep dust all surfaces and corners",
        "Dust and clean ceiling fans and light fixtures",
        "Clean window sills and tracks",
        "Vacuum and clean all vents/registers",
        "Spot clean walls and remove cobwebs",
        "Thorough vacuum of all floors and carpets",
        "Deep clean hard floors with appropriate solutions",
        "Declutter and organize spaces"
      ]
    },
    {
      title: "Bathrooms & Toilets",
      items: [
        "Deep clean and descale shower/bathtub",
        "Thorough grout cleaning and sanitizing",
        "Deep clean and disinfect toilet and surrounding area",
        "Clean and sanitize all bathroom fixtures",
        "Detailed tile cleaning and sanitizing",
        "Deep clean bathroom exhaust fans",
        "Clean and organize bathroom cabinets",
        "Clean and polish all mirrors and glass",
        "Sanitize and deep clean floor"
      ]
    }
  ]

  const additionalSections = [
    {
      title: "Kitchen",
      items: [
        "Degrease and sanitize stovetop and hood",
        "Clean and sanitize countertops and backsplash",
        "Deep clean inside cabinets and drawers",
        "Clean and sanitize sink and fixtures",
        "Detail clean small appliances",
        "Clean and organize pantry shelves",
        "Clean inside oven and refrigerator"
      ]
    },
    {
      title: "Bedrooms & Living Areas",
      items: [
        "Move and clean under furniture",
        "Deep clean all upholstery and furniture",
        "Detailed cleaning of window treatments",
        "Clean all door frames and tops of doors",
        "Deep clean closet floors and shelving",
        "Sanitize frequently touched surfaces",
        "Deep carpet cleaning and spot treatment",
        "Organize and declutter spaces"
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
                Professional Spring & Deep Cleaning Services in Melbourne
              </h2>
              <p className="text-gray-600 mb-8">
                Transform your home with our comprehensive spring and deep cleaning service. We go beyond standard cleaning to tackle built-up dirt, grime, and hidden areas that need special attention. Our professional team uses specialized equipment and techniques to ensure a thorough, 
                detailed clean that revitalizes your living space. Plus, we&apos;ll help you declutter and organize your home for a fresh start.
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
              <h3 className="text-2xl font-bold mb-4">Book Your Spring & Deep Clean</h3>
              
              {/* 4-Hour Spring & Deep Clean */}
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500 font-medium">4-Hour Spring & Deep Clean</div>
                <div className="flex items-baseline gap-1">
                  <div className="text-3xl font-bold text-[#1E3D8F]">$212</div>
                  <div className="text-gray-500">/clean</div>
                </div>
                <div className="text-sm text-gray-500 mt-1">Perfect for apartments and small homes</div>
              </div>

              {/* 6-Hour Spring & Deep Clean */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500 font-medium">6-Hour Spring & Deep Clean</div>
                <div className="flex items-baseline gap-1">
                  <div className="text-3xl font-bold text-[#1E3D8F]">$318</div>
                  <div className="text-gray-500">/clean</div>
                </div>
                <div className="text-sm text-gray-500 mt-1">Ideal for larger homes</div>
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