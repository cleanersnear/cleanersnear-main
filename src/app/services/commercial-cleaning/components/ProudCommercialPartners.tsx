'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

// Partner logos and industries
const partners = [
  { name: 'Public Transport Victoria', image: '/logos/ptv.png' },
  { name: 'IGA', image: '/logos/igs.jpg' },
  { name: 'Specsavers', image: '/logos/Specsavers-Logo.png' },
  { name: 'Anytime Fitness', image: '/logos/any.png' },
  { name: 'Snap Fitness', image: '/logos/snap.png' },
  { name: '7-Eleven', image: '/logos/7-Eleven-Logo.png' }
]

export default function ProudCommercialPartners() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-slide for mobile
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % partners.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-12 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <span className="text-xs md:text-sm uppercase tracking-wider text-[#1E3D8F] font-semibold">
            PROUD COMMERCIAL PARTNERS
          </span>
        </div>
        <div className="hidden md:block text-center mb-12">
          <h2 className="text-3xl font-bold mt-2">
            Trusted by Local Businesses & Leading Industries
          </h2>
        </div>
        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-6 gap-8 items-center">
          {partners.map((partner) => (
            <div key={partner.name} className="flex justify-center">
              <Image
                src={partner.image}
                alt={partner.name}
                width={120}
                height={60}
                className="object-contain"
              />
            </div>
          ))}
        </div>
        {/* Mobile Slider */}
        <div className="md:hidden relative">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {partners.map((partner) => (
              <div 
                key={partner.name} 
                className="w-full flex-shrink-0 flex justify-center px-4"
              >
                <Image
                  src={partner.image}
                  alt={partner.name}
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
          {/* Slider Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {partners.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index ? 'bg-[#1E3D8F] w-4' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
        {/* Trust Message */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base">
            We are proud to partner with Melbourne&apos;s leading businesses and industry groups. Our commercial cleaning services are trusted by gyms, offices, medical centers, schools, warehouses, and more—reflecting our commitment to quality, reliability, and industry expertise.
          </p>
        </div>
      </div>
    </section>
  )
} 