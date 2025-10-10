'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import SimpleLocation from '@/components/Home/Location/SimpleLocation'

interface LocationData {
  name: string;
  region: string;
  council: string;
  mainSuburbs: string[];
  postcode: string;
}

interface FAQSectionProps {
  locationData: LocationData;
}

export default function FAQSection({ locationData }: FAQSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const capitalizedSuburb = capitalizeFirstLetter(locationData.name);

  const faqs = [
    {
      question: "Are your cleaners NDIS registered?",
      answer: "Yes, our cleaners are experienced in working with NDIS participants and understand the specific needs and requirements. We provide compassionate, professional cleaning services tailored to support your independence and comfort."
    },
    {
      question: "What's the difference between weekly and fortnightly NDIS cleaning?",
      answer: "Weekly cleaning provides consistent support with the same cleaner visiting every week, perfect for those who need regular assistance. Fortnightly cleaning is ideal for participants who prefer less frequent service while maintaining a clean home."
    },
    {
      question: "What's included in NDIS cleaning service?",
      answer: `Our NDIS cleaning in ${capitalizedSuburb} includes dusting, vacuuming, mopping, bathroom cleaning, kitchen cleaning, tidying, bed making, and basic organization. We can also assist with light tasks like organizing and can accommodate specific needs you may have.`
    },
    {
      question: "How much does NDIS cleaning cost?",
      answer: `NDIS cleaning in ${capitalizedSuburb} starts from $112 for 2 hours (weekly) or $168 for 3 hours (fortnightly), then $56/hour thereafter. The cost depends on your home size and specific requirements. We can work with your NDIS plan coordinator.`
    },
    {
      question: "Can I use my NDIS funding for cleaning?",
      answer: "Yes, our cleaning services can be funded through your NDIS plan under Core Supports - Assistance with Daily Life. We can work with your plan coordinator to ensure proper invoicing and payment arrangements."
    },
    {
      question: "Will I get the same cleaner each visit?",
      answer: "Absolutely! We assign you a dedicated cleaner who will learn your preferences, home layout, and any specific needs you may have. This consistency helps build trust and ensures the best possible service."
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
              Everything you need to know about our NDIS cleaning services in {capitalizedSuburb}
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
                Book Your NDIS<br />Cleaning in {capitalizedSuburb}
              </h2>
              <p className="text-gray-600 mb-8">
                Find trusted NDIS cleaners in {capitalizedSuburb} for compassionate cleaning support
              </p>

              <SimpleLocation />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 