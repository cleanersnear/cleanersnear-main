import { CustomerDetails } from "../types";

export type HomeSizeType = 'studio' | '1bed' | '2bed' | '3bed' | '4bed' | '5plus';


// Deep Cleaning specific interfaces
interface DeepCleaningAreas {
    kitchen: boolean;
    oven: boolean;
    bathroom: boolean;
    bedroom: boolean;
    toilet: boolean; 
    lounge: boolean;
    hallway: boolean;
    stairs: boolean;
    customArea: {
        enabled: boolean;
        description: string;
    };
}

interface DeepCleaningHours {
    selected: '2' | '3' | '4' | '5' | 'custom';
    customHours: number;
}

interface PriceBreakdown {
    description: string;
    amount: number;
}

// Main service interface
export interface DeepCleaningDetails {
    service: {
        name: string;
        type: 'deep-clean';
        price: number;
        details: {
            homeSize: HomeSizeType;
            cleaningAreas: DeepCleaningAreas;
            hours: DeepCleaningHours;
            hourlyRate: number;
            priceBreakdown: PriceBreakdown[];
        };
    };
}

// Combined submission interface
interface DeepCleaningSubmission {
    customerDetails: CustomerDetails;
    service: DeepCleaningDetails['service'];
}

// Add more specific types for the service response
interface DeepCleaningResponse {
    success: boolean;
    message?: string;
    bookingNumber?: string;
}

// Service handler
export const deepCleaningService = {
    submit: async (data: DeepCleaningSubmission): Promise<DeepCleaningResponse> => {
        try {
            console.log('Submitting deep cleaning data:', JSON.stringify(data, null, 2));
            
            // For now, just store the data and return a mock response
            const mockBookingNumber = `DC${Math.floor(Math.random() * 10000)}`;
            
            // Store complete booking data
            localStorage.setItem('bookingDetails', JSON.stringify({
                ...data.customerDetails,
                bookingNumber: mockBookingNumber,
                service: data.service
            }));

            return {
                success: true,
                message: 'Deep cleaning booking stored successfully',
                bookingNumber: mockBookingNumber
            };
        } catch (error) {
            console.error('Error storing deep cleaning details:', error);
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Failed to store booking'
            };
        }
    },

    // Price calculation helper
    calculatePrice: (hours: number): number => {
        return hours * 53.07;
    }
}; 