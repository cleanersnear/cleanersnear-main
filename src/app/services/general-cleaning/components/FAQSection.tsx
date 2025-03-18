'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import SimpleLocation from '@/components/Home/Location/SimpleLocation'

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: "How often should I schedule regular cleaning?",
      answer: "The frequency depends on your needs. We offer weekly cleaning for busy households, fortnightly for regular maintenance, and monthly for lighter cleaning needs. Weekly cleaning provides the best value and ensures your home stays consistently clean."
    },
    {
      question: "What's included in your general cleaning service?",
      answer: "Our general cleaning service includes thorough cleaning of all living areas, bedrooms, kitchen, and bathrooms. We dust, vacuum, mop, clean surfaces, sanitize bathrooms, clean kitchen appliances, and ensure your home is fresh and spotless. Additional services like oven or window cleaning can be added as needed."
    },
    {
      question: "Do I need to provide cleaning supplies?",
      answer: "No, our professional cleaners bring all necessary cleaning supplies and equipment. We use high-quality, eco-friendly products that are safe for your family and pets. If you have specific products you'd prefer us to use, just let us know."
    },
    {
      question: "Can I trust your cleaners in my home?",
      answer: "Absolutely! All our cleaners undergo thorough background checks and are fully insured. They are experienced professionals who respect your privacy and property. We maintain high standards of security and professionalism."
    },
    {
      question: "What if I'm not satisfied with the cleaning?",
      answer: "We offer a 100% satisfaction guarantee. If you're not completely happy with any aspect of our service, we'll return within 24 hours to address your concerns at no additional cost. Your satisfaction is our top priority."
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
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E3D8F] mb-4">
                Book Your Regular<br />Cleaning Today
              </h2>
              <p className="text-gray-600 mb-8">
                Enter your location to find trusted cleaners in your area for regular or one-off cleaning
              </p>

              <SimpleLocation />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 