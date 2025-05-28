'use client'

import { Check } from 'lucide-react'
import { useState } from 'react'

export default function MobileWhatsIncluded() {
  const [expandedSections, setExpandedSections] = useState<{ [key: number]: boolean }>({})
  const handleToggle = (index: number) => {
    setExpandedSections((prev) => ({ ...prev, [index]: !prev[index] }))
  }
  const sections = [
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
        "Clean and sanitize workstations"
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
      title: "Kitchen & Break Rooms",
      items: [
        "Degrease and sanitize stovetop and hood",
        "Clean and sanitize countertops and backsplash",
        "Deep clean inside cabinets and drawers",
        "Clean and sanitize sink and fixtures",
        "Detail clean small appliances",
        "Clean and organize pantry shelves",
        "Clean inside refrigerator and microwave"
      ]
    },
    {
      title: "Work Areas & Common Spaces",
      items: [
        "Move and clean under furniture",
        "Deep clean all upholstery and furniture",
        "Detailed cleaning of window treatments",
        "Clean all door frames and tops of doors",
        "Deep clean storage areas and shelving",
        "Sanitize frequently touched surfaces",
        "Deep carpet cleaning and spot treatment",
        "Clean and organize reception areas"
      ]
    },
    {
      title: "Additional Commercial Clean Services",
      items: [
        "Inside oven deep cleaning",
        "Interior refrigerator cleaning",
        "Window washing (interior and exterior)",
        "Deep carpet shampooing",
        "Pressure washing services",
        "Cabinet interior organization",
        "Storage room deep cleaning",
        "Air vent cleaning",
        "Office equipment cleaning"
      ]
    }
  ]
  return (
    <section className="md:hidden py-8 pb-4 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Pricing Cards */}
        <div className="mb-8 space-y-4">
          {/* 4-Hour Once-off Clean */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-500 font-medium">4-Hour Once-off Clean</div>
            <div className="flex items-baseline gap-1 mt-1">
              <div className="text-3xl font-bold text-[#1E3D8F]">$260</div>
              <div className="text-gray-500">/clean</div>
            </div>
            <div className="text-sm text-gray-500 mt-1">$65/hr (min. 3 hrs)</div>
          </div>

          {/* 4-Hour Regular Clean */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-500 font-medium">4-Hour Regular Clean</div>
            <div className="flex items-baseline gap-1 mt-1">
              <div className="text-3xl font-bold text-[#1E3D8F]">$176</div>
              <div className="text-gray-500">/clean</div>
            </div>
            <div className="text-sm text-gray-500 mt-1">from $44/hr</div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#1E3D8F] mb-6 text-center">
          What&apos;s Included in Our Commercial Clean
        </h2>
        <div className="space-y-4">
          {sections.map((section, index) => {
            const expanded = expandedSections[index]
            const itemsToShow = expanded ? section.items : section.items.slice(0, 4)
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-bold text-lg mb-4 text-[#1E3D8F]">{section.title}</h3>
                <ul className="space-y-3">
                  {itemsToShow.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
                {section.items.length > 4 && (
                  <button
                    className="mt-3 text-blue-600 underline text-sm"
                    onClick={() => handleToggle(index)}
                  >
                    {expanded ? 'Read Less' : 'More'}
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
} 