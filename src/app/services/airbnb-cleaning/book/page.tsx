'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'

// Extend Window interface for Google Maps
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any
    __googleMapsLoaded: boolean
    __googleMapsLoading: boolean
  }
}

export default function AirbnbCleaningBooking() {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingNumber, setBookingNumber] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const addressInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    // Step 1: Property Address
    propertyAddress: '',
    
    // Step 2: Service Type
    serviceType: '',
    
    // Step 3: Hours
    hours: '',
    customHours: '',
    
    // Step 4: Personal Details
    name: '',
    email: '',
    phone: '',
    
    // Step 5: Property Details
    bedrooms: '',
    bathrooms: '',
    toilets: '',
    
    // Step 6: Date & Time
    date: '',
    time: '',
    
    // Step 7: Extras
    extras: [] as string[]
  })



  const extras = [
    'Fresh Toilet Rolls',
    'New Facewashers',
    'Fresh Shampoo and Soap/Body Wash',
    'Linen Replacement or Laundry',
    'Tea Bags and Coffee Packets',
    'Toothpaste and Toothbrush Replacement',
    'Paper Towel',
    'Tissue Boxes'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleExtraChange = (extra: string) => {
    setFormData(prev => ({
      ...prev,
      extras: prev.extras.includes(extra)
        ? prev.extras.filter(e => e !== extra)
        : [...prev.extras, extra]
    }))
  }

                const nextStep = () => {
                // Validate current step before proceeding
                if (currentStep === 1 && !formData.propertyAddress.trim()) {
                  alert('Please enter your property address')
                  return
                }
                if (currentStep === 2 && !formData.serviceType) {
                  alert('Please select a service type')
                  return
                }
                if (currentStep === 3 && !formData.hours) {
                  alert('Please select the number of hours')
                  return
                }
                if (currentStep === 4) {
                  // Validate required fields before submitting
                  if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
                    alert('Please fill in all required fields (Name, Email, Phone)')
                    return
                  }
                  // Submit basic booking details on step 4 (property details will be added later)
                  submitBasicBooking()
                } else if (currentStep === 5) {
                  // Validate property details
                  if (!formData.bedrooms || !formData.bathrooms || !formData.toilets) {
                    alert('Please fill in all property details')
                    return
                  }
                  // Update the booking with property details
                  updateBookingWithPropertyDetails()
                } else if (currentStep === 6) {
                  // Validate date and time
                  if (!formData.date || !formData.time) {
                    alert('Please select both date and time')
                    return
                  }
                  setCurrentStep(currentStep + 1)
                } else if (currentStep === 7) {
                  // Submit extras on step 7
                  submitExtras()
                } else if (currentStep < 7) {
                  setCurrentStep(currentStep + 1)
                }
              }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Initialize Google Places Autocomplete
  useEffect(() => {
    // Global script loading state
    if (typeof window !== 'undefined') {
      if (!window.__googleMapsLoaded) {
        window.__googleMapsLoaded = false
      }
      if (!window.__googleMapsLoading) {
        window.__googleMapsLoading = false
      }
    }

    const loadGooglePlacesScript = () => {
      // If already loaded, just initialize
      if (window.__googleMapsLoaded && window.google && window.google.maps && window.google.maps.places) {
        initializeAutocomplete()
        return
      }

      // If already loading, wait for it
      if (window.__googleMapsLoading) {
        const checkLoaded = setInterval(() => {
          if (window.__googleMapsLoaded && window.google && window.google.maps && window.google.maps.places) {
            clearInterval(checkLoaded)
            initializeAutocomplete()
          }
        }, 100)
        return
      }

      // Check if script tag already exists
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]')
      if (existingScript) {
        window.__googleMapsLoading = true
        // Wait for existing script to load
        const checkLoaded = setInterval(() => {
          if (window.google && window.google.maps && window.google.maps.places) {
            clearInterval(checkLoaded)
            window.__googleMapsLoaded = true
            window.__googleMapsLoading = false
            initializeAutocomplete()
          }
        }, 100)
        return
      }

      // Load new script
      window.__googleMapsLoading = true
      const scriptElement = document.createElement('script')
      scriptElement.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
      scriptElement.async = true
      scriptElement.defer = true
      scriptElement.onload = () => {
        window.__googleMapsLoaded = true
        window.__googleMapsLoading = false
        initializeAutocomplete()
      }
      scriptElement.onerror = () => {
        console.warn('Google Places API failed to load. Using fallback address input.')
        window.__googleMapsLoading = false
      }
      document.head.appendChild(scriptElement)
    }

    const initializeAutocomplete = () => {
      try {
        if (addressInputRef.current && window.google && window.google.maps && window.google.maps.places) {
          const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
            types: ['address'],
            componentRestrictions: { country: 'au' },
            fields: ['formatted_address', 'geometry', 'address_components']
          })

          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace()
            if (place.formatted_address) {
              setFormData(prev => ({
                ...prev,
                propertyAddress: place.formatted_address
              }))
            }
          })
        }
      } catch (error) {
        console.warn('Google Places Autocomplete failed to initialize:', error)
        // Fallback to regular input - no autocomplete but still functional
      }
    }

    // Only load if API key is available
    if (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      loadGooglePlacesScript()
    } else {
      console.warn('Google Maps API key not found. Address autocomplete disabled.')
    }
  }, [])

                // Submit basic booking details (Step 4)
              const submitBasicBooking = async () => {
                setIsSubmitting(true)
                try {
                  console.log('Submitting basic booking with data:', {
                    propertyAddress: formData.propertyAddress,
                    serviceType: formData.serviceType,
                    hours: formData.hours,
                    customHours: formData.customHours,
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    bedrooms: formData.bedrooms,
                    bathrooms: formData.bathrooms,
                    toilets: formData.toilets,
                    date: formData.date,
                    time: formData.time
                  })

                  const requestBody = {
                    propertyAddress: formData.propertyAddress,
                    serviceType: formData.serviceType,
                    hours: formData.hours,
                    customHours: formData.customHours,
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    bedrooms: formData.bedrooms,
                    bathrooms: formData.bathrooms,
                    toilets: formData.toilets,
                    date: formData.date,
                    time: formData.time
                  }

                  const response = await fetch('/api/services/airbnbcleaning/submit-basic', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody)
                  })

                  console.log('Response status:', response.status)
                  console.log('Response headers:', Object.fromEntries(response.headers.entries()))

                  if (!response.ok) {
                    const errorText = await response.text()
                    console.error('Response error text:', errorText)
                    throw new Error(`HTTP ${response.status}: ${errorText}`)
                  }

                  const data = await response.json()
                  console.log('Response data:', data)
                  
                  if (data.success) {
                    setBookingNumber(data.bookingNumber)
                    setCurrentStep(5) // Move to next step
                  } else {
                    // Show detailed error information
                    let errorMessage = `Error submitting booking: ${data.message}`
                    
                    if (data.error) {
                      errorMessage += `\n\nDetails: ${data.error.message}`
                      if (data.error.hint) {
                        errorMessage += `\nHint: ${data.error.hint}`
                      }
                      if (data.error.code) {
                        errorMessage += `\nError Code: ${data.error.code}`
                      }
                      if (data.error.table) {
                        errorMessage += `\nTable: ${data.error.table}`
                      }
                      if (data.error.column) {
                        errorMessage += `\nColumn: ${data.error.column}`
                      }
                    }
                    
                    console.error('Booking submission error details:', data)
                    alert(errorMessage)
                  }
                } catch (error) {
                  console.error('Error submitting basic booking:', error)
                  alert(`Error submitting booking: ${error instanceof Error ? error.message : 'Unknown error'}`)
                } finally {
                  setIsSubmitting(false)
                }
              }

                // Update booking with property details (Step 5)
              const updateBookingWithPropertyDetails = async () => {
                setIsSubmitting(true)
                try {
                  console.log('Updating booking with property details:', {
                    bookingNumber,
                    bedrooms: formData.bedrooms,
                    bathrooms: formData.bathrooms,
                    toilets: formData.toilets
                  })

                  const response = await fetch('/api/services/airbnbcleaning/update-property-details', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      bookingNumber,
                      bedrooms: formData.bedrooms,
                      bathrooms: formData.bathrooms,
                      toilets: formData.toilets
                    })
                  })

                  console.log('Property details response status:', response.status)

                  if (!response.ok) {
                    const errorText = await response.text()
                    console.error('Property details response error text:', errorText)
                    throw new Error(`HTTP ${response.status}: ${errorText}`)
                  }

                  const data = await response.json()
                  console.log('Property details response data:', data)
                  
                  if (data.success) {
                    setCurrentStep(currentStep + 1)
                  } else {
                    alert('Error updating property details: ' + data.message)
                  }
                } catch (error) {
                  console.error('Error updating property details:', error)
                  alert(`Error updating property details: ${error instanceof Error ? error.message : 'Unknown error'}`)
                } finally {
                  setIsSubmitting(false)
                }
              }

              // Submit extras and complete booking (Step 7)
              const submitExtras = async () => {
                setIsSubmitting(true)
                try {
                  console.log('Submitting extras with data:', {
                    bookingNumber,
                    extras: formData.extras
                  })

                  const response = await fetch('/api/services/airbnbcleaning/submit-extras', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      bookingNumber,
                      extras: formData.extras,
                      date: formData.date,
                      time: formData.time
                    })
                  })

                  console.log('Extras response status:', response.status)

                  if (!response.ok) {
                    const errorText = await response.text()
                    console.error('Extras response error text:', errorText)
                    throw new Error(`HTTP ${response.status}: ${errorText}`)
                  }

                  const data = await response.json()
                  console.log('Extras response data:', data)
                  
                  if (data.success) {
                    setShowConfirmation(true)
                  } else {
                    alert('Error completing booking: ' + data.message)
                  }
                } catch (error) {
                  console.error('Error submitting extras:', error)
                  alert(`Error completing booking: ${error instanceof Error ? error.message : 'Unknown error'}`)
                } finally {
                  setIsSubmitting(false)
                }
              }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // This will be handled by the individual step functions
  }

  const getDiscount = () => {
    if (formData.serviceType === 'weekly') return 15
    if (formData.serviceType === 'fortnightly') return 5
    return 0
  }

  const getHourlyRate = () => {
    return 49.89
  }

  const calculatePrice = (hours: number) => {
    const basePrice = hours * getHourlyRate()
    const discount = getDiscount()
    return basePrice * (1 - discount / 100)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#1E3D8F] mb-2">
                Let&apos;s start with your property address
              </h2>
              <p className="text-gray-600">
                We&apos;ll use this to provide you with accurate pricing and availability
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Address *
                </label>
                <input
                  ref={addressInputRef}
                  type="text"
                  name="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={handleInputChange}
                  placeholder="Start typing your address..."
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3D8F] text-lg"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Enter your complete property address for accurate pricing
                </p>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#1E3D8F] mb-2">
                Are you looking for recurring service or one time?
              </h2>
              <p className="text-gray-600">
                Choose the option that best fits your needs
              </p>
            </div>
            
            <div className="grid gap-4">
              <label className="relative">
                <input
                  type="radio"
                  name="serviceType"
                  value="one-time"
                  checked={formData.serviceType === 'one-time'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.serviceType === 'one-time' 
                    ? 'border-[#1E3D8F] bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">One Time Service</h3>
                      <p className="text-gray-600">Perfect for occasional cleaning needs</p>
                      <div className="mt-2 text-sm">
                        <span className="text-gray-500">Pricing: </span>
                        <span className="font-medium">$49.89/hour</span>
                      </div>
                    </div>
                    {formData.serviceType === 'one-time' && (
                      <Check className="w-6 h-6 text-[#1E3D8F]" />
                    )}
                  </div>
                </div>
              </label>
              
              <label className="relative">
                <input
                  type="radio"
                  name="serviceType"
                  value="weekly"
                  checked={formData.serviceType === 'weekly'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.serviceType === 'weekly' 
                    ? 'border-[#1E3D8F] bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">Weekly Service</h3>
                      <p className="text-gray-600">Regular cleaning every week</p>
                      <div className="mt-2 text-sm">
                        <span className="text-gray-500">Pricing: </span>
                        <span className="font-medium line-through text-gray-400">$49.89/hour</span>
                        <span className="font-medium text-green-600 ml-2">$42.41/hour</span>
                        <span className="text-green-600 font-medium ml-2">(15% off!)</span>
                      </div>
                    </div>
                    {formData.serviceType === 'weekly' && (
                      <Check className="w-6 h-6 text-[#1E3D8F]" />
                    )}
                  </div>
                </div>
              </label>
              
              <label className="relative">
                <input
                  type="radio"
                  name="serviceType"
                  value="fortnightly"
                  checked={formData.serviceType === 'fortnightly'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.serviceType === 'fortnightly' 
                    ? 'border-[#1E3D8F] bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">Fortnightly Service</h3>
                      <p className="text-gray-600">Cleaning every two weeks</p>
                      <div className="mt-2 text-sm">
                        <span className="text-gray-500">Pricing: </span>
                        <span className="font-medium line-through text-gray-400">$49.89/hour</span>
                        <span className="font-medium text-green-600 ml-2">$47.40/hour</span>
                        <span className="text-green-600 font-medium ml-2">(5% off!)</span>
                      </div>
                    </div>
                    {formData.serviceType === 'fortnightly' && (
                      <Check className="w-6 h-6 text-[#1E3D8F]" />
                    )}
                  </div>
                </div>
              </label>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#1E3D8F] mb-2">
                How many hours are we looking at?
              </h2>
              <p className="text-gray-600">
                {formData.serviceType === 'one-time' 
                  ? 'For one-time service, minimum is 3 hours'
                  : 'For regular service, minimum is 2 hours'
                }
              </p>
            </div>
            
            <div className="grid gap-4">
              {formData.serviceType === 'one-time' ? (
                <>
                  <label className="relative">
                    <input
                      type="radio"
                      name="hours"
                      value="3"
                      checked={formData.hours === '3'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.hours === '3' 
                        ? 'border-[#1E3D8F] bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-semibold">3 Hours (Minimum)</span>
                          <div className="text-sm text-gray-600 mt-1">
                            ${calculatePrice(3).toFixed(2)} total
                          </div>
                        </div>
                        {formData.hours === '3' && <Check className="w-5 h-5 text-[#1E3D8F]" />}
                      </div>
                    </div>
                  </label>
                  <label className="relative">
                    <input
                      type="radio"
                      name="hours"
                      value="4"
                      checked={formData.hours === '4'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.hours === '4' 
                        ? 'border-[#1E3D8F] bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-semibold">4 Hours</span>
                          <div className="text-sm text-gray-600 mt-1">
                            ${calculatePrice(4).toFixed(2)} total
                          </div>
                        </div>
                        {formData.hours === '4' && <Check className="w-5 h-5 text-[#1E3D8F]" />}
                      </div>
                    </div>
                  </label>
                  <label className="relative">
                    <input
                      type="radio"
                      name="hours"
                      value="custom"
                      checked={formData.hours === 'custom'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.hours === 'custom' 
                        ? 'border-[#1E3D8F] bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-semibold">Custom Hours (5-10 hours)</span>
                          <div className="text-sm text-gray-600 mt-1">
                            ${getHourlyRate()}/hour
                          </div>
                        </div>
                        {formData.hours === 'custom' && <Check className="w-5 h-5 text-[#1E3D8F]" />}
                      </div>
                    </div>
                  </label>
                  
                  {formData.hours === 'custom' && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Enter number of hours (5-10):
                      </label>
                      <input
                        type="number"
                        name="customHours"
                        value={formData.customHours}
                        onChange={handleInputChange}
                        min="5"
                        max="10"
                        placeholder="e.g., 6"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]"
                      />
                      {formData.customHours && (
                        <div className="text-sm text-gray-600 mt-2">
                          Total: ${calculatePrice(parseInt(formData.customHours)).toFixed(2)}
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <label className="relative">
                    <input
                      type="radio"
                      name="hours"
                      value="2"
                      checked={formData.hours === '2'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.hours === '2' 
                        ? 'border-[#1E3D8F] bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-semibold">2 Hours (Minimum)</span>
                          <div className="text-sm text-gray-600 mt-1">
                            ${calculatePrice(2).toFixed(2)} total
                          </div>
                        </div>
                        {formData.hours === '2' && <Check className="w-5 h-5 text-[#1E3D8F]" />}
                      </div>
                    </div>
                  </label>
                  <label className="relative">
                    <input
                      type="radio"
                      name="hours"
                      value="3"
                      checked={formData.hours === '3'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.hours === '3' 
                        ? 'border-[#1E3D8F] bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-semibold">3 Hours</span>
                          <div className="text-sm text-gray-600 mt-1">
                            ${calculatePrice(3).toFixed(2)} total
                          </div>
                        </div>
                        {formData.hours === '3' && <Check className="w-5 h-5 text-[#1E3D8F]" />}
                      </div>
                    </div>
                  </label>
                  <label className="relative">
                    <input
                      type="radio"
                      name="hours"
                      value="4"
                      checked={formData.hours === '4'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.hours === '4' 
                        ? 'border-[#1E3D8F] bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-semibold">4 Hours</span>
                          <div className="text-sm text-gray-600 mt-1">
                            ${calculatePrice(4).toFixed(2)} total
                          </div>
                        </div>
                        {formData.hours === '4' && <Check className="w-5 h-5 text-[#1E3D8F]" />}
                      </div>
                    </div>
                  </label>
                  <label className="relative">
                    <input
                      type="radio"
                      name="hours"
                      value="custom"
                      checked={formData.hours === 'custom'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.hours === 'custom' 
                        ? 'border-[#1E3D8F] bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-semibold">Custom Hours (5-10 hours)</span>
                          <div className="text-sm text-gray-600 mt-1">
                            ${getHourlyRate() * (1 - getDiscount() / 100)}/hour
                          </div>
                        </div>
                        {formData.hours === 'custom' && <Check className="w-5 h-5 text-[#1E3D8F]" />}
                      </div>
                    </div>
                  </label>
                  
                  {formData.hours === 'custom' && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Enter number of hours (5-10):
                      </label>
                      <input
                        type="number"
                        name="customHours"
                        value={formData.customHours}
                        onChange={handleInputChange}
                        min="5"
                        max="10"
                        placeholder="e.g., 6"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]"
                      />
                      {formData.customHours && (
                        <div className="text-sm text-gray-600 mt-2">
                          Total: ${calculatePrice(parseInt(formData.customHours)).toFixed(2)}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#1E3D8F] mb-2">
                Your Details
              </h2>
              <p className="text-gray-600">
                We&apos;ll use this to contact you about your booking
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3D8F] text-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3D8F] text-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3D8F] text-lg"
                />
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#1E3D8F] mb-2">
                Let&apos;s get some more details about your property
              </h2>
              <p className="text-gray-600">
                This helps us provide the most accurate service
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Bedrooms *
                </label>
                <select
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3D8F] text-lg"
                >
                  <option value="">Select</option>
                  <option value="studio">Studio</option>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4 Bedrooms</option>
                  <option value="5+">5+ Bedrooms</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Bathrooms *
                </label>
                <select
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3D8F] text-lg"
                >
                  <option value="">Select</option>
                  <option value="1">1 Bathroom</option>
                  <option value="2">2 Bathrooms</option>
                  <option value="3">3 Bathrooms</option>
                  <option value="4+">4+ Bathrooms</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Toilets *
                </label>
                <select
                  name="toilets"
                  value={formData.toilets}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3D8F] text-lg"
                >
                  <option value="">Select</option>
                  <option value="1">1 Toilet</option>
                  <option value="2">2 Toilets</option>
                  <option value="3">3 Toilets</option>
                  <option value="4+">4+ Toilets</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#1E3D8F] mb-2">
                What about the date you wanted cleaning?
              </h2>
              <p className="text-gray-600">
                Choose your preferred date and time
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3D8F] text-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time *
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3D8F] text-lg"
                >
                  <option value="">Select Time</option>
                  <option value="morning">Morning (8am - 12pm)</option>
                  <option value="afternoon">Afternoon (12pm - 4pm)</option>
                  <option value="evening">Evening (4pm - 8pm)</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#1E3D8F] mb-2">
                Are you interested in any extras to be included?
              </h2>
              <p className="text-gray-600">
                These are the most commonly requested extras
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {extras.map(extra => (
                <label key={extra} className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.extras.includes(extra)}
                    onChange={() => handleExtraChange(extra)}
                    className="mr-3 h-5 w-5 text-[#1E3D8F] focus:ring-[#1E3D8F] border-gray-300 rounded"
                  />
                  <span className="text-gray-700 font-medium">{extra}</span>
                </label>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                <span className="font-medium">Note:</span> Additional charges will be applied for selected extras. 
                We&apos;ll provide you with a detailed quote including these items.
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  // Confirmation page component
  if (showConfirmation) {
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
                    <span className="font-mono text-[#1E3D8F] font-bold">{bookingNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Name:</span>
                    <span>{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Address:</span>
                    <span className="text-right max-w-xs">{formData.propertyAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Service:</span>
                    <span className="capitalize">{formData.serviceType.replace('-', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Hours:</span>
                    <span>{formData.hours === 'custom' ? formData.customHours : formData.hours} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Date:</span>
                    <span>{new Date(formData.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Time:</span>
                    <span className="capitalize">{formData.time}</span>
                  </div>
                  {formData.extras.length > 0 && (
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Extras:</span>
                      <span className="text-right max-w-xs">
                        {formData.extras.join(', ')}
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/services/airbnb-cleaning"
              className="flex items-center text-[#1E3D8F] hover:text-opacity-80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Airbnb Cleaning
            </Link>
            <div className="text-right">
              <div className="text-sm text-gray-600">Need help?</div>
              <a href="tel:0450124086" className="text-[#1E3D8F] font-semibold">0450 124 086</a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep} of 7
              </span>
              <span className="text-sm text-gray-500">
                {Math.round((currentStep / 7) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[#1E3D8F] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 7) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Booking Number Display (if available) */}
          {bookingNumber && (
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-blue-800">Booking Number:</span>
                  <span className="ml-2 font-mono text-[#1E3D8F] font-bold">{bookingNumber}</span>
                </div>
                <div className="text-xs text-blue-600">
                  Basic details saved ✓
                </div>
              </div>
            </div>
          )}

          {/* Form Content */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit}>
              {renderStep()}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                    currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </button>
                
                {currentStep < 7 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={isSubmitting}
                    className="flex items-center bg-[#1E3D8F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={isSubmitting}
                    className="flex items-center bg-[#1E3D8F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Completing...
                      </>
                    ) : (
                      <>
                        Complete Booking
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Discount Banner */}
          {getDiscount() > 0 && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-green-800 font-medium">
                  You&apos;re saving {getDiscount()}% with {formData.serviceType} service!
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
