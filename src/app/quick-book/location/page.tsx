'use client';

import { useEffect } from 'react';
import LocationSearch from '@/app/quick-book/components/features/LocationSearch';

export default function LocationPage() {
    useEffect(() => {
        // Handle back button press
        const handleBackButton = () => {
            // If we're navigating back from this page, go to the previous page
            // instead of getting stuck in the redirect loop
            if (window.history.state?.isBackNavigation) {
                // Navigate to the previous page in history
                window.history.back();
            }
        };

        // Add event listener for popstate (back/forward navigation)
        window.addEventListener('popstate', handleBackButton);

        // Clean up event listener
        return () => {
            window.removeEventListener('popstate', handleBackButton);
        };
    }, []);

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