'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import SimpleLocation from '@/components/Home/Location/SimpleLocation'

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: "Do you guarantee bond back?",
      answer: "Yes, we offer a 100% bond back guarantee. If you're not satisfied with our cleaning service, we'll return to clean any areas that need attention at no extra cost."
    },
    {
      question: "How long does end of lease cleaning take?",
      answer: "The duration varies depending on the property size and condition. Generally, it takes 4-8 hours for a standard property. We ensure thorough cleaning of all areas according to the real estate checklist."
    },
    {
      question: "What's included in end of lease cleaning?",
      answer: "Our end of lease cleaning covers all areas required by real estate agents, including deep cleaning of kitchen, bathrooms, bedrooms, living areas, windows, and carpets. We follow a comprehensive checklist to ensure nothing is missed."
    },
    {
      question: "Do I need to be present during cleaning?",
      answer: "No, you don't need to be present. Just ensure we have access to the property. We're fully insured and our cleaners are police-checked for your peace of mind."
    },
    {
      question: "When should I book end of lease cleaning?",
      answer: "We recommend booking at least 2-3 days before your final inspection. This allows time for any touch-ups if needed. Book early to secure your preferred date, especially during peak moving seasons."
    }
  ]

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* FAQ Column */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3D8F] mb-4">
              Common Questions About Our Service
            </h2>
            <p className="text-gray-600 mb-8">
              Get detailed answers about our end of lease cleaning process and guarantees
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
                Find Your Local Cleaner<br />in Minutes
              </h2>
              <p className="text-gray-600 mb-8">
                Enter your location to get matched with trusted end of lease cleaners near you
              </p>

              <SimpleLocation />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 