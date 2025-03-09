'use client'

import { Check } from 'lucide-react'

export default function MobileWhatsIncluded() {
  return (
    <section className="md:hidden py-8 pb-4 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-[#1E3D8F] mb-6 text-center">
          What&apos;s Included in Our Service
        </h2>
        <div className="space-y-4">
          {[
            {
              title: "Living Areas & Bedrooms",
              items: [
                "Remove cobwebs from walls and ceilings",
                "Clean all skirting boards and window sills",
                "Wipe doors and door frames",
                "Clean switches and power points",
                "Vacuum and mop all floors"
              ]
            },
            {
              title: "Kitchen",
              items: [
                "Deep clean stovetop and rangehood",
                "Clean and sanitize all benchtops",
                "Clean and polish sink area",
                "Clean inside/outside microwave",
                "Deep clean oven (inside and out)"
              ]
            },
            {
              title: "Bathrooms and Toilets",
              items: [
                "Deep clean shower and screens",
                "Clean and sanitize vanity area",
                "Thorough toilet cleaning",
                "Wall tiles and grout (conditions apply)",
                "Clean exhaust fans"
              ]
            },
            {
              title: "Our Guarantee",
              items: [
                "100% Bond Back Guarantee",
                "Real Estate Approved Service",
                "Professional Equipment Used",
                "Experienced Cleaning Team",
                "Public Liability Insured"
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