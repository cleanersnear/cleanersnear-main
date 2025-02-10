'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Info } from 'lucide-react'




interface DeepCleanDetails {
    homeSize: string;
    cleaningAreas: {
        kitchen: boolean;
        oven: boolean;
        bathroom: boolean;
        bedroom: boolean;
        toilet: boolean;
        lounge: boolean;
        hallway: boolean;
        stairs: boolean;
        customArea: {
            enabled: boolean;
            description: string;
        };
    };
    hours: {
        selected: '2' | '3' | '4' | '5' | 'custom';
        customHours: number;
    };
}

// Add service data interface using DeepCleanDetails
interface DeepCleanServiceData {
    name: string;
    type: "deep-clean";
    price: number;
    details: DeepCleanDetails & {
        hourlyRate: number;
        priceBreakdown: Array<{
            description: string;
            amount: number;
        }>;
    };
}

const calculateTotalPrice = (hours: number): number => {
    return hours * 53.07;
};

// First, let's create a type for the possible values
type CleaningAreaValue = boolean | {
    enabled: boolean;
    description: string;
};

// Now update the type guard function
const isCustomArea = (
    key: string, 
    value: CleaningAreaValue
): value is DeepCleanDetails['cleaningAreas']['customArea'] => {
    return key === 'customArea' && typeof value === 'object' && 'enabled' in value;
};

const PriceBreakdown = ({ hours, cleaningAreas }: { 
    hours: { selected: string; customHours: number }; 
    cleaningAreas: DeepCleanDetails['cleaningAreas'];
    
}) => {
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
    const [selectedSize, setSelectedSize] = useState('')
    const [showLargeHomeDialog, setShowLargeHomeDialog] = useState(false)
    const [details, setDetails] = useState<DeepCleanDetails>({
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
    })
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const homeTypes = [
        { id: 'studio', label: 'Studio' },
        { id: '1bed', label: '1 Bedroom' },
        { id: '2bed', label: '2 Bedrooms' },
        { id: '3bed', label: '3 Bedrooms' },
        { id: '4bed', label: '4 Bedrooms' },
        { id: '5plus', label: '5+ Bedrooms' }
    ]

    const handleSizeSelect = (sizeId: string) => {
        if (sizeId === '5plus') {
            setShowLargeHomeDialog(true)
        } else {
            setSelectedSize(sizeId)
            setDetails(prev => ({ ...prev, homeSize: sizeId }))
        }
    }

    // Update localStorage and emit event whenever details change
    useEffect(() => {
        if (selectedSize && Object.values(details.cleaningAreas).some(value => 
            typeof value === 'boolean' ? value : value.enabled)) {
            
            const selectedHours = details.hours.selected === 'custom' 
                ? details.hours.customHours 
                : parseInt(details.hours.selected);
            
            const totalPrice = calculateTotalPrice(selectedHours);

            const serviceData: DeepCleanServiceData = {
                name: "Deep Cleaning",
                type: "deep-clean",
                price: totalPrice,
                details: {
                    ...details,
                    hourlyRate: 53.07,
                    priceBreakdown: [{
                        description: `${selectedHours} hours @ $53.07/hour`,
                        amount: totalPrice
                    }]
                }
            };

            localStorage.setItem('selectedService', JSON.stringify(serviceData));
            window.dispatchEvent(new CustomEvent('serviceUpdate', { detail: serviceData }));
        }
    }, [selectedSize, details]);

    const validateForm = () => {
        if (!selectedSize) {
            setSubmitError('Please select a home size');
            return false;
        }
        
        if (!Object.values(details.cleaningAreas).some(value => 
            typeof value === 'boolean' ? value : value.enabled
        )) {
            setSubmitError('Please select at least one cleaning area');
            return false;
        }
        
        return true;
    };

    const handleBookingSubmit = async () => {
        if (!validateForm()) return;
        if (isSubmitting) return;
        
        try {
            setIsSubmitting(true);
            setSubmitError(null);
            
            const selectedHours = details.hours.selected === 'custom' 
                ? details.hours.customHours 
                : parseInt(details.hours.selected);
            
            const totalPrice = calculateTotalPrice(selectedHours);

            // Create service data using our interface
            const serviceData: DeepCleanServiceData = {
                name: "Deep Cleaning",
                type: "deep-clean",
                price: totalPrice,
                details: {
                    ...details,  // Spread existing details
                    hourlyRate: 53.07,
                    priceBreakdown: [{
                        description: `${selectedHours} hours @ $53.07/hour`,
                        amount: totalPrice
                    }]
                }
            };

            // Save to localStorage
            localStorage.setItem('selectedService', JSON.stringify(serviceData));
            
            // Navigate to next step
            router.push('/quick-book/details');

        } catch (error) {
            console.error('Error preparing deep cleaning data:', error);
            setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

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
                                ${selectedSize === type.id
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
            {selectedSize && (
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
                                onClick={() => setDetails(prev => ({
                                    ...prev,
                                    cleaningAreas: {
                                        ...prev.cleaningAreas,
                                        [area.id]: !prev.cleaningAreas[area.id as keyof typeof prev.cleaningAreas]
                                    }
                                }))}
                                className={`p-4 rounded-lg border-2 transition-all text-left
                                    ${details.cleaningAreas[area.id as keyof typeof details.cleaningAreas]
                                        ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                        : 'border-gray-200 hover:border-[#90c2f7]'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">{area.label}</span>
                                    {details.cleaningAreas[area.id as keyof typeof details.cleaningAreas] && (
                                        <Check className="w-5 h-5 text-[#1E3D8F]" />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Custom Area */}
                    <div className="mt-4">
                        <button
                            onClick={() => setDetails(prev => ({
                                ...prev,
                                cleaningAreas: {
                                    ...prev.cleaningAreas,
                                    customArea: {
                                        ...prev.cleaningAreas.customArea,
                                        enabled: !prev.cleaningAreas.customArea.enabled
                                    }
                                }
                            }))}
                            className={`w-full p-4 rounded-lg border-2 transition-all text-left mb-2
                                ${details.cleaningAreas.customArea.enabled
                                    ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                    : 'border-gray-200 hover:border-[#90c2f7]'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Custom Area</span>
                                {details.cleaningAreas.customArea.enabled && (
                                    <Check className="w-5 h-5 text-[#1E3D8F]" />
                                )}
                            </div>
                        </button>

                        {details.cleaningAreas.customArea.enabled && (
                            <textarea
                                value={details.cleaningAreas.customArea.description}
                                onChange={(e) => setDetails(prev => ({
                                    ...prev,
                                    cleaningAreas: {
                                        ...prev.cleaningAreas,
                                        customArea: {
                                            ...prev.cleaningAreas.customArea,
                                            description: e.target.value
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
            {selectedSize && (
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
                                    onClick={() => setDetails(prev => ({
                                        ...prev,
                                        hours: {
                                            selected: hour as '2' | '3' | '4' | '5',
                                            customHours: parseInt(hour)
                                        }
                                    }))}
                                    className={`p-4 rounded-lg border-2 transition-all
                                        ${details.hours.selected === hour
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
                                onClick={() => setDetails(prev => ({
                                    ...prev,
                                    hours: {
                                        selected: 'custom',
                                        customHours: prev.hours.customHours
                                    }
                                }))}
                                className={`w-full p-4 rounded-lg border-2 transition-all mb-2
                                    ${details.hours.selected === 'custom'
                                        ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                        : 'border-gray-200 hover:border-[#90c2f7]'
                                    }`}
                            >
                                <div className="font-medium">Custom Hours</div>
                            </button>

                            {details.hours.selected === 'custom' && (
                                <div className="flex items-center gap-4 mt-3">
                                    <div className="flex-1">
                                        <input
                                            type="range"
                                            min="2"
                                            max="12"
                                            value={details.hours.customHours}
                                            onChange={(e) => setDetails(prev => ({
                                                ...prev,
                                                hours: {
                                                    selected: 'custom',
                                                    customHours: parseInt(e.target.value)
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
                                            {details.hours.customHours} Hours
                                        </div>
                                        <div className="text-sm text-[#1E3D8F]">
                                            ${(53.07 * details.hours.customHours).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Price Breakdown */}
            {selectedSize && (
                <PriceBreakdown
                    hours={details.hours}
                    cleaningAreas={details.cleaningAreas}
                />
            )}

            {/* Right before the submit button section */}
            {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-600">{submitError}</p>
                </div>
            )}

            {/* Next Step Button */}
            {selectedSize && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <button
                        onClick={handleBookingSubmit}
                        disabled={isSubmitting}
                        className={`w-full py-4 px-6 rounded-lg font-medium
                            ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1E3D8F] hover:bg-[#1E3D8F]/90'}`}
                    >
                        {isSubmitting ? 'Submitting...' : 'Next Step'}
                        <Check className="w-5 h-5" />
                    </button>

                    {/* Validation Message */}
                    {(!selectedSize || !Object.values(details.cleaningAreas).some(value => 
                        typeof value === 'boolean' ? value : value.enabled
                    )) && (
                        <p className="text-red-500 text-sm mt-2 text-center">
                            Please select your home size and at least one area for deep cleaning
                        </p>
                    )}
                </div>
            )}

            {/* Large Home Dialog */}
            {showLargeHomeDialog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                        <h2 className="text-xl font-semibold mb-2">Custom Quote Required</h2>
                        <p className="text-gray-600 mb-6">
                            For homes with 5 or more bedrooms, we&apos;ll need to provide a custom quote based on your specific requirements.
                        </p>
                        <div className="space-y-3">
                            <button
                                onClick={() => {
                                    setShowLargeHomeDialog(false)
                                    setSelectedSize('4bed')
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