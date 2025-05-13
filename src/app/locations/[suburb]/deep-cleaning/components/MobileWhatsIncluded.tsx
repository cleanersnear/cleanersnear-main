'use client'

import { Check } from 'lucide-react'

export default function MobileWhatsIncluded() {
  return (
    <section className="md:hidden py-8 pb-4 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Pricing Cards */}
        <div className="mb-8 space-y-4">
          {/* 4-Hour Deep Clean */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-500 font-medium">4-Hour Deep Clean</div>
            <div className="flex items-baseline gap-1 mt-1">
              <div className="text-3xl font-bold text-[#1E3D8F]">$212</div>
              <div className="text-gray-500">/clean</div>
            </div>
            <div className="text-sm text-gray-500 mt-1">Perfect for apartments and small homes</div>
          </div>

          {/* 6-Hour Deep Clean */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-500 font-medium">6-Hour Deep Clean</div>
            <div className="flex items-baseline gap-1 mt-1">
              <div className="text-3xl font-bold text-[#1E3D8F]">$318</div>
              <div className="text-gray-500">/clean</div>
            </div>
            <div className="text-sm text-gray-500 mt-1">Ideal for larger homes</div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#1E3D8F] mb-6 text-center">
          What&apos;s Included in Our Deep Clean
        </h2>
        <div className="space-y-4">
          {[
            {
              title: "All Areas",
              items: [
                "Deep dust all surfaces and corners",
                "Dust and clean ceiling fans and light fixtures",
                "Clean window sills and tracks",
                "Vacuum and clean all vents/registers",
                "Spot clean walls and remove cobwebs",
                "Thorough vacuum of all floors and carpets",
                "Deep clean hard floors with appropriate solutions"
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
            },
            {
              title: "Kitchen",
              items: [
                "Degrease and sanitize stovetop and hood",
                "Clean and sanitize countertops and backsplash",
                "Deep clean inside cabinets and drawers",
                "Clean and sanitize sink and fixtures",
                "Detail clean small appliances",
                "Clean and organize pantry shelves"
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
                "Deep carpet cleaning and spot treatment"
              ]
            },
            {
              title: "Additional Deep Clean Services",
              items: [
                "Inside oven deep cleaning",
                "Interior refrigerator cleaning",
                "Window washing (interior and exterior)",
                "Deep carpet shampooing",
                "Pressure washing services",
                "Cabinet interior organization",
                "Garage deep cleaning",
                "Air vent cleaning"
              ]
            }
          ].map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-lg mb-4 text-[#1E3D8F]">{section.title}</h3>
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 