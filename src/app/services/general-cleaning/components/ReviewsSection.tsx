'use client'

import { Star, MapPin, Calendar } from 'lucide-react'

export default function ReviewsSection() {
  const reviews = [
    {
      name: "Jessica Miller",
      location: "Toorak",
      rating: 5,
      review: "I've been using their weekly cleaning service for 3 months now. The team is always punctual, thorough, and my home looks amazing every time!",
      date: "1 week ago",
      propertyType: "3 Bedroom House"
    },
    {
      name: "David Anderson",
      location: "Brighton",
      rating: 5,
      review: "Fantastic fortnightly service! They're consistent, reliable, and pay great attention to detail. My house has never been cleaner.",
      date: "2 weeks ago",
      propertyType: "4 Bedroom House"
    },
    {
      name: "Lisa Zhang",
      location: "St Kilda",
      rating: 5,
      review: "Booked a one-off deep clean and was blown away by the results. They transformed my apartment and even cleaned areas I had forgotten about!",
      date: "3 weeks ago",
      propertyType: "2 Bedroom Apartment"
    }
  ]

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3D8F] mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-lg">
            Join hundreds of satisfied customers
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