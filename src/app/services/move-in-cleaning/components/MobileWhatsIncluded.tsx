'use client'

import { Check } from 'lucide-react'

export default function MobileWhatsIncluded() {
  return (
    <section className="md:hidden py-8 pb-4 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Pricing Cards */}
        <div className="mb-8 space-y-4">
          {/* Moving In Service */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-500 font-medium">Moving In Service</div>
            <div className="flex items-baseline gap-1 mt-1">
              <div className="text-3xl font-bold text-[#1E3D8F]">$48.50</div>
              <div className="text-gray-500">/hour</div>
            </div>
            <div className="text-sm text-gray-500 mt-1">Professional move-in cleaning</div>
          </div>

          {/* Moving Out Service */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-500 font-medium">Moving Out Service</div>
            <div className="flex items-baseline gap-1 mt-1">
              <div className="text-3xl font-bold text-[#1E3D8F]">$63.05</div>
              <div className="text-gray-500">/hour</div>
            </div>
            <div className="text-sm text-gray-500 mt-1">Thorough move-out cleaning</div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#1E3D8F] mb-6 text-center">
          What&apos;s Included in Our Move In/Out Clean
        </h2>
        <div className="space-y-4">
          {[
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
            },
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