'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'

interface BeforeAfterGalleryProps {
  serviceSlug: string
}

export default function BeforeAfterGallery({ serviceSlug }: BeforeAfterGalleryProps) {
  const [sliderPositions, setSliderPositions] = useState([50, 50, 50])

  const handleSliderDrag = (index: number, clientX: number) => {
    const slider = document.getElementById(`slider-${index}`)
    if (!slider) return

    const rect = slider.getBoundingClientRect()
    const x = Math.min(Math.max(0, ((clientX - rect.left) / rect.width) * 100), 100)
    
    setSliderPositions(prev => {
      const newPositions = [...prev]
      newPositions[index] = x
      return newPositions
    })
  }

  const handleMouseDown = (index: number) => {
    const handleMouseMove = (e: MouseEvent) => {
      handleSliderDrag(index, e.clientX)
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleTouchStart = (index: number) => {
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      handleSliderDrag(index, e.touches[0].clientX)
    }

    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }

    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)
  }

  return (
    <section className="pt-4 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3D8F] mb-4">
            Our Cleaning Transformations
          </h2>
          <p className="text-gray-600 text-lg">
            Drag the slider to see the difference
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3].map((item, index) => (
            <div key={item} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div id={`slider-${index}`} className="relative h-96 group select-none">
                {/* Before Image */}
                <div className="absolute inset-0">
                  <Image
                    src={`/images/before-after/${serviceSlug}-image${item}-Before.jpg`}
                    alt={`Before ${serviceSlug.split('-').join(' ')} ${item}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
                
                {/* Slider Container */}
                <div className="absolute inset-0 overflow-hidden">
                  {/* After Image with Clip Path */}
                  <div 
                    className="absolute inset-0 transform transition-transform duration-200"
                    style={{
                      clipPath: `polygon(${sliderPositions[index]}% 0, 100% 0, 100% 100%, ${sliderPositions[index]}% 100%)`
                    }}
                  >
                    <Image
                      src={`/images/before-after/${serviceSlug}-image${item}-After.jpg`}
                      alt={`After ${serviceSlug.split('-').join(' ')} ${item}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                  
                  {/* Slider Handle */}
                  <div 
                    className="absolute inset-y-0 w-1 bg-white cursor-ew-resize group-hover:bg-[#FFA500] transition-colors hover:scale-110 transition-transform"
                    style={{ left: `${sliderPositions[index]}%` }}
                    onMouseDown={() => handleMouseDown(index)}
                    onTouchStart={() => handleTouchStart(index)}
                  >
                    {/* Vertical Line with Arrows */}
                    <div className="absolute inset-y-0 flex flex-col items-center justify-center gap-2">
                      <div className="w-6 h-6 text-white">←</div>
                      <div className="w-6 h-6 text-white">→</div>
                    </div>
                    {/* Handle Button */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <div className="flex items-center gap-1">
                        <ArrowRight className="w-4 h-4 text-[#1E3D8F] -rotate-180" />
                        <ArrowRight className="w-4 h-4 text-[#1E3D8F]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dynamic Labels */}
                <div className={`absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium transition-opacity duration-200 ${
                  sliderPositions[index] > 30 ? 'opacity-100' : 'opacity-0'
                }`}>
                  Before
                </div>
                <div className={`absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium transition-opacity duration-200 ${
                  sliderPositions[index] < 70 ? 'opacity-100' : 'opacity-0'
                }`}>
                  After
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 