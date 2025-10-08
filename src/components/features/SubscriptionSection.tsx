'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { apiService } from '@/app/api/services/api'

interface SubmitStatus {
  success?: boolean;
  message?: string;
}

export default function SubscriptionSection() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({})
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="min-h-[100px] flex items-center justify-center">
      Loading...
    </div>
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({})

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setSubmitStatus({
        success: false,
        message: 'Please enter a valid email address'
      })
      setIsSubmitting(false)
      return
    }

    try {
      console.log('Submitting subscription:', { email })
      const response = await apiService.submitSubscription({ email })
      console.log('Subscription response:', response)

      setSubmitStatus({
        success: true,
        message: response.message || 'Thank you for subscribing!'
      })
      setEmail('')
    } catch (error) {
      console.error('Subscription error:', error)
      setSubmitStatus({
        success: false,
        message: error instanceof Error 
          ? error.message 
          : 'Failed to subscribe. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-8 md:py-12" aria-labelledby="subscription-heading">
      <div className="container mx-auto px-4">
        <div className="p-6 md:p-12 bg-gray-50 rounded-lg shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
            {/* Left Content */}
            <div className="lg:w-1/2">
              <div className="mb-4 md:mb-6">
                <div className="flex items-center justify-center md:justify-start gap-3 md:gap-4">
                  <div className="w-8 md:w-12 h-[1px] bg-gray-300" aria-hidden="true"></div>
                  <span className="inline-block text-xs md:text-sm uppercase tracking-wider text-gray-600 text-center">
                    SUBSCRIBE
                  </span>
                  <div className="w-8 md:w-12 h-[1px] bg-gray-300" aria-hidden="true"></div>
                </div>
              </div>
              <h2 
                id="subscription-heading"
                className="text-xl md:text-4xl font-bold leading-relaxed md:leading-relaxed text-gray-900 text-center md:text-left"
              >
                Join our subscription and&nbsp;<br className="hidden md:block" />
                get instant <span className="text-[#1E3D8F]">updates</span> about&nbsp;<br className="hidden md:block" />
                <span className="text-[#1E3D8F]">offers</span> and <span className="text-[#1E3D8F]">discounts</span>.
              </h2>
            </div>

            {/* Right Content - Form */}
            <div className="lg:w-1/2 w-full">
              <form 
                onSubmit={handleSubmit} 
                className="flex flex-col md:flex-row gap-3 md:gap-4 max-w-xl"
                aria-label="Newsletter subscription form"
              >
                <div className="flex-grow">
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address to subscribe"
                    className="w-full px-4 md:px-6 py-3 md:py-4 rounded-lg bg-white border-2 border-gray-100 
                      text-gray-900 placeholder-gray-400 
                      focus:outline-none focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20
                      transition-all duration-200
                      text-sm md:text-base shadow-sm
                      hover:border-gray-300"
                    required
                    aria-required="true"
                    aria-invalid={submitStatus.success === false}
                    aria-describedby={submitStatus.message ? 'subscription-status' : undefined}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 md:px-8 py-3 md:py-4 bg-[#1E3D8F] text-white rounded-lg 
                    transition-all duration-200 font-semibold shadow-md text-sm md:text-base
                    ${isSubmitting 
                      ? 'opacity-70 cursor-not-allowed' 
                      : 'hover:bg-opacity-90 hover:shadow-lg hover:transform hover:scale-[1.02]'
                    }`}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? 'Subscribing...' : 'Go'}
                </button>
              </form>

              <p className="text-xs md:text-sm text-gray-600 mt-3 md:mt-4">
                Please read{' '}
                <Link 
                  href="/terms" 
                  className="text-[#1E3D8F] underline hover:text-[#FFA500] transition-colors"
                >
                  Terms and Conditions
                </Link>
                {' '}before subscribing to the news
              </p>

              {submitStatus.message && (
                <div 
                  id="subscription-status"
                  className={`mt-3 p-3 rounded-md text-sm ${
                    submitStatus.success 
                      ? 'bg-green-50 text-green-800' 
                      : 'bg-red-50 text-red-800'
                  }`}
                  role="alert"
                  aria-live="polite"
                >
                  {submitStatus.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 