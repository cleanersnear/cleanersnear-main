'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import SimpleLocation from '@/components/Home/Location/SimpleLocation'

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: "What's included in your end of lease cleaning service?",
      answer: "Our end of lease cleaning includes complete kitchen deep clean, bathroom sanitization, inside all appliances, window cleaning, floor mopping & vacuuming, cabinet cleaning, light fixtures, baseboards, and door & frame cleaning. Everything needed to meet real estate standards."
    },
    {
      question: "Do you guarantee bond back with your end of lease cleaning?",
      answer: "Yes! We offer a bond back guarantee. Our cleaning meets REIV checklist standards and real estate requirements. If there are any issues, we'll return to fix them at no extra cost to ensure you get your full bond back."
    },
    {
      question: "How much does end of lease cleaning cost?",
      answer: "End of lease cleaning starts from $205 for studio apartments, $255 for 1 bedroom, $310 for 2 bedrooms, $450 for 3 bedrooms, and $625 for 4 bedrooms. All prices include our bond back guarantee and professional equipment."
    },
    {
      question: "How long does end of lease cleaning take?",
      answer: "Cleaning time depends on property size and condition. Studio apartments typically take 2-3 hours, while larger properties can take 4-8 hours. We work efficiently to complete the job thoroughly while meeting your timeline requirements."
    },
    {
      question: "Do you provide your own cleaning supplies and equipment?",
      answer: "Yes, we bring all professional cleaning supplies, equipment, and eco-friendly products. We're fully equipped with commercial-grade cleaning tools to ensure the highest quality results that meet real estate standards."
    },
    {
      question: "Can you work around my move-out schedule?",
      answer: "Absolutely! We offer flexible scheduling including evenings and weekends to fit your move-out timeline. We can often provide same-day service and work around your schedule to ensure the property is ready for your final inspection."
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
              Everything you need to know about our end of lease cleaning services
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
                Book Your End of Lease<br />Cleaning Today
              </h2>
              <p className="text-gray-600 mb-8">
                Enter your location to find trusted cleaners in your area for end of lease cleaning service
              </p>

              <SimpleLocation />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 