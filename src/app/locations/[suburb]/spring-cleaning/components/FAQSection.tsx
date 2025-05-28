'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import SimpleLocation from '@/components/Home/Location/SimpleLocation'

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: "What's included in your spring or deep cleaning service?",
      answer: "Our spring and deep cleaning service is a comprehensive cleaning that goes beyond regular cleaning. We focus on detailed cleaning of all surfaces, including hard-to-reach areas, baseboards, light fixtures, and thorough sanitization of bathrooms and kitchen. We use professional-grade equipment and cleaning solutions to remove built-up dirt, grime, and bacteria."
    },
    {
      question: "How long does a spring or deep cleaning service take?",
      answer: "A thorough spring and deep clean typically takes between 4-8 hours depending on the size of your home and its condition. Our standard service is 4 hours for smaller homes or apartments, while larger homes may require 6-8 hours for a complete spring and deep clean. We'll assess your specific needs and recommend the appropriate duration."
    },
    {
      question: "How often should I schedule a spring cleaning?",
      answer: "We recommend a spring cleaning service once a year, typically during the spring season, to give your home a fresh start. However, you can also schedule it at any time of the year. Some clients prefer to combine it with their regular deep cleaning schedule for maximum impact."
    },
    {
      question: "What's the difference between regular, spring, and deep cleaning?",
      answer: "While regular cleaning maintains day-to-day cleanliness, spring cleaning is a seasonal thorough cleaning that includes decluttering and organizing. Deep cleaning focuses on thorough sanitization and detailed cleaning of areas that aren't addressed in routine cleaning. Our spring and deep cleaning service combines both approaches for a comprehensive clean."
    },
    {
      question: "Do you bring special equipment for spring and deep cleaning?",
      answer: "Yes, we bring professional-grade equipment and specialized cleaning solutions specifically for spring and deep cleaning. This includes high-powered vacuum cleaners, steam cleaners, degreasers, sanitizing equipment, and eco-friendly cleaning products that are tough on dirt but safe for your home and family."
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
              Everything you need to know about our spring and deep cleaning services
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
                Schedule Your Spring <br />Cleaning Today
              </h2>
              <p className="text-gray-600 mb-8">
                Enter your location to book a professional spring and deep cleaning service with our expert team
              </p>

              <SimpleLocation />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 