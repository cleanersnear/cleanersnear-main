'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import SimpleLocation from '@/components/Home/Location/SimpleLocation'

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: "What's the difference between regular and once-off deep cleaning?",
      answer: "Once-off deep cleaning is more thorough than regular cleaning, focusing on areas often missed in routine maintenance. It includes inside appliances, detailed scrubbing, window cleaning, and deep sanitizing perfect for move-in/out or post-renovation."
    },
    {
      question: "How long does a once-off deep clean take?",
      answer: "Deep cleaning typically takes 4-8 hours depending on home size and requirements. We start with a 4-hour minimum for standard homes and add time as needed for larger properties or additional services."
    },
    {
      question: "What's included in a once-off deep cleaning service?",
      answer: "Our deep cleaning includes comprehensive dusting, carpet cleaning, floor scrubbing, inside appliances, window cleaning, light fixtures, cabinets, baseboards, and detailed bathroom/kitchen cleaning to restore your home to pristine condition."
    },
    {
      question: "How much does once-off deep cleaning cost?",
      answer: "Deep cleaning starts from $150 for 4 hours, then $38/hour thereafter. Premium packages with additional services start from $250. Get an instant quote when you book online based on your home size and requirements."
    },
    {
      question: "When is the best time for a deep clean?",
      answer: "Perfect for move-in/out, spring cleaning, post-renovation, or when your home needs a thorough refresh. We can schedule same-day or advance bookings to fit your timeline."
    },
    {
      question: "Do I need to prepare anything before the deep clean?",
      answer: "Just clear surfaces and move valuable items. Our team brings all supplies and equipment. We'll handle everything from moving furniture (with permission) to detailed cleaning of every surface."
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
              Everything you need to know about our once-off deep cleaning services
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
                Book Your Deep, Once-off<br />Cleaning Today
              </h2>
              <p className="text-gray-600 mb-8">
                Enter your location to find trusted cleaners in your area for once-off deep cleaning service
              </p>

              <SimpleLocation />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 