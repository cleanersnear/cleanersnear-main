'use client'

import { Star } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { reviews, type Review } from '@/data/reviews'

export default function HomeReviewsGrid() {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentMobilePage, setCurrentMobilePage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const totalMobilePages = reviews.length;

  // Auto-slide for desktop
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000);

    return () => clearInterval(timer);
  }, [totalPages]);

  // Auto-slide for mobile
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMobilePage((prev) => (prev + 1) % totalMobilePages);
    }, 5000);

    return () => clearInterval(timer);
  }, [totalMobilePages]);

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
          What Our Clients Say<br className="hidden md:block" />
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
                    {reviews
                      .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                      .map((review, index) => (
                        <div key={index} className="w-full">
                          <ReviewCard review={review} />
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
                {reviews.map((review, index) => (
                  <div 
                    key={index} 
                    className="w-full flex-shrink-0 px-4"
                    style={{ minWidth: '100%' }}
                  >
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {reviews.map((_, index) => (
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

        {/* View All Reviews Button */}
        <div className="text-center">
          <Link 
            href="/reviews"
            className="inline-flex items-center gap-2 bg-[#1E3D8F] text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-all duration-200"
          >
            View All Reviews
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg md:text-xl mb-2">{review.title}</h3>
          <div className="flex items-center gap-1">
            {[...Array(review.rating)].map((_, i) => (
              <Star 
                key={i} 
                className="w-4 h-4 md:w-5 md:h-5 fill-[#FFA500] text-[#FFA500]" 
              />
            ))}
          </div>
        </div>
        <span className="text-sm text-gray-500">{review.date}</span>
      </div>
      
      <p className="text-gray-600 mb-6 text-base md:text-lg">
        {review.text}
      </p>
      
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1E3D8F] flex items-center justify-center text-white font-semibold text-lg">
          {review.name.charAt(0)}
        </div>
        <span className="font-medium text-base md:text-lg">{review.name}</span>
      </div>
    </div>
  );
} 