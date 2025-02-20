'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useBookingStore } from '../store/bookingStore'
import type { 
     
    DetailsFormState,
    Address,    
    StateOption     
    
} from '../types/details'

import { BookingService } from '../types/booking/booking'

export default function DetailsPage() {
    const router = useRouter()
    
    const customerDetails = useBookingStore(state => state.customerDetails)
    const selectedLocation = useBookingStore(state => state.selectedLocation)
    const selectedService = useBookingStore(state => state.selectedService)
    
    const updateCustomerDetails = useBookingStore(state => state.updateCustomerDetails)
    const isCommercialService = selectedService?.type === 'commercial-cleaning'
    
    const [formState, setFormState] = useState<DetailsFormState>({
        details: null,
        errors: {},
        isSubmitting: false,
        submitError: null
    })

    const initializeAddress = useCallback(() => {
        if (selectedLocation && !customerDetails?.address?.suburb) {
            updateCustomerDetails({
                address: {
                    street: '',
                    unit: '',
                    suburb: selectedLocation.name,
                    postcode: selectedLocation.postcode,
                    state: 'VIC' as StateOption,
                    instructions: ''
                }
            })
        }
    }, [selectedLocation, customerDetails?.address?.suburb, updateCustomerDetails])

    useEffect(() => {
        initializeAddress()
    }, [initializeAddress])

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!customerDetails?.firstName?.trim()) {
            newErrors.firstName = 'First name is required'
        }
        if (!customerDetails?.email?.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(customerDetails.email)) {
            newErrors.email = 'Please enter a valid email'
        }
        if (!customerDetails?.phone?.trim()) {
            newErrors.phone = 'Phone number is required'
        }
        if (!customerDetails?.address?.street?.trim()) {
            newErrors.street = 'Street address is required'
        }
        if (!customerDetails?.date && !customerDetails?.isFlexibleDate) {
            newErrors.date = 'Please select a date or mark as flexible'
        }
        if (!customerDetails?.time && !customerDetails?.isFlexibleTime) {
            newErrors.time = 'Please select a time or mark as flexible'
        }

        setFormState(prev => ({ ...prev, errors: newErrors }))
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async () => {
        // Step 1: Form validation
        if (!validateForm()) return

        // Step 2: Set loading state
        setFormState(prev => ({
            ...prev,
            isSubmitting: true,
            submitError: null
        }))

        try {
            // Step 3: Save to store and localStorage
            if (customerDetails) {
                updateCustomerDetails(customerDetails)
                localStorage.setItem('customerDetails', JSON.stringify(customerDetails))
            }

            // Step 4: Just call submitBooking
            const response = await BookingService.submitBooking()

            // Step 5: Handle response
            if (response.success) {
                localStorage.setItem('bookingId', response.bookingId!)
                router.push('/quick-book/confirmation')
                 // Missing: Update currentStep before navigation
                useBookingStore.getState().setCurrentStep('confirmation')
            }

        } catch (error) {
            console.error('Booking error:', error)
            setFormState(prev => ({
                ...prev,
                isSubmitting: false,
                submitError: error instanceof Error ? error.message : 'Failed to create booking'
            }))
        }
    }

    const handleInputChange = useCallback((field: string, value: string) => {
        updateCustomerDetails({ [field]: value })
    }, [updateCustomerDetails])

    const handleToggleChange = useCallback((field: string, value: boolean) => {
        updateCustomerDetails({ [field]: value })
    }, [updateCustomerDetails])

    const handleAddressChange = useCallback((field: string, value: string) => {
        if (!customerDetails?.address) return
        
        const updatedAddress: Address = {
            street: customerDetails.address.street || '',
            suburb: customerDetails.address.suburb || '',
            postcode: customerDetails.address.postcode || '',
            state: customerDetails.address.state || '',
            unit: customerDetails.address.unit,
            instructions: customerDetails.address.instructions,
            [field]: value
        }

        updateCustomerDetails({
            address: updatedAddress
        })
    }, [customerDetails?.address, updateCustomerDetails])

    const getValidationErrors = () => {
        const errors = [];
        if (formState.errors.firstName) errors.push('First name is required');
        if (formState.errors.email) errors.push(formState.errors.email);
        if (formState.errors.phone) errors.push('Phone number is required');
        if (formState.errors.street) errors.push('Street address is required');
        if (formState.errors.date) errors.push('Please select a date or mark as flexible');
        if (formState.errors.time) errors.push('Please select a time or mark as flexible');
        return errors;
    };

    return (
        <div className="flex">
            <div className="flex-1 mr-auto max-w-2xl py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    {/* Contact Information */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name *
                                </label>
                                <input
                                    type="text"
                                    value={customerDetails?.firstName || ''}
                                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                                    className={`w-full px-4 py-2 rounded-lg border ${
                                        formState.errors.firstName ? 'border-red-500' : 'border-gray-200'
                                    } focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20 outline-none`}
                                />
                                {formState.errors.firstName && (
                                    <p className="mt-1 text-sm text-red-500">{formState.errors.firstName}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    value={customerDetails?.lastName || ''}
                                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 
                                        focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    value={customerDetails?.email || ''}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className={`w-full px-4 py-2 rounded-lg border ${
                                        formState.errors.email ? 'border-red-500' : 'border-gray-200'
                                    } focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20 outline-none`}
                                />
                                {formState.errors.email && (
                                    <p className="mt-1 text-sm text-red-500">{formState.errors.email}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    value={customerDetails?.phone || ''}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    className={`w-full px-4 py-2 rounded-lg border ${
                                        formState.errors.phone ? 'border-red-500' : 'border-gray-200'
                                    } focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20 outline-none`}
                                />
                                {formState.errors.phone && (
                                    <p className="mt-1 text-sm text-red-500">{formState.errors.phone}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Address Section */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <h2 className="text-xl font-semibold mb-6">
                            {isCommercialService ? 'Company Address' : 'Property Address'}
                        </h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Street Address *
                                    </label>
                                    <input
                                        type="text"
                                        value={customerDetails?.address.street || ''}
                                        onChange={(e) => handleAddressChange('street', e.target.value)}
                                        className={`w-full px-4 py-2 rounded-lg border ${
                                            formState.errors.street ? 'border-red-500' : 'border-gray-200'
                                        } focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20 outline-none`}
                                        placeholder="Enter street address"
                                    />
                                    {formState.errors.street && (
                                        <p className="mt-1 text-sm text-red-500">{formState.errors.street}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Unit/Apartment Number
                                    </label>
                                    <input
                                        type="text"
                                        value={customerDetails?.address.unit || ''}
                                        onChange={(e) => handleAddressChange('unit', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 
                                            focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20 outline-none"
                                        placeholder="Optional"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Suburb *
                                    </label>
                                    <input
                                        type="text"
                                        value={customerDetails?.address.suburb || ''}
                                        readOnly
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 
                                            bg-gray-50 cursor-not-allowed
                                            focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Postcode *
                                    </label>
                                    <input
                                        type="text"
                                        value={customerDetails?.address.postcode || ''}
                                        readOnly
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 
                                            bg-gray-50 cursor-not-allowed
                                            focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        State *
                                    </label>
                                    <select
                                        value={customerDetails?.address.state || ''}
                                        onChange={(e) => handleAddressChange('state', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 
                                            focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20 outline-none"
                                    >
                                        <option value="VIC">VIC</option>
                                        <option value="NSW">NSW</option>
                                        <option value="QLD">QLD</option>
                                        <option value="WA">WA</option>
                                        <option value="SA">SA</option>
                                        <option value="TAS">TAS</option>
                                        <option value="ACT">ACT</option>
                                        <option value="NT">NT</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Access Instructions
                                </label>
                                <textarea
                                    value={customerDetails?.address.instructions || ''}
                                    onChange={(e) => handleAddressChange('instructions', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 
                                        focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20 outline-none"
                                    placeholder="Any specific instructions for accessing the property"
                                    rows={3}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Schedule Section */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <h2 className="text-xl font-semibold mb-6">Schedule</h2>
                        <div className="space-y-6">
                            {/* Date Selection */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Preferred Date
                                </label>
                                <input
                                    type="date"
                                    value={customerDetails?.date || ''}
                                    onChange={(e) => handleInputChange('date', e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                    className={`w-full px-4 py-2 rounded-lg border ${
                                        formState.errors.date ? 'border-red-500' : 'border-gray-200'
                                    } focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20 outline-none`}
                                />
                                <div className="flex items-center justify-between pt-2">
                                    <span className="text-sm text-gray-600">I&apos;m flexible with dates</span>
                                    <button
                                        type="button"
                                        onClick={() => handleToggleChange('isFlexibleDate', !customerDetails?.isFlexibleDate)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                            ${customerDetails?.isFlexibleDate ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                                ${customerDetails?.isFlexibleDate ? 'translate-x-6' : 'translate-x-1'}`}
                                        />
                                    </button>
                                </div>
                                {formState.errors.date && (
                                    <p className="mt-1 text-sm text-red-500">{formState.errors.date}</p>
                                )}
                            </div>
                            
                            {/* Time Selection */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Preferred Time
                                </label>
                                <select
                                    value={customerDetails?.time || ''}
                                    onChange={(e) => handleInputChange('time', e.target.value)}
                                    className={`w-full px-4 py-2 rounded-lg border ${
                                        formState.errors.time ? 'border-red-500' : 'border-gray-200'
                                    } focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20 outline-none`}
                                >
                                    <option value="morning">Morning (8am - 12pm)</option>
                                    <option value="afternoon">Afternoon (12pm - 4pm)</option>
                                    <option value="evening">Evening (4pm - 8pm)</option>
                                </select>
                                <div className="flex items-center justify-between pt-2">
                                    <span className="text-sm text-gray-600">I&apos;m flexible with time</span>
                                    <button
                                        type="button"
                                        onClick={() => handleToggleChange('isFlexibleTime', !customerDetails?.isFlexibleTime)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                            ${customerDetails?.isFlexibleTime ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                                ${customerDetails?.isFlexibleTime ? 'translate-x-6' : 'translate-x-1'}`}
                                        />
                                    </button>
                                </div>
                                {formState.errors.time && (
                                    <p className="mt-1 text-sm text-red-500">{formState.errors.time}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Add this before the Submit Button */}
                    {Object.keys(formState.errors).length > 0 && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center gap-2 text-red-600 mb-2">
                                <AlertCircle className="w-5 h-5" />
                                <p className="font-medium">Please fix the following errors:</p>
                            </div>
                            <ul className="list-disc list-inside text-red-600 text-sm space-y-1">
                                {getValidationErrors().map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={formState.isSubmitting}
                        className={`w-full py-4 px-6 rounded-lg font-medium
                            ${formState.isSubmitting 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-[#1E3D8F] hover:bg-[#1E3D8F]/90'
                            } text-white transition-colors`}
                    >
                        <div className="flex items-center justify-center gap-2">
                            {formState.isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Saving booking...</span>
                                </>
                            ) : (
                                <span>Proceed to Confirmation</span>
                            )}
                        </div>
                    </button>

                    {/* Existing Error Message */}
                    {formState.submitError && (
                        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg 
                            flex items-center gap-2 text-red-600">
                            <AlertCircle className="w-5 h-5" />
                            <p>{formState.submitError}</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    )
} 