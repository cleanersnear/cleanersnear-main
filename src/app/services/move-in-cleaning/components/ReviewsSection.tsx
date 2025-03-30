'use client'

import { Star, MapPin, Calendar } from 'lucide-react'

export default function ReviewsSection() {
  const reviews = [
    {
      name: "James Wilson",
      location: "Brighton",
      rating: 5,
      review: "Outstanding move-out cleaning service! They helped me get my full bond back with their thorough cleaning. Every surface was spotless, and they even cleaned areas I didn't think of. The property manager was very impressed!",
      date: "1 week ago",
      propertyType: "2 Bedroom Apartment",
      service: "Move Out Clean"
    },
    {
      name: "Lisa Chen",
      location: "Toorak",
      rating: 5,
      review: "Had a move-in clean before settling into my new home. The team did an amazing job making everything fresh and hygienic. They cleaned inside all cabinets and appliances. It was wonderful moving into such a clean space!",
      date: "2 weeks ago",
      propertyType: "3 Bedroom House",
      service: "Move In Clean"
    },
    {
      name: "David Thompson",
      location: "St Kilda",
      rating: 5,
      review: "Used their move-out cleaning service for my rental. The attention to detail was incredible - they cleaned everything from skirting boards to window tracks. Got my full bond back without any issues. Highly recommend!",
      date: "3 weeks ago",
      propertyType: "1 Bedroom Apartment",
      service: "Move Out Clean"
    }
  ]

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3D8F] mb-4">
            Move In & Out Cleaning Reviews
          </h2>
          <p className="text-gray-600 text-lg">
            See why our customers trust us with their move in and move out cleaning needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div 
              key={review.name}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="p-6">
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

                <div className="flex gap-2 mb-4">
                  <div className="inline-block bg-blue-50 text-[#1E3D8F] text-sm px-3 py-1 rounded-full">
                    {review.propertyType}
                  </div>
                  <div className="inline-block bg-green-50 text-green-700 text-sm px-3 py-1 rounded-full">
                    {review.service}
                  </div>
                </div>

                <p className="text-gray-600">{review.review}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 