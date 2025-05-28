'use client'

import { Star, MapPin, Calendar } from 'lucide-react'

interface ReviewsSectionProps {
  suburb?: string;
}

export default function ReviewsSection({ suburb = 'Melbourne' }: ReviewsSectionProps) {
  const capitalizedSuburb = (suburb || 'Melbourne').split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')

  const reviews = [
    {
      name: "David Nguyen",
      location: capitalizedSuburb,
      rating: 5,
      review: `We use this service for our gym in ${capitalizedSuburb} and are extremely happy with the results. The team is professional, punctual, and always leaves the place spotless. Highly recommended for any business!`,
      date: "2 weeks ago",
      propertyType: "Fitness Centre"
    },
    {
      name: "Priya Patel",
      location: capitalizedSuburb,
      rating: 5,
      review: `Our medical clinic in ${capitalizedSuburb} requires the highest standards of cleanliness, and this team delivers every time. They use safe, effective products and are very responsive to our needs.`,
      date: "3 days ago",
      propertyType: "Medical Clinic"
    },
    {
      name: "Tom Williams",
      location: capitalizedSuburb,
      rating: 5,
      review: `We switched to this commercial cleaning company for our retail store in ${capitalizedSuburb} and couldn't be happier. The staff are friendly, trustworthy, and always do a fantastic job.`,
      date: "5 days ago",
      propertyType: "Retail Store"
    }
  ]

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3D8F] mb-4">
            Commercial Cleaning Success Stories
          </h2>
          <p className="text-gray-600 text-lg">
            See how we transform workspaces in {capitalizedSuburb} with our professional commercial cleaning service
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