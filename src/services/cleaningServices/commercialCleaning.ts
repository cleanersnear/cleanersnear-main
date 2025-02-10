import { CustomerDetails } from '../types';
// Industry type options
type IndustryType = 
    | 'office' 
    | 'aged-care' 
    | 'education' 
    | 'government' 
    | 'retail' 
    | 'medical' 
    | 'gym' 
    | 'restaurant' 
    | 'warehouse' 
    | 'other';

// Frequency and time options
type FrequencyType = 'once' | 'regular' | null;
type RegularFrequencyType = 'daily' | 'weekly' | 'biweekly' | 'monthly';
type PreferredTimeType = 'during' | 'after' | 'before' | null;

// Main interfaces
interface CommercialCleaningDetails {
    industry: IndustryType;
    otherIndustryType?: string;
    companyDetails: {
        name: string;
        abn: string;
    };
    frequency: FrequencyType;
    regularFrequency?: RegularFrequencyType;
    contact: {
        phone: string;
        email: string;
        message: string;
    };
    staffRequired: number;  // Range: 1-10
    hoursPerVisit: number; // Range: 1-12
    operatingHours: {
        preferredCleaningTime: PreferredTimeType;
        startTime: string;  // Time format: HH:mm
    };
}

// Service submission interface
interface CommercialCleaningSubmission {
    customerDetails: CustomerDetails; // Will be provided by details service
    service: {
        name: "Commercial Cleaning";
        type: "commercial-clean";
        price: number;
        description: string;
        details: CommercialCleaningDetails;
        priceBreakdown: Array<{
            description: string;
            amount: number;
        }>;
    };
}

// Price calculation constants
export const PRICE_CONFIG = {
    baseHourlyRate: {
        once: 65,    // $65/hour for once-off
        regular: 55  // $55/hour for regular
    },
    minimumHours: {
        once: 3,     // 3 hours minimum for once-off
        regular: 0   // No minimum for regular
    },
    discounts: {
        daily: 0.20,    // 20% off
        weekly: 0.15,   // 15% off
        biweekly: 0.10, // 10% off
        monthly: 0      // No discount
    }
};

// Service handler
export const commercialCleaningService = {
    submit: async (data: CommercialCleaningSubmission) => {
        try {
            // For now, just store the data and return a mock response
            const mockBookingNumber = `COM${Math.floor(Math.random() * 10000)}`;
            
            // Store complete booking data
            localStorage.setItem('bookingDetails', JSON.stringify({
                ...data.customerDetails,
                bookingNumber: mockBookingNumber,
                service: data.service
            }));

            return {
                success: true,
                message: 'Commercial cleaning booking stored successfully',
                bookingNumber: mockBookingNumber
            };
        } catch (error) {
            console.error('Error storing commercial cleaning details:', error);
            throw error;
        }
    },

    // Helper function to calculate price
    calculatePrice: (
        frequency: FrequencyType,
        regularFrequency: RegularFrequencyType | undefined,
        hoursPerVisit: number,
        staffRequired: number
    ): number => {
        const baseRate = frequency === 'once' 
            ? PRICE_CONFIG.baseHourlyRate.once 
            : PRICE_CONFIG.baseHourlyRate.regular;

        const minimumHours = frequency === 'once'
            ? PRICE_CONFIG.minimumHours.once
            : PRICE_CONFIG.minimumHours.regular;

        const totalHours = Math.max(minimumHours, hoursPerVisit * staffRequired);
        let totalPrice = totalHours * baseRate;

        // Apply frequency discounts for regular service
        if (frequency === 'regular' && regularFrequency) {
            const discount = PRICE_CONFIG.discounts[regularFrequency];
            totalPrice = totalPrice * (1 - discount);
        }

        return totalPrice;
    }
}; 