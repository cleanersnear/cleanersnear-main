'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
    CheckCircle, MapPin, Calendar, Clock, Mail, MessageCircle, 
    User, Phone, AtSign, Package, Check
} from 'lucide-react'

interface BookingData {
    location: {
        name: string
        postcode: string
    }
    service: {
        name: string
        description: string
        homeSize: string
        price: number
        propertyDetails?: {
            bathrooms: string
            toilets: string
            propertyType: string
            isFurnished: boolean
            hasStudyRoom: boolean
        }
        priceBreakdown?: {
            description: string
            amount: number
        }[]
    }
    details: {
        firstName: string
        lastName: string
        email: string
        phone: string
        date: string
        time: string
        frequency?: string
        bookingNumber?: string
    }
}

export default function BookingConfirmation() {
    const router = useRouter()
    const [bookingData, setBookingData] = useState<BookingData | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        try {
            const locationData = localStorage.getItem('selectedSuburb')
            const serviceData = localStorage.getItem('selectedService')
            const detailsData = localStorage.getItem('bookingDetails')

            if (!locationData || !serviceData || !detailsData) {
                router.push('/quick-book')
                return
            }

            setBookingData({
                location: JSON.parse(locationData),
                service: JSON.parse(serviceData),
                details: JSON.parse(detailsData)
            })
        } catch (err) {
            setError('Unable to load booking data. Please try again.')
            console.error('Error loading booking data:', err)
        }
    }, [router])

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return ''
        try {
            return new Date(dateStr).toLocaleDateString('en-AU', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        } catch {
            return dateStr
        }
    }

    if (error) {
        return (
            <div className="p-8 text-center">
                <p className="text-red-600">{error}</p>
                <button 
                    onClick={() => router.push('/quick-book')}
                    className="mt-4 text-[#1E3D8F] hover:underline"
                >
                    Start New Booking
                </button>
            </div>
        )
    }

    if (!bookingData) {
        return (
            <div className="p-8 text-center">
                <p className="text-gray-500">Loading booking details...</p>
            </div>
        )
    }

    const handleEmailConfirmation = () => {
        // Email confirmation logic here
        alert('Confirmation email sent!')
    }

    return (
        <div className="p-8">
            {/* Success Message */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Booking Confirmed!
                </h2>
                <p className="text-gray-500">
                    Your cleaning service has been successfully booked
                </p>
                
                {/* Add Booking Number */}
                {bookingData.details.bookingNumber && (
                    <div className="mt-4 p-3 bg-[#1E3D8F]/5 rounded-lg inline-block">
                        <p className="text-sm text-gray-500">Booking Reference</p>
                        <p className="text-lg font-semibold text-[#1E3D8F]">
                            {bookingData.details.bookingNumber}
                        </p>
                    </div>
                )}
            </motion.div>

            {/* Booking Summary */}
            <div className="space-y-6 bg-gray-50 rounded-xl p-6">
                {/* Location */}
                <SummarySection
                    icon={<MapPin className="w-5 h-5 text-[#1E3D8F]" />}
                    title="Service Location"
                    content={`${bookingData.location.name}, ${bookingData.location.postcode}`}
                />

                {/* Service Details */}
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#1E3D8F]/10 flex items-center justify-center flex-shrink-0">
                        <Package className="w-5 h-5 text-[#1E3D8F]" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">Service Details</h3>
                        <div className="mt-2 bg-white p-4 rounded-lg border border-gray-200">
                            <h4 className="font-medium text-gray-900 mb-3">{bookingData.service.name}</h4>
                            
                            {/* Property Size */}
                            {bookingData.service.homeSize && (
                                <div className="flex justify-between items-center text-sm mb-2">
                                    <span className="text-gray-500">Property Size</span>
                                    <span className="font-medium">{bookingData.service.homeSize}</span>
                                </div>
                            )}

                            {/* Property Details */}
                            {bookingData.service.propertyDetails && (
                                <div className="space-y-2 mb-3 pt-2 border-t border-gray-100">
                                    <PropertyDetail
                                        label="Bathrooms"
                                        value={bookingData.service.propertyDetails.bathrooms}
                                    />
                                    <PropertyDetail
                                        label="Toilets"
                                        value={bookingData.service.propertyDetails.toilets}
                                    />
                                    <PropertyDetail
                                        label="Property Type"
                                        value={`${bookingData.service.propertyDetails.propertyType} Story`}
                                    />
                                    {bookingData.service.propertyDetails.isFurnished && (
                                        <PropertyDetail
                                            label="Furnished"
                                            value={<Check className="w-4 h-4 text-green-500" />}
                                        />
                                    )}
                                </div>
                            )}

                            {/* Price Breakdown */}
                            {bookingData.service.priceBreakdown && (
                                <div className="space-y-2 pt-2 border-t border-gray-100">
                                    {bookingData.service.priceBreakdown.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500">{item.description}</span>
                                            <span className="font-medium">${item.amount}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Total Price */}
                            <div className="mt-3 pt-3 border-t border-gray-100">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-900 font-medium">Total Price</span>
                                    <span className="text-lg font-semibold text-[#1E3D8F]">
                                        ${bookingData.service.price}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Schedule Details */}
                <SummarySection
                    icon={<Calendar className="w-5 h-5 text-[#1E3D8F]" />}
                    title="Scheduled For"
                    content={
                        <>
                            <p>{formatDate(bookingData.details.date)}</p>
                            <div className="mt-2 flex items-center gap-2 text-gray-500">
                                <Clock className="w-4 h-4" />
                                <p>Starting at {bookingData.details.time}</p>
                            </div>
                        </>
                    }
                />

                {/* Contact Information */}
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#1E3D8F]/10 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-[#1E3D8F]" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">Contact Details</h3>
                        <div className="mt-2 bg-white p-4 rounded-lg border border-gray-200 space-y-3">
                            <ContactDetail
                                icon={<User className="w-4 h-4 text-gray-400" />}
                                content={`${bookingData.details.firstName} ${bookingData.details.lastName}`}
                            />
                            <ContactDetail
                                icon={<AtSign className="w-4 h-4 text-gray-400" />}
                                content={bookingData.details.email}
                            />
                            <ContactDetail
                                icon={<Phone className="w-4 h-4 text-gray-400" />}
                                content={bookingData.details.phone}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <ActionButton
                    primary
                    onClick={handleEmailConfirmation}
                    icon={<Mail className="w-5 h-5" />}
                    text="Email My Confirmation"
                />
                <ActionButton
                    href="/contact"
                    icon={<MessageCircle className="w-5 h-5" />}
                    text="Need Help?"
                />
            </div>

            {/* Next Steps */}
            <NextStepsSection />
        </div>
    )
}

// Helper Components
const SummarySection = ({ icon, title, content }: { icon: React.ReactNode, title: string, content: React.ReactNode }) => (
    <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-[#1E3D8F]/10 flex items-center justify-center flex-shrink-0">
            {icon}
        </div>
        <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            {content}
        </div>
    </div>
)

const PropertyDetail = ({ label, value }: { label: string, value: React.ReactNode }) => (
    <div className="flex justify-between items-center text-sm">
        <span className="text-gray-500">{label}</span>
        <span className="font-medium">{value}</span>
    </div>
)

const ContactDetail = ({ icon, content }: { icon: React.ReactNode, content: string }) => (
    <div className="flex items-center gap-2">
        {icon}
        <p className="text-gray-600">{content}</p>
    </div>
)

const ActionButton = ({ 
    primary, 
    onClick, 
    href, 
    icon, 
    text 
}: { 
    primary?: boolean
    onClick?: () => void
    href?: string
    icon: React.ReactNode
    text: string 
}) => {
    const className = primary
        ? "flex-1 py-4 px-6 bg-[#1E3D8F] text-white rounded-xl font-medium hover:bg-[#1E3D8F]/90 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
        : "flex-1 py-4 px-6 border-2 border-[#1E3D8F] text-[#1E3D8F] rounded-xl font-medium hover:bg-[#1E3D8F]/5 transition-all duration-200 flex items-center justify-center gap-2"

    return href ? (
        <a href={href} className={className}>
            {icon}
            {text}
        </a>
    ) : (
        <button onClick={onClick} className={className}>
            {icon}
            {text}
        </button>
    )
}

const NextStepsSection = () => (
    <div className="mt-8 p-6 border border-[#1E3D8F]/10 rounded-xl bg-[#1E3D8F]/5">
        <h3 className="font-semibold text-gray-900 mb-2">What&apos;s Next?</h3>
        <div className="space-y-3 text-gray-600">
            <p>• We&apos;ll send you a confirmation email with your booking details</p>
            <p>• Our team will contact you shortly to confirm your appointment</p>
            <p>• Having questions or special requirements? Feel free to contact us using the &quot;Need Help?&quot; button above</p>
        </div>
        <div className="mt-4 pt-4 border-t border-[#1E3D8F]/10">
            <p className="text-sm text-gray-500">
                Having issues with your booking? Our support team is here to help! 
                Click the &quot;Need Help?&quot; button above and we&apos;ll get back to you as soon as possible.
            </p>
        </div>
    </div>
) 