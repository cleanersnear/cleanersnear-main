'use client';

import { useRouter } from 'next/navigation';
import { Check, Phone, Info } from 'lucide-react';
import { useBookingStore } from '../../../store/bookingStore';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { updateServiceStorage } from '@/app/quick-book/utils/serviceStorage'

import type { 
    HomeSizeType,
    RegularFrequencyType,
    PricingType,
    ParkingType,
    GeneralCleaningState,
    ExtraService,
    
    
} from '../../../types/serviceinterface/generalcleaning';

// Constants
const INITIAL_BASE_PRICE = {
    'studio': 178,
    '1bed': 180,
    '2bed': 212,
    '3bed': 309,
    '4bed': 395,
    '5plus': 450
} as const;

const EXTRA_SERVICES: ExtraService[] = [
    { id: 'balcony', name: 'Balcony/Patio Clean', price: 25 },
    { id: 'garage', name: 'Garage Clean', price: 30 },
    { id: 'windows', name: 'Windows Clean', price: 35 },
    { id: 'fridge', name: 'Inside Fridge', price: 25 },
    { id: 'cabinets', name: 'Inside Cabinets', price: 30 },
    { id: 'spring', name: 'Spring Cleaning', price: 60 }
];

// Remove old interfaces and use imported ones

export default function GeneralClean() {
    const router = useRouter();
    const setGeneralCleaningDetails = useBookingStore(state => state.setGeneralCleaningDetails);
    
    // Form progress state
    const [formProgress, setFormProgress] = useState({
        sizeSelected: false,
        frequencySelected: false,
        pricingTypeSelected: false
    });

    // Main booking state using new interface
    const [bookingState, setBookingState] = useState<GeneralCleaningState>({
        propertyDetails: {
            size: '1bed',
            bathrooms: '1',
            toilets: '1',
            propertyType: 'single'
        },
        serviceFrequency: {
            type: 'once-off'
        },
        pricing: {
            type: 'flat'
        },
        additionalOptions: {
            hasPets: false,
            parkingType: 'none',
            selectedExtras: [],
            additionalNotes: ''
        },
        totalPrice: 0,
        priceBreakdown: [],
        isSubmitting: false
    });

    // UI states
    const [showLargeHomeDialog, setShowLargeHomeDialog] = useState(false);

    const [selectedSize, setSelectedSize] = useState<HomeSizeType>('1bed');
    
    const homeTypes = useMemo(() => [
        { id: 'studio', label: 'Studio' },
        { id: '1bed', label: '1 Bedroom' },
        { id: '2bed', label: '2 Bedrooms' },
        { id: '3bed', label: '3 Bedrooms' },
        { id: '4bed', label: '4 Bedrooms' },
        { id: '5plus', label: '5+ Bedrooms' }
    ], []);

    const calculateExtrasTotal = useCallback(() => {
        const extrasMap = {
            balcony: 25,
            garage: 30,
            windows: 35,
            fridge: 25,
            cabinets: 30,
            spring: 60
        };
        
        return bookingState.additionalOptions.selectedExtras.reduce((total, extraId) => 
            total + (extrasMap[extraId as keyof typeof extrasMap] || 0), 0);
    }, [bookingState.additionalOptions.selectedExtras]);
 

    const calculatePrice = useCallback(() => {
        let basePrice = INITIAL_BASE_PRICE[selectedSize];
        let totalPrice = 0;
        const hourlyRate = 45; // Default hourly rate

        // Calculate discount rate based on frequency
        let discountRate = 0;
        if (bookingState.serviceFrequency.type === 'regular' && bookingState.serviceFrequency.regularFrequency) {
            const discountRates = {
                'weekly': 0.15,    // 15% discount
                'biweekly': 0.05,  // 5% discount
                'monthly': 0       // 0% discount
            };
            discountRate = discountRates[bookingState.serviceFrequency.regularFrequency] || 0;
        }

        if (bookingState.pricing.type === 'hourly') {
            // For hourly rate, only consider hours and frequency discount
            const hours = bookingState.pricing.hours || bookingState.pricing.customHours || 0;
            const discountedRate = hourlyRate * (1 - discountRate);
            basePrice = hourlyRate * hours;
            totalPrice = discountedRate * hours;
        } else {
            // For flat rate, use base price by home size and apply discount
            basePrice = INITIAL_BASE_PRICE[selectedSize];
            totalPrice = basePrice * (1 - discountRate);
        }

        return {
            basePrice,
            totalPrice: Math.round(totalPrice),
            discountAmount: Math.round(basePrice - totalPrice),
            discountRate,
            hourlyRate: bookingState.pricing.type === 'hourly' ? 
                hourlyRate * (1 - discountRate) : 
                null
        };
    }, [selectedSize, bookingState.serviceFrequency.type, bookingState.serviceFrequency.regularFrequency, bookingState.pricing]);

    const handleSizeSelect = (sizeId: string) => {
        if (sizeId === '5plus') {
            setShowLargeHomeDialog(true);
        } else {
            setSelectedSize(sizeId as HomeSizeType);
            setFormProgress(prev => ({ ...prev, sizeSelected: true }));
        }
    };

    async function handleBookingSubmit() {
        if (bookingState.isSubmitting) return;

        try {
            setBookingState(prev => ({ ...prev, isSubmitting: true }));

            const priceCalculation = calculatePrice();
            const priceBreakdown = [];

            // Add base price to breakdown
            if (bookingState.pricing.type === 'hourly') {
                const hours = bookingState.pricing.hours || bookingState.pricing.customHours || 0;
                priceBreakdown.push({ 
                    description: `Hourly Rate (${hours} hours)`, 
                    amount: priceCalculation.basePrice 
                });
            } else {
                priceBreakdown.push({ 
                    description: `Base Price (${homeTypes.find(t => t.id === selectedSize)?.label})`, 
                    amount: priceCalculation.basePrice 
                });
            }
            
            // Add discount if applicable
            if (priceCalculation.discountAmount > 0) {
                priceBreakdown.push({
                    description: `Regular Cleaning Discount (${(priceCalculation.discountRate * 100)}%)`,
                    amount: -priceCalculation.discountAmount
                });
            }

            // Add extras
            bookingState.additionalOptions.selectedExtras.forEach(extraId => {
                const extrasMap = {
                    balcony: { name: 'Balcony/Patio Clean', price: 25 },
                    garage: { name: 'Garage Clean', price: 30 },
                    windows: { name: 'Windows Clean', price: 35 },
                    fridge: { name: 'Inside Fridge', price: 25 },
                    cabinets: { name: 'Inside Cabinets', price: 30 },
                    spring: { name: 'Spring Cleaning', price: 60 }
                };
                const extra = extrasMap[extraId as keyof typeof extrasMap];
                if (extra) {
                    priceBreakdown.push({
                        description: extra.name,
                        amount: extra.price
                    });
                }
            });

            // Create service data
            const serviceData = {
                name: "General Cleaning",
                type: "general-cleaning" as const,
                price: priceCalculation.totalPrice + calculateExtrasTotal(),
                details: {
                    propertyDetails: bookingState.propertyDetails,
                    serviceFrequency: bookingState.serviceFrequency,
                    pricing: bookingState.pricing,
                    additionalOptions: bookingState.additionalOptions,
                    totalPrice: priceCalculation.totalPrice + calculateExtrasTotal(),
                    priceBreakdown
                }
            };

            // Save to Zustand store
            setGeneralCleaningDetails(serviceData.details);
            
            // Save to localStorage for persistence
            localStorage.setItem('selectedService', JSON.stringify(serviceData));

            // Navigate to next step
            router.push('/quick-book/details');

        } catch (error) {
            console.error('Error preparing general cleaning data:', error);
            setBookingState(prev => ({ ...prev, submitError: error instanceof Error ? error.message : 'An unexpected error occurred' }));
        } finally {
            setBookingState(prev => ({ ...prev, isSubmitting: false }));
        }
    }

    // Add frequency selection handler
    const handleFrequencySelect = (frequency: 'once-off' | 'regular') => {
        setBookingState(prev => ({
            ...prev,
            serviceFrequency: {
                ...prev.serviceFrequency,
                type: frequency
            }
        }));
        setFormProgress(prev => ({ ...prev, frequencySelected: true }));
    };

    // Add pricing type selection handler
    const handlePricingTypeSelect = (type: PricingType) => {
        setBookingState(prev => ({
            ...prev,
            pricing: {
                ...prev.pricing,
                type
            }
        }));
        setFormProgress(prev => ({ ...prev, pricingTypeSelected: true }));
    };

    // Add useEffect at the top level of the GeneralClean component
    useEffect(() => {
        if (selectedSize && selectedSize !== '5plus') {
            try {
                const priceCalc = calculatePrice();
                
                const priceBreakdown = [];

                // Add base price to breakdown
                if (bookingState.pricing.type === 'hourly') {
                    const hours = bookingState.pricing.hours || bookingState.pricing.customHours || 0;
                    priceBreakdown.push({ 
                        description: `Hourly Rate (${hours} hours)`, 
                        amount: priceCalc.basePrice 
                    });
                } else {
                    priceBreakdown.push({ 
                        description: `Base Price (${homeTypes.find(t => t.id === selectedSize)?.label})`, 
                        amount: priceCalc.basePrice 
                    });
                }
                
                // Add discount if applicable
                if (priceCalc.discountAmount > 0) {
                    priceBreakdown.push({
                        description: `Regular Cleaning Discount (${(priceCalc.discountRate * 100)}%)`,
                        amount: -priceCalc.discountAmount
                    });
                }

                // Add extras
                bookingState.additionalOptions.selectedExtras.forEach(extraId => {
                    const extrasMap = {
                        balcony: { name: 'Balcony/Patio Clean', price: 25 },
                        garage: { name: 'Garage Clean', price: 30 },
                        windows: { name: 'Windows Clean', price: 35 },
                        fridge: { name: 'Inside Fridge', price: 25 },
                        cabinets: { name: 'Inside Cabinets', price: 30 },
                        spring: { name: 'Spring Cleaning', price: 60 }
                    };
                    const extra = extrasMap[extraId as keyof typeof extrasMap];
                    if (extra) {
                        priceBreakdown.push({
                            description: extra.name,
                            amount: extra.price
                        });
                    }
                });

                // Update service data for booking summary
                const details = {
                    frequency: bookingState.serviceFrequency.type,
                    regularFrequency: bookingState.serviceFrequency.regularFrequency,
                    pricingType: bookingState.pricing.type,
                    hours: bookingState.pricing.hours || bookingState.pricing.customHours,
                    pricing: {
                        totalPrice: priceCalc.totalPrice + calculateExtrasTotal(),
                        priceBreakdown: priceBreakdown
                    }
                };

                // Add updateServiceStorage next to existing localStorage update
                updateServiceStorage(
                    'general-cleaning',
                    details,
                    'General Cleaning'
                );

                // Keep existing localStorage update for backward compatibility
                localStorage.setItem('selectedService', JSON.stringify({
                    type: 'general-cleaning',
                    name: 'General Cleaning',
                    homeSize: homeTypes.find(t => t.id === selectedSize)?.label,
                    price: priceCalc.totalPrice + calculateExtrasTotal(),
                    basePrice: priceCalc.basePrice,
                    extrasTotal: calculateExtrasTotal(),
                    priceBreakdown,
                    details
                }));
                window.dispatchEvent(new CustomEvent('localStorageChange'));
            } catch (error) {
                console.error('Error updating service data:', error);
            }
        }
    }, [
        selectedSize,
        bookingState.serviceFrequency.type,
        bookingState.serviceFrequency.regularFrequency,
        bookingState.pricing.type,
        bookingState.pricing.hours,
        bookingState.pricing.customHours,
        bookingState.additionalOptions.selectedExtras,
        formProgress.pricingTypeSelected,
        bookingState.propertyDetails,
        calculatePrice,
        calculateExtrasTotal,
        homeTypes
    ]);

    return (
        <div className="space-y-6 relative">
            {/* Home Size Selection - Always visible first */}
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

            {/* Service Frequency - Only show after size is selected */}
            {formProgress.sizeSelected && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Select Service Frequency</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Once-off Option */}
                        <button
                            onClick={() => handleFrequencySelect('once-off')}
                            className={`p-4 rounded-xl border-2 transition-all text-left
                                ${bookingState.serviceFrequency.type === 'once-off'
                                    ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                    : 'border-gray-200 hover:border-[#90c2f7]'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-gray-900">Once-off Clean</h5>
                                {bookingState.serviceFrequency.type === 'once-off' && (
                                    <Check className="w-5 h-5 text-[#1E3D8F]" />
                                )}
                            </div>
                            <p className="text-sm text-gray-600">
                                Single cleaning service without any commitment
                            </p>
                            <div className="mt-3 text-[#1E3D8F] font-medium">
                                From ${INITIAL_BASE_PRICE[selectedSize]}
                            </div>
                        </button>

                        {/* Regular Option */}
                        <button
                            onClick={() => handleFrequencySelect('regular')}
                            className={`p-4 rounded-xl border-2 transition-all text-left
                                ${bookingState.serviceFrequency.type === 'regular'
                                    ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                    : 'border-gray-200 hover:border-[#90c2f7]'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-gray-900">Regular Clean</h5>
                                {bookingState.serviceFrequency.type === 'regular' && (
                                    <Check className="w-5 h-5 text-[#1E3D8F]" />
                                )}
                            </div>
                            <p className="text-sm text-gray-600">
                                Scheduled cleaning with up to 15% discount
                            </p>
                            <div className="mt-3 text-[#1E3D8F] font-medium">
                                From ${Math.round(INITIAL_BASE_PRICE[selectedSize] * 0.85)}
                            </div>
                        </button>
                    </div>

                    {/* Regular Cleaning Options - Only show when Regular is selected */}
                    {bookingState.serviceFrequency.type === 'regular' && (
                        <div className="mt-6 space-y-6 pt-6 border-t border-gray-200">
                            {/* Frequency Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    How often would you like your clean?
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {[
                                        { value: 'weekly', label: 'Weekly', discount: '15%' },
                                        { value: 'biweekly', label: 'Every 2 Weeks', discount: '5%' },
                                        { value: 'monthly', label: 'Monthly', discount: '0%' }
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => setBookingState(prev => ({
                                                ...prev,
                                                serviceFrequency: {
                                                    ...prev.serviceFrequency,
                                                    regularFrequency: option.value as RegularFrequencyType
                                                }
                                            }))}
                                            className={`p-3 rounded-lg border-2 transition-all
                                                ${bookingState.serviceFrequency.regularFrequency === option.value
                                                    ? 'border-[#1E3D8F] bg-[#e6f0fa] text-[#1E3D8F]'
                                                    : 'border-gray-200 hover:border-[#90c2f7]'
                                                }`}
                                        >
                                            <div className="font-medium">{option.label}</div>
                                            <div className="text-sm mt-1 text-green-600">Save {option.discount}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Pricing Type - Only show after frequency is selected */}
            {formProgress.frequencySelected && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Select Pricing Type</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Hourly Rate Option */}
                        <button
                            onClick={() => handlePricingTypeSelect('hourly')}
                            className={`p-4 rounded-xl border-2 transition-all text-left
                                ${bookingState.pricing.type === 'hourly'
                                    ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                    : 'border-gray-200 hover:border-[#90c2f7]'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-gray-900">Hourly Rate</h5>
                                {bookingState.pricing.type === 'hourly' && (
                                    <Check className="w-5 h-5 text-[#1E3D8F]" />
                                )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                                Pay by the hour, perfect for custom cleaning needs
                            </p>
                            <div className="text-[#1E3D8F] font-medium">
                                ${Math.round(45 * (1 - calculatePrice().discountRate))}/hour
                                {calculatePrice().discountRate > 0 && (
                                    <span className="ml-2 text-sm text-green-600">
                                        Save {(calculatePrice().discountRate * 100)}%
                                    </span>
                                )}
                            </div>
                        </button>

                        {/* Flat Rate Option */}
                        <button
                            onClick={() => handlePricingTypeSelect('flat')}
                            className={`p-4 rounded-xl border-2 transition-all text-left
                                ${bookingState.pricing.type === 'flat'
                                    ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                    : 'border-gray-200 hover:border-[#90c2f7]'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-gray-900">Flat Rate</h5>
                                {bookingState.pricing.type === 'flat' && (
                                    <Check className="w-5 h-5 text-[#1E3D8F]" />
                                )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                                Fixed price based on your home size
                            </p>
                            <div className="text-[#1E3D8F] font-medium">
                                From ${Math.round(INITIAL_BASE_PRICE[selectedSize] * (1 - calculatePrice().discountRate))}
                                {calculatePrice().discountRate > 0 && (
                                    <span className="ml-2 text-sm text-green-600">
                                        Save {(calculatePrice().discountRate * 100)}%
                                    </span>
                                )}
                            </div>
                        </button>
                    </div>

                    {/* Hours Selection - Only show for hourly rate */}
                    {bookingState.pricing.type === 'hourly' && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Select Number of Hours
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {[2, 3, 4, 5].map((hour) => {
                                    const hourlyRate = Math.round(45 * (1 - calculatePrice().discountRate));
                                    return (
                                    <button
                                        key={hour}
                                        onClick={() => setBookingState(prev => ({
                                            ...prev,
                                            pricing: {
                                                ...prev.pricing,
                                                hours: hour,
                                                customHours: undefined
                                            }
                                        }))}
                                        className={`p-3 rounded-lg border-2 transition-all
                                            ${bookingState.pricing.hours === hour && !bookingState.pricing.customHours
                                                ? 'border-[#1E3D8F] bg-[#e6f0fa] text-[#1E3D8F]'
                                                : 'border-gray-200 hover:border-[#90c2f7]'
                                            }`}
                                    >
                                        <div className="font-medium">{hour} Hours</div>
                                            <div className="text-sm mt-1 text-[#1E3D8F]">
                                                ${hour * hourlyRate}
                                                {calculatePrice().discountRate > 0 && (
                                                    <span className="ml-1 text-green-600 text-xs">
                                                        Save {(calculatePrice().discountRate * 100)}%
                                                    </span>
                                                )}
                                            </div>
                                    </button>
                                    );
                                })}
                                
                                {/* Custom Hours Input */}
                                <div className="col-span-2 sm:col-span-4 mt-3">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Need more hours?
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="number"
                                            min="6"
                                            max="9"
                                            value={bookingState.pricing.customHours || ''}
                                            onChange={(e) => {
                                                const value = parseInt(e.target.value);
                                                if (!isNaN(value) && value >= 6 && value <= 9) {
                                                    setBookingState(prev => ({
                                                        ...prev,
                                                        pricing: {
                                                            ...prev.pricing,
                                                            hours: undefined,
                                                            customHours: value
                                                        }
                                                    }));
                                                } else if (e.target.value === '') {
                                                    setBookingState(prev => ({
                                                        ...prev,
                                                        pricing: {
                                                            ...prev.pricing,
                                                            customHours: undefined
                                                        }
                                                    }));
                                                }
                                            }}
                                            placeholder="Enter hours (6-9)"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 
                                                focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20 
                                                outline-none transition-all"
                                        />
                                        {bookingState.pricing.customHours && (
                                            <div className="text-[#1E3D8F] font-medium whitespace-nowrap">
                                                ${bookingState.pricing.customHours * Math.round(45 * (1 - calculatePrice().discountRate))}
                                                {calculatePrice().discountRate > 0 && (
                                                    <span className="ml-1 text-green-600 text-xs">
                                                        Save {(calculatePrice().discountRate * 100)}%
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            <p className="mt-4 text-sm text-gray-500">
                                Not sure how many hours? We recommend:
                                <br />
                                • Studio: 2 hours
                                <br />
                                • 1 Bed: 3 hours
                                <br />
                                • 2 Bed: 4 hours
                                <br />
                                • 3 Bed: 5 hours
                                <br />
                                • Larger homes may require additional hours
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Additional Details Section */}
            {formProgress.pricingTypeSelected && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Additional Details</h4>
                    
                    {/* Bathrooms and Toilets Row */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex flex-col">
                            <label className="text-sm text-gray-600 mb-2">Number of Bathrooms</label>
                            <select
                                value={bookingState.propertyDetails.bathrooms}
                                onChange={(e) => setBookingState(prev => ({
                                    ...prev,
                                    propertyDetails: {
                                        ...prev.propertyDetails,
                                        bathrooms: e.target.value
                                    }
                                }))}
                                className="px-4 py-2 rounded-lg border border-gray-200 
                                    focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20 
                                    outline-none transition-all"
                            >
                                {['1', '2', '3', '4', '5'].map((num) => (
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
                                onChange={(e) => setBookingState(prev => ({
                                    ...prev,
                                    propertyDetails: {
                                        ...prev.propertyDetails,
                                        toilets: e.target.value
                                    }
                                }))}
                                className="px-4 py-2 rounded-lg border border-gray-200 
                                    focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20 
                                    outline-none transition-all"
                            >
                                {['1', '2', '3', '4', '5'].map((num) => (
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
                                onClick={() => setBookingState(prev => ({
                                    ...prev,
                                    propertyDetails: {
                                        ...prev.propertyDetails,
                                        propertyType: 'single'
                                    }
                                }))}
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
                                onClick={() => setBookingState(prev => ({
                                    ...prev,
                                    propertyDetails: {
                                        ...prev.propertyDetails,
                                        propertyType: 'double'
                                    }
                                }))}
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
                                onClick={() => setBookingState(prev => ({
                                    ...prev,
                                    propertyDetails: {
                                        ...prev.propertyDetails,
                                        propertyType: 'apartment'
                                    }
                                }))}
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
                    </div>

                    {/* Pets in Property Toggle */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div>
                            <h4 className="font-medium text-gray-900">Pets in Property</h4>
                            <p className="text-sm text-gray-600 mt-1">
                                Have there been any pets living in the property?
                            </p>
                        </div>
                        <button
                            onClick={() => setBookingState(prev => ({
                                ...prev,
                                additionalOptions: {
                                    ...prev.additionalOptions,
                                    hasPets: !prev.additionalOptions.hasPets
                                }
                            }))}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                ${bookingState.additionalOptions.hasPets ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                    ${bookingState.additionalOptions.hasPets ? 'translate-x-6' : 'translate-x-1'}`}
                            />
                        </button>
                    </div>

                    {/* Additional Notes */}
                    <div className="mt-6 border-t border-gray-100 pt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Additional Notes or Special Requirements
                        </label>
                        <textarea
                            value={bookingState.additionalOptions.additionalNotes}
                            onChange={(e) => setBookingState(prev => ({
                                ...prev,
                                additionalOptions: {
                                    ...prev.additionalOptions,
                                    additionalNotes: e.target.value
                                }
                            }))}
                            placeholder="Please provide any additional information that might help us serve you better. For example: specific areas that need attention, access instructions, or any concerns."
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

            {/* Parking Section */}
            {formProgress.pricingTypeSelected && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3">Parking Available?</h4>
                    <p className="text-sm text-gray-600 mb-4">
                        Select parking availability for cleaning access
                    </p>
                    
                    <select
                        value={bookingState.additionalOptions.parkingType}
                        onChange={(e) => setBookingState(prev => ({
                            ...prev,
                            additionalOptions: {
                                ...prev.additionalOptions,
                                parkingType: e.target.value as ParkingType
                            }
                        }))}
                        className="w-full p-3 rounded-lg border border-gray-200 text-gray-600
                            focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]
                            transition-all"
                    >
                        <option value="none">No Parking Available</option>
                        <option value="street">Free Street Parking Available</option>
                        <option value="provided">Parking Will Be Provided</option>
                        <option value="paid">Paid Parking Available</option>
                    </select>
                </div>
            )}

            {/* Optional Extras Section */}
            {formProgress.pricingTypeSelected && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h4 className="font-medium text-gray-900">Optional Extras</h4>
                            <p className="text-sm text-gray-500 mt-1">
                                Select additional services you need
                            </p>
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                            <span>Choose multiple</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {EXTRA_SERVICES.map((extra) => (
                            <div key={extra.id} className="relative">
                                <button
                                    onClick={() => {
                                        const currentExtras = bookingState.additionalOptions.selectedExtras || [];
                                        const isSelected = currentExtras.includes(extra.id);
                                        
                                        setBookingState(prev => ({
                                            ...prev,
                                            additionalOptions: {
                                                ...prev.additionalOptions,
                                                selectedExtras: isSelected
                                                    ? currentExtras.filter(id => id !== extra.id)
                                                    : [...currentExtras, extra.id]
                                            }
                                        }));
                                    }}
                                    className={`w-full p-4 rounded-xl border-2 transition-all text-left relative
                                        ${bookingState.additionalOptions.selectedExtras?.includes(extra.id)
                                            ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                            : 'border-gray-200 hover:border-[#90c2f7]'
                                        }
                                        hover:shadow-md`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-gray-900">{extra.name}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[#1E3D8F] font-medium whitespace-nowrap">
                                                +${extra.price}
                                            </span>
                                            {bookingState.additionalOptions.selectedExtras?.includes(extra.id) && (
                                                <div className="bg-[#1E3D8F] rounded-full p-1">
                                                    <Check className="w-3 h-3 text-white" />
                                                </div>
                                            )}
                                            <div className="relative group/info">
                                                <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
                                                {/* Tooltip */}
                                                <div className="absolute z-10 invisible group-hover/info:visible opacity-0 
                                                    group-hover/info:opacity-100 transition-all duration-200 
                                                    bottom-full right-0 mb-2 w-64">
                                                    <div className="bg-gray-900/90 backdrop-blur-sm text-white text-sm 
                                                        rounded-lg p-3 shadow-lg">
                                                        {extra.description}
                                                        <div className="absolute bottom-0 right-4 transform translate-y-1/2 
                                                            rotate-45 w-2 h-2 bg-gray-900/90">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Your Price Section */}
            {formProgress.pricingTypeSelected && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Your Price</h4>
                    <div className="bg-[#F8FAFC] rounded-lg p-4">
                        {bookingState.pricing.type === 'hourly' ? (
                            <>
                                {/* Hourly Rate Pricing */}
                                <div className="flex justify-between items-center mb-2">
                                    <div className="text-gray-600">Current Rate:</div>
                                    <div className="font-medium text-[#1E3D8F]">
                                        ${Math.round(45 * (1 - calculatePrice().discountRate))}/hour
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <div className="text-gray-600">Hours Selected:</div>
                                    <div className="font-medium text-gray-900">
                                        {bookingState.pricing.hours || bookingState.pricing.customHours || 0} hours
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <div className="text-gray-600">Cleaning Total:</div>
                                    <div className="font-medium text-[#1E3D8F]">
                                        ${calculatePrice().totalPrice}
                                    </div>
                                </div>
                                {calculatePrice().discountRate > 0 && (
                                    <div className="text-sm text-green-600 mt-1">
                                        You saved ${(45 - Math.round(45 * (1 - calculatePrice().discountRate))) * 
                                        (bookingState.pricing.hours || bookingState.pricing.customHours || 0)} 
                                         &nbsp;  from regular price
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                {/* Flat Rate Pricing */}
                                <div className="flex justify-between items-center mb-2">
                                    <div className="text-gray-600">Selected Size:</div>
                                    <div className="font-medium text-gray-900">
                                        {homeTypes.find(t => t.id === selectedSize)?.label}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <div className="text-gray-600">Base Price:</div>
                                    <div className="font-medium text-[#1E3D8F]">
                                        ${INITIAL_BASE_PRICE[selectedSize]}
                                    </div>
                                </div>
                                {calculatePrice().discountRate > 0 && (
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="text-green-600">Regular Clean Discount:</div>
                                        <div className="font-medium text-green-600">
                                            {(calculatePrice().discountRate * 100)}% Off
                                        </div>
                                    </div>
                                )}
                                <div className="flex justify-between items-center mb-2">
                                    <div className="text-gray-600">After Discount:</div>
                                    <div className="font-medium text-[#1E3D8F]">
                                        ${calculatePrice().totalPrice}
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Extras Section - Kept as is */}
                        {bookingState.additionalOptions.selectedExtras.length > 0 && (
                            <div className="border-t border-gray-200 pt-2 mt-2">
                                <div className="text-sm font-medium text-gray-600 mb-2">Selected Extras:</div>
                                {bookingState.additionalOptions.selectedExtras.map(extraId => {
                                    const extrasMap = {
                                        balcony: { name: 'Balcony/Patio Clean', price: 25 },
                                        garage: { name: 'Garage Clean', price: 30 },
                                        windows: { name: 'Windows Clean', price: 35 },
                                        fridge: { name: 'Inside Fridge', price: 25 },
                                        cabinets: { name: 'Inside Cabinets', price: 30 },
                                        spring: { name: 'Spring Cleaning', price: 60 }
                                    };
                                    const extra = extrasMap[extraId as keyof typeof extrasMap];
                                    return extra && (
                                        <div key={extraId} className="flex justify-between items-center text-sm">
                                            <span className="text-gray-600">{extra.name}</span>
                                            <span className="font-medium">+${extra.price}</span>
                                        </div>
                                    );
                                })}
                                <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                                    <span className="text-gray-600">Extras Total:</span>
                                    <span className="font-medium text-[#1E3D8F]">+${calculateExtrasTotal()}</span>
                                </div>
                            </div>
                        )}

                        {/* Final Total */}
                        <div className="border-t border-gray-200 pt-4 mt-2">
                            <div className="flex justify-between items-center">
                                <div className="font-medium text-gray-900">Total Price:</div>
                                <div className="font-semibold text-lg text-[#1E3D8F]">
                                    ${calculatePrice().totalPrice + calculateExtrasTotal()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Next Step Button */}
            {formProgress.pricingTypeSelected && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    {/* Add Error Message Display */}
                    {bookingState.submitError && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                            {bookingState.submitError}
                        </div>
                    )}
                    
                    <button
                        onClick={handleBookingSubmit}
                        className="w-full bg-[#1E3D8F] text-white py-4 px-6 rounded-lg
                            font-medium hover:bg-[#1E3D8F]/90 transition-colors
                            flex items-center justify-center gap-2 text-lg"
                    >
                        Next Step
                        
                    </button>
                </div>
            )}

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
                                    setSelectedSize('4bed');
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
    );
} 