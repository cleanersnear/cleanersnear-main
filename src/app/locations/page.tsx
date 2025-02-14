'use client'

import { MELBOURNE_REGIONS } from '@/utils/location/regions'
import Link from 'next/link'
import Header from '@/components/layout/Header'

export default function LocationsDirectory() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Cleaning Services Coverage Areas in Melbourne
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find professional cleaning services in your area. We cover all major suburbs across Melbourne&apos;s metropolitan region.
          </p>
        </header>

        {Object.entries(MELBOURNE_REGIONS).map(([key, region]) => (
          <section key={key} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#1E3D8F]">
              {region.name}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {region.councils.map((council) => (
                <div 
                  key={council.name}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-4">{council.name}</h3>
                  <ul className="space-y-2">
                    {council.key_suburbs.map((suburb) => (
                      <li key={suburb}>
                        <Link 
                          href={`/locations/${suburb.toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-gray-600 hover:text-[#FFA500] flex items-center"
                        >
                          <svg 
                            className="w-4 h-4 mr-2" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                            />
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                            />
                          </svg>
                          {suburb}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Quick Contact Section */}
        <div className="mt-16 bg-[#1E3D8F] text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Can&apos;t find your suburb?
          </h2>
          <p className="mb-6">
            Don&apos;t worry! We might still service your area. Contact us to confirm coverage.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-[#1E3D8F] px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="tel:0450124086"
              className="bg-[#FFA500] text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Call Now
            </Link>
          </div>
        </div>
      </div>
    </>
  )
} 