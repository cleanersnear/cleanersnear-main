'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Phone, Mail, Check, Info } from 'lucide-react'

const afterRenovationFeatures = [
    'Post-construction debris removal',
    'Paint overspray cleaning',
    'Dust and dirt removal from all surfaces',
    'Window and frame cleaning',
    'Air vent cleaning',
    'Floor deep cleaning',
    'Cabinet interior and exterior cleaning',
    'Fixture and fitting cleaning',
    'Detailed bathroom cleaning',
    'Final inspection ready'
]

interface EnquiryForm {
    name: string
    email: string
    phone: string
    propertyType: 'house' | 'apartment' | 'commercial' | ''
    renovationType: 'full' | 'partial' | 'kitchen' | 'bathroom' | 'other' | ''
    additionalNotes: string
    preferredContact: 'phone' | 'email' | ''
    preferredTime: 'morning' | 'afternoon' | 'evening' | ''
    address: {
        street: string
        unit?: string
        suburb: string
        state: string
        postcode: string
    }
    expectedDate: string
}

interface QuoteEnquiry {
    enquiryNumber: string;
    status: string;
    expectedContact: string;
    createdAt: string;
}

// Fix: Create a type for just the required field labels
type RequiredFieldLabels = {
    name: string;
    email: string;
    phone: string;
    propertyType: string;
    renovationType: string;
    'address.street': string;
    'address.suburb': string;
    'address.state': string;
    'address.postcode': string;
    expectedDate: string;
    preferredContact: string;
    preferredTime: string;
};

// Success Dialog Component
function SuccessDialog({
    enquiryData,
    onClose
}: {
    enquiryData: QuoteEnquiry;
    onClose: () => void;
}) {
    const router = useRouter();
    const [redirectTimer, setRedirectTimer] = useState(15);

    const handleReturnHome = useCallback(() => {
        router.push('/');
    }, [router]); // router is stable and won't cause re-renders
    
    useEffect(() => {
        // Set up redirect timer
        const timer = setInterval(() => {
            setRedirectTimer((prev) => prev - 1);
        }, 1000);

        // Redirect after 15 seconds
        const redirect = setTimeout(() => {
            handleReturnHome();
        }, 15000);

        // Cleanup
        return () => {
            clearInterval(timer);
            clearTimeout(redirect);
        };
    }, [handleReturnHome]);

    

    const handleBookNext = () => {
        // Clear any stored data first
        localStorage.removeItem('bookingConfirmation');
        // Redirect to service selection page
        router.push('/quick-book/service');
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 space-y-6">
                    {/* Success Message */}
                    <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                <Check className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Quote Request Submitted Successfully!
                                </h2>
                                <p className="text-green-600">
                                    Your enquiry number: {enquiryData.enquiryNumber}
                                </p>
                            </div>
                        </div>
                        <p className="text-gray-600">
                            Thank you for your interest in our services. Our team will review your requirements
                            and contact you within {enquiryData.expectedContact} with a customized quote.
                        </p>
                    </div>

                    {/* What Happens Next */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            What Happens Next?
                        </h3>
                        <div className="space-y-3">
                            <div className="flex gap-3">
                                <Phone className="w-5 h-5 text-[#1E3D8F] flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-medium text-gray-900">Contact from Our Team</p>
                                    <p className="text-gray-600">
                                        One of our specialists will call you to discuss your requirements
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Mail className="w-5 h-5 text-[#1E3D8F] flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-medium text-gray-900">Detailed Quote</p>
                                    <p className="text-gray-600">
                                        You&apos;ll receive a comprehensive quote based on your requirements
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Timer and Actions */}
                    <div className="space-y-4 pt-4 border-t border-gray-200">
                        {/* Timer display */}
                        <p className="text-sm text-gray-500 text-center">
                            Redirecting to homepage in {redirectTimer} seconds...
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2 justify-end">
                            <button
                                onClick={handleBookNext}
                                className="px-4 py-2 rounded-lg border border-[#1E3D8F] text-[#1E3D8F]
                                    hover:bg-[#1E3D8F]/5 transition-colors"
                            >
                                Book Another Service
                            </button>
                            <button
                                onClick={() => {
                                    handleReturnHome();
                                    onClose();  // Add this line
                                }}
                                className="px-4 py-2 rounded-lg bg-[#1E3D8F] text-white
        hover:bg-[#1E3D8F]/90 transition-colors"
                            >
                                Return to Homepage
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ); 
}

export default function AfterRenovationClean() {
    const router = useRouter()
    const [formData, setFormData] = useState<EnquiryForm>({
        name: '',
        email: '',
        phone: '',
        propertyType: '',
        renovationType: '',
        additionalNotes: '',
        preferredContact: '',
        preferredTime: '',
        address: {
            street: '',
            unit: '',
            suburb: '',
            state: '',
            postcode: ''
        },
        expectedDate: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [successData, setSuccessData] = useState<QuoteEnquiry | null>(null);

    // Then use it in your component
    const requiredFields: RequiredFieldLabels = {
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        propertyType: 'Property Type',
        renovationType: 'Renovation Type',
        'address.street': 'Street Address',
        'address.suburb': 'Suburb',
        'address.state': 'State',
        'address.postcode': 'Postcode',
        expectedDate: 'Expected Date',
        preferredContact: 'Preferred Contact Method',
        preferredTime: 'Best Time to Contact'
    };

    // Add this function to check specific field validity
    const isFieldEmpty = (key: string) => {
        if (key.includes('.')) {
            const [parent, child] = key.split('.');
            if (parent === 'address' && formData.address) {
                const addressKey = child as keyof typeof formData.address;
                return !formData.address[addressKey];
            }
            return true;
        }
        const formKey = key as keyof typeof formData;
        return !formData[formKey];
    };

    // Update handleSubmit
    const handleSubmit = async () => {
        if (isSubmitting) return;

        // Get missing fields
        const missing = Object.entries(requiredFields).filter(([key]) => isFieldEmpty(key));

        if (missing.length > 0) {
            setSubmitError(`Please fill in:\n${missing.map(([label]) => label).join('\n')}`);
            return;
        }

        try {
            setIsSubmitting(true);
            setSubmitError(null);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/renovationclean/submit-enquiry`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ formData })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to submit enquiry');
            }

            setSuccessData(result.data);

        } catch (error) {
            console.error('Error preparing renovation cleaning data:', error);
            setSubmitError(
                error instanceof Error
                    ? error.message
                    : 'Failed to connect to server. Please try again later.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        router.push('/');
    };

    return (
        <div className="space-y-6">
            {/* Service Introduction */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    After Renovation Cleaning Service
                </h3>
                <p className="text-gray-600 mb-6">
                    Professional cleaning service specifically designed for post-renovation cleanup.
                    Our experienced team will handle all the post-construction mess and prepare your
                    space for immediate use.
                </p>

                {/* Features List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {afterRenovationFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-gray-700">
                            <Check className="w-5 h-5 text-[#1E3D8F]" />
                            <span>{feature}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quote Information Dialog */}
            <div className="bg-[#fff8f0] p-6 rounded-xl border border-orange-200">
                <div className="flex gap-3">
                    <Info className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                            Important Quote Information
                        </h4>
                        <p className="text-gray-600 text-sm">
                            Due to the varying nature of post-renovation cleaning requirements, we cannot provide an accurate quote online.
                            Each project needs a proper inspection to assess:
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                            <li>Extent of renovation work</li>
                            <li>Type and amount of debris</li>
                            <li>Specific cleaning requirements</li>
                            <li>Required equipment and materials</li>
                        </ul>
                        <p className="text-sm text-gray-600 mt-2">
                            Please fill out this form and our team will contact you within 24 hours to schedule an inspection
                            and provide a detailed quote.
                        </p>
                    </div>
                </div>
            </div>

            {/* Enquiry Form */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-6">Request a Quote</h4>
                <div className="space-y-4">
                    {/* Contact Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Your Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className={`w-full p-3 border rounded-lg
                                    focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20
                                    ${submitError && isFieldEmpty('name')
                                        ? 'border-red-500 bg-red-50 focus:border-red-500'
                                        : 'border-gray-200 focus:border-[#1E3D8F]'
                                    }`}
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className={`w-full p-3 border rounded-lg
                                    focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20
                                    ${submitError && isFieldEmpty('phone')
                                        ? 'border-red-500 bg-red-50 focus:border-red-500'
                                        : 'border-gray-200 focus:border-[#1E3D8F]'
                                    }`}
                                placeholder="Enter your phone number"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={`w-full p-3 border rounded-lg
                                focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20
                                ${submitError && isFieldEmpty('email')
                                    ? 'border-red-500 bg-red-50 focus:border-red-500'
                                    : 'border-gray-200 focus:border-[#1E3D8F]'
                                }`}
                            placeholder="Enter your email address"
                        />
                    </div>

                    {/* Property Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Property Type
                            </label>
                            <select
                                value={formData.propertyType}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    propertyType: e.target.value as EnquiryForm['propertyType']
                                })}
                                className={`w-full p-3 border rounded-lg
                                    focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20
                                    ${submitError && isFieldEmpty('propertyType')
                                        ? 'border-red-500 bg-red-50 focus:border-red-500'
                                        : 'border-gray-200 focus:border-[#1E3D8F]'
                                    }`}
                            >
                                <option value="">Select property type</option>
                                <option value="house">House</option>
                                <option value="apartment">Apartment</option>
                                <option value="commercial">Commercial Space</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Renovation Type
                            </label>
                            <select
                                value={formData.renovationType}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    renovationType: e.target.value as EnquiryForm['renovationType']
                                })}
                                className={`w-full p-3 border rounded-lg
                                    focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20
                                    ${submitError && isFieldEmpty('renovationType')
                                        ? 'border-red-500 bg-red-50 focus:border-red-500'
                                        : 'border-gray-200 focus:border-[#1E3D8F]'
                                    }`}
                            >
                                <option value="">Select renovation type</option>
                                <option value="full">Full Renovation</option>
                                <option value="partial">Partial Renovation</option>
                                <option value="kitchen">Kitchen Renovation</option>
                                <option value="bathroom">Bathroom Renovation</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Address Fields */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Property Address
                        </label>
                        <div className="space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    value={formData.address.street}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        address: { ...formData.address, street: e.target.value }
                                    })}
                                    className={`w-full p-3 border rounded-lg
                                        focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20
                                        ${submitError && isFieldEmpty('address.street')
                                            ? 'border-red-500 bg-red-50 focus:border-red-500'
                                            : 'border-gray-200 focus:border-[#1E3D8F]'
                                        }`}
                                    placeholder="Street Address"
                                />
                                <input
                                    type="text"
                                    value={formData.address.unit}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        address: { ...formData.address, unit: e.target.value }
                                    })}
                                    className="w-full p-3 border border-gray-200 rounded-lg
                                        focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                    placeholder="Unit/Apartment (optional)"
                                />
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <input
                                    type="text"
                                    value={formData.address.suburb}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        address: { ...formData.address, suburb: e.target.value }
                                    })}
                                    className={`w-full p-3 border rounded-lg
                                        focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20
                                        ${submitError && isFieldEmpty('address.suburb')
                                            ? 'border-red-500 bg-red-50 focus:border-red-500'
                                            : 'border-gray-200 focus:border-[#1E3D8F]'
                                        }`}
                                    placeholder="Suburb"
                                />
                                <select
                                    value={formData.address.state}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        address: { ...formData.address, state: e.target.value }
                                    })}
                                    className={`w-full p-3 border rounded-lg
                                        focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20
                                        ${submitError && isFieldEmpty('address.state')
                                            ? 'border-red-500 bg-red-50 focus:border-red-500'
                                            : 'border-gray-200 focus:border-[#1E3D8F]'
                                        }`}
                                >
                                    <option value="">State</option>
                                    <option value="NSW">NSW</option>
                                    <option value="VIC">VIC</option>
                                    <option value="QLD">QLD</option>
                                    <option value="WA">WA</option>
                                    <option value="SA">SA</option>
                                    <option value="TAS">TAS</option>
                                    <option value="ACT">ACT</option>
                                    <option value="NT">NT</option>
                                </select>
                                <input
                                    type="text"
                                    value={formData.address.postcode}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        address: { ...formData.address, postcode: e.target.value }
                                    })}
                                    className={`w-full p-3 border rounded-lg
                                        focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20
                                        ${submitError && isFieldEmpty('address.postcode')
                                            ? 'border-red-500 bg-red-50 focus:border-red-500'
                                            : 'border-gray-200 focus:border-[#1E3D8F]'
                                        }`}
                                    placeholder="Postcode"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Expected Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expected Cleaning Date
                        </label>
                        <input
                            type="date"
                            value={formData.expectedDate}
                            onChange={(e) => setFormData({
                                ...formData,
                                expectedDate: e.target.value
                            })}
                            min={new Date().toISOString().split('T')[0]}
                            className={`w-full p-3 border rounded-lg
                                focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20
                                ${submitError && isFieldEmpty('expectedDate')
                                    ? 'border-red-500 bg-red-50 focus:border-red-500'
                                    : 'border-gray-200 focus:border-[#1E3D8F]'
                                }`}
                        />
                    </div>

                    {/* Additional Notes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Additional Information
                        </label>
                        <textarea
                            value={formData.additionalNotes}
                            onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                            className="w-full p-3 border border-gray-200 rounded-lg
                                focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                            rows={4}
                            placeholder="Please provide any additional details about your renovation cleaning needs (optional)"
                        />
                    </div>

                    {/* Contact Preference */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Preferred Contact Method
                            </label>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={(e) => { e.preventDefault(); setFormData({ ...formData, preferredContact: 'phone' }) }}
                                    className={`flex-1 p-3 rounded-lg border-2 transition-all flex items-center justify-center gap-2
                                        ${formData.preferredContact === 'phone'
                                            ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                            : 'border-gray-200 hover:border-[#90c2f7]'
                                        }`}
                                >
                                    <Phone className="w-4 h-4" />
                                    Phone
                                </button>
                                <button
                                    type="button"
                                    onClick={(e) => { e.preventDefault(); setFormData({ ...formData, preferredContact: 'email' }) }}
                                    className={`flex-1 p-3 rounded-lg border-2 transition-all flex items-center justify-center gap-2
                                        ${formData.preferredContact === 'email'
                                            ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                            : 'border-gray-200 hover:border-[#90c2f7]'
                                        }`}
                                >
                                    <Mail className="w-4 h-4" />
                                    Email
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Best Time to Contact
                            </label>
                            <select
                                value={formData.preferredTime}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    preferredTime: e.target.value as EnquiryForm['preferredTime']
                                })}
                                className={`w-full p-3 border rounded-lg
                                    focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20
                                    ${submitError && isFieldEmpty('preferredTime')
                                        ? 'border-red-500 bg-red-50 focus:border-red-500'
                                        : 'border-gray-200 focus:border-[#1E3D8F]'
                                    }`}
                            >
                                <option value="">Select preferred time</option>
                                <option value="morning">Morning (9AM - 12PM)</option>
                                <option value="afternoon">Afternoon (12PM - 5PM)</option>
                                <option value="evening">Evening (5PM - 7PM)</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="space-y-2">
                        <p className="font-medium text-red-600">Please fill in:</p>
                        <ul className="list-disc list-inside text-red-600 space-y-1 ml-2">
                            {submitError.split('\n').slice(1).map((field, index) => (
                                <li key={index}>{field}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* Submit Button */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <button
                    onClick={handleSubmit}
                    type="button"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 rounded-lg font-medium
                        ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1E3D8F] hover:bg-[#1E3D8F]/90'}
                        text-white transition-colors
                        flex items-center justify-center gap-2 text-lg`}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}

                </button>
                <p className="text-sm text-gray-600 text-center mt-4">
                    {isSubmitting ? 'Processing your enquiry...' : "We'll get back to you within 24 hours with a customized quote"}
                </p>
            </div>

            {/* Success Dialog */}
            {successData && (
                <SuccessDialog
                    enquiryData={successData}
                    onClose={handleClose}
                />
            )}
        </div>
    )
} 