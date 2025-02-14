'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Info, Phone } from 'lucide-react'
import { useBookingStore } from '../../../store/bookingStore'
import { 
    DeepCleaningState, 
    DeepCleaningServiceData, 
    DeepCleaningAreas,
    DeepCleaningHours,
    HomeSizeType
} from '../../../types/serviceinterface/deepcleaning'

// Move the calculateTotalPrice helper outside component
const calculateTotalPrice = (hours: number): number => {
    return hours * 53.07;
};

// Update type guard to use imported interface
const isCustomArea = (
    key: string, 
    value: boolean | DeepCleaningAreas['customArea']
): value is DeepCleaningAreas['customArea'] => {
    return key === 'customArea' && typeof value === 'object' && 'enabled' in value;
};

// Update PriceBreakdown props interface
interface PriceBreakdownProps {
    hours: DeepCleaningHours;
    cleaningAreas: DeepCleaningAreas;
}

const PriceBreakdown = ({ hours, cleaningAreas }: PriceBreakdownProps) => {
    const selectedHours = hours.selected === 'custom' ? hours.customHours : parseInt(hours.selected);
    const totalPrice = calculateTotalPrice(selectedHours);

    // Get selected areas for display
    const selectedAreas = Object.entries(cleaningAreas)
        .filter(([key, value]) => {
            if (isCustomArea(key, value)) {
                return value.enabled;
            }
            return value as boolean;
        })
        .map(([key]) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()));

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-semibold text-gray-900">Your Price</h4>
                <Info className="w-4 h-4 text-gray-400" />
            </div>

            <div className="space-y-4">
                {/* Hours and Rate */}
                <div className="flex justify-between items-center">
                    <span className="text-base text-gray-700 flex flex-col">
                        <span>Service Duration: {selectedHours} {selectedHours === 1 ? 'hour' : 'hours'}</span>
                        <span className="text-sm text-gray-500">Rate: $53.07/hour</span>
                    </span>
                    <span className="text-lg font-semibold text-[#1E3D8F]">
                        ${totalPrice.toFixed(2)}
                    </span>
                </div>

                {/* Selected Areas */}
                {selectedAreas.length > 0 && (
                    <div className="border-t border-gray-100 pt-4">
                        <h5 className="text-base font-medium text-gray-700 mb-3">
                            Selected Areas:
                        </h5>
                        <ul className="space-y-1">
                            {selectedAreas.map((area, index) => (
                                <li key={index} className="text-base text-gray-600 flex items-center">
                                    <Check className="w-4 h-4 text-[#1E3D8F] mr-2" />
                                    {area}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Total */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between">
                        <span className="text-lg font-semibold text-gray-900">Total</span>
                        <span className="text-xl font-bold text-[#1E3D8F]">
                            ${totalPrice.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function DeepClean() {
    const router = useRouter()
    const setDeepCleaningDetails = useBookingStore(state => state.setDeepCleaningDetails)
    
    // Update initial state to use new interface
    const [state, setState] = useState<DeepCleaningState>({
        selectedSize: '',
        showLargeHomeDialog: false,
        details: {
        homeSize: '',
        cleaningAreas: {
            kitchen: false,
            oven: false,
            bathroom: false,
            bedroom: false,
            toilet: false,
            lounge: false,
            hallway: false,
            stairs: false,
            customArea: {
                enabled: false,
                description: ''
            }
        },
        hours: {
            selected: '2',
            customHours: 2
        }
        },
        isSubmitting: false,
        submitError: null
    })

    const homeTypes = [
        { id: 'studio' as HomeSizeType, label: 'Studio' },
        { id: '1bed' as HomeSizeType, label: '1 Bedroom' },
        { id: '2bed' as HomeSizeType, label: '2 Bedrooms' },
        { id: '3bed' as HomeSizeType, label: '3 Bedrooms' },
        { id: '4bed' as HomeSizeType, label: '4 Bedrooms' },
        { id: '5plus' as HomeSizeType, label: '5+ Bedrooms' }
    ]

    const handleSizeSelect = (sizeId: HomeSizeType) => {
        if (sizeId === '5plus') {
            setState(prev => ({ ...prev, showLargeHomeDialog: true }))
        } else {
            setState(prev => ({
                ...prev,
                selectedSize: sizeId,
                details: { ...prev.details, homeSize: sizeId }
            }))
        }
    }

    // Update this useEffect to store price in real-time
    useEffect(() => {
        if (state.selectedSize && Object.values(state.details.cleaningAreas).some(value => 
            typeof value === 'boolean' ? value : value.enabled)) {
            
            const selectedHours = state.details.hours.selected === 'custom' 
                ? state.details.hours.customHours 
                : parseInt(state.details.hours.selected);
            
            const totalPrice = calculateTotalPrice(selectedHours);

            // Make sure we have the correct nested structure
            const details = {
                ...state.details,
                pricing: {
                    totalPrice: totalPrice || 0, // Ensure we always have a number
                    priceBreakdown: [{
                        description: `${selectedHours} hours @ $53.07/hour`,
                        amount: totalPrice || 0
                    }]
                }
            };

            // Save to localStorage with the correct key
            localStorage.setItem('deepCleaningDetails', JSON.stringify(details));
            
            // Dispatch event to notify BookingSummary2
            window.dispatchEvent(new CustomEvent('serviceStorageUpdate', {
                detail: {
                    type: 'deep-cleaning',
                    data: details
                }
            }));
        }
    }, [
        state.selectedSize, 
        state.details.cleaningAreas,
        state.details.hours,
        state.details // Add this to ensure we catch all relevant changes
    ]);

    

    async function handleBookingSubmit() {
        if (state.isSubmitting) return;

        try {
            setState(prev => ({ ...prev, isSubmitting: true }));

            const selectedHours = state.details.hours.selected === 'custom' 
                ? state.details.hours.customHours 
                : parseInt(state.details.hours.selected);
            
            const totalPrice = calculateTotalPrice(selectedHours);

            // Create price breakdown
            const priceBreakdown = [{
                description: `Deep Cleaning Service (${selectedHours} hours @ $53.07/hour)`,
                amount: totalPrice
            }];

            // Create service data
            const serviceData: DeepCleaningServiceData = {
                name: "Deep Cleaning",
                type: "deep-cleaning",
                price: totalPrice,
                details: {
                    homeSize: state.details.homeSize as HomeSizeType,
                    cleaningAreas: state.details.cleaningAreas,
                    hours: state.details.hours,
                    hourlyRate: 53.07,
                    totalPrice: totalPrice,
                    priceBreakdown: priceBreakdown
                }
            };

            // Save to Zustand store
            setDeepCleaningDetails(serviceData.details);
            
            // Save to localStorage for persistence
            localStorage.setItem('selectedService', JSON.stringify(serviceData));
            
            // Navigate to next step
            router.push('/quick-book/details');

        } catch (error) {
            console.error('Error preparing deep cleaning data:', error);
            setState(prev => ({ 
                ...prev, 
                submitError: error instanceof Error ? error.message : 'An unexpected error occurred' 
            }));
        } finally {
            setState(prev => ({ ...prev, isSubmitting: false }));
        }
    }

    return (
        <div className="space-y-6">
            {/* Home Size Selection */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h4 className="font-medium text-gray-900">Select Home Size</h4>
                        <p className="text-sm text-gray-600 mt-1">
                            Choose the size of your property
                        </p>
                    </div>
                    <Info className="w-4 h-4 text-gray-400" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {homeTypes.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => handleSizeSelect(type.id)}
                            className={`p-4 rounded-lg border-2 transition-all
                                ${state.selectedSize === type.id
                                    ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                    : 'border-gray-200 hover:border-[#90c2f7]'
                                }`}
                        >
                            <div className="font-medium">{type.label}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Areas for Deep Cleaning */}
            {state.selectedSize && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h4 className="font-medium text-gray-900">Select Areas for Deep Cleaning</h4>
                            <p className="text-sm text-gray-600 mt-1">
                                Choose the areas that need deep cleaning
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                            { id: 'kitchen', label: 'Kitchen Deep Clean' },
                            { id: 'oven', label: 'Oven Deep Clean' },
                            { id: 'bathroom', label: 'Bathroom Deep Clean' },
                            { id: 'bedroom', label: 'Bedroom Deep Clean' },
                            { id: 'toilet', label: 'Toilet Deep Clean' },
                            { id: 'lounge', label: 'Lounge Deep Clean' },
                            { id: 'hallway', label: 'Hallway Deep Clean' },
                            { id: 'stairs', label: 'Stairs Deep Clean' }
                        ].map((area) => (
                            <button
                                key={area.id}
                                onClick={() => setState(prev => ({
                                    ...prev,
                                    details: {
                                        ...prev.details,
                                    cleaningAreas: {
                                            ...prev.details.cleaningAreas,
                                            [area.id]: !prev.details.cleaningAreas[area.id as keyof typeof prev.details.cleaningAreas]
                                        }
                                    }
                                }))}
                                className={`p-4 rounded-lg border-2 transition-all text-left
                                    ${state.details.cleaningAreas[area.id as keyof typeof state.details.cleaningAreas]
                                        ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                        : 'border-gray-200 hover:border-[#90c2f7]'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">{area.label}</span>
                                    {state.details.cleaningAreas[area.id as keyof typeof state.details.cleaningAreas] && (
                                        <Check className="w-5 h-5 text-[#1E3D8F]" />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Custom Area */}
                    <div className="mt-4">
                        <button
                            onClick={() => setState(prev => ({
                                ...prev,
                                details: {
                                    ...prev.details,
                                cleaningAreas: {
                                        ...prev.details.cleaningAreas,
                                    customArea: {
                                            ...prev.details.cleaningAreas.customArea,
                                            enabled: !prev.details.cleaningAreas.customArea.enabled
                                        }
                                    }
                                }
                            }))}
                            className={`w-full p-4 rounded-lg border-2 transition-all text-left mb-2
                                ${state.details.cleaningAreas.customArea.enabled
                                    ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                    : 'border-gray-200 hover:border-[#90c2f7]'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Custom Area</span>
                                {state.details.cleaningAreas.customArea.enabled && (
                                    <Check className="w-5 h-5 text-[#1E3D8F]" />
                                )}
                            </div>
                        </button>

                        {state.details.cleaningAreas.customArea.enabled && (
                            <textarea
                                value={state.details.cleaningAreas.customArea.description}
                                onChange={(e) => setState(prev => ({
                                    ...prev,
                                    details: {
                                        ...prev.details,
                                    cleaningAreas: {
                                            ...prev.details.cleaningAreas,
                                        customArea: {
                                                ...prev.details.cleaningAreas.customArea,
                                            description: e.target.value
                                            }
                                        }
                                    }
                                }))}
                                placeholder="Describe the custom area that needs deep cleaning"
                                className="w-full p-3 border border-gray-200 rounded-lg mt-2
                                    focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                rows={3}
                            />
                        )}
                    </div>
                </div>
            )}

            {/* Hours Selection */}
            {state.selectedSize && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h4 className="font-medium text-gray-900">Service Duration</h4>
                            <p className="text-sm text-gray-600 mt-1">
                                Select how many hours you need ($53.07 per hour)
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* Preset Hours */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {['2', '3', '4', '5'].map((hour) => (
                                <button
                                    key={hour}
                                    onClick={() => setState(prev => ({
                                        ...prev,
                                        details: {
                                            ...prev.details,
                                        hours: {
                                            selected: hour as '2' | '3' | '4' | '5',
                                            customHours: parseInt(hour)
                                            }
                                        }
                                    }))}
                                    className={`p-4 rounded-lg border-2 transition-all
                                        ${state.details.hours.selected === hour
                                            ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                            : 'border-gray-200 hover:border-[#90c2f7]'
                                        }`}
                                >
                                    <div className="font-medium text-center">{hour} Hours</div>
                                    <div className="text-sm text-gray-600 text-center mt-1">
                                        ${(53.07 * parseInt(hour)).toFixed(2)}
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Custom Hours */}
                        <div>
                            <button
                                onClick={() => setState(prev => ({
                                    ...prev,
                                    details: {
                                        ...prev.details,
                                    hours: {
                                        selected: 'custom',
                                            customHours: prev.details.hours.customHours
                                        }
                                    }
                                }))}
                                className={`w-full p-4 rounded-lg border-2 transition-all mb-2
                                    ${state.details.hours.selected === 'custom'
                                        ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                        : 'border-gray-200 hover:border-[#90c2f7]'
                                    }`}
                            >
                                <div className="font-medium">Custom Hours</div>
                            </button>

                            {state.details.hours.selected === 'custom' && (
                                <div className="flex items-center gap-4 mt-3">
                                    <div className="flex-1">
                                        <input
                                            type="range"
                                            min="2"
                                            max="12"
                                            value={state.details.hours.customHours}
                                            onChange={(e) => setState(prev => ({
                                                ...prev,
                                                details: {
                                                    ...prev.details,
                                                hours: {
                                                    selected: 'custom',
                                                    customHours: parseInt(e.target.value)
                                                    }
                                                }
                                            }))}
                                            className="w-full accent-[#1E3D8F]"
                                        />
                                        <div className="flex justify-between text-sm text-gray-600 mt-1">
                                            <span>2 hrs</span>
                                            <span>12 hrs</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium">
                                            {state.details.hours.customHours} Hours
                                        </div>
                                        <div className="text-sm text-[#1E3D8F]">
                                            ${(53.07 * state.details.hours.customHours).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Price Breakdown */}
            {state.selectedSize && (
                <PriceBreakdown
                    hours={state.details.hours}
                    cleaningAreas={state.details.cleaningAreas}
                />
            )}

            {/* Next Step Button */}
            {state.selectedSize && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    {/* Add Error Message Display */}
                    {state.submitError && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                            {state.submitError}
                        </div>
                    )}
                    
                    <button
                        onClick={handleBookingSubmit}
                        disabled={state.isSubmitting}
                        className="w-full bg-[#1E3D8F] text-white py-4 px-6 rounded-lg
                            font-medium hover:bg-[#1E3D8F]/90 transition-colors
                            flex items-center justify-center gap-2 text-lg
                            disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {state.isSubmitting ? (
                            <>
                                <svg 
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24"
                                >
                                    <circle 
                                        className="opacity-25" 
                                        cx="12" 
                                        cy="12" 
                                        r="10" 
                                        stroke="currentColor" 
                                        strokeWidth="4"
                                    />
                                    <path 
                                        className="opacity-75" 
                                        fill="currentColor" 
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                Submitting...
                            </>
                        ) : (
                            <>
                                Next Step
                               
                            </>
                        )}
                    </button>

                    {/* Validation Message */}
                    {(!state.selectedSize || !Object.values(state.details.cleaningAreas).some(value => 
                        typeof value === 'boolean' ? value : value.enabled
                    )) && (
                        <p className="text-sm text-red-500 mt-2 text-center">
                            Please select your home size and at least one area for deep cleaning
                        </p>
                    )}
                </div>
            )} 

            {/* Large Home Dialog */}
            {state.showLargeHomeDialog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                        <h2 className="text-xl font-semibold mb-2">Special Large House Pricing</h2>
                        <p className="text-gray-600 mb-6">
                            For homes with 5 or more bedrooms, we offer customized solutions and special pricing packages. Let&apos;s have a discussion about your specific needs and find the best solution for your home.
                        </p>
                        <div className="space-y-3">
                            <button
                                onClick={() => router.push('/quick-book/details')}
                                className="w-full bg-[#1E3D8F] text-white py-3 px-4 rounded-lg
                                    flex items-center justify-center gap-2 font-medium
                                    hover:bg-[#1E3D8F]/90 transition-colors"
                            >
                                <Phone className="w-5 h-5" />
                                Request Callback
                            </button>
                            <button
                                onClick={() => {
                                    setState(prev => ({ ...prev, showLargeHomeDialog: false }));
                                    setState(prev => ({ ...prev, selectedSize: '4bed' }));
                                }}
                                className="w-full py-3 px-4 rounded-lg text-[#1E3D8F]
                                    hover:bg-[#1E3D8F]/5 transition-colors"
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
} 