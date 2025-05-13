'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import SimpleLocation from '@/components/Home/Location/SimpleLocation'

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: "What's the difference between move-in and move-out cleaning?",
      answer: "Move-in cleaning focuses on making your new home fresh and hygienic before you settle in, including cleaning of cabinets, appliances, and all surfaces. Move-out cleaning is more detailed and aims to meet end-of-lease requirements, including thorough cleaning of all areas to ensure bond return. Both services include comprehensive cleaning, but move-out cleaning pays special attention to areas that property managers typically inspect."
    },
    {
      question: "Do you guarantee bond back with your move-out cleaning?",
      answer: "Yes, we offer a bond back guarantee with our move-out cleaning service. If the property manager identifies any cleaning issues during the final inspection, we'll return to address them at no additional cost. Our thorough checklist ensures we meet all standard end-of-lease cleaning requirements."
    },
    {
      question: "How long does a move-in/out clean typically take?",
      answer: "The duration depends on your property size and condition. For a standard 2-bedroom home, move-in cleaning typically takes 3-4 hours, while move-out cleaning might take 4-6 hours due to the additional detail required. Larger homes or properties requiring extra attention may need more time. We'll provide a specific time estimate based on your property."
    },
    {
      question: "What's included in your move-out cleaning checklist?",
      answer: "Our move-out cleaning includes: thorough cleaning of kitchen (including inside appliances), deep bathroom sanitization, window cleaning (tracks and sills), wall spot cleaning, skirting boards, light fixtures, full floor cleaning (vacuum/mop), inside all cupboards and wardrobes, removal of cobwebs, and detailed cleaning of high-touch areas. We follow a comprehensive checklist that meets standard real estate requirements."
    },
    {
      question: "Should I be present during the move-in/out cleaning?",
      answer: "It's not necessary to be present during the cleaning. For move-in cleaning, we can arrange key pickup and return. For move-out cleaning, you can leave the keys with us or your real estate agent. However, if you prefer to be present, you're welcome to be there at the start to discuss any specific requirements and at the end for a final walkthrough."
    },
    {
      question: "Do you provide cleaning supplies and equipment?",
      answer: "Yes, we bring all necessary professional-grade cleaning supplies and equipment. Our cleaning solutions are eco-friendly yet effective, and we use specialized tools for different surfaces. You don't need to provide any cleaning materials. Just ensure electricity and water are available at the property."
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
              Everything you need to know about our move in & out cleaning services
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
                Book Your Move In/Out<br />Clean Today
              </h2>
              <p className="text-gray-600 mb-8">
                Enter your location to schedule a professional move in or move out cleaning service
              </p>

              <SimpleLocation />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 