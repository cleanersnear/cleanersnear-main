'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Building2 } from 'lucide-react'
import { useBookingStore } from '../../../store/bookingStore'
import { 
    IndustryType,
    
    
    PreferredTimeType,
    CommercialCleaningState,
    CommercialCleaningServiceData,
    PriceBreakdown
} from '../../../types/serviceinterface/commercialcleaning'


export default function CommercialClean() {
    const router = useRouter()
    const setCommercialCleaningDetails = useBookingStore(state => state.setCommercialCleaningDetails)

    const [state, setState] = useState<CommercialCleaningState>({
        details: {
            industry: '' as IndustryType,
            otherIndustryType: '',
            companyDetails: {
                name: '',
                abn: '',
            },
            serviceFrequency: {
                type: null,
            },
            contact: {
                phone: '',
                email: '',
                message: ''
            },
            serviceRequirements: {
                hours: {
                    perVisit: 3,        // Default 3 hours
                    staff: {
                        count: 2,       // Default 2 staff
                        hoursEach: 3    // Default 3 hours each
                    },
                    total: 6           // Default total (2 × 3)
                },
                requiresAfterHours: false
            },
            operatingHours: {
                preferredCleaningTime: null,
                startTime: ''
            }
        },
        isSubmitting: false,
        submitError: null
    });

    const industries = [
        { id: 'office', label: 'Office' },
        { id: 'aged-care', label: 'Aged Care' },
        { id: 'education', label: 'Education & Child Care' },
        { id: 'government', label: 'Government' },
        { id: 'retail', label: 'Retail' },
        { id: 'medical', label: 'Medical & Healthcare' },
        { id: 'gym', label: 'Gym & Fitness' },
        { id: 'restaurant', label: 'Restaurant & Hospitality' },
        { id: 'warehouse', label: 'Warehouse & Industrial' },
        { id: 'other', label: 'Other' }
    ] as const;

    const handleHoursUpdate = (type: 'staff' | 'hours', value: number) => {
        setState(prev => {
            const newState = { ...prev };
            if (type === 'staff') {
                newState.details.serviceRequirements.hours.staff.count = Math.max(1, Math.min(10, value));
            } else {
                newState.details.serviceRequirements.hours.staff.hoursEach = Math.max(1, Math.min(12, value));
            }
            
            // Update total hours
            newState.details.serviceRequirements.hours.total = 
                newState.details.serviceRequirements.hours.staff.count * 
                newState.details.serviceRequirements.hours.staff.hoursEach;
            
            return newState;
        });
    };

    const handleBookingSubmit = async () => {
        if (state.isSubmitting) return;

        try {
            // 1. Start isSubmitting
            setState(prev => ({
                ...prev,
                isSubmitting: true,
                submitError: null
            }));

            // Format service data
            const serviceData: CommercialCleaningServiceData = {
                name: "Commercial Cleaning",
                type: "commercial-clean",
                price: calculateTotalPrice(),
                description: `Professional commercial cleaning service for ${
                    state.details.industry === 'other' 
                        ? state.details.otherIndustryType 
                        : industries.find(i => i.id === state.details.industry)?.label
                }`,
                details: {
                    ...state.details,
                    pricing: {
                        baseRate: getHourlyRate(),
                        hourlyRate: getHourlyRate(),
                        totalPrice: calculateTotalPrice(),
                        priceBreakdown: calculatePriceBreakdown()
                    }
                }
            };

            // 2. Save to Zustand store
            setCommercialCleaningDetails(serviceData.details);

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

    const calculateFinishTime = (startTime: string, duration: number) => {
        if (!startTime) return '--:--';
        
        const [hours, minutes] = startTime.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes + (duration * 60);
        
        const finishHours = Math.floor(totalMinutes / 60) % 24;
        const finishMinutes = totalMinutes % 60;
        
        return `${finishHours.toString().padStart(2, '0')}:${finishMinutes.toString().padStart(2, '0')}`;
    };

    // Get hourly rate based on frequency
    const getHourlyRate = () => {
        if (state.details.serviceFrequency.type === 'once') return 65;
        
        // Regular service rates
        switch (state.details.serviceFrequency.regularFrequency) {
            case 'daily': return 44;
            case 'weekly': return 46.75;
            case 'biweekly': return 49.50;
            case 'monthly': return 55;
            default: return 65;
        }
    };

    // Simple total price calculation
    const calculateTotalPrice = () => {
        const hourlyRate = getHourlyRate();
        const totalHours = state.details.serviceRequirements.hours.total;
        return hourlyRate * totalHours;
    };

    // Price breakdown for display
    const calculatePriceBreakdown = (): PriceBreakdown[] => {
        const hourlyRate = getHourlyRate();
        const totalHours = state.details.serviceRequirements.hours.total;
        const totalPrice = hourlyRate * totalHours;

        return [{
            description: `Service Rate ($${hourlyRate}/hour × ${totalHours} hours)`,
            amount: totalPrice
        }];
    };

    

    useEffect(() => {
        if (state.details.industry && state.details.serviceFrequency.type) {
            try {
                const baseHourlyRate = state.details.serviceFrequency.type === 'once' ? 65 : 55;
                const minimumHours = state.details.serviceFrequency.type === 'once' ? 3 : 0;
                const totalHours = Math.max(minimumHours, 
                    state.details.serviceRequirements.hours.staff.hoursEach * 
                    state.details.serviceRequirements.hours.staff.count
                );
                
                let totalPrice = totalHours * baseHourlyRate;

                // Apply frequency discounts
                if (state.details.serviceFrequency.type === 'regular' && 
                    state.details.serviceFrequency.regularFrequency) {
                    const discounts = {
                        'daily': 0.20,
                        'weekly': 0.15,
                        'biweekly': 0.10,
                        'monthly': 0
                    };
                    const discount = discounts[state.details.serviceFrequency.regularFrequency] || 0;
                    totalPrice = totalPrice * (1 - discount);
                }

                const details = {
                    ...state.details,
                    pricing: {
                        totalPrice: totalPrice || 0,
                        priceBreakdown: [{
                            description: `Commercial Cleaning Service (${totalHours} hours)`,
                            amount: totalPrice || 0
                        }],
                        baseRate: baseHourlyRate,
                        hourlyRate: baseHourlyRate
                    }
                };

                // Save to localStorage with correct key
                localStorage.setItem('commercialCleaningDetails', JSON.stringify(details));
                
                // Dispatch event to notify BookingSummary2
                window.dispatchEvent(new CustomEvent('serviceStorageUpdate', {
                    detail: {
                        type: 'commercial-cleaning',
                        data: details
                    }
                }));

            } catch (error) {
                console.error('Error updating service data:', error);
            }
        }
    }, [
        state.details.industry,
        state.details.serviceFrequency.type,
        state.details.serviceFrequency.regularFrequency,
        state.details.serviceRequirements.hours.staff.hoursEach,
        state.details.serviceRequirements.hours.staff.count,
        state.details
    ]);

    return (
        <div className="space-y-6">
            {/* Industry Selection */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-6">Select Your Industry</h4>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Industry Type
                        </label>
                        <select
                            value={state.details.industry}
                            onChange={(e) => setState({
                                ...state,
                                details: {
                                    ...state.details,
                                    industry: e.target.value as IndustryType,
                                    otherIndustryType: ''
                                }
                            })}
                            className="w-full p-3 border border-gray-200 rounded-lg
                                focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]
                                text-gray-900"
                        >
                            <option value="">Select an industry</option>
                            {industries.map((industry) => (
                                <option key={industry.id} value={industry.id}>
                                    {industry.label}
                                </option>
                            ))}
                        </select>
                        <p className="text-sm text-gray-500 mt-2">
                            Select the industry that best matches your business type
                        </p>
                    </div>

                    {/* Other Industry Type Input */}
                    {state.details.industry === 'other' && (
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Specify Your Industry
                            </label>
                            <input
                                type="text"
                                value={state.details.otherIndustryType}
                                onChange={(e) => setState({
                                    ...state,
                                    details: {
                                        ...state.details,
                                        otherIndustryType: e.target.value
                                    }
                                })}
                                className="w-full p-3 border border-gray-200 rounded-lg
                                    focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                placeholder="Please specify your industry type"
                            />
                        </div>
                    )}

                    {/* Selected Industry Info */}
                    {state.details.industry && (
                        <div className="mt-4 p-4 bg-[#e6f0fa] rounded-lg">
                            <div className="flex items-center gap-3">
                                <Building2 className="w-5 h-5 text-[#1E3D8F]" />
                                <div>
                                    <div className="font-medium text-gray-900">
                                        {state.details.industry === 'other' 
                                            ? state.details.otherIndustryType || 'Other Industry'
                                            : industries.find(i => i.id === state.details.industry)?.label}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Company Details */}
            {state.details.industry && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-6">Company Details</h4>
                    <div className="space-y-4">
                        {/* Company Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company Name
                            </label>
                            <input
                                type="text"
                                value={state.details.companyDetails.name}
                                onChange={(e) => setState({
                                    ...state,
                                    details: {
                                        ...state.details,
                                        companyDetails: {
                                            ...state.details.companyDetails,
                                            name: e.target.value
                                        }
                                    }
                                })}
                                className="w-full p-3 border border-gray-200 rounded-lg
                                    focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                placeholder="Enter company name"
                            />
                        </div>

                        {/* ABN */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ABN (Australian Business Number)
                            </label>
                            <input
                                type="text"
                                value={state.details.companyDetails.abn}
                                onChange={(e) => setState({
                                    ...state,
                                    details: {
                                        ...state.details,
                                        companyDetails: {
                                            ...state.details.companyDetails,
                                            abn: e.target.value
                                        }
                                    }
                                })}
                                className="w-full p-3 border border-gray-200 rounded-lg
                                    focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                placeholder="Enter ABN"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Frequency Selection */}
            {state.details.industry && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-6">Service Frequency</h4>
                    <div className="space-y-4">
                        {/* Frequency Buttons */}
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setState({
                                    ...state,
                                    details: {
                                        ...state.details,
                                        serviceFrequency: {
                                            ...state.details.serviceFrequency,
                                            type: 'once'
                                        }
                                    }
                                })}
                                className={`p-4 rounded-lg border-2 transition-all
                                    ${state.details.serviceFrequency.type === 'once'
                                        ? 'border-[#1E3D8F] bg-[#e6f0fa] text-[#1E3D8F]'
                                        : 'border-gray-200 hover:border-[#90c2f7]'
                                    }`}
                            >
                                <div className="font-medium">Once-off Clean</div>
                                <div className="text-sm mt-1 text-gray-600">$65/hour (min. 3 hours)</div>
                            </button>
                            <button
                                onClick={() => setState({
                                    ...state,
                                    details: {
                                        ...state.details,
                                        serviceFrequency: {
                                            ...state.details.serviceFrequency,
                                            type: 'regular'
                                        }
                                    }
                                })}
                                className={`p-4 rounded-lg border-2 transition-all
                                    ${state.details.serviceFrequency.type === 'regular'
                                        ? 'border-[#1E3D8F] bg-[#e6f0fa] text-[#1E3D8F]'
                                        : 'border-gray-200 hover:border-[#90c2f7]'
                                    }`}
                            >
                                <div className="font-medium">Regular Clean</div>
                                <div className="text-sm mt-1 text-gray-600">$55/hour</div>
                            </button>
                        </div>

                        {/* Regular Frequency Options */}
                        {state.details.serviceFrequency.type === 'regular' && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                <button
                                    onClick={() => setState({
                                        ...state,
                                        details: {
                                            ...state.details,
                                            serviceFrequency: {
                                                ...state.details.serviceFrequency,
                                                regularFrequency: 'daily'
                                            }
                                        }
                                    })}
                                    className={`p-4 rounded-lg border-2 transition-all
                                        ${state.details.serviceFrequency.regularFrequency === 'daily'
                                            ? 'border-[#1E3D8F] bg-[#e6f0fa] text-[#1E3D8F]'
                                            : 'border-gray-200 hover:border-[#90c2f7]'
                                        }`}
                                >
                                    <div className="font-medium">Daily</div>
                                    <div className="text-sm mt-1 text-gray-600">20% off</div>
                                    <div className="text-sm mt-1 text-[#1E3D8F]">$44/hour</div>
                                </button>
                                <button
                                    onClick={() => setState({
                                        ...state,
                                        details: {
                                            ...state.details,
                                            serviceFrequency: {
                                                ...state.details.serviceFrequency,
                                                regularFrequency: 'weekly'
                                            }
                                        }
                                    })}
                                    className={`p-4 rounded-lg border-2 transition-all
                                        ${state.details.serviceFrequency.regularFrequency === 'weekly'
                                            ? 'border-[#1E3D8F] bg-[#e6f0fa] text-[#1E3D8F]'
                                            : 'border-gray-200 hover:border-[#90c2f7]'
                                        }`}
                                >
                                    <div className="font-medium">Weekly</div>
                                    <div className="text-sm mt-1 text-gray-600">15% off</div>
                                    <div className="text-sm mt-1 text-[#1E3D8F]">$46.75/hour</div>
                                </button>
                                <button
                                    onClick={() => setState({
                                        ...state,
                                        details: {
                                            ...state.details,
                                            serviceFrequency: {
                                                ...state.details.serviceFrequency,
                                                regularFrequency: 'biweekly'
                                            }
                                        }
                                    })}
                                    className={`p-4 rounded-lg border-2 transition-all
                                        ${state.details.serviceFrequency.regularFrequency === 'biweekly'
                                            ? 'border-[#1E3D8F] bg-[#e6f0fa] text-[#1E3D8F]'
                                            : 'border-gray-200 hover:border-[#90c2f7]'
                                        }`}
                                >
                                    <div className="font-medium">Fortnightly</div>
                                    <div className="text-sm mt-1 text-gray-600">10% off</div>
                                    <div className="text-sm mt-1 text-[#1E3D8F]">$49.50/hour</div>
                                </button>
                                <button
                                    onClick={() => setState({
                                        ...state,
                                        details: {
                                            ...state.details,
                                            serviceFrequency: {
                                                ...state.details.serviceFrequency,
                                                regularFrequency: 'monthly'
                                            }
                                        }
                                    })}
                                    className={`p-4 rounded-lg border-2 transition-all
                                        ${state.details.serviceFrequency.regularFrequency === 'monthly'
                                            ? 'border-[#1E3D8F] bg-[#e6f0fa] text-[#1E3D8F]'
                                            : 'border-gray-200 hover:border-[#90c2f7]'
                                        }`}
                                >
                                    <div className="font-medium">Monthly</div>
                                    <div className="text-sm mt-1 text-gray-600">No discount</div>
                                    <div className="text-sm mt-1 text-[#1E3D8F]">$55/hour</div>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Hours and Staff Requirements */}
            {state.details.serviceFrequency.type && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-6">Service Requirements</h4>
                    <div className="space-y-6">
                        {/* Hours Per Visit */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Hours Required Per Visit
                            </label>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => handleHoursUpdate('hours', Math.max(1, state.details.serviceRequirements.hours.staff.hoursEach - 1))}
                                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center
                                        text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                >
                                    -
                                </button>
                                <span className="w-16 text-center font-medium text-gray-900">
                                    {state.details.serviceRequirements.hours.staff.hoursEach} hrs
                                </span>
                                <button
                                    onClick={() => handleHoursUpdate('hours', Math.min(12, state.details.serviceRequirements.hours.staff.hoursEach + 1))}
                                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center
                                        text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                >
                                    +
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                                Estimated time needed for each cleaning visit
                            </p>
                        </div>

                        {/* Staff Required */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Number of Staff Required
                            </label>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => handleHoursUpdate('staff', Math.max(1, state.details.serviceRequirements.hours.staff.count - 1))}
                                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center
                                        text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                >
                                    -
                                </button>
                                <span className="w-16 text-center font-medium text-gray-900">
                                    {state.details.serviceRequirements.hours.staff.count} {state.details.serviceRequirements.hours.staff.count === 1 ? 'person' : 'people'}
                                </span>
                                <button
                                    onClick={() => handleHoursUpdate('staff', Math.min(10, state.details.serviceRequirements.hours.staff.count + 1))}
                                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center
                                        text-gray-600 hover:border-[#1E3D8F] hover:text-[#1E3D8F] transition-colors"
                                >
                                    +
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                                Number of cleaning staff needed for the job
                            </p>
                        </div>

                        {/* Total Hours Info */}
                        <div className="p-4 bg-[#e6f0fa] rounded-lg">
                            <div className="flex items-center justify-between">
                                <div className="text-gray-900">
                                    Total Hours per Visit:
                                </div>
                                <div className="font-medium text-[#1E3D8F]">
                                    {state.details.serviceRequirements.hours.total} hours
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                                ({state.details.serviceRequirements.hours.staff.count} staff × {state.details.serviceRequirements.hours.staff.hoursEach} hours each)
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Contact Information */}
            {state.details.serviceFrequency.type && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-6">Contact Information</h4>
                    <div className="space-y-4">
                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company Contact Number
                            </label>
                            <input
                                type="tel"
                                value={state.details.contact.phone}
                                onChange={(e) => setState({
                                    ...state,
                                    details: {
                                        ...state.details,
                                        contact: {
                                            ...state.details.contact,
                                            phone: e.target.value
                                        }
                                    }
                                })}
                                className="w-full p-3 border border-gray-200 rounded-lg
                                    focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                placeholder="Enter contact number"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company Email
                            </label>
                            <input
                                type="email"
                                value={state.details.contact.email}
                                onChange={(e) => setState({
                                    ...state,
                                    details: {
                                        ...state.details,
                                        contact: {
                                            ...state.details.contact,
                                            email: e.target.value
                                        }
                                    }
                                })}
                                className="w-full p-3 border border-gray-200 rounded-lg
                                    focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                placeholder="Enter company email"
                            />
                        </div>

                        {/* Preferred Cleaning Time and Start Time */}
                        <div className="space-y-4">
                            {/* Preferred Cleaning Time */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Preferred Cleaning Time
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { value: 'during', label: 'During Hours' },
                                        { value: 'after', label: 'After Hours' },
                                        { value: 'before', label: 'Before Hours' }
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => setState({
                                                ...state,
                                                details: {
                                                    ...state.details,
                                                    operatingHours: {
                                                        ...state.details.operatingHours,
                                                        preferredCleaningTime: option.value as PreferredTimeType
                                                    }
                                                }
                                            })}
                                            className={`p-3 rounded-lg border-2 transition-all text-sm
                                                ${state.details.operatingHours.preferredCleaningTime === option.value
                                                    ? 'border-[#1E3D8F] bg-[#e6f0fa] text-[#1E3D8F]'
                                                    : 'border-gray-200 hover:border-[#90c2f7]'
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Start Time with Auto-calculated Finish Time */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Start Time
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <input
                                            type="time"
                                            value={state.details.operatingHours.startTime}
                                            onChange={(e) => setState({
                                                ...state,
                                                details: {
                                                    ...state.details,
                                                    operatingHours: {
                                                        ...state.details.operatingHours,
                                                        startTime: e.target.value
                                                    }
                                                }
                                            })}
                                            className="w-full p-3 border border-gray-200 rounded-lg
                                                focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                        />
                                    </div>
                                    <div>
                                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600">
                                            Finish: {calculateFinishTime(state.details.operatingHours.startTime, state.details.serviceRequirements.hours.staff.hoursEach)}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">
                                    Total duration: {state.details.serviceRequirements.hours.staff.hoursEach} hours
                                </p>
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Additional Requirements
                            </label>
                            <textarea
                                value={state.details.contact.message}
                                onChange={(e) => setState({
                                    ...state,
                                    details: {
                                        ...state.details,
                                        contact: {
                                            ...state.details.contact,
                                            message: e.target.value
                                        }
                                    }
                                })}
                                rows={4}
                                className="w-full p-3 border border-gray-200 rounded-lg
                                    focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F]"
                                placeholder="Describe any specific requirements or additional information"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Price Section */}
            {state.details.serviceFrequency.type && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Your Price</h4>
                    <div className="bg-[#F8FAFC] rounded-lg p-4">
                        <div className="space-y-3">
                            {/* Hours and Staff Info */}
                            <div className="flex justify-between items-center">
                                <div className="text-gray-600">Hours per Visit:</div>
                                <div className="font-medium text-gray-900">
                                    {state.details.serviceRequirements.hours.total} hours
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="text-gray-600">Staff Required:</div>
                                <div className="font-medium text-gray-900">
                                    {state.details.serviceRequirements.hours.staff.count} {state.details.serviceRequirements.hours.staff.count === 1 ? 'person' : 'people'}
                                </div>
                            </div>
                            
                            {/* Hourly Rate */}
                            <div className="flex justify-between items-center">
                                <div className="text-gray-600">Hourly Rate:</div>
                                <div className="font-medium text-[#1E3D8F]">
                                    ${getHourlyRate()}/hour
                                </div>
                            </div>

                            {/* Total */}
                            <div className="border-t border-gray-200 mt-4 pt-4">
                                <div className="flex justify-between items-center">
                                    <div className="font-medium text-gray-900">Total Price:</div>
                                    <div className="font-semibold text-lg text-[#1E3D8F]">
                                        ${calculateTotalPrice().toFixed(2)}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mt-2">
                                    {state.details.serviceFrequency.type === 'regular' 
                                        ? `Price per service with ${state.details.serviceFrequency.regularFrequency} cleaning schedule`
                                        : 'One-time service price'}
                                </p>
                            </div>
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
            {state.details.serviceFrequency.type && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <button
                        onClick={handleBookingSubmit}
                        disabled={state.isSubmitting || !state.details.companyDetails.name}
                        className={`w-full py-4 px-6 rounded-lg font-medium
                            flex items-center justify-center gap-2 text-lg
                            ${state.isSubmitting || !state.details.companyDetails.name
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-[#1E3D8F] text-white hover:bg-[#1E3D8F]/90 transition-colors'
                            }`}
                    >
                        {state.isSubmitting ? 'Processing...' : 'Next Step'}
                        
                    </button>

                    {/* Warning Message */}
                    {!state.details.companyDetails.name && (
                        <p className="text-red-500 text-sm mt-2 text-center">
                            Please enter your company name to proceed
                        </p>
                    )}
                </div>
            )}
        </div>
    )
} 