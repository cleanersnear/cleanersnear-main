'use client';

import { useState } from 'react';

import { Search } from 'lucide-react';
import * as BookingServices from '@/app/quick-book/components/book-services';
import { useBookingStore } from '../store/bookingStore';
import type { ServiceType } from '../types';
import BookingSummary from '@/app/quick-book/components/layout/BookingSummary';

export default function QuickBookServicePage() {
    
    const [selectedServiceId, setSelectedServiceId] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');
    const setService = useBookingStore((state) => state.setService);
    const isBookingSummaryVisible = useBookingStore((state) => state.isBookingSummaryVisible);

    // Popular services with correct ServiceType
    const popularServices = [
        { id: 'carpet-cleaning' as ServiceType, title: 'Carpet Cleaning', component: BookingServices.CarpetClean },
        { id: 'end-of-lease-cleaning' as ServiceType, title: 'End Of Lease Cleaning', component: BookingServices.EndOfLeaseClean },
        { id: 'general-cleaning' as ServiceType, title: 'General Cleaning', component: BookingServices.GeneralClean },
        { id: 'deep-cleaning' as ServiceType, title: 'Deep Cleaning', component: BookingServices.DeepClean },
        { id: 'move-in-cleaning' as ServiceType, title: 'Move In Cleaning', component: BookingServices.MoveInOutClean },
        { id: 'ndis-cleaning' as ServiceType, title: 'NDIS Cleaning', component: BookingServices.NDISClean },
        { id: 'commercial-cleaning' as ServiceType, title: 'Commercial Cleaning', component: BookingServices.CommercialClean }
    ];

    // All services with correct ServiceType
    const allServices = [
        ...popularServices,
        { id: 'after-renovation-cleaning' as ServiceType, title: 'After Renovation Clean', component: BookingServices.AfterRenovationClean },
        { id: 'oven-cleaning' as ServiceType, title: 'Oven Clean', component: BookingServices.OvenClean },
        { id: 'tile-and-floor-cleaning' as ServiceType, title: 'Tile & Floor Clean', component: BookingServices.TileAndFloorClean },
        { id: 'upholstery-cleaning' as ServiceType, title: 'Upholstery Clean', component: BookingServices.UpholsteryClean },
        { id: 'window-cleaning' as ServiceType, title: 'Window Clean', component: BookingServices.WindowClean }
    ];

    const filteredServices = allServices.filter(service => 
        service.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Function to handle service selection and data storage
    const handleServiceSelect = (service: { id: ServiceType, title: string }) => {
        setSelectedServiceId(service.id);
        
        // Single source of truth - BookingStore
        setService({
            id: service.id,
            title: service.title,
            category: popularServices.some(s => s.id === service.id) ? 'popular' : 'other',
            type: service.id
        });
    };

    // Function to get the selected service component
    const getSelectedServiceComponent = () => {
        const service = allServices.find(s => s.id === selectedServiceId);
        if (!service) return null;
        
        const ServiceComponent = service.component;
        return (
            <div className="bg-white">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">{service.title}</h2>
                    <button 
                        onClick={() => setSelectedServiceId('')}
                        className="text-gray-400 hover:text-gray-600 text-sm"
                    >
                        Change Service
                    </button>
                </div>  
                <ServiceComponent
                    isSelected={true}
                    onSelect={() => {}} 
                />
            </div>
        );
    }; 
 
    return (
        <div className="pb-20">
            {/* Page Content */}
            <div className={`container mx-auto px-4 ${selectedServiceId ? 'lg:pr-80' : ''}`}>
                {/* Title - Only show when no service is selected */}
                {!selectedServiceId && (
                    <div className="text-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                            Select Your Service
                        </h1>
                        <p className="text-gray-500">
                            Choose the type of cleaning service you need
                        </p>
                    </div>
                )}

                {/* Search Bar */}
                {!selectedServiceId && (
                    <div className="mb-8 relative max-w-3xl mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search services..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 
                                    focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20 
                                    transition-all duration-300 outline-none"
                            />
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                    </div>
                )}

                {/* Services Display */}
                {!selectedServiceId && !searchQuery && (
                    <div className="max-w-6xl mx-auto"> {/* Increased from 4xl to 6xl */}
                        {/* Popular Services */}
                        <h2 className="text-center text-gray-600 mb-6">- Popular services -</h2>
                        <div className="flex flex-wrap justify-center gap-3 mb-12">
                            {popularServices.map(({ id, title }) => (
                                <ServiceButton
                                    key={id}
                                    id={id}
                                    title={title}
                                    isSelected={selectedServiceId === id}
                                    onClick={() => handleServiceSelect({ id, title })}
                                />
                            ))}
                        </div>

                        {/* Other Services */}
                        <h2 className="text-center text-gray-400 mb-6 mt-12">- Other services -</h2>
                        <div className="flex flex-wrap justify-center gap-6 mb-12 opacity-75 hover:opacity-100 transition-opacity">
                            {allServices
                                .filter(service => !popularServices.find(pop => pop.id === service.id))
                                .map(({ id, title }) => (
                                    <ServiceButton
                                        key={id}
                                        id={id}
                                        title={title}
                                        isSelected={selectedServiceId === id}
                                        onClick={() => handleServiceSelect({ id, title })}
                                        variant="secondary"
                                    />
                                ))}
                        </div>
                    </div>
                )}

                {/* Search Results */}
                {!selectedServiceId && searchQuery && (
                    <div className="flex flex-wrap justify-center gap-3 max-w-6xl mx-auto">
                        {filteredServices.map(({ id, title }) => (
                            <ServiceButton
                                key={id}
                                id={id}
                                title={title}
                                isSelected={selectedServiceId === id}
                                onClick={() => handleServiceSelect({ id, title })}
                            />
                        ))}
                    </div>
                )}

                {/* Selected Service Component */}
                {selectedServiceId && (
                    <>
                        <div className="w-full">
                            {getSelectedServiceComponent()}
                        </div>
                        
                        {/* Use the pre-defined state variable */}
                        <div className={`fixed right-0 top-24 w-80 h-[calc(100vh-6rem)] border-l border-gray-200 bg-white
                            ${isBookingSummaryVisible ? 'block lg:block' : 'hidden lg:block'}`}>
                            <BookingSummary /> 
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

// Service Button Component
const ServiceButton = ({ title, isSelected, onClick, variant = 'primary' }: { 
    id: string, 
    title: string, 
    isSelected: boolean, 
    onClick: () => void,
    variant?: 'primary' | 'secondary'
}) => (
    <button
        onClick={onClick}
        className={`
            relative px-6 py-3 rounded-[16px] text-sm font-medium
            transition-all duration-300 transform hover:scale-105
            min-w-[180px] backdrop-blur-sm
            ${isSelected 
                ? 'bg-gradient-to-r from-[#1E3D8F] to-[#2E4E9F] text-white border border-white/20' 
                : variant === 'primary'
                    ? 'bg-gray-50/80 text-[#1E3D8F] hover:bg-white border border-[#1E3D8F]/20 hover:border-[#90c2f7]'
                    : 'bg-gray-50/60 text-[#1E3D8F]/80 hover:bg-white border border-[#1E3D8F]/10 hover:border-[#90c2f7]'
            }
            hover:shadow-[0_8px_16px_rgba(30,61,143,0.1)]
            focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/20
            before:content-[""] before:absolute before:inset-0
            before:rounded-[16px] before:transition-all before:duration-300
            ${isSelected 
                ? 'before:opacity-0' 
                : 'before:bg-gradient-to-r before:from-transparent before:to-transparent before:opacity-0 hover:before:opacity-10'
            }
        `}
    >
        {title}
    </button>
); 