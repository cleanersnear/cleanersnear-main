'use client'

import React, { useEffect, useState } from 'react'

interface TestimonialsProps {
  suburb: string
}

interface Review {
  name: string
  initials: string
  quote: string
  rating: number
  locationLabel: string
}

const allReviews: Review[] = [
  {
    name: 'Sarah T.',
    initials: 'ST',
    quote:
      'Absolutely amazing service! Got my full bond back without any issues. The team was professional and thorough. Highly recommend in Epping!',
    rating: 5,
    locationLabel: 'Epping Resident',
  },
  {
    name: 'Michael C.',
    initials: 'MC',
    quote:
      "Very impressed with the attention to detail. They cleaned areas I didn't even think about. The bond back guarantee gave me peace of mind.",
    rating: 5,
    locationLabel: 'Epping Resident',
  },
  {
    name: 'Liam P.',
    initials: 'LP',
    quote:
      'Booked online in under a minute and the team arrived on time. Honest pricing, no hidden fees, and they followed the real estate checklist.',
    rating: 5,
    locationLabel: 'Mill Park',
  },
  {
    name: 'Amelia R.',
    initials: 'AR',
    quote:
      'The oven and bathrooms look brand new. Friendly cleaners and great communication. Highly recommend their end of lease clean.',
    rating: 5,
    locationLabel: 'South Morang',
  },
  {
    name: 'Noah K.',
    initials: 'NK',
    quote:
      'Professional, insured and eco-friendly products. Agent was happy at final inspection and my full bond was returned the same day.',
    rating: 5,
    locationLabel: 'Mernda',
  },
  {
    name: 'Olivia S.',
    initials: 'OS',
    quote:
      'Clear pricing and excellent results. The team re-confirmed scope and delivered above expectations. Would book again without hesitation.',
    rating: 5,
    locationLabel: 'Epping',
  },
  {
    name: 'James H.',
    initials: 'JH',
    quote:
      'Fast turnaround on short notice and very thorough. Floors, kitchen and bathrooms were spotless. Great value for the quality.',
    rating: 5,
    locationLabel: 'Thomastown',
  },
]

export default function Testimonials({ suburb }: TestimonialsProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [currentMobilePage, setCurrentMobilePage] = useState(0)
  const itemsPerPage = 3
  const totalPages = Math.ceil(allReviews.length / itemsPerPage)
  const totalMobilePages = allReviews.length

  // Auto-slide for desktop
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages)
    }, 5000)

    return () => clearInterval(timer)
  }, [totalPages])

  // Auto-slide for mobile
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMobilePage((prev) => (prev + 1) % totalMobilePages)
    }, 5000)

    return () => clearInterval(timer)
  }, [totalMobilePages])

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-2">
          <div className="w-8 md:w-12 h-[1px] bg-gray-300"></div>
          <span className="text-xs md:text-sm uppercase tracking-wider text-center text-[#1E3D8F]">
            CUSTOMER TESTIMONIALS
          </span>
          <div className="w-8 md:w-12 h-[1px] bg-gray-300"></div>
        </div>
        
        <h2 className="text-xl md:text-4xl font-bold text-center mb-12">
        What Our Epping Customers Say<br className="hidden md:block" />
          About Our Services
        </h2>

        {/* Desktop View - Hidden on Mobile */}
        <div className="hidden md:block">
          <div className="max-w-7xl mx-auto relative mb-12">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentPage * 100}%)` }}
              >
                {/* Desktop slides (3 per page) */}
                {[...Array(totalPages)].map((_, pageIndex) => (
                  <div 
                    key={pageIndex} 
                    className="w-full flex-shrink-0 grid grid-cols-3 gap-6"
                    style={{ minWidth: '100%' }}
                  >
                    {allReviews
                      .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                      .map((review, index) => (
                        <div key={index} className="w-full">
                          <ReviewCard review={review} suburb={suburb} />
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentPage === index ? 'bg-[#1E3D8F] w-4' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>

            {/* Desktop Navigation Arrows */}
            <button
              onClick={() => setCurrentPage(prev => (prev - 1 + totalPages) % totalPages)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50"
              aria-label="Previous page"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={() => setCurrentPage(prev => (prev + 1) % totalPages)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50"
              aria-label="Next page"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile View - Hidden on Desktop */}
        <div className="md:hidden">
          <div className="max-w-xl mx-auto relative mb-12">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentMobilePage * 100}%)` }}
              >
                {/* Mobile slides (1 per page) */}
                {allReviews.map((review, index) => (
                  <div 
                    key={index} 
                    className="w-full flex-shrink-0 px-4"
                    style={{ minWidth: '100%' }}
                  >
                    <ReviewCard review={review} suburb={suburb} />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {allReviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMobilePage(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentMobilePage === index ? 'bg-[#1E3D8F] w-4' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ReviewCard({ review, suburb }: { review: Review; suburb: string }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg md:text-xl mb-2">{review.name}</h3>
          <div className="flex items-center gap-1">
            {[...Array(review.rating)].map((_, i) => (
              <svg key={i} className="w-4 h-4 md:w-5 md:h-5 fill-[#FFA500]" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
        </div>
        <span className="text-sm text-gray-500">{review.rating.toFixed(1)}</span>
      </div>
      
      <p className="text-gray-600 mb-6 text-base md:text-lg italic">
        &quot;{review.quote}&quot;
      </p>
      
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1E3D8F] flex items-center justify-center text-white font-semibold text-lg">
          {review.initials}
        </div>
        <div>
          <span className="font-medium text-base md:text-lg">{review.name}</span>
          <div className="text-sm text-gray-500">{suburb} / {review.locationLabel}</div>
        </div>
      </div>
    </div>
  )
}


