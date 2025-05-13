'use client'

import { useRouter } from 'next/navigation'
import { BookNowProps } from '../../../services/types'
import { useBookingStore } from '@/app/quick-book/store/bookingStore'

export default function BookNowButton({ service }: BookNowProps) {
  const router = useRouter()
  const setBookingService = useBookingStore(state => state.setService)

  const handleBookNowClick = () => {
    setBookingService(service)
    router.push('/quick-book/location')
  }

  return (
    <button
      onClick={handleBookNowClick}
      className="mx-auto w-full bg-[#1E3D8F] text-white text-center py-3 sm:py-3 rounded-lg hover:bg-opacity-90 transition-all text-base sm:text-base font-normal flex items-center justify-center gap-2"
    >
      Book Now
      
    </button>
  )
} 