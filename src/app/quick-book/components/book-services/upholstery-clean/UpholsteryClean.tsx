import { useState, useEffect,useCallback} from 'react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'


interface AdditionalOptions {
    upholsteryCleaning: {
        enabled: boolean;
        sofa: {
            enabled: boolean;
            large: number;
            medium: number;
            small: number;
        };
        chair: {
            enabled: boolean;
            recliner: number;
            dayChair: number;
            armChair: number;
            ottoman: number;
        };
        mattress: {
            enabled: boolean;
            large: number;
            medium: number;
            small: number;
        };
    };
    additionalNotes: string;
}

export default function UpholsteryClean() {
    const router = useRouter()
    
    
    const [additionalOptions, setAdditionalOptions] = useState<AdditionalOptions>({
        upholsteryCleaning: {
            enabled: true,
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
        additionalNotes: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const calculateTotalPrice = useCallback(() => {
        let total = 0;

        // Sofa prices
        if (additionalOptions.upholsteryCleaning.sofa.enabled) {
            total += additionalOptions.upholsteryCleaning.sofa.large * 120;
            total += additionalOptions.upholsteryCleaning.sofa.medium * 90;
            total += additionalOptions.upholsteryCleaning.sofa.small * 70;
        }

        // Chair prices
        if (additionalOptions.upholsteryCleaning.chair.enabled) {
            total += additionalOptions.upholsteryCleaning.chair.recliner * 60;
            total += additionalOptions.upholsteryCleaning.chair.dayChair * 45;
            total += additionalOptions.upholsteryCleaning.chair.armChair * 35;
            total += additionalOptions.upholsteryCleaning.chair.ottoman * 25;
        }

        // Mattress prices
        if (additionalOptions.upholsteryCleaning.mattress.enabled) {
            total += additionalOptions.upholsteryCleaning.mattress.large * 80;
            total += additionalOptions.upholsteryCleaning.mattress.medium * 60;
            total += additionalOptions.upholsteryCleaning.mattress.small * 40;
        }

        return Math.max(55, total);
    }, [additionalOptions.upholsteryCleaning]);

    const handleBookingSubmit = async () => {
        if (isSubmitting) return;
        
        try {
            setIsSubmitting(true);
            setSubmitError(null);

            const totalPrice = calculateTotalPrice();
            
            if (!totalPrice || totalPrice <= 0) {
                throw new Error('Invalid price calculation');
            }

            const serviceData = {
                name: "Upholstery Cleaning",
                type: "upholstery-clean" as const,
                price: totalPrice,
                description: "Professional upholstery cleaning service",
                details: {
                    upholsteryCleaning: additionalOptions.upholsteryCleaning,
                    additionalNotes: additionalOptions.additionalNotes,
                    priceBreakdown: generatePriceBreakdown()
                }
            };

            // Save to localStorage
            localStorage.setItem('selectedService', JSON.stringify(serviceData));
            
            // Emit event for other components
            window.dispatchEvent(new CustomEvent('serviceUpdate', { detail: serviceData }));

            // Navigate to details page
            router.push('/quick-book/details');

        } catch (error) {
            console.error('Error preparing upholstery cleaning:', error);
            setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    const generatePriceBreakdown = () => {
        const breakdown = [];

        // Add sofa items
        if (additionalOptions.upholsteryCleaning.sofa.enabled) {
            if (additionalOptions.upholsteryCleaning.sofa.large > 0) {
                breakdown.push({
                    description: `Large Sofa (x${additionalOptions.upholsteryCleaning.sofa.large})`,
                    amount: additionalOptions.upholsteryCleaning.sofa.large * 120
                });
            }
            if (additionalOptions.upholsteryCleaning.sofa.medium > 0) {
                breakdown.push({
                    description: `Medium Sofa (x${additionalOptions.upholsteryCleaning.sofa.medium})`,
                    amount: additionalOptions.upholsteryCleaning.sofa.medium * 90
                });
            }
            if (additionalOptions.upholsteryCleaning.sofa.small > 0) {
                breakdown.push({
                    description: `Small Sofa (x${additionalOptions.upholsteryCleaning.sofa.small})`,
                    amount: additionalOptions.upholsteryCleaning.sofa.small * 70
                });
            }
        }

        // Add chair items
        if (additionalOptions.upholsteryCleaning.chair.enabled) {
            // ... similar breakdown for chairs
        }

        // Add mattress items
        if (additionalOptions.upholsteryCleaning.mattress.enabled) {
            // ... similar breakdown for mattresses
        }

        return breakdown;
    };

    useEffect(() => {
        try {
            const totalPrice = calculateTotalPrice();
            
            const serviceData = {
                name: "Upholstery Cleaning",
                type: "upholstery-clean",
                price: totalPrice,
                details: {
                    upholsteryCleaning: additionalOptions.upholsteryCleaning,
                    additionalNotes: additionalOptions.additionalNotes
                }
            };

            localStorage.setItem('selectedService', JSON.stringify(serviceData));
            window.dispatchEvent(new CustomEvent('localStorageChange'));
        } catch (error) {
            console.error('Error updating service data:', error);
        }
    }, [additionalOptions, calculateTotalPrice]);

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
                            onClick={() => setAdditionalOptions({
                                ...additionalOptions,
                                upholsteryCleaning: {
                                    ...additionalOptions.upholsteryCleaning,
                                    sofa: {
                                        ...additionalOptions.upholsteryCleaning.sofa,
                                        enabled: !additionalOptions.upholsteryCleaning.sofa.enabled
                                    }
                                }
                            })}
                            className={`w-full p-4 rounded-lg border-2 transition-all mb-4
                                ${additionalOptions.upholsteryCleaning.sofa.enabled
                                    ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                    : 'border-gray-200 hover:border-[#90c2f7]'
                                }`}
                        >
                            <div className="flex justify-between items-center">
                                <span className="font-medium">Sofa Cleaning</span>
                                <Check className={`w-5 h-5 transition-opacity
                                    ${additionalOptions.upholsteryCleaning.sofa.enabled
                                        ? 'opacity-100 text-[#1E3D8F]'
                                        : 'opacity-0'
                                    }`}
                                />
                            </div>
                        </button>

                        {additionalOptions.upholsteryCleaning.sofa.enabled && (
                            <div className="space-y-4 mt-4">
                                {/* Large Sofa */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-gray-900">Large Sofa</div>
                                        <div className="text-sm text-gray-600">$120 (4+ Seater)</div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setAdditionalOptions({
                                                ...additionalOptions,
                                                upholsteryCleaning: {
                                                    ...additionalOptions.upholsteryCleaning,
                                                    sofa: {
                                                        ...additionalOptions.upholsteryCleaning.sofa,
                                                        large: Math.max(0, additionalOptions.upholsteryCleaning.sofa.large - 1)
                                                    }
                                                }
                                            })}
                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center font-medium">
                                            {additionalOptions.upholsteryCleaning.sofa.large}
                                        </span>
                                        <button
                                            onClick={() => setAdditionalOptions({
                                                ...additionalOptions,
                                                upholsteryCleaning: {
                                                    ...additionalOptions.upholsteryCleaning,
                                                    sofa: {
                                                        ...additionalOptions.upholsteryCleaning.sofa,
                                                        large: additionalOptions.upholsteryCleaning.sofa.large + 1
                                                    }
                                                }
                                            })}
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
                                            onClick={() => setAdditionalOptions({
                                                ...additionalOptions,
                                                upholsteryCleaning: {
                                                    ...additionalOptions.upholsteryCleaning,
                                                    sofa: {
                                                        ...additionalOptions.upholsteryCleaning.sofa,
                                                        medium: Math.max(0, additionalOptions.upholsteryCleaning.sofa.medium - 1)
                                                    }
                                                }
                                            })}
                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center font-medium">
                                            {additionalOptions.upholsteryCleaning.sofa.medium}
                                        </span>
                                        <button
                                            onClick={() => setAdditionalOptions({
                                                ...additionalOptions,
                                                upholsteryCleaning: {
                                                    ...additionalOptions.upholsteryCleaning,
                                                    sofa: {
                                                        ...additionalOptions.upholsteryCleaning.sofa,
                                                        medium: additionalOptions.upholsteryCleaning.sofa.medium + 1
                                                    }
                                                }
                                            })}
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
                                            onClick={() => setAdditionalOptions({
                                                ...additionalOptions,
                                                upholsteryCleaning: {
                                                    ...additionalOptions.upholsteryCleaning,
                                                    sofa: {
                                                        ...additionalOptions.upholsteryCleaning.sofa,
                                                        small: Math.max(0, additionalOptions.upholsteryCleaning.sofa.small - 1)
                                                    }
                                                }
                                            })}
                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center font-medium">
                                            {additionalOptions.upholsteryCleaning.sofa.small}
                                        </span>
                                        <button
                                            onClick={() => setAdditionalOptions({
                                                ...additionalOptions,
                                                upholsteryCleaning: {
                                                    ...additionalOptions.upholsteryCleaning,
                                                    sofa: {
                                                        ...additionalOptions.upholsteryCleaning.sofa,
                                                        small: additionalOptions.upholsteryCleaning.sofa.small + 1
                                                    }
                                                }
                                            })}
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
                            onClick={() => setAdditionalOptions({
                                ...additionalOptions,
                                upholsteryCleaning: {
                                    ...additionalOptions.upholsteryCleaning,
                                    chair: {
                                        ...additionalOptions.upholsteryCleaning.chair,
                                        enabled: !additionalOptions.upholsteryCleaning.chair.enabled
                                    }
                                }
                            })}
                            className={`w-full p-4 rounded-lg border-2 transition-all mb-4
                                ${additionalOptions.upholsteryCleaning.chair.enabled
                                    ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                    : 'border-gray-200 hover:border-[#90c2f7]'
                                }`}
                        >
                            <div className="flex justify-between items-center">
                                <span className="font-medium">Chair Cleaning</span>
                                <Check className={`w-5 h-5 transition-opacity
                                    ${additionalOptions.upholsteryCleaning.chair.enabled
                                        ? 'opacity-100 text-[#1E3D8F]'
                                        : 'opacity-0'
                                    }`}
                                />
                            </div>
                        </button>

                        {additionalOptions.upholsteryCleaning.chair.enabled && (
                            <div className="space-y-4 mt-4">
                                {/* Recliner Chair */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-gray-900">Recliner Chair</div>
                                        <div className="text-sm text-gray-600">$60</div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setAdditionalOptions({
                                                ...additionalOptions,
                                                upholsteryCleaning: {
                                                    ...additionalOptions.upholsteryCleaning,
                                                    chair: {
                                                        ...additionalOptions.upholsteryCleaning.chair,
                                                        recliner: Math.max(0, additionalOptions.upholsteryCleaning.chair.recliner - 1)
                                                    }
                                                }
                                            })}
                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center font-medium">
                                            {additionalOptions.upholsteryCleaning.chair.recliner}
                                        </span>
                                        <button
                                            onClick={() => setAdditionalOptions({
                                                ...additionalOptions,
                                                upholsteryCleaning: {
                                                    ...additionalOptions.upholsteryCleaning,
                                                    chair: {
                                                        ...additionalOptions.upholsteryCleaning.chair,
                                                        recliner: additionalOptions.upholsteryCleaning.chair.recliner + 1
                                                    }
                                                }
                                            })}
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
                                            onClick={() => setAdditionalOptions({
                                                ...additionalOptions,
                                                upholsteryCleaning: {
                                                    ...additionalOptions.upholsteryCleaning,
                                                    chair: {
                                                        ...additionalOptions.upholsteryCleaning.chair,
                                                        dayChair: Math.max(0, additionalOptions.upholsteryCleaning.chair.dayChair - 1)
                                                    }
                                                }
                                            })}
                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center font-medium">
                                            {additionalOptions.upholsteryCleaning.chair.dayChair}
                                        </span>
                                        <button
                                            onClick={() => setAdditionalOptions({
                                                ...additionalOptions,
                                                upholsteryCleaning: {
                                                    ...additionalOptions.upholsteryCleaning,
                                                    chair: {
                                                        ...additionalOptions.upholsteryCleaning.chair,
                                                        dayChair: additionalOptions.upholsteryCleaning.chair.dayChair + 1
                                                    }
                                                }
                                            })}
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
                                            onClick={() => setAdditionalOptions({
                                                ...additionalOptions,
                                                upholsteryCleaning: {
                                                    ...additionalOptions.upholsteryCleaning,
                                                    chair: {
                                                        ...additionalOptions.upholsteryCleaning.chair,
                                                        armChair: Math.max(0, additionalOptions.upholsteryCleaning.chair.armChair - 1)
                                                    }
                                                }
                                            })}
                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center font-medium">
                                            {additionalOptions.upholsteryCleaning.chair.armChair}
                                        </span>
                                        <button
                                            onClick={() => setAdditionalOptions({
                                                ...additionalOptions,
                                                upholsteryCleaning: {
                                                    ...additionalOptions.upholsteryCleaning,
                                                    chair: {
                                                        ...additionalOptions.upholsteryCleaning.chair,
                                                        armChair: additionalOptions.upholsteryCleaning.chair.armChair + 1
                                                    }
                                                }
                                            })}
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
                                            onClick={() => setAdditionalOptions({
                                                ...additionalOptions,
                                                upholsteryCleaning: {
                                                    ...additionalOptions.upholsteryCleaning,
                                                    chair: {
                                                        ...additionalOptions.upholsteryCleaning.chair,
                                                        ottoman: Math.max(0, additionalOptions.upholsteryCleaning.chair.ottoman - 1)
                                                    }
                                                }
                                            })}
                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center font-medium">
                                            {additionalOptions.upholsteryCleaning.chair.ottoman}
                                        </span>
                                        <button
                                            onClick={() => setAdditionalOptions({
                                                ...additionalOptions,
                                                upholsteryCleaning: {
                                                    ...additionalOptions.upholsteryCleaning,
                                                    chair: {
                                                        ...additionalOptions.upholsteryCleaning.chair,
                                                        ottoman: additionalOptions.upholsteryCleaning.chair.ottoman + 1
                                                    }
                                                }
                                            })}
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
                            onClick={() => setAdditionalOptions({
                                ...additionalOptions,
                                upholsteryCleaning: {
                                    ...additionalOptions.upholsteryCleaning,
                                    mattress: {
                                        ...additionalOptions.upholsteryCleaning.mattress,
                                        enabled: !additionalOptions.upholsteryCleaning.mattress.enabled
                                    }
                                }
                            })}
                            className={`w-full p-4 rounded-lg border-2 transition-all mb-4
                                ${additionalOptions.upholsteryCleaning.mattress.enabled
                                    ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                    : 'border-gray-200 hover:border-[#90c2f7]'
                                }`}
                        >
                            <div className="flex justify-between items-center">
                                <span className="font-medium">Mattress Cleaning</span>
                                <Check className={`w-5 h-5 transition-opacity
                                    ${additionalOptions.upholsteryCleaning.mattress.enabled
                                        ? 'opacity-100 text-[#1E3D8F]'
                                        : 'opacity-0'
                                    }`}
                                />
                            </div>
                        </button>

                        {additionalOptions.upholsteryCleaning.mattress.enabled && (
                            <div className="space-y-4 mt-4">
                                {/* Large Mattress */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-gray-900">Large Mattress</div>
                                        <div className="text-sm text-gray-600">$80 (King)</div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setAdditionalOptions({
                                                ...additionalOptions,
                                                upholsteryCleaning: {
                                                    ...additionalOptions.upholsteryCleaning,
                                                    mattress: {
                                                        ...additionalOptions.upholsteryCleaning.mattress,
                                                        large: Math.max(0, additionalOptions.upholsteryCleaning.mattress.large - 1)
                                                    }
                                                }
                                            })}
                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center font-medium">
                                            {additionalOptions.upholsteryCleaning.mattress.large}
                                        </span>
                                        <button
                                            onClick={() => setAdditionalOptions({
                                                ...additionalOptions,
                                                upholsteryCleaning: {
                                                    ...additionalOptions.upholsteryCleaning,
                                                    mattress: {
                                                        ...additionalOptions.upholsteryCleaning.mattress,
                                                        large: additionalOptions.upholsteryCleaning.mattress.large + 1
                                                    }
                                                }
                                            })}
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
                                            onClick={() => setAdditionalOptions({
                                                ...additionalOptions,
                                                upholsteryCleaning: {
                                                    ...additionalOptions.upholsteryCleaning,
                                                    mattress: {
                                                        ...additionalOptions.upholsteryCleaning.mattress,
                                                        medium: Math.max(0, additionalOptions.upholsteryCleaning.mattress.medium - 1)
                                                    }
                                                }
                                            })}
                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center font-medium">
                                            {additionalOptions.upholsteryCleaning.mattress.medium}
                                        </span>
                                        <button
                                            onClick={() => setAdditionalOptions({
                                                ...additionalOptions,
                                                upholsteryCleaning: {
                                                    ...additionalOptions.upholsteryCleaning,
                                                    mattress: {
                                                        ...additionalOptions.upholsteryCleaning.mattress,
                                                        medium: additionalOptions.upholsteryCleaning.mattress.medium + 1
                                                    }
                                                }
                                            })}
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
                                            onClick={() => setAdditionalOptions({
                                                ...additionalOptions,
                                                upholsteryCleaning: {
                                                    ...additionalOptions.upholsteryCleaning,
                                                    mattress: {
                                                        ...additionalOptions.upholsteryCleaning.mattress,
                                                        small: Math.max(0, additionalOptions.upholsteryCleaning.mattress.small - 1)
                                                    }
                                                }
                                            })}
                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center font-medium">
                                            {additionalOptions.upholsteryCleaning.mattress.small}
                                        </span>
                                        <button
                                            onClick={() => setAdditionalOptions({
                                                ...additionalOptions,
                                                upholsteryCleaning: {
                                                    ...additionalOptions.upholsteryCleaning,
                                                    mattress: {
                                                        ...additionalOptions.upholsteryCleaning.mattress,
                                                        small: additionalOptions.upholsteryCleaning.mattress.small + 1
                                                    }
                                                }
                                            })}
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

            {/* Price Summary */}
            {(additionalOptions.upholsteryCleaning.sofa.enabled || 
              additionalOptions.upholsteryCleaning.chair.enabled || 
              additionalOptions.upholsteryCleaning.mattress.enabled) && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Price Summary</h4>
                    <div className="space-y-3">
                        {/* Sofa Cleaning Breakdown */}
                        {additionalOptions.upholsteryCleaning.sofa.enabled && (
                            <>
                                <div className="font-medium text-gray-900">Sofa Cleaning</div>
                                {additionalOptions.upholsteryCleaning.sofa.large > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Large Sofa (x{additionalOptions.upholsteryCleaning.sofa.large})</span>
                                        <span className="font-medium">${additionalOptions.upholsteryCleaning.sofa.large * 120}</span>
                                    </div>
                                )}
                                {additionalOptions.upholsteryCleaning.sofa.medium > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Medium Sofa (x{additionalOptions.upholsteryCleaning.sofa.medium})</span>
                                        <span className="font-medium">${additionalOptions.upholsteryCleaning.sofa.medium * 90}</span>
                                    </div>
                                )}
                                {additionalOptions.upholsteryCleaning.sofa.small > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Small Sofa (x{additionalOptions.upholsteryCleaning.sofa.small})</span>
                                        <span className="font-medium">${additionalOptions.upholsteryCleaning.sofa.small * 70}</span>
                                    </div>
                                )}
                            </>
                        )}

                        {/* Chair Cleaning Breakdown */}
                        {additionalOptions.upholsteryCleaning.chair.enabled && (
                            <>
                                <div className="font-medium text-gray-900 mt-4">Chair Cleaning</div>
                                {additionalOptions.upholsteryCleaning.chair.recliner > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Recliner Chair (x{additionalOptions.upholsteryCleaning.chair.recliner})</span>
                                        <span className="font-medium">${additionalOptions.upholsteryCleaning.chair.recliner * 60}</span>
                                    </div>
                                )}
                                {additionalOptions.upholsteryCleaning.chair.dayChair > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Day Chair (x{additionalOptions.upholsteryCleaning.chair.dayChair})</span>
                                        <span className="font-medium">${additionalOptions.upholsteryCleaning.chair.dayChair * 45}</span>
                                    </div>
                                )}
                                {additionalOptions.upholsteryCleaning.chair.armChair > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Arm Chair (x{additionalOptions.upholsteryCleaning.chair.armChair})</span>
                                        <span className="font-medium">${additionalOptions.upholsteryCleaning.chair.armChair * 35}</span>
                                    </div>
                                )}
                                {additionalOptions.upholsteryCleaning.chair.ottoman > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Ottoman/Stool (x{additionalOptions.upholsteryCleaning.chair.ottoman})</span>
                                        <span className="font-medium">${additionalOptions.upholsteryCleaning.chair.ottoman * 25}</span>
                                    </div>
                                )}
                            </>
                        )}

                        {/* Mattress Cleaning Breakdown */}
                        {additionalOptions.upholsteryCleaning.mattress.enabled && (
                            <>
                                <div className="font-medium text-gray-900 mt-4">Mattress Cleaning</div>
                                {additionalOptions.upholsteryCleaning.mattress.large > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Large Mattress (x{additionalOptions.upholsteryCleaning.mattress.large})</span>
                                        <span className="font-medium">${additionalOptions.upholsteryCleaning.mattress.large * 80}</span>
                                    </div>
                                )}
                                {additionalOptions.upholsteryCleaning.mattress.medium > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Medium Mattress (x{additionalOptions.upholsteryCleaning.mattress.medium})</span>
                                        <span className="font-medium">${additionalOptions.upholsteryCleaning.mattress.medium * 60}</span>
                                    </div>
                                )}
                                {additionalOptions.upholsteryCleaning.mattress.small > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Small Mattress (x{additionalOptions.upholsteryCleaning.mattress.small})</span>
                                        <span className="font-medium">${additionalOptions.upholsteryCleaning.mattress.small * 40}</span>
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
            {submitError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                    {submitError}
                </div>
            )}

            {/* Next Step Button */}
            {(additionalOptions.upholsteryCleaning.sofa.enabled || 
              additionalOptions.upholsteryCleaning.chair.enabled || 
              additionalOptions.upholsteryCleaning.mattress.enabled) && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <button
                        onClick={handleBookingSubmit}
                        disabled={isSubmitting}
                        className={`w-full py-4 px-6 rounded-lg font-medium
                            bg-[#1E3D8F] text-white hover:bg-[#1E3D8F]/90 transition-colors
                            flex items-center justify-center gap-2 text-lg
                            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Processing...' : 'Next Step'}
                        <Check className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    )
} 