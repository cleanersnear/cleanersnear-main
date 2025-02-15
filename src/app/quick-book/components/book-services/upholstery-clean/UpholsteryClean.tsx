'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'
import { useBookingStore } from '../../../store/bookingStore'
import { 
    UpholsteryCleaningState,
    UpholsteryCleaningServiceData,
    PriceBreakdown,
    UPHOLSTERY_PRICE_CONFIG
} from '../../../types/serviceinterface/upholsterycleaning'
import { updateServiceStorage } from '@/app/quick-book/utils/serviceStorage'

export default function UpholsteryClean() {
    const router = useRouter()
    const setUpholsteryCleaningDetails = useBookingStore(state => state.setUpholsteryCleaningDetails)
    
    const [state, setState] = useState<UpholsteryCleaningState>({
        details: {
        upholsteryCleaning: {
                
            sofa: {
                enabled: false,
                large: 0,
                medium: 0,
                small: 0
            },
            chair: {
                enabled: false,
                recliner: 0,
                dayChair: 0,
                armChair: 0,
                ottoman: 0
            },
            mattress: {
                enabled: false,
                large: 0,
                medium: 0,
                small: 0
            }
        },
            additionalNotes: '',
            pricing: {
                totalPrice: 0,
                priceBreakdown: []
            }
        },
        isSubmitting: false,
        submitError: null
    });

    const calculateTotalPrice = useCallback(() => {
        let total = 0;

        // Sofa prices using config
        if (state.details.upholsteryCleaning.sofa.enabled) {
            total += state.details.upholsteryCleaning.sofa.large * UPHOLSTERY_PRICE_CONFIG.sofa.large;
            total += state.details.upholsteryCleaning.sofa.medium * UPHOLSTERY_PRICE_CONFIG.sofa.medium;
            total += state.details.upholsteryCleaning.sofa.small * UPHOLSTERY_PRICE_CONFIG.sofa.small;
        }

        // Chair prices using config
        if (state.details.upholsteryCleaning.chair.enabled) {
            total += state.details.upholsteryCleaning.chair.recliner * UPHOLSTERY_PRICE_CONFIG.chair.recliner;
            total += state.details.upholsteryCleaning.chair.dayChair * UPHOLSTERY_PRICE_CONFIG.chair.dayChair;
            total += state.details.upholsteryCleaning.chair.armChair * UPHOLSTERY_PRICE_CONFIG.chair.armChair;
            total += state.details.upholsteryCleaning.chair.ottoman * UPHOLSTERY_PRICE_CONFIG.chair.ottoman;
        }

        // Mattress prices using config
        if (state.details.upholsteryCleaning.mattress.enabled) {
            total += state.details.upholsteryCleaning.mattress.large * UPHOLSTERY_PRICE_CONFIG.mattress.large;
            total += state.details.upholsteryCleaning.mattress.medium * UPHOLSTERY_PRICE_CONFIG.mattress.medium;
            total += state.details.upholsteryCleaning.mattress.small * UPHOLSTERY_PRICE_CONFIG.mattress.small;
        }

        return Math.max(UPHOLSTERY_PRICE_CONFIG.minimumCharge, total);
    }, [state.details.upholsteryCleaning]);

    const hasSelectedItems = useCallback(() => {
        const { sofa, chair, mattress } = state.details.upholsteryCleaning;
        
        // Check if any sofa is selected
        const hasSofa = sofa.enabled && (sofa.large > 0 || sofa.medium > 0 || sofa.small > 0);
        
        // Check if any chair is selected
        const hasChair = chair.enabled && (chair.recliner > 0 || chair.dayChair > 0 || 
            chair.armChair > 0 || chair.ottoman > 0);
        
        // Check if any mattress is selected
        const hasMattress = mattress.enabled && (mattress.large > 0 || mattress.medium > 0 || 
            mattress.small > 0);

        return hasSofa || hasChair || hasMattress;
    }, [state.details.upholsteryCleaning]);

    const handleBookingSubmit = async () => {
        if (state.isSubmitting) return;

        // Add validation check
        if (!hasSelectedItems()) {
            setState(prev => ({
                ...prev,
                submitError: 'Please select at least one item for cleaning'
            }));
            return;
        }

        try {
            // 1. Enable isSubmitting
            setState(prev => ({
                ...prev,
                isSubmitting: true,
                submitError: null
            }));

            // Format service data
            const serviceData: UpholsteryCleaningServiceData = {
                name: "Upholstery Cleaning",
                type: "upholstery-cleaning",
                price: calculateTotalPrice(),
                description: "Professional upholstery cleaning service",
                details: {
                    ...state.details,
                    pricing: {
                        totalPrice: calculateTotalPrice(),
                    priceBreakdown: generatePriceBreakdown()
                    }
                }
            };

            // 2. Save to Zustand store
            setUpholsteryCleaningDetails(serviceData.details);

            // 3. Save to localStorage for backup
            localStorage.setItem('selectedService', JSON.stringify(serviceData));
            
            // 4. Disable isSubmitting and navigate
            setState(prev => ({
                ...prev,
                isSubmitting: false
            }));
            
            router.push('/quick-book/details');

        } catch (error) {
            console.error('Error:', error);
            setState(prev => ({
                ...prev,
                submitError: 'Something went wrong',
                isSubmitting: false
            }));
        }
    };

    const generatePriceBreakdown = useCallback((): PriceBreakdown[] => {
        const breakdown: PriceBreakdown[] = [];

        // Add sofa items
        if (state.details.upholsteryCleaning.sofa.enabled) {
            if (state.details.upholsteryCleaning.sofa.large > 0) {
                breakdown.push({
                    description: `Large Sofa (x${state.details.upholsteryCleaning.sofa.large})`,
                    amount: state.details.upholsteryCleaning.sofa.large * UPHOLSTERY_PRICE_CONFIG.sofa.large
                });
            }
            if (state.details.upholsteryCleaning.sofa.medium > 0) {
                breakdown.push({
                    description: `Medium Sofa (x${state.details.upholsteryCleaning.sofa.medium})`,
                    amount: state.details.upholsteryCleaning.sofa.medium * UPHOLSTERY_PRICE_CONFIG.sofa.medium
                });
            }
            if (state.details.upholsteryCleaning.sofa.small > 0) {
                breakdown.push({
                    description: `Small Sofa (x${state.details.upholsteryCleaning.sofa.small})`,
                    amount: state.details.upholsteryCleaning.sofa.small * UPHOLSTERY_PRICE_CONFIG.sofa.small
                });
            }
        }

        // Add chair items
        if (state.details.upholsteryCleaning.chair.enabled) {
            if (state.details.upholsteryCleaning.chair.recliner > 0) {
                breakdown.push({
                    description: `Recliner Chair (x${state.details.upholsteryCleaning.chair.recliner})`,
                    amount: state.details.upholsteryCleaning.chair.recliner * UPHOLSTERY_PRICE_CONFIG.chair.recliner
                });
            }
            if (state.details.upholsteryCleaning.chair.dayChair > 0) {
                breakdown.push({
                    description: `Day Chair (x${state.details.upholsteryCleaning.chair.dayChair})`,
                    amount: state.details.upholsteryCleaning.chair.dayChair * UPHOLSTERY_PRICE_CONFIG.chair.dayChair
                });
            }
            if (state.details.upholsteryCleaning.chair.armChair > 0) {
                breakdown.push({
                    description: `Arm Chair (x${state.details.upholsteryCleaning.chair.armChair})`,
                    amount: state.details.upholsteryCleaning.chair.armChair * UPHOLSTERY_PRICE_CONFIG.chair.armChair
                });
            }
            if (state.details.upholsteryCleaning.chair.ottoman > 0) {
                breakdown.push({
                    description: `Ottoman/Stool (x${state.details.upholsteryCleaning.chair.ottoman})`,
                    amount: state.details.upholsteryCleaning.chair.ottoman * UPHOLSTERY_PRICE_CONFIG.chair.ottoman
                });
            }
        }

        // Add mattress items
        if (state.details.upholsteryCleaning.mattress.enabled) {
            if (state.details.upholsteryCleaning.mattress.large > 0) {
                breakdown.push({
                    description: `Large Mattress (x${state.details.upholsteryCleaning.mattress.large})`,
                    amount: state.details.upholsteryCleaning.mattress.large * UPHOLSTERY_PRICE_CONFIG.mattress.large
                });
            }
            if (state.details.upholsteryCleaning.mattress.medium > 0) {
                breakdown.push({
                    description: `Medium Mattress (x${state.details.upholsteryCleaning.mattress.medium})`,
                    amount: state.details.upholsteryCleaning.mattress.medium * UPHOLSTERY_PRICE_CONFIG.mattress.medium
                });
            }
            if (state.details.upholsteryCleaning.mattress.small > 0) {
                breakdown.push({
                    description: `Small Mattress (x${state.details.upholsteryCleaning.mattress.small})`,
                    amount: state.details.upholsteryCleaning.mattress.small * UPHOLSTERY_PRICE_CONFIG.mattress.small
                });
            }
        }

        return breakdown;
    }, [state.details.upholsteryCleaning]);

    useEffect(() => {
        // Format details to match ServiceDetails type
        const formattedDetails = {
            ...state.details,
            pricing: {
                totalPrice: calculateTotalPrice(),
                priceBreakdown: generatePriceBreakdown()
            }
        };

        // Now use the formatted details
        updateServiceStorage(
            'upholstery-cleaning',
            formattedDetails,
            'Upholstery Cleaning'
        );
    }, [
        state.details.upholsteryCleaning.sofa,
        state.details.upholsteryCleaning.chair,
        state.details.upholsteryCleaning.mattress,
        calculateTotalPrice,
        generatePriceBreakdown,
        state.details
    ]);

    return (
        <div className="space-y-6">
            {/* Service Introduction */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Professional Upholstery Cleaning
                </h3>
                <p className="text-gray-600 mb-6">
                    Expert cleaning for all types of upholstered furniture. Our service removes stains, 
                    odors, and allergens while extending the life of your furniture.
                </p>
            </div>

            {/* Upholstery Cleaning Options */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-6">Select Items for Cleaning</h4>
                
                {/* Sofa Section */}
                <div className="space-y-6">
                    <div>
                        <button
                            onClick={() => setState(prev => ({
                                ...prev,
                                details: {
                                    ...prev.details,
                                upholsteryCleaning: {
                                        ...prev.details.upholsteryCleaning,
                                    sofa: {
                                            ...prev.details.upholsteryCleaning.sofa,
                                            enabled: !prev.details.upholsteryCleaning.sofa.enabled
                                    }
                                }
                                }
                            }))}
                            className={`w-full p-4 rounded-lg border-2 transition-all mb-4
                                ${state.details.upholsteryCleaning.sofa.enabled
                                    ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                    : 'border-gray-200 hover:border-[#90c2f7]'
                                }`}
                        >
                            <div className="flex justify-between items-center">
                                <span className="font-medium">Sofa Cleaning</span>
                                <Check className={`w-5 h-5 transition-opacity
                                    ${state.details.upholsteryCleaning.sofa.enabled
                                        ? 'opacity-100 text-[#1E3D8F]'
                                        : 'opacity-0'
                                    }`}
                                />
                            </div>
                        </button>

                        {state.details.upholsteryCleaning.sofa.enabled && (
                            <div className="space-y-4 mt-4">
                                {/* Large Sofa */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-gray-900">Large Sofa</div>
                                        <div className="text-sm text-gray-600">$120 (4+ Seater)</div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setState(prev => ({
                                                ...prev,
                                                details: {
                                                    ...prev.details,
                                                upholsteryCleaning: {
                                                        ...prev.details.upholsteryCleaning,
                                                    sofa: {
                                                            ...prev.details.upholsteryCleaning.sofa,
                                                            large: Math.max(0, prev.details.upholsteryCleaning.sofa.large - 1)
                                                    }
                                                }
                                                }
                                            }))}
                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center font-medium">
                                            {state.details.upholsteryCleaning.sofa.large}
                                        </span>
                                        <button
                                            onClick={() => setState(prev => ({
                                                ...prev,
                                                details: {
                                                    ...prev.details,
                                                upholsteryCleaning: {
                                                        ...prev.details.upholsteryCleaning,
                                                    sofa: {
                                                            ...prev.details.upholsteryCleaning.sofa,
                                                            large: prev.details.upholsteryCleaning.sofa.large + 1
                                                    }
                                                }
                                                }
                                            }))}
                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Medium Sofa */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-gray-900">Medium Sofa</div>
                                        <div className="text-sm text-gray-600">$90 (3 Seater)</div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setState(prev => ({
                                                ...prev,
                                                details: {
                                                    ...prev.details,
                                                upholsteryCleaning: {
                                                        ...prev.details.upholsteryCleaning,
                                                    sofa: {
                                                            ...prev.details.upholsteryCleaning.sofa,
                                                            medium: Math.max(0, prev.details.upholsteryCleaning.sofa.medium - 1)
                                                    }
                                                }
                                                }
                                            }))}
                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center font-medium">
                                            {state.details.upholsteryCleaning.sofa.medium}
                                        </span>
                                        <button
                                            onClick={() => setState(prev => ({
                                                ...prev,
                                                details: {
                                                    ...prev.details,
                                                upholsteryCleaning: {
                                                        ...prev.details.upholsteryCleaning,
                                                    sofa: {
                                                            ...prev.details.upholsteryCleaning.sofa,
                                                            medium: prev.details.upholsteryCleaning.sofa.medium + 1
                                                    }
                                                }
                                                }
                                            }))}
                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Small Sofa */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-gray-900">Small Sofa</div>
                                        <div className="text-sm text-gray-600">$70 (2 Seater)</div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setState(prev => ({
                                                ...prev,
                                                details: {
                                                    ...prev.details,
                                                upholsteryCleaning: {
                                                        ...prev.details.upholsteryCleaning,
                                                    sofa: {
                                                            ...prev.details.upholsteryCleaning.sofa,
                                                            small: Math.max(0, prev.details.upholsteryCleaning.sofa.small - 1)
                                                    }
                                                }
                                                }
                                            }))}
                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center font-medium">
                                            {state.details.upholsteryCleaning.sofa.small}
                                        </span>
                                        <button
                                            onClick={() => setState(prev => ({
                                                ...prev,
                                                details: {
                                                    ...prev.details,
                                                upholsteryCleaning: {
                                                        ...prev.details.upholsteryCleaning,
                                                    sofa: {
                                                            ...prev.details.upholsteryCleaning.sofa,
                                                            small: prev.details.upholsteryCleaning.sofa.small + 1
                                                    }
                                                }
                                                }
                                            }))}
                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Chair Section */}
                    <div>
                        <button
                            onClick={() => setState(prev => ({
                                ...prev,
                                details: {
                                    ...prev.details,
                                upholsteryCleaning: {
                                        ...prev.details.upholsteryCleaning,
                                    chair: {
                                            ...prev.details.upholsteryCleaning.chair,
                                            enabled: !prev.details.upholsteryCleaning.chair.enabled
                                    }
                                }
                                }
                            }))}
                            className={`w-full p-4 rounded-lg border-2 transition-all mb-4
                                ${state.details.upholsteryCleaning.chair.enabled
                                    ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                    : 'border-gray-200 hover:border-[#90c2f7]'
                                }`}
                        >
                            <div className="flex justify-between items-center">
                                <span className="font-medium">Chair Cleaning</span>
                                <Check className={`w-5 h-5 transition-opacity
                                    ${state.details.upholsteryCleaning.chair.enabled
                                        ? 'opacity-100 text-[#1E3D8F]'
                                        : 'opacity-0'
                                    }`}
                                />
                            </div>
                        </button>

                        {state.details.upholsteryCleaning.chair.enabled && (
                            <div className="space-y-4 mt-4">
                                {/* Recliner Chair */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-gray-900">Recliner Chair</div>
                                        <div className="text-sm text-gray-600">$60</div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setState(prev => ({
                                                ...prev,
                                                details: {
                                                    ...prev.details,
                                                upholsteryCleaning: {
                                                        ...prev.details.upholsteryCleaning,
                                                    chair: {
                                                            ...prev.details.upholsteryCleaning.chair,
                                                            recliner: Math.max(0, prev.details.upholsteryCleaning.chair.recliner - 1)
                                                    }
                                                }
                                                }
                                            }))}
                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center font-medium">
                                            {state.details.upholsteryCleaning.chair.recliner}
                                        </span>
                                        <button
                                            onClick={() => setState(prev => ({
                                                ...prev,
                                                details: {
                                                    ...prev.details,
                                                upholsteryCleaning: {
                                                        ...prev.details.upholsteryCleaning,
                                                    chair: {
                                                            ...prev.details.upholsteryCleaning.chair,
                                                            recliner: prev.details.upholsteryCleaning.chair.recliner + 1
                                                    }
                                                }
                                                }
                                            }))}
                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Day Chair */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-gray-900">Day Chair</div>
                                        <div className="text-sm text-gray-600">$45</div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setState(prev => ({
                                                ...prev,
                                                details: {
                                                    ...prev.details,
                                                upholsteryCleaning: {
                                                        ...prev.details.upholsteryCleaning,
                                                    chair: {
                                                            ...prev.details.upholsteryCleaning.chair,
                                                            dayChair: Math.max(0, prev.details.upholsteryCleaning.chair.dayChair - 1)
                                                    }
                                                }
                                                }
                                            }))}
                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center font-medium">
                                            {state.details.upholsteryCleaning.chair.dayChair}
                                        </span>
                                        <button
                                            onClick={() => setState(prev => ({
                                                ...prev,
                                                details: {
                                                    ...prev.details,
                                                upholsteryCleaning: {
                                                        ...prev.details.upholsteryCleaning,
                                                    chair: {
                                                            ...prev.details.upholsteryCleaning.chair,
                                                            dayChair: prev.details.upholsteryCleaning.chair.dayChair + 1
                                                    }
                                                }
                                                }
                                            }))}
                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Arm Chair */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-gray-900">Arm Chair</div>
                                        <div className="text-sm text-gray-600">$35</div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setState(prev => ({
                                                ...prev,
                                                details: {
                                                    ...prev.details,
                                                upholsteryCleaning: {
                                                        ...prev.details.upholsteryCleaning,
                                                    chair: {
                                                            ...prev.details.upholsteryCleaning.chair,
                                                            armChair: Math.max(0, prev.details.upholsteryCleaning.chair.armChair - 1)
                                                    }
                                                }
                                                }
                                            }))}
                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center font-medium">
                                            {state.details.upholsteryCleaning.chair.armChair}
                                        </span>
                                        <button
                                            onClick={() => setState(prev => ({
                                                ...prev,
                                                details: {
                                                    ...prev.details,
                                                upholsteryCleaning: {
                                                        ...prev.details.upholsteryCleaning,
                                                    chair: {
                                                            ...prev.details.upholsteryCleaning.chair,
                                                            armChair: prev.details.upholsteryCleaning.chair.armChair + 1
                                                    }
                                                }
                                                }
                                            }))}
                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Ottoman/Stool */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-gray-900">Ottoman/Stool</div>
                                        <div className="text-sm text-gray-600">$25</div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setState(prev => ({
                                                ...prev,
                                                details: {
                                                    ...prev.details,
                                                upholsteryCleaning: {
                                                        ...prev.details.upholsteryCleaning,
                                                    chair: {
                                                            ...prev.details.upholsteryCleaning.chair,
                                                            ottoman: Math.max(0, prev.details.upholsteryCleaning.chair.ottoman - 1)
                                                    }
                                                }
                                                }
                                            }))}
                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center font-medium">
                                            {state.details.upholsteryCleaning.chair.ottoman}
                                        </span>
                                        <button
                                            onClick={() => setState(prev => ({
                                                ...prev,
                                                details: {
                                                    ...prev.details,
                                                upholsteryCleaning: {
                                                        ...prev.details.upholsteryCleaning,
                                                    chair: {
                                                            ...prev.details.upholsteryCleaning.chair,
                                                            ottoman: prev.details.upholsteryCleaning.chair.ottoman + 1
                                                    }
                                                }
                                                }
                                            }))}
                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mattress Section */}
                    <div>
                        <button
                            onClick={() => setState(prev => ({
                                ...prev,
                                details: {
                                    ...prev.details,
                                upholsteryCleaning: {
                                        ...prev.details.upholsteryCleaning,
                                    mattress: {
                                            ...prev.details.upholsteryCleaning.mattress,
                                            enabled: !prev.details.upholsteryCleaning.mattress.enabled
                                    }
                                }
                                }
                            }))}
                            className={`w-full p-4 rounded-lg border-2 transition-all mb-4
                                ${state.details.upholsteryCleaning.mattress.enabled
                                    ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                    : 'border-gray-200 hover:border-[#90c2f7]'
                                }`}
                        >
                            <div className="flex justify-between items-center">
                                <span className="font-medium">Mattress Cleaning</span>
                                <Check className={`w-5 h-5 transition-opacity
                                    ${state.details.upholsteryCleaning.mattress.enabled
                                        ? 'opacity-100 text-[#1E3D8F]'
                                        : 'opacity-0'
                                    }`}
                                />
                            </div>
                        </button>

                        {state.details.upholsteryCleaning.mattress.enabled && (
                            <div className="space-y-4 mt-4">
                                {/* Large Mattress */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-gray-900">Large Mattress</div>
                                        <div className="text-sm text-gray-600">$80 (King)</div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setState(prev => ({
                                                ...prev,
                                                details: {
                                                    ...prev.details,
                                                upholsteryCleaning: {
                                                        ...prev.details.upholsteryCleaning,
                                                    mattress: {
                                                            ...prev.details.upholsteryCleaning.mattress,
                                                            large: Math.max(0, prev.details.upholsteryCleaning.mattress.large - 1)
                                                    }
                                                }
                                                }
                                            }))}
                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center font-medium">
                                            {state.details.upholsteryCleaning.mattress.large}
                                        </span>
                                        <button
                                            onClick={() => setState(prev => ({
                                                ...prev,
                                                details: {
                                                    ...prev.details,
                                                upholsteryCleaning: {
                                                        ...prev.details.upholsteryCleaning,
                                                    mattress: {
                                                            ...prev.details.upholsteryCleaning.mattress,
                                                            large: prev.details.upholsteryCleaning.mattress.large + 1
                                                    }
                                                }
                                                }
                                            }))}
                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Medium Mattress */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-gray-900">Medium Mattress</div>
                                        <div className="text-sm text-gray-600">$60 (Double/Queen)</div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setState(prev => ({
                                                ...prev,
                                                details: {
                                                    ...prev.details,
                                                upholsteryCleaning: {
                                                        ...prev.details.upholsteryCleaning,
                                                    mattress: {
                                                            ...prev.details.upholsteryCleaning.mattress,
                                                            medium: Math.max(0, prev.details.upholsteryCleaning.mattress.medium - 1)
                                                    }
                                                }
                                                }
                                            }))}
                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center font-medium">
                                            {state.details.upholsteryCleaning.mattress.medium}
                                        </span>
                                        <button
                                            onClick={() => setState(prev => ({
                                                ...prev,
                                                details: {
                                                    ...prev.details,
                                                upholsteryCleaning: {
                                                        ...prev.details.upholsteryCleaning,
                                                    mattress: {
                                                            ...prev.details.upholsteryCleaning.mattress,
                                                            medium: prev.details.upholsteryCleaning.mattress.medium + 1
                                                    }
                                                }
                                                }
                                            }))}
                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Small Mattress */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-gray-900">Small Mattress</div>
                                        <div className="text-sm text-gray-600">$40 (Single)</div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setState(prev => ({
                                                ...prev,
                                                details: {
                                                    ...prev.details,
                                                upholsteryCleaning: {
                                                        ...prev.details.upholsteryCleaning,
                                                    mattress: {
                                                            ...prev.details.upholsteryCleaning.mattress,
                                                            small: Math.max(0, prev.details.upholsteryCleaning.mattress.small - 1)
                                                    }
                                                }
                                                }
                                            }))}
                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center font-medium">
                                            {state.details.upholsteryCleaning.mattress.small}
                                        </span>
                                        <button
                                            onClick={() => setState(prev => ({
                                                ...prev,
                                                details: {
                                                    ...prev.details,
                                                upholsteryCleaning: {
                                                        ...prev.details.upholsteryCleaning,
                                                    mattress: {
                                                            ...prev.details.upholsteryCleaning.mattress,
                                                            small: prev.details.upholsteryCleaning.mattress.small + 1
                                                    }
                                                }
                                                }
                                            }))}
                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Additional Notes Section */}
            {(state.details.upholsteryCleaning.sofa.enabled || 
              state.details.upholsteryCleaning.chair.enabled || 
              state.details.upholsteryCleaning.mattress.enabled) && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Additional Notes</h4>
                    <div>
                        <textarea
                            value={state.details.additionalNotes}
                            onChange={(e) => setState(prev => ({
                                ...prev,
                                details: {
                                    ...prev.details,
                                    additionalNotes: e.target.value
                                }
                            }))}
                            rows={4}
                            className="w-full p-3 border border-gray-200 rounded-lg
                                focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                            placeholder="Add any specific instructions, concerns, or requirements for the cleaning service"
                        />
                        <p className="text-sm text-gray-500 mt-2">
                            Please mention any stains, fabric types, or special care instructions
                        </p>
                    </div>
                </div>
            )}

            {/* Price Summary */}
            {(state.details.upholsteryCleaning.sofa.enabled || 
              state.details.upholsteryCleaning.chair.enabled || 
              state.details.upholsteryCleaning.mattress.enabled) && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Price Summary</h4>
                    <div className="space-y-3">
                        {/* Sofa Cleaning Breakdown */}
                        {state.details.upholsteryCleaning.sofa.enabled && (
                            <>
                                <div className="font-medium text-gray-900">Sofa Cleaning</div>
                                {state.details.upholsteryCleaning.sofa.large > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Large Sofa (x{state.details.upholsteryCleaning.sofa.large})</span>
                                        <span className="font-medium">${state.details.upholsteryCleaning.sofa.large * UPHOLSTERY_PRICE_CONFIG.sofa.large}</span>
                                    </div>
                                )}
                                {state.details.upholsteryCleaning.sofa.medium > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Medium Sofa (x{state.details.upholsteryCleaning.sofa.medium})</span>
                                        <span className="font-medium">${state.details.upholsteryCleaning.sofa.medium * UPHOLSTERY_PRICE_CONFIG.sofa.medium}</span>
                                    </div>
                                )}
                                {state.details.upholsteryCleaning.sofa.small > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Small Sofa (x{state.details.upholsteryCleaning.sofa.small})</span>
                                        <span className="font-medium">${state.details.upholsteryCleaning.sofa.small * UPHOLSTERY_PRICE_CONFIG.sofa.small}</span>
                                    </div>
                                )}
                            </>
                        )}

                        {/* Chair Cleaning Breakdown */}
                        {state.details.upholsteryCleaning.chair.enabled && (
                            <>
                                <div className="font-medium text-gray-900 mt-4">Chair Cleaning</div>
                                {state.details.upholsteryCleaning.chair.recliner > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Recliner Chair (x{state.details.upholsteryCleaning.chair.recliner})</span>
                                        <span className="font-medium">${state.details.upholsteryCleaning.chair.recliner * UPHOLSTERY_PRICE_CONFIG.chair.recliner}</span>
                                    </div>
                                )}
                                {state.details.upholsteryCleaning.chair.dayChair > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Day Chair (x{state.details.upholsteryCleaning.chair.dayChair})</span>
                                        <span className="font-medium">${state.details.upholsteryCleaning.chair.dayChair * UPHOLSTERY_PRICE_CONFIG.chair.dayChair}</span>
                                    </div>
                                )}
                                {state.details.upholsteryCleaning.chair.armChair > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Arm Chair (x{state.details.upholsteryCleaning.chair.armChair})</span>
                                        <span className="font-medium">${state.details.upholsteryCleaning.chair.armChair * UPHOLSTERY_PRICE_CONFIG.chair.armChair}</span>
                                    </div>
                                )}
                                {state.details.upholsteryCleaning.chair.ottoman > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Ottoman/Stool (x{state.details.upholsteryCleaning.chair.ottoman})</span>
                                        <span className="font-medium">${state.details.upholsteryCleaning.chair.ottoman * UPHOLSTERY_PRICE_CONFIG.chair.ottoman}</span>
                                    </div>
                                )}
                            </>
                        )}

                        {/* Mattress Cleaning Breakdown */}
                        {state.details.upholsteryCleaning.mattress.enabled && (
                            <>
                                <div className="font-medium text-gray-900 mt-4">Mattress Cleaning</div>
                                {state.details.upholsteryCleaning.mattress.large > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Large Mattress (x{state.details.upholsteryCleaning.mattress.large})</span>
                                        <span className="font-medium">${state.details.upholsteryCleaning.mattress.large * UPHOLSTERY_PRICE_CONFIG.mattress.large}</span>
                                    </div>
                                )}
                                {state.details.upholsteryCleaning.mattress.medium > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Medium Mattress (x{state.details.upholsteryCleaning.mattress.medium})</span>
                                        <span className="font-medium">${state.details.upholsteryCleaning.mattress.medium * UPHOLSTERY_PRICE_CONFIG.mattress.medium}</span>
                                    </div>
                                )}
                                {state.details.upholsteryCleaning.mattress.small > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Small Mattress (x{state.details.upholsteryCleaning.mattress.small})</span>
                                        <span className="font-medium">${state.details.upholsteryCleaning.mattress.small * UPHOLSTERY_PRICE_CONFIG.mattress.small}</span>
                                    </div>
                                )}
                            </>
                        )}

                        {/* Total Price */}
                        <div className="border-t border-gray-200 mt-4 pt-4">
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-900">Total Price:</span>
                                <span className="text-lg font-semibold text-[#1E3D8F]">
                                    ${calculateTotalPrice().toFixed(2)}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-2 italic">
                                Minimum service charge of $55 applies
                            </p>
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
            {(state.details.upholsteryCleaning.sofa.enabled || 
              state.details.upholsteryCleaning.chair.enabled || 
              state.details.upholsteryCleaning.mattress.enabled) && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <button
                        onClick={handleBookingSubmit}
                        disabled={state.isSubmitting}
                        className={`w-full py-4 px-6 rounded-lg font-medium
                            bg-[#1E3D8F] text-white hover:bg-[#1E3D8F]/90 transition-colors
                            flex items-center justify-center gap-2 text-lg
                            ${state.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {state.isSubmitting ? 'Processing...' : 'Next Step'}
                        
                    </button>
                </div>
            )}
        </div>
    )
} 
