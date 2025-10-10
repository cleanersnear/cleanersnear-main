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
      question: "What's the difference between once-off and regular commercial cleaning?",
      answer: "Once-off cleaning is perfect for special events, move-ins, or one-time deep cleans. Regular cleaning provides ongoing maintenance with consistent scheduling and frequency discounts for weekly, fortnightly, or monthly service."
    },
    {
      question: "How many staff do you typically send for commercial cleaning?",
      answer: `We can provide 1-4 cleaning staff depending on your ${capitalizedSuburb} business space size and requirements. For larger offices, we typically send 2-3 staff to ensure efficient and thorough cleaning within your preferred timeframe.`
    },
    {
      question: "What's included in your commercial cleaning service?",
      answer: `Our commercial cleaning in ${capitalizedSuburb} includes office desk cleaning, floor mopping & vacuuming, restroom sanitization, kitchen/break room cleaning, window cleaning, trash removal, and common area maintenance to keep your workplace spotless.`
    },
    {
      question: "How much does commercial cleaning cost?",
      answer: `Commercial cleaning in ${capitalizedSuburb} starts at $50/hour for regular service and $60/hour for once-off cleaning. We offer flexible scheduling and frequency discounts for ongoing contracts. Get an instant quote based on your space size and requirements.`
    },
    {
      question: "Can you work outside business hours?",
      answer: "Yes! We offer flexible scheduling including evenings, weekends, and early mornings to minimize disruption to your business operations. We can work around your business hours for maximum convenience."
    },
    {
      question: "Do you provide your own cleaning supplies and equipment?",
      answer: "Yes, we bring all professional cleaning supplies, equipment, and eco-friendly products. We're fully equipped with commercial-grade cleaning tools to ensure the highest quality results for your business."
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
              Everything you need to know about our commercial cleaning services in {capitalizedSuburb}
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
                Book Your Commercial<br />Cleaning in {capitalizedSuburb}
              </h2>
              <p className="text-gray-600 mb-8">
                Find trusted commercial cleaners in {capitalizedSuburb} for professional business cleaning service
              </p>

              <SimpleLocation />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 