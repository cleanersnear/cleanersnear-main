'use client'

import { Check, Info, Phone } from 'lucide-react';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { useBookingStore } from '../../../store/bookingStore'

import type { 
    EndOfLeaseState,
    EndOfLeaseDetails,
    HomeSizeType,
    TenancyDurationType,
    PriceBreakdownItem
} from '../../../types'
import { updateServiceStorage } from '@/app/quick-book/utils/serviceStorage'

const endOfLeaseFeatures = {
    extras: [
        { name: 'Balcony/Patio Clean', price: 25 },
        { name: 'Garage Clean', price: 30 }
    ],
    pricing: {
        studio: 180,
        oneBed: 230,
        twoBed: 285,
        threeBed: 350,
        fourBed: 500
    }
};

export default function EndOfLeaseClean() {
    const router = useRouter();
    const setEndOfLeaseDetails = useBookingStore(state => state.setEndOfLeaseDetails);
    
    const [selectedSize, setSelectedSize] = useState<HomeSizeType>('1bed');
    const [showLargeHomeDialog, setShowLargeHomeDialog] = useState(false);
    
    // Update initial state to use our new interface
    const [bookingState, setBookingState] = useState<EndOfLeaseState>({
        propertyDetails: {
            size: '1bed',
            bathrooms: '1',
            toilets: '1',
            propertyType: 'single',
            isFurnished: false,
            hasStudyRoom: false
        },
        kitchenCondition: {
            rating: 5,
            cleaningLevel: 'light'
        },
        carpetCleaning: {
            required: false,
            areas: {
                bedrooms: 0,
                loungeRooms: 0,
                hallway: false,
                stairs: false
            }
        },
        parking: {
            type: 'none'
        },
        additionalInformation: {
            userType: 'tenant',
            tenancyDuration: 'less-than-6-months',
            hasPets: false,
            additionalNotes: ''
        },
        extras: [],
        totalPrice: 0,
        priceBreakdown: [],
        isSubmitting: false
    });

    const homeTypes = useMemo(() => [
        { id: 'studio', label: 'Studio' },
        { id: '1bed', label: '1 Bedroom' },
        { id: '2bed', label: '2 Bedrooms' },
        { id: '3bed', label: '3 Bedrooms' },
        { id: '4bed', label: '4 Bedrooms' },
        { id: '5plus', label: '5+ Bedrooms' }
    ], []);

    const handleSizeSelect = (sizeId: string) => {
        if (sizeId === '5plus') {
            setShowLargeHomeDialog(true);
        } else {
            setSelectedSize(sizeId as HomeSizeType);
        }
    };

    const bathroomOptions = ['1', '2', '3', '4', '5'];

    const calculateCarpetCleaningCost = useCallback((): number => {
        if (!bookingState.carpetCleaning.required) return 0;

        let carpetCost = 0;
        carpetCost += bookingState.carpetCleaning.areas.bedrooms * 30;    // $30 per bedroom
        carpetCost += bookingState.carpetCleaning.areas.loungeRooms * 30; // $30 per lounge
        carpetCost += bookingState.carpetCleaning.areas.hallway ? 15 : 0; // $15 for hallway
        carpetCost += bookingState.carpetCleaning.areas.stairs ? 40 : 0;  // $40 for stairs

        return carpetCost;
    }, [bookingState.carpetCleaning.required, bookingState.carpetCleaning.areas]);

    const calculateTotalPrice = useCallback((): number => {
        try {
            if (selectedSize === '5plus') return 0;

            let basePrice = endOfLeaseFeatures.pricing[
                selectedSize === 'studio' ? 'studio' : 
                selectedSize === '1bed' ? 'oneBed' : 
                selectedSize === '2bed' ? 'twoBed' : 
                selectedSize === '3bed' ? 'threeBed' : 'fourBed'
            ];

            if (!basePrice || basePrice <= 0) {
                throw new Error('Invalid base price');
            }

            // Add bathroom cost (only for additional bathrooms beyond 1)
            const extraBathrooms = Math.max(0, parseInt(bookingState.propertyDetails.bathrooms) - 1);
            if (extraBathrooms > 0) {
                basePrice += extraBathrooms * 15; // Updated to $15 per extra bathroom
            }
            
            // Add toilet cost (only for additional toilets beyond 2)
            const extraToilets = Math.max(0, parseInt(bookingState.propertyDetails.toilets) - 2);
            if (extraToilets > 0) {
                basePrice += extraToilets * 5;
            }

            // Add double story cost only if carpet cleaning is selected
            if (bookingState.propertyDetails.propertyType === 'double' && bookingState.carpetCleaning.required) {
                basePrice += 15;
            }

            // Add furnished fee
            if (bookingState.propertyDetails.isFurnished) {
                basePrice += 60;
            }

            // Updated kitchen condition surcharge
            if (bookingState.kitchenCondition.rating <= 3) {
                basePrice += 55; // Heavy cleaning updated to $55
            } else if (bookingState.kitchenCondition.rating <= 5) {
                basePrice += 25; // Moderate cleaning updated to $25
            }

            // Add carpet cleaning cost
            if (bookingState.carpetCleaning.required) {
                basePrice += calculateCarpetCleaningCost();
            }

            // Add extras cost
            bookingState.extras.forEach(extraName => {
                const extra = endOfLeaseFeatures.extras.find(e => e.name === extraName);
                if (extra) {
                    basePrice += extra.price;
                }
            });

            // Add study room fee
            if (bookingState.propertyDetails.hasStudyRoom) {
                basePrice += 10;
            }

            // Add pet fee (updated to $15)
            if (bookingState.additionalInformation.hasPets) {
                basePrice += 15;
            }

            return basePrice;
        } catch (error) {
            console.error('Price calculation error:', error);
            throw new Error('Failed to calculate price');
        }
    }, [selectedSize, bookingState, calculateCarpetCleaningCost]);

    const calculatePriceBreakdown = useCallback((): PriceBreakdownItem[] => {
        const breakdown: PriceBreakdownItem[] = [];
        
        // Base price
        const basePrice = endOfLeaseFeatures.pricing[
            selectedSize === 'studio' ? 'studio' : 
            selectedSize === '1bed' ? 'oneBed' : 
            selectedSize === '2bed' ? 'twoBed' : 
            selectedSize === '3bed' ? 'threeBed' : 'fourBed'
        ];
        
        breakdown.push({
            description: `Base Price (${homeTypes.find(t => t.id === selectedSize)?.label})`,
            amount: basePrice
        });

        // Add all other components
        if (parseInt(bookingState.propertyDetails.bathrooms) > 1) {
            breakdown.push({
                description: 'Additional Bathrooms',
                amount: (parseInt(bookingState.propertyDetails.bathrooms) - 1) * 15
            });
        }

        // Add all other price components as in the UI
        // ... (add other breakdown items matching the UI display)

        return breakdown;
    }, [selectedSize, bookingState, homeTypes]);

    const handleBookingSubmit = async () => {
        if (bookingState.isSubmitting) return;
        
        try {
            setBookingState(prev => ({ ...prev, isSubmitting: true }));
            
            // Calculate final price and breakdown
            const totalPrice = calculateTotalPrice();
            const priceBreakdown = calculatePriceBreakdown();

            // Prepare the details object
            const details: EndOfLeaseDetails = {
                propertyDetails: {
                    ...bookingState.propertyDetails,
                    size: selectedSize // Make sure to use the current size
                },
                kitchenCondition: bookingState.kitchenCondition,
                carpetCleaning: bookingState.carpetCleaning,
                parking: bookingState.parking,
                additionalInformation: bookingState.additionalInformation,
                extras: bookingState.extras,
                totalPrice,
                priceBreakdown
            };

            // Save to Zustand store
            setEndOfLeaseDetails(details);

            // Save to localStorage as backup
            localStorage.setItem('endOfLeaseDetails', JSON.stringify(details));

            // Navigate to next step
            router.push('/quick-book/details');

        } catch (error) {
            setBookingState(prev => ({
                ...prev,
                isSubmitting: false,
                submitError: error instanceof Error ? error.message : 'An unexpected error occurred'
            }));
        }
    };

    // Update the tenancy duration options to match our type
    const durationOptions: { label: string; value: TenancyDurationType }[] = [
        { label: 'Less than 6 months', value: 'less-than-6-months' },
        { label: '6-12 months', value: '6-12-months' },
        { label: '1-2 years', value: '1-2-years' },
        { label: 'More than 2 years', value: 'more-than-2-years' }
    ];

    // First useEffect: Handle price calculations
    useEffect(() => {
        if (selectedSize && selectedSize !== '5plus') {
            const totalPrice = calculateTotalPrice();
            const priceBreakdown = calculatePriceBreakdown();

            // Only update if prices have changed
            if (totalPrice !== bookingState.totalPrice || 
                JSON.stringify(priceBreakdown) !== JSON.stringify(bookingState.priceBreakdown)) {
                setBookingState(prev => ({
                    ...prev,
                    totalPrice,
                    priceBreakdown
                }));
            }
        }
    }, [
        selectedSize,
        bookingState.propertyDetails,
        bookingState.kitchenCondition,
        bookingState.carpetCleaning,
        bookingState.extras,
        bookingState.priceBreakdown,
        bookingState.totalPrice,
        calculateTotalPrice,
        calculatePriceBreakdown
    ]);

    // Second useEffect: Handle localStorage backup
    useEffect(() => {
        if (selectedSize && selectedSize !== '5plus' && bookingState.totalPrice > 0) {
            const details: EndOfLeaseDetails = {
                propertyDetails: {
                    ...bookingState.propertyDetails,
                    size: selectedSize
                },
                kitchenCondition: bookingState.kitchenCondition,
                carpetCleaning: bookingState.carpetCleaning,
                parking: bookingState.parking,
                additionalInformation: bookingState.additionalInformation,
                extras: bookingState.extras,
                totalPrice: bookingState.totalPrice,
                priceBreakdown: bookingState.priceBreakdown
            };
            
            try {
                localStorage.setItem('endOfLeaseDetails', JSON.stringify(details));
            } catch (error) {
                console.error('Error saving to localStorage:', error);
            }
        }
    }, [
        selectedSize,
        bookingState.totalPrice,
        bookingState.priceBreakdown,
        bookingState.propertyDetails,
        bookingState.kitchenCondition,
        bookingState.carpetCleaning,
        bookingState.parking,
        bookingState.additionalInformation,
        bookingState.extras
    ]);

    // New useEffect for updateServiceStorage
    useEffect(() => {
        const details = {
            propertyDetails: bookingState.propertyDetails,
            kitchenCondition: bookingState.kitchenCondition,
            carpetAreas: bookingState.carpetCleaning.areas,
            parkingDetails: bookingState.parking,
            additionalInfo: bookingState.additionalInformation,
            pricing: {
                totalPrice: calculateTotalPrice(),
                priceBreakdown: calculatePriceBreakdown()
            }
        };

        // Just update the storage
        updateServiceStorage(
            'end-of-lease-cleaning',
            details,
            'End of Lease Cleaning'
        );
    }, [
        bookingState.propertyDetails,
        bookingState.kitchenCondition,
        bookingState.carpetCleaning.areas,
        bookingState.parking,
        bookingState.additionalInformation,
        calculateTotalPrice,
        calculatePriceBreakdown
    ]);

    return (
        <div className="space-y-6 relative">
            
            {/* Home Size Selection */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4">Select Home Size</h4>
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

            {/* Additional Details Section */}
            {selectedSize !== '5plus' && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Additional Details</h4>
                    
                    {/* Bathrooms and Toilets Row */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex flex-col">
                            <label className="text-sm text-gray-600 mb-2">Number of Bathrooms</label>
                            <select
                                value={bookingState.propertyDetails.bathrooms}
                                onChange={(e) => setBookingState({
                                    ...bookingState,
                                    propertyDetails: {
                                        ...bookingState.propertyDetails,
                                        bathrooms: e.target.value
                                    }
                                })}
                                className="px-4 py-2 rounded-lg border border-gray-200 
                                    focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20 
                                    outline-none transition-all"
                            >
                                {bathroomOptions.map((num) => (
                                    <option key={num} value={num}>
                                        {num} {parseInt(num) === 1 ? 'Bathroom' : 'Bathrooms'}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm text-gray-600 mb-2">Number of Toilets</label>
                            <select
                                value={bookingState.propertyDetails.toilets}
                                onChange={(e) => setBookingState({
                                    ...bookingState,
                                    propertyDetails: {
                                        ...bookingState.propertyDetails,
                                        toilets: e.target.value
                                    }
                                })}
                                className="px-4 py-2 rounded-lg border border-gray-200 
                                    focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20 
                                    outline-none transition-all"
                            >
                                {bathroomOptions.map((num) => (
                                    <option key={num} value={num}>
                                        {num} {parseInt(num) === 1 ? 'Toilet' : 'Toilets'}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Property Type Selection */}
                    <div className="py-3 border-t border-gray-100">
                        <label className="text-sm text-gray-600 mb-3 block">Property Type</label>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setBookingState({
                                    ...bookingState,
                                    propertyDetails: {
                                        ...bookingState.propertyDetails,
                                        propertyType: 'single'
                                    }
                                })}
                                className={`px-4 py-2 rounded-lg text-sm font-medium flex-1
                                    transition-all border-2
                                    ${bookingState.propertyDetails.propertyType === 'single'
                                        ? 'bg-[#e6f0fa] text-[#1E3D8F] border-[#1E3D8F]'
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-[#90c2f7]'
                                    }`}
                            >
                                Single Story
                            </button>
                            <button
                                onClick={() => setBookingState({
                                    ...bookingState,
                                    propertyDetails: {
                                        ...bookingState.propertyDetails,
                                        propertyType: 'double'
                                    }
                                })}
                                className={`px-4 py-2 rounded-lg text-sm font-medium flex-1
                                    transition-all border-2
                                    ${bookingState.propertyDetails.propertyType === 'double'
                                        ? 'bg-[#e6f0fa] text-[#1E3D8F] border-[#1E3D8F]'
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-[#90c2f7]'
                                    }`}
                            >
                                Double Story
                            </button>
                            <button
                                onClick={() => setBookingState({
                                    ...bookingState,
                                    propertyDetails: {
                                        ...bookingState.propertyDetails,
                                        propertyType: 'apartment'
                                    }
                                })}
                                className={`px-4 py-2 rounded-lg text-sm font-medium flex-1
                                    transition-all border-2
                                    ${bookingState.propertyDetails.propertyType === 'apartment'
                                        ? 'bg-[#e6f0fa] text-[#1E3D8F] border-[#1E3D8F]'
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-[#90c2f7]'
                                    }`}
                            >
                                Apartment
                            </button>
                        </div>

                        {/* Furnished Toggle */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                            <div>
                                <h4 className="font-medium text-gray-900">Furnished Property</h4>
                                <p className="text-sm text-gray-600 mt-1">
                                    Select if the property is currently furnished
                                </p>
                            </div>
                            <button
                                onClick={() => setBookingState({
                                    ...bookingState,
                                    propertyDetails: {
                                        ...bookingState.propertyDetails,
                                        isFurnished: !bookingState.propertyDetails.isFurnished
                                    }
                                })}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                    ${bookingState.propertyDetails.isFurnished ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                        ${bookingState.propertyDetails.isFurnished ? 'translate-x-6' : 'translate-x-1'}`}
                                />
                            </button>
                        </div>

                        {/* Study Room Toggle */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                            <div>
                                <h4 className="font-medium text-gray-900">Study Room</h4>
                                <p className="text-sm text-gray-600 mt-1">
                                    Select if the property has a separate study/home office
                                </p>
                            </div>
                            <button
                                onClick={() => setBookingState({
                                    ...bookingState,
                                    propertyDetails: {
                                        ...bookingState.propertyDetails,
                                        hasStudyRoom: !bookingState.propertyDetails.hasStudyRoom
                                    }
                                })}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                    ${bookingState.propertyDetails.hasStudyRoom ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                        ${bookingState.propertyDetails.hasStudyRoom ? 'translate-x-6' : 'translate-x-1'}`}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Kitchen Condition Section */}
            {selectedSize !== '5plus' && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium text-gray-900">Kitchen Condition</h4>
                            <p className="text-sm text-gray-600 mt-1">
                                Rate the overall condition of your kitchen/oven (1 = Needs Heavy Cleaning, 10 = Light Cleaning Needed)
                            </p>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="flex-1">
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={bookingState.kitchenCondition.rating}
                                    onChange={(e) => setBookingState({
                                        ...bookingState,
                                        kitchenCondition: {
                                            ...bookingState.kitchenCondition,
                                            rating: parseInt(e.target.value)
                                        }
                                    })}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                                        accent-[#1E3D8F] focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20"
                                />
                                <div className="flex justify-between mt-2 text-xs text-gray-500">
                                    <span>Heavy Cleaning</span>
                                    <span>Light Cleaning</span>
                                </div>
                            </div>
                            <div className="w-16 text-center">
                                <div className="text-2xl font-semibold text-[#1E3D8F]">
                                    {bookingState.kitchenCondition.rating}
                                </div>
                                <div className="text-xs text-gray-500">Rating</div>
                            </div>
                        </div>

                        {/* Condition Description */}
                        <div className={`mt-4 p-3 rounded-lg text-sm
                            ${bookingState.kitchenCondition.rating <= 3 
                                ? 'bg-red-50 text-red-700'
                                : bookingState.kitchenCondition.rating <= 7
                                    ? 'bg-yellow-50 text-yellow-700'
                                    : 'bg-green-50 text-green-700'
                            }`}
                        >
                            {bookingState.kitchenCondition.rating <= 3 && (
                                "Heavy cleaning required. May need extra time and special cleaning solutions."
                            )}
                            {bookingState.kitchenCondition.rating > 3 && bookingState.kitchenCondition.rating <= 7 && (
                                "Moderate cleaning needed. Standard cleaning process should be sufficient."
                            )}
                            {bookingState.kitchenCondition.rating > 7 && (
                                "Light cleaning needed. Kitchen is in good condition."
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Carpet Cleaning Section */}
            {selectedSize !== '5plus' && bookingState.propertyDetails.propertyType && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900">Carpet Steam Cleaning</h4>
                            <p className="text-sm text-gray-600 mt-1">
                                Professional deep steam cleaning for all carpeted areas
                            </p>
                        </div>
                        <button
                            onClick={() => setBookingState({
                                ...bookingState,
                                carpetCleaning: {
                                    ...bookingState.carpetCleaning,
                                    required: !bookingState.carpetCleaning.required,
                                    // Reset carpet areas when turning off
                                    areas: !bookingState.carpetCleaning.required ? {
                                        bedrooms: 0,
                                        loungeRooms: 0,
                                        hallway: false,
                                        stairs: false
                                    } : bookingState.carpetCleaning.areas
                                }
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                ${bookingState.carpetCleaning.required ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                    ${bookingState.carpetCleaning.required ? 'translate-x-6' : 'translate-x-1'}`}
                            />
                        </button>
                    </div>

                    {/* Carpet Areas Selection */}
                    {bookingState.carpetCleaning.required && (
                        <div className="mt-4 space-y-4">
                            {/* Bedrooms */}
                            <div className="flex items-center justify-between">
                                <label className="text-sm text-gray-600">Carpeted Bedrooms</label>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setBookingState({
                                            ...bookingState,
                                            carpetCleaning: {
                                                ...bookingState.carpetCleaning,
                                                areas: {
                                                    ...bookingState.carpetCleaning.areas,
                                                    bedrooms: Math.max(0, bookingState.carpetCleaning.areas.bedrooms - 1)
                                                }
                                            }
                                        })}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#1E3D8F]"
                                    >-</button>
                                    <span className="w-8 text-center">{bookingState.carpetCleaning.areas.bedrooms}</span>
                                    <button
                                        onClick={() => setBookingState({
                                            ...bookingState,
                                            carpetCleaning: {
                                                ...bookingState.carpetCleaning,
                                                areas: {
                                                    ...bookingState.carpetCleaning.areas,
                                                    bedrooms: bookingState.carpetCleaning.areas.bedrooms + 1
                                                }
                                            }
                                        })}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#1E3D8F]"
                                    >+</button>
                                </div>
                            </div>

                            {/* Lounge Rooms */}
                            <div className="flex items-center justify-between">
                                <label className="text-sm text-gray-600">Carpeted Living/Lounge Rooms</label>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setBookingState({
                                            ...bookingState,
                                            carpetCleaning: {
                                                ...bookingState.carpetCleaning,
                                                areas: {
                                                    ...bookingState.carpetCleaning.areas,
                                                    loungeRooms: Math.max(0, bookingState.carpetCleaning.areas.loungeRooms - 1)
                                                }
                                            }
                                        })}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#1E3D8F]"
                                    >-</button>
                                    <span className="w-8 text-center">{bookingState.carpetCleaning.areas.loungeRooms}</span>
                                    <button
                                        onClick={() => setBookingState({
                                            ...bookingState,
                                            carpetCleaning: {
                                                ...bookingState.carpetCleaning,
                                                areas: {
                                                    ...bookingState.carpetCleaning.areas,
                                                    loungeRooms: bookingState.carpetCleaning.areas.loungeRooms + 1
                                                }
                                            }
                                        })}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#1E3D8F]"
                                    >+</button>
                                </div>
                            </div>

                            {/* Hallway Toggle */}
                            <div className="flex items-center justify-between py-2">
                                <span className="text-sm text-gray-600">Carpeted Hallway</span>
                                <button
                                    onClick={() => setBookingState({
                                        ...bookingState,
                                        carpetCleaning: {
                                            ...bookingState.carpetCleaning,
                                            areas: {
                                                ...bookingState.carpetCleaning.areas,
                                                hallway: !bookingState.carpetCleaning.areas.hallway
                                            }
                                        }
                                    })}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                        ${bookingState.carpetCleaning.areas.hallway ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                        ${bookingState.carpetCleaning.areas.hallway ? 'translate-x-6' : 'translate-x-1'}`}
                                    />
                                </button>
                            </div>

                            {/* Add Stairs Toggle */}
                            <div className="flex items-center justify-between py-2">
                                <span className="text-sm text-gray-600">Carpeted Stairs</span>
                                <button
                                    onClick={() => setBookingState({
                                        ...bookingState,
                                        carpetCleaning: {
                                            ...bookingState.carpetCleaning,
                                            areas: {
                                                ...bookingState.carpetCleaning.areas,
                                                stairs: !bookingState.carpetCleaning.areas.stairs
                                            }
                                        }
                                    })}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                        ${bookingState.carpetCleaning.areas.stairs ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                        ${bookingState.carpetCleaning.areas.stairs ? 'translate-x-6' : 'translate-x-1'}`}
                                    />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Parking Section */}
            {selectedSize !== '5plus' && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">Parking Available?</h4>
                    <p className="text-sm text-gray-600 mb-4">Select parking availability for cleaning access</p>
                    
                    <select
                        value={bookingState.parking.type}
                        onChange={(e) => setBookingState({
                            ...bookingState,
                            parking: {
                                ...bookingState.parking,
                                type: e.target.value as 'none' | 'street' | 'provided' | 'paid'
                            }
                        })}
                        className="w-full p-3 rounded-lg border border-gray-200 text-gray-600
                            focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                    >
                        <option value="none">No Parking Available</option>
                        <option value="street">Street Parking Available</option>
                        <option value="provided">Parking Will Be Provided</option>
                        <option value="paid">Paid Parking Available</option>
                    </select>
                </div>
            )}

            {/* Additional Information Section */}
            {selectedSize !== '5plus' && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Additional Information</h4>
                    
                    {/* I am dropdown */}
                    <div className="mb-6">
                        <label className="block text-sm text-gray-600 mb-2">
                            I am
                        </label>
                        <select
                            value={bookingState.additionalInformation.userType}
                            onChange={(e) => setBookingState({
                                ...bookingState,
                                additionalInformation: {
                                    ...bookingState.additionalInformation,
                                    userType: e.target.value as 'owner' | 'agent' | 'tenant'                                }
                            })}
                            className="w-full p-3 rounded-lg border border-gray-200 text-gray-600
                                focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                        >
                            <option value="">Select your role</option>
                            <option value="tenant">Tenant</option>
                            <option value="owner">Property Owner</option>
                            <option value="agent">Real Estate Agent</option>
                        </select>
                    </div>

                    {/* Tenancy Duration */}
                    <div className="mb-6">
                        <label className="text-sm text-gray-600 mb-3 block">
                            How long have you/the tenants stayed in this property?
                        </label>
                        <select
                            value={bookingState.additionalInformation.tenancyDuration}
                            onChange={(e) => setBookingState({
                                ...bookingState,
                                additionalInformation: {
                                    ...bookingState.additionalInformation,
                                    tenancyDuration: e.target.value as TenancyDurationType
                                }
                            })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 
                                focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20 
                                outline-none transition-all"
                        >
                            {durationOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Pets in Property */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900">Pets in Property</h4>
                            <p className="text-sm text-gray-600 mt-1">
                                Have there been any pets living in the property?
                            </p>
                        </div>
                        <button
                            onClick={() => setBookingState({
                                ...bookingState,
                                additionalInformation: {
                                    ...bookingState.additionalInformation,
                                    hasPets: !bookingState.additionalInformation.hasPets
                                }
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                ${bookingState.additionalInformation.hasPets ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                    ${bookingState.additionalInformation.hasPets ? 'translate-x-6' : 'translate-x-1'}`}
                            />
                        </button>
                    </div>

                    {/* Additional Notes */}
                    <div className="mt-6 border-t border-gray-100 pt-6">
                        <label className="block text-sm text-gray-600 mb-2">
                            Additional Notes or Special Requirements
                        </label>
                        <textarea
                            value={bookingState.additionalInformation.additionalNotes}
                            onChange={(e) => setBookingState({
                                ...bookingState,
                                additionalInformation: {
                                    ...bookingState.additionalInformation,
                                    additionalNotes: e.target.value
                                }
                            })}
                            placeholder="Please provide any additional information that might help us serve you better. 
                                For example: specific areas that need attention, access instructions, or any concerns."
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 
                                focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20 
                                transition-all duration-300 outline-none min-h-[120px]
                                text-sm text-gray-600 placeholder:text-gray-400"
                        />
                        <p className="mt-2 text-xs text-gray-500">
                            This information helps us prepare better for your cleaning service
                        </p>
                    </div>
                </div>
            )}

            

            {/* Pricing Section */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4">Your Price</h4>
                <div className="p-4 bg-[#e6f0fa] rounded-lg space-y-4">
                    {/* Base Price */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-600">Property Size</span>
                            <span className="font-medium">{homeTypes.find(t => t.id === selectedSize)?.label}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Base Price</span>
                            <span className="font-medium">${endOfLeaseFeatures.pricing[
                                selectedSize === 'studio' ? 'studio' : 
                                selectedSize === '1bed' ? 'oneBed' : 
                                selectedSize === '2bed' ? 'twoBed' : 
                                selectedSize === '3bed' ? 'threeBed' : 'fourBed'
                            ]}</span>
                        </div>
                    </div>

                    {/* Additional Charges */}
                    <div className="pt-3 border-t border-[#1E3D8F]/10">
                        <div className="text-sm font-medium text-gray-600 mb-2">Additional Charges</div>
                        
                        {/* Only show if more than 1 bathroom */}
                        {parseInt(bookingState.propertyDetails.bathrooms) > 1 && (
                            <div className="flex justify-between text-gray-600">
                                <span>Additional Bathroom(s):</span>
                                <span>+${(parseInt(bookingState.propertyDetails.bathrooms) - 1) * 15}</span>
                            </div>
                        )}

                        {/* Only show if more than 2 toilets */}
                        {parseInt(bookingState.propertyDetails.toilets) > 2 && (
                            <div className="flex justify-between text-gray-600">
                                <span>Additional Toilet(s):</span>
                                <span>+${(parseInt(bookingState.propertyDetails.toilets) - 2) * 5}</span>
                            </div>
                        )}

                        {/* Only show double story fee if carpet cleaning is selected */}
                        {bookingState.propertyDetails.propertyType === 'double' && bookingState.carpetCleaning.required && (
                            <div className="flex justify-between text-gray-600">
                                <span>Double Story:</span>
                                <span>+$15</span>
                            </div>
                        )}

                        {bookingState.propertyDetails.isFurnished && (
                            <div className="flex justify-between text-gray-600">
                                <span>Furnished Property:</span>
                                <span>+$60</span>
                            </div>
                        )}

                        {bookingState.propertyDetails.hasStudyRoom && (
                            <div className="flex justify-between text-gray-600">
                                <span>Study Room:</span>
                                <span>+$10</span>
                            </div>
                        )}

                        {bookingState.additionalInformation.hasPets && (
                            <div className="flex justify-between text-gray-600">
                                <span>Pet Cleaning Fee:</span>
                                <span>+$15</span>
                            </div>
                        )}

                        {/* Kitchen Condition Charges */}
                        {bookingState.kitchenCondition.rating <= 3 && (
                            <div className="flex justify-between text-gray-600">
                                <span>Heavy Kitchen Cleaning:</span>
                                <span>+$55</span>
                            </div>
                        )}
                        {bookingState.kitchenCondition.rating > 3 && bookingState.kitchenCondition.rating <= 5 && (
                            <div className="flex justify-between text-gray-600">
                                <span>Moderate Kitchen Cleaning:</span>
                                <span>+$25</span>
                            </div>
                        )}
                    </div>

                    {/* Carpet Cleaning Section */}
                    {bookingState.carpetCleaning.required && (
                        <div className="pt-3 border-t border-[#1E3D8F]/10">
                            <div className="text-sm font-medium text-gray-600 mb-2">Carpet Cleaning</div>
                            {bookingState.carpetCleaning.areas.bedrooms > 0 && (
                                <div className="flex justify-between text-gray-600">
                                    <span>Bedrooms ({bookingState.carpetCleaning.areas.bedrooms}):</span>
                                    <span>+${bookingState.carpetCleaning.areas.bedrooms * 30}</span>
                                </div>
                            )}
                            {bookingState.carpetCleaning.areas.loungeRooms > 0 && (
                                <div className="flex justify-between text-gray-600">
                                    <span>Living Rooms ({bookingState.carpetCleaning.areas.loungeRooms}):</span>
                                    <span>+${bookingState.carpetCleaning.areas.loungeRooms * 30}</span>
                                </div>
                            )}
                            {bookingState.carpetCleaning.areas.hallway && (
                                <div className="flex justify-between text-gray-600">
                                    <span>Hallway:</span>
                                    <span>+$15</span>
                                </div>
                            )}
                            {bookingState.carpetCleaning.areas.stairs && (
                                <div className="flex justify-between text-gray-600">
                                    <span>Stairs:</span>
                                    <span>+$40</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Extra Services */}
                    {bookingState.extras.length > 0 && (
                        <div className="pt-3 border-t border-[#1E3D8F]/10">
                            <div className="text-sm font-medium text-gray-600 mb-2">Extra Services</div>
                            {bookingState.extras.map(extraName => {
                                const extra = endOfLeaseFeatures.extras.find(e => e.name === extraName);
                                return extra && (
                                    <div key={extra.name} className="flex justify-between text-gray-600">
                                        <span>{extra.name}:</span>
                                        <span>+${extra.price}</span>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Total Price */}
                    <div className="pt-3 border-t border-[#1E3D8F]/10">
                        <div className="flex justify-between items-center text-lg font-semibold">
                            <span className="text-gray-900">Total Price</span>
                            <span className="text-[#1E3D8F]">${bookingState.totalPrice}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Extra Services */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h4 className="font-medium text-gray-900">Optional Extras</h4>
                        <p className="text-sm text-gray-600 mt-1">
                            Select additional services you need
                        </p>
                    </div>
                    <Info className="w-4 h-4 text-gray-400" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {endOfLeaseFeatures.extras.map((extra) => (
                        <button
                            key={extra.name}
                            onClick={() => setBookingState({
                                ...bookingState,
                                extras: bookingState.extras.includes(extra.name)
                                    ? bookingState.extras.filter(e => e !== extra.name)
                                    : [...bookingState.extras, extra.name]
                            })}
                            className={`flex justify-between items-center p-4 rounded-lg border-2 transition-all
                                ${bookingState.extras.includes(extra.name)
                                    ? 'border-[#1E3D8F] bg-[#e6f0fa] text-[#1E3D8F]'
                                    : 'border-gray-200 hover:border-[#90c2f7] bg-white'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                                    ${bookingState.extras.includes(extra.name)
                                        ? 'border-[#1E3D8F] bg-[#1E3D8F]'
                                        : 'border-gray-300'
                                    }`}
                                >
                                    {bookingState.extras.includes(extra.name) && (
                                        <Check className="w-3 h-3 text-white" />
                                    )}
                                </div>
                                <span className="text-sm">{extra.name}</span>
                            </div>
                            <span className={`font-medium ${
                                bookingState.extras.includes(extra.name)
                                    ? 'text-[#1E3D8F]'
                                    : 'text-gray-600'
                            }`}>
                                +${extra.price}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Large Home Dialog */}
            {showLargeHomeDialog && (
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
                                    setShowLargeHomeDialog(false);
                                    setSelectedSize('4bed'); // Reset to 4 bed if they close dialog
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

            {/* Error Message Display */}
            {bookingState.submitError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                    {bookingState.submitError}
                </div>
            )}

            {/* Update the submit button to show loading state */}
            <button
                onClick={handleBookingSubmit}
                disabled={bookingState.isSubmitting}
                className={`w-full bg-[#1E3D8F] text-white py-4 px-6 rounded-lg
                    font-medium hover:bg-[#1E3D8F]/90 transition-colors
                    flex items-center justify-center gap-2 text-lg
                    ${bookingState.isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
                {bookingState.isSubmitting ? 'Processing...' : 'Next Step'}
                
            </button>
        </div>
    );
}