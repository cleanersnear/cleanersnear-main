'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import SimpleLocation from '@/components/Home/Location/SimpleLocation'

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: "Do you charge for travel?",
      answer: "No, we don't charge for travel to your location. Our service rates are all-inclusive, meaning you only pay for the actual cleaning time. This makes our pricing transparent and easier to manage within your NDIS plan."
    },
    {
      question: "How does NDIS cleaning service work?",
      answer: "Our NDIS cleaning service is available to all NDIS participants with cleaning support in their plan. We work directly with your NDIS plan manager or support coordinator to arrange regular or one-off cleaning services. All our cleaners are NDIS registered and trained to work with people with disabilities."
    },
    {
      question: "Can I use my NDIS funding for cleaning services?",
      answer: "Yes, if your NDIS plan includes Core Supports or Household Tasks, you can use your funding for our cleaning services. We can help you understand how to best utilize your NDIS funding for cleaning support and provide detailed invoices for your plan manager."
    },
    {
      question: "What's included in your NDIS cleaning service?",
      answer: "Our NDIS cleaning service includes comprehensive house cleaning tailored to your needs. This covers vacuuming, mopping, bathroom and kitchen cleaning, dusting, and general tidying. We can also provide additional services like laundry assistance, changing bed linens, and organizing spaces based on your specific requirements."
    },
    {
      question: "How do I book and pay for the service?",
      answer: "Booking is simple - you can call us directly or use our online booking system. For payment, we can either invoice your NDIS plan manager directly, work with your support coordinator, or process claims through the NDIS portal. We handle all the paperwork to make it hassle-free for you."
    },
    {
      question: "Will I have the same cleaner each time?",
      answer: "Yes, we prioritize consistency for our NDIS clients. You'll be assigned a regular cleaner who understands your specific needs and preferences. In case your regular cleaner is unavailable, we'll notify you in advance and ensure the replacement cleaner is fully briefed on your requirements."
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
              Everything you need to know about our NDIS cleaning services
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
                Book Your NDIS<br />Cleaning Today
              </h2>
              <p className="text-gray-600 mb-8">
                Enter your location to find NDIS registered cleaners in your area
              </p>

              <SimpleLocation />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}