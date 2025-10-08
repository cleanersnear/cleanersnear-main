'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import SimpleLocation from '@/components/Home/Location/SimpleLocation'

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: "What's the difference between regular and once-off Airbnb cleaning?",
      answer: "Regular Airbnb cleaning is for ongoing turnover service between guests, focusing on quick, efficient cleaning with linen changes. Once-off cleaning is for deep cleaning after renovations, move-ins/outs, or when your property needs extensive attention."
    },
    {
      question: "How fast can you turn around my Airbnb property?",
      answer: "We specialize in fast turnovers! Our regular cleaning typically takes 2-3 hours depending on property size. We can often accommodate same-day bookings and work around your guest check-in/out schedules."
    },
    {
      question: "What's included in Airbnb cleaning service?",
      answer: "Our Airbnb cleaning includes complete linen change, bathroom deep clean, kitchen sanitization, floor cleaning, surface dusting, amenity restocking, trash removal, and guest-ready presentation with quality inspection."
    },
    {
      question: "How much does Airbnb cleaning cost?",
      answer: "Regular Airbnb cleaning starts from $118 for 2 hours, then $45/hour thereafter. Once-off deep cleaning starts from $198 for 3 hours, then $50/hour thereafter. Pricing depends on property size and specific requirements."
    },
    {
      question: "Do you provide your own cleaning supplies and linens?",
      answer: "We bring all cleaning supplies and equipment. For linens, we can either use your existing stock or coordinate with your linen service. We'll discuss your preferences during booking to ensure everything is ready for your guests."
    },
    {
      question: "What if there are issues after cleaning?",
      answer: "We guarantee our work! If you're not satisfied with any aspect of the cleaning, contact us within 24 hours and we'll return to fix it at no additional cost. Your guest experience is our priority."
    }
  ]

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* FAQ Column */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3D8F] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mb-8">
              Everything you need to know about our Airbnb cleaning services
            </p>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
                  >
                    <h3 className="font-bold text-lg text-[#1E3D8F]">{faq.question}</h3>
                    <div 
                      className={`transform transition-transform duration-300 ease-in-out ${
                        openFaq === index ? 'rotate-90' : ''
                      }`}
                    >
                      <ArrowRight className="w-5 h-5 text-[#1E3D8F]" />
                    </div>
                  </button>
                  <div 
                    className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${
                      openFaq === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Book Now Column */}
          <div className="md:pl-8">
            <div className="sticky top-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E3D8F] mb-4">
                Book Your Airbnb<br />Cleaning Today
              </h2>
              <p className="text-gray-600 mb-8">
                Enter your location to find trusted cleaners in your area for Airbnb cleaning service
              </p>

              <SimpleLocation />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 