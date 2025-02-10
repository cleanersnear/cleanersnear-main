import { Check, Info, Phone } from 'lucide-react';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { BaseServiceProps } from '../BaseServiceComponent';


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

interface AdditionalOptions {
    bathrooms: string;
    toilets: string;
    propertyType: 'single' | 'double' | 'apartment';
    hasParking: boolean;
    needsCarpetCleaning: boolean;
    carpetAreas: {
        bedrooms: number;
        hallway: boolean;
        stairs: boolean;
        loungeRooms: number;
    };
    parkingType: 'none' | 'street' | 'provided' | 'paid';
    userType: 'owner' | 'agent' | 'tenant' | '';
    tenancyDuration: string;
    hadPets: boolean;
    additionalNotes: string;
    isFurnished: boolean;
    kitchenCondition: number;
    selectedExtras: string[];
    hasStudyRoom: boolean;
}

interface BookingData {
    serviceType: 'end-of-lease';
    propertyDetails: {
        size: string;
        bathrooms: string;
        toilets: string;
        propertyType: string;
        isFurnished: boolean;
        hasStudyRoom: boolean;
    };
    kitchenCondition: {
        rating: number;
        cleaningLevel: 'heavy' | 'moderate' | 'light';
    };
    carpetCleaning: {
        required: boolean;
        areas: {
            bedrooms: number;
            loungeRooms: number;
            hallway: boolean;
            stairs: boolean;
        };
    };
    parking: {
        type: 'none' | 'street' | 'provided' | 'paid';
    };
    customerInfo: {
        userType: string;
        tenancyDuration: string;
        hasPets: boolean;
        additionalNotes: string;
    };
    extras: string[];
    pricing: {
        basePrice: number;
        totalPrice: number;
        breakdown: {
            description: string;
            amount: number;
        }[];
    };
}

interface ServiceData {
    type: string;
    name: string;
    price: number;
    basePrice: number;
    details: {
        propertyDetails: BookingData['propertyDetails'];
        kitchenCondition: BookingData['kitchenCondition'];
        carpetCleaning: BookingData['carpetCleaning'];
        parking: BookingData['parking'];
        customerInfo: BookingData['customerInfo'];
        extras: string[];
        priceBreakdown: Array<{
            description: string;
            amount: number;
        }>;
    };
}

type EndOfLeaseProps = Omit<BaseServiceProps, 'features' | 'id' | 'title' | 'description' | 'basePrice' | 'baseDuration'>;



export default function EndOfLeaseClean({}: EndOfLeaseProps) {
    const router = useRouter();
    
    const [selectedSize, setSelectedSize] = useState('1bed');
    const [showLargeHomeDialog, setShowLargeHomeDialog] = useState(false);
    const [additionalOptions, setAdditionalOptions] = useState<AdditionalOptions>({
        bathrooms: '1',
        toilets: '1',
        propertyType: 'single',
        hasParking: false,
        needsCarpetCleaning: false,
        carpetAreas: {
            bedrooms: 0,
            hallway: false,
            stairs: false,
            loungeRooms: 0
        },
        parkingType: 'none',
        userType: '',
        tenancyDuration: '',
        hadPets: false,
        additionalNotes: '',
        isFurnished: false,
        kitchenCondition: 5,
        selectedExtras: [],
        hasStudyRoom: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

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
            setSelectedSize(sizeId);
        }
    };

    const bathroomOptions = ['1', '2', '3', '4', '5'];

    const calculateCarpetCleaningCost = useCallback((): number => {
        if (!additionalOptions.needsCarpetCleaning) return 0;

        let carpetCost = 0;
        carpetCost += additionalOptions.carpetAreas.bedrooms * 30;    // $30 per bedroom
        carpetCost += additionalOptions.carpetAreas.loungeRooms * 30; // $30 per lounge
        carpetCost += additionalOptions.carpetAreas.hallway ? 15 : 0; // $15 for hallway
        carpetCost += additionalOptions.carpetAreas.stairs ? 40 : 0;  // $40 for stairs

        return carpetCost;
    }, [additionalOptions.needsCarpetCleaning, additionalOptions.carpetAreas]);

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
            const extraBathrooms = Math.max(0, parseInt(additionalOptions.bathrooms) - 1);
            if (extraBathrooms > 0) {
                basePrice += extraBathrooms * 15; // Updated to $15 per extra bathroom
            }
            
            // Add toilet cost (only for additional toilets beyond 2)
            const extraToilets = Math.max(0, parseInt(additionalOptions.toilets) - 2);
            if (extraToilets > 0) {
                basePrice += extraToilets * 5;
            }

            // Add double story cost only if carpet cleaning is selected
            if (additionalOptions.propertyType === 'double' && additionalOptions.needsCarpetCleaning) {
                basePrice += 15;
            }

            // Add furnished fee
            if (additionalOptions.isFurnished) {
                basePrice += 60;
            }

            // Updated kitchen condition surcharge
            if (additionalOptions.kitchenCondition <= 3) {
                basePrice += 55; // Heavy cleaning updated to $55
            } else if (additionalOptions.kitchenCondition <= 5) {
                basePrice += 25; // Moderate cleaning updated to $25
            }

            // Add carpet cleaning cost
            if (additionalOptions.needsCarpetCleaning) {
                basePrice += calculateCarpetCleaningCost();
            }

            // Add extras cost
            additionalOptions.selectedExtras.forEach(extraName => {
                const extra = endOfLeaseFeatures.extras.find(e => e.name === extraName);
                if (extra) {
                    basePrice += extra.price;
                }
            });

            // Add study room fee
            if (additionalOptions.hasStudyRoom) {
                basePrice += 10;
            }

            // Add pet fee (updated to $15)
            if (additionalOptions.hadPets) {
                basePrice += 15;
            }

            return basePrice;
        } catch (error) {
            console.error('Price calculation error:', error);
            throw new Error('Failed to calculate price');
        }
    }, [selectedSize, additionalOptions, calculateCarpetCleaningCost]);



    const prepareBookingData = useCallback((): BookingData => {
        const basePrice = endOfLeaseFeatures.pricing[
            selectedSize === 'studio' ? 'studio' : 
            selectedSize === '1bed' ? 'oneBed' : 
            selectedSize === '2bed' ? 'twoBed' : 
            selectedSize === '3bed' ? 'threeBed' : 'fourBed'
        ];

        const priceBreakdown = [];
        
        // Add base price
        priceBreakdown.push({
            description: `Base Price (${homeTypes.find(t => t.id === selectedSize)?.label})`,
            amount: basePrice
        });

        // Add additional bathrooms
        const extraBathrooms = Math.max(0, parseInt(additionalOptions.bathrooms) - 1);
        if (extraBathrooms > 0) {
            priceBreakdown.push({
                description: 'Additional Bathrooms',
                amount: extraBathrooms * 15
            });
        }

        // Add all other price components
        if (additionalOptions.propertyType === 'double') {
            priceBreakdown.push({ description: 'Double Story', amount: 15 });
        }

        if (additionalOptions.isFurnished) {
            priceBreakdown.push({ description: 'Furnished Property', amount: 60 });
        }

        // Add carpet cleaning status to the breakdown if selected
        if (additionalOptions.needsCarpetCleaning) {
            priceBreakdown.push({
                description: 'Carpet Steam Cleaning',
                amount: calculateCarpetCleaningCost()
            });
        }

        // ... add other price components ...

        const bookingData: BookingData = {
            serviceType: 'end-of-lease',
            propertyDetails: {
                size: selectedSize,
                bathrooms: additionalOptions.bathrooms,
                toilets: additionalOptions.toilets,
                propertyType: additionalOptions.propertyType,
                isFurnished: additionalOptions.isFurnished,
                hasStudyRoom: additionalOptions.hasStudyRoom
            },
            kitchenCondition: {
                rating: additionalOptions.kitchenCondition,
                cleaningLevel: additionalOptions.kitchenCondition <= 3 ? 'heavy' 
                    : additionalOptions.kitchenCondition <= 5 ? 'moderate' : 'light'
            },
            carpetCleaning: {
                required: additionalOptions.needsCarpetCleaning,
                areas: additionalOptions.carpetAreas
            },
            parking: {
                type: additionalOptions.parkingType
            },
            customerInfo: {
                userType: additionalOptions.userType,
                tenancyDuration: additionalOptions.tenancyDuration,
                hasPets: additionalOptions.hadPets,
                additionalNotes: additionalOptions.additionalNotes
            },
            extras: additionalOptions.selectedExtras,
            pricing: {
                basePrice: basePrice,
                totalPrice: calculateTotalPrice(),
                breakdown: priceBreakdown
            }
        };

        return bookingData;
    }, [selectedSize, additionalOptions, calculateTotalPrice, homeTypes, calculateCarpetCleaningCost]);

    

    const handleBookingSubmit = async () => {
        if (isSubmitting) return;
        
        try {
            setIsSubmitting(true);
            setSubmitError(null);
            
            const bookingData = prepareBookingData();
            
            // Just save to localStorage and proceed
            updateServiceData(bookingData);
            router.push('/quick-book/details');

        } catch (error) {
            console.error('Error preparing end of lease cleaning data:', error);
            setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Add useEffect for real-time updates
    useEffect(() => {
        if (selectedSize && selectedSize !== '5plus') {
            try {
                const bookingData = prepareBookingData();
                const serviceData = {
                    name: "End of Lease Clean",
                    type: "end-of-lease",
                    homeSize: homeTypes.find(t => t.id === selectedSize)?.label,
                    propertyDetails: {
                        bathrooms: additionalOptions.bathrooms,
                        toilets: additionalOptions.toilets,
                        propertyType: additionalOptions.propertyType,
                        isFurnished: additionalOptions.isFurnished,
                        hasStudyRoom: additionalOptions.hasStudyRoom,
                        needsCarpetCleaning: additionalOptions.needsCarpetCleaning
                    },
                    price: calculateTotalPrice(),
                    basePrice: endOfLeaseFeatures.pricing[
                        selectedSize === 'studio' ? 'studio' : 
                        selectedSize === '1bed' ? 'oneBed' : 
                        selectedSize === '2bed' ? 'twoBed' : 
                        selectedSize === '3bed' ? 'threeBed' : 'fourBed'
                    ],
                    priceBreakdown: bookingData.pricing.breakdown,
                    extras: additionalOptions.selectedExtras.map(name => ({
                        name,
                        price: endOfLeaseFeatures.extras.find(e => e.name === name)?.price || 0
                    }))
                };

                localStorage.setItem('selectedService', JSON.stringify(serviceData));
                window.dispatchEvent(new CustomEvent('localStorageChange'));
            } catch (error) {
                console.error('Error updating service data:', error);
            }
        }
    }, [
        selectedSize,
        additionalOptions.bathrooms,
        additionalOptions.toilets,
        additionalOptions.propertyType,
        additionalOptions.isFurnished,
        additionalOptions.hasStudyRoom,
        additionalOptions.kitchenCondition,
        additionalOptions.needsCarpetCleaning,
        additionalOptions.carpetAreas.bedrooms,
        additionalOptions.carpetAreas.loungeRooms,
        additionalOptions.carpetAreas.hallway,
        additionalOptions.carpetAreas.stairs,
        additionalOptions.selectedExtras,
        additionalOptions.hadPets,
        calculateTotalPrice,
        homeTypes,
        prepareBookingData
    ]);

    // Update the updateServiceData function to transform BookingData to ServiceData
    const updateServiceData = (bookingData: BookingData) => {
        const serviceData: ServiceData = {
            type: bookingData.serviceType,
            name: "End of Lease Cleaning",
            price: bookingData.pricing.totalPrice,
            basePrice: bookingData.pricing.basePrice,
            details: {
                propertyDetails: bookingData.propertyDetails,
                kitchenCondition: bookingData.kitchenCondition,
                carpetCleaning: bookingData.carpetCleaning,
                parking: bookingData.parking,
                customerInfo: bookingData.customerInfo,
                extras: bookingData.extras,
                priceBreakdown: bookingData.pricing.breakdown
            }
        };

        localStorage.setItem('selectedService', JSON.stringify(serviceData));
        window.dispatchEvent(new CustomEvent('serviceUpdate', { detail: serviceData }));
    };

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
                                value={additionalOptions.bathrooms}
                                onChange={(e) => setAdditionalOptions({
                                    ...additionalOptions,
                                    bathrooms: e.target.value
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
                                value={additionalOptions.toilets}
                                onChange={(e) => setAdditionalOptions({
                                    ...additionalOptions,
                                    toilets: e.target.value
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
                                onClick={() => setAdditionalOptions({
                                    ...additionalOptions,
                                    propertyType: 'single'
                                })}
                                className={`px-4 py-2 rounded-lg text-sm font-medium flex-1
                                    transition-all border-2
                                    ${additionalOptions.propertyType === 'single'
                                        ? 'bg-[#e6f0fa] text-[#1E3D8F] border-[#1E3D8F]'
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-[#90c2f7]'
                                    }`}
                            >
                                Single Story
                            </button>
                            <button
                                onClick={() => setAdditionalOptions({
                                    ...additionalOptions,
                                    propertyType: 'double'
                                })}
                                className={`px-4 py-2 rounded-lg text-sm font-medium flex-1
                                    transition-all border-2
                                    ${additionalOptions.propertyType === 'double'
                                        ? 'bg-[#e6f0fa] text-[#1E3D8F] border-[#1E3D8F]'
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-[#90c2f7]'
                                    }`}
                            >
                                Double Story
                            </button>
                            <button
                                onClick={() => setAdditionalOptions({
                                    ...additionalOptions,
                                    propertyType: 'apartment'
                                })}
                                className={`px-4 py-2 rounded-lg text-sm font-medium flex-1
                                    transition-all border-2
                                    ${additionalOptions.propertyType === 'apartment'
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
                                onClick={() => setAdditionalOptions({
                                    ...additionalOptions,
                                    isFurnished: !additionalOptions.isFurnished
                                })}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                    ${additionalOptions.isFurnished ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                        ${additionalOptions.isFurnished ? 'translate-x-6' : 'translate-x-1'}`}
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
                                onClick={() => setAdditionalOptions({
                                    ...additionalOptions,
                                    hasStudyRoom: !additionalOptions.hasStudyRoom
                                })}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                    ${additionalOptions.hasStudyRoom ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                        ${additionalOptions.hasStudyRoom ? 'translate-x-6' : 'translate-x-1'}`}
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
                                    value={additionalOptions.kitchenCondition}
                                    onChange={(e) => setAdditionalOptions({
                                        ...additionalOptions,
                                        kitchenCondition: parseInt(e.target.value)
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
                                    {additionalOptions.kitchenCondition}
                                </div>
                                <div className="text-xs text-gray-500">Rating</div>
                            </div>
                        </div>

                        {/* Condition Description */}
                        <div className={`mt-4 p-3 rounded-lg text-sm
                            ${additionalOptions.kitchenCondition <= 3 
                                ? 'bg-red-50 text-red-700'
                                : additionalOptions.kitchenCondition <= 7
                                    ? 'bg-yellow-50 text-yellow-700'
                                    : 'bg-green-50 text-green-700'
                            }`}
                        >
                            {additionalOptions.kitchenCondition <= 3 && (
                                "Heavy cleaning required. May need extra time and special cleaning solutions."
                            )}
                            {additionalOptions.kitchenCondition > 3 && additionalOptions.kitchenCondition <= 7 && (
                                "Moderate cleaning needed. Standard cleaning process should be sufficient."
                            )}
                            {additionalOptions.kitchenCondition > 7 && (
                                "Light cleaning needed. Kitchen is in good condition."
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Carpet Cleaning Section */}
            {selectedSize !== '5plus' && additionalOptions.propertyType && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900">Carpet Steam Cleaning</h4>
                            <p className="text-sm text-gray-600 mt-1">
                                Professional deep steam cleaning for all carpeted areas
                            </p>
                        </div>
                        <button
                            onClick={() => setAdditionalOptions({
                                ...additionalOptions,
                                needsCarpetCleaning: !additionalOptions.needsCarpetCleaning,
                                // Reset carpet areas when turning off
                                carpetAreas: !additionalOptions.needsCarpetCleaning ? {
                                    bedrooms: 0,
                                    hallway: false,
                                    stairs: false,
                                    loungeRooms: 0
                                } : additionalOptions.carpetAreas
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                ${additionalOptions.needsCarpetCleaning ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                    ${additionalOptions.needsCarpetCleaning ? 'translate-x-6' : 'translate-x-1'}`}
                            />
                        </button>
                    </div>

                    {/* Carpet Areas Selection */}
                    {additionalOptions.needsCarpetCleaning && (
                        <div className="mt-4 space-y-4">
                            {/* Bedrooms */}
                            <div className="flex items-center justify-between">
                                <label className="text-sm text-gray-600">Carpeted Bedrooms</label>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setAdditionalOptions({
                                            ...additionalOptions,
                                            carpetAreas: {
                                                ...additionalOptions.carpetAreas,
                                                bedrooms: Math.max(0, additionalOptions.carpetAreas.bedrooms - 1)
                                            }
                                        })}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#1E3D8F]"
                                    >-</button>
                                    <span className="w-8 text-center">{additionalOptions.carpetAreas.bedrooms}</span>
                                    <button
                                        onClick={() => setAdditionalOptions({
                                            ...additionalOptions,
                                            carpetAreas: {
                                                ...additionalOptions.carpetAreas,
                                                bedrooms: additionalOptions.carpetAreas.bedrooms + 1
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
                                        onClick={() => setAdditionalOptions({
                                            ...additionalOptions,
                                            carpetAreas: {
                                                ...additionalOptions.carpetAreas,
                                                loungeRooms: Math.max(0, additionalOptions.carpetAreas.loungeRooms - 1)
                                            }
                                        })}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#1E3D8F]"
                                    >-</button>
                                    <span className="w-8 text-center">{additionalOptions.carpetAreas.loungeRooms}</span>
                                    <button
                                        onClick={() => setAdditionalOptions({
                                            ...additionalOptions,
                                            carpetAreas: {
                                                ...additionalOptions.carpetAreas,
                                                loungeRooms: additionalOptions.carpetAreas.loungeRooms + 1
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
                                    onClick={() => setAdditionalOptions({
                                        ...additionalOptions,
                                        carpetAreas: {
                                            ...additionalOptions.carpetAreas,
                                            hallway: !additionalOptions.carpetAreas.hallway
                                        }
                                    })}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                        ${additionalOptions.carpetAreas.hallway ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                        ${additionalOptions.carpetAreas.hallway ? 'translate-x-6' : 'translate-x-1'}`}
                                    />
                                </button>
                            </div>

                            {/* Add Stairs Toggle */}
                            <div className="flex items-center justify-between py-2">
                                <span className="text-sm text-gray-600">Carpeted Stairs</span>
                                <button
                                    onClick={() => setAdditionalOptions({
                                        ...additionalOptions,
                                        carpetAreas: {
                                            ...additionalOptions.carpetAreas,
                                            stairs: !additionalOptions.carpetAreas.stairs
                                        }
                                    })}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                        ${additionalOptions.carpetAreas.stairs ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                        ${additionalOptions.carpetAreas.stairs ? 'translate-x-6' : 'translate-x-1'}`}
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
                        value={additionalOptions.parkingType}
                        onChange={(e) => setAdditionalOptions({
                            ...additionalOptions,
                            parkingType: e.target.value as 'none' | 'street' | 'provided' | 'paid'
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
                            value={additionalOptions.userType}
                            onChange={(e) => setAdditionalOptions({
                                ...additionalOptions,
                                userType: e.target.value as 'owner' | 'agent' | 'tenant' | ''
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
                            value={additionalOptions.tenancyDuration}
                            onChange={(e) => setAdditionalOptions({
                                ...additionalOptions,
                                tenancyDuration: e.target.value
                            })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 
                                focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20 
                                outline-none transition-all"
                        >
                            <option value="">Select duration</option>
                            <option value="0-6">Less than 6 months</option>
                            <option value="6-12">6-12 months</option>
                            <option value="12-24">1-2 years</option>
                            <option value="24+">More than 2 years</option>
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
                            onClick={() => setAdditionalOptions({
                                ...additionalOptions,
                                hadPets: !additionalOptions.hadPets
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                ${additionalOptions.hadPets ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                    ${additionalOptions.hadPets ? 'translate-x-6' : 'translate-x-1'}`}
                            />
                        </button>
                    </div>

                    {/* Additional Notes */}
                    <div className="mt-6 border-t border-gray-100 pt-6">
                        <label className="block text-sm text-gray-600 mb-2">
                            Additional Notes or Special Requirements
                        </label>
                        <textarea
                            value={additionalOptions.additionalNotes}
                            onChange={(e) => setAdditionalOptions({
                                ...additionalOptions,
                                additionalNotes: e.target.value
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
                        {parseInt(additionalOptions.bathrooms) > 1 && (
                            <div className="flex justify-between text-gray-600">
                                <span>Additional Bathroom(s):</span>
                                <span>+${(parseInt(additionalOptions.bathrooms) - 1) * 15}</span>
                            </div>
                        )}

                        {/* Only show if more than 2 toilets */}
                        {parseInt(additionalOptions.toilets) > 2 && (
                            <div className="flex justify-between text-gray-600">
                                <span>Additional Toilet(s):</span>
                                <span>+${(parseInt(additionalOptions.toilets) - 2) * 5}</span>
                            </div>
                        )}

                        {/* Only show double story fee if carpet cleaning is selected */}
                        {additionalOptions.propertyType === 'double' && additionalOptions.needsCarpetCleaning && (
                            <div className="flex justify-between text-gray-600">
                                <span>Double Story:</span>
                                <span>+$15</span>
                            </div>
                        )}

                        {additionalOptions.isFurnished && (
                            <div className="flex justify-between text-gray-600">
                                <span>Furnished Property:</span>
                                <span>+$60</span>
                            </div>
                        )}

                        {additionalOptions.hasStudyRoom && (
                            <div className="flex justify-between text-gray-600">
                                <span>Study Room:</span>
                                <span>+$10</span>
                            </div>
                        )}

                        {additionalOptions.hadPets && (
                            <div className="flex justify-between text-gray-600">
                                <span>Pet Cleaning Fee:</span>
                                <span>+$15</span>
                            </div>
                        )}

                        {/* Kitchen Condition Charges */}
                        {additionalOptions.kitchenCondition <= 3 && (
                            <div className="flex justify-between text-gray-600">
                                <span>Heavy Kitchen Cleaning:</span>
                                <span>+$55</span>
                            </div>
                        )}
                        {additionalOptions.kitchenCondition > 3 && additionalOptions.kitchenCondition <= 5 && (
                            <div className="flex justify-between text-gray-600">
                                <span>Moderate Kitchen Cleaning:</span>
                                <span>+$25</span>
                            </div>
                        )}
                    </div>

                    {/* Carpet Cleaning Section */}
                    {additionalOptions.needsCarpetCleaning && (
                        <div className="pt-3 border-t border-[#1E3D8F]/10">
                            <div className="text-sm font-medium text-gray-600 mb-2">Carpet Cleaning</div>
                            {additionalOptions.carpetAreas.bedrooms > 0 && (
                                <div className="flex justify-between text-gray-600">
                                    <span>Bedrooms ({additionalOptions.carpetAreas.bedrooms}):</span>
                                    <span>+${additionalOptions.carpetAreas.bedrooms * 30}</span>
                                </div>
                            )}
                            {additionalOptions.carpetAreas.loungeRooms > 0 && (
                                <div className="flex justify-between text-gray-600">
                                    <span>Living Rooms ({additionalOptions.carpetAreas.loungeRooms}):</span>
                                    <span>+${additionalOptions.carpetAreas.loungeRooms * 30}</span>
                                </div>
                            )}
                            {additionalOptions.carpetAreas.hallway && (
                                <div className="flex justify-between text-gray-600">
                                    <span>Hallway:</span>
                                    <span>+$15</span>
                                </div>
                            )}
                            {additionalOptions.carpetAreas.stairs && (
                                <div className="flex justify-between text-gray-600">
                                    <span>Stairs:</span>
                                    <span>+$40</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Extra Services */}
                    {additionalOptions.selectedExtras.length > 0 && (
                        <div className="pt-3 border-t border-[#1E3D8F]/10">
                            <div className="text-sm font-medium text-gray-600 mb-2">Extra Services</div>
                            {additionalOptions.selectedExtras.map(extraName => {
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
                            <span className="text-[#1E3D8F]">${calculateTotalPrice()}</span>
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
                            onClick={() => setAdditionalOptions({
                                ...additionalOptions,
                                selectedExtras: additionalOptions.selectedExtras.includes(extra.name)
                                    ? additionalOptions.selectedExtras.filter(e => e !== extra.name)
                                    : [...additionalOptions.selectedExtras, extra.name]
                            })}
                            className={`flex justify-between items-center p-4 rounded-lg border-2 transition-all
                                ${additionalOptions.selectedExtras.includes(extra.name)
                                    ? 'border-[#1E3D8F] bg-[#e6f0fa] text-[#1E3D8F]'
                                    : 'border-gray-200 hover:border-[#90c2f7] bg-white'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                                    ${additionalOptions.selectedExtras.includes(extra.name)
                                        ? 'border-[#1E3D8F] bg-[#1E3D8F]'
                                        : 'border-gray-300'
                                    }`}
                                >
                                    {additionalOptions.selectedExtras.includes(extra.name) && (
                                        <Check className="w-3 h-3 text-white" />
                                    )}
                                </div>
                                <span className="text-sm">{extra.name}</span>
                            </div>
                            <span className={`font-medium ${
                                additionalOptions.selectedExtras.includes(extra.name)
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
            {submitError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                    {submitError}
                </div>
            )}

            {/* Update the submit button to show loading state */}
            <button
                onClick={handleBookingSubmit}
                disabled={isSubmitting}
                className={`w-full bg-[#1E3D8F] text-white py-4 px-6 rounded-lg
                    font-medium hover:bg-[#1E3D8F]/90 transition-colors
                    flex items-center justify-center gap-2 text-lg
                    ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
                {isSubmitting ? 'Processing...' : 'Next Step'}
                <Check className="w-5 h-5" />
            </button>
        </div>
    );


    
}