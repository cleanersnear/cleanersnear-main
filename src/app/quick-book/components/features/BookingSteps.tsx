'use client'

import { useBookingStore } from '../../store/bookingStore'
import { MapPin, Package, User, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useBookingProgress } from '../../store/bookingStore'

const steps = [
  {
    id: 'location',
    title: 'Location',
    icon: MapPin,
    description: 'Choose your suburb'
  },
  {
    id: 'service',
    title: 'Service',
    icon: Package,
    description: 'Select & customize'
  },
  {
    id: 'details',
    title: 'Details',
    icon: User,
    description: 'Contact information'
  },
  {
    id: 'confirmation',
    title: 'Confirmation',
    icon: CheckCircle,
    description: 'Review & confirm'
  }
]

export default function BookingSteps() {
  const currentStep = useBookingStore(state => state.currentStep)
  const { isLocationSelected, isServiceSelected } = useBookingProgress()

  const getStepStatus = (stepId: string) => {
    switch (stepId) {
      case 'location':
        return isLocationSelected ? 'completed' : currentStep === 'location' ? 'current' : 'upcoming'
      case 'service':
        return isServiceSelected ? 'completed' : currentStep === 'service' ? 'current' : 'upcoming'
      case 'details':
        return currentStep === 'details' ? 'current' : currentStep === 'confirmation' ? 'completed' : 'upcoming'
      case 'confirmation':
        return currentStep === 'confirmation' ? 'current' : 'upcoming'
      default:
        return 'upcoming'
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      {/* Desktop View - Hidden on mobile */}
      <div className="hidden md:flex justify-between items-start relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 w-full h-1 bg-gray-200">
          <motion.div
            className="h-full bg-[#1E3D8F]"
            initial={{ width: "0%" }}
            animate={{
              width: currentStep === 'location' ? "0%" :
                     currentStep === 'service' ? "33%" :
                     currentStep === 'details' ? "66%" :
                     "100%"
            }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Steps */}
        {steps.map((step) => {
          const status = getStepStatus(step.id)
          const Icon = step.icon

          return (
            <div
              key={step.id}
              className="relative flex flex-col items-center w-36"
            >
              {/* Step Circle */}
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center z-10
                  ${status === 'completed' ? 'bg-[#1E3D8F]' :
                    status === 'current' ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                animate={{
                  scale: status === 'current' ? 1.1 : 1,
                  backgroundColor: status === 'completed' || status === 'current' 
                    ? '#1E3D8F' : '#E5E7EB'
                }}
              >
                <Icon 
                  className={`w-5 h-5 
                    ${status === 'completed' || status === 'current' 
                      ? 'text-white' 
                      : 'text-gray-400'}`}
                />
              </motion.div>

              {/* Step Title */}
              <div className="mt-3 text-center">
                <p className={`font-medium ${
                  status === 'completed' ? 'text-[#1E3D8F]' :
                  status === 'current' ? 'text-[#1E3D8F]' :
                  'text-gray-400'
                }`}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {step.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Mobile View - Hidden on desktop */}
      <div className="md:hidden px-2">
        {/* Progress Bar Container */}
        <div className="h-2 w-full bg-gray-100 rounded-md overflow-hidden shadow-inner">
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
    </div>
  )
} 