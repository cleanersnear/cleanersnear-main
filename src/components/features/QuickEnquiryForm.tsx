'use client'

import { useState } from 'react'
import { apiService } from '@/services/api'

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  service: string;
}

interface SubmitStatus {
  success?: boolean;
  message?: string;
}

export default function QuickEnquiryForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    service: 'General House Cleaning'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({})

    try {
      console.log('Form data being submitted:', formData)
      const response = await apiService.submitQuickEnquiry(formData)
      console.log('Response received:', response)

      if (response.success) {
        setSubmitStatus({
          success: true,
          message: response.message || 'Thank you! We will contact you shortly.'
        })
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          service: 'General House Cleaning'
        })
      } else {
        throw new Error(response.message || 'Submission failed')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus({
        success: false,
        message: error instanceof Error 
          ? error.message 
          : 'Something went wrong. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg max-w-md">
      <h2 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6">Quick Enquiry</h2>
      
      <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm md:text-base text-gray-700 mb-1 md:mb-2">
            Your Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2.5 md:p-3 text-sm md:text-base border rounded-lg bg-gray-50"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm md:text-base text-gray-700 mb-1 md:mb-2">
            Your Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2.5 md:p-3 text-sm md:text-base border rounded-lg bg-gray-50"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm md:text-base text-gray-700 mb-1 md:mb-2">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-2.5 md:p-3 text-sm md:text-base border rounded-lg bg-gray-50"
            required
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm md:text-base text-gray-700 mb-1 md:mb-2">
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full p-2.5 md:p-3 text-sm md:text-base border rounded-lg bg-gray-50"
            required
          />
        </div>

        <div>
          <label htmlFor="service" className="block text-sm md:text-base text-gray-700 mb-1 md:mb-2">
            Choose a Service
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleInputChange}
            className="w-full p-2.5 md:p-3 text-sm md:text-base border rounded-lg bg-gray-50"
            required
          >
            <option value="General House Cleaning">General House Cleaning</option>
            <option value="End of Lease Cleaning">End of Lease Cleaning</option>
            <option value="Carpet Cleaning">Carpet Cleaning</option>
            <option value="Window Cleaning">Window Cleaning</option>
            <option value="Commercial Cleaning">Commercial Cleaning</option>
          </select>
        </div>

        {submitStatus.message && (
          <div 
            className={`p-2.5 md:p-3 rounded-md text-xs md:text-sm ${
              submitStatus.success 
                ? 'bg-green-50 text-green-800' 
                : 'bg-red-50 text-red-800'
            }`}
            role="alert"
          >
            {submitStatus.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-[#FFA500] text-white py-2.5 md:py-3 rounded-lg hover:bg-opacity-90 font-semibold text-sm md:text-base 
            shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5
            ${isSubmitting ? 'opacity-70 cursor-not-allowed hover:shadow-md hover:translate-y-0' : ''}`}
        >
          {isSubmitting ? 'Submitting...' : 'SUBMIT DETAILS'}
        </button>
      </form>
    </div>
  )
} 