'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, ArrowLeft,  ChevronUp, ChevronDown } from 'lucide-react'
import { useBookingStore } from '../../store/bookingStore'
import { usePathname } from 'next/navigation'

export default function BookingHeader() {
  // Add state to control summary visibility
  const toggleBookingSummary = useBookingStore((state) => state.toggleBookingSummary)
  const isVisible = useBookingStore((state) => state.isBookingSummaryVisible)
  const pathname = usePathname()

  // Show toggle only on service page
  const showToggle = pathname === '/quick-book/service'

  return (
    <header className="fixed top-0 left-0 right-0 h-24 bg-white border-b border-gray-200 z-40">
      <div className="flex items-center justify-between h-full px-6">
        {/* Logo and Back Button Section */}
        <div className="flex items-center gap-8">
          <Link 
            href="/" 
            className="hidden md:flex items-center h-10 text-[#1E3D8F] 
              group relative overflow-hidden
              hover:px-4 transition-all duration-300 ease-out
              bg-[#1E3D8F]/5 rounded-full hover:rounded-xl"
          >
            <div className="flex items-center gap-2 px-2.5">
              <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="font-medium whitespace-nowrap w-0 group-hover:w-32 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                Return to Home
              </span>
            </div>
          </Link>
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.webp"
              alt="Cleaning Professionals"
              width={160}
              height={80}
              priority
              className="object-contain"
            />
          </Link>
        </div>

        {/* Desktop Contact Section */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1E3D8F]/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-[#1E3D8F]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Call us at</p>
                <a 
                  href="tel:0450124086" 
                  className="text-[#1E3D8F] hover:text-[#1E3D8F]/80 font-semibold transition-colors"
                >
                  0450 124 086
                </a>
              </div>
            </div>
            <div className="h-8 border-l border-gray-300"></div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1E3D8F]/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#1E3D8F]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email us at</p>
                <a 
                  href="mailto:account@cleaningprofessionals.com.au"
                  className="text-[#1E3D8F] hover:text-[#1E3D8F]/80 font-semibold transition-colors"
                >
                  account@cleaningprofessionals.com.au
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Toggle Button - Only show on service page */}
        {showToggle && (
          <button 
            onClick={toggleBookingSummary}
            className="lg:hidden flex items-center gap-3 px-5 py-2.5 rounded-lg 
              bg-white border border-[#1E3D8F]/10
              hover:bg-[#1E3D8F]/5 hover:border-[#1E3D8F]/20
              shadow-sm hover:shadow
              transition-all duration-300 ease-in-out group"
            aria-label={isVisible ? 'Hide Booking Summary' : 'Show Booking Summary'}
          >
            <span className="text-sm font-medium text-[#1E3D8F] transition-colors">
              {isVisible ? 'Hide Summary' : 'View Summary'}
            </span>
            <div className="relative w-5 h-5 flex items-center justify-center">
              <ChevronUp 
                className={`w-4 h-4 text-[#1E3D8F] absolute
                  transition-all duration-300 ease-in-out
                  transform ${isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-2'}`} 
              />
              <ChevronDown 
                className={`w-4 h-4 text-[#1E3D8F] absolute
                  transition-all duration-300 ease-in-out
                  transform ${!isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 -translate-y-2'}`} 
              />
            </div>
          </button>
        )}
      </div>
    </header>
  )
} 