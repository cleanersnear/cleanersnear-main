'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Info, Phone } from 'lucide-react'




const homeTypes = [
    { id: 'studio', label: 'Studio', basePrice: 180, hours: 4 },
    { id: '1bed', label: '1 Bedroom', basePrice: 230, hours: 5 },
    { id: '2bed', label: '2 Bedrooms', basePrice: 285, hours: 6 },
    { id: '3bed', label: '3 Bedrooms', basePrice: 350, hours: 7 },
    { id: '4bed', label: '4 Bedrooms', basePrice: 500, hours: 8 },
    { id: '5plus', label: '5+ Bedrooms', basePrice: 0, hours: 0 }
];

const endOfLeaseFeatures = {
    included: [
        'Complete property deep clean',
        'Wall spot cleaning',
        'Inside all cupboards and drawers',
        'Window tracks and frames',
        'Light fixtures and fans',
        'Skirting boards and door frames',
        'Full bathroom sanitization',
        'Kitchen appliances cleaning',
        'Carpet steam cleaning',
        'Bond back guarantee'
    ],
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
    moveType: 'in' | 'out' | null;
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
    hours: {
        selected: '2' | '3' | '4' | '5' | 'custom';
        customHours: number;
    };
}

export default function MoveInOutClean() {
    const router = useRouter()
    
    const [selectedSize, setSelectedSize] = useState('')
    const [showLargeHomeDialog, setShowLargeHomeDialog] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)

    const [additionalOptions, setAdditionalOptions] = useState<AdditionalOptions>({
        moveType: null,
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
        hasStudyRoom: false,
        hours: {
            selected: '2',
            customHours: 2
        }
    })

    const calculateCarpetCleaningCost = useCallback(() => {
        if (!additionalOptions.needsCarpetCleaning) return 0;

        let carpetCost = 0;
        carpetCost += additionalOptions.carpetAreas.bedrooms * 35; // $35 per bedroom
        carpetCost += additionalOptions.carpetAreas.loungeRooms * 45; // $45 per lounge
        carpetCost += additionalOptions.carpetAreas.hallway ? 30 : 0; // $30 for hallway
        carpetCost += additionalOptions.carpetAreas.stairs ? 50 : 0; // $50 for stairs

        return carpetCost;
    }, [additionalOptions.carpetAreas, additionalOptions.needsCarpetCleaning]);

    const calculateTotalPrice = useCallback(() => {
        const hourlyRate = additionalOptions.moveType === 'in' ? 48.50 : 63.05;
        const hours = additionalOptions.hours.selected === 'custom' 
            ? additionalOptions.hours.customHours 
            : parseInt(additionalOptions.hours.selected);

        let totalPrice = hourlyRate * hours;

        // Add carpet cleaning cost if selected
        if (additionalOptions.needsCarpetCleaning) {
            totalPrice += calculateCarpetCleaningCost();
        }

        // Add extras cost
        additionalOptions.selectedExtras.forEach(extraName => {
            const extra = endOfLeaseFeatures.extras.find(e => e.name === extraName);
            if (extra) {
                totalPrice += extra.price;
            }
        });

        return totalPrice;
    }, [additionalOptions, calculateCarpetCleaningCost]);

    const handleSizeSelect = (sizeId: string) => {
        if (sizeId === '5plus') {
            setShowLargeHomeDialog(true)
        } else {
            setSelectedSize(sizeId)
        }
    }

    useEffect(() => {
        if (selectedSize && selectedSize !== '5plus' && additionalOptions.moveType) {
            try {
                // Calculate extras total
                const extrasTotal = additionalOptions.selectedExtras.reduce((total, extraName) => {
                    const extra = endOfLeaseFeatures.extras.find(e => e.name === extraName);
                    return total + (extra?.price || 0);
                }, 0);

                const serviceData = {
                    name: `Move ${additionalOptions.moveType === 'in' ? 'In' : 'Out'} Clean`,
                    type: "move-in-out",
                    price: calculateTotalPrice(),
                    homeSize: homeTypes.find(t => t.id === selectedSize)?.label,
                    details: {
                        moveType: additionalOptions.moveType,
                        hours: additionalOptions.hours.selected === 'custom' 
                            ? additionalOptions.hours.customHours 
                            : parseInt(additionalOptions.hours.selected),
                        carpetCleaning: additionalOptions.needsCarpetCleaning ? {
                            areas: additionalOptions.carpetAreas,
                            cost: calculateCarpetCleaningCost()
                        } : null,
                        propertyType: additionalOptions.propertyType,
                        isFurnished: additionalOptions.isFurnished,
                        extrasTotal: extrasTotal  // Add extras total
                    }
                };

                localStorage.setItem('selectedService', JSON.stringify(serviceData));
                window.dispatchEvent(new CustomEvent('localStorageChange'));
            } catch (error) {
                console.error('Error updating service data:', error);
            }
        }
    }, [
        selectedSize,
        additionalOptions.moveType,
        additionalOptions.hours,
        additionalOptions.needsCarpetCleaning,
        additionalOptions.carpetAreas,
        additionalOptions.propertyType,
        additionalOptions.isFurnished,
        additionalOptions.selectedExtras,
        calculateTotalPrice,
        calculateCarpetCleaningCost
    ]);

    const validateBooking = (): boolean => {
        try {
            if (!selectedSize) {
                setSubmitError('Please select a property size');
                return false;
            }

            if (selectedSize === '5plus') {
                setSubmitError('Please contact us for large properties');
                return false;
            }

            if (!additionalOptions.moveType) {
                setSubmitError('Please select move in or move out');
                return false;
            }

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

    const handleBookingSubmit = async () => {
        if (isSubmitting) return;
        
        try {
            setIsSubmitting(true);
            setSubmitError(null);

            // Validate before proceeding
            if (!validateBooking()) {
                return;
            }

            const totalPrice = calculateTotalPrice();
            if (!totalPrice || totalPrice <= 0) {
                throw new Error('Invalid price calculation');
            }

            // Format and save service data
            const serviceData = {
                type: "move-in-out" as const,
                name: `Move ${additionalOptions.moveType === 'in' ? 'In' : 'Out'} Clean`,
                price: totalPrice,
                details: {
                    moveType: additionalOptions.moveType as 'in' | 'out', // enforce type
                    propertyDetails: {
                        homeSize: selectedSize,
                        bathrooms: additionalOptions.bathrooms,
                        toilets: additionalOptions.toilets,
                        propertyType: additionalOptions.propertyType
                    },
                    carpetCleaning: additionalOptions.needsCarpetCleaning ? {
                        areas: additionalOptions.carpetAreas,
                        cost: calculateCarpetCleaningCost()
                    } : undefined,
                    hours: {
                        selected: additionalOptions.hours.selected,
                        customHours: additionalOptions.hours.customHours
                    },
                    extras: additionalOptions.selectedExtras,
                    priceBreakdown: [{
                        description: `${additionalOptions.hours.selected === 'custom' 
                            ? additionalOptions.hours.customHours 
                            : additionalOptions.hours.selected} hours @ $${additionalOptions.moveType === 'in' ? '48.50' : '63.05'}/hour`,
                        amount: totalPrice
                    }]
                }
            };

            // Save to localStorage
            localStorage.setItem('selectedService', JSON.stringify(serviceData));
            
            // Emit event for other components
            window.dispatchEvent(new CustomEvent('serviceUpdate', { detail: serviceData }));

            // Navigate to details page where customer info will be collected
            router.push('/quick-book/details');

        } catch (error) {
            console.error('Error preparing move in/out cleaning data:', error);
            setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Move Type Selection */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h4 className="font-medium text-gray-900">Select Move Type</h4>
                        <p className="text-sm text-gray-600 mt-1">
                            Are you moving in or moving out?
                        </p>
                    </div>
                    <Info className="w-4 h-4 text-gray-400" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                        onClick={() => setAdditionalOptions({
                            ...additionalOptions,
                            moveType: 'in'
                        })}
                        className={`p-4 rounded-lg border-2 transition-all
                            ${additionalOptions.moveType === 'in'
                                ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                : 'border-gray-200 hover:border-[#90c2f7]'
                            }`}
                    >
                        <div className="font-medium">Moving In</div>
                        <p className="text-sm text-gray-600 mt-1">
                            Deep cleaning before you move into your new home
                        </p>
                        <div className="text-[#1E3D8F] font-medium mt-2">
                            $48.50 per hour
                        </div>
                    </button>

                    <button
                        onClick={() => setAdditionalOptions({
                            ...additionalOptions,
                            moveType: 'out'
                        })}
                        className={`p-4 rounded-lg border-2 transition-all
                            ${additionalOptions.moveType === 'out'
                                ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                : 'border-gray-200 hover:border-[#90c2f7]'
                            }`}
                    >
                        <div className="font-medium">Moving Out</div>
                        <p className="text-sm text-gray-600 mt-1">
                            End of lease or pre-sale cleaning service
                        </p>
                        <div className="text-[#1E3D8F] font-medium mt-2">
                            $63.05 per hour
                        </div>
                    </button>
                </div>

                {additionalOptions.moveType === 'out' && (
                    <div className="mt-4 p-4 bg-[#e6f0fa] rounded-lg">
                        <p className="text-sm text-gray-600">
                            We&apos;ll help you get your bond back with our comprehensive move-out cleaning service.
                        </p>
                    </div>
                )}
            </div>

            {/* Only show the following sections if moveType is selected */}
            {additionalOptions.moveType && (
                <>
                    {/* Home Size Selection - Improved Layout */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h4 className="font-medium text-gray-900">Select Home Size</h4>
                                <p className="text-sm text-gray-600 mt-1">
                                    Choose the size of your property
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {homeTypes.slice(0, -1).map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => handleSizeSelect(type.id)}
                                    className={`p-4 rounded-lg border-2 transition-all
                                        ${selectedSize === type.id
                                            ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                            : 'border-gray-200 hover:border-[#90c2f7]'
                                        }`}
                                >
                                    <div className="font-medium text-center">{type.label}</div>
                                </button>
                            ))}
                        </div>
                        
                        {/* 5+ Bedrooms as full width */}
                        <div className="mt-4">
                            <button
                                onClick={() => setShowLargeHomeDialog(true)}
                                className={`w-full p-4 rounded-lg border-2 transition-all
                                    ${selectedSize === '5plus'
                                        ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                        : 'border-gray-200 hover:border-[#90c2f7]'
                                    }`}
                            >
                                <div className="font-medium text-center">5+ Bedrooms</div>
                            </button>
                        </div>
                    </div>

                    {/* Property Details */}
                    {selectedSize && (
                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                            <h4 className="font-medium text-gray-900 mb-6">Property Details</h4>
                            <div className="space-y-6">
                                {/* Bathrooms and Toilets in same line */}
                                <div className="flex gap-6">
                                    {/* Bathrooms */}
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
                                            className="w-48 p-3 border border-gray-200 rounded-lg
                                                focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                        >
                                            {[1, 2, 3, 4, 5].map((num) => (
                                                <option key={num} value={num}>
                                                    {num} {num === 1 ? 'Bathroom' : 'Bathrooms'}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Toilets */}
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
                                            className="w-48 p-3 border border-gray-200 rounded-lg
                                                focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                        >
                                            {[1, 2, 3, 4, 5].map((num) => (
                                                <option key={num} value={num}>
                                                    {num} {num === 1 ? 'Toilet' : 'Toilets'}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Property Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Property Type
                                    </label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { id: 'single', label: 'Single Story' },
                                            { id: 'double', label: 'Double Story' },
                                            { id: 'apartment', label: 'Apartment' }
                                        ].map((type) => (
                                            <button
                                                key={type.id}
                                                onClick={() => setAdditionalOptions({
                                                    ...additionalOptions,
                                                    propertyType: type.id as 'single' | 'double' | 'apartment'
                                                })}
                                                className={`p-3 rounded-lg border-2 transition-all
                                                    ${additionalOptions.propertyType === type.id
                                                        ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                                        : 'border-gray-200 hover:border-[#90c2f7]'
                                                    }`}
                                            >
                                                {type.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Furnished Status - Toggle */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Is the property furnished?
                                    </label>
                                    <div className="flex items-center">
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
                                        <span className="ml-3 text-sm text-gray-600">
                                            {additionalOptions.isFurnished ? 'Yes' : 'No'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Carpet Cleaning - Toggle */}
                    {selectedSize && (
                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                            <h4 className="font-medium text-gray-900 mb-6">Carpet Cleaning</h4>
                            <div className="space-y-6">
                                {/* Need Carpet Cleaning */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Do you need carpet cleaning?
                                    </label>
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => setAdditionalOptions({
                                                ...additionalOptions,
                                                needsCarpetCleaning: !additionalOptions.needsCarpetCleaning
                                            })}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                                ${additionalOptions.needsCarpetCleaning ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                                    ${additionalOptions.needsCarpetCleaning ? 'translate-x-6' : 'translate-x-1'}`}
                                            />
                                        </button>
                                        <span className="ml-3 text-sm text-gray-600">
                                            {additionalOptions.needsCarpetCleaning ? 'Yes' : 'No'}
                                        </span>
                                    </div>
                                </div>

                                {/* Carpet Areas */}
                                {additionalOptions.needsCarpetCleaning && (
                                    <div className="space-y-6">
                                        {/* Bedrooms */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Number of Carpeted Bedrooms
                                            </label>
                                            <select
                                                value={additionalOptions.carpetAreas.bedrooms}
                                                onChange={(e) => setAdditionalOptions({
                                                    ...additionalOptions,
                                                    carpetAreas: {
                                                        ...additionalOptions.carpetAreas,
                                                        bedrooms: parseInt(e.target.value)
                                                    }
                                                })}
                                                className="w-full p-3 border border-gray-200 rounded-lg
                                                    focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                            >
                                                {[0, 1, 2, 3, 4, 5].map((num) => (
                                                    <option key={num} value={num}>
                                                        {num} {num === 1 ? 'Bedroom' : 'Bedrooms'}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Lounge Rooms */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Number of Carpeted Living Areas
                                            </label>
                                            <select
                                                value={additionalOptions.carpetAreas.loungeRooms}
                                                onChange={(e) => setAdditionalOptions({
                                                    ...additionalOptions,
                                                    carpetAreas: {
                                                        ...additionalOptions.carpetAreas,
                                                        loungeRooms: parseInt(e.target.value)
                                                    }
                                                })}
                                                className="w-full p-3 border border-gray-200 rounded-lg
                                                    focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                            >
                                                {[0, 1, 2, 3].map((num) => (
                                                    <option key={num} value={num}>
                                                        {num} {num === 1 ? 'Living Area' : 'Living Areas'}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Additional Areas - Toggles */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Additional Carpeted Areas
                                            </label>
                                            <div className="space-y-3">
                                                {/* Hallway Toggle */}
                                                <div className="flex items-center">
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
                                                        <span
                                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                                                ${additionalOptions.carpetAreas.hallway ? 'translate-x-6' : 'translate-x-1'}`}
                                                        />
                                                    </button>
                                                    <span className="ml-3 text-sm text-gray-600">Hallway</span>
                                                </div>

                                                {/* Stairs Toggle */}
                                                <div className="flex items-center">
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
                                                        <span
                                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                                                ${additionalOptions.carpetAreas.stairs ? 'translate-x-6' : 'translate-x-1'}`}
                                                        />
                                                    </button>
                                                    <span className="ml-3 text-sm text-gray-600">Stairs</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Carpet Cleaning Cost */}
                                        <div className="p-4 bg-[#e6f0fa] rounded-lg">
                                            <div className="flex justify-between items-center">
                                                <div className="text-gray-900">Carpet Cleaning Cost:</div>
                                                <div className="font-semibold text-[#1E3D8F]">
                                                    ${calculateCarpetCleaningCost().toFixed(2)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Kitchen Condition */}
                    {selectedSize && (
                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                            <h4 className="font-medium text-gray-900 mb-6">Kitchen Condition</h4>
                            <div className="space-y-6">
                                <label className="block text-sm font-medium text-gray-700">
                                    Rate the current condition of your kitchen
                                </label>
                                
                                {/* Slider with Numbers */}
                                <div className="relative pt-6">
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        value={additionalOptions.kitchenCondition}
                                        onChange={(e) => setAdditionalOptions({
                                            ...additionalOptions,
                                            kitchenCondition: parseInt(e.target.value)
                                        })}
                                        className="w-full accent-[#1E3D8F]"
                                    />
                                    
                                    {/* Number Labels */}
                                    <div className="flex justify-between px-1 mt-2">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                            <div
                                                key={num}
                                                className={`flex flex-col items-center transition-colors
                                                    ${num === additionalOptions.kitchenCondition ? 'text-[#1E3D8F]' : 'text-gray-400'}`}
                                            >
                                                <span className="text-xs font-medium">{num}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Description Labels */}
                                    <div className="flex justify-between text-sm text-gray-600 mt-4">
                                        <span className="font-medium text-red-500">Very Dirty</span>
                                        <span className="font-medium text-green-500">Very Clean</span>
                                    </div>
                                </div>

                                {/* Condition Messages */}
                                {additionalOptions.kitchenCondition <= 3 && (
                                    <div className="p-4 bg-[#fff4f4] rounded-lg border border-red-200">
                                        <p className="text-sm text-red-600">
                                            Heavy cleaning surcharge of $75 will be applied
                                        </p>
                                    </div>
                                )}
                                {additionalOptions.kitchenCondition > 3 && additionalOptions.kitchenCondition <= 5 && (
                                    <div className="p-4 bg-[#fff8f0] rounded-lg border border-orange-200">
                                        <p className="text-sm text-orange-600">
                                            Moderate cleaning surcharge of $35 will be applied
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Additional Options */}
                    {selectedSize && (
                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                            <h4 className="font-medium text-gray-900 mb-6">Additional Options</h4>
                            <div className="space-y-6">
                                {/* Parking Type - Simplified Dropdown */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Parking Type
                                    </label>
                                    <select
                                        value={additionalOptions.parkingType}
                                        onChange={(e) => setAdditionalOptions({
                                            ...additionalOptions,
                                            parkingType: e.target.value as 'none' | 'street' | 'provided' | 'paid'
                                        })}
                                        className="w-48 p-3 border border-gray-200 rounded-lg
                                            focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                    >
                                        <option value="street">Street Parking</option>
                                        <option value="provided">Free Parking</option>
                                        <option value="paid">Paid Parking</option>
                                        <option value="none">No Parking</option>
                                    </select>
                                </div>

                                {/* Pets */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Did you have any pets in the property?
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => setAdditionalOptions({
                                                ...additionalOptions,
                                                hadPets: true
                                            })}
                                            className={`p-3 rounded-lg border-2 transition-all
                                                ${additionalOptions.hadPets
                                                    ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                                    : 'border-gray-200 hover:border-[#90c2f7]'
                                                }`}
                                        >
                                            Yes
                                        </button>
                                        <button
                                            onClick={() => setAdditionalOptions({
                                                ...additionalOptions,
                                                hadPets: false
                                            })}
                                            className={`p-3 rounded-lg border-2 transition-all
                                                ${!additionalOptions.hadPets
                                                    ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                                    : 'border-gray-200 hover:border-[#90c2f7]'
                                                }`}
                                        >
                                            No
                                        </button>
                                    </div>
                                </div>

                                {/* Extra Services */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Extra Services
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {endOfLeaseFeatures.extras.map((extra) => (
                                            <button
                                                key={extra.name}
                                                onClick={() => setAdditionalOptions({
                                                    ...additionalOptions,
                                                    selectedExtras: additionalOptions.selectedExtras.includes(extra.name)
                                                        ? additionalOptions.selectedExtras.filter(e => e !== extra.name)
                                                        : [...additionalOptions.selectedExtras, extra.name]
                                                })}
                                                className={`p-4 rounded-lg border-2 transition-all relative
                                                    ${additionalOptions.selectedExtras.includes(extra.name)
                                                        ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                                        : 'border-gray-200 hover:border-[#90c2f7]'
                                                    }`}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <span>{extra.name}</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[#1E3D8F] font-medium">+${extra.price}</span>
                                                        {additionalOptions.selectedExtras.includes(extra.name) && (
                                                            <Check className="w-5 h-5 text-[#1E3D8F]" />
                                                        )}
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Hours Selection */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h4 className="font-medium text-gray-900">Service Duration</h4>
                                <p className="text-sm text-gray-600 mt-1">
                                    Select how many hours you need
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Preset Hours */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {['2', '3', '4', '5'].map((hour) => (
                                    <button
                                        key={hour}
                                        onClick={() => setAdditionalOptions({
                                            ...additionalOptions,
                                            hours: {
                                                selected: hour as '2' | '3' | '4' | '5',
                                                customHours: parseInt(hour)
                                            }
                                        })}
                                        className={`p-4 rounded-lg border-2 transition-all
                                            ${additionalOptions.hours.selected === hour
                                                ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                                : 'border-gray-200 hover:border-[#90c2f7]'
                                            }`}
                                    >
                                        <div className="font-medium text-center">{hour} Hours</div>
                                        <div className="text-sm text-gray-600 text-center mt-1">
                                            ${(additionalOptions.moveType === 'in' ? 48.50 : 63.05 * parseInt(hour)).toFixed(2)}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Custom Hours */}
                            <div>
                                <button
                                    onClick={() => setAdditionalOptions({
                                        ...additionalOptions,
                                        hours: {
                                            selected: 'custom',
                                            customHours: additionalOptions.hours.customHours
                                        }
                                    })}
                                    className={`w-full p-4 rounded-lg border-2 transition-all mb-2
                                        ${additionalOptions.hours.selected === 'custom'
                                            ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                            : 'border-gray-200 hover:border-[#90c2f7]'
                                        }`}
                                >
                                    <div className="font-medium">Custom Hours</div>
                                </button>

                                {additionalOptions.hours.selected === 'custom' && (
                                    <div className="flex items-center gap-4 mt-3">
                                        <div className="flex-1">
                                            <input
                                                type="range"
                                                min="2"
                                                max="12"
                                                value={additionalOptions.hours.customHours}
                                                onChange={(e) => setAdditionalOptions({
                                                    ...additionalOptions,
                                                    hours: {
                                                        selected: 'custom',
                                                        customHours: parseInt(e.target.value)
                                                    }
                                                })}
                                                className="w-full accent-[#1E3D8F]"
                                            />
                                            <div className="flex justify-between text-sm text-gray-600 mt-1">
                                                <span>2 hrs</span>
                                                <span>12 hrs</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-medium">
                                                {additionalOptions.hours.customHours} Hours
                                            </div>
                                            <div className="text-sm text-[#1E3D8F]">
                                                ${(additionalOptions.moveType === 'in' ? 48.50 : 63.05 * additionalOptions.hours.customHours).toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Price Summary and Next Step */}
                    {selectedSize && (
                        <>
                            {/* Price Summary */}
                            <div className="bg-white p-6 rounded-xl border border-gray-200">
                                <h4 className="font-medium text-gray-900 mb-6">Price Summary</h4>
                                <div className="space-y-3">
                                    {/* Hourly Rate */}
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Hourly Rate:</span>
                                        <span className="font-medium">
                                            ${additionalOptions.moveType === 'in' ? '48.50' : '63.05'}
                                        </span>
                                    </div>

                                    {/* Number of Hours */}
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Number of Hours:</span>
                                        <span className="font-medium">
                                            {additionalOptions.hours.selected === 'custom' 
                                                ? additionalOptions.hours.customHours 
                                                : additionalOptions.hours.selected}
                                        </span>
                                    </div>

                                    {/* Service Cost */}
                                    <div className="flex justify-between text-sm border-t border-gray-100 pt-2">
                                        <span className="text-gray-600">Service Cost:</span>
                                        <span className="font-medium">
                                            ${(additionalOptions.moveType === 'in' ? 48.50 : 63.05 * 
                                                (additionalOptions.hours.selected === 'custom' 
                                                    ? additionalOptions.hours.customHours 
                                                    : parseInt(additionalOptions.hours.selected))).toFixed(2)}
                                        </span>
                                    </div>

                                    {/* Carpet Cleaning if selected */}
                                    {additionalOptions.needsCarpetCleaning && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Carpet Cleaning:</span>
                                            <span className="font-medium">+${calculateCarpetCleaningCost().toFixed(2)}</span>
                                        </div>
                                    )}

                                    {/* Extra Services */}
                                    {additionalOptions.selectedExtras.map((extraName) => {
                                        const extra = endOfLeaseFeatures.extras.find(e => e.name === extraName);
                                        return extra && (
                                            <div key={extra.name} className="flex justify-between text-sm">
                                                <span className="text-gray-600">{extra.name}:</span>
                                                <span className="font-medium">+${extra.price.toFixed(2)}</span>
                                            </div>
                                        );
                                    })}

                                    {/* Total */}
                                    <div className="border-t border-gray-200 pt-3 mt-3">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-gray-900">Total Price:</span>
                                            <span className="text-lg font-semibold text-[#1E3D8F]">
                                                ${calculateTotalPrice().toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Price Note */}
                                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                        <p className="text-sm text-gray-600 italic">
                                            Note: Final price may vary based on the actual condition and requirements assessed during the service.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Error Message Display */}
                            {submitError && (
                                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                                    {submitError}
                                </div>
                            )}

                            {/* Update the submit button to show loading state */}
                            <div className="bg-white p-6 rounded-xl border border-gray-200">
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
                        </>
                    )}
                </>
            )}

            {/* Large Home Dialog */}
            {showLargeHomeDialog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Large Home Cleaning
                        </h3>
                        <p className="text-gray-600 mb-6">
                            For homes with 5 or more bedrooms, we recommend discussing your specific requirements to provide an accurate quote.
                        </p>
                        <div className="space-y-3">
                            <button
                                onClick={() => {
                                    // Open phone dialer
                                    window.location.href = 'tel:1300381925';
                                }}
                                className="w-full py-3 px-4 rounded-lg bg-[#1E3D8F] text-white
                                    hover:bg-[#1E3D8F]/90 transition-colors flex items-center justify-center gap-2"
                            >
                                <Phone className="w-5 h-5" />
                                Request Quote
                            </button>
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