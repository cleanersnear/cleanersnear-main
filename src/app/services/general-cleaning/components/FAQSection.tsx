'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import SimpleLocation from '@/components/Home/Location/SimpleLocation'
import Link from 'next/link'

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: "What's included in general house cleaning?",
      answer: "General cleaning includes essential maintenance tasks like dusting, vacuuming, mopping, kitchen and bathroom cleaning, window cleaning, and general tidying to keep your home consistently clean and well-maintained."
    },
    {
      question: "How often should I book general cleaning?",
      answer: "General cleaning is perfect for weekly, fortnightly, or monthly maintenance. The frequency depends on your lifestyle and preferences. We can work with you to create a schedule that keeps your home consistently clean."
    },
    {
      question: "How long does general cleaning take?",
      answer: "General cleaning typically takes 2-4 hours depending on home size and requirements. We start with a 2-hour minimum for standard homes and add time as needed for larger properties or additional tasks."
    },
    {
      question: "How much does general cleaning cost?",
      answer: "General cleaning starts from $92 for 2 hours, then $38/hour thereafter. This provides excellent value for regular maintenance cleaning. Get an instant quote when you book online based on your home size and requirements."
    },
    {
      question: "What's the difference between general and deep cleaning?",
      answer: "General cleaning focuses on regular maintenance and essential tasks, while deep cleaning is more thorough and includes inside appliances, detailed scrubbing, and areas often missed in routine cleaning."
    },
    {
      question: "Do I need to provide cleaning supplies?",
      answer: "No, we bring all necessary cleaning supplies and equipment. Our team arrives fully prepared with professional-grade cleaning products and tools to ensure the best results for your home."
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
              Everything you need to know about our general cleaning services
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
              <h2 className="mb:text-center text-3xl md:text-4xl font-bold text-[#1E3D8F] mb-4">
                Book Your General<br />Cleaning Today
              </h2>
              <p className="text-gray-600 mb-8">
                Enter your location to find trusted cleaners in your area for general cleaning service
              </p>

              <SimpleLocation />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
