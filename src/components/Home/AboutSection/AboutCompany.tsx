'use client'


import QuickEnquiryForm from '@/components/features/QuickEnquiryForm'
import Link from 'next/link'

export default function AboutCompany() {
  return (
    <>
    {/* About Company Section with Quick Enquiry Form */}
    <section className="py-12 md:py-20">
    <div className="container mx-auto px-4">

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* About Company Content */}
        <div className="lg:w-2/3">
          <div className="mb-8 md:mb-12">
            <span className="text-xs md:text-sm uppercase tracking-wider">ABOUT COMPANY</span>
            <h2 className="text-2xl md:text-4xl font-bold mt-2">
              Committed to Keeping Your Home Squeaky Clean
            </h2>
          </div>
          
          <div className="max-w-3xl">
            <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-4 md:mb-6 leading-relaxed">
              At Cleaning Professionals Melbourne, Australia, we believe a clean environment is the foundation for a healthy and productive lifestyle. Serving households and businesses across Australia, we specialize in delivering tailored cleaning solutions to meet the unique needs of every property type. All our industry best practices make us one of the best cleaning services in melbourne area.
            </p>
            <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
              Whether you&apos;re seeking comprehensive home cleaning, detailed office upkeep, or specific services like carpet or window cleaning, our team of experienced professionals ensures spotless results every time. With a focus on eco-friendly and child-safe methods, we provide a thorough clean without compromising the safety of your home or workplace.
            </p>
            <Link 
              href="/about" 
              className="text-sm md:text-base lg:text-lg text-[#1E3D8F] hover:underline"
            >
              Learn more about Cleaning Professionals
            </Link>
          </div>
        </div>

        {/* Quick Enquiry Form */}
        <div className="lg:w-1/3">
          <QuickEnquiryForm />
        </div>
      </div>
    </div>
  </section>
  </>
  )
} 