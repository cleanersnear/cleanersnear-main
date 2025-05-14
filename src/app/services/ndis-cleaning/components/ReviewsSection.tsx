'use client'

import { Star, MapPin, Calendar } from 'lucide-react'

export default function ReviewsSection() {
  const reviews = [
    {
      name: "Sarah T.",
      location: "South Yarra",
      rating: 5,
      review: "Been using this NDIS cleaning service for 6 months now. They're always on time and do a thorough job. My support coordinator recommended them and I'm glad she did. Makes managing my home so much easier.",
      date: "2 days ago",
      propertyType: "2 Bedroom Apartment"
    },
    {
      name: "Michael C.",
      location: "Richmond",
      rating: 4,
      review: "Good reliable service. The same cleaner comes each week which is important for me. They could improve their communication sometimes, but the actual cleaning work is great. Really helps me maintain my independence.",
      date: "1 week ago",
      propertyType: "3 Bedroom House"
    },
    {
      name: "Emma W.",
      location: "Toorak",
      rating: 5,
      review: "My plan manager helped me find this service and they've been fantastic. They work with my schedule and understand my sensory needs. No harsh cleaning products used which is perfect for me.",
      date: "2 weeks ago",
      propertyType: "1 Bedroom Unit"
    }
  ]

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3D8F] mb-4">
            What Our NDIS Clients Say
          </h2>
          <p className="text-gray-600 text-lg">
            Trusted by NDIS participants across Melbourne
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

                <div className="inline-block bg-blue-50 text-[#1E3D8F] text-sm px-3 py-1 rounded-full mb-4">
                  {review.propertyType}
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