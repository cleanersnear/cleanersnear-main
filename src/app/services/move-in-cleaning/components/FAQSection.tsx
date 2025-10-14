'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import SimpleLocation from '@/components/Home/Location/SimpleLocation'

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: "When should I book move-in cleaning?",
      answer: "Book your move-in cleaning 1-2 days before your actual move-in date. This ensures the property is spotless and ready when you arrive with your belongings."
    },
    {
      question: "How long does move-in cleaning take?",
      answer: "Move-in cleaning typically takes 3-6 hours depending on home size and condition. We start with a 3-hour minimum for standard homes and add time as needed for larger properties."
    },
    {
      question: "What's included in move-in cleaning?",
      answer: "Our move-in cleaning includes comprehensive dusting, floor cleaning, inside appliances, window cleaning, light fixtures, cabinets, baseboards, and detailed bathroom/kitchen cleaning to ensure your new home is move-in ready."
    },
    {
      question: "How much does move-in cleaning cost?",
      answer: "Move-in cleaning starts from $161 for 3 hours, then $45/hour thereafter. Premium packages with additional services start from $296. Get an instant quote when you book online based on your home size and requirements."
    },
    {
      question: "Do I need to be present during move-in cleaning?",
      answer: "No, you don't need to be present. Our team can access the property with keys or codes provided. We'll clean thoroughly and leave everything ready for your arrival."
    },
    {
      question: "What if I find issues after move-in cleaning?",
      answer: "We offer a 100% satisfaction guarantee. If you're not completely satisfied with any aspect of the cleaning, contact us within 24 hours and we'll return to fix it at no extra cost."
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
              Everything you need to know about our move-in cleaning services
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
                Book Your Move In<br />Cleaning Today
              </h2>
              <p className="text-gray-600 mb-8">
                Enter your location to find trusted cleaners in your area for move-in cleaning service
              </p>

              <SimpleLocation />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
