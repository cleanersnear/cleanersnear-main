'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import SimpleLocation from '@/components/Home/Location/SimpleLocation'

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: "How is carpet cleaning priced?",
      answer: "We offer transparent, upfront pricing based on the number of rooms, size of the area, and any additional services like upholstery or rug cleaning. Our standard room cleaning starts at $35, with no hidden fees—what you see is what you pay."
    },
    {
      question: "What carpet cleaning methods do you use?",
      answer: "We use professional hot water extraction (steam cleaning) for most carpets, which is highly effective for deep cleaning and stain removal. We also offer dry cleaning for delicate or specialty carpets and encapsulation cleaning for commercial spaces."
    },
    {
      question: "How long does it take for carpets to dry?",
      answer: "Most carpets dry within 3-6 hours after cleaning, depending on ventilation, carpet thickness, and weather conditions. We use powerful extraction equipment to minimize drying time and can provide fans if needed."
    },
    {
      question: "Can you remove all stains and odors?",
      answer: "We have a high success rate with stain and odor removal, including pet stains, wine, coffee, food spills, and more. While most stains can be removed, some older or set-in stains may not come out completely—but we always do our best!"
    },
    {
      question: "Do I need to move my furniture before cleaning?",
      answer: "We ask that you move small and breakable items before our arrival. Our technicians can help move light furniture (like chairs and small tables) as needed, but we do not move heavy or valuable items such as beds, pianos, or electronics for safety reasons."
    },
    {
      question: "Is your carpet cleaning safe for kids and pets?",
      answer: "Yes! We use eco-friendly, non-toxic cleaning solutions that are safe for children, pets, and allergy sufferers. Our cleaning products are biodegradable and leave no harmful residues."
    },
    {
      question: "How can I deep clean my carpet myself?",
      answer: "You can deep clean your carpet by vacuuming thoroughly first, treating stains with appropriate cleaners, and using a carpet shampooer or steam cleaner. However, for best results and to avoid damage, professional cleaning is recommended, especially for tough stains or high-traffic areas."
    },
    {
      question: "Is it cheaper to clean your own carpet?",
      answer: "While DIY carpet cleaning may seem cheaper upfront, professional cleaning provides better results and can actually save money long-term by extending your carpet's lifespan. Professional equipment and expertise ensure thorough cleaning without the risk of over-wetting or damage."
    },
    {
      question: "Is it worth getting carpets cleaned professionally?",
      answer: "Absolutely! Regular professional cleaning helps maintain the quality of your carpet by removing deep-seated dirt and debris that can wear down fibers over time. It also improves indoor air quality, removes allergens, and keeps your home looking and smelling fresh."
    },
    {
      question: "Is it better to shampoo or steam clean carpets?",
      answer: "For a deeper, more effective clean, steam cleaning (hot water extraction) is generally preferred over shampooing. Steam cleaning penetrates deep into carpet fibers to remove dirt, stains, and allergens, while shampooing mostly cleans the surface and can leave residues."
    },
    {
      question: "How often should I have my carpets professionally cleaned?",
      answer: "Most experts recommend professional carpet cleaning every 6-12 months for average households. High-traffic areas, homes with pets, children, or allergy sufferers may benefit from cleaning every 3-6 months. Commercial spaces typically need quarterly cleaning."
    },
    {
      question: "Will carpet cleaning remove pet odors and stains?",
      answer: "Professional carpet cleaning is highly effective at removing most pet odors and stains. We use specialized enzyme-based treatments that break down pet urine crystals and neutralize odors at the source. For severe pet odor issues, we may recommend additional treatments or deodorizing services."
    },
    {
      question: "Can you clean delicate or specialty rugs?",
      answer: "Yes, we offer cleaning for all types of rugs, including delicate Persian rugs, antique rugs, wool rugs, and specialty materials like silk or jute. Our technicians assess each rug individually and use appropriate cleaning methods to ensure safe and effective cleaning."
    },
    {
      question: "What should I do to prepare for carpet cleaning?",
      answer: "Before we arrive, please vacuum lightly, remove small items and breakables from the area, and identify any specific stains or problem areas. We'll handle the rest! It's also helpful to have pets secured in another area during cleaning."
    },
    {
      question: "Do you offer same-day carpet cleaning service?",
      answer: "Yes, we offer same-day service when possible, depending on availability and the size of the job. For urgent cleaning needs, please call us directly and we'll do our best to accommodate your schedule."
    },
    {
      question: "What's the difference between residential and commercial carpet cleaning?",
      answer: "Commercial carpet cleaning typically involves larger areas, different scheduling requirements, and may use different cleaning methods suited for high-traffic commercial carpets. We offer flexible scheduling for businesses, including after-hours and weekend cleaning."
    },
    {
      question: "Can carpet cleaning help with allergies?",
      answer: "Yes! Professional carpet cleaning removes allergens like dust mites, pollen, pet dander, and other particles trapped deep in carpet fibers. This can significantly improve indoor air quality and reduce allergy symptoms."
    },
    {
      question: "What happens if I'm not satisfied with the cleaning?",
      answer: "We stand behind our work with a satisfaction guarantee. If you're not completely happy with the results, please contact us within 24 hours and we'll return to re-clean any areas of concern at no additional charge."
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
              Everything you need to know about our Steam cleaning services
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
                Book Your Steam Cleaning<br />Cleaning Today
              </h2>
              <p className="text-gray-600 mb-8">
                Enter your location to find Steam cleaning cleaners in your area
              </p>

              <SimpleLocation />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}