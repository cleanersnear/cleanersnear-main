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

// Main Service Interface
interface FloorCleaningDetails {
    contact: ContactInfo;
    property: {
        type: string;
        address: PropertyAddress;
    };
    floor: {
        type: string;
        approximateArea: string;
        expectedDate: string;
        additionalInfo: string;
    };
    preferences: {
        preferredContact: 'phone' | 'email';
        bestTimeToContact: string;
    };
}

// Service Submission Interface
interface FloorCleaningSubmission {
    
    service: {
        name: "Tile and Floor Cleaning";
        type: "tile-and-floor-clean";
        details: FloorCleaningDetails;
    };
}

// Service handler
export const floorCleaningService = {
    submit: async (data: FloorCleaningSubmission): Promise<ApiResponse> => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/tile-and-floor-clean/submit-enquiry`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to submit tile and floor cleaning enquiry');
            }

            return await response.json();
        } catch (error) {
            console.error('Tile and floor cleaning submission error:', error);
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Failed to submit enquiry'
            };
        }
    }
}; 