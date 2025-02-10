import { ApiResponse, CustomerDetails } from '../types';

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

// Main Service Interface
interface OvenCleaningDetails {
    contact: ContactInfo;
    property: {
        type: string;
        address: PropertyAddress;
    };
    oven: {
        type: string;
        expectedDate: string;
        additionalInfo: string;
    };
    preferences: {
        preferredContact: 'phone' | 'email';
        bestTimeToContact: string;
    };
}

// Service Submission Interface
interface OvenCleaningSubmission {
    customerDetails: CustomerDetails; // Will be provided by details service
    service: {
        name: "Oven Cleaning";
        type: "oven-clean";
        details: OvenCleaningDetails;
    };
}

// Service handler
export const ovenCleaningService = {
    submit: async (data: OvenCleaningSubmission): Promise<ApiResponse> => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/oven-clean/submit-enquiry`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to submit oven cleaning enquiry');
            }

            return await response.json();
        } catch (error) {
            console.error('Oven cleaning submission error:', error);
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Failed to submit enquiry'
            };
        }
    }
}; 