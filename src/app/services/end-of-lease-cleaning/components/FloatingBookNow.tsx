'use client'

import { useState } from 'react'
import { ArrowRight, Phone, X, Calendar } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useBookingStore } from '@/app/quick-book/store/bookingStore'

export default function FloatingBookNow() {
  const [isBookingWidgetOpen, setIsBookingWidgetOpen] = useState(false)
  const [isDesktopWidgetOpen, setIsDesktopWidgetOpen] = useState(false)
  const router = useRouter()
  const { setService } = useBookingStore()

  const handleBookNow = () => {
    setService({
      id: 'end-of-lease-cleaning',
      title: 'End of Lease Cleaning',
      category: 'popular',
      type: 'end-of-lease-cleaning'
    })
    router.push('/quick-book/location')
  }

  return (
    <>
      {/* Floating Book Now Button (Mobile Only) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg z-50 lg:hidden">
        <div className="flex gap-4">
          <Link
            href="tel:0450124086"
            className="flex-1 flex items-center justify-center bg-white text-[#1E3D8F] border-2 border-[#1E3D8F] py-3 rounded-md hover:bg-[#1E3D8F] hover:text-white transition-all"
          >
            <Phone className="w-5 h-5 mr-2" />
            Call Us
          </Link>
          <button
            onClick={() => setIsBookingWidgetOpen(true)}
            className="flex-1 bg-[#FFA500] text-white py-3 rounded-md hover:bg-opacity-90 transition-all flex items-center justify-center"
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            See Pricing
          </button>
        </div>
      </div>

      {/* Floating Booking Widget (Desktop) */}
      <div className="hidden lg:block fixed right-0 bottom-32 z-50">
        <div 
          className={`transition-all duration-300 ease-in-out ${
            isDesktopWidgetOpen ? 'translate-x-0' : 'translate-x-[calc(100%-64px)]'
          }`}
        >
          <div className="flex bg-white rounded-l-lg shadow-xl overflow-hidden">
            {/* Tab */}
            <button
              onClick={() => setIsDesktopWidgetOpen(!isDesktopWidgetOpen)}
              className={`flex-shrink-0 flex flex-col items-center bg-[#FFA500] text-white px-4 py-6 font-semibold hover:bg-opacity-90 transition-all gap-2 ${
                isDesktopWidgetOpen ? 'w-16 border-r border-[#ff8c00]' : 'w-16 hover:bg-[#ff8c00]'
              }`}
            >
              {isDesktopWidgetOpen ? (
                <Calendar className="w-6 h-6" />
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <Calendar className="w-6 h-6 animate-bounce" />
                  <span className="whitespace-nowrap transform -rotate-90 origin-center translate-y-12 text-2xl font-extrabold tracking-wider flex items-center gap-2">
                    Book Now <ArrowRight className="w-6 h-6 animate-pulse" />
                  </span>
                </div>
              )}
            </button>

            {/* Widget Content */}
            <div className="p-6 w-[300px]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Book Your Clean</h3>
                <button
                  onClick={() => setIsDesktopWidgetOpen(false)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-lg hover:bg-gray-100 transition-all"
                >
                  <div className="relative w-4 h-4 transform rotate-45">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-0.5 bg-gray-400 absolute"></div>
                      <div className="w-0.5 h-4 bg-gray-400 absolute"></div>
                    </div>
                  </div>
                </button>
              </div>
              
              

              <div className="space-y-3">
                <button
                  onClick={handleBookNow}
                  className="w-full bg-[#FFA500] text-white text-center py-4 rounded-md hover:bg-opacity-90 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] transition-all duration-200 font-semibold flex items-center justify-center"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Now
                </button>
                <Link
                  href="/get-quote"
                  className="w-full border-2 border-[#1E3D8F] text-[#1E3D8F] text-center py-4 rounded-md hover:bg-[#1E3D8F] hover:text-white transition-all font-semibold flex items-center justify-center"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Booking Widget Modal */}
      {isBookingWidgetOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Book Your Clean</h3>
              <button 
                onClick={() => setIsBookingWidgetOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            

            <div className="space-y-3">
              <button
                onClick={handleBookNow}
                className="w-full bg-[#FFA500] text-white text-center py-4 rounded-md hover:bg-opacity-90 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] transition-all duration-200 font-semibold flex items-center justify-center"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Get Detailed Pricing
              </button>
              <Link
                href="/get-quote"
                className="w-full border-2 border-[#1E3D8F] text-[#1E3D8F] text-center py-4 rounded-md hover:bg-[#1E3D8F] hover:text-white transition-all font-semibold flex items-center justify-center"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 