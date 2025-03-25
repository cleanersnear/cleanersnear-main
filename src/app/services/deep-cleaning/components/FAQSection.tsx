'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import SimpleLocation from '@/components/Home/Location/SimpleLocation'

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: "What's included in your deep cleaning service?",
      answer: "Our deep cleaning service is a comprehensive cleaning that goes beyond regular cleaning. We focus on detailed cleaning of all surfaces, including hard-to-reach areas, baseboards, light fixtures, and thorough sanitization of bathrooms and kitchen. We use professional-grade equipment and cleaning solutions to remove built-up dirt, grime, and bacteria."
    },
    {
      question: "How long does a deep cleaning service take?",
      answer: "A thorough deep clean typically takes between 4-8 hours depending on the size of your home and its condition. Our standard service is 4 hours for smaller homes or apartments, while larger homes may require 6-8 hours for a complete deep clean. We'll assess your specific needs and recommend the appropriate duration."
    },
    {
      question: "How often should I schedule a deep cleaning?",
      answer: "We recommend a deep cleaning service every 3-4 months in addition to your regular cleaning routine. However, this can vary based on factors like household size, presence of pets, allergies, or specific cleaning needs. Some clients prefer seasonal deep cleaning (4 times a year) while others opt for bi-annual deep cleans."
    },
    {
      question: "What's the difference between regular and deep cleaning?",
      answer: "While regular cleaning maintains day-to-day cleanliness, deep cleaning focuses on thorough sanitization and detailed cleaning of areas that aren't addressed in routine cleaning. This includes cleaning behind appliances, inside cabinets, scale removal, deep carpet cleaning, and intensive bathroom and kitchen cleaning using specialized equipment and products."
    },
    {
      question: "Do you bring special equipment for deep cleaning?",
      answer: "Yes, we bring professional-grade equipment and specialized cleaning solutions specifically for deep cleaning. This includes high-powered vacuum cleaners, steam cleaners, degreasers, sanitizing equipment, and eco-friendly cleaning products that are tough on dirt but safe for your home and family."
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
              Everything you need to know about our deep cleaning services
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
                Schedule Your Deep<br />Cleaning Today
              </h2>
              <p className="text-gray-600 mb-8">
                Enter your location to book a professional deep cleaning service with our expert team
              </p>

              <SimpleLocation />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 