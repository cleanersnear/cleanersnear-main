'use client'

import { useBookingStore } from '../../store/bookingStore'

import { motion } from 'framer-motion'


export default function BookingStepsDesktop() {
  const currentStep = useBookingStore(state => state.currentStep)
 
  return (
    <div className="hidden md:block w-full">
      {/* Progress Bar Container */}
      <div className="h-2 w-full bg-gray-100 overflow-hidden shadow-inner">
        <motion.div
          className="h-full bg-[#1E3D8F]"
          initial={{ width: "0%", opacity: 0 }}
          animate={{
            width: currentStep === 'location' ? "0%" :
                   currentStep === 'service' ? "33%" :
                   currentStep === 'details' ? "66%" :
                   "100%",
            opacity: 1
          }}
          transition={{ 
            duration: 0.5,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  )
} 