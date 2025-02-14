'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { AlertCircle } from 'lucide-react'
import { useBookingStore } from '../../../store/bookingStore'
import type { 
    CarpetCleaningState, 
    CarpetCleaningDetails,
} from '../../../types'
// Make the props optional with ?

// Should be:
const updateServiceData = (data: CarpetCleaningDetails) => {
    localStorage.setItem('carpetCleaningDetails', JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('serviceStorageUpdate', {  // 
        detail: {
            type: 'carpet-cleaning',
            data: { 
                pricing: { totalPrice: data.totalPrice } 
            }
        }
    }));
};

export default function CarpetClean(){
    const router = useRouter()
    const setCarpetCleaningDetails = useBookingStore(state => state.setCarpetCleaningDetails)
    const [bookingState, setBookingState] = useState<CarpetCleaningState>({
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
        totalPrice: 0,
        
        isSubmitting: false,
        priceBreakdown: []
    })
    const [submitError, setSubmitError] = useState<string | null>(null)
    
    // Wrap functions with useCallback
    const calculateTotalPrice = useCallback(() => {
        let total = 0;

        // Carpet Cleaning Prices
        if (bookingState.carpetCleaning.enabled) {
            total += bookingState.carpetCleaning.bedrooms * 35;
            total += bookingState.carpetCleaning.livingRooms * 35;
            total += bookingState.carpetCleaning.studyRooms * 30;
            total += bookingState.carpetCleaning.hallways * 25;
            total += bookingState.carpetCleaning.stairs * 50;
        }

        // Rug Cleaning Prices
        if (bookingState.rugCleaning.enabled) {
            total += bookingState.rugCleaning.large * 50;
            total += bookingState.rugCleaning.medium * 40;
            total += bookingState.rugCleaning.small * 35;
        }

        // Upholstery Cleaning Prices
        if (bookingState.upholsteryCleaning.enabled) {
            // Sofa prices
            total += bookingState.upholsteryCleaning.sofa.large * 120;
            total += bookingState.upholsteryCleaning.sofa.medium * 90;
            total += bookingState.upholsteryCleaning.sofa.small * 70;

            // Chair prices
            total += bookingState.upholsteryCleaning.chair.recliner * 60;
            total += bookingState.upholsteryCleaning.chair.dayChair * 45;
            total += bookingState.upholsteryCleaning.chair.armChair * 35;
            total += bookingState.upholsteryCleaning.chair.ottoman * 25;

            // Mattress prices
            total += bookingState.upholsteryCleaning.mattress.large * 80;
            total += bookingState.upholsteryCleaning.mattress.medium * 60;
            total += bookingState.upholsteryCleaning.mattress.small * 40;
        }

        // Apply minimum price of $55 if total is less
        return Math.max(55, total);
    }, [bookingState]);

    const calculatePriceBreakdown = useCallback(() => {
        const breakdown = [];

        // Carpet Cleaning breakdown
        if (bookingState.carpetCleaning.enabled) {
            if (bookingState.carpetCleaning.bedrooms > 0) {
                breakdown.push({
                    description: `Bedrooms (${bookingState.carpetCleaning.bedrooms})`,
                    amount: bookingState.carpetCleaning.bedrooms * 35
                });
            }
            if (bookingState.carpetCleaning.livingRooms > 0) {
                breakdown.push({
                    description: `Living Rooms (${bookingState.carpetCleaning.livingRooms})`,
                    amount: bookingState.carpetCleaning.livingRooms * 35
                });
            }
            if (bookingState.carpetCleaning.studyRooms > 0) {
                breakdown.push({
                    description: `Study Rooms (${bookingState.carpetCleaning.studyRooms})`,
                    amount: bookingState.carpetCleaning.studyRooms * 30
                });
            }
            if (bookingState.carpetCleaning.hallways > 0) {
                breakdown.push({
                    description: `Hallways (${bookingState.carpetCleaning.hallways})`,
                    amount: bookingState.carpetCleaning.hallways * 25
                });
            }
            if (bookingState.carpetCleaning.stairs > 0) {
                breakdown.push({
                    description: `Stairs (${bookingState.carpetCleaning.stairs})`,
                    amount: bookingState.carpetCleaning.stairs * 50
                });
            }
        }

        // Rug Cleaning breakdown
        if (bookingState.rugCleaning.enabled) {
            if (bookingState.rugCleaning.large > 0) {
                breakdown.push({
                    description: `Large Rugs (${bookingState.rugCleaning.large})`,
                    amount: bookingState.rugCleaning.large * 50
                });
            }
            if (bookingState.rugCleaning.medium > 0) {
                breakdown.push({
                    description: `Medium Rugs (${bookingState.rugCleaning.medium})`,
                    amount: bookingState.rugCleaning.medium * 40
                });
            }
            if (bookingState.rugCleaning.small > 0) {
                breakdown.push({
                    description: `Small Rugs (${bookingState.rugCleaning.small})`,
                    amount: bookingState.rugCleaning.small * 35
                });
            }
        }

        // Upholstery Cleaning breakdown
        if (bookingState.upholsteryCleaning.enabled) {
            // Sofa prices
            if (bookingState.upholsteryCleaning.sofa.large > 0) {
                breakdown.push({
                    description: `Large Sofas (${bookingState.upholsteryCleaning.sofa.large})`,
                    amount: bookingState.upholsteryCleaning.sofa.large * 120
                });
            }
            if (bookingState.upholsteryCleaning.sofa.medium > 0) {
                breakdown.push({
                    description: `Medium Sofas (${bookingState.upholsteryCleaning.sofa.medium})`,
                    amount: bookingState.upholsteryCleaning.sofa.medium * 90
                });
            }
            if (bookingState.upholsteryCleaning.sofa.small > 0) {
                breakdown.push({
                    description: `Small Sofas (${bookingState.upholsteryCleaning.sofa.small})`,
                    amount: bookingState.upholsteryCleaning.sofa.small * 70
                });
            }

            // Chair prices
            if (bookingState.upholsteryCleaning.chair.recliner > 0) {
                breakdown.push({
                    description: `Recliner Chairs (${bookingState.upholsteryCleaning.chair.recliner})`,
                    amount: bookingState.upholsteryCleaning.chair.recliner * 60
                });
            }
            if (bookingState.upholsteryCleaning.chair.dayChair > 0) {
                breakdown.push({
                    description: `Day Chairs (${bookingState.upholsteryCleaning.chair.dayChair})`,
                    amount: bookingState.upholsteryCleaning.chair.dayChair * 45
                });
            }
            if (bookingState.upholsteryCleaning.chair.armChair > 0) {
                breakdown.push({
                    description: `Arm Chairs (${bookingState.upholsteryCleaning.chair.armChair})`,
                    amount: bookingState.upholsteryCleaning.chair.armChair * 35
                });
            }
            if (bookingState.upholsteryCleaning.chair.ottoman > 0) {
                breakdown.push({
                    description: `Ottoman/Stools (${bookingState.upholsteryCleaning.chair.ottoman})`,
                    amount: bookingState.upholsteryCleaning.chair.ottoman * 25
                });
            }

            // Mattress prices
            if (bookingState.upholsteryCleaning.mattress.large > 0) {
                breakdown.push({
                    description: `Large Mattresses (${bookingState.upholsteryCleaning.mattress.large})`,
                    amount: bookingState.upholsteryCleaning.mattress.large * 80
                });
            }
            if (bookingState.upholsteryCleaning.mattress.medium > 0) {
                breakdown.push({
                    description: `Medium Mattresses (${bookingState.upholsteryCleaning.mattress.medium})`,
                    amount: bookingState.upholsteryCleaning.mattress.medium * 60
                });
            }
            if (bookingState.upholsteryCleaning.mattress.small > 0) {
                breakdown.push({
                    description: `Small Mattresses (${bookingState.upholsteryCleaning.mattress.small})`,
                    amount: bookingState.upholsteryCleaning.mattress.small * 40
                });
            }
        }

        return breakdown;
    }, [bookingState]);

    const handleBookingSubmit = async () => {
        setBookingState(prev => ({ ...prev, isSubmitting: true }))

        try {
            // Create the details object from state
            const details: CarpetCleaningDetails = {
                carpetCleaning: bookingState.carpetCleaning,
                rugCleaning: bookingState.rugCleaning,
                upholsteryCleaning: bookingState.upholsteryCleaning,
                additionalNotes: bookingState.additionalNotes,
                totalPrice: calculateTotalPrice(),
                priceBreakdown: calculatePriceBreakdown()
            }

            // Save to Zustand store
            setCarpetCleaningDetails(details)

            // Backup to localStorage
            localStorage.setItem('carpetCleaningDetails', JSON.stringify(details))

            // Navigate to details page
            router.push('/quick-book/details')
        } catch (error) {
            console.error('Error:', error);
            setSubmitError(error instanceof Error ? error.message : 'Failed to save booking details');
            setBookingState(prev => ({
                ...prev,
                isSubmitting: false,
            }));
        }
    }

    // Update this useEffect to store price in real-time
    useEffect(() => {
        const details: CarpetCleaningDetails = {
            carpetCleaning: bookingState.carpetCleaning,
            rugCleaning: bookingState.rugCleaning,
            upholsteryCleaning: bookingState.upholsteryCleaning,
            additionalNotes: bookingState.additionalNotes,
            totalPrice: calculateTotalPrice(),
            priceBreakdown: calculatePriceBreakdown()
        };
        
        
        // Optional: Update service data for other components
        updateServiceData(details);
    }, [bookingState, calculateTotalPrice, calculatePriceBreakdown]);

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
                            onClick={() => setBookingState(prev => ({
                                ...prev,
                                carpetCleaning: {
                                    ...prev.carpetCleaning,
                                    enabled: !prev.carpetCleaning.enabled
                                }
                            }))}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                ${bookingState.carpetCleaning.enabled ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                    ${bookingState.carpetCleaning.enabled ? 'translate-x-6' : 'translate-x-1'}`}
                            />
                        </button>
                    </div>

                    {/* Carpet Cleaning Options */}
                    {bookingState.carpetCleaning.enabled && (
                        <div className="space-y-4 pl-4">
                            {/* Bedrooms */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-gray-900">Bedrooms</div>
                                    <div className="text-sm text-gray-600">$35 per room</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setBookingState(prev => ({
                                            ...prev,
                                            carpetCleaning: {
                                                ...prev.carpetCleaning,
                                                bedrooms: Math.max(0, prev.carpetCleaning.bedrooms - 1)
                                            }
                                        }))}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                            text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center font-medium">
                                        {bookingState.carpetCleaning.bedrooms}
                                    </span>
                                    <button
                                        onClick={() => setBookingState(prev => ({
                                            ...prev,
                                            carpetCleaning: {
                                                ...prev.carpetCleaning,
                                                bedrooms: prev.carpetCleaning.bedrooms + 1
                                            }
                                        }))}
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
                                        onClick={() => setBookingState(prev => ({
                                            ...prev,
                                            carpetCleaning: {
                                                ...prev.carpetCleaning,
                                                livingRooms: Math.max(0, prev.carpetCleaning.livingRooms - 1)
                                            }
                                        }))}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                            text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center font-medium">
                                        {bookingState.carpetCleaning.livingRooms}
                                    </span>
                                    <button
                                        onClick={() => setBookingState(prev => ({
                                            ...prev,
                                            carpetCleaning: {
                                                ...prev.carpetCleaning,
                                                livingRooms: prev.carpetCleaning.livingRooms + 1
                                            }
                                        }))}
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
                                        onClick={() => setBookingState(prev => ({
                                            ...prev,
                                            carpetCleaning: {
                                                ...prev.carpetCleaning,
                                                studyRooms: Math.max(0, prev.carpetCleaning.studyRooms - 1)
                                            }
                                        }))}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                            text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center font-medium">
                                        {bookingState.carpetCleaning.studyRooms}
                                    </span>
                                    <button
                                        onClick={() => setBookingState(prev => ({
                                            ...prev,
                                            carpetCleaning: {
                                                ...prev.carpetCleaning,
                                                studyRooms: prev.carpetCleaning.studyRooms + 1
                                            }
                                        }))}
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
                                        onClick={() => setBookingState(prev => ({
                                            ...prev,
                                            carpetCleaning: {
                                                ...prev.carpetCleaning,
                                                hallways: Math.max(0, prev.carpetCleaning.hallways - 1)
                                            }
                                        }))}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                            text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center font-medium">
                                        {bookingState.carpetCleaning.hallways}
                                    </span>
                                    <button
                                        onClick={() => setBookingState(prev => ({
                                            ...prev,
                                            carpetCleaning: {
                                                ...prev.carpetCleaning,
                                                hallways: prev.carpetCleaning.hallways + 1
                                            }
                                        }))}
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
                                        onClick={() => setBookingState(prev => ({
                                            ...prev,
                                            carpetCleaning: {
                                                ...prev.carpetCleaning,
                                                stairs: Math.max(0, prev.carpetCleaning.stairs - 1)
                                            }
                                        }))}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                            text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center font-medium">
                                        {bookingState.carpetCleaning.stairs}
                                    </span>
                                    <button
                                        onClick={() => setBookingState(prev => ({
                                            ...prev,
                                            carpetCleaning: {
                                                ...prev.carpetCleaning,
                                                stairs: prev.carpetCleaning.stairs + 1
                                            }
                                        }))}
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
                                        onClick={() => setBookingState(prev => ({
                                            ...prev,
                                            carpetCleaning: {
                                                ...prev.carpetCleaning,
                                                customRooms: {
                                                    ...prev.carpetCleaning.customRooms,
                                                    enabled: !prev.carpetCleaning.customRooms.enabled
                                                }
                                            }
                                        }))}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                            ${bookingState.carpetCleaning.customRooms.enabled ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                                ${bookingState.carpetCleaning.customRooms.enabled ? 'translate-x-6' : 'translate-x-1'}`}
                                        />
                                    </button>
                                </div>

                                {bookingState.carpetCleaning.customRooms.enabled && (
                                    <div className="space-y-3">
                                        {bookingState.carpetCleaning.customRooms.rooms.map((room, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <input
                                                    type="text"
                                                    value={room.name}
                                                    onChange={(e) => {
                                                        const newRooms = [...bookingState.carpetCleaning.customRooms.rooms];
                                                        newRooms[index].name = e.target.value;
                                                        setBookingState(prev => ({
                                                            ...prev,
                                                            carpetCleaning: {
                                                                ...prev.carpetCleaning,
                                                                customRooms: {
                                                                    ...prev.carpetCleaning.customRooms,
                                                                    rooms: newRooms
                                                                }
                                                            }
                                                        }));
                                                    }}
                                                    placeholder="Room name"
                                                    className="flex-1 p-2 border border-gray-200 rounded-lg
                                                        focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                                />
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => {
                                                            const newRooms = [...bookingState.carpetCleaning.customRooms.rooms];
                                                            newRooms[index].count = Math.max(0, newRooms[index].count - 1);
                                                            if (newRooms[index].count === 0) {
                                                                newRooms.splice(index, 1);
                                                            }
                                                            setBookingState(prev => ({
                                                                ...prev,
                                                                carpetCleaning: {
                                                                    ...prev.carpetCleaning,
                                                                    customRooms: {
                                                                        ...prev.carpetCleaning.customRooms,
                                                                        rooms: newRooms
                                                                    }
                                                                }
                                                            }));
                                                        }}
                                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                            text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-8 text-center font-medium">{room.count}</span>
                                                    <button
                                                        onClick={() => {
                                                            const newRooms = [...bookingState.carpetCleaning.customRooms.rooms];
                                                            newRooms[index].count += 1;
                                                            setBookingState(prev => ({
                                                                ...prev,
                                                                carpetCleaning: {
                                                                    ...prev.carpetCleaning,
                                                                    customRooms: {
                                                                        ...prev.carpetCleaning.customRooms,
                                                                        rooms: newRooms
                                                                    }
                                                                }
                                                            }));
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
                                                setBookingState(prev => ({
                                                    ...prev,
                                                    carpetCleaning: {
                                                        ...prev.carpetCleaning,
                                                        customRooms: {
                                                            ...prev.carpetCleaning.customRooms,
                                                            rooms: [
                                                                ...prev.carpetCleaning.customRooms.rooms,
                                                                { name: '', count: 1 }
                                                            ]
                                                        }
                                                    }
                                                }));
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
                            onClick={() => setBookingState(prev => ({
                                ...prev,
                                rugCleaning: {
                                    ...prev.rugCleaning,
                                    enabled: !prev.rugCleaning.enabled
                                }
                            }))}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                ${bookingState.rugCleaning.enabled ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                    ${bookingState.rugCleaning.enabled ? 'translate-x-6' : 'translate-x-1'}`}
                            />
                        </button>
                    </div>

                    {/* Rug Cleaning Options */}
                    {bookingState.rugCleaning.enabled && (
                        <div className="space-y-4 pl-4">
                            {/* Large Rugs */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-gray-900">Large Rugs</div>
                                    <div className="text-sm text-gray-600">$50 per rug (3×4m or larger)</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setBookingState(prev => ({
                                            ...prev,
                                            rugCleaning: {
                                                ...prev.rugCleaning,
                                                large: Math.max(0, prev.rugCleaning.large - 1)
                                            }
                                        }))}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                            text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center font-medium">
                                        {bookingState.rugCleaning.large}
                                    </span>
                                    <button
                                        onClick={() => setBookingState(prev => ({
                                            ...prev,
                                            rugCleaning: {
                                                ...prev.rugCleaning,
                                                large: prev.rugCleaning.large + 1
                                            }
                                        }))}
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
                                        onClick={() => setBookingState(prev => ({
                                            ...prev,
                                            rugCleaning: {
                                                ...prev.rugCleaning,
                                                medium: Math.max(0, prev.rugCleaning.medium - 1)
                                            }
                                        }))}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                            text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center font-medium">
                                        {bookingState.rugCleaning.medium}
                                    </span>
                                    <button
                                        onClick={() => setBookingState(prev => ({
                                            ...prev,
                                            rugCleaning: {
                                                ...prev.rugCleaning,
                                                medium: prev.rugCleaning.medium + 1
                                            }
                                        }))}
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
                                        onClick={() => setBookingState(prev => ({
                                            ...prev,
                                            rugCleaning: {
                                                ...prev.rugCleaning,
                                                small: Math.max(0, prev.rugCleaning.small - 1)
                                            }
                                        }))}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                            text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center font-medium">
                                        {bookingState.rugCleaning.small}
                                    </span>
                                    <button
                                        onClick={() => setBookingState(prev => ({
                                            ...prev,
                                            rugCleaning: {
                                                ...prev.rugCleaning,
                                                small: prev.rugCleaning.small + 1
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

                {/* 3. Upholstery Cleaning Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h5 className="font-medium text-gray-900">Upholstery Cleaning</h5>
                            <p className="text-sm text-gray-600">Professional upholstery cleaning service</p>
                        </div>
                        <button
                            onClick={() => setBookingState(prev => ({
                                ...prev,
                                upholsteryCleaning: {
                                    ...prev.upholsteryCleaning,
                                    enabled: !prev.upholsteryCleaning.enabled
                                }
                            }))}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                ${bookingState.upholsteryCleaning.enabled ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                    ${bookingState.upholsteryCleaning.enabled ? 'translate-x-6' : 'translate-x-1'}`}
                            />
                        </button>
                    </div>

                    {/* Upholstery Cleaning Options */}
                    {bookingState.upholsteryCleaning.enabled && (
                        <div className="space-y-6 pl-4">
                            {/* Sofa/Couch Section */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h6 className="font-medium text-gray-900">Sofa/Couch</h6>
                                        <p className="text-sm text-gray-600">Clean and sanitize your sofas</p>
                                    </div>
                                    <button
                                        onClick={() => setBookingState(prev => ({
                                            ...prev,
                                            upholsteryCleaning: {
                                                ...prev.upholsteryCleaning,
                                                sofa: {
                                                    ...prev.upholsteryCleaning.sofa,
                                                    enabled: !prev.upholsteryCleaning.sofa.enabled
                                                }
                                            }
                                        }))}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                            ${bookingState.upholsteryCleaning.sofa.enabled ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                                ${bookingState.upholsteryCleaning.sofa.enabled ? 'translate-x-6' : 'translate-x-1'}`}
                                        />
                                    </button>
                                </div>

                                {bookingState.upholsteryCleaning.sofa.enabled && (
                                    <div className="space-y-4 pl-4">
                                        {/* Large Sofa */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-medium text-gray-900">Large Sofa</div>
                                                <div className="text-sm text-gray-600">$120 (4+ seater)</div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => setBookingState(prev => ({
                                                        ...prev,
                                                        upholsteryCleaning: {
                                                            ...prev.upholsteryCleaning,
                                                            sofa: {
                                                                ...prev.upholsteryCleaning.sofa,
                                                                large: Math.max(0, prev.upholsteryCleaning.sofa.large - 1)
                                                            }
                                                        }
                                                    }))}
                                                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                        text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                                >
                                                    -
                                                </button>
                                                <span className="w-8 text-center font-medium">
                                                    {bookingState.upholsteryCleaning.sofa.large}
                                                </span>
                                                <button
                                                    onClick={() => setBookingState(prev => ({
                                                        ...prev,
                                                        upholsteryCleaning: {
                                                            ...prev.upholsteryCleaning,
                                                            sofa: {
                                                                ...prev.upholsteryCleaning.sofa,
                                                                large: prev.upholsteryCleaning.sofa.large + 1
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
                                                <div className="text-sm text-gray-600">$90 (3 seater)</div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => setBookingState(prev => ({
                                                        ...prev,
                                                        upholsteryCleaning: {
                                                            ...prev.upholsteryCleaning,
                                                            sofa: {
                                                                ...prev.upholsteryCleaning.sofa,
                                                                medium: Math.max(0, prev.upholsteryCleaning.sofa.medium - 1)
                                                            }
                                                        }
                                                    }))}
                                                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                        text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                                >
                                                    -
                                                </button>
                                                <span className="w-8 text-center font-medium">
                                                    {bookingState.upholsteryCleaning.sofa.medium}
                                                </span>
                                                <button
                                                    onClick={() => setBookingState(prev => ({
                                                        ...prev,
                                                        upholsteryCleaning: {
                                                            ...prev.upholsteryCleaning,
                                                            sofa: {
                                                                ...prev.upholsteryCleaning.sofa,
                                                                medium: prev.upholsteryCleaning.sofa.medium + 1
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
                                                <div className="text-sm text-gray-600">$70 (2 seater)</div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => setBookingState(prev => ({
                                                        ...prev,
                                                        upholsteryCleaning: {
                                                            ...prev.upholsteryCleaning,
                                                            sofa: {
                                                                ...prev.upholsteryCleaning.sofa,
                                                                small: Math.max(0, prev.upholsteryCleaning.sofa.small - 1)
                                                            }
                                                        }
                                                    }))}
                                                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                        text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                                >
                                                    -
                                                </button>
                                                <span className="w-8 text-center font-medium">
                                                    {bookingState.upholsteryCleaning.sofa.small}
                                                </span>
                                                <button
                                                    onClick={() => setBookingState(prev => ({
                                                        ...prev,
                                                        upholsteryCleaning: {
                                                            ...prev.upholsteryCleaning,
                                                            sofa: {
                                                                ...prev.upholsteryCleaning.sofa,
                                                                small: prev.upholsteryCleaning.sofa.small + 1
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
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h6 className="font-medium text-gray-900">Chairs</h6>
                                        <p className="text-sm text-gray-600">Clean and sanitize your chairs</p>
                                    </div>
                                    <button
                                        onClick={() => setBookingState(prev => ({
                                            ...prev,
                                            upholsteryCleaning: {
                                                ...prev.upholsteryCleaning,
                                                chair: {
                                                    ...prev.upholsteryCleaning.chair,
                                                    enabled: !prev.upholsteryCleaning.chair.enabled
                                                }
                                            }
                                        }))}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                            ${bookingState.upholsteryCleaning.chair.enabled ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                                ${bookingState.upholsteryCleaning.chair.enabled ? 'translate-x-6' : 'translate-x-1'}`}
                                        />
                                    </button>
                                </div>

                                {bookingState.upholsteryCleaning.chair.enabled && (
                                    <div className="space-y-4 pl-4">
                                        {/* Recliner Chair */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-medium text-gray-900">Recliner Chair</div>
                                                <div className="text-sm text-gray-600">$60 per chair</div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => setBookingState(prev => ({
                                                        ...prev,
                                                        upholsteryCleaning: {
                                                            ...prev.upholsteryCleaning,
                                                            chair: {
                                                                ...prev.upholsteryCleaning.chair,
                                                                recliner: Math.max(0, prev.upholsteryCleaning.chair.recliner - 1)
                                                            }
                                                        }
                                                    }))}
                                                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                        text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                                >
                                                    -
                                                </button>
                                                <span className="w-8 text-center font-medium">
                                                    {bookingState.upholsteryCleaning.chair.recliner}
                                                </span>
                                                <button
                                                    onClick={() => setBookingState(prev => ({
                                                        ...prev,
                                                        upholsteryCleaning: {
                                                            ...prev.upholsteryCleaning,
                                                            chair: {
                                                                ...prev.upholsteryCleaning.chair,
                                                                recliner: prev.upholsteryCleaning.chair.recliner + 1
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
                                                <div className="text-sm text-gray-600">$45 per chair</div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => setBookingState(prev => ({
                                                        ...prev,
                                                        upholsteryCleaning: {
                                                            ...prev.upholsteryCleaning,
                                                            chair: {
                                                                ...prev.upholsteryCleaning.chair,
                                                                dayChair: Math.max(0, prev.upholsteryCleaning.chair.dayChair - 1)
                                                            }
                                                        }
                                                    }))}
                                                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                        text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                                >
                                                    -
                                                </button>
                                                <span className="w-8 text-center font-medium">
                                                    {bookingState.upholsteryCleaning.chair.dayChair}
                                                </span>
                                                <button
                                                    onClick={() => setBookingState(prev => ({
                                                        ...prev,
                                                        upholsteryCleaning: {
                                                            ...prev.upholsteryCleaning,
                                                            chair: {
                                                                ...prev.upholsteryCleaning.chair,
                                                                dayChair: prev.upholsteryCleaning.chair.dayChair + 1
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
                                                <div className="text-sm text-gray-600">$35 per chair</div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => setBookingState(prev => ({
                                                        ...prev,
                                                        upholsteryCleaning: {
                                                            ...prev.upholsteryCleaning,
                                                            chair: {
                                                                ...prev.upholsteryCleaning.chair,
                                                                armChair: Math.max(0, prev.upholsteryCleaning.chair.armChair - 1)
                                                            }
                                                        }
                                                    }))}
                                                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                        text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                                >
                                                    -
                                                </button>
                                                <span className="w-8 text-center font-medium">
                                                    {bookingState.upholsteryCleaning.chair.armChair}
                                                </span>
                                                <button
                                                    onClick={() => setBookingState(prev => ({
                                                        ...prev,
                                                        upholsteryCleaning: {
                                                            ...prev.upholsteryCleaning,
                                                            chair: {
                                                                ...prev.upholsteryCleaning.chair,
                                                                armChair: prev.upholsteryCleaning.chair.armChair + 1
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

                                        {/* Ottoman/Fabric Stool */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-medium text-gray-900">Ottoman/Fabric Stool</div>
                                                <div className="text-sm text-gray-600">$25 per piece</div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => setBookingState(prev => ({
                                                        ...prev,
                                                        upholsteryCleaning: {
                                                            ...prev.upholsteryCleaning,
                                                            chair: {
                                                                ...prev.upholsteryCleaning.chair,
                                                                ottoman: Math.max(0, prev.upholsteryCleaning.chair.ottoman - 1)
                                                            }
                                                        }
                                                    }))}
                                                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                        text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                                >
                                                    -
                                                </button>
                                                <span className="w-8 text-center font-medium">
                                                    {bookingState.upholsteryCleaning.chair.ottoman}
                                                </span>
                                                <button
                                                    onClick={() => setBookingState(prev => ({
                                                        ...prev,
                                                        upholsteryCleaning: {
                                                            ...prev.upholsteryCleaning,
                                                            chair: {
                                                                ...prev.upholsteryCleaning.chair,
                                                                ottoman: prev.upholsteryCleaning.chair.ottoman + 1
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
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h6 className="font-medium text-gray-900">Mattress</h6>
                                        <p className="text-sm text-gray-600">Clean and sanitize your mattresses</p>
                                    </div>
                                    <button
                                        onClick={() => setBookingState(prev => ({
                                            ...prev,
                                            upholsteryCleaning: {
                                                ...prev.upholsteryCleaning,
                                                mattress: {
                                                    ...prev.upholsteryCleaning.mattress,
                                                    enabled: !prev.upholsteryCleaning.mattress.enabled
                                                }
                                            }
                                        }))}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                            ${bookingState.upholsteryCleaning.mattress.enabled ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                                ${bookingState.upholsteryCleaning.mattress.enabled ? 'translate-x-6' : 'translate-x-1'}`}
                                        />
                                    </button>
                                </div>

                                {bookingState.upholsteryCleaning.mattress.enabled && (
                                    <div className="space-y-4 pl-4">
                                        {/* Large Mattress */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-medium text-gray-900">Large Mattress</div>
                                                <div className="text-sm text-gray-600">$80 (King/Queen)</div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => setBookingState(prev => ({
                                                        ...prev,
                                                        upholsteryCleaning: {
                                                            ...prev.upholsteryCleaning,
                                                            mattress: {
                                                                ...prev.upholsteryCleaning.mattress,
                                                                large: Math.max(0, prev.upholsteryCleaning.mattress.large - 1)
                                                            }
                                                        }
                                                    }))}
                                                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                        text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                                >
                                                    -
                                                </button>
                                                <span className="w-8 text-center font-medium">
                                                    {bookingState.upholsteryCleaning.mattress.large}
                                                </span>
                                                <button
                                                    onClick={() => setBookingState(prev => ({
                                                        ...prev,
                                                        upholsteryCleaning: {
                                                            ...prev.upholsteryCleaning,
                                                            mattress: {
                                                                ...prev.upholsteryCleaning.mattress,
                                                                large: prev.upholsteryCleaning.mattress.large + 1
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
                                                <div className="text-sm text-gray-600">$60 (Double)</div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => setBookingState(prev => ({
                                                        ...prev,
                                                        upholsteryCleaning: {
                                                            ...prev.upholsteryCleaning,
                                                            mattress: {
                                                                ...prev.upholsteryCleaning.mattress,
                                                                medium: Math.max(0, prev.upholsteryCleaning.mattress.medium - 1)
                                                            }
                                                        }
                                                    }))}
                                                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                        text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                                >
                                                    -
                                                </button>
                                                <span className="w-8 text-center font-medium">
                                                    {bookingState.upholsteryCleaning.mattress.medium}
                                                </span>
                                                <button
                                                    onClick={() => setBookingState(prev => ({
                                                        ...prev,
                                                        upholsteryCleaning: {
                                                            ...prev.upholsteryCleaning,
                                                            mattress: {
                                                                ...prev.upholsteryCleaning.mattress,
                                                                medium: prev.upholsteryCleaning.mattress.medium + 1
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
                                                    onClick={() => setBookingState(prev => ({
                                                        ...prev,
                                                        upholsteryCleaning: {
                                                            ...prev.upholsteryCleaning,
                                                            mattress: {
                                                                ...prev.upholsteryCleaning.mattress,
                                                                small: Math.max(0, prev.upholsteryCleaning.mattress.small - 1)
                                                            }
                                                        }
                                                    }))}
                                                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                                                        text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                                >
                                                    -
                                                </button>
                                                <span className="w-8 text-center font-medium">
                                                    {bookingState.upholsteryCleaning.mattress.small}
                                                </span>
                                                <button
                                                    onClick={() => setBookingState(prev => ({
                                                        ...prev,
                                                        upholsteryCleaning: {
                                                            ...prev.upholsteryCleaning,
                                                            mattress: {
                                                                ...prev.upholsteryCleaning.mattress,
                                                                small: prev.upholsteryCleaning.mattress.small + 1
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
                    )}
                </div>
            </div>

            {/* Your Price Section */}
            {(bookingState.carpetCleaning.enabled || 
                bookingState.rugCleaning.enabled || 
                bookingState.upholsteryCleaning.enabled) && (
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-4">Your Price</h4>
                        <div className="bg-[#F8FAFC] rounded-lg p-4">
                            {/* Carpet Cleaning Breakdown */}
                            {bookingState.carpetCleaning.enabled && (
                                <div className="space-y-2">
                                    <div className="font-medium text-gray-900 mb-2">Carpet Cleaning</div>
                                    {bookingState.carpetCleaning.bedrooms > 0 && (
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="text-gray-600">Bedrooms ({bookingState.carpetCleaning.bedrooms})</div>
                                            <div className="text-gray-900">${bookingState.carpetCleaning.bedrooms * 35}</div>
                                        </div>
                                    )}
                                    {bookingState.carpetCleaning.livingRooms > 0 && (
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="text-gray-600">Living Rooms ({bookingState.carpetCleaning.livingRooms})</div>
                                            <div className="text-gray-900">${bookingState.carpetCleaning.livingRooms * 35}</div>
                                        </div>
                                    )}
                                    {bookingState.carpetCleaning.studyRooms > 0 && (
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="text-gray-600">Study Rooms ({bookingState.carpetCleaning.studyRooms})</div>
                                            <div className="text-gray-900">${bookingState.carpetCleaning.studyRooms * 30}</div>
                                        </div>
                                    )}
                                    {bookingState.carpetCleaning.hallways > 0 && (
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="text-gray-600">Hallways ({bookingState.carpetCleaning.hallways})</div>
                                            <div className="text-gray-900">${bookingState.carpetCleaning.hallways * 25}</div>
                                        </div>
                                    )}
                                    {bookingState.carpetCleaning.stairs > 0 && (
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="text-gray-600">Stairs ({bookingState.carpetCleaning.stairs})</div>
                                            <div className="text-gray-900">${bookingState.carpetCleaning.stairs * 50}</div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Rug Cleaning Breakdown */}
                            {bookingState.rugCleaning.enabled && (
                                <div className="space-y-2 mt-4 pt-4 border-t border-gray-200">
                                    <div className="font-medium text-gray-900 mb-2">Rug Cleaning</div>
                                    {bookingState.rugCleaning.large > 0 && (
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="text-gray-600">Large Rugs ({bookingState.rugCleaning.large})</div>
                                            <div className="text-gray-900">${bookingState.rugCleaning.large * 50}</div>
                                        </div>
                                    )}
                                    {bookingState.rugCleaning.medium > 0 && (
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="text-gray-600">Medium Rugs ({bookingState.rugCleaning.medium})</div>
                                            <div className="text-gray-900">${bookingState.rugCleaning.medium * 40}</div>
                                        </div>
                                    )}
                                    {bookingState.rugCleaning.small > 0 && (
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="text-gray-600">Small Rugs ({bookingState.rugCleaning.small})</div>
                                            <div className="text-gray-900">${bookingState.rugCleaning.small * 35}</div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Upholstery Cleaning Breakdown */}
                            {bookingState.upholsteryCleaning.enabled && (
                                <div className="space-y-2 mt-4 pt-4 border-t border-gray-200">
                                    <div className="font-medium text-gray-900 mb-2">Upholstery Cleaning</div>
                                    {/* Sofa Section */}
                                    {bookingState.upholsteryCleaning.sofa.enabled && (
                                        <>
                                            {bookingState.upholsteryCleaning.sofa.large > 0 && (
                                                <div className="flex justify-between items-center text-sm">
                                                    <div className="text-gray-600">Large Sofas ({bookingState.upholsteryCleaning.sofa.large})</div>
                                                    <div className="text-gray-900">${bookingState.upholsteryCleaning.sofa.large * 120}</div>
                                                </div>
                                            )}
                                            {bookingState.upholsteryCleaning.sofa.medium > 0 && (
                                                <div className="flex justify-between items-center text-sm">
                                                    <div className="text-gray-600">Medium Sofas ({bookingState.upholsteryCleaning.sofa.medium})</div>
                                                    <div className="text-gray-900">${bookingState.upholsteryCleaning.sofa.medium * 90}</div>
                                                </div>
                                            )}
                                            {bookingState.upholsteryCleaning.sofa.small > 0 && (
                                                <div className="flex justify-between items-center text-sm">
                                                    <div className="text-gray-600">Small Sofas ({bookingState.upholsteryCleaning.sofa.small})</div>
                                                    <div className="text-gray-900">${bookingState.upholsteryCleaning.sofa.small * 70}</div>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {/* Chair Section */}
                                    {bookingState.upholsteryCleaning.chair.enabled && (
                                        <>
                                            {bookingState.upholsteryCleaning.chair.recliner > 0 && (
                                                <div className="flex justify-between items-center text-sm">
                                                    <div className="text-gray-600">Recliner Chairs ({bookingState.upholsteryCleaning.chair.recliner})</div>
                                                    <div className="text-gray-900">${bookingState.upholsteryCleaning.chair.recliner * 60}</div>
                                                </div>
                                            )}
                                            {bookingState.upholsteryCleaning.chair.dayChair > 0 && (
                                                <div className="flex justify-between items-center text-sm">
                                                    <div className="text-gray-600">Day Chairs ({bookingState.upholsteryCleaning.chair.dayChair})</div>
                                                    <div className="text-gray-900">${bookingState.upholsteryCleaning.chair.dayChair * 45}</div>
                                                </div>
                                            )}
                                            {bookingState.upholsteryCleaning.chair.armChair > 0 && (
                                                <div className="flex justify-between items-center text-sm">
                                                    <div className="text-gray-600">Arm Chairs ({bookingState.upholsteryCleaning.chair.armChair})</div>
                                                    <div className="text-gray-900">${bookingState.upholsteryCleaning.chair.armChair * 35}</div>
                                                </div>
                                            )}
                                            {bookingState.upholsteryCleaning.chair.ottoman > 0 && (
                                                <div className="flex justify-between items-center text-sm">
                                                    <div className="text-gray-600">Ottoman/Stools ({bookingState.upholsteryCleaning.chair.ottoman})</div>
                                                    <div className="text-gray-900">${bookingState.upholsteryCleaning.chair.ottoman * 25}</div>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {/* Mattress Section */}
                                    {bookingState.upholsteryCleaning.mattress.enabled && (
                                        <>
                                            {bookingState.upholsteryCleaning.mattress.large > 0 && (
                                                <div className="flex justify-between items-center text-sm">
                                                    <div className="text-gray-600">Large Mattresses ({bookingState.upholsteryCleaning.mattress.large})</div>
                                                    <div className="text-gray-900">${bookingState.upholsteryCleaning.mattress.large * 80}</div>
                                                </div>
                                            )}
                                            {bookingState.upholsteryCleaning.mattress.medium > 0 && (
                                                <div className="flex justify-between items-center text-sm">
                                                    <div className="text-gray-600">Medium Mattresses ({bookingState.upholsteryCleaning.mattress.medium})</div>
                                                    <div className="text-gray-900">${bookingState.upholsteryCleaning.mattress.medium * 60}</div>
                                                </div>
                                            )}
                                            {bookingState.upholsteryCleaning.mattress.small > 0 && (
                                                <div className="flex justify-between items-center text-sm">
                                                    <div className="text-gray-600">Small Mattresses ({bookingState.upholsteryCleaning.mattress.small})</div>
                                                    <div className="text-gray-900">${bookingState.upholsteryCleaning.mattress.small * 40}</div>
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

            {/* Error Message Display */}
            {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-red-600">
                        <AlertCircle className="w-5 h-5" />
                        <p>{submitError}</p>
                    </div>
                </div>
            )}

            {/* Next Step Button */}
            {(bookingState.carpetCleaning.enabled || 
                bookingState.rugCleaning.enabled || 
                bookingState.upholsteryCleaning.enabled) && (
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <button
                            onClick={handleBookingSubmit}
                            disabled={bookingState.isSubmitting}
                            className={`w-full py-4 px-6 rounded-lg font-medium
                                ${bookingState.isSubmitting 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-[#1E3D8F] hover:bg-[#1E3D8F]/90'
                                } text-white transition-colors`}
                        >
                            <div className="flex items-center justify-center gap-2">
                                {bookingState.isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Processing...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Next Step</span>
                                        
                                    </>
                                )}
                            </div>
                        </button>
                    </div>
                )}
        </div>
    )
} 