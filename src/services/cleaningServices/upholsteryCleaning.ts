import { ApiResponse, CustomerDetails } from '../types';

// Item Types
type MattressSize = 'large' | 'medium' | 'small';
type SofaSize = 'large' | 'medium' | 'small';
type ChairType = 'recliner' | 'dayChair' | 'armChair' | 'ottoman';

// Price Configuration
export const PRICE_CONFIG = {
    mattress: {
        large: 80,    // King size
        medium: 60,   // Double/Queen size
        small: 40     // Single size
    },
    sofa: {
        large: 120,   // 4+ seater
        medium: 90,   // 3 seater
        small: 70     // 2 seater
    },
    chair: {
        recliner: 60,
        dayChair: 45,
        armChair: 35,
        ottoman: 25
    },
    minimumCharge: 55  // Minimum service charge
};



interface UpholsteryDetails {
    upholsteryCleaning: {
        sofa: {
            enabled: boolean;
            large: number;
            medium: number;
            small: number;
        };
        chair: {
            enabled: boolean;
            recliner: number;
            dayChair: number;
            armChair: number;
            ottoman: number;
        };
        mattress: {
            enabled: boolean;
            large: number;
            medium: number;
            small: number;
        };
    };
    additionalNotes?: string;
    priceBreakdown: Array<{
        description: string;
        amount: number;
    }>;
}

interface UpholsterySubmission {
    customerDetails: CustomerDetails;
    service: {
        type: 'upholstery-clean';
        name: string;
        price: number;
        details: UpholsteryDetails;
    };
}

// Service Implementation
export const upholsteryCleaningService = {
    // Calculate price for mattress cleaning
    calculateMattressPrice: (size: MattressSize, count: number): number => {
        return PRICE_CONFIG.mattress[size] * count;
    },

    // Calculate price for sofa cleaning
    calculateSofaPrice: (size: SofaSize, count: number): number => {
        return PRICE_CONFIG.sofa[size] * count;
    },

    // Calculate price for chair cleaning
    calculateChairPrice: (type: ChairType, count: number): number => {
        return PRICE_CONFIG.chair[type] * count;
    },

    // Calculate total price
    calculateTotalPrice: (details: UpholsteryDetails): number => {
        let total = 0;

        // Calculate sofa prices
        if (details.upholsteryCleaning.sofa.enabled) {
            total += PRICE_CONFIG.sofa.large * details.upholsteryCleaning.sofa.large;
            total += PRICE_CONFIG.sofa.medium * details.upholsteryCleaning.sofa.medium;
            total += PRICE_CONFIG.sofa.small * details.upholsteryCleaning.sofa.small;
        }

        // Calculate chair prices
        if (details.upholsteryCleaning.chair.enabled) {
            total += PRICE_CONFIG.chair.recliner * details.upholsteryCleaning.chair.recliner;
            total += PRICE_CONFIG.chair.dayChair * details.upholsteryCleaning.chair.dayChair;
            total += PRICE_CONFIG.chair.armChair * details.upholsteryCleaning.chair.armChair;
            total += PRICE_CONFIG.chair.ottoman * details.upholsteryCleaning.chair.ottoman;
        }

        // Calculate mattress prices
        if (details.upholsteryCleaning.mattress.enabled) {
            total += PRICE_CONFIG.mattress.large * details.upholsteryCleaning.mattress.large;
            total += PRICE_CONFIG.mattress.medium * details.upholsteryCleaning.mattress.medium;
            total += PRICE_CONFIG.mattress.small * details.upholsteryCleaning.mattress.small;
        }

        // Apply minimum charge if total is below minimum
        return Math.max(PRICE_CONFIG.minimumCharge, total);
    },

    // Submit booking
    submit: async (data: UpholsterySubmission): Promise<ApiResponse> => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/upholstery-clean/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to submit upholstery cleaning booking');
            }

            return await response.json();
        } catch (error) {
            console.error('Upholstery cleaning submission error:', error);
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Failed to submit booking'
            };
        }
    }
}; 