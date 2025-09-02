'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'

interface BookingData {
  bookingNumber: string
  name: string
  propertyAddress: string
  serviceType: string
  hours: number
  date: string
  time: string
  extras: string[]
  finalPrice: number
}

export default function BookingConfirmation({ 
  params 
}: { 
  params: Promise<{ bookingNumber: string }> 
}) {
  const [booking, setBooking] = useState<BookingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Helper function to get error message
  const getErrorMessage = () => error || 'The booking you are looking for does not exist.'

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const { bookingNumber } = await params;
        const response = await fetch(`/api/services/airbnbcleaning/booking/${bookingNumber}`)
        const data = await response.json()
        
        if (data.success) {
          setBooking(data.booking)
        } else {
          setError('Booking not found')
        }
      } catch {
        setError('Error loading booking details')
      } finally {
        setLoading(false)
      }
    }

    fetchBooking()
  }, [params])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3D8F] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    )
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">!</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Booking Not Found</h1>
          <p className="text-gray-600 mb-6">
            {getErrorMessage()}
          </p>
          <Link
            href="/services/airbnb-cleaning"
            className="inline-block bg-[#1E3D8F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            Back to Airbnb Cleaning
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-[#1E3D8F] mb-2">
                Booking Confirmed!
              </h1>
              <p className="text-gray-600">
                Your Airbnb cleaning service has been successfully booked
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Booking Details
              </h2>
              <div className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Booking Number:</span>
                  <span className="font-mono text-[#1E3D8F] font-bold">{booking.bookingNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Name:</span>
                  <span>{booking.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Address:</span>
                  <span className="text-right max-w-xs">{booking.propertyAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Service:</span>
                  <span className="capitalize">{booking.serviceType.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Hours:</span>
                  <span>{booking.hours} hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Date:</span>
                  <span>{new Date(booking.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Time:</span>
                  <span className="capitalize">{booking.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Total Price:</span>
                  <span className="font-semibold">${booking.finalPrice.toFixed(2)}</span>
                </div>
                {booking.extras && booking.extras.length > 0 && (
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Extras:</span>
                    <span className="text-right max-w-xs">
                      {Array.isArray(booking.extras) ? booking.extras.join(', ') : 'Selected'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-800 mb-2">What&apos;s Next?</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• We&apos;ll send you a confirmation email shortly</li>
                <li>• Our team will contact you within 24 hours to confirm details</li>
                <li>• Please save your booking number for reference</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Link
                href="/services/airbnb-cleaning"
                className="inline-block bg-[#1E3D8F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
              >
                Back to Airbnb Cleaning
              </Link>
              <div className="text-sm text-gray-500">
                Need help? Call us at{' '}
                <a href="tel:0450124086" className="text-[#1E3D8F] font-semibold">
                  0450 124 086
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
