'use client'

import { useState, useEffect } from 'react'
import { apiService } from '@/services/api'

interface FormData {
  service: string;
  typeOfClean: string;
  phone: string;
  name: string;
  address: string;
  email: string;
  notes: string;
}

interface SubmitStatus {
  success?: boolean;
  message?: string;
}

const INITIAL_FORM_DATA: FormData = {
  service: 'General House Cleaning',
  typeOfClean: 'Regular',
  phone: '',
  name: '',
  address: '',
  email: '',
  notes: ''
}

export default function CostCalculator() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({})
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({})

    // Validate required fields
    const requiredFields: (keyof FormData)[] = ['name', 'email', 'phone', 'address', 'service', 'typeOfClean']
    const missingFields = requiredFields.filter(field => !formData[field])

    if (missingFields.length > 0) {
      setSubmitStatus({
        success: false,
        message: 'Please fill in all required fields'
      })
      setIsSubmitting(false)
      return
    }

    try {
      console.log('Submitting form data:', formData)
      const response = await apiService.submitCostCalculator(formData)
      console.log('Server response:', response)

      setSubmitStatus({
        success: true,
        message: response.message || 'Thank you! We will send you the cost calculation shortly.'
      })
      setFormData(INITIAL_FORM_DATA)
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  if (!isClient) {
    return <div className="min-h-[400px] flex items-center justify-center">
      Loading...
    </div>
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
        <div>
          <label htmlFor="service" className="block text-gray-700 mb-2 font-medium">
            Choose a Service
          </label>
          <select 
            id="service"
            name="service"
            value={formData.service}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F] outline-none transition-all text-gray-600"
            required
          >
            <option value="General House Cleaning">General House Cleaning</option>
            <option value="End of Lease Cleaning">End of Lease Cleaning</option>
            <option value="Carpet Cleaning">Carpet Cleaning</option>
            <option value="Window Cleaning">Window Cleaning</option>
            <option value="NDIS Cleaning">NDIS Cleaning</option>
            <option value="Commercial Cleaning">Commercial Cleaning</option>
            <option value="Move In/Move Out Cleaning">Move In/Move Out Cleaning</option>
          </select>
        </div>

        <div>
          <label htmlFor="typeOfClean" className="block text-gray-700 mb-2 font-medium">
            Type of Clean
          </label>
          <select 
            id="typeOfClean"
            name="typeOfClean"
            value={formData.typeOfClean}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F] outline-none transition-all text-gray-600"
            required
          >
            <option value="Regular">Regular</option>
            <option value="Once-Off">Once-Off</option>
          </select>
        </div>

        <div>
          <label htmlFor="phone" className="block text-gray-700 mb-2 font-medium">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F] outline-none transition-all placeholder:text-gray-400"
            required
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">
            Your Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F] outline-none transition-all placeholder:text-gray-400"
            required
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-gray-700 mb-2 font-medium">
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F] outline-none transition-all placeholder:text-gray-400"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F] outline-none transition-all placeholder:text-gray-400"
            required
          />
        </div>

        <div className="col-span-1 md:col-span-3">
          <label htmlFor="notes" className="block text-gray-700 mb-2 font-medium">
            Details about the clean
          </label>
          <textarea
            id="notes"
            name="notes"
            placeholder="Please provide any specific requirements or details about the cleaning service you need (e.g., number of rooms, special areas to focus on, or any specific cleaning requirements)"
            value={formData.notes}
            onChange={handleInputChange}
            rows={4}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F] outline-none transition-all placeholder:text-gray-400 resize-none"
          />
        </div>

        {submitStatus.message && (
          <div 
            className={`col-span-1 md:col-span-3 p-4 rounded-md ${
              submitStatus.success 
                ? 'bg-green-50 text-green-800' 
                : 'bg-red-50 text-red-800'
            }`}
            role="alert"
          >
            {submitStatus.message}
          </div>
        )}

        <div className="col-span-1 md:col-span-3 px-4 md:px-8 pb-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full md:w-[350px] bg-white text-[#1E3D8F] border-2 border-[#1E3D8F] md:border-0 md:bg-[#FFA500] md:text-white py-3 md:py-4 font-semibold text-sm md:text-base hover:bg-opacity-90 transition-all duration-200 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'SUBMIT'}
            </button>
            <p className="text-gray-500 text-xs md:text-sm italic text-center md:text-left">
              Submit this information and we will send you the cost for the service.
            </p>
          </div>
        </div>
      </form>
    </div>
  )
} 