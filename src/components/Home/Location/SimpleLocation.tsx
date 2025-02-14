'use client'

import { useState } from 'react'
import { MapPin, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import type { Suburb } from '@/app/quick-book/types/location'
import { suburbs } from '@/app/quick-book/components/features/LocationSearch'
import { useBookingStore } from '@/app/quick-book/store/bookingStore'

export default function SimpleLocation() {
  const router = useRouter()
  const { setLocation } = useBookingStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedSuburb, setSelectedSuburb] = useState<Suburb | null>(null)

  // Filter suburbs based on search input
  const filteredSuburbs = suburbs.filter(suburb => 
    suburb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    suburb.postcode.includes(searchQuery)
  ).slice(0, 5) // Limit to 5 suggestions

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setShowSuggestions(true)
    setSelectedSuburb(null)
  }

  const handleSuburbSelect = (suburb: Suburb) => {
    setSelectedSuburb(suburb)
    setSearchQuery(`${suburb.name} ${suburb.postcode}`)
    setShowSuggestions(false)
    
    // Update to match the store type
    setLocation({
      name: suburb.name,
      postcode: suburb.postcode,
      region: suburb.region
    })
  }

  const handleGetStarted = () => {
    if (selectedSuburb) {
      // Store is already updated from handleSuburbSelect
      router.push('/quick-book/service')
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-visible">
      <div className="pt-8 md:pt-8 p-4 md:p-8">
        <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">
          Get Our Service
        </h2>
        <p className="text-sm md:text-base text-gray-500 mb-4 md:mb-6">
          Enter your location to see our available services and pricing
        </p>

        {/* Search Container */}
        <div className="relative flex-1">
          <div className="flex items-center gap-2 border-2 border-gray-200 rounded-xl 
            focus-within:border-[#1E3D8F] transition-all duration-200 bg-white overflow-hidden">
            <div className="flex-1 flex items-center">
              <MapPin className="ml-3 md:ml-4 w-4 md:w-5 h-4 md:h-5 text-[#1E3D8F]" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Enter your suburb"
                className="w-full px-2 md:px-4 py-3 md:py-4 focus:outline-none
                  placeholder:text-gray-400 text-gray-700 text-sm md:text-base"
              />
            </div>
            
            {/* Only show button when suburb is selected */}
            {selectedSuburb && (
              <button
                onClick={handleGetStarted}
                className="px-4 md:px-8 mx-2 py-2 md:py-2.5 flex items-center whitespace-nowrap rounded-md
                  bg-[#FFA500] text-white hover:bg-[#FFA500]/90 
                  transition-all duration-200 text-xs md:text-sm tracking-wide"
              >
                Get Pricing Details
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1.5 md:ml-2" />
              </button>
            )}
          </div>

          {/* Suggestions Dropdown */}
          <AnimatePresence>
            {showSuggestions && searchQuery.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-[100] w-full mt-2 bg-white rounded-xl shadow-2xl 
                  border border-gray-100 overflow-visible"
                style={{
                  maxHeight: '300px',
                  overflowY: 'auto'
                }}
              >
                {filteredSuburbs.length > 0 ? (
                  filteredSuburbs.map((suburb) => (
                    <button
                      key={`${suburb.name}-${suburb.postcode}`}
                      onClick={() => handleSuburbSelect(suburb)}
                      className="w-full px-3 md:px-4 py-2 text-left hover:bg-[#1E3D8F]/5
                        transition-colors flex items-center gap-2 md:gap-3 border-b border-gray-50
                        last:border-0 text-sm md:text-base"
                    >
                      <MapPin className="w-3 h-3 md:w-4 md:h-4 text-[#1E3D8F]" />
                      <div>
                        <span className="font-medium text-gray-900">{suburb.name}</span>
                        <span className="ml-1 md:ml-2 text-xs md:text-sm text-gray-500">{suburb.postcode}</span>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-500 text-center text-sm md:text-base">
                    No locations found
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
} 