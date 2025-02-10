import { ApiResponse, CustomerDetails } from '../types';

interface MoveInOutDetails {
    moveType: 'in' | 'out';
    propertyDetails: {
        homeSize: string;
        bathrooms: string;
        toilets: string;
        propertyType: string;
    };
    carpetCleaning?: {
        areas: {
            bedrooms: number;
            hallway: boolean;
            stairs: boolean;
            loungeRooms: number;
        };
        cost: number;
    };
    hours: {
        selected: string;
        customHours?: number;
    };
    extras: string[];
    priceBreakdown: Array<{
        description: string;
        amount: number;
    }>;
}

interface MoveInOutSubmission {
    customerDetails: CustomerDetails;
    service: {
        type: 'move-in-out';
        name: string;
        price: number;
        details: MoveInOutDetails;
    };
}

export const moveInCleaningService = {
    submit: async (data: MoveInOutSubmission): Promise<ApiResponse> => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/move-in-out/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to submit move in/out cleaning booking');
            }

            return await response.json();
        } catch (error) {
            console.error('Move in/out cleaning submission error:', error);
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Failed to submit booking'
            };
        }
    }
}; 