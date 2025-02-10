'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'

import { BaseServiceProps } from '../BaseServiceComponent'



const homeTypes = [
    { id: 'studio', label: 'Studio' },
    { id: '1bed', label: '1 Bedroom' },
    { id: '2bed', label: '2 Bedrooms' },
    { id: '3bed', label: '3 Bedrooms' },
    { id: '4bed', label: '4 Bedrooms' },
    { id: '5plus', label: '5+ Bedrooms' }
]



interface AdditionalOptions {
    bathrooms: string;
    toilets: string;
    propertyType: 'single' | 'double' | 'apartment';
    frequency: 'once' | 'regular' | null;
    regularFrequency?: 'weekly' | 'biweekly' | 'monthly';
    minContract?: '3' | '6' | '12';
    hasPets: boolean;
    additionalNotes: string;
    parkingType: 'street' | 'provided' | 'paid' | 'none';
    selectedExtras: string[];
    providesEquipment: boolean;
    hours?: number;
    customHours?: number;
    ndisDetails: {
        clientNumber: string;
        clientName: string;
        caseManager: {
            name: string;
            email: string;
            phone: string;
        };
        fundingCompany: {
            name: string;
            email: string;
            phone: string;
            referenceNumber?: string;
        };
    };
}

// Add these arrays for the dropdown options
const bathroomOptions = [
    { value: '1', label: '1 Bathroom' },
    { value: '2', label: '2 Bathrooms' },
    { value: '3', label: '3 Bathrooms' },
    { value: '4', label: '4 Bathrooms' },
    { value: '5', label: '5+ Bathrooms' }
];

const toiletOptions = [
    { value: '1', label: '1 Toilet' },
    { value: '2', label: '2 Toilets' },
    { value: '3', label: '3 Toilets' },
    { value: '4', label: '4 Toilets' },
    { value: '5', label: '5+ Toilets' }
];

// First define the type
type NDISCleanProps = Omit<BaseServiceProps, 'features' | 'id' | 'title' | 'description' | 'basePrice' | 'baseDuration'>;

// Then use empty destructuring if props aren't needed
export default function NDISClean({}: NDISCleanProps) {
    const router = useRouter()
    const [selectedSize, setSelectedSize] = useState<string>('')
    
    const [additionalOptions, setAdditionalOptions] = useState<AdditionalOptions>({
        bathrooms: '1',
        toilets: '1',
        propertyType: 'single',
        frequency: null,
        hasPets: false,
        additionalNotes: '',
        parkingType: 'none',
        selectedExtras: [],
        providesEquipment: false,
        hours: undefined,
        customHours: undefined,
        ndisDetails: {
            clientNumber: '',
            clientName: '',
            caseManager: {
                name: '',
                email: '',
                phone: ''
            },
            fundingCompany: {
                name: '',
                email: '',
                phone: '',
                referenceNumber: ''
            }
        }
    })

    

    // Add these state variables at the top with other states
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // Move helper functions to the top
    const getHourlyRate = (frequency: string | null, regularFrequency?: string) => {
        if (frequency === 'once') return 50.20;
        if (frequency === 'regular' && regularFrequency) {
            switch (regularFrequency) {
                case 'weekly': return 45.18;
                case 'biweekly': return 47.19;
                case 'monthly': return 48.69;
                default: return 50.20;
            }
        }
        return 50.20;
    };

    const calculateTotalPrice = useCallback(() => {
        const hourlyRate = getHourlyRate(
            additionalOptions.frequency,
            additionalOptions.regularFrequency
        );
        const hours = additionalOptions.hours || additionalOptions.customHours || 0;
        return hourlyRate * hours;
    }, [additionalOptions]);

    // Now useEffect can access calculateTotalPrice
    useEffect(() => {
        const updateServiceData = () => {
            const hours = additionalOptions.hours || additionalOptions.customHours || 0;
            if (hours > 0 && additionalOptions.frequency) {
                const hourlyRate = getHourlyRate(
                    additionalOptions.frequency,
                    additionalOptions.regularFrequency
                );
                const totalPrice = calculateTotalPrice();

                const serviceData = {
                    name: "NDIS Clean",
                    type: "ndis-clean",
                    details: {
                        frequency: additionalOptions.frequency,
                        regularFrequency: additionalOptions.regularFrequency,
                        hours: hours,
                        price: totalPrice,
                        hourlyRate: hourlyRate,
                        propertySize: selectedSize,
                        bathrooms: additionalOptions.bathrooms,
                        toilets: additionalOptions.toilets,
                        propertyType: additionalOptions.propertyType,
                        hasPets: additionalOptions.hasPets,
                        ndisDetails: additionalOptions.ndisDetails
                    }
                };

                localStorage.setItem('selectedService', JSON.stringify(serviceData));
                window.dispatchEvent(new CustomEvent('localStorageChange'));
            }
        };

        updateServiceData();
    }, [additionalOptions, selectedSize, calculateTotalPrice]);

    // Handler functions
    const handleFrequencySelect = (frequency: 'once' | 'regular' | null) => {
        setAdditionalOptions(prev => ({
            ...prev,
            frequency,
            regularFrequency: frequency === 'regular' ? 'weekly' : undefined
        }));
    };

    const handleHoursSelect = (hours: number) => {
        setAdditionalOptions(prev => ({
            ...prev,
            hours,
            customHours: undefined
        }));
    };

    const handleCustomHoursChange = (value: number) => {
        if (value >= 6 && value <= 9) {
            setAdditionalOptions(prev => ({
                ...prev,
                hours: undefined,
                customHours: value
            }));
        }
    };

    const handleSizeSelect = (sizeId: string) => {
        setSelectedSize(sizeId);
    };

    // Add validation function
    const validateBooking = (): boolean => {
        try {
            if (!selectedSize) {
                setSubmitError('Please select a property size');
                return false;
            }

            // Validate NDIS details
            if (!additionalOptions.ndisDetails.clientNumber || !additionalOptions.ndisDetails.clientName) {
                setSubmitError('Please provide NDIS client details');
                return false;
            }

            // Validate frequency
            if (!additionalOptions.frequency) {
                setSubmitError('Please select service frequency');
                return false;
            }

            // Validate hours
            const hours = additionalOptions.hours || additionalOptions.customHours;
            if (!hours || hours <= 0) {
                setSubmitError('Please select valid service hours');
                return false;
            }

            // Validate price calculation
            const totalPrice = calculateTotalPrice();
            if (!totalPrice || totalPrice <= 0) {
                setSubmitError('Invalid price calculation');
                return false;
            }

            return true;
        } catch (error) {
            console.error('Validation error:', error);
            setSubmitError('Validation failed: Please check all required fields');
            return false;
        }
    };

    // Update the handleBookingSubmit function
    const handleBookingSubmit = async () => {
        if (isSubmitting) return;
        
        try {
            setSubmitError(null);
            setIsSubmitting(true);

            // Validate before proceeding
            if (!validateBooking()) {
                return;
            }

            // Calculate total price with validation
            const totalPrice = calculateTotalPrice();
            if (!totalPrice || totalPrice <= 0) {
                throw new Error('Invalid price calculation');
            }

            // Format service data with validated price
            const serviceData = {
                type: "ndis-clean" as const,
                name: "NDIS Clean",
                price: totalPrice,
                details: {
                    propertyDetails: {
                        size: selectedSize,
                        bathrooms: additionalOptions.bathrooms,
                        toilets: additionalOptions.toilets,
                        propertyType: additionalOptions.propertyType,
                        hasPets: additionalOptions.hasPets
                    },
                    serviceFrequency: {
                        type: additionalOptions.frequency,
                        regularFrequency: additionalOptions.regularFrequency
                    },
                    hours: {
                        selected: additionalOptions.hours?.toString() || '',
                        customHours: additionalOptions.customHours
                    },
                    ndisDetails: additionalOptions.ndisDetails,
                    additionalNotes: additionalOptions.additionalNotes,
                    priceBreakdown: [{
                        description: `${additionalOptions.hours || additionalOptions.customHours} hours @ $${getHourlyRate(
                            additionalOptions.frequency,
                            additionalOptions.regularFrequency
                        ).toFixed(2)}/hour`,
                        amount: totalPrice
                    }]
                }
            };

            // Save to localStorage
            localStorage.setItem('selectedService', JSON.stringify(serviceData));

            // Emit event for other components
            window.dispatchEvent(new CustomEvent('serviceUpdate', { detail: serviceData }));

            // Navigate to details page
            router.push('/quick-book/details');

        } catch (error) {
            console.error('Error preparing NDIS cleaning data:', error);
            setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Frequency Section */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4">Select Service Frequency</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Once-off Option */}
                    <button
                        onClick={() => handleFrequencySelect('once')}
                        className={`p-4 rounded-xl border-2 transition-all text-left
                            ${additionalOptions.frequency === 'once'
                                ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                : 'border-gray-200 hover:border-[#90c2f7]'
                            }`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-gray-900">Once-off Clean</h5>
                            {additionalOptions.frequency === 'once' && (
                                <Check className="w-5 h-5 text-[#1E3D8F]" />
                            )}
                        </div>
                        <p className="text-sm text-gray-600">
                            Single cleaning service without any commitment
                        </p>
                        <div className="mt-2 text-[#1E3D8F] font-medium">
                            From $50.20/hour
                        </div>
                    </button>

                    {/* Regular Option */}
                    <button
                        onClick={() => handleFrequencySelect('regular')}
                        className={`p-4 rounded-xl border-2 transition-all text-left
                            ${additionalOptions.frequency === 'regular'
                                ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                : 'border-gray-200 hover:border-[#90c2f7]'
                            }`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-gray-900">Regular Clean</h5>
                            {additionalOptions.frequency === 'regular' && (
                                <Check className="w-5 h-5 text-[#1E3D8F]" />
                            )}
                        </div>
                        <p className="text-sm text-gray-600">
                            Scheduled cleaning with NDIS plan support
                        </p>
                        <div className="mt-2">
                            <div className="text-[#1E3D8F] font-medium">
                                From $45.18/hour
                            </div>
                            <div className="text-sm text-green-600">
                                Save 10% on regular bookings
                            </div>
                        </div>
                    </button>
                </div>

                {/* Regular Cleaning Options */}
                {additionalOptions.frequency === 'regular' && (
                    <div className="mt-6 space-y-6 pt-6 border-t border-gray-200">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                How often would you like your clean?
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                    { 
                                        value: 'weekly', 
                                        label: 'Weekly', 
                                        discount: '10%',
                                        price: '$45.18/hour'
                                    },
                                    { 
                                        value: 'biweekly', 
                                        label: 'Fortnightly', 
                                        discount: '6%',
                                        price: '$47.19/hour'
                                    },
                                    { 
                                        value: 'monthly', 
                                        label: 'Monthly', 
                                        discount: '3%',
                                        price: '$48.69/hour'
                                    }
                                ].map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => setAdditionalOptions({
                                            ...additionalOptions,
                                            regularFrequency: option.value as AdditionalOptions['regularFrequency']
                                        })}
                                        className={`p-3 rounded-lg border-2 transition-all
                                            ${additionalOptions.regularFrequency === option.value
                                                ? 'border-[#1E3D8F] bg-[#e6f0fa] text-[#1E3D8F]'
                                                : 'border-gray-200 hover:border-[#90c2f7]'
                                            }`}
                                    >
                                        <div className="font-medium">{option.label}</div>
                                        <div className="text-[#1E3D8F] text-sm mt-1">{option.price}</div>
                                        <div className="text-sm mt-1 text-green-600">Save {option.discount}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Hours Selection Section */}
            {additionalOptions.frequency && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">How many hours would you like to book?</h4>
                    
                    {/* Predefined Hours Options */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                        {[2, 3, 4, 5].map((hours) => (
                            <button
                                key={hours}
                                onClick={() => handleHoursSelect(hours)}
                                className={`p-4 rounded-xl border-2 transition-all text-center
                                    ${additionalOptions.hours === hours
                                        ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                        : 'border-gray-200 hover:border-[#90c2f7]'
                                    }`}
                            >
                                <div className="font-medium text-gray-900 mb-1">
                                    {hours} Hours
                                </div>
                                <div className="text-[#1E3D8F] font-medium">
                                    ${Math.round(getHourlyRate(
                                        additionalOptions.frequency,
                                        additionalOptions.regularFrequency
                                    ) * hours * 100) / 100}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Custom Hours Input */}
                    <div className="space-y-4">
                        <div className="text-gray-700">Need more hours?</div>
                        <input
                            type="number"
                            min="6"
                            max="9"
                            placeholder="Enter hours (6-9)"
                            value={additionalOptions.customHours || ''}
                            onChange={(e) => handleCustomHoursChange(parseInt(e.target.value))}
                            className="w-full p-3 border border-gray-200 rounded-lg
                                focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]
                                placeholder:text-gray-400"
                        />

                        {additionalOptions.customHours && (
                            <div className="text-[#1E3D8F] font-medium text-right">
                                ${(getHourlyRate(
                                    additionalOptions.frequency,
                                    additionalOptions.regularFrequency
                                ) * additionalOptions.customHours).toFixed(2)}
                            </div>
                        )}

                        {/* Hours Recommendation */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-gray-700 mb-2">Not sure how many hours? We recommend:</div>
                            <ul className="space-y-2 text-gray-600">
                                <li>• Studio: 2 hours</li>
                                <li>• 1 Bed: 3 hours</li>
                                <li>• 2 Bed: 4 hours</li>
                                <li>• 3 Bed: 5 hours</li>
                                <li>• Larger homes may require additional hours</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
            
            {/* NDIS Client Details Section */}
            {selectedSize !== '5plus' && additionalOptions.frequency && additionalOptions.hours && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-6">NDIS Client Details</h4>
                    
                    <div className="space-y-6">
                        {/* Client Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    NDIS Client Number<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={additionalOptions.ndisDetails.clientNumber}
                                    onChange={(e) => setAdditionalOptions({
                                        ...additionalOptions,
                                        ndisDetails: {
                                            ...additionalOptions.ndisDetails,
                                            clientNumber: e.target.value
                                        }
                                    })}
                                    placeholder="Enter NDIS number"
                                    className="w-full p-3 border border-gray-200 rounded-lg
                                        focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Client Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={additionalOptions.ndisDetails.clientName}
                                    onChange={(e) => setAdditionalOptions({
                                        ...additionalOptions,
                                        ndisDetails: {
                                            ...additionalOptions.ndisDetails,
                                            clientName: e.target.value
                                        }
                                    })}
                                    placeholder="Enter client's full name"
                                    className="w-full p-3 border border-gray-200 rounded-lg
                                        focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                />
                            </div>
                        </div>

                        {/* Case Manager Details */}
                        <div>
                            <h5 className="font-medium text-gray-900 mb-4">Case Manager Details</h5>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={additionalOptions.ndisDetails.caseManager.name}
                                        onChange={(e) => setAdditionalOptions({
                                            ...additionalOptions,
                                            ndisDetails: {
                                                ...additionalOptions.ndisDetails,
                                                caseManager: {
                                                    ...additionalOptions.ndisDetails.caseManager,
                                                    name: e.target.value
                                                }
                                            }
                                        })}
                                        placeholder="Case manager's name"
                                        className="w-full p-3 border border-gray-200 rounded-lg
                                            focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={additionalOptions.ndisDetails.caseManager.email}
                                        onChange={(e) => setAdditionalOptions({
                                            ...additionalOptions,
                                            ndisDetails: {
                                                ...additionalOptions.ndisDetails,
                                                caseManager: {
                                                    ...additionalOptions.ndisDetails.caseManager,
                                                    email: e.target.value
                                                }
                                            }
                                        })}
                                        placeholder="Case manager's email"
                                        className="w-full p-3 border border-gray-200 rounded-lg
                                            focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        value={additionalOptions.ndisDetails.caseManager.phone}
                                        onChange={(e) => setAdditionalOptions({
                                            ...additionalOptions,
                                            ndisDetails: {
                                                ...additionalOptions.ndisDetails,
                                                caseManager: {
                                                    ...additionalOptions.ndisDetails.caseManager,
                                                    phone: e.target.value
                                                }
                                            }
                                        })}
                                        placeholder="Case manager's phone"
                                        className="w-full p-3 border border-gray-200 rounded-lg
                                            focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Funding Company Details */}
                        <div>
                            <h5 className="font-medium text-gray-900 mb-4">Funding Company Details</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        value={additionalOptions.ndisDetails.fundingCompany.name}
                                        onChange={(e) => setAdditionalOptions({
                                            ...additionalOptions,
                                            ndisDetails: {
                                                ...additionalOptions.ndisDetails,
                                                fundingCompany: {
                                                    ...additionalOptions.ndisDetails.fundingCompany,
                                                    name: e.target.value
                                                }
                                            }
                                        })}
                                        placeholder="Funding company name"
                                        className="w-full p-3 border border-gray-200 rounded-lg
                                            focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Reference Number (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={additionalOptions.ndisDetails.fundingCompany.referenceNumber}
                                        onChange={(e) => setAdditionalOptions({
                                            ...additionalOptions,
                                            ndisDetails: {
                                                ...additionalOptions.ndisDetails,
                                                fundingCompany: {
                                                    ...additionalOptions.ndisDetails.fundingCompany,
                                                    referenceNumber: e.target.value
                                                }
                                            }
                                        })}
                                        placeholder="Reference number if available"
                                        className="w-full p-3 border border-gray-200 rounded-lg
                                            focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={additionalOptions.ndisDetails.fundingCompany.email}
                                        onChange={(e) => setAdditionalOptions({
                                            ...additionalOptions,
                                            ndisDetails: {
                                                ...additionalOptions.ndisDetails,
                                                fundingCompany: {
                                                    ...additionalOptions.ndisDetails.fundingCompany,
                                                    email: e.target.value
                                                }
                                            }
                                        })}
                                        placeholder="Company email"
                                        className="w-full p-3 border border-gray-200 rounded-lg
                                            focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        value={additionalOptions.ndisDetails.fundingCompany.phone}
                                        onChange={(e) => setAdditionalOptions({
                                            ...additionalOptions,
                                            ndisDetails: {
                                                ...additionalOptions.ndisDetails,
                                                fundingCompany: {
                                                    ...additionalOptions.ndisDetails.fundingCompany,
                                                    phone: e.target.value
                                                }
                                            }
                                        })}
                                        placeholder="Company phone"
                                        className="w-full p-3 border border-gray-200 rounded-lg
                                            focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Property Details Section (Merged Home Size & Additional Details) */}
            {selectedSize !== '5plus' && additionalOptions.frequency && additionalOptions.hours && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-6">Property Details</h4>
                    
                    <div className="space-y-6">
                        {/* Home Size Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Select Home Size
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                                {homeTypes.map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => handleSizeSelect(type.id)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                                            ${selectedSize === type.id 
                                                ? 'bg-[#e6f0fa] text-[#1E3D8F] border-2 border-[#1E3D8F]'
                                                : 'bg-white border border-gray-200 text-gray-600 hover:border-[#90c2f7]'
                                            }`}
                                    >
                                        {type.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Bathrooms and Toilets */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Bathrooms Dropdown */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Number of Bathrooms
                                </label>
                                <select
                                    value={additionalOptions.bathrooms}
                                    onChange={(e) => setAdditionalOptions({
                                        ...additionalOptions,
                                        bathrooms: e.target.value
                                    })}
                                    className="w-full p-3 border border-gray-200 rounded-lg
                                        focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                >
                                    {bathroomOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Toilets Dropdown */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Number of Toilets
                                </label>
                                <select
                                    value={additionalOptions.toilets}
                                    onChange={(e) => setAdditionalOptions({
                                        ...additionalOptions,
                                        toilets: e.target.value
                                    })}
                                    className="w-full p-3 border border-gray-200 rounded-lg
                                        focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                >
                                    {toiletOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Property Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Property Type
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                    { value: 'single', label: 'Single Story' },
                                    { value: 'double', label: 'Double Story' },
                                    { value: 'apartment', label: 'Apartment' }
                                ].map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => setAdditionalOptions({
                                            ...additionalOptions,
                                            propertyType: option.value as AdditionalOptions['propertyType']
                                        })}
                                        className={`p-3 rounded-lg border-2 transition-all
                                            ${additionalOptions.propertyType === option.value
                                                ? 'border-[#1E3D8F] bg-[#e6f0fa] text-[#1E3D8F]'
                                                : 'border-gray-200 hover:border-[#90c2f7]'
                                            }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Pets Toggle */}
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium text-gray-900">
                                    Pets in Property
                                </div>
                                <div className="text-sm text-gray-600">
                                    Have there been any pets living in the property?
                                </div>
                            </div>
                            <button
                                onClick={() => setAdditionalOptions({
                                    ...additionalOptions,
                                    hasPets: !additionalOptions.hasPets
                                })}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                    ${additionalOptions.hasPets ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                        ${additionalOptions.hasPets ? 'translate-x-6' : 'translate-x-1'}`}
                                />
                            </button>
                        </div>

                        {/* Additional Notes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Additional Notes or Special Requirements
                            </label>
                            <textarea
                                value={additionalOptions.additionalNotes}
                                onChange={(e) => setAdditionalOptions({
                                    ...additionalOptions,
                                    additionalNotes: e.target.value
                                })}
                                placeholder="Please provide any additional information that might help us serve you better. For example: specific areas that need attention, access instructions, or any concerns."
                                rows={4}
                                className="w-full p-3 border border-gray-200 rounded-lg
                                    focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]
                                    placeholder:text-gray-400"
                            />
                            <p className="text-sm text-gray-600 mt-2">
                                This information helps us prepare better for your cleaning service
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Your Price Section */}
            {additionalOptions.frequency && (additionalOptions.hours || additionalOptions.customHours) && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Your Price</h4>
                    <div className="bg-[#F8FAFC] rounded-lg p-4">
                        {/* Hours and Rate Breakdown */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <div className="text-gray-600">Hours Selected:</div>
                                <div className="font-medium text-gray-900">
                                    {additionalOptions.hours || additionalOptions.customHours} hours
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="text-gray-600">Hourly Rate:</div>
                                <div className="font-medium text-[#1E3D8F]">
                                    ${getHourlyRate(
                                        additionalOptions.frequency,
                                        additionalOptions.regularFrequency
                                    ).toFixed(2)}/hour
                                </div>
                            </div>

                            {/* Frequency Discount Info */}
                            {additionalOptions.frequency === 'regular' && additionalOptions.regularFrequency && (
                                <div className="flex justify-between items-center text-sm text-green-600">
                                    <div>
                                        {additionalOptions.regularFrequency === 'weekly' && 'Weekly Discount (10% off)'}
                                        {additionalOptions.regularFrequency === 'biweekly' && 'Fortnightly Discount (6% off)'}
                                        {additionalOptions.regularFrequency === 'monthly' && 'Monthly Discount (3% off)'}
                                    </div>
                                    <div>Applied to rate</div>
                                </div>
                            )}
                        </div>

                        {/* Total */}
                        <div className="border-t border-gray-200 mt-4 pt-4">
                            <div className="flex justify-between items-center">
                                <div className="font-medium text-gray-900">Total Price:</div>
                                <div className="font-semibold text-lg text-[#1E3D8F]">
                                    ${calculateTotalPrice().toFixed(2)}
                                </div>
                            </div>
                            {additionalOptions.frequency === 'regular' && (
                                <p className="text-sm text-gray-600 mt-2">
                                    Price per service with {additionalOptions.regularFrequency} cleaning schedule
                                </p>
                            )}
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
            {additionalOptions.frequency && (additionalOptions.hours || additionalOptions.customHours) && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <button
                        onClick={handleBookingSubmit}
                        disabled={isSubmitting || !additionalOptions.ndisDetails.clientNumber || !additionalOptions.ndisDetails.clientName}
                        className={`w-full py-4 px-6 rounded-lg font-medium
                            flex items-center justify-center gap-2 text-lg
                            ${isSubmitting || !additionalOptions.ndisDetails.clientNumber || !additionalOptions.ndisDetails.clientName
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-[#1E3D8F] text-white hover:bg-[#1E3D8F]/90 transition-colors'
                            }`}
                    >
                        {isSubmitting ? 'Processing...' : 'Next Step'}
                        <Check className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    )
} 