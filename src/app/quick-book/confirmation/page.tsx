'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, DollarSign, Tag, Share2, Download } from 'lucide-react';

interface BookingConfirmation {
    bookingId: string;
    bookingNumber: string;
    customerReference: string;
    serviceReference: string;
    status: string;
    totalPrice: number;
    createdAt: string;
    serviceType: string;
    suburb?: string;
    preferredDate?: string;
}

export default function ConfirmationPage() {
    const router = useRouter();
    const [bookingDetails, setBookingDetails] = useState<BookingConfirmation | null>(null);

    useEffect(() => {
        const confirmationData = localStorage.getItem('bookingConfirmation');
        const customerData = localStorage.getItem('customerDetails');
        const bookingDate = localStorage.getItem('selectedDate');

        if (confirmationData) {
            const parsedConfirmation = JSON.parse(confirmationData);
            const parsedCustomer = customerData ? JSON.parse(customerData) : null;
            
            setBookingDetails({
                ...parsedConfirmation,
                suburb: parsedCustomer?.address?.suburb || 'Not specified',
                preferredDate: bookingDate || parsedConfirmation.createdAt
            });
        }
    }, []);

    if (!bookingDetails) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const handlePrint = () => {
        window.print();
    };

    const handleShare = async () => {
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

    return (
        <div className="max-w-3xl mx-auto">
            {/* Success Banner */}
            <div className="bg-white rounded-t-xl shadow-sm border border-b-0 border-gray-200 p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Booking Confirmed!
                </h1>
                <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg py-2 px-4 inline-block">
                        <p className="text-gray-600 font-medium">
                            Booking Reference: <span className="text-[#1E3D8F] font-bold">{bookingDetails.bookingNumber}</span>
                        </p>
                    </div>
                    <div className="inline-flex items-center justify-center">
                        <div className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 capitalize">
                            Status: {bookingDetails.status}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-b-xl shadow-sm border border-gray-200 divide-y divide-gray-200">
                {/* Service Details */}
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Service Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start space-x-3">
                            <Tag className="w-5 h-5 text-[#1E3D8F] mt-1" />
                            <div>
                                <p className="text-sm text-gray-500">Service Type</p>
                                <p className="font-medium text-gray-900 capitalize">
                                    {bookingDetails.serviceType.replace('-', ' ')}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <DollarSign className="w-5 h-5 text-[#1E3D8F] mt-1" />
                            <div>
                                <p className="text-sm text-gray-500">Total Amount</p>
                                <p className="font-medium text-gray-900">
                                    ${bookingDetails.totalPrice.toFixed(2)}
                                </p>
                            </div>
                        </div>
                        {/*<div className="flex items-start space-x-3">
                            <MapPin className="w-5 h-5 text-[#1E3D8F] mt-1" />
                            <div>
                                <p className="text-sm text-gray-500">Location</p>
                                <p className="font-medium text-gray-900">
                                    {bookingDetails.suburb}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <Calendar className="w-5 h-5 text-[#1E3D8F] mt-1" />
                            <div>
                                <p className="text-sm text-gray-500">Preferred Date</p>
                                <p className="font-medium text-gray-900">
                                    {new Date(bookingDetails.preferredDate).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>*/}
                    </div>
                </div>

                {/* Actions */}
                <div className="p-6">
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={handlePrint}
                            className="inline-flex items-center px-6 py-2.5 border border-[#1E3D8F] rounded-md shadow-sm text-sm font-medium text-[#1E3D8F] bg-white hover:bg-[#1E3D8F]/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E3D8F] transition-colors duration-200"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Save Confirmation
                        </button>
                        <button
                            onClick={handleShare}
                            className="inline-flex items-center px-6 py-2.5 border border-[#1E3D8F] rounded-md shadow-sm text-sm font-medium text-[#1E3D8F] bg-white hover:bg-[#1E3D8F]/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E3D8F] transition-colors duration-200"
                        >
                            <Share2 className="w-4 h-4 mr-2" />
                            Share Booking
                        </button>
                    </div>
                </div>

                {/* Next Steps */}
                <div className="p-8 bg-gradient-to-br from-gray-50 to-white">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Information</h3>
                    <div className="space-y-6">
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1E3D8F]/10 flex items-center justify-center">
                                <span className="text-[#1E3D8F] font-medium">1</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Booking Confirmation</p>
                                <p className="text-sm text-gray-600">A detailed confirmation email has been sent to your registered email address</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1E3D8F]/10 flex items-center justify-center">
                                <span className="text-[#1E3D8F] font-medium">2</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Service Coordination</p>
                                <p className="text-sm text-gray-600">Our customer service team will contact you within 24 hours to confirm all service details</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1E3D8F]/10 flex items-center justify-center">
                                <span className="text-[#1E3D8F] font-medium">3</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Booking Reference</p>
                                <p className="text-sm text-gray-600">Keep your booking number {bookingDetails.bookingNumber} handy for easy reference in future communications</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Return Home */}
            <div className="mt-12 text-center space-y-4">
                <button
                    onClick={() => router.push('/')}
                    className="inline-flex items-center px-8 py-3 bg-[#1E3D8F] text-white rounded-lg shadow-lg hover:bg-[#1E3D8F]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E3D8F] transition-all duration-200 font-medium"
                >
                    <span>Return to Homepage</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                </button>
                <p className="text-sm text-gray-500">
                    Thank you for choosing our services
                </p>
            </div>
        </div>
    );
} 