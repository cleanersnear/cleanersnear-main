'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Phone, Mail, Check, Info } from 'lucide-react'
import Link from 'next/link'

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

                    {/* Actions */}
                    <div className="flex gap-4 justify-end pt-4 border-t border-gray-200">
                        <Link
                            href="/contact"
                            className="px-4 py-2 rounded-lg border border-[#1E3D8F] text-[#1E3D8F]
                                hover:bg-[#1E3D8F]/5 transition-colors"
                        >
                            Contact Us
                        </Link>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg bg-[#1E3D8F] text-white
                                hover:bg-[#1E3D8F]/90 transition-colors"
                        >
                            Return to Homepage
                        </button>
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

    const handleSubmit = async () => {
        if (isSubmitting) return;

        // Validate required fields
        const missingFields = Object.entries(requiredFields).filter(([key]) => {
            if (key.includes('.')) {
                const [parent, child] = key.split('.');
                // Explicitly check for address fields
                if (parent === 'address' && formData.address) {
                    // Type guard to ensure we're accessing address properties
                    const addressKey = child as keyof typeof formData.address;
                    return !formData.address[addressKey];
                }
                return true; // Invalid path
            }
            // For non-nested fields
            const formKey = key as keyof typeof formData;
            return !formData[formKey];
        });

        if (missingFields.length > 0) {
            setSubmitError(`Please fill in: ${missingFields.map(([, label]) => label).join(', ')}`);
            return;
        }

        try {
            setIsSubmitting(true);
            setSubmitError(null);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/renovation-clean/submit-enquiry`, {
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
                                className="w-full p-3 border border-gray-200 rounded-lg
                                    focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
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
                                className="w-full p-3 border border-gray-200 rounded-lg
                                    focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
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
                            className="w-full p-3 border border-gray-200 rounded-lg
                                focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
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
                                className="w-full p-3 border border-gray-200 rounded-lg
                                    focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
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
                                className="w-full p-3 border border-gray-200 rounded-lg
                                    focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
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
                                    className="w-full p-3 border border-gray-200 rounded-lg
                                        focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
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
                                    className="w-full p-3 border border-gray-200 rounded-lg
                                        focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                    placeholder="Suburb"
                                />
                                <select
                                    value={formData.address.state}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        address: { ...formData.address, state: e.target.value }
                                    })}
                                    className="w-full p-3 border border-gray-200 rounded-lg
                                        focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
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
                                    className="w-full p-3 border border-gray-200 rounded-lg
                                        focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
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
                            className="w-full p-3 border border-gray-200 rounded-lg
                                focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            This helps us understand your timeline, but the actual date will be confirmed after inspection
                        </p>
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
                            placeholder="Please provide any additional details about your renovation cleaning needs"
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
                                className="w-full p-3 border border-gray-200 rounded-lg
                                    focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
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
                    <p className="text-red-600">{submitError}</p>
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
                    <Check className="w-5 h-5" />
                </button>
                <p className="text-sm text-gray-600 text-center mt-4">
                    {isSubmitting ? 'Processing your enquiry...' : "We&apos;ll get back to you within 24 hours with a customized quote"}
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