import { ApiResponse, CustomerDetails } from '../types';

// NDIS Service Types
type FrequencyType = 'once' | 'regular';
type RegularFrequencyType = 'weekly' | 'fortnightly' | 'monthly';
type PropertyType = 'single' | 'double' | 'apartment';

// NDIS Client Details
interface NDISClientDetails {
    clientNumber: string;
    clientName: string;
    planManager?: string;
    supportCoordinator?: string;
}

// Property Details
interface PropertyDetails {
    size: string;
    bathrooms: string;
    toilets: string;
    propertyType: PropertyType;
    hasPets: boolean;
}

// Service Frequency
interface ServiceFrequency {
    type: FrequencyType;
    regularFrequency?: RegularFrequencyType;
}

// Service Hours
interface ServiceHours {
    selected: string;
    customHours?: number;
}

// Main Service Interface
interface NDISCleaningDetails {
    propertyDetails: PropertyDetails;
    serviceFrequency: ServiceFrequency;
    hours: ServiceHours;
    ndisDetails: NDISClientDetails;
    additionalNotes?: string;
    priceBreakdown: Array<{
        description: string;
        amount: number;
    }>;
}

// Submission Interface
interface NDISCleaningSubmission {
    customerDetails: CustomerDetails; // Will be filled in details page
    service: {
        type: 'ndis-clean';
        name: string;
        price: number;
        details: NDISCleaningDetails;
    };
}

// Price Configuration
const PRICE_CONFIG = {
    baseRate: {
        once: 65.00,      // One-time cleaning rate
        regular: {
            weekly: 55.00,     // Weekly rate
            fortnightly: 58.00, // Fortnightly rate
            monthly: 60.00      // Monthly rate
        }
    },
    minimumHours: 2,
    maximumHours: 9
};

// Service Implementation
export const ndisCleaningService = {
    // Calculate hourly rate based on frequency
    calculateHourlyRate: (frequency: FrequencyType, regularFrequency?: RegularFrequencyType): number => {
        if (frequency === 'once') {
            return PRICE_CONFIG.baseRate.once;
        }
        return PRICE_CONFIG.baseRate.regular[regularFrequency || 'weekly'];
    },

    // Calculate total price
    calculatePrice: (data: NDISCleaningDetails): number => {
        const hourlyRate = ndisCleaningService.calculateHourlyRate(
            data.serviceFrequency.type,
            data.serviceFrequency.regularFrequency
        );
        const hours = data.hours.customHours || parseInt(data.hours.selected);
        return hourlyRate * hours;
    },

    // Validate NDIS details
    validateNDISDetails: (details: NDISClientDetails): boolean => {
        return !!(details.clientNumber && details.clientName);
    },

    // Submit booking
    submit: async (data: NDISCleaningSubmission): Promise<ApiResponse> => {
        try {
            // Validate NDIS details
            if (!ndisCleaningService.validateNDISDetails(data.service.details.ndisDetails)) {
                throw new Error('Invalid NDIS client details');
            }

            // Validate price
            const calculatedPrice = ndisCleaningService.calculatePrice(data.service.details);
            if (calculatedPrice !== data.service.price) {
                throw new Error('Price mismatch detected');
            }

            // Submit to backend
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/ndis-clean/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to submit NDIS cleaning booking');
            }

            return await response.json();
        } catch (error) {
            console.error('NDIS cleaning submission error:', error);
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Failed to submit NDIS cleaning booking'
            };
        }
    }
}; 