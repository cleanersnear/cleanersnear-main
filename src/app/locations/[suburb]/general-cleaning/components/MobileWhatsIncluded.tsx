'use client'

import { Check } from 'lucide-react'

export default function MobileWhatsIncluded() {
  return (
    <section className="md:hidden py-8 pb-4 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Pricing Cards */}
        <div className="mb-8 space-y-4">
          {/* Weekly Clean Price */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-500 font-medium">Weekly Clean</div>
            <div className="flex items-baseline gap-1 mt-1">
              <div className="text-3xl font-bold text-[#1E3D8F]">$76</div>
              <div className="text-gray-500">/clean</div>
            </div>
            <div className="text-sm text-gray-500 mt-1">Best value for regular cleaning</div>
          </div>

          {/* Once-off Clean Price */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-500 font-medium">Once-off Clean</div>
            <div className="flex items-baseline gap-1 mt-1">
              <div className="text-3xl font-bold text-[#1E3D8F]">$90</div>
              <div className="text-gray-500">/clean</div>
            </div>
            <div className="text-sm text-gray-500 mt-1">Perfect for occasional cleaning</div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#1E3D8F] mb-6 text-center">
          What&apos;s Included in Our Service
        </h2>
        <div className="space-y-4">
          {[
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
            },
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
            },
            {
              title: "Additional Services Available",
              items: [
                "Inside cabinet cleaning",
                "Inside oven cleaning",
                "Inside fridge cleaning",
                "Extensive window cleaning",
                "Wall cleaning",
                "Ceiling cleaning",
                "Deep carpet cleaning",
                "Garage cleaning"
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