'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'
import { useBookingStore } from '../../../store/bookingStore'

import { 
    HomeSizeType,
    PropertyType,
    RegularFrequencyType,
    NDISCleaningServiceData,
    NDISCleaningState
    
} from '../../../types/serviceinterface/ndiscleaning'


// Constants can stay
const homeTypes = [
    { id: 'studio', label: 'Studio' },
    { id: '1bed', label: '1 Bedroom' },
    { id: '2bed', label: '2 Bedrooms' },
    { id: '3bed', label: '3 Bedrooms' },
    { id: '4bed', label: '4 Bedrooms' },
    { id: '5plus', label: '5+ Bedrooms' }
];

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

// Remove old AdditionalOptions interface as we now use the imported interfaces

export default function NDISClean() {
    const router = useRouter()
    const setNDISCleaningDetails = useBookingStore(state => state.setNDISCleaningDetails)
    
    // Update state to use new interface
    const [state, setState] = useState<NDISCleaningState>({
        selectedSize: '',
        details: {
            propertyDetails: {
                size: '1bed',
                bathrooms: '1',
                toilets: '1',
                propertyType: 'single',
                hasPets: false
            },
            serviceFrequency: {
                type: null
            },
            hours: {
                selected: undefined,
                customHours: undefined
            },
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
            },
            additionalOptions: {
                parkingType: 'none',
                selectedExtras: [],
                providesEquipment: false,
                additionalNotes: ''
            }
        },
        isSubmitting: false,
        submitError: null
    })

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
            state.details.serviceFrequency.type,
            state.details.serviceFrequency.regularFrequency
        );
        const hours = state.details.hours.selected || state.details.hours.customHours || 0;
        return hourlyRate * hours;
    }, [state.details.serviceFrequency.type, state.details.serviceFrequency.regularFrequency, state.details.hours.selected, state.details.hours.customHours]);

    // Now useEffect can access calculateTotalPrice
    useEffect(() => {
        const updateServiceData = () => {
            const hours = state.details.hours.selected || state.details.hours.customHours || 0;
            if (hours > 0 && state.details.serviceFrequency.type) {
                const hourlyRate = getHourlyRate(
                    state.details.serviceFrequency.type,
                    state.details.serviceFrequency.regularFrequency
                );
                const totalPrice = calculateTotalPrice();

                const serviceData = {
                    name: "NDIS Clean",
                    type: "ndis-clean",
                    details: {
                        frequency: state.details.serviceFrequency.type,
                        regularFrequency: state.details.serviceFrequency.regularFrequency,
                        hours: hours,
                        price: totalPrice,
                        hourlyRate: hourlyRate,
                        propertySize: state.selectedSize,
                        bathrooms: state.details.propertyDetails.bathrooms,
                        toilets: state.details.propertyDetails.toilets,
                        propertyType: state.details.propertyDetails.propertyType,
                        hasPets: state.details.propertyDetails.hasPets,
                        ndisDetails: state.details.ndisDetails
                    }
                };

                localStorage.setItem('selectedService', JSON.stringify(serviceData));
                window.dispatchEvent(new CustomEvent('localStorageChange'));
            }
        };

        updateServiceData();
    }, [state.selectedSize, 
        state.details.serviceFrequency.type, 
        state.details.propertyDetails.bathrooms, 
        state.details.propertyDetails.toilets, 
        state.details.propertyDetails.propertyType, 
        state.details.propertyDetails.hasPets, 
        state.details.ndisDetails,
        state.details.hours.customHours,
        state.details.hours.selected,
        state.details.serviceFrequency.regularFrequency, 
        calculateTotalPrice]);

    // Add a new useEffect for real-time price updates
    useEffect(() => {
        if (state.details.hours.selected || state.details.hours.customHours) {
            const totalPrice = calculateTotalPrice();
            
            const details = {
                ...state.details,
                pricing: {
                    totalPrice: totalPrice || 0,
                    priceBreakdown: [{
                        description: 'NDIS Cleaning Service',
                        amount: totalPrice || 0
                    }],
                    hourlyRate: getHourlyRate(
                        state.details.serviceFrequency.type,
                        state.details.serviceFrequency.regularFrequency
                    )
                }
            };

            // Save to localStorage with the correct key
            localStorage.setItem('ndisCleaningDetails', JSON.stringify(details));
            
            // Dispatch event to notify BookingSummary2
            window.dispatchEvent(new CustomEvent('serviceStorageUpdate', {
                detail: {
                    type: 'ndis-cleaning',
                    data: details
                }
            }));
        }
    }, [
        state.details.hours,
        state.details.serviceFrequency,
        calculateTotalPrice,
        state.details
    ]);

    // Handler functions
    const handleFrequencySelect = (frequency: 'once' | 'regular' | null) => {
        setState(prev => ({
            ...prev,
            details: {
                ...prev.details,
                serviceFrequency: {
                    ...prev.details.serviceFrequency,
                    type: frequency,
                    regularFrequency: frequency === 'regular' ? 'weekly' : undefined
                }
            }
        }));
    };

    const handleHoursSelect = (hours: number) => {
        setState(prev => ({
            ...prev,
            details: {
                ...prev.details,
                hours: {
                    ...prev.details.hours,
                    selected: hours,
                    customHours: undefined
                }
            }
        }));
    };

    const handleCustomHoursChange = (value: number) => {
        if (value >= 6 && value <= 9) {
            setState(prev => ({
                ...prev,
                details: {
                    ...prev.details,
                    hours: {
                        ...prev.details.hours,
                        selected: undefined,
                        customHours: value
                    }
                }
            }));
        }
    };

    const handleSizeSelect = (sizeId: HomeSizeType) => {
        setState(prev => ({
            ...prev,
            selectedSize: sizeId,
            details: {
                ...prev.details,
                propertyDetails: {
                    ...prev.details.propertyDetails,
                    size: sizeId
                }
            }
        }));
    };

   

    // Update the handleBookingSubmit function
    const handleBookingSubmit = async () => {
        if (state.isSubmitting) return;
        
        try {
            // 1. Start submission - set loading state
            setState(prev => ({
                ...prev,
                isSubmitting: true,
                submitError: null
            }));

            // Calculate total price
            const totalPrice = calculateTotalPrice();

            // Create service data using our interface
            const serviceData: NDISCleaningServiceData = {
                name: "NDIS Clean",
                type: "ndis-clean",
                price: totalPrice,
                details: {
                    propertyDetails: state.details.propertyDetails,
                    serviceFrequency: state.details.serviceFrequency,
                    hours: state.details.hours,
                    ndisDetails: state.details.ndisDetails,
                    additionalOptions: state.details.additionalOptions,
                    pricing: {
                        baseRate: 50.20,
                        hourlyRate: getHourlyRate(
                            state.details.serviceFrequency.type,
                            state.details.serviceFrequency.regularFrequency
                        ),
                        totalPrice: totalPrice,
                        priceBreakdown: [{
                            description: `NDIS Cleaning Service`,
                            amount: totalPrice
                        }]
                    }
                }
            };

            // 2. Save to Zustand store
            setNDISCleaningDetails(serviceData.details);

            // 3. Save to localStorage for backup
            localStorage.setItem('selectedService', JSON.stringify(serviceData));

            // 4. Navigate to details page
            router.push('/quick-book/details');

        } catch (error) {
            console.error('NDIS Cleaning submission error:', error);
            setState(prev => ({
                ...prev,
                submitError: error instanceof Error ? error.message : 'Something went wrong with your booking'
            }));
        } finally {
            // Reset loading state
            setState(prev => ({
                ...prev,
                isSubmitting: false
            }));
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
                            ${state.details.serviceFrequency.type === 'once'
                                ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                : 'border-gray-200 hover:border-[#90c2f7]'
                            }`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-gray-900">Once-off Clean</h5>
                            {state.details.serviceFrequency.type === 'once' && (
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
                            ${state.details.serviceFrequency.type === 'regular'
                                ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                : 'border-gray-200 hover:border-[#90c2f7]'
                            }`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-gray-900">Regular Clean</h5>
                            {state.details.serviceFrequency.type === 'regular' && (
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
                {state.details.serviceFrequency.type === 'regular' && (
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
                                        onClick={() => setState(prev => ({
                                            ...prev,
                                            details: {
                                                ...prev.details,
                                                serviceFrequency: {
                                                    ...prev.details.serviceFrequency,
                                                    regularFrequency: option.value as RegularFrequencyType
                                                }
                                            }
                                        }))}
                                        className={`p-3 rounded-lg border-2 transition-all
                                            ${state.details.serviceFrequency.regularFrequency === option.value
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
            {state.details.serviceFrequency.type && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">How many hours would you like to book?</h4>
                    
                    {/* Predefined Hours Options */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                        {[2, 3, 4, 5].map((hours) => (
                            <button
                                key={hours}
                                onClick={() => handleHoursSelect(hours)}
                                className={`p-4 rounded-xl border-2 transition-all text-center
                                    ${state.details.hours.selected === hours
                                        ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                        : 'border-gray-200 hover:border-[#90c2f7]'
                                    }`}
                            >
                                <div className="font-medium text-gray-900 mb-1">
                                    {hours} Hours
                                </div>
                                <div className="text-[#1E3D8F] font-medium">
                                    ${Math.round(getHourlyRate(
                                        state.details.serviceFrequency.type,
                                        state.details.serviceFrequency.regularFrequency
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
                            value={state.details.hours.customHours || ''}
                            onChange={(e) => handleCustomHoursChange(parseInt(e.target.value))}
                            className="w-full p-3 border border-gray-200 rounded-lg
                                focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]
                                placeholder:text-gray-400"
                        />

                        {state.details.hours.customHours && (
                            <div className="text-[#1E3D8F] font-medium text-right">
                                ${(getHourlyRate(
                                    state.details.serviceFrequency.type,
                                    state.details.serviceFrequency.regularFrequency
                                ) * state.details.hours.customHours).toFixed(2)}
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
            {state.selectedSize !== '5plus' && state.details.serviceFrequency.type && state.details.hours.selected && (
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
                                    value={state.details.ndisDetails.clientNumber}
                                    onChange={(e) => setState(prev => ({
                                        ...prev,
                                        details: {
                                            ...prev.details,
                                            ndisDetails: {
                                                ...prev.details.ndisDetails,
                                                clientNumber: e.target.value
                                            }
                                        }
                                    }))}
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
                                    value={state.details.ndisDetails.clientName}
                                    onChange={(e) => setState(prev => ({
                                        ...prev,
                                        details: {
                                            ...prev.details,
                                            ndisDetails: {
                                                ...prev.details.ndisDetails,
                                                clientName: e.target.value
                                            }
                                        }
                                    }))}
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
                                        value={state.details.ndisDetails.caseManager.name}
                                        onChange={(e) => setState(prev => ({
                                            ...prev,
                                            details: {
                                                ...prev.details,
                                                ndisDetails: {
                                                    ...prev.details.ndisDetails,
                                                    caseManager: {
                                                        ...prev.details.ndisDetails.caseManager,
                                                        name: e.target.value
                                                    }
                                                }
                                            }
                                        }))}
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
                                        value={state.details.ndisDetails.caseManager.email}
                                        onChange={(e) => setState(prev => ({
                                            ...prev,
                                            details: {
                                                ...prev.details,
                                                ndisDetails: {
                                                    ...prev.details.ndisDetails,
                                                    caseManager: {
                                                        ...prev.details.ndisDetails.caseManager,
                                                        email: e.target.value
                                                    }
                                                }
                                            }
                                        }))}
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
                                        value={state.details.ndisDetails.caseManager.phone}
                                        onChange={(e) => setState(prev => ({
                                            ...prev,
                                            details: {
                                                ...prev.details,
                                                ndisDetails: {
                                                    ...prev.details.ndisDetails,
                                                    caseManager: {
                                                        ...prev.details.ndisDetails.caseManager,
                                                        phone: e.target.value
                                                    }
                                                }
                                            }
                                        }))}
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
                                        value={state.details.ndisDetails.fundingCompany.name}
                                        onChange={(e) => setState(prev => ({
                                            ...prev,
                                            details: {
                                                ...prev.details,
                                                ndisDetails: {
                                                    ...prev.details.ndisDetails,
                                                    fundingCompany: {
                                                        ...prev.details.ndisDetails.fundingCompany,
                                                        name: e.target.value
                                                    }
                                                }
                                            }
                                        }))}
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
                                        value={state.details.ndisDetails.fundingCompany.referenceNumber}
                                        onChange={(e) => setState(prev => ({
                                            ...prev,
                                            details: {
                                                ...prev.details,
                                                ndisDetails: {
                                                    ...prev.details.ndisDetails,
                                                    fundingCompany: {
                                                        ...prev.details.ndisDetails.fundingCompany,
                                                        referenceNumber: e.target.value
                                                    }
                                                }
                                            }
                                        }))}
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
                                        value={state.details.ndisDetails.fundingCompany.email}
                                        onChange={(e) => setState(prev => ({
                                            ...prev,
                                            details: {
                                                ...prev.details,
                                                ndisDetails: {
                                                    ...prev.details.ndisDetails,
                                                    fundingCompany: {
                                                        ...prev.details.ndisDetails.fundingCompany,
                                                        email: e.target.value
                                                    }
                                                }
                                            }
                                        }))}
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
                                        value={state.details.ndisDetails.fundingCompany.phone}
                                        onChange={(e) => setState(prev => ({
                                            ...prev,
                                            details: {
                                                ...prev.details,
                                                ndisDetails: {
                                                    ...prev.details.ndisDetails,
                                                    fundingCompany: {
                                                        ...prev.details.ndisDetails.fundingCompany,
                                                        phone: e.target.value
                                                    }
                                                }
                                            }
                                        }))}
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
            {state.selectedSize !== '5plus' && state.details.serviceFrequency.type && state.details.hours.selected && (
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
                                        onClick={() => handleSizeSelect(type.id as HomeSizeType)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                                            ${state.selectedSize === type.id 
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
                                    value={state.details.propertyDetails.bathrooms}
                                    onChange={(e) => setState(prev => ({
                                        ...prev,
                                        details: {
                                            ...prev.details,
                                            propertyDetails: {
                                                ...prev.details.propertyDetails,
                                                bathrooms: e.target.value
                                            }
                                        }
                                    }))}
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
                                    value={state.details.propertyDetails.toilets}
                                    onChange={(e) => setState(prev => ({
                                        ...prev,
                                        details: {
                                            ...prev.details,
                                            propertyDetails: {
                                                ...prev.details.propertyDetails,
                                                toilets: e.target.value
                                            }
                                        }
                                    }))}
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
                                        onClick={() => setState(prev => ({
                                            ...prev,
                                            details: {
                                                ...prev.details,
                                                propertyDetails: {
                                                    ...prev.details.propertyDetails,
                                                    propertyType: option.value as PropertyType
                                                }
                                            }
                                        }))}
                                        className={`p-3 rounded-lg border-2 transition-all
                                            ${state.details.propertyDetails.propertyType === option.value
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
                                onClick={() => setState(prev => ({
                                    ...prev,
                                    details: {
                                        ...prev.details,
                                        propertyDetails: {
                                            ...prev.details.propertyDetails,
                                            hasPets: !prev.details.propertyDetails.hasPets
                                        }
                                    }
                                }))}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                    ${state.details.propertyDetails.hasPets ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                        ${state.details.propertyDetails.hasPets ? 'translate-x-6' : 'translate-x-1'}`}
                                />
                            </button>
                        </div>

                        {/* Additional Notes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Additional Notes or Special Requirements
                            </label>
                            <textarea
                                value={state.details.additionalOptions.additionalNotes}
                                onChange={(e) => setState(prev => ({
                                    ...prev,
                                    details: {
                                        ...prev.details,
                                        additionalOptions: {
                                            ...prev.details.additionalOptions,
                                            additionalNotes: e.target.value
                                        }
                                    }
                                }))}
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
            {state.details.serviceFrequency.type && (state.details.hours.selected || state.details.hours.customHours) && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Your Price</h4>
                    <div className="bg-[#F8FAFC] rounded-lg p-4">
                        {/* Hours and Rate Breakdown */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <div className="text-gray-600">Hours Selected:</div>
                                <div className="font-medium text-gray-900">
                                    {state.details.hours.selected || state.details.hours.customHours} hours
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="text-gray-600">Hourly Rate:</div>
                                <div className="font-medium text-[#1E3D8F]">
                                    ${getHourlyRate(
                                        state.details.serviceFrequency.type,
                                        state.details.serviceFrequency.regularFrequency
                                    ).toFixed(2)}/hour
                                </div>
                            </div>

                            {/* Frequency Discount Info */}
                            {state.details.serviceFrequency.type === 'regular' && state.details.serviceFrequency.regularFrequency && (
                                <div className="flex justify-between items-center text-sm text-green-600">
                                    <div>
                                        {state.details.serviceFrequency.regularFrequency === 'weekly' && 'Weekly Discount (10% off)'}
                                        {state.details.serviceFrequency.regularFrequency === 'biweekly' && 'Fortnightly Discount (6% off)'}
                                        {state.details.serviceFrequency.regularFrequency === 'monthly' && 'Monthly Discount (3% off)'}
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
                            {state.details.serviceFrequency.type === 'regular' && (
                                <p className="text-sm text-gray-600 mt-2">
                                    Price per service with {state.details.serviceFrequency.regularFrequency} cleaning schedule
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Error Message Display */}
            {state.submitError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                    {state.submitError}
                </div>
            )}

            {/* Next Step Button */}
            {state.details.serviceFrequency.type && (state.details.hours.selected || state.details.hours.customHours) && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <button
                        onClick={handleBookingSubmit}
                        disabled={state.isSubmitting || !state.details.ndisDetails.clientNumber || !state.details.ndisDetails.clientName}
                        className={`w-full py-4 px-6 rounded-lg font-medium
                            flex items-center justify-center gap-2 text-lg
                            ${state.isSubmitting || !state.details.ndisDetails.clientNumber || !state.details.ndisDetails.clientName
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-[#1E3D8F] text-white hover:bg-[#1E3D8F]/90 transition-colors'
                            }`}
                    >
                        {state.isSubmitting ? 'Processing...' : 'Next Step'}
                        <Check className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    )
} 