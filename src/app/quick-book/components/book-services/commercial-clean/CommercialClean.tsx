'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Building2 } from 'lucide-react'

import { PRICE_CONFIG } from '@/services/cleaningServices/commercialCleaning'


interface AdditionalOptions {
    industry: string;
    otherIndustryType?: string;
    companyDetails: {
        name: string;
        abn: string;
    };
    frequency: 'once' | 'regular' | null;
    regularFrequency?: 'daily' | 'weekly' | 'biweekly' | 'monthly';
    contact: {
        phone: string;
        email: string;
        message: string;
    };
    squareMeters: number;
    requiresAfterHours: boolean;
    providesEquipment: boolean;
    staffRequired: number;
    hoursPerVisit: number;
    operatingHours: {
        preferredCleaningTime: 'during' | 'after' | 'before' | null;
        startTime: string;
    };
}

export default function CommercialClean() {
    const router = useRouter()
    

    const [additionalOptions, setAdditionalOptions] = useState<AdditionalOptions>({
        industry: '',
        otherIndustryType: '',
        companyDetails: {
            name: '',
            abn: '',
        },
        frequency: null,
        contact: {
            phone: '',
            email: '',
            message: ''
        },
        squareMeters: 0,
        requiresAfterHours: false,
        providesEquipment: false,
        staffRequired: 1,
        hoursPerVisit: 2,
        operatingHours: {
            preferredCleaningTime: null,
            startTime: ''
        }
    })

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const industries = [
        { id: 'office', label: 'Office' },
        { id: 'aged-care', label: 'Aged Care' },
        { id: 'education', label: 'Education & Child Care' },
        { id: 'government', label: 'Government' },
        { id: 'retail', label: 'Retail' },
        { id: 'medical', label: 'Medical & Healthcare' },
        { id: 'gym', label: 'Gym & Fitness' },
        { id: 'restaurant', label: 'Restaurant & Hospitality' },
        { id: 'warehouse', label: 'Warehouse & Industrial' },
        { id: 'other', label: 'Other' }
    ]

    const handleBookingSubmit = async () => {
        if (isSubmitting) return;
        try {
            setIsSubmitting(true);
            setSubmitError(null);

            const totalPrice = calculateTotalPrice();

            // Format service data
            const serviceData = {
                name: "Commercial Cleaning",
                type: "commercial-clean",
                price: totalPrice,
                description: `Professional commercial cleaning service for ${
                    additionalOptions.industry === 'other' 
                        ? additionalOptions.otherIndustryType 
                        : industries.find(i => i.id === additionalOptions.industry)?.label
                }`,
                details: {
                    industry: additionalOptions.industry,
                    otherIndustryType: additionalOptions.otherIndustryType,
                    companyDetails: additionalOptions.companyDetails,
                    frequency: additionalOptions.frequency,
                    regularFrequency: additionalOptions.regularFrequency,
                    contact: additionalOptions.contact,
                    staffRequired: additionalOptions.staffRequired,
                    hoursPerVisit: additionalOptions.hoursPerVisit,
                    operatingHours: additionalOptions.operatingHours,
                    totalHours: additionalOptions.hoursPerVisit * additionalOptions.staffRequired,
                    baseHourlyRate: additionalOptions.frequency === 'once' ? 65 : 55
                },
                priceBreakdown: calculatePriceBreakdown()
            };

            // Just save to localStorage and proceed
            localStorage.setItem('selectedService', JSON.stringify(serviceData));
            window.dispatchEvent(new CustomEvent('serviceUpdate', { detail: serviceData }));

            // Navigate to details page
            router.push('/quick-book/details');

        } catch (error) {
            console.error('Error preparing commercial cleaning data:', error);
            setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    

    const calculateFinishTime = (startTime: string, duration: number) => {
        if (!startTime) return '--:--';
        
        const [hours, minutes] = startTime.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes + (duration * 60);
        
        const finishHours = Math.floor(totalMinutes / 60) % 24;
        const finishMinutes = totalMinutes % 60;
        
        return `${finishHours.toString().padStart(2, '0')}:${finishMinutes.toString().padStart(2, '0')}`;
    };

    const calculateDiscount = () => {
        const baseHourlyRate = additionalOptions.frequency === 'once' ? 65 : 55;
        const totalHours = Math.max(
            additionalOptions.frequency === 'once' ? 3 : 0,
            additionalOptions.hoursPerVisit * additionalOptions.staffRequired
        );
        const baseTotal = baseHourlyRate * totalHours;
        
        const discounts = {
            'daily': 0.20,
            'weekly': 0.15,
            'biweekly': 0.10,
            'monthly': 0
        };
        
        const discount = discounts[additionalOptions.regularFrequency || 'monthly'];
        return baseTotal * discount;
    };

    const calculateTotalPrice = () => {
        const baseHourlyRate = additionalOptions.frequency === 'once' ? 65 : 55;
        const totalHours = Math.max(
            additionalOptions.frequency === 'once' ? 3 : 0,
            additionalOptions.hoursPerVisit * additionalOptions.staffRequired
        );
        return totalHours * baseHourlyRate;
    };

    const calculatePriceBreakdown = () => {
        const totalPrice = calculateTotalPrice();
        const breakdown = [
            {
                description: `Base Rate (${additionalOptions.frequency === 'once' ? '$65' : '$55'}/hour × ${
                    additionalOptions.hoursPerVisit * additionalOptions.staffRequired
                } hours)`,
                amount: totalPrice
            },
            additionalOptions.frequency === 'regular' && additionalOptions.regularFrequency && {
                description: `${additionalOptions.regularFrequency.charAt(0).toUpperCase() + 
                    additionalOptions.regularFrequency.slice(1)} Frequency Discount`,
                amount: -(totalPrice * (PRICE_CONFIG.discounts[additionalOptions.regularFrequency] || 0))
            }
        ].filter(Boolean);
        return breakdown;
    };

    useEffect(() => {
        if (additionalOptions.industry && additionalOptions.frequency) {
            try {
                const baseHourlyRate = additionalOptions.frequency === 'once' ? 65 : 55;
                const minimumHours = additionalOptions.frequency === 'once' ? 3 : 0;
                const totalHours = Math.max(minimumHours, additionalOptions.hoursPerVisit * additionalOptions.staffRequired);
                
                let totalPrice = totalHours * baseHourlyRate;

                // Apply frequency discounts
                const discounts = {
                    'daily': 0.20,
                    'weekly': 0.15,
                    'biweekly': 0.10,
                    'monthly': 0
                };

                if (additionalOptions.frequency === 'regular' && additionalOptions.regularFrequency) {
                    const discount = discounts[additionalOptions.regularFrequency] || 0;
                    totalPrice = totalPrice * (1 - discount);
                }

                const serviceData = {
                    name: "Commercial Clean",
                    type: "commercial-clean",
                    price: totalPrice,
                    details: {
                        industry: additionalOptions.industry,
                        otherIndustryType: additionalOptions.otherIndustryType,
                        frequency: additionalOptions.frequency,
                        regularFrequency: additionalOptions.regularFrequency,
                        staffRequired: additionalOptions.staffRequired,
                        hoursPerVisit: additionalOptions.hoursPerVisit,
                        totalHours: totalHours,
                        baseHourlyRate: baseHourlyRate
                    },
                    priceBreakdown: [
                        {
                            description: `Base Rate (${baseHourlyRate}/hour × ${totalHours} hours)`,
                            amount: baseHourlyRate * totalHours
                        },
                        additionalOptions.frequency === 'regular' && additionalOptions.regularFrequency && {
                            description: `${additionalOptions.regularFrequency.charAt(0).toUpperCase() + additionalOptions.regularFrequency.slice(1)} Frequency Discount`,
                            amount: -(baseHourlyRate * totalHours * (discounts[additionalOptions.regularFrequency] || 0))
                        }
                    ].filter(Boolean)
                };

                localStorage.setItem('selectedService', JSON.stringify(serviceData));
                window.dispatchEvent(new CustomEvent('localStorageChange'));
            } catch (error) {
                console.error('Error updating service data:', error);
            }
        }
    }, [
        additionalOptions.industry,
        additionalOptions.otherIndustryType,
        additionalOptions.frequency,
        additionalOptions.regularFrequency,
        additionalOptions.staffRequired,
        additionalOptions.hoursPerVisit
    ]);

    return (
        <div className="space-y-6">
            {/* Industry Selection */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-6">Select Your Industry</h4>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Industry Type
                        </label>
                        <select
                            value={additionalOptions.industry}
                            onChange={(e) => setAdditionalOptions({
                                ...additionalOptions,
                                industry: e.target.value,
                                otherIndustryType: ''
                            })}
                            className="w-full p-3 border border-gray-200 rounded-lg
                                focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]
                                text-gray-900"
                        >
                            <option value="">Select an industry</option>
                            {industries.map((industry) => (
                                <option key={industry.id} value={industry.id}>
                                    {industry.label}
                                </option>
                            ))}
                        </select>
                        <p className="text-sm text-gray-500 mt-2">
                            Select the industry that best matches your business type
                        </p>
                    </div>

                    {/* Other Industry Type Input */}
                    {additionalOptions.industry === 'other' && (
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Specify Your Industry
                            </label>
                            <input
                                type="text"
                                value={additionalOptions.otherIndustryType}
                                onChange={(e) => setAdditionalOptions({
                                    ...additionalOptions,
                                    otherIndustryType: e.target.value
                                })}
                                className="w-full p-3 border border-gray-200 rounded-lg
                                    focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                placeholder="Please specify your industry type"
                            />
                        </div>
                    )}

                    {/* Selected Industry Info */}
                    {additionalOptions.industry && (
                        <div className="mt-4 p-4 bg-[#e6f0fa] rounded-lg">
                            <div className="flex items-center gap-3">
                                <Building2 className="w-5 h-5 text-[#1E3D8F]" />
                                <div>
                                    <div className="font-medium text-gray-900">
                                        {additionalOptions.industry === 'other' 
                                            ? additionalOptions.otherIndustryType || 'Other Industry'
                                            : industries.find(i => i.id === additionalOptions.industry)?.label}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Company Details */}
            {additionalOptions.industry && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-6">Company Details</h4>
                    <div className="space-y-4">
                        {/* Company Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company Name
                            </label>
                            <input
                                type="text"
                                value={additionalOptions.companyDetails.name}
                                onChange={(e) => setAdditionalOptions({
                                    ...additionalOptions,
                                    companyDetails: {
                                        ...additionalOptions.companyDetails,
                                        name: e.target.value
                                    }
                                })}
                                className="w-full p-3 border border-gray-200 rounded-lg
                                    focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                placeholder="Enter company name"
                            />
                        </div>

                        {/* ABN */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ABN (Australian Business Number)
                            </label>
                            <input
                                type="text"
                                value={additionalOptions.companyDetails.abn}
                                onChange={(e) => setAdditionalOptions({
                                    ...additionalOptions,
                                    companyDetails: {
                                        ...additionalOptions.companyDetails,
                                        abn: e.target.value
                                    }
                                })}
                                className="w-full p-3 border border-gray-200 rounded-lg
                                    focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                placeholder="Enter ABN"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Frequency Selection */}
            {additionalOptions.industry && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-6">Service Frequency</h4>
                    <div className="space-y-4">
                        {/* Frequency Buttons */}
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setAdditionalOptions({
                                    ...additionalOptions,
                                    frequency: 'once'
                                })}
                                className={`p-4 rounded-lg border-2 transition-all
                                    ${additionalOptions.frequency === 'once'
                                        ? 'border-[#1E3D8F] bg-[#e6f0fa] text-[#1E3D8F]'
                                        : 'border-gray-200 hover:border-[#90c2f7]'
                                    }`}
                            >
                                <div className="font-medium">Once-off Clean</div>
                                <div className="text-sm mt-1 text-gray-600">$65/hour (min. 3 hours)</div>
                            </button>
                            <button
                                onClick={() => setAdditionalOptions({
                                    ...additionalOptions,
                                    frequency: 'regular'
                                })}
                                className={`p-4 rounded-lg border-2 transition-all
                                    ${additionalOptions.frequency === 'regular'
                                        ? 'border-[#1E3D8F] bg-[#e6f0fa] text-[#1E3D8F]'
                                        : 'border-gray-200 hover:border-[#90c2f7]'
                                    }`}
                            >
                                <div className="font-medium">Regular Clean</div>
                                <div className="text-sm mt-1 text-gray-600">$55/hour</div>
                            </button>
                        </div>

                        {/* Regular Frequency Options */}
                        {additionalOptions.frequency === 'regular' && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                <button
                                    onClick={() => setAdditionalOptions({
                                        ...additionalOptions,
                                        regularFrequency: 'daily'
                                    })}
                                    className={`p-4 rounded-lg border-2 transition-all
                                        ${additionalOptions.regularFrequency === 'daily'
                                            ? 'border-[#1E3D8F] bg-[#e6f0fa] text-[#1E3D8F]'
                                            : 'border-gray-200 hover:border-[#90c2f7]'
                                        }`}
                                >
                                    <div className="font-medium">Daily</div>
                                    <div className="text-sm mt-1 text-gray-600">20% off</div>
                                    <div className="text-sm mt-1 text-[#1E3D8F]">$44/hour</div>
                                </button>
                                <button
                                    onClick={() => setAdditionalOptions({
                                        ...additionalOptions,
                                        regularFrequency: 'weekly'
                                    })}
                                    className={`p-4 rounded-lg border-2 transition-all
                                        ${additionalOptions.regularFrequency === 'weekly'
                                            ? 'border-[#1E3D8F] bg-[#e6f0fa] text-[#1E3D8F]'
                                            : 'border-gray-200 hover:border-[#90c2f7]'
                                        }`}
                                >
                                    <div className="font-medium">Weekly</div>
                                    <div className="text-sm mt-1 text-gray-600">15% off</div>
                                    <div className="text-sm mt-1 text-[#1E3D8F]">$46.75/hour</div>
                                </button>
                                <button
                                    onClick={() => setAdditionalOptions({
                                        ...additionalOptions,
                                        regularFrequency: 'biweekly'
                                    })}
                                    className={`p-4 rounded-lg border-2 transition-all
                                        ${additionalOptions.regularFrequency === 'biweekly'
                                            ? 'border-[#1E3D8F] bg-[#e6f0fa] text-[#1E3D8F]'
                                            : 'border-gray-200 hover:border-[#90c2f7]'
                                        }`}
                                >
                                    <div className="font-medium">Fortnightly</div>
                                    <div className="text-sm mt-1 text-gray-600">10% off</div>
                                    <div className="text-sm mt-1 text-[#1E3D8F]">$49.50/hour</div>
                                </button>
                                <button
                                    onClick={() => setAdditionalOptions({
                                        ...additionalOptions,
                                        regularFrequency: 'monthly'
                                    })}
                                    className={`p-4 rounded-lg border-2 transition-all
                                        ${additionalOptions.regularFrequency === 'monthly'
                                            ? 'border-[#1E3D8F] bg-[#e6f0fa] text-[#1E3D8F]'
                                            : 'border-gray-200 hover:border-[#90c2f7]'
                                        }`}
                                >
                                    <div className="font-medium">Monthly</div>
                                    <div className="text-sm mt-1 text-gray-600">No discount</div>
                                    <div className="text-sm mt-1 text-[#1E3D8F]">$55/hour</div>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Hours and Staff Requirements */}
            {additionalOptions.frequency && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-6">Service Requirements</h4>
                    <div className="space-y-6">
                        {/* Hours Per Visit */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Hours Required Per Visit
                            </label>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setAdditionalOptions({
                                        ...additionalOptions,
                                        hoursPerVisit: Math.max(1, additionalOptions.hoursPerVisit - 1)
                                    })}
                                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center
                                        text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                >
                                    -
                                </button>
                                <span className="w-16 text-center font-medium text-gray-900">
                                    {additionalOptions.hoursPerVisit} hrs
                                </span>
                                <button
                                    onClick={() => setAdditionalOptions({
                                        ...additionalOptions,
                                        hoursPerVisit: Math.min(12, additionalOptions.hoursPerVisit + 1)
                                    })}
                                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center
                                        text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                >
                                    +
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                                Estimated time needed for each cleaning visit
                            </p>
                        </div>

                        {/* Staff Required */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Number of Staff Required
                            </label>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setAdditionalOptions({
                                        ...additionalOptions,
                                        staffRequired: Math.max(1, additionalOptions.staffRequired - 1)
                                    })}
                                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center
                                        text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                >
                                    -
                                </button>
                                <span className="w-16 text-center font-medium text-gray-900">
                                    {additionalOptions.staffRequired} {additionalOptions.staffRequired === 1 ? 'person' : 'people'}
                                </span>
                                <button
                                    onClick={() => setAdditionalOptions({
                                        ...additionalOptions,
                                        staffRequired: Math.min(10, additionalOptions.staffRequired + 1)
                                    })}
                                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center
                                        text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                >
                                    +
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                                Number of cleaning staff needed for the job
                            </p>
                        </div>

                        {/* Total Hours Info */}
                        <div className="p-4 bg-[#e6f0fa] rounded-lg">
                            <div className="flex items-center justify-between">
                                <div className="text-gray-900">
                                    Total Hours per Visit:
                                </div>
                                <div className="font-medium text-[#1E3D8F]">
                                    {additionalOptions.hoursPerVisit * additionalOptions.staffRequired} hours
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                                ({additionalOptions.staffRequired} staff × {additionalOptions.hoursPerVisit} hours each)
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Contact Information */}
            {additionalOptions.frequency && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-6">Contact Information</h4>
                    <div className="space-y-4">
                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company Contact Number
                            </label>
                            <input
                                type="tel"
                                value={additionalOptions.contact.phone}
                                onChange={(e) => setAdditionalOptions({
                                    ...additionalOptions,
                                    contact: {
                                        ...additionalOptions.contact,
                                        phone: e.target.value
                                    }
                                })}
                                className="w-full p-3 border border-gray-200 rounded-lg
                                    focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                placeholder="Enter contact number"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company Email
                            </label>
                            <input
                                type="email"
                                value={additionalOptions.contact.email}
                                onChange={(e) => setAdditionalOptions({
                                    ...additionalOptions,
                                    contact: {
                                        ...additionalOptions.contact,
                                        email: e.target.value
                                    }
                                })}
                                className="w-full p-3 border border-gray-200 rounded-lg
                                    focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                placeholder="Enter company email"
                            />
                        </div>

                        {/* Preferred Cleaning Time and Start Time */}
                        <div className="space-y-4">
                            {/* Preferred Cleaning Time */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Preferred Cleaning Time
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { value: 'during', label: 'During Hours' },
                                        { value: 'after', label: 'After Hours' },
                                        { value: 'before', label: 'Before Hours' }
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => setAdditionalOptions({
                                                ...additionalOptions,
                                                operatingHours: {
                                                    ...additionalOptions.operatingHours,
                                                    preferredCleaningTime: option.value as 'during' | 'after' | 'before'
                                                }
                                            })}
                                            className={`p-3 rounded-lg border-2 transition-all text-sm
                                                ${additionalOptions.operatingHours.preferredCleaningTime === option.value
                                                    ? 'border-[#1E3D8F] bg-[#e6f0fa] text-[#1E3D8F]'
                                                    : 'border-gray-200 hover:border-[#90c2f7]'
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Start Time with Auto-calculated Finish Time */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Start Time
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <input
                                            type="time"
                                            value={additionalOptions.operatingHours.startTime}
                                            onChange={(e) => setAdditionalOptions({
                                                ...additionalOptions,
                                                operatingHours: {
                                                    ...additionalOptions.operatingHours,
                                                    startTime: e.target.value
                                                }
                                            })}
                                            className="w-full p-3 border border-gray-200 rounded-lg
                                                focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                        />
                                    </div>
                                    <div>
                                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600">
                                            Finish: {calculateFinishTime(additionalOptions.operatingHours.startTime, additionalOptions.hoursPerVisit)}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">
                                    Total duration: {additionalOptions.hoursPerVisit} hours
                                </p>
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Additional Requirements
                            </label>
                            <textarea
                                value={additionalOptions.contact.message}
                                onChange={(e) => setAdditionalOptions({
                                    ...additionalOptions,
                                    contact: {
                                        ...additionalOptions.contact,
                                        message: e.target.value
                                    }
                                })}
                                rows={4}
                                className="w-full p-3 border border-gray-200 rounded-lg
                                    focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                placeholder="Describe any specific requirements or additional information"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Add Price Section above Next Step Button */}
            {additionalOptions.frequency && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Your Price</h4>
                    <div className="bg-[#F8FAFC] rounded-lg p-4">
                        {/* Hours and Rate Breakdown */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <div className="text-gray-600">Hours per Visit:</div>
                                <div className="font-medium text-gray-900">
                                    {additionalOptions.hoursPerVisit * additionalOptions.staffRequired} hours
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="text-gray-600">Staff Required:</div>
                                <div className="font-medium text-gray-900">
                                    {additionalOptions.staffRequired} {additionalOptions.staffRequired === 1 ? 'person' : 'people'}
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="text-gray-600">Base Rate:</div>
                                <div className="font-medium text-[#1E3D8F]">
                                    ${additionalOptions.frequency === 'once' ? '65' : '55'}/hour
                                </div>
                            </div>

                            {/* Frequency Discount Info */}
                            {additionalOptions.frequency === 'regular' && additionalOptions.regularFrequency && (
                                <div className="flex justify-between items-center text-sm text-green-600">
                                    <div>
                                        {additionalOptions.regularFrequency === 'daily' && 'Daily Discount (20% off)'}
                                        {additionalOptions.regularFrequency === 'weekly' && 'Weekly Discount (15% off)'}
                                        {additionalOptions.regularFrequency === 'biweekly' && 'Fortnightly Discount (10% off)'}
                                        {additionalOptions.regularFrequency === 'monthly' && 'No Discount Applied'}
                                    </div>
                                    <div>
                                        {additionalOptions.regularFrequency !== 'monthly' && 
                                            `-$${calculateDiscount().toFixed(2)}`}
                                    </div>
                                </div>
                            )}

                            {/* Minimum Hours Notice for Once-off */}
                            {additionalOptions.frequency === 'once' && (
                                <div className="text-sm text-gray-500 bg-gray-50 p-2 rounded">
                                    Note: Minimum booking of 3 hours required for once-off service
                                </div>
                            )}

                            {/* Total */}
                            <div className="border-t border-gray-200 mt-4 pt-4">
                                <div className="flex justify-between items-center">
                                    <div className="font-medium text-gray-900">Total Price:</div>
                                    <div className="font-semibold text-lg text-[#1E3D8F]">
                                        ${calculateTotalPrice().toFixed(2)}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mt-2">
                                    {additionalOptions.frequency === 'regular' 
                                        ? `Price per service with ${additionalOptions.regularFrequency} cleaning schedule`
                                        : 'One-time service price'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Error Message Display */}
            {submitError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                    {submitError}
                </div>
            )}

            {/* Next Step Button */}
            {additionalOptions.frequency && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <button
                        onClick={handleBookingSubmit}
                        disabled={isSubmitting || !additionalOptions.companyDetails.name}
                        className={`w-full py-4 px-6 rounded-lg font-medium
                            flex items-center justify-center gap-2 text-lg
                            ${isSubmitting || !additionalOptions.companyDetails.name
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-[#1E3D8F] text-white hover:bg-[#1E3D8F]/90 transition-colors'
                            }`}
                    >
                        {isSubmitting ? 'Processing...' : 'Next Step'}
                        <Check className="w-5 h-5" />
                    </button>

                    {/* Warning Message */}
                    {!additionalOptions.companyDetails.name && (
                        <p className="text-red-500 text-sm mt-2 text-center">
                            Please enter your company name to proceed
                        </p>
                    )}
                </div>
            )}
        </div>
    )
} 