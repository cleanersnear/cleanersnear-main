'use client';

import LocationSearch from '@/app/quick-book/components/features/LocationSearch';

export default function LocationPage() {
    return (
        
        <div className="pb-20">
            

            {/* Page Content */}
            <div className="pt-4 md:pt-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    Enter Your Location
                </h1>
                <p className="text-gray-500 mb-8">
                    Please provide your service location to get started
                </p>
                
                <LocationSearch />
            </div>
        </div>
    );
} 