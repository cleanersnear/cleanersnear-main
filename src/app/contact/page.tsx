'use client'

import MainLayout from '@/components/layout/MainLayout'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useState } from 'react'
import { apiService } from '@/services/api'
import SubscriptionSection from '@/components/features/SubscriptionSection'

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    details: ['0450124086'],
  },
  {
    icon: Mail,
    title: 'Email',
    details: [
      'info@cleaningprofessionals.com.au',
      'account@cleaningprofessionals.com.au'
    ],
  },
  {
    icon: MapPin,
    title: 'Address',
    details: ['Melbourne, Victoria 3000', 'Australia'],
  },
  {
    icon: Clock,
    title: 'Open Times',
    details: [
      'Mon - Fri: 8am - 8pm',
      'Saturday: 9am - 7pm',
      'Sunday: 9am - 8pm'
    ],
  },
]

interface SubmitStatus {
  success?: boolean;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({})

    try {
      console.log('Submitting form:', formData)
      const response = await apiService.submitContactForm(formData)
      console.log('Response:', response)

      setSubmitStatus({
        success: true,
        message: response.message || 'Thank you for your message! We will contact you shortly.'
      })
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus({
        success: false,
        message: error instanceof Error 
          ? error.message 
          : 'Failed to send message. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 pt-32">
        {/* Hero Section */}
        <div className="bg-white py-12 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 text-center md:text-left">
                Contact us
              </h1>
              <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8 text-center md:text-left">
                Need assistance with your cleaning requirements? Our dedicated team is here to help. 
                Reach out to us for a personalized cleaning solution tailored to your needs.
              </p>
              
              {/* Call Button */}
              <div className="flex justify-center md:justify-start">
                <a 
                  href="tel:0450124086"
                  className="inline-flex items-center px-6 py-3 bg-[#1E3D8F] text-white rounded-lg hover:bg-opacity-90 transition-all w-full md:w-auto justify-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call 0450 124 086
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid lg:grid-cols-3 gap-6 md:gap-12 max-w-7xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-6 md:space-y-8 bg-white p-4 md:p-6 rounded-lg shadow-sm lg:min-w-[350px]">
              <h2 className="text-xl font-semibold mb-6 text-center">
                Get in touch
              </h2>
              {contactInfo.map(({ icon: Icon, title, details }) => (
                <div key={title} className="flex space-x-4 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-10 md:w-12 h-10 md:h-12 bg-[#1E3D8F]/5 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={24} className="text-[#1E3D8F]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 md:mb-2">{title}</h3>
                    {details.map((detail) => (
                      <p key={detail} className="text-gray-600 text-sm md:text-base">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white p-4 md:p-8 rounded-lg shadow-sm max-w-3xl mx-auto w-full">
              <div className="mb-6 md:mb-8 text-center">
                <h2 className="text-xl md:text-2xl font-bold mb-2">
                  Let&apos;s Start a Conversation
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  Tell us about your cleaning needs and we&apos;ll create the perfect solution for you
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {/* Form Grid for Desktop */}
                <div className="hidden md:grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                    <input
                      id="name"
                      type="text"
                      className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F] outline-none transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <input
                      id="email"
                      type="email"
                      className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F] outline-none transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      id="phone"
                      type="tel"
                      className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F] outline-none transition-all"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium mb-2">Address</label>
                    <input
                      id="address"
                      type="text"
                      className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F] outline-none transition-all"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F] outline-none transition-all"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F] outline-none transition-all resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {submitStatus.message && (
                  <div 
                    className={`p-4 rounded-md ${
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
                  className={`bg-[#1E3D8F] text-white px-8 py-3 rounded-md transition-all duration-200
                    ${isSubmitting 
                      ? 'opacity-70 cursor-not-allowed' 
                      : 'hover:bg-opacity-90 hover:shadow-lg hover:transform hover:scale-[1.02]'
                    }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Subscription Section with mobile padding */}
        <div className="mt-8 md:mt-12">
          <SubscriptionSection />
        </div>
      </div>
    </MainLayout>
  )
} 