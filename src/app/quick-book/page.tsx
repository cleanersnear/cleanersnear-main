'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function QuickBookPage() {
    const router = useRouter();

    useEffect(() => {
        // Check if we're navigating back (popstate event)
        const handlePopState = () => {
            // If we're navigating back, don't redirect
            if (window.history.state?.isBackNavigation) {
                return;
            }
        };

        // Add event listener for popstate (back/forward navigation)
        window.addEventListener('popstate', handlePopState);

        // Use replace instead of push to avoid adding to history stack
        // This prevents the back button from getting stuck in a loop
        router.replace('/quick-book/location');

        // Clean up event listener
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [router]);

    return null;
} 