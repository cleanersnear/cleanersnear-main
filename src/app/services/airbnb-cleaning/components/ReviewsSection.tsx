'use client'

import { Star } from 'lucide-react'

export default function ReviewsSection() {
  const reviews = [
    {
      name: 'Sarah M.',
      location: 'South Yarra',
      rating: 5,
      text: 'Amazing Airbnb cleaning service! They always do a fantastic job and my guests consistently leave 5-star reviews. The team is reliable and professional.',
      service: '2 Bedroom Airbnb'
    },
    {
      name: 'Michael R.',
      location: 'Melbourne CBD',
      rating: 5,
      text: 'Best Airbnb cleaners in Melbourne. They understand the importance of quick turnover and always deliver spotless results. Highly recommended!',
      service: 'Studio Apartment'
    },
    {
      name: 'Emma L.',
      location: 'St Kilda',
      rating: 5,
      text: 'Professional, reliable, and thorough. My Airbnb property always looks immaculate after their cleaning service. Great value for money.',
      service: '3 Bedroom House'
    },
    {
      name: 'David K.',
      location: 'Brunswick',
      rating: 5,
      text: 'Outstanding service! They handle everything from basic cleaning to deep cleaning when needed. My guests always comment on how clean the property is.',
      service: '1 Bedroom Apartment'
    },
    {
      name: 'Lisa P.',
      location: 'Richmond',
      rating: 5,
      text: 'Consistent quality and excellent communication. They work around my guests\' schedules and always deliver on time. Perfect for busy hosts.',
      service: '2 Bedroom Apartment'
    },
    {
      name: 'James W.',
      location: 'Carlton',
      rating: 5,
      text: 'Reliable Airbnb cleaning service that I can count on. The team is professional and my property always looks perfect for new guests.',
      service: 'Studio Apartment'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3D8F] mb-4">
            What Our Airbnb Hosts Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by hundreds of Airbnb hosts across Melbourne. 
            Read what our satisfied customers have to say about our professional cleaning service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">{review.rating}/5</span>
              </div>
              
              <p className="text-gray-700 mb-4 italic">
                &quot;{review.text}&quot;
              </p>
              
              <div className="border-t pt-4">
                <div className="font-semibold text-[#1E3D8F]">{review.name}</div>
                <div className="text-sm text-gray-600">{review.location}</div>
                <div className="text-sm text-gray-500">{review.service}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Rating */}
        <div className="mt-12 text-center">
          <div className="bg-[#1E3D8F] text-white rounded-lg p-8 max-w-2xl mx-auto">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
              ))}
            </div>
            <h3 className="text-2xl font-bold mb-2">4.9/5 Average Rating</h3>
            <p className="text-lg">Based on 500+ Airbnb cleaning reviews</p>
            <p className="text-sm opacity-90 mt-2">
              Trusted by hosts across Melbourne for reliable, professional cleaning service
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
