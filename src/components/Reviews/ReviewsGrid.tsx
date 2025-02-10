'use client'

import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { reviews } from '@/data/reviews'

export default function ReviewsGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  return (
    <section className="pt-32 md:pt-48 pb-12 md:pb-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header - Mobile Optimized */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-xs md:text-sm uppercase tracking-wider text-[#1E3D8F]">
            CUSTOMER TESTIMONIALS
          </span>
          <h1 className="text-2xl md:text-4xl font-bold mt-2 mb-3 md:mb-4">
            What Our Clients Say About Us
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            We take pride in delivering exceptional cleaning services across Melbourne. 
            Our commitment to quality and customer satisfaction has earned us the trust 
            of thousands of happy clients.
          </p>
        </div>

        {/* Reviews Grid - Mobile Single Column */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {currentReviews.map((review, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-between items-start mb-3 md:mb-4">
                <div>
                  <h3 className="font-semibold text-base md:text-lg mb-1">{review.title}</h3>
                  <div className="flex items-center gap-0.5 md:gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-3 h-3 md:w-4 md:h-4 fill-[#FFA500] text-[#FFA500]" 
                      />
                    ))}
                  </div>
                </div>
                <span className="text-xs md:text-sm text-gray-500">{review.date}</span>
              </div>
              
              <p className="text-xs md:text-base text-gray-600 mb-3 md:mb-4 line-clamp-4 md:line-clamp-none">
                {review.text}
              </p>
              
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#1E3D8F] flex items-center justify-center text-white font-semibold text-xs md:text-base">
                  {review.name.charAt(0)}
                </div>
                <span className="font-medium text-sm md:text-base">{review.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination - Mobile Optimized */}
        <div className="flex justify-center items-center gap-1 md:gap-2 mt-8 md:mt-12">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            aria-label="Previous page"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors text-sm md:text-base
                ${currentPage === i + 1 
                  ? 'bg-[#1E3D8F] text-white' 
                  : 'bg-white hover:bg-gray-50'}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            aria-label="Next page"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Want to know more section - Mobile Optimized */}
        <div className="mt-16 md:mt-20">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-4">
              Want to know more?
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">
              Check out our reviews to see what our clients think about their experience 
              and the quality of service our cleaning teams deliver.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 md:gap-8">
            {/* ProductReview Card - Mobile Optimized */}
            <div className="bg-white rounded-lg shadow-md p-4 md:p-8">
              <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:gap-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <div>
                    <Image
                      src="/images/productreview-logo.webp"
                      alt="ProductReview Rating"
                      width={140}
                      height={30}
                      className="object-contain mb-2"
                    />
                    <div className="flex items-center gap-0.5 md:gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 md:w-4 md:h-4 ${
                            i < 4 
                              ? 'fill-[#FFA500] text-[#FFA500]' 
                              : 'fill-none text-[#FFA500]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-2xl md:text-3xl font-bold text-[#1E3D8F]">4.2</div>
                    <div className="text-xs md:text-sm text-gray-500">(1,032)</div>
                  </div>
                </div>
                
                {/* Read all reviews button - Hidden on mobile */}
                <Link 
                  href="/reviews"
                  className="hidden md:inline-flex items-center justify-center gap-2 bg-[#1E3D8F] text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-all duration-200 text-base"
                >
                  Read all reviews
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

            {/* Google Reviews Card */}
            <div className="bg-white rounded-lg shadow-md p-4 md:p-8">
              <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:gap-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <div>
                    <Image
                      src="/images/google-logo.png"
                      alt="Google Reviews"
                      width={70}
                      height={15}
                      className="object-contain mb-2"
                    />
                    <div className="flex items-center gap-0.5 md:gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-3 h-3 md:w-4 md:h-4 fill-[#FFA500] text-[#FFA500]"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-2xl md:text-3xl font-bold text-[#1E3D8F]">5.0</div>
                    <div className="text-xs md:text-sm text-gray-500">(789)</div>
                  </div>
                </div>
                
                {/* Read all reviews button - Hidden on mobile */}
                <Link 
                  href="/reviews"
                  className="hidden md:inline-flex items-center justify-center gap-2 bg-[#1E3D8F] text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-all duration-200 text-base"
                >
                  Read all reviews
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
          </div>
        </div>
      </div>
    </section>
  )
} 