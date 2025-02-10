import { ApiResponse } from '../types';

// Contact Information Types
interface ContactInfo {
    name: string;
    phone: string;
    email: string;
}

// Property Details Types
interface PropertyAddress {
    street: string;
    unit?: string;
    suburb: string;
    state: string;
    postcode: string;
}

// Window Details Types
interface WindowDetails {
    cleaningType: 'inside' | 'outside' | 'both';
    numWindows: string;
    numSlidingDoors: string;
    maxFloorLevel: string;
}

// Main Service Interface
interface WindowCleaningDetails {
    contact: ContactInfo;
    property: {
        type: string;
        address: PropertyAddress;
    };
    windows: WindowDetails;
    preferences: {
        preferredContact: 'phone' | 'email';
        bestTimeToContact: string;
    };
    additionalNotes?: string;
}

// Customer Details Interface
interface CustomerDetails {
    name: string;
    email: string;
    phone: string;
    address: {
        street: string;
        unit?: string;
        suburb: string;
        state: string;
        postcode: string;
    };
}

// Service Submission Interface
interface WindowCleaningSubmission {
    customerDetails: CustomerDetails;
    service: {
        name: "Window Cleaning";
        type: "window-clean";
        details: WindowCleaningDetails;
    };
}

// Service handler
export const windowCleaningService = {
    submit: async (data: WindowCleaningSubmission): Promise<ApiResponse> => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/window-clean/submit-enquiry`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to submit window cleaning enquiry');
            }

            return await response.json();
        } catch (error) {
            console.error('Window cleaning submission error:', error);
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Failed to submit enquiry'
            };
        }
    }
}; 