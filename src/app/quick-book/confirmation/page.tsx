'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, DollarSign, Tag, Share2, Download, Phone, User, MapPin, Calendar, Clock } from 'lucide-react';
import { useBookingStore } from '../store/bookingStore';
import type { BookingConfirmation } from '../types/confirmation';
import type { CustomerDetails, Address } from '../types/details';

export default function ConfirmationPage() {
    const router = useRouter();
    const [bookingDetails, setBookingDetails] = useState<BookingConfirmation | null>(null);
    const resetBooking = useBookingStore(state => state.resetBooking);
    const [redirectTimer, setRedirectTimer] = useState(20);

    // Move handlers before useEffect
    const handleReturnHome = useCallback(() => {
        localStorage.removeItem('bookingConfirmation');
        resetBooking();
        router.push('/');
    }, [resetBooking, router]);

    const handleBookNext = () => {
        // Clear localStorage
        localStorage.removeItem('bookingConfirmation');
        // Reset Zustand store
        resetBooking();
        // Navigate to service selection
        router.push('/quick-book/service');
    };

    const handlePrint = () => {
        window.print();
    };

    const handleShare = async () => {
        if (!bookingDetails) return;
        
        try {
            await navigator.share({
                title: 'Booking Confirmation',
                text: `Booking #${bookingDetails.bookingNumber} confirmed!`,
                url: window.location.href
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    useEffect(() => {
        const confirmationData = localStorage.getItem('bookingConfirmation');
        const store = useBookingStore.getState();
        
        if (confirmationData) {
            const parsedConfirmation = JSON.parse(confirmationData);
            const customerDetails: CustomerDetails = store.customerDetails || {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: {
                    street: '',
                    suburb: '',
                    postcode: '',
                    state: 'VIC', // Default state
                    unit: '',
                    instructions: ''
                },
                date: new Date().toISOString(),
                time: 'morning',  // Default time slot
                isFlexibleDate: false,
                isFlexibleTime: false
            };
            
            // Type the address properly
            const formatAddress = (addr: Address) => {
                if (!addr) return 'N/A';
                const parts = [
                    addr.unit ? `Unit ${addr.unit}` : '',
                    addr.street,
                    addr.suburb,
                    addr.state,
                    addr.postcode,
                    addr.instructions ? `(${addr.instructions})` : ''
                ].filter(Boolean).join(', ');
                return parts || 'N/A';
            };

            setBookingDetails({
                ...parsedConfirmation,
                customer: {
                    firstName: customerDetails.firstName || 'N/A',
                    lastName: customerDetails.lastName || 'N/A',
                    phone: customerDetails.phone || 'N/A',
                    address: formatAddress(customerDetails.address)
                },
                scheduling: {
                    date: customerDetails.date || new Date().toISOString(),
                    time: customerDetails.time || 'morning',
                    isFlexibleDate: customerDetails.isFlexibleDate || false,
                    isFlexibleTime: customerDetails.isFlexibleTime || false
                }
            });
        }

        // Set up redirect timer
        const timer = setInterval(() => {
            setRedirectTimer((prev) => prev - 1);
        }, 1000);

        // Redirect after 20 seconds
        const redirect = setTimeout(() => {
            handleReturnHome();
        }, 20000);

        // Cleanup
        return () => {
            clearInterval(timer);
            clearTimeout(redirect);
        };
    }, [handleReturnHome]);

    if (!bookingDetails) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-2 sm:p-4">
            {/* Success Banner */}
            <div className="bg-white rounded-t-xl shadow-sm border border-gray-200 p-4 sm:p-8 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-100 mb-3 sm:mb-4">
                    <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    Booking Confirmed!
                </h1>
                <div className="space-y-2 sm:space-y-3">
                    <div className="bg-gray-50 rounded-lg py-2 px-3 sm:px-4 inline-block">
                        <p className="text-sm sm:text-base text-gray-600 font-medium">
                            Booking Reference: <span className="text-[#1E3D8F] font-bold">{bookingDetails.bookingNumber}</span>
                        </p>
                    </div>
                    <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                        <div className="px-4 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800 min-w-[120px]">
                            Status: Booked
                        </div>
                        <div className="px-4 py-1.5 rounded-full text-sm font-medium bg-yellow-50 border border-yellow-200 text-yellow-700 min-w-[160px]">
                            Confirmation: Pending
                        </div>
                    </div>
                </div>
            </div>

            {/* Service Details */}
            <div className="bg-white shadow-sm border border-gray-200 p-4 sm:p-6 mt-2 sm:mt-4 rounded-xl">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Service Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="flex items-start space-x-3">
                        <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E3D8F] mt-1" />
                        <div>
                            <p className="text-xs sm:text-sm text-gray-500">Service Type</p>
                            <p className="text-sm sm:text-base font-medium text-gray-900 capitalize">
                                {bookingDetails.serviceType.replace('-', ' ')}
                            </p>
                        </div>
                    </div>
                    {/* Only show price if it exists and is greater than 0 */}
                    {(bookingDetails.totalPrice !== undefined && bookingDetails.totalPrice > 0) && (
                        <div className="flex items-start space-x-3">
                            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E3D8F] mt-1" />
                            <div>
                                <p className="text-xs sm:text-sm text-gray-500">Total Amount</p>
                                <p className="text-sm sm:text-base font-medium text-gray-900">
                                    ${bookingDetails.totalPrice.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Customer Details */}
            <div className="bg-white shadow-sm border border-gray-200 p-4 sm:p-6 mt-2 sm:mt-4 rounded-xl">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Customer Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="flex items-start space-x-3">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E3D8F] mt-1" />
                        <div>
                            <p className="text-xs sm:text-sm text-gray-500">Name</p>
                            <p className="text-sm sm:text-base font-medium text-gray-900">
                                {bookingDetails.customer.firstName} {bookingDetails.customer.lastName}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E3D8F] mt-1" />
                        <div>
                            <p className="text-xs sm:text-sm text-gray-500">Phone</p>
                            <p className="text-sm sm:text-base font-medium text-gray-900">{bookingDetails.customer.phone}</p>
                        </div>
                    </div>
                    <div className="md:col-span-2 flex items-start space-x-3">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E3D8F] mt-1" />
                        <div>
                            <p className="text-xs sm:text-sm text-gray-500">Address</p>
                            <p className="text-sm sm:text-base font-medium text-gray-900">{bookingDetails.customer.address}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scheduling Details */}
            <div className="bg-white shadow-sm border border-gray-200 p-4 sm:p-6 mt-2 sm:mt-4 rounded-xl">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Schedule</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-3">
                        <Calendar className="w-5 h-5 text-[#1E3D8F] mt-1" />
                        <div>
                            <p className="text-sm text-gray-500">Date</p>
                            <p className="font-medium text-gray-900">
                                {new Date(bookingDetails.scheduling.date).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                                {bookingDetails.scheduling.isFlexibleDate && " (Flexible)"}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <Clock className="w-5 h-5 text-[#1E3D8F] mt-1" />
                        <div>
                            <p className="text-sm text-gray-500">Time</p>
                            <p className="font-medium text-gray-900">
                                {bookingDetails.scheduling.time}
                                {bookingDetails.scheduling.isFlexibleTime && " (Flexible)"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="bg-white shadow-sm border border-gray-200 p-4 sm:p-6 mt-2 sm:mt-4 rounded-xl">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <button
                        onClick={handlePrint}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2.5 border border-[#1E3D8F] rounded-md shadow-sm text-sm font-medium text-[#1E3D8F] bg-white hover:bg-[#1E3D8F]/5"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Save Confirmation
                    </button>
                    <button
                        onClick={handleShare}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2.5 border border-[#1E3D8F] rounded-md shadow-sm text-sm font-medium text-[#1E3D8F] bg-white hover:bg-[#1E3D8F]/5"
                    >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Booking
                    </button>
                </div>
            </div>

            {/* Next Steps */}
            <div className="bg-white shadow-sm border border-gray-200 p-6 mt-4 rounded-xl">
                <div className="p-4 sm:p-8 bg-gradient-to-br from-gray-50 to-white">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Important Information</h3>
                    <div className="space-y-4 sm:space-y-6">
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#1E3D8F]/10 flex items-center justify-center">
                                <span className="text-[#1E3D8F] font-medium text-sm sm:text-base">1</span>
                            </div>
                            <div>
                                <p className="text-xs sm:text-sm font-medium text-gray-900">Booking Confirmation</p>
                                <p className="text-xs sm:text-sm text-gray-600">A detailed confirmation email has been sent to your registered email address</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#1E3D8F]/10 flex items-center justify-center">
                                <span className="text-[#1E3D8F] font-medium text-sm sm:text-base">2</span>
                            </div>
                            <div>
                                <p className="text-xs sm:text-sm font-medium text-gray-900">Service Coordination</p>
                                <p className="text-xs sm:text-sm text-gray-600">Our customer service team will contact you within 24 hours to confirm all service details</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#1E3D8F]/10 flex items-center justify-center">
                                <span className="text-[#1E3D8F] font-medium text-sm sm:text-base">3</span>
                            </div>
                            <div>
                                <p className="text-xs sm:text-sm font-medium text-gray-900">Booking Reference</p>
                                <p className="text-xs sm:text-sm text-gray-600">Keep your booking number {bookingDetails.bookingNumber} handy for easy reference in future communications</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Return Home and Book Next */}
            <div className="mt-6 sm:mt-8 text-center">
                {/* Add timer display */}
                <p className="text-sm text-gray-500 mb-4">
                    Redirecting to homepage in {redirectTimer} seconds...
                </p>
                
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
                    <button
                        onClick={handleReturnHome}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-[#1E3D8F] text-white rounded-lg shadow-lg hover:bg-[#1E3D8F]/90"
                    >
                        Return to Homepage
                    </button>
                    <button
                        onClick={handleBookNext}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border-2 border-[#1E3D8F] text-[#1E3D8F] rounded-lg shadow-lg hover:bg-[#1E3D8F]/5"
                    >
                        Book Next Service
                    </button>
                </div>
            </div>
        </div>
    );
} 