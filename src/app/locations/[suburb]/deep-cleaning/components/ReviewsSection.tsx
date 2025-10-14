'use client'

import { useState, useEffect } from 'react'
import { Star, MapPin, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import GoogleIcon from '../../components/GoogleIcon'

interface LocationData {
  name: string;
  region: string;
  council: string;
  mainSuburbs: string[];
  postcode: string;
}

interface ReviewsSectionProps {
  locationData: LocationData;
}

export default function ReviewsSection({ locationData }: ReviewsSectionProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const reviewsPerPage = 3

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const capitalizedSuburb = capitalizeFirstLetter(locationData.name);

  const reviews = [
    {
      name: "Jennifer Martinez",
      location: capitalizedSuburb,
      rating: 5,
      review: `Booked a deep clean in ${capitalizedSuburb} for my spring cleaning and wow! They cleaned every corner, inside appliances, and even the windows. My home has never looked better!`,
      date: "1 week ago",
      propertyType: "2 Bedroom Apartment"
    },
    {
      name: "Robert Kim",
      location: capitalizedSuburb,
      rating: 5,
      review: `Needed a deep clean in ${capitalizedSuburb} after renovations and they delivered beyond expectations. Deep cleaned everything including carpets and detailed scrubbing. Amazing work!`,
      date: "2 weeks ago",
      propertyType: "3 Bedroom House"
    },
    {
      name: "Amanda Foster",
      location: capitalizedSuburb,
      rating: 5,
      review: `Deep clean in ${capitalizedSuburb} was exactly what I needed. They were thorough, professional, and left my home sparkling. Highly recommend for special occasions!`,
      date: "3 weeks ago",
      propertyType: "1 Bedroom Apartment"
    },
    {
      name: "Thomas Anderson",
      location: capitalizedSuburb,
      rating: 5,
      review: `Incredible deep cleaning service in ${capitalizedSuburb}! They tackled areas I didn't even know needed cleaning. Perfect for my pre-sale preparation. Exceeded all expectations!`,
      date: "4 weeks ago",
      propertyType: "4 Bedroom House"
    },
    {
      name: "Lisa Chen",
      location: capitalizedSuburb,
      rating: 5,
      review: `Booked their premium deep clean package in ${capitalizedSuburb} and it was worth every dollar. They cleaned inside every appliance and even the light fixtures. Absolutely spotless!`,
      date: "5 weeks ago",
      propertyType: "3 Bedroom Apartment"
    }
  ]

  const totalPages = Math.ceil(reviews.length / reviewsPerPage)
  const currentReviews = reviews.slice(currentPage * reviewsPerPage, (currentPage + 1) * reviewsPerPage)

  // Auto-rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages)
    }, 5000) // Change page every 5 seconds

    return () => clearInterval(interval)
  }, [totalPages])

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  return (
    <section className="py-8 md:py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3D8F] mb-4">
            What Our {capitalizedSuburb} Clients Say About Our Services
          </h2>
          <p className="text-gray-600 text-lg">
            Interested in finding out more? View our customer testimonials from {capitalizedSuburb} to see what our clients are saying about us.
          </p>
        </div>

        <div className="relative">
          <div className="grid md:grid-cols-3 gap-8">
            {currentReviews.map((review) => (
              <div
                key={review.name}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col h-[250px]"
              >
                <div className="px-6 pt-6 pb-4 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-[#1E3D8F]">{review.name}</h3>
                      <div className="flex items-center text-gray-500 text-sm mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {review.location}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center mb-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <div className="text-xs text-gray-400 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {review.date}
                      </div>
                    </div>
                  </div>

                  <div className="inline-block bg-blue-50 text-[#1E3D8F] text-sm px-3 py-1 rounded-full mb-4 w-fit">
                    {review.propertyType}
                  </div>

                  <p className="text-gray-600 flex-grow">{review.review}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-4 space-x-4">
            <button
              onClick={prevPage}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Pagination Dots */}
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentPage
                      ? 'bg-[#1E3D8F]'
                      : 'bg-gray-300'
                    }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextPage}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              aria-label="Next reviews"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-4">
          <GoogleIcon />
        </div>
      </div>
    </section>
  )
}