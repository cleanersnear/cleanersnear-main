'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { apiService } from '@/services/api'

interface SubmitStatus {
  success?: boolean;
  message?: string;
}

export default function RequestCallback() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({})

    try {
      const formData = {
        name,
        phone,
        email,
        message,
        subject: 'Callback Request - End of Lease Cleaning',
        address: '' // Optional field from contact form
      }

      await apiService.submitContactForm(formData)
      
      setSubmitStatus({
        success: true,
        message: 'Thank you! We will contact you within 2 hours.'
      })

      // Reset form
      setName('')
      setPhone('')
      setEmail('')
      setMessage('')
    } catch (error) {
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
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-20">
          {/* Form Column */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3D8F] mb-2">
              Request a Callback
              <div className="h-1 w-16 bg-[#FFA500] mt-2"></div>
            </h2>
            <p className="text-gray-600 mb-8">
              Leave your details below and one of our cleaning specialists will contact you within 2 hours to discuss your requirements and provide a customized solution.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20 transition-all outline-none"
                    placeholder="John Smith"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20 transition-all outline-none"
                    placeholder="0400 000 000"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20 transition-all outline-none"
                  placeholder="your@email.com"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20 transition-all outline-none resize-none"
                  placeholder="Tell us about your cleaning needs..."
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
                className="w-full bg-[#1E3D8F] text-white py-3 rounded-lg hover:bg-[#1E3D8F]/90 
                  transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                {!isSubmitting && <ArrowRight className="w-5 h-5" />}
              </button>
            </form>
          </div>

          {/* Contact Info Column - Hidden on mobile */}
          <div className="hidden md:block">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3D8F] mb-4">
              Get in touch
            </h2>
            <p className="text-gray-600 mb-8">
              Have questions? We&apos;re here to help you with your end of lease cleaning needs
            </p>

            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-[#1E3D8F]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <Link 
                    href="tel:0450124086"
                    className="text-gray-600 hover:text-[#1E3D8F] transition-colors"
                  >
                    0450124086
                  </Link>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#1E3D8F]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <Link 
                    href="mailto:info@cleaningprofessionals.com.au"
                    className="text-gray-600 hover:text-[#1E3D8F] transition-colors block"
                  >
                    info@cleaningprofessionals.com.au
                  </Link>
                  <Link 
                    href="mailto:account@cleaningprofessionals.com.au"
                    className="text-gray-600 hover:text-[#1E3D8F] transition-colors"
                  >
                    account@cleaningprofessionals.com.au
                  </Link>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#1E3D8F]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-600 mb-1">Melbourne, Victoria 3000</p>
                  <p className="text-gray-600 mb-2">Australia</p>
                  <Link 
                    href="https://g.co/kgs/NjNycKJ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1E3D8F] hover:text-blue-700 transition-colors inline-flex items-center gap-1"
                  >
                    View on Google Maps
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Open Times */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-[#1E3D8F]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Open Times</h3>
                  <p className="text-gray-600">Mon - Fri: 8am - 8pm</p>
                  <p className="text-gray-600">Saturday: 9am - 7pm</p>
                  <p className="text-gray-600">Sunday: 9am - 8pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 