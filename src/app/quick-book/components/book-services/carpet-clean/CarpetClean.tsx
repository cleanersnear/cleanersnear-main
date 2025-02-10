'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Check, AlertCircle } from 'lucide-react'



interface AdditionalOptions {
    carpetCleaning: {
        enabled: boolean;
        bedrooms: number;
        livingRooms: number;
        studyRooms: number;
        hallways: number;
        stairs: number;
        customRooms: {
            enabled: boolean;
            rooms: Array<{
                name: string;
                count: number;
            }>;
        };
    };
    rugCleaning: {
        enabled: boolean;
        large: number;
        medium: number;
        small: number;
    };
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

interface ServiceData {
    name: string;
    type: string;
    price: number;
    basePrice: number;
    details: {
        carpetCleaning: AdditionalOptions['carpetCleaning'];
        rugCleaning: AdditionalOptions['rugCleaning'];
        upholsteryCleaning: AdditionalOptions['upholsteryCleaning'];
    };
    priceBreakdown: Array<{
        description: string;
        amount: number;
    }>;
}

const updateServiceData = (data: ServiceData) => {
    localStorage.setItem('selectedService', JSON.stringify(data));
    // Dispatch custom event for real-time updates
    window.dispatchEvent(new CustomEvent('serviceUpdate', { detail: data }));
};

export default function CarpetClean() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)
    
    const [additionalOptions, setAdditionalOptions] = useState<AdditionalOptions>({
        carpetCleaning: {
            enabled: false,
            bedrooms: 0,
            livingRooms: 0,
            studyRooms: 0,
            hallways: 0,
            stairs: 0,
            customRooms: {
                enabled: false,
                rooms: []
            }
        },
        rugCleaning: {
            enabled: false,
            large: 0,
            medium: 0,
            small: 0
        },
        upholsteryCleaning: {
            enabled: false,
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

    // Wrap functions with useCallback
    const calculateTotalPrice = useCallback(() => {
        let total = 0;

        // Carpet Cleaning Prices
        if (additionalOptions.carpetCleaning.enabled) {
            total += additionalOptions.carpetCleaning.bedrooms * 35;
            total += additionalOptions.carpetCleaning.livingRooms * 35;
            total += additionalOptions.carpetCleaning.studyRooms * 30;
            total += additionalOptions.carpetCleaning.hallways * 25;
            total += additionalOptions.carpetCleaning.stairs * 50;
        }

        // Rug Cleaning Prices
        if (additionalOptions.rugCleaning.enabled) {
            total += additionalOptions.rugCleaning.large * 50;
            total += additionalOptions.rugCleaning.medium * 40;
            total += additionalOptions.rugCleaning.small * 35;
        }

        // Upholstery Cleaning Prices
        if (additionalOptions.upholsteryCleaning.enabled) {
            // Sofa prices
            total += additionalOptions.upholsteryCleaning.sofa.large * 120;
            total += additionalOptions.upholsteryCleaning.sofa.medium * 90;
            total += additionalOptions.upholsteryCleaning.sofa.small * 70;

            // Chair prices
            total += additionalOptions.upholsteryCleaning.chair.recliner * 60;
            total += additionalOptions.upholsteryCleaning.chair.dayChair * 45;
            total += additionalOptions.upholsteryCleaning.chair.armChair * 35;
            total += additionalOptions.upholsteryCleaning.chair.ottoman * 25;

            // Mattress prices
            total += additionalOptions.upholsteryCleaning.mattress.large * 80;
            total += additionalOptions.upholsteryCleaning.mattress.medium * 60;
            total += additionalOptions.upholsteryCleaning.mattress.small * 40;
        }

        // Apply minimum price of $55 if total is less
        return Math.max(55, total);
    }, [additionalOptions]);

    const calculatePriceBreakdown = useCallback(() => {
        const breakdown = [];

        // Carpet Cleaning breakdown
        if (additionalOptions.carpetCleaning.enabled) {
            if (additionalOptions.carpetCleaning.bedrooms > 0) {
                breakdown.push({
                    description: `Bedrooms (${additionalOptions.carpetCleaning.bedrooms})`,
                    amount: additionalOptions.carpetCleaning.bedrooms * 35
                });
            }
            if (additionalOptions.carpetCleaning.livingRooms > 0) {
                breakdown.push({
                    description: `Living Rooms (${additionalOptions.carpetCleaning.livingRooms})`,
                    amount: additionalOptions.carpetCleaning.livingRooms * 35
                });
            }
            if (additionalOptions.carpetCleaning.studyRooms > 0) {
                breakdown.push({
                    description: `Study Rooms (${additionalOptions.carpetCleaning.studyRooms})`,
                    amount: additionalOptions.carpetCleaning.studyRooms * 30
                });
            }
            if (additionalOptions.carpetCleaning.hallways > 0) {
                breakdown.push({
                    description: `Hallways (${additionalOptions.carpetCleaning.hallways})`,
                    amount: additionalOptions.carpetCleaning.hallways * 25
                });
            }
            if (additionalOptions.carpetCleaning.stairs > 0) {
                breakdown.push({
                    description: `Stairs (${additionalOptions.carpetCleaning.stairs})`,
                    amount: additionalOptions.carpetCleaning.stairs * 50
                });
            }
        }

        // Rug Cleaning breakdown
        if (additionalOptions.rugCleaning.enabled) {
            if (additionalOptions.rugCleaning.large > 0) {
                breakdown.push({
                    description: `Large Rugs (${additionalOptions.rugCleaning.large})`,
                    amount: additionalOptions.rugCleaning.large * 50
                });
            }
            if (additionalOptions.rugCleaning.medium > 0) {
                breakdown.push({
                    description: `Medium Rugs (${additionalOptions.rugCleaning.medium})`,
                    amount: additionalOptions.rugCleaning.medium * 40
                });
            }
            if (additionalOptions.rugCleaning.small > 0) {
                breakdown.push({
                    description: `Small Rugs (${additionalOptions.rugCleaning.small})`,
                    amount: additionalOptions.rugCleaning.small * 35
                });
            }
        }

        // Upholstery Cleaning breakdown
        if (additionalOptions.upholsteryCleaning.enabled) {
            // Sofa prices
            if (additionalOptions.upholsteryCleaning.sofa.large > 0) {
                breakdown.push({
                    description: `Large Sofas (${additionalOptions.upholsteryCleaning.sofa.large})`,
                    amount: additionalOptions.upholsteryCleaning.sofa.large * 120
                });
            }
            if (additionalOptions.upholsteryCleaning.sofa.medium > 0) {
                breakdown.push({
                    description: `Medium Sofas (${additionalOptions.upholsteryCleaning.sofa.medium})`,
                    amount: additionalOptions.upholsteryCleaning.sofa.medium * 90
                });
            }
            if (additionalOptions.upholsteryCleaning.sofa.small > 0) {
                breakdown.push({
                    description: `Small Sofas (${additionalOptions.upholsteryCleaning.sofa.small})`,
                    amount: additionalOptions.upholsteryCleaning.sofa.small * 70
                });
            }

            // Chair prices
            if (additionalOptions.upholsteryCleaning.chair.recliner > 0) {
                breakdown.push({
                    description: `Recliner Chairs (${additionalOptions.upholsteryCleaning.chair.recliner})`,
                    amount: additionalOptions.upholsteryCleaning.chair.recliner * 60
                });
            }
            if (additionalOptions.upholsteryCleaning.chair.dayChair > 0) {
                breakdown.push({
                    description: `Day Chairs (${additionalOptions.upholsteryCleaning.chair.dayChair})`,
                    amount: additionalOptions.upholsteryCleaning.chair.dayChair * 45
                });
            }
            if (additionalOptions.upholsteryCleaning.chair.armChair > 0) {
                breakdown.push({
                    description: `Arm Chairs (${additionalOptions.upholsteryCleaning.chair.armChair})`,
                    amount: additionalOptions.upholsteryCleaning.chair.armChair * 35
                });
            }
            if (additionalOptions.upholsteryCleaning.chair.ottoman > 0) {
                breakdown.push({
                    description: `Ottoman/Stools (${additionalOptions.upholsteryCleaning.chair.ottoman})`,
                    amount: additionalOptions.upholsteryCleaning.chair.ottoman * 25
                });
            }

            // Mattress prices
            if (additionalOptions.upholsteryCleaning.mattress.large > 0) {
                breakdown.push({
                    description: `Large Mattresses (${additionalOptions.upholsteryCleaning.mattress.large})`,
                    amount: additionalOptions.upholsteryCleaning.mattress.large * 80
                });
            }
            if (additionalOptions.upholsteryCleaning.mattress.medium > 0) {
                breakdown.push({
                    description: `Medium Mattresses (${additionalOptions.upholsteryCleaning.mattress.medium})`,
                    amount: additionalOptions.upholsteryCleaning.mattress.medium * 60
                });
            }
            if (additionalOptions.upholsteryCleaning.mattress.small > 0) {
                breakdown.push({
                    description: `Small Mattresses (${additionalOptions.upholsteryCleaning.mattress.small})`,
                    amount: additionalOptions.upholsteryCleaning.mattress.small * 40
                });
            }
        }

        return breakdown;
    }, [additionalOptions]);

    const handleBookingSubmit = async () => {
        if (isSubmitting) return;
        
        try {
            setIsSubmitting(true);
            setSubmitError(null);
            
            const totalPrice = calculateTotalPrice();
            
            // Format service data
            const serviceData = {
                type: "carpet-clean",
                name: "Carpet Cleaning",
                price: totalPrice,
                basePrice: totalPrice,
                details: {
                    carpetCleaning: additionalOptions.carpetCleaning,
                    rugCleaning: additionalOptions.rugCleaning,
                    upholsteryCleaning: additionalOptions.upholsteryCleaning
                },
                priceBreakdown: calculatePriceBreakdown()
            };

            // Just save to localStorage and proceed
            updateServiceData(serviceData);
            router.push('/quick-book/details');

            // Remove the service submission since it's too early
            // Customer details will be collected in the next step

        } catch (error) {
            console.error('Error preparing carpet cleaning data:', error);
            setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Now useEffect won't re-run unnecessarily
    useEffect(() => {
        const serviceData = {
            name: "Carpet Cleaning",
            type: "carpet-clean",
            price: calculateTotalPrice(),
            basePrice: calculateTotalPrice(),
            details: {
                carpetCleaning: additionalOptions.carpetCleaning,
                rugCleaning: additionalOptions.rugCleaning,
                upholsteryCleaning: additionalOptions.upholsteryCleaning
            },
            priceBreakdown: calculatePriceBreakdown()
        };
        
        updateServiceData(serviceData);
    }, [additionalOptions, calculateTotalPrice, calculatePriceBreakdown]);

    return (
        <div className="space-y-6">
            {/* Main Container */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-6">Select Services</h4>

                {/* 1. Carpet Cleaning Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h5 className="font-medium text-gray-900">Carpet Cleaning</h5>
                            <p className="text-sm text-gray-600">Deep steam cleaning for your carpets</p>
                        </div>
                        <button
                            onClick={() => setAdditionalOptions({
                                ...additionalOptions,
                                carpetCleaning: {
                                    ...additionalOptions.carpetCleaning,
                                    enabled: !additionalOptions.carpetCleaning.enabled
                                }
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                ${additionalOptions.carpetCleaning.enabled ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                    ${additionalOptions.carpetCleaning.enabled ? 'translate-x-6' : 'translate-x-1'}`}
                            />
                        </button>
                    </div>

                    {/* Carpet Cleaning Options */}
                    {additionalOptions.carpetCleaning.enabled && (
                        <div className="space-y-4 pl-4">
                            {/* Bedrooms */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-gray-900">Bedrooms</div>
                                    <div className="text-sm text-gray-600">$35 per room</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setAdditionalOptions({
                                            ...additionalOptions,
                                            carpetCleaning: {
                                                ...additionalOptions.carpetCleaning,
                                                bedrooms: Math.max(0, additionalOptions.carpetCleaning.bedrooms - 1)
                                            }
                                        })}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                            text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center font-medium">
                                        {additionalOptions.carpetCleaning.bedrooms}
                                    </span>
                                    <button
                                        onClick={() => setAdditionalOptions({
                                            ...additionalOptions,
                                            carpetCleaning: {
                                                ...additionalOptions.carpetCleaning,
                                                bedrooms: additionalOptions.carpetCleaning.bedrooms + 1
                                            }
                                        })}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                            text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Living Rooms */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-gray-900">Living/Lounge Rooms</div>
                                    <div className="text-sm text-gray-600">$35 per room</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setAdditionalOptions({
                                            ...additionalOptions,
                                            carpetCleaning: {
                                                ...additionalOptions.carpetCleaning,
                                                livingRooms: Math.max(0, additionalOptions.carpetCleaning.livingRooms - 1)
                                            }
                                        })}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                            text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center font-medium">
                                        {additionalOptions.carpetCleaning.livingRooms}
                                    </span>
                                    <button
                                        onClick={() => setAdditionalOptions({
                                            ...additionalOptions,
                                            carpetCleaning: {
                                                ...additionalOptions.carpetCleaning,
                                                livingRooms: additionalOptions.carpetCleaning.livingRooms + 1
                                            }
                                        })}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                            text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Study Rooms */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-gray-900">Study Rooms</div>
                                    <div className="text-sm text-gray-600">$30 per room</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setAdditionalOptions({
                                            ...additionalOptions,
                                            carpetCleaning: {
                                                ...additionalOptions.carpetCleaning,
                                                studyRooms: Math.max(0, additionalOptions.carpetCleaning.studyRooms - 1)
                                            }
                                        })}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                            text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center font-medium">
                                        {additionalOptions.carpetCleaning.studyRooms}
                                    </span>
                                    <button
                                        onClick={() => setAdditionalOptions({
                                            ...additionalOptions,
                                            carpetCleaning: {
                                                ...additionalOptions.carpetCleaning,
                                                studyRooms: additionalOptions.carpetCleaning.studyRooms + 1
                                            }
                                        })}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                            text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Hallways */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-gray-900">Hallways</div>
                                    <div className="text-sm text-gray-600">$25 per area</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setAdditionalOptions({
                                            ...additionalOptions,
                                            carpetCleaning: {
                                                ...additionalOptions.carpetCleaning,
                                                hallways: Math.max(0, additionalOptions.carpetCleaning.hallways - 1)
                                            }
                                        })}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                            text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center font-medium">
                                        {additionalOptions.carpetCleaning.hallways}
                                    </span>
                                    <button
                                        onClick={() => setAdditionalOptions({
                                            ...additionalOptions,
                                            carpetCleaning: {
                                                ...additionalOptions.carpetCleaning,
                                                hallways: additionalOptions.carpetCleaning.hallways + 1
                                            }
                                        })}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                            text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Stairs */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-gray-900">Stairs</div>
                                    <div className="text-sm text-gray-600">$50 per flight</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setAdditionalOptions({
                                            ...additionalOptions,
                                            carpetCleaning: {
                                                ...additionalOptions.carpetCleaning,
                                                stairs: Math.max(0, additionalOptions.carpetCleaning.stairs - 1)
                                            }
                                        })}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                            text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center font-medium">
                                        {additionalOptions.carpetCleaning.stairs}
                                    </span>
                                    <button
                                        onClick={() => setAdditionalOptions({
                                            ...additionalOptions,
                                            carpetCleaning: {
                                                ...additionalOptions.carpetCleaning,
                                                stairs: additionalOptions.carpetCleaning.stairs + 1
                                            }
                                        })}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                            text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Custom Rooms */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-gray-900">Custom Rooms</div>
                                        <div className="text-sm text-gray-600">No additional charge</div>
                                    </div>
                                    <button
                                        onClick={() => setAdditionalOptions({
                                            ...additionalOptions,
                                            carpetCleaning: {
                                                ...additionalOptions.carpetCleaning,
                                                customRooms: {
                                                    ...additionalOptions.carpetCleaning.customRooms,
                                                    enabled: !additionalOptions.carpetCleaning.customRooms.enabled
                                                }
                                            }
                                        })}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                            ${additionalOptions.carpetCleaning.customRooms.enabled ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                                ${additionalOptions.carpetCleaning.customRooms.enabled ? 'translate-x-6' : 'translate-x-1'}`}
                                        />
                                    </button>
                                </div>

                                {additionalOptions.carpetCleaning.customRooms.enabled && (
                                    <div className="space-y-3">
                                        {additionalOptions.carpetCleaning.customRooms.rooms.map((room, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <input
                                                    type="text"
                                                    value={room.name}
                                                    onChange={(e) => {
                                                        const newRooms = [...additionalOptions.carpetCleaning.customRooms.rooms];
                                                        newRooms[index].name = e.target.value;
                                                        setAdditionalOptions({
                                                            ...additionalOptions,
                                                            carpetCleaning: {
                                                                ...additionalOptions.carpetCleaning,
                                                                customRooms: {
                                                                    ...additionalOptions.carpetCleaning.customRooms,
                                                                    rooms: newRooms
                                                                }
                                                            }
                                                        });
                                                    }}
                                                    placeholder="Room name"
                                                    className="flex-1 p-2 border border-gray-200 rounded-lg
                                                        focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                                />
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => {
                                                            const newRooms = [...additionalOptions.carpetCleaning.customRooms.rooms];
                                                            newRooms[index].count = Math.max(0, newRooms[index].count - 1);
                                                            if (newRooms[index].count === 0) {
                                                                newRooms.splice(index, 1);
                                                            }
                                                            setAdditionalOptions({
                                                                ...additionalOptions,
                                                                carpetCleaning: {
                                                                    ...additionalOptions.carpetCleaning,
                                                                    customRooms: {
                                                                        ...additionalOptions.carpetCleaning.customRooms,
                                                                        rooms: newRooms
                                                                    }
                                                                }
                                                            });
                                                        }}
                                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                            text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-8 text-center font-medium">{room.count}</span>
                                                    <button
                                                        onClick={() => {
                                                            const newRooms = [...additionalOptions.carpetCleaning.customRooms.rooms];
                                                            newRooms[index].count += 1;
                                                            setAdditionalOptions({
                                                                ...additionalOptions,
                                                                carpetCleaning: {
                                                                    ...additionalOptions.carpetCleaning,
                                                                    customRooms: {
                                                                        ...additionalOptions.carpetCleaning.customRooms,
                                                                        rooms: newRooms
                                                                    }
                                                                }
                                                            });
                                                        }}
                                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                            text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Add New Custom Room Button */}
                                        <button
                                            onClick={() => {
                                                setAdditionalOptions({
                                                    ...additionalOptions,
                                                    carpetCleaning: {
                                                        ...additionalOptions.carpetCleaning,
                                                        customRooms: {
                                                            ...additionalOptions.carpetCleaning.customRooms,
                                                            rooms: [
                                                                ...additionalOptions.carpetCleaning.customRooms.rooms,
                                                                { name: '', count: 1 }
                                                            ]
                                                        }
                                                    }
                                                });
                                            }}
                                            className="w-full p-2 border-2 border-dashed border-gray-200 rounded-lg
                                                text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                        >
                                            + Add Custom Room
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* 2. Rug Cleaning Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h5 className="font-medium text-gray-900">Rug Cleaning</h5>
                            <p className="text-sm text-gray-600">Professional rug cleaning service</p>
                        </div>
                        <button
                            onClick={() => setAdditionalOptions({
                                ...additionalOptions,
                                rugCleaning: {
                                    ...additionalOptions.rugCleaning,
                                    enabled: !additionalOptions.rugCleaning.enabled
                                }
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                ${additionalOptions.rugCleaning.enabled ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                    ${additionalOptions.rugCleaning.enabled ? 'translate-x-6' : 'translate-x-1'}`}
                            />
                        </button>
                    </div>

                    {/* Rug Cleaning Options */}
                    {additionalOptions.rugCleaning.enabled && (
                        <div className="space-y-4 pl-4">
                            {/* Large Rugs */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-gray-900">Large Rugs</div>
                                    <div className="text-sm text-gray-600">$50 per rug (3×4m or larger)</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setAdditionalOptions({
                                            ...additionalOptions,
                                            rugCleaning: {
                                                ...additionalOptions.rugCleaning,
                                                large: Math.max(0, additionalOptions.rugCleaning.large - 1)
                                            }
                                        })}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                            text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center font-medium">
                                        {additionalOptions.rugCleaning.large}
                                    </span>
                                    <button
                                        onClick={() => setAdditionalOptions({
                                            ...additionalOptions,
                                            rugCleaning: {
                                                ...additionalOptions.rugCleaning,
                                                large: additionalOptions.rugCleaning.large + 1
                                            }
                                        })}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                            text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Medium Rugs */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-gray-900">Medium Rugs</div>
                                    <div className="text-sm text-gray-600">$40 per rug (2×3m)</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setAdditionalOptions({
                                            ...additionalOptions,
                                            rugCleaning: {
                                                ...additionalOptions.rugCleaning,
                                                medium: Math.max(0, additionalOptions.rugCleaning.medium - 1)
                                            }
                                        })}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                            text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center font-medium">
                                        {additionalOptions.rugCleaning.medium}
                                    </span>
                                    <button
                                        onClick={() => setAdditionalOptions({
                                            ...additionalOptions,
                                            rugCleaning: {
                                                ...additionalOptions.rugCleaning,
                                                medium: additionalOptions.rugCleaning.medium + 1
                                            }
                                        })}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                            text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Small Rugs */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-gray-900">Small Rugs</div>
                                    <div className="text-sm text-gray-600">$35 per rug (up to 1.5×2m)</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setAdditionalOptions({
                                            ...additionalOptions,
                                            rugCleaning: {
                                                ...additionalOptions.rugCleaning,
                                                small: Math.max(0, additionalOptions.rugCleaning.small - 1)
                                            }
                                        })}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                            text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center font-medium">
                                        {additionalOptions.rugCleaning.small}
                                    </span>
                                    <button
                                        onClick={() => setAdditionalOptions({
                                            ...additionalOptions,
                                            rugCleaning: {
                                                ...additionalOptions.rugCleaning,
                                                small: additionalOptions.rugCleaning.small + 1
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

                {/* 3. Upholstery Cleaning Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h5 className="font-medium text-gray-900">Upholstery Cleaning</h5>
                            <p className="text-sm text-gray-600">Professional upholstery cleaning service</p>
                        </div>
                        <button
                            onClick={() => setAdditionalOptions({
                                ...additionalOptions,
                                upholsteryCleaning: {
                                    ...additionalOptions.upholsteryCleaning,
                                    enabled: !additionalOptions.upholsteryCleaning.enabled
                                }
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                ${additionalOptions.upholsteryCleaning.enabled ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                    ${additionalOptions.upholsteryCleaning.enabled ? 'translate-x-6' : 'translate-x-1'}`}
                            />
                        </button>
                    </div>

                    {/* Upholstery Cleaning Options */}
                    {additionalOptions.upholsteryCleaning.enabled && (
                        <div className="space-y-6 pl-4">
                            {/* Sofa/Couch Section */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h6 className="font-medium text-gray-900">Sofa/Couch</h6>
                                        <p className="text-sm text-gray-600">Clean and sanitize your sofas</p>
                                    </div>
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
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                            ${additionalOptions.upholsteryCleaning.sofa.enabled ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                                ${additionalOptions.upholsteryCleaning.sofa.enabled ? 'translate-x-6' : 'translate-x-1'}`}
                                        />
                                    </button>
                                </div>

                                {additionalOptions.upholsteryCleaning.sofa.enabled && (
                                    <div className="space-y-4 pl-4">
                                        {/* Large Sofa */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-medium text-gray-900">Large Sofa</div>
                                                <div className="text-sm text-gray-600">$120 (4+ seater)</div>
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
                                                <div className="text-sm text-gray-600">$90 (3 seater)</div>
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
                                                <div className="text-sm text-gray-600">$70 (2 seater)</div>
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
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h6 className="font-medium text-gray-900">Chairs</h6>
                                        <p className="text-sm text-gray-600">Clean and sanitize your chairs</p>
                                    </div>
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
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                            ${additionalOptions.upholsteryCleaning.chair.enabled ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                                ${additionalOptions.upholsteryCleaning.chair.enabled ? 'translate-x-6' : 'translate-x-1'}`}
                                        />
                                    </button>
                                </div>

                                {additionalOptions.upholsteryCleaning.chair.enabled && (
                                    <div className="space-y-4 pl-4">
                                        {/* Recliner Chair */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-medium text-gray-900">Recliner Chair</div>
                                                <div className="text-sm text-gray-600">$60 per chair</div>
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
                                                <div className="text-sm text-gray-600">$45 per chair</div>
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
                                                <div className="text-sm text-gray-600">$35 per chair</div>
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

                                        {/* Ottoman/Fabric Stool */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-medium text-gray-900">Ottoman/Fabric Stool</div>
                                                <div className="text-sm text-gray-600">$25 per piece</div>
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
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h6 className="font-medium text-gray-900">Mattress</h6>
                                        <p className="text-sm text-gray-600">Clean and sanitize your mattresses</p>
                                    </div>
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
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                            ${additionalOptions.upholsteryCleaning.mattress.enabled ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                                ${additionalOptions.upholsteryCleaning.mattress.enabled ? 'translate-x-6' : 'translate-x-1'}`}
                                        />
                                    </button>
                                </div>

                                {additionalOptions.upholsteryCleaning.mattress.enabled && (
                                    <div className="space-y-4 pl-4">
                                        {/* Large Mattress */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-medium text-gray-900">Large Mattress</div>
                                                <div className="text-sm text-gray-600">$80 (King/Queen)</div>
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
                                                <div className="text-sm text-gray-600">$60 (Double)</div>
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
                    )}
                </div>
            </div>

            {/* Your Price Section */}
            {(additionalOptions.carpetCleaning.enabled || 
                additionalOptions.rugCleaning.enabled || 
                additionalOptions.upholsteryCleaning.enabled) && (
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-4">Your Price</h4>
                        <div className="bg-[#F8FAFC] rounded-lg p-4">
                            {/* Carpet Cleaning Breakdown */}
                            {additionalOptions.carpetCleaning.enabled && (
                                <div className="space-y-2">
                                    <div className="font-medium text-gray-900 mb-2">Carpet Cleaning</div>
                                    {additionalOptions.carpetCleaning.bedrooms > 0 && (
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="text-gray-600">Bedrooms ({additionalOptions.carpetCleaning.bedrooms})</div>
                                            <div className="text-gray-900">${additionalOptions.carpetCleaning.bedrooms * 35}</div>
                                        </div>
                                    )}
                                    {additionalOptions.carpetCleaning.livingRooms > 0 && (
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="text-gray-600">Living Rooms ({additionalOptions.carpetCleaning.livingRooms})</div>
                                            <div className="text-gray-900">${additionalOptions.carpetCleaning.livingRooms * 35}</div>
                                        </div>
                                    )}
                                    {additionalOptions.carpetCleaning.studyRooms > 0 && (
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="text-gray-600">Study Rooms ({additionalOptions.carpetCleaning.studyRooms})</div>
                                            <div className="text-gray-900">${additionalOptions.carpetCleaning.studyRooms * 30}</div>
                                        </div>
                                    )}
                                    {additionalOptions.carpetCleaning.hallways > 0 && (
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="text-gray-600">Hallways ({additionalOptions.carpetCleaning.hallways})</div>
                                            <div className="text-gray-900">${additionalOptions.carpetCleaning.hallways * 25}</div>
                                        </div>
                                    )}
                                    {additionalOptions.carpetCleaning.stairs > 0 && (
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="text-gray-600">Stairs ({additionalOptions.carpetCleaning.stairs})</div>
                                            <div className="text-gray-900">${additionalOptions.carpetCleaning.stairs * 50}</div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Rug Cleaning Breakdown */}
                            {additionalOptions.rugCleaning.enabled && (
                                <div className="space-y-2 mt-4 pt-4 border-t border-gray-200">
                                    <div className="font-medium text-gray-900 mb-2">Rug Cleaning</div>
                                    {additionalOptions.rugCleaning.large > 0 && (
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="text-gray-600">Large Rugs ({additionalOptions.rugCleaning.large})</div>
                                            <div className="text-gray-900">${additionalOptions.rugCleaning.large * 50}</div>
                                        </div>
                                    )}
                                    {additionalOptions.rugCleaning.medium > 0 && (
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="text-gray-600">Medium Rugs ({additionalOptions.rugCleaning.medium})</div>
                                            <div className="text-gray-900">${additionalOptions.rugCleaning.medium * 40}</div>
                                        </div>
                                    )}
                                    {additionalOptions.rugCleaning.small > 0 && (
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="text-gray-600">Small Rugs ({additionalOptions.rugCleaning.small})</div>
                                            <div className="text-gray-900">${additionalOptions.rugCleaning.small * 35}</div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Upholstery Cleaning Breakdown */}
                            {additionalOptions.upholsteryCleaning.enabled && (
                                <div className="space-y-2 mt-4 pt-4 border-t border-gray-200">
                                    <div className="font-medium text-gray-900 mb-2">Upholstery Cleaning</div>
                                    {/* Sofa Section */}
                                    {additionalOptions.upholsteryCleaning.sofa.enabled && (
                                        <>
                                            {additionalOptions.upholsteryCleaning.sofa.large > 0 && (
                                                <div className="flex justify-between items-center text-sm">
                                                    <div className="text-gray-600">Large Sofas ({additionalOptions.upholsteryCleaning.sofa.large})</div>
                                                    <div className="text-gray-900">${additionalOptions.upholsteryCleaning.sofa.large * 120}</div>
                                                </div>
                                            )}
                                            {additionalOptions.upholsteryCleaning.sofa.medium > 0 && (
                                                <div className="flex justify-between items-center text-sm">
                                                    <div className="text-gray-600">Medium Sofas ({additionalOptions.upholsteryCleaning.sofa.medium})</div>
                                                    <div className="text-gray-900">${additionalOptions.upholsteryCleaning.sofa.medium * 90}</div>
                                                </div>
                                            )}
                                            {additionalOptions.upholsteryCleaning.sofa.small > 0 && (
                                                <div className="flex justify-between items-center text-sm">
                                                    <div className="text-gray-600">Small Sofas ({additionalOptions.upholsteryCleaning.sofa.small})</div>
                                                    <div className="text-gray-900">${additionalOptions.upholsteryCleaning.sofa.small * 70}</div>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {/* Chair Section */}
                                    {additionalOptions.upholsteryCleaning.chair.enabled && (
                                        <>
                                            {additionalOptions.upholsteryCleaning.chair.recliner > 0 && (
                                                <div className="flex justify-between items-center text-sm">
                                                    <div className="text-gray-600">Recliner Chairs ({additionalOptions.upholsteryCleaning.chair.recliner})</div>
                                                    <div className="text-gray-900">${additionalOptions.upholsteryCleaning.chair.recliner * 60}</div>
                                                </div>
                                            )}
                                            {additionalOptions.upholsteryCleaning.chair.dayChair > 0 && (
                                                <div className="flex justify-between items-center text-sm">
                                                    <div className="text-gray-600">Day Chairs ({additionalOptions.upholsteryCleaning.chair.dayChair})</div>
                                                    <div className="text-gray-900">${additionalOptions.upholsteryCleaning.chair.dayChair * 45}</div>
                                                </div>
                                            )}
                                            {additionalOptions.upholsteryCleaning.chair.armChair > 0 && (
                                                <div className="flex justify-between items-center text-sm">
                                                    <div className="text-gray-600">Arm Chairs ({additionalOptions.upholsteryCleaning.chair.armChair})</div>
                                                    <div className="text-gray-900">${additionalOptions.upholsteryCleaning.chair.armChair * 35}</div>
                                                </div>
                                            )}
                                            {additionalOptions.upholsteryCleaning.chair.ottoman > 0 && (
                                                <div className="flex justify-between items-center text-sm">
                                                    <div className="text-gray-600">Ottoman/Stools ({additionalOptions.upholsteryCleaning.chair.ottoman})</div>
                                                    <div className="text-gray-900">${additionalOptions.upholsteryCleaning.chair.ottoman * 25}</div>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {/* Mattress Section */}
                                    {additionalOptions.upholsteryCleaning.mattress.enabled && (
                                        <>
                                            {additionalOptions.upholsteryCleaning.mattress.large > 0 && (
                                                <div className="flex justify-between items-center text-sm">
                                                    <div className="text-gray-600">Large Mattresses ({additionalOptions.upholsteryCleaning.mattress.large})</div>
                                                    <div className="text-gray-900">${additionalOptions.upholsteryCleaning.mattress.large * 80}</div>
                                                </div>
                                            )}
                                            {additionalOptions.upholsteryCleaning.mattress.medium > 0 && (
                                                <div className="flex justify-between items-center text-sm">
                                                    <div className="text-gray-600">Medium Mattresses ({additionalOptions.upholsteryCleaning.mattress.medium})</div>
                                                    <div className="text-gray-900">${additionalOptions.upholsteryCleaning.mattress.medium * 60}</div>
                                                </div>
                                            )}
                                            {additionalOptions.upholsteryCleaning.mattress.small > 0 && (
                                                <div className="flex justify-between items-center text-sm">
                                                    <div className="text-gray-600">Small Mattresses ({additionalOptions.upholsteryCleaning.mattress.small})</div>
                                                    <div className="text-gray-900">${additionalOptions.upholsteryCleaning.mattress.small * 40}</div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            )}

                            {/* Total Price */}
                            <div className="border-t border-gray-200 mt-4 pt-4">
                                <div className="flex justify-between items-center">
                                    <div className="font-medium text-gray-900">Total Price:</div>
                                    <div className="font-semibold text-lg text-[#1E3D8F]">
                                        ${calculateTotalPrice().toFixed(2)}
                                    </div>
                                </div>
                                {/* Minimum Price Note */}
                                <p className="text-sm text-gray-500 mt-2 italic">
                                    Note: Due to steam cleaning equipment setup and labor costs, we maintain a minimum service charge of $55 for all bookings.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

            {/* Next Step Button */}
            {(additionalOptions.carpetCleaning.enabled || 
                additionalOptions.rugCleaning.enabled || 
                additionalOptions.upholsteryCleaning.enabled) && (
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <button
                            onClick={handleBookingSubmit}
                            disabled={isSubmitting}
                            className={`w-full py-4 px-6 rounded-lg font-medium
                                ${isSubmitting 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-[#1E3D8F] hover:bg-[#1E3D8F]/90'
                                } text-white transition-colors`}
                        >
                            <div className="flex items-center justify-center gap-2">
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Processing...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Next Step</span>
                                        <Check className="w-5 h-5" />
                                    </>
                                )}
                            </div>
                        </button>

                        {/* Error Message */}
                        {submitError && (
                            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg 
                                flex items-center gap-2 text-red-600">
                                <AlertCircle className="w-5 h-5" />
                                <p>{submitError}</p>
                            </div>
                        )}
                    </div>
                )}
        </div>
    )
} 