'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Info, Phone } from 'lucide-react'

import { 
    HomeSizeType, 
    HOME_SIZES, 
    EXTRA_SERVICES,
    ExtraService,
    MoveInCleaningServiceData,
    MoveType,
    PropertyType,
    ParkingType,
    ServiceHours,
    CarpetAreas
} from '@/app/quick-book/types/serviceinterface/moveincleaning';
import { useBookingStore } from '../../../store/bookingStore'


export default function MoveInOutClean() {
    const router = useRouter()
    
    // Basic booking states
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const [showLargeHomeDialog, setShowLargeHomeDialog] = useState(false)

    // Property size and type states
    const [selectedSize, setSelectedSize] = useState<HomeSizeType['id'] | ''>('')
    const [moveType, setMoveType] = useState<MoveType>(null)
    const [propertyType, setPropertyType] = useState<PropertyType>('single')
    const [isFurnished, setIsFurnished] = useState(false)
    
    // Bathroom and toilet counts
    const [bathrooms, setBathrooms] = useState<string>('1')
    const [toilets, setToilets] = useState<string>('1')

    // Carpet cleaning states
    const [needsCarpetCleaning, setNeedsCarpetCleaning] = useState(false)
    const [carpetAreas, setCarpetAreas] = useState<CarpetAreas>({
            bedrooms: 0,
            hallway: false,
            stairs: false,
            loungeRooms: 0
    })

    // Kitchen and condition states
    const [kitchenCondition, setKitchenCondition] = useState(5)

    // Parking and access states
    
    const [parkingType, setParkingType] = useState<ParkingType>('none')

    // Customer details states
    
    const [hadPets, setHadPets] = useState(false)
    
    // Service options states
    const [selectedExtras, setSelectedExtras] = useState<ExtraService['name'][]>([])
    const [hours, setHours] = useState<ServiceHours>({
        selected: '2',
        customHours: 2
    })

    const setMoveInCleaningDetails = useBookingStore((state) => state.setMoveInCleaningDetails);

    const handleSizeSelect = (sizeId: HomeSizeType['id']) => {
        if (sizeId === '5plus') {
            setShowLargeHomeDialog(true)
        } else {
            setSelectedSize(sizeId)
        }
    }

    const handleBookingSubmit = async () => {
        if (isSubmitting) return;
        
        try {
            setIsSubmitting(true);
            setSubmitError(null);

            const selectedHours = hours.selected === 'custom' 
                ? hours.customHours 
                : parseInt(hours.selected);
            
            // Calculate base price
            const hourlyRate = moveType === 'in' ? 48.50 : 63.05;
            const baseTotal = hourlyRate * selectedHours;
            
            // Create service data
            const serviceData: MoveInCleaningServiceData = {
                name: `Move ${moveType === 'in' ? 'In' : 'Out'} Clean`,
                type: "move-in-cleaning",
                price: baseTotal + calculateCarpetCleaningTotal(carpetAreas) + calculateExtrasTotal(),
                details: {
                    moveType,
                    propertyDetails: {
                        homeSize: HOME_SIZES.find(t => t.id === selectedSize)!,
                        bathrooms,
                        toilets,
                        propertyType,
                        isFurnished
                    },
                    carpetCleaning: needsCarpetCleaning ? {
                        needed: needsCarpetCleaning,
                        areas: carpetAreas,
                        parkingType,
                        cost: calculateCarpetCleaningTotal(carpetAreas)
                    } : undefined,
                    kitchenDetails: {
                        condition: kitchenCondition,
                        surcharge: kitchenCondition <= 3 ? 75 : 
                                  kitchenCondition <= 5 ? 35 : 0
                    },
                    extras: {
                        selectedServices: selectedExtras,
                        totalCost: calculateExtrasTotal()
                    },
                    hours: {
                        selected: hours.selected,
                        customHours: hours.customHours
                    },
                    pricing: {
                        baseRate: hourlyRate,
                        totalPrice: baseTotal + calculateCarpetCleaningTotal(carpetAreas) + calculateExtrasTotal()
                    }
                }
            };
 
            // Save to Zustand store with correct function name
            setMoveInCleaningDetails(serviceData.details);
            
            // Save to localStorage for persistence
            localStorage.setItem('selectedService', JSON.stringify(serviceData));
            
            // Navigate to next step
            router.push('/quick-book/details');

        } catch (error) {
            console.error('Error preparing move in/out cleaning data:', error);
            setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    const calculateCarpetCleaningTotal = useCallback((areas: CarpetAreas) => {
        let total = 0;
        total += areas.bedrooms * 30;
        total += areas.loungeRooms * 30;
        total += areas.hallway ? 15 : 0;
        total += areas.stairs ? 40 : 0;
        return total;
    }, []);

    const calculateExtrasTotal = useCallback(() => {
        return selectedExtras.reduce((total, extraName) => {
            const extra = EXTRA_SERVICES.find(e => e.name === extraName);
            return total + (extra?.price || 0);
        }, 0);
    }, [selectedExtras]);

    // Add new useEffect for real-time price updates
    useEffect(() => {
        if (moveType && hours.selected) {
            const selectedHours = hours.selected === 'custom' 
                ? hours.customHours 
                : parseInt(hours.selected);
            
            const hourlyRate = moveType === 'in' ? 48.50 : 63.05;
            const baseTotal = hourlyRate * selectedHours;
            const totalPrice = baseTotal + calculateCarpetCleaningTotal(carpetAreas) + calculateExtrasTotal();

            const details = {
                moveType,
                propertyDetails: {
                    homeSize: HOME_SIZES.find(t => t.id === selectedSize)!,
                    bathrooms,
                    toilets,
                    propertyType,
                    isFurnished
                },
                carpetCleaning: needsCarpetCleaning ? {
                    needed: needsCarpetCleaning,
                    areas: carpetAreas,
                    parkingType,
                    cost: calculateCarpetCleaningTotal(carpetAreas)
                } : undefined,
                kitchenDetails: {
                    condition: kitchenCondition,
                    surcharge: kitchenCondition <= 3 ? 75 : kitchenCondition <= 5 ? 35 : 0
                },
                extras: {
                    selectedServices: selectedExtras,
                    totalCost: calculateExtrasTotal()
                },
                hours: {
                    selected: hours.selected,
                    customHours: hours.customHours
                },
                pricing: {
                    baseRate: hourlyRate,
                    totalPrice: totalPrice || 0,
                    priceBreakdown: [
                        {
                            description: `Base Service (${selectedHours} hours)`,
                            amount: baseTotal
                        },
                        ...(needsCarpetCleaning ? [{
                            description: 'Carpet Cleaning',
                            amount: calculateCarpetCleaningTotal(carpetAreas)
                        }] : []),
                        ...(selectedExtras.length > 0 ? [{
                            description: 'Extra Services',
                            amount: calculateExtrasTotal()
                        }] : [])
                    ]
                }
            };

            // Save to localStorage with correct key
            localStorage.setItem('moveInCleaningDetails', JSON.stringify(details));
            
            // Dispatch event to notify BookingSummary2
            window.dispatchEvent(new CustomEvent('serviceStorageUpdate', {
                detail: {
                    type: 'move-in-cleaning',
                    data: details
                }
            }));
        }
    }, [
        moveType,
        hours,
        selectedSize,
        bathrooms,
        toilets,
        propertyType,
        isFurnished,
        needsCarpetCleaning,
        carpetAreas,
        parkingType,
        kitchenCondition,
        selectedExtras,
        calculateCarpetCleaningTotal,
        calculateExtrasTotal
    ]);

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
                        onClick={() => setMoveType('in')}
                        className={`p-4 rounded-lg border-2 transition-all
                            ${moveType === 'in'
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
                        onClick={() => setMoveType('out')}
                        className={`p-4 rounded-lg border-2 transition-all
                            ${moveType === 'out'
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

                {moveType === 'out' && (
                    <div className="mt-4 p-4 bg-[#e6f0fa] rounded-lg">
                        <p className="text-sm text-gray-600">
                            We&apos;ll help you get your bond back with our comprehensive move-out cleaning service.
                        </p>
                    </div>
                )}
            </div>

            {/* Only show the following sections if moveType is selected */}
            {moveType && (
                <>
                    {/* Service Duration - Moved above Home Size */}
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
                            {/* Preset Hours with Price Display */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {['2', '3', '4', '5'].map((hour) => (
                                    <button
                                        key={hour}
                                        onClick={() => setHours({
                                            selected: hour as '2' | '3' | '4' | '5',
                                            customHours: parseInt(hour)
                                        })}
                                        className={`p-4 rounded-lg border-2 transition-all
                                            ${hours.selected === hour
                                                ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                                : 'border-gray-200 hover:border-[#90c2f7]'
                                            }`}
                                    >
                                        <div className="font-medium text-center">{hour} Hours</div>
                                        <div className="text-sm text-[#1E3D8F] mt-1">
                                            ${((moveType === 'in' ? 48.50 : 63.05) * parseInt(hour)).toFixed(1)}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Custom Hours with Price Display */}
                            <div>
                                <button
                                    onClick={() => setHours({
                                        selected: 'custom',
                                        customHours: hours.customHours
                                    })}
                                    className={`w-full p-4 rounded-lg border-2 transition-all mb-2
                                        ${hours.selected === 'custom'
                                            ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                            : 'border-gray-200 hover:border-[#90c2f7]'
                                        }`}
                                >
                                    <div className="font-medium">Custom Hours</div>
                                    {hours.selected === 'custom' && (
                                        <div className="text-sm text-[#1E3D8F] mt-1">
                                            {hours.customHours} Hours - ${((moveType === 'in' ? 48.50 : 63.05) * hours.customHours).toFixed(1)}
                                        </div>
                                    )}
                                </button>

                                {hours.selected === 'custom' && (
                                    <div className="flex items-center gap-4 mt-3">
                                        <div className="flex-1">
                                            <input
                                                type="range"
                                                min="2"
                                                max="12"
                                                value={hours.customHours}
                                                onChange={(e) => setHours({
                                                    selected: 'custom',
                                                    customHours: parseInt(e.target.value)
                                                })}
                                                className="w-full accent-[#1E3D8F]"
                                            />
                                            <div className="flex justify-between text-sm text-gray-600 mt-1">
                                                <span>2 hrs</span>
                                                <span>12 hrs</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Home Size Selection - Now comes after Service Duration */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h4 className="font-medium text-gray-900">Select Home Size</h4>
                                <p className="text-sm text-gray-600 mt-1">
                                    Choose the size of your property
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                            {HOME_SIZES.slice(0, -1).map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => handleSizeSelect(type.id)}
                                    className={`py-2 px-3 rounded-lg border transition-all text-sm  
                                        ${selectedSize === type.id
                                            ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                            : 'border-gray-200 hover:border-[#90c2f7]'
                                        }`}
                                >
                                    <div className="font-medium text-center">{type.label}</div>
                                </button>
                            ))}
                        </div>
                        
                        {/* 5+ Bedrooms button */}
                        <div className="mt-2">
                            <button
                                onClick={() => setShowLargeHomeDialog(true)}
                                className={`w-full py-2 px-3 rounded-lg border transition-all text-sm
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
                                            value={bathrooms}
                                            onChange={(e) => setBathrooms(e.target.value)}
                                            className="w-full p-3 border border-gray-200 rounded-lg"
                                        >
                                            {['1', '2', '3', '4', '5+'].map((num) => (
                                                <option key={num} value={num}>{num}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Toilets */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Number of Toilets
                                        </label>
                                        <select
                                            value={toilets}
                                            onChange={(e) => setToilets(e.target.value)}
                                            className="w-full p-3 border border-gray-200 rounded-lg"
                                        >
                                            {['1', '2', '3', '4', '5+'].map((num) => (
                                                <option key={num} value={num}>{num}</option>
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
                                                onClick={() => setPropertyType(type.id as PropertyType)}
                                                className={`p-3 rounded-lg border-2 transition-all
                                                    ${propertyType === type.id
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
                                            onClick={() => setIsFurnished(!isFurnished)}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                                ${isFurnished ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                                    ${isFurnished ? 'translate-x-6' : 'translate-x-1'}`}
                                            />
                                        </button>
                                        <span className="ml-3 text-sm text-gray-600">
                                            {isFurnished ? 'Yes' : 'No'}
                                        </span>
                                    </div>
                                </div>

                                {/* Pets - Toggle Switch and only show for move out */}
                                {moveType === 'out' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Did you have any pets in the property?
                                        </label>
                                        <div className="flex items-center">
                                            <button
                                                onClick={() => setHadPets(!hadPets)}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                                    ${hadPets ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                                        ${hadPets ? 'translate-x-6' : 'translate-x-1'}`}
                                                />
                                            </button>
                                            <span className="ml-3 text-sm text-gray-600">
                                                {hadPets ? 'Yes' : 'No'}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Carpet Cleaning Section */}
                    {selectedSize && (
                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                            <h4 className="font-medium text-gray-900 mb-6">Carpet Cleaning</h4>
                            <div className="space-y-6">
                                {/* Need Carpet Cleaning Toggle */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Do you need carpet cleaning?
                                    </label>
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => setNeedsCarpetCleaning(!needsCarpetCleaning)}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                                ${needsCarpetCleaning ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                                    ${needsCarpetCleaning ? 'translate-x-6' : 'translate-x-1'}`}
                                            />
                                        </button>
                                        <span className="ml-3 text-sm text-gray-600">
                                            {needsCarpetCleaning ? 'Yes' : 'No'}
                                        </span>
                                    </div>
                                </div>

                                {/* Show these options only if carpet cleaning is selected */}
                                {needsCarpetCleaning && (
                                    <>
                                        {/* Parking Type - Moved here */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Parking Type
                                            </label>
                                            <select
                                                value={parkingType}
                                                onChange={(e) => setParkingType(e.target.value as ParkingType)}
                                                className="w-48 p-3 border border-gray-200 rounded-lg
                                                    focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                            >
                                                <option value="street">Street Parking</option>
                                                <option value="provided">Free Parking</option>
                                                <option value="paid">Paid Parking</option>
                                                <option value="none">No Parking</option>
                                            </select>
                                        </div>

                                        {/* Rest of carpet cleaning options */}
                                        <div className="space-y-6">
                                            {/* Number inputs for rooms */}
                                            <div className="mt-4 space-y-4">
                                                {/* Bedrooms */}
                                                <div className="flex items-center justify-between">
                                                    <label className="text-sm text-gray-600">Carpeted Bedrooms</label>
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={() => setCarpetAreas(prev => ({
                                                                ...prev,
                                                                bedrooms: prev.bedrooms - 1
                                                            }))}
                                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#1E3D8F]"
                                                        >-</button>
                                                        <span className="w-8 text-center">{carpetAreas.bedrooms}</span>
                                                        <button
                                                            onClick={() => setCarpetAreas(prev => ({
                                                                ...prev,
                                                                bedrooms: prev.bedrooms + 1
                                                            }))}
                                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#1E3D8F]"
                                                        >+</button>
                                                    </div>
                                                </div>

                                                {/* Living Rooms */}
                                                <div className="flex items-center justify-between">
                                                    <label className="text-sm text-gray-600">Carpeted Living Areas</label>
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={() => setCarpetAreas(prev => ({
                                                                ...prev,
                                                                loungeRooms: prev.loungeRooms - 1
                                                            }))}
                                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#1E3D8F]"
                                                        >-</button>
                                                        <span className="w-8 text-center">{carpetAreas.loungeRooms}</span>
                                                        <button
                                                            onClick={() => setCarpetAreas(prev => ({
                                                                ...prev,
                                                                loungeRooms: prev.loungeRooms + 1
                                                            }))}
                                                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#1E3D8F]"
                                                        >+</button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Toggles for additional areas */}
                                            <div className="space-y-4">
                                                {/* Hallway Toggle */}
                                                <div className="flex items-center">
                                                    <button
                                                        onClick={() => setCarpetAreas(prev => ({
                                                            ...prev,
                                                            hallway: !prev.hallway
                                                        }))}
                                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                                            ${carpetAreas.hallway ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                                                    >
                                                        <span
                                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                                                ${carpetAreas.hallway ? 'translate-x-6' : 'translate-x-1'}`}
                                                        />
                                                    </button>
                                                    <span className="ml-3 text-sm text-gray-600">Hallway</span>
                                                </div>

                                                {/* Stairs Toggle */}
                                                <div className="flex items-center">
                                                    <button
                                                        onClick={() => setCarpetAreas(prev => ({
                                                            ...prev,
                                                            stairs: !prev.stairs
                                                        }))}
                                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                                            ${carpetAreas.stairs ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                                                    >
                                                        <span
                                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                                                ${carpetAreas.stairs ? 'translate-x-6' : 'translate-x-1'}`}
                                                        />
                                                    </button>
                                                    <span className="ml-3 text-sm text-gray-600">Stairs</span>
                                            </div>
                                        </div>

                                            {/* Total */}
                                            <div className="mt-4 p-4 bg-[#e6f0fa] rounded-lg">
                                            <div className="flex justify-between items-center">
                                                    <span className="font-medium">Carpet Cleaning Total:</span>
                                                    <span className="font-medium text-[#1E3D8F]">
                                                        ${calculateCarpetCleaningTotal(carpetAreas).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </>
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
                                        value={kitchenCondition}
                                        onChange={(e) => setKitchenCondition(parseInt(e.target.value))}
                                        className="w-full accent-[#1E3D8F]"
                                    />
                                    
                                    {/* Number Labels */}
                                    <div className="flex justify-between px-1 mt-2">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                            <div
                                                key={num}
                                                className={`flex flex-col items-center transition-colors
                                                    ${num === kitchenCondition ? 'text-[#1E3D8F]' : 'text-gray-400'}`}
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

                                {/* Updated Condition Messages */}
                                {kitchenCondition <= 3 && (
                                    <div className="p-4 bg-[#fff4f4] rounded-lg border border-red-200">
                                        <p className="text-sm text-red-600">
                                            Heavy cleaning surcharge may be applied for extremely dirty conditions
                                        </p>
                                    </div>
                                )}
                                {kitchenCondition > 3 && kitchenCondition <= 5 && (
                                    <div className="p-4 bg-[#fff8f0] rounded-lg border border-orange-200">
                                        <p className="text-sm text-orange-600">
                                            Moderate cleaning surcharge may be applied based on condition
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Extras Section */}
                    {selectedSize && (
                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                            <h4 className="font-medium text-gray-900 mb-6">Extras</h4>
                            <div className="space-y-6">
                                {/* Extra Services */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Select Additional Services
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {EXTRA_SERVICES.map((extra) => (
                                            <button
                                                key={extra.name}
                                                onClick={() => setSelectedExtras(selectedExtras.includes(extra.name)
                                                    ? selectedExtras.filter(e => e !== extra.name)
                                                    : [...selectedExtras, extra.name])}
                                                className={`p-4 rounded-lg border-2 transition-all relative
                                                    ${selectedExtras.includes(extra.name)
                                                        ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                                                        : 'border-gray-200 hover:border-[#90c2f7]'
                                                    }`}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <span>{extra.name}</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[#1E3D8F] font-medium">+${extra.price.toFixed(2)}</span>
                                                        {selectedExtras.includes(extra.name) && (
                                                            <Check className="w-5 h-5 text-[#1E3D8F]" />
                                                        )}
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Show total if any extras are selected */}
                                {selectedExtras.length > 0 && (
                                    <div className="mt-4 p-4 bg-[#e6f0fa] rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium">Extras Total:</span>
                                            <span className="font-medium text-[#1E3D8F]">
                                                ${calculateExtrasTotal().toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                            {/* Price Summary */}
                            <div className="bg-white p-6 rounded-xl border border-gray-200">
                                <h4 className="font-medium text-gray-900 mb-6">Price Summary</h4>
                        
                        {/* 1. Base Service Cost */}
                        <div className="space-y-3 pb-4 border-b border-gray-200">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Hourly Rate:</span>
                                        <span className="font-medium">
                                    ${moveType === 'in' ? '48.50' : '63.05'}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Number of Hours:</span>
                                        <span className="font-medium">
                                    {hours.selected === 'custom' ? hours.customHours : hours.selected}
                                        </span>
                                    </div>

                            <div className="flex justify-between text-sm font-medium text-[#1E3D8F]">
                                <span>Base Service Total:</span>
                                <span>
                                    ${((moveType === 'in' ? 48.50 : 63.05) * 
                                        (hours.selected === 'custom' ? hours.customHours : parseInt(hours.selected))).toFixed(1)}
                                        </span>
                                    </div>

                            {/* Add the note if either carpet cleaning or extras are selected */}
                            {(needsCarpetCleaning || selectedExtras.length > 0) && (
                                <div className="mt-3 p-3 bg-[#f8f9fa] rounded-lg">
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Note:</span> Your {hours.selected === 'custom' ? hours.customHours : hours.selected}-hour booking is for the main move {moveType === 'in' ? 'in' : 'out'} clean. 
                                        {needsCarpetCleaning && selectedExtras.length > 0 
                                            ? 'Carpet cleaning and additional services'
                                            : needsCarpetCleaning 
                                                ? 'Carpet cleaning'
                                                : 'Additional services'
                                        } will be completed after these hours.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* 2. Carpet Cleaning Breakdown - Only show if selected */}
                        {needsCarpetCleaning && (
                            <div className="space-y-3 py-4 border-b border-gray-200">
                                <div className="text-sm font-medium mb-2">Carpet Cleaning</div>
                                {carpetAreas.bedrooms > 0 && (
                                        <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Bedrooms ({carpetAreas.bedrooms}):</span>
                                        <span className="font-medium">+${(carpetAreas.bedrooms * 30).toFixed(1)}</span>
                                    </div>
                                )}
                                {carpetAreas.loungeRooms > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Living Areas ({carpetAreas.loungeRooms}):</span>
                                        <span className="font-medium">+${(carpetAreas.loungeRooms * 30).toFixed(1)}</span>
                                    </div>
                                )}
                                {carpetAreas.hallway && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Hallway:</span>
                                        <span className="font-medium">+$15.0</span>
                                    </div>
                                )}
                                {carpetAreas.stairs && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Stairs:</span>
                                        <span className="font-medium">+$40.0</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-sm font-medium text-[#1E3D8F]">
                                    <span>Carpet Cleaning Total:</span>
                                    <span>${calculateCarpetCleaningTotal(carpetAreas).toFixed(1)}</span>
                                </div>
                                        </div>
                                    )}

                        {/* 3. Extra Services Breakdown - Only show if any selected */}
                        {selectedExtras.length > 0 && (
                            <div className="space-y-3 py-4 border-b border-gray-200">
                                <div className="text-sm font-medium mb-2">Extra Services</div>
                                {selectedExtras.map((extraName) => {
                                    const extra = EXTRA_SERVICES.find(e => e.name === extraName);
                                        return extra && (
                                            <div key={extra.name} className="flex justify-between text-sm">
                                                <span className="text-gray-600">{extra.name}:</span>
                                            <span className="font-medium">+${extra.price.toFixed(1)}</span>
                                            </div>
                                        );
                                    })}
                                <div className="flex justify-between text-sm font-medium text-[#1E3D8F]">
                                    <span>Extras Total:</span>
                                    <span>${calculateExtrasTotal().toFixed(1)}</span>
                                        </div>
                                    </div>
                        )}

                        {/* Final Total */}
                        <div className="pt-4">
                            <div className="flex justify-between items-center text-lg font-semibold">
                                <span>Total Price:</span>
                                <span className="text-[#1E3D8F]">
                                    ${(
                                        ((moveType === 'in' ? 48.50 : 63.05) * 
                                        (hours.selected === 'custom' ? hours.customHours : parseInt(hours.selected))) +
                                        calculateCarpetCleaningTotal(carpetAreas) +
                                        calculateExtrasTotal()
                                    ).toFixed(1)}
                                </span>
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
                            className="w-full py-4 px-6 rounded-lg font-medium
                                bg-[#1E3D8F] hover:bg-[#1E3D8F]/90
                                text-white transition-colors
                                flex items-center justify-center gap-2 text-lg"
                        >
                            Next Step
                            
                                </button>
                            </div>
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