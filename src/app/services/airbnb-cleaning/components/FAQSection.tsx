'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'How much does Airbnb cleaning cost in Melbourne?',
      answer: 'Our Airbnb cleaning prices start from $149 for studio/1 bedroom properties, $189 for 2 bedrooms, $298 for 3 bedrooms, and $310 for 4+ bedrooms. We also offer hourly rates at $49.89 per hour (minimum 2 hours: $119.12). Pricing is transparent with no hidden fees.'
    },
    {
      question: 'How long does Airbnb cleaning take?',
      answer: 'Typical Airbnb cleaning takes 2-4 hours depending on property size and condition. We offer same-day service for urgent turnovers and can work around your guests\' schedules. Our experienced team ensures efficient, thorough cleaning every time.'
    },
    {
      question: 'Do you provide Airbnb cleaning near me in Melbourne?',
      answer: 'Yes! We provide professional Airbnb cleaning service across all Melbourne suburbs including CBD, South Yarra, St Kilda, Richmond, Brunswick, Carlton, and surrounding areas. Contact us to confirm availability in your specific location.'
    },
    {
      question: 'What\'s included in your Airbnb cleaning service?',
      answer: 'Our comprehensive Airbnb cleaning includes kitchen deep cleaning, bathroom sanitization, living area cleaning, bedroom cleaning, floor mopping and vacuuming, window cleaning, and making beds with fresh linen. We also offer additional services like oven cleaning and carpet cleaning.'
    },
    {
      question: 'Can you clean my Airbnb on the same day?',
      answer: 'Yes, we offer same-day Airbnb cleaning service for urgent turnovers. We understand the importance of quick turnaround times for Airbnb hosts. Contact us early in the day to secure same-day availability.'
    },
    {
      question: 'Are you the best Airbnb cleaning service in Melbourne?',
      answer: 'We pride ourselves on being one of Melbourne\'s most trusted Airbnb cleaning services with a 4.9/5 rating from 500+ reviews. Our hosts consistently receive 5-star guest reviews for cleanliness, and we offer a 100% satisfaction guarantee.'
    },
    {
      question: 'Do you clean Airbnb houses and apartments?',
      answer: 'Yes, we clean all types of Airbnb properties including houses, apartments, studios, and townhouses. Our team is experienced in cleaning various property types and sizes across Melbourne.'
    },
    {
      question: 'How do I book Airbnb cleaning services?',
      answer: 'Booking is easy! You can call us on 0450 124 086, use our online booking system, or request a quote through our website. We offer flexible scheduling to accommodate your guests\' check-in and check-out times.'
    },
    {
      question: 'Do you provide cleaning supplies and equipment?',
      answer: 'Yes, we bring all professional cleaning equipment and eco-friendly supplies. You don\'t need to provide anything. We use high-quality products that are safe for your guests and effective for thorough cleaning.'
    },
    {
      question: 'What if I\'m not satisfied with the cleaning?',
      answer: 'We offer a 100% satisfaction guarantee. If you\'re not completely satisfied with our Airbnb cleaning service, we\'ll return to re-clean at no additional cost. Your satisfaction and your guests\' satisfaction are our top priorities.'
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3D8F] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about our professional Airbnb cleaning service in Melbourne.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-[#1E3D8F] text-lg">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-[#1E3D8F]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#1E3D8F]" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <div className="bg-[#1E3D8F] text-white rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Still Have Questions?
            </h3>
            <p className="text-lg mb-6">
              Our team is here to help with all your Airbnb cleaning needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0450124086"
                className="inline-flex items-center justify-center bg-[#FFA500] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
              >
                Call 0450 124 086
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#1E3D8F] transition-all"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
