'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import SimpleLocation from '@/components/Home/Location/SimpleLocation'

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: "What's the difference between weekly and fortnightly cleaning?",
      answer: "Weekly cleaning provides consistent maintenance with the same cleaner visiting every week. Fortnightly cleaning is perfect for smaller homes or those who prefer less frequent service. Both include the same comprehensive cleaning tasks."
    },
    {
      question: "Will I get the same cleaner every time?",
      answer: "Yes! We assign you a dedicated cleaner for consistency. They'll learn your preferences, home layout, and specific requirements to provide the best service possible."
    },
    {
      question: "What's included in a regular cleaning service?",
      answer: "Our regular cleaning includes dusting, vacuuming, mopping, bathroom cleaning, kitchen cleaning, tidying, bed making, and basic organization. We also clean appliances like fridges and ovens as needed."
    },
    {
      question: "How much does regular cleaning cost?",
      answer: "Regular cleaning starts from $92 for 2 hours, then $38/hour thereafter. The total cost depends on your home size and specific requirements. Get an instant quote when you book online."
    },
    {
      question: "Can I customize my regular cleaning schedule?",
      answer: "Absolutely! You can choose weekly or fortnightly frequency, select your preferred day and time, and specify any additional tasks. We'll create a cleaning plan tailored to your needs."
    },
    {
      question: "What if I need to skip or reschedule a cleaning?",
      answer: "No problem! You can reschedule or skip cleanings with 24 hours' notice through your booking confirmation or by contacting us. We're flexible with your schedule changes."
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
              Everything you need to know about our regular cleaning services
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
                Enter your location to find trusted cleaners in your area for regular cleaning service
              </p>

              <SimpleLocation />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 