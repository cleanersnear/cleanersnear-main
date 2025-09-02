'use client'

import Link from 'next/link'
import { ServiceBase } from '@/app/quick-book/types/service'

interface AirbnbBookNowButtonProps {
  service?: ServiceBase
  className?: string
  children?: React.ReactNode
}

export default function AirbnbBookNowButton({ className = '', children }: AirbnbBookNowButtonProps) {
  return (
    <Link
      href="/services/airbnb-cleaning/book"
      className={`mx-auto w-full bg-[#1E3D8F] text-white text-center py-3 sm:py-3 rounded-lg hover:bg-opacity-90 transition-all text-base sm:text-base font-normal flex items-center justify-center gap-2 ${className}`}
    >
      {children || 'Book Now'}
    </Link>
  )
}


