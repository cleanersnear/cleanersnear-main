'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import SimpleLocation from '@/components/Home/Location/SimpleLocation'

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: "What is meant by commercial cleaning?",
      answer: "Commercial cleaning encompasses a broad range of services tailored to meet the unique needs of different businesses. These can include general cleaning (dusting, vacuuming, sanitising surfaces, emptying bins, and mopping floors) to maintain a clean and welcoming environment."
    },
    {
      question: "What is the difference between commercial cleaning and home cleaning?",
      answer: "A domestic cleaner specialises in home cleaning, looking after things like bathrooms, kitchens and floors. A commercial cleaner, however, specialises in cleaning businesses and workplaces, often using specialised equipment and products to meet higher standards of hygiene and safety."
    },
    {
      question: "What is another name for a commercial cleaner?",
      answer: "The term 'janitor' is often used interchangeably with 'cleaner' or 'custodian.' All refer to professionals who maintain cleanliness and hygiene in business environments."
    },
    {
      question: "What does commercial cleaning cover?",
      answer: "Commercial cleaning covers dusting furniture, vacuuming and mopping floors, removing cobwebs, cleaning under appliances and furniture, spot cleaning doors and walls, wiping handrails and high-touch areas, and cleaning and sanitising kitchens and canteens."
    },
    {
      question: "What is the role of a commercial cleaner?",
      answer: "Commercial cleaners don't just keep business establishments free from dirt and grime—they also ensure that everything is sanitised. Using safe and EPA-approved chemicals and disinfectants, commercial cleaners maintain high standards of sanitation and workplace safety."
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
              Everything you need to know about our commercial cleaning services
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
                Schedule Your Commercial<br />Cleaning Today
              </h2>
              <p className="text-gray-600 mb-8">
                Enter your location to book a professional commercial cleaning service with our expert team
              </p>

              <SimpleLocation />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 