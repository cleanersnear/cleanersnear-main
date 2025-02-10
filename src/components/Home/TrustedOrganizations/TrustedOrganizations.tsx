'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

// Trusted organizations logos
const trustedOrgs = [
    { name: 'Woodards', image: '/logos/woodards.jpeg' },
    { name: 'Ray White', image: '/logos/raywhite.jpeg' },
    { name: 'Raine & Horne', image: '/logos/raineandhorne.jpeg' },
    { name: 'Harcourts', image: '/logos/harcourts.jpeg' },
    { name: 'LJ Hooker', image: '/logos/ljhooker.jpeg' },
    { name: 'YPA', image: '/logos/ypa.jpeg' }
  ]

export default function TrustedOrganizations() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % trustedOrgs.length)
    }, 3000) // Change slide every 3 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-12 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <span className="text-xs md:text-sm uppercase tracking-wider">
            TRUSTED BY OUR LOCAL ORGANIZATIONS
          </span>
        </div>
        
        {/* Section Header - Hidden on Mobile */}
        <div className="hidden md:block text-center mb-12">
          <h2 className="text-3xl font-bold mt-2">
            Working with Melbourne&apos;s Leading<br />
            Real Estate Agencies
          </h2>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-6 gap-8 items-center">
          {trustedOrgs.map((org) => (
            <div key={org.name} className="flex justify-center">
              <Image
                src={org.image}
                alt={org.name}
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
            {trustedOrgs.map((org) => (
              <div 
                key={org.name} 
                className="w-full flex-shrink-0 flex justify-center px-4"
              >
                <Image
                  src={org.image}
                  alt={org.name}
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
          
          {/* Slider Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {trustedOrgs.map((_, index) => (
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

        {/* Trust Message - Shown on both Mobile and Desktop */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base">
            Our partnerships with Melbourne&apos;s top real estate agencies reflect our commitment to quality and reliability. 
            We understand the high standards required in the real estate industry and consistently deliver exceptional cleaning services.
          </p>
        </div>
      </div>
    </section>
  )
} 