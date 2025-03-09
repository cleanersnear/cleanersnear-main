'use client'

export default function QuickStats() {
  return (
    <section className="hidden md:block py-8 md:py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-[#1E3D8F]">5000+</span>
              <span className="text-sm text-gray-600">Happy Customers</span>
            </div>
          </div>
          <div className="text-center">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-[#1E3D8F]">100%</span>
              <span className="text-sm text-gray-600">Bond Back Rate</span>
            </div>
          </div>
          <div className="text-center">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-[#1E3D8F]">4.9/5</span>
              <span className="text-sm text-gray-600">Customer Rating</span>
            </div>
          </div>
          <div className="text-center">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-[#1E3D8F]">7</span>
              <span className="text-sm text-gray-600">Days Service</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 