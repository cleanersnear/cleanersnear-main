'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import BookingSummary from '@/app/quick-book/components/layout/BookingSummary'
import { useBookingStore } from '@/store/bookingStore'
import { detailsService, TimeSlot, StateOptions, CustomerDetails } from '@/services/details'
import { bookingService } from '@/services/booking'
import { serviceManager } from '@/services/serviceManager'
import type { Address } from '@/store/bookingStore'  // Import Address type

export default function DetailsPage() {
    const router = useRouter()
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    
    const { details, updateDetails, location } = useBookingStore()

    // Initialize details with location data
    useEffect(() => {
        if (location && !details?.address.suburb) {
            updateDetails({
                address: {
                    street: '',
                    unit: '',
                    suburb: location.suburbName,
                    postcode: location.postcode,
                    state: 'VIC',
                    instructions: ''
                }
            })
        }
    }, [location, details, updateDetails])

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!details?.firstName?.trim()) {
            newErrors.firstName = 'First name is required'
        }
        if (!details?.email?.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(details.email)) {
            newErrors.email = 'Please enter a valid email'
        }
        if (!details?.phone?.trim()) {
            newErrors.phone = 'Phone number is required'
        }
        if (!details?.address?.street?.trim()) {
            newErrors.street = 'Street address is required'
        }
        if (!details?.date && !details?.isFlexibleDate) {
            newErrors.date = 'Please select a date or mark as flexible'
        }
        if (!details?.time && !details?.isFlexibleTime) {
            newErrors.time = 'Please select a time or mark as flexible'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async () => {
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        setError(null);

        try {
            const serviceData = serviceManager.getSelectedService();
            if (!serviceData) {
                throw new Error('No service selected');
            }

            if (!details) {
                throw new Error('No details available');
            }

            // First format the customer details to match CustomerDetails interface
            const customerDetails: CustomerDetails = {
                firstName: details.firstName,
                lastName: details.lastName,
                email: details.email,
                phone: details.phone,
                address: {
                    street: details.address.street,
                    unit: details.address.unit,
                    suburb: details.address.suburb,
                    postcode: details.address.postcode,
                    state: details.address.state as StateOptions,
                    instructions: details.address.instructions
                },
                date: details.date,
                time: details.time as TimeSlot,
                isFlexibleDate: details.isFlexibleDate,
                isFlexibleTime: details.isFlexibleTime
            };

            // Save customer details
            const saveResponse = await detailsService.submit(customerDetails);

            if (!saveResponse.success) {
                throw new Error(saveResponse.message);
            }

            // Submit booking with properly typed data
            const bookingResponse = await bookingService.submitBooking({
                customer: customerDetails,
                booking: {
                    ...customerDetails,
                    totalPrice: serviceData.price
                },
                serviceDetails: serviceData
            });
            
            if (bookingResponse.success) {
                router.push('/quick-book/confirmation');
            } else {
                throw new Error(bookingResponse.message || 'Failed to create booking');
            }

        } catch (error) {
            console.error('Submission error:', error);
            setError(error instanceof Error ? error.message : 'Failed to submit booking');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        updateDetails({ [field]: value })
    }

    const handleToggleChange = (field: string, value: boolean) => {
        updateDetails({ [field]: value })
    }

    const handleAddressChange = (field: string, value: string) => {
        if (!details?.address) return;
        
        const updatedAddress: Address = {
            street: details.address.street || '',
            suburb: details.address.suburb || '',
            postcode: details.address.postcode || '',
            state: details.address.state || '',
            unit: details.address.unit,
            instructions: details.address.instructions,
            [field]: value
        };

        updateDetails({
            address: updatedAddress
        });
    }

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
                                    value={details?.firstName || ''}
                                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                                    className={`w-full px-4 py-2 rounded-lg border ${
                                        errors.firstName ? 'border-red-500' : 'border-gray-200'
                                    } focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20 outline-none`}
                                />
                                {errors.firstName && (
                                    <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    value={details?.lastName || ''}
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
                                    value={details?.email || ''}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className={`w-full px-4 py-2 rounded-lg border ${
                                        errors.email ? 'border-red-500' : 'border-gray-200'
                                    } focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20 outline-none`}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    value={details?.phone || ''}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    className={`w-full px-4 py-2 rounded-lg border ${
                                        errors.phone ? 'border-red-500' : 'border-gray-200'
                                    } focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20 outline-none`}
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Address Section */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <h2 className="text-xl font-semibold mb-6">Property Address</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Street Address *
                                    </label>
                                    <input
                                        type="text"
                                        value={details?.address.street || ''}
                                        onChange={(e) => handleAddressChange('street', e.target.value)}
                                        className={`w-full px-4 py-2 rounded-lg border ${
                                            errors.street ? 'border-red-500' : 'border-gray-200'
                                        } focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20 outline-none`}
                                        placeholder="Enter street address"
                                    />
                                    {errors.street && (
                                        <p className="mt-1 text-sm text-red-500">{errors.street}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Unit/Apartment Number
                                    </label>
                                    <input
                                        type="text"
                                        value={details?.address.unit || ''}
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
                                        value={details?.address.suburb || ''}
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
                                        value={details?.address.postcode || ''}
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
                                        value={details?.address.state || ''}
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
                                    value={details?.address.instructions || ''}
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
                                    value={details?.date || ''}
                                    onChange={(e) => handleInputChange('date', e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                    className={`w-full px-4 py-2 rounded-lg border ${
                                        errors.date ? 'border-red-500' : 'border-gray-200'
                                    } focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20 outline-none`}
                                />
                                <div className="flex items-center justify-between pt-2">
                                    <span className="text-sm text-gray-600">I&apos;m flexible with dates</span>
                                    <button
                                        type="button"
                                        onClick={() => handleToggleChange('isFlexibleDate', !details?.isFlexibleDate)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                            ${details?.isFlexibleDate ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                                ${details?.isFlexibleDate ? 'translate-x-6' : 'translate-x-1'}`}
                                        />
                                    </button>
                                </div>
                                {errors.date && (
                                    <p className="mt-1 text-sm text-red-500">{errors.date}</p>
                                )}
                            </div>
                            
                            {/* Time Selection */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Preferred Time
                                </label>
                                <select
                                    value={details?.time || ''}
                                    onChange={(e) => handleInputChange('time', e.target.value)}
                                    className={`w-full px-4 py-2 rounded-lg border ${
                                        errors.time ? 'border-red-500' : 'border-gray-200'
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
                                        onClick={() => handleToggleChange('isFlexibleTime', !details?.isFlexibleTime)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                            ${details?.isFlexibleTime ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                                ${details?.isFlexibleTime ? 'translate-x-6' : 'translate-x-1'}`}
                                        />
                                    </button>
                                </div>
                                {errors.time && (
                                    <p className="mt-1 text-sm text-red-500">{errors.time}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Submit Button with Loading State */}
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={`w-full py-4 px-6 rounded-lg font-medium
                            ${isSubmitting 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-[#1E3D8F] hover:bg-[#1E3D8F]/90'
                            } text-white transition-colors`}
                    >
                        <div className="flex items-center justify-center gap-2">
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Saving booking...</span>
                                </>
                            ) : (
                                <>
                                    <span>Proceed to Confirmation</span>
                                </>
                            )}
                        </div>
                    </button>

                    {/* Error Message */}
                    {error && (
                        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg 
                            flex items-center gap-2 text-red-600">
                            <AlertCircle className="w-5 h-5" />
                            <p>{error}</p>
                        </div>
                    )}
                </motion.div>
            </div>
            <BookingSummary />
        </div>
    )
} 