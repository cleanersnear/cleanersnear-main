import { useRouter } from 'next/navigation';
import { Check, Phone, Info } from 'lucide-react';
import type { BaseServiceProps } from '../BaseServiceComponent';
import { generalCleaningService, HomeSizeType } from '@/services/cleaningServices/generalCleaning';
import { useState, useEffect, useMemo, useCallback } from 'react';

interface AdditionalOptions {
    bathrooms: string;
    toilets: string;
    propertyType: 'single' | 'double' | 'apartment';
    frequency: 'once' | 'regular' | null;
    regularFrequency?: 'weekly' | 'biweekly' | 'monthly';
    minContract?: '3' | '6' | '12';
    pricingType: 'hourly' | 'flat' | null;
    hours?: number;
    customHours?: number;
    hasPets: boolean;
    additionalNotes: string;
    parkingType: 'street' | 'provided' | 'paid' | 'none';
    selectedExtras: string[];
    providesEquipment: boolean;
}

// First, define the props type at the top with other interfaces
type GeneralCleanProps = Omit<BaseServiceProps, 'features' | 'id' | 'title' | 'description' | 'basePrice' | 'baseDuration'>;

const INITIAL_BASE_PRICE = 10; // $10 as default base price

const getBasePrice = (size: string): number => {
    const basePrices = {
        'studio': 178,
        '1bed': 180,
        '2bed': 212,
        '3bed': 309,
        '4bed': 395,
        '5plus': 450
    };
    return basePrices[size as keyof typeof basePrices] || INITIAL_BASE_PRICE;
};

export default function GeneralClean({}: GeneralCleanProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    
    const [selectedSize, setSelectedSize] = useState('1bed');
    const [showLargeHomeDialog, setShowLargeHomeDialog] = useState(false);
    const [additionalOptions, setAdditionalOptions] = useState<AdditionalOptions>({
        bathrooms: '1',
        toilets: '1',
        propertyType: 'single',
        frequency: null,
        pricingType: null,
        hasPets: false,
        additionalNotes: '',
        parkingType: 'none',
        selectedExtras: [],
        providesEquipment: false
    });

    // Add new state to track form progress
    const [formProgress, setFormProgress] = useState({
        sizeSelected: false,
        frequencySelected: false,
        pricingTypeSelected: false
    });

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
        
        return additionalOptions.selectedExtras.reduce((total, extraId) => 
            total + (extrasMap[extraId as keyof typeof extrasMap] || 0), 0);
    }, [additionalOptions.selectedExtras]);
 

    const calculatePrice = useCallback(() => {
        let basePrice = INITIAL_BASE_PRICE;
        let totalPrice = 0;
        const hourlyRate = 45; // Default hourly rate

        // Calculate discount rate based on frequency
        let discountRate = 0;
        if (additionalOptions.frequency === 'regular' && additionalOptions.regularFrequency) {
            const discountRates = {
                'weekly': 0.15,    // 15% discount
                'biweekly': 0.05,  // 5% discount
                'monthly': 0       // 0% discount
            };
            discountRate = discountRates[additionalOptions.regularFrequency] || 0;
        }

        if (additionalOptions.pricingType === 'hourly') {
            // For hourly rate, only consider hours and frequency discount
            const hours = additionalOptions.hours || additionalOptions.customHours || 0;
            const discountedRate = hourlyRate * (1 - discountRate);
            basePrice = hourlyRate * hours;
            totalPrice = discountedRate * hours;
        } else {
            // For flat rate, use base price by home size and apply discount
            basePrice = getBasePrice(selectedSize);
            totalPrice = basePrice * (1 - discountRate);
        }

        return {
            basePrice,
            totalPrice: Math.round(totalPrice),
            discountAmount: Math.round(basePrice - totalPrice),
            discountRate,
            hourlyRate: additionalOptions.pricingType === 'hourly' ? 
                hourlyRate * (1 - discountRate) : 
                null
        };
    }, [selectedSize, additionalOptions]);

    // Add new function to calculate extras total





    const handleSizeSelect = (sizeId: string) => {
        if (sizeId === '5plus') {
            setShowLargeHomeDialog(true);
        } else {
            setSelectedSize(sizeId);
            setFormProgress(prev => ({ ...prev, sizeSelected: true }));
        }
    };

    
    

    async function handleBookingSubmit() {
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);
            setSubmitError(null);

            // Calculate price using the service
            const priceCalculation = generalCleaningService.calculatePrice({
                propertyDetails: {
                    size: selectedSize as HomeSizeType,
                    bathrooms: additionalOptions.bathrooms,
                    toilets: additionalOptions.toilets,
                    propertyType: additionalOptions.propertyType,
                },
                serviceFrequency: {
                    type: additionalOptions.frequency,
                    regularFrequency: additionalOptions.regularFrequency,
                    minContract: additionalOptions.minContract,
                },
                pricing: {
                    type: additionalOptions.pricingType,
                    hours: additionalOptions.hours,
                    customHours: additionalOptions.customHours,
                },
                additionalOptions: {
                    hasPets: additionalOptions.hasPets,
                    providesEquipment: additionalOptions.providesEquipment,
                    parkingType: additionalOptions.parkingType,
                    selectedExtras: additionalOptions.selectedExtras,
                    additionalNotes: additionalOptions.additionalNotes,
                }
            });

            // Create service data and store directly in localStorage
            const serviceData = {
                name: "General Clean",
                type: "general-clean" as const,
                price: priceCalculation.total,
                details: {
                    propertyDetails: {
                        size: selectedSize,
                        bathrooms: additionalOptions.bathrooms,
                        toilets: additionalOptions.toilets,
                        propertyType: additionalOptions.propertyType,
                    },
                    frequency: additionalOptions.frequency,
                    regularFrequency: additionalOptions.regularFrequency,
                    pricingType: additionalOptions.pricingType,
                    hours: additionalOptions.hours,
                    extras: additionalOptions.selectedExtras,
                    priceBreakdown: priceCalculation.breakdown
                }
            };

            // Save directly to localStorage
            localStorage.setItem('selectedService', JSON.stringify(serviceData));

            // Emit event for other components that might be listening
            window.dispatchEvent(new CustomEvent('serviceUpdate', { detail: serviceData }));

            // Navigate to next step
            router.push('/quick-book/details');

        } catch (error) {
            console.error('Error preparing general cleaning data:', error);
            setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    }

    // Add frequency selection handler
    const handleFrequencySelect = (frequency: 'once' | 'regular') => {
        setAdditionalOptions(prev => ({ ...prev, frequency }));
        setFormProgress(prev => ({ ...prev, frequencySelected: true }));
    };

    // Add pricing type selection handler
    const handlePricingTypeSelect = (type: 'hourly' | 'flat') => {
        setAdditionalOptions(prev => ({ ...prev, pricingType: type }));
        setFormProgress(prev => ({ ...prev, pricingTypeSelected: true }));
    };

    // Add useEffect at the top level of the GeneralClean component
    useEffect(() => {
        if (selectedSize && selectedSize !== '5plus') {
            try {
                const priceCalc = calculatePrice();
                const extrasTotal = calculateExtrasTotal();
                const priceBreakdown = [];

                // Add base price to breakdown
                if (additionalOptions.pricingType === 'hourly') {
                    const hours = additionalOptions.hours || additionalOptions.customHours || 0;
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
                additionalOptions.selectedExtras.forEach(extraId => {
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
                const serviceData = {
                    type: 'general-clean',
                    name: 'General Clean',
                    homeSize: homeTypes.find(t => t.id === selectedSize)?.label,
                    price: priceCalc.totalPrice + extrasTotal,
                    basePrice: priceCalc.basePrice,
                    extrasTotal: calculateExtrasTotal(),
                    priceBreakdown,
                    details: {
                        frequency: additionalOptions.frequency,
                        regularFrequency: additionalOptions.regularFrequency,
                        pricingType: additionalOptions.pricingType,
                        hours: additionalOptions.hours || additionalOptions.customHours
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
        additionalOptions.frequency,
        additionalOptions.regularFrequency,
        additionalOptions.pricingType,
        additionalOptions.hours,
        additionalOptions.customHours,
        additionalOptions.selectedExtras,
        formProgress.pricingTypeSelected,
        additionalOptions,
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
                            onClick={() => handleFrequencySelect('once')}
                            className={`p-4 rounded-xl border-2 transition-all text-left
                                ${additionalOptions.frequency === 'once'
                                    ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                    : 'border-gray-200 hover:border-[#90c2f7]'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-gray-900">Once-off Clean</h5>
                                {additionalOptions.frequency === 'once' && (
                                    <Check className="w-5 h-5 text-[#1E3D8F]" />
                                )}
                            </div>
                            <p className="text-sm text-gray-600">
                                Single cleaning service without any commitment
                            </p>
                            <div className="mt-3 text-[#1E3D8F] font-medium">
                                From ${getBasePrice(selectedSize)}
                            </div>
                        </button>

                        {/* Regular Option */}
                        <button
                            onClick={() => handleFrequencySelect('regular')}
                            className={`p-4 rounded-xl border-2 transition-all text-left
                                ${additionalOptions.frequency === 'regular'
                                    ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                    : 'border-gray-200 hover:border-[#90c2f7]'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-gray-900">Regular Clean</h5>
                                {additionalOptions.frequency === 'regular' && (
                                    <Check className="w-5 h-5 text-[#1E3D8F]" />
                                )}
                            </div>
                            <p className="text-sm text-gray-600">
                                Scheduled cleaning with up to 15% discount
                            </p>
                            <div className="mt-3 text-[#1E3D8F] font-medium">
                                From ${Math.round(getBasePrice(selectedSize) * 0.85)}
                            </div>
                        </button>
                    </div>

                    {/* Regular Cleaning Options - Only show when Regular is selected */}
                    {additionalOptions.frequency === 'regular' && (
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
                                            onClick={() => setAdditionalOptions({
                                                ...additionalOptions,
                                                regularFrequency: option.value as AdditionalOptions['regularFrequency']
                                            })}
                                            className={`p-3 rounded-lg border-2 transition-all
                                                ${additionalOptions.regularFrequency === option.value
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
                                ${additionalOptions.pricingType === 'hourly'
                                    ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                    : 'border-gray-200 hover:border-[#90c2f7]'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-gray-900">Hourly Rate</h5>
                                {additionalOptions.pricingType === 'hourly' && (
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
                                ${additionalOptions.pricingType === 'flat'
                                    ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                    : 'border-gray-200 hover:border-[#90c2f7]'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-gray-900">Flat Rate</h5>
                                {additionalOptions.pricingType === 'flat' && (
                                    <Check className="w-5 h-5 text-[#1E3D8F]" />
                                )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                                Fixed price based on your home size
                            </p>
                            <div className="text-[#1E3D8F] font-medium">
                                From ${Math.round(getBasePrice(selectedSize) * (1 - calculatePrice().discountRate))}
                                {calculatePrice().discountRate > 0 && (
                                    <span className="ml-2 text-sm text-green-600">
                                        Save {(calculatePrice().discountRate * 100)}%
                                    </span>
                                )}
                            </div>
                        </button>
                    </div>

                    {/* Hours Selection - Only show for hourly rate */}
                    {additionalOptions.pricingType === 'hourly' && (
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
                                        onClick={() => setAdditionalOptions({
                                            ...additionalOptions,
                                            hours: hour,
                                            customHours: undefined
                                        })}
                                        className={`p-3 rounded-lg border-2 transition-all
                                            ${additionalOptions.hours === hour && !additionalOptions.customHours
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
                                            value={additionalOptions.customHours || ''}
                                            onChange={(e) => {
                                                const value = parseInt(e.target.value);
                                                if (!isNaN(value) && value >= 6 && value <= 9) {
                                                    setAdditionalOptions({
                                                        ...additionalOptions,
                                                        hours: undefined,
                                                        customHours: value
                                                    });
                                                } else if (e.target.value === '') {
                                                    setAdditionalOptions({
                                                        ...additionalOptions,
                                                        customHours: undefined
                                                    });
                                                }
                                            }}
                                            placeholder="Enter hours (6-9)"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 
                                                focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20 
                                                outline-none transition-all"
                                        />
                                        {additionalOptions.customHours && (
                                            <div className="text-[#1E3D8F] font-medium whitespace-nowrap">
                                                ${additionalOptions.customHours * Math.round(45 * (1 - calculatePrice().discountRate))}
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
                                value={additionalOptions.bathrooms}
                                onChange={(e) => setAdditionalOptions({
                                    ...additionalOptions,
                                    bathrooms: e.target.value
                                })}
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
                                value={additionalOptions.toilets}
                                onChange={(e) => setAdditionalOptions({
                                    ...additionalOptions,
                                    toilets: e.target.value
                                })}
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
                            onClick={() => setAdditionalOptions({
                                ...additionalOptions,
                                hasPets: !additionalOptions.hasPets
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                ${additionalOptions.hasPets ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                    ${additionalOptions.hasPets ? 'translate-x-6' : 'translate-x-1'}`}
                            />
                        </button>
                    </div>

                    {/* Additional Notes */}
                    <div className="mt-6 border-t border-gray-100 pt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Additional Notes or Special Requirements
                        </label>
                        <textarea
                            value={additionalOptions.additionalNotes}
                            onChange={(e) => setAdditionalOptions({
                                ...additionalOptions,
                                additionalNotes: e.target.value
                            })}
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
                        value={additionalOptions.parkingType}
                        onChange={(e) => setAdditionalOptions({
                                        ...additionalOptions,
                            parkingType: e.target.value as AdditionalOptions['parkingType']
                        })}
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
                        {[
                            { 
                                id: 'balcony', 
                                label: 'Balcony/Patio Clean', 
                                price: 25, 
                                description: 'Deep clean of outdoor living areas including sweeping, mopping, and surface cleaning' 
                            },
                            { 
                                id: 'garage', 
                                label: 'Garage Clean', 
                                price: 30, 
                                description: 'Complete garage cleaning including sweeping, cobweb removal, and basic organization' 
                            },
                            { 
                                id: 'windows', 
                                label: 'Windows Clean', 
                                price: 35, 
                                description: 'Interior and exterior window cleaning, including tracks, frames, and window sills' 
                            },
                            { 
                                id: 'fridge', 
                                label: 'Inside Fridge', 
                                price: 25, 
                                description: 'Thorough cleaning of refrigerator interior, shelves, and compartments' 
                            },
                            { 
                                id: 'cabinets', 
                                label: 'Inside Cabinets (Kitchen)', 
                                price: 30, 
                                description: 'Detailed cleaning of kitchen cabinet interiors, shelves, and handles' 
                            },
                            { 
                                id: 'spring', 
                                label: 'Spring Cleaning', 
                                price: 60, 
                                description: 'Deep cleaning package including baseboards, light fixtures, and detailed dusting' 
                            }
                        ].map((extra) => (
                            <div key={extra.id} className="relative">
                                <button
                                    onClick={() => {
                                        const currentExtras = additionalOptions.selectedExtras || [];
                                        const isSelected = currentExtras.includes(extra.id);
                                        
                                        setAdditionalOptions({
                                            ...additionalOptions,
                                            selectedExtras: isSelected
                                                ? currentExtras.filter(id => id !== extra.id)
                                                : [...currentExtras, extra.id]
                                        });
                                    }}
                                    className={`w-full p-4 rounded-xl border-2 transition-all text-left relative
                                        ${additionalOptions.selectedExtras?.includes(extra.id)
                                            ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                            : 'border-gray-200 hover:border-[#90c2f7]'
                                        }
                                        hover:shadow-md`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-gray-900">{extra.label}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[#1E3D8F] font-medium whitespace-nowrap">
                                                +${extra.price}
                                            </span>
                                            {additionalOptions.selectedExtras?.includes(extra.id) && (
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
                        {additionalOptions.pricingType === 'hourly' ? (
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
                                        {additionalOptions.hours || additionalOptions.customHours || 0} hours
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
                                        (additionalOptions.hours || additionalOptions.customHours || 0)} 
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
                                        ${getBasePrice(selectedSize)}
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
                        {additionalOptions.selectedExtras.length > 0 && (
                            <div className="border-t border-gray-200 pt-2 mt-2">
                                <div className="text-sm font-medium text-gray-600 mb-2">Selected Extras:</div>
                                {additionalOptions.selectedExtras.map(extraId => {
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
                    {submitError && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                            {submitError}
                        </div>
                    )}
                    
                    <button
                        onClick={handleBookingSubmit}
                        className="w-full bg-[#1E3D8F] text-white py-4 px-6 rounded-lg
                            font-medium hover:bg-[#1E3D8F]/90 transition-colors
                            flex items-center justify-center gap-2 text-lg"
                    >
                        Next Step
                        <Check className="w-5 h-5" />
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
        </div>
    );
} 