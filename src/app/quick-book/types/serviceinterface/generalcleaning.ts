// Basic Types
export type HomeSizeType = 'studio' | '1bed' | '2bed' | '3bed' | '4bed' | '5plus';
export type PropertyType = 'single' | 'double' | 'apartment';
export type FrequencyType = 'once-off' | 'regular';
export type RegularFrequencyType = 'weekly' | 'biweekly' | 'monthly';
export type PricingType = 'hourly' | 'flat';
export type ParkingType = 'none' | 'street' | 'provided' | 'paid';

// Extra Services
export interface ExtraService {
    id: 'balcony' | 'garage' | 'windows' | 'fridge' | 'cabinets' | 'spring';
    name: string;
    price: number;
    description?: string;
}

// Frequency Discounts
export const FREQUENCY_DISCOUNTS = {
    weekly: 15,     // 15% off
    biweekly: 5,    // 5% off
    monthly: 0      // 0% off
} as const;


// Service Details Interfaces
export interface PropertyDetails {
    size: HomeSizeType;
    bathrooms: string;
    toilets: string;
    propertyType: PropertyType;
}

export interface ServiceFrequency {
    type: FrequencyType;
    regularFrequency?: RegularFrequencyType;
}

export interface PricingOptions {
    type: PricingType;
    hours?: number;
    customHours?: number;
}

export interface AdditionalOptions {
    hasPets: boolean;
    parkingType: ParkingType;
    selectedExtras: ExtraService['id'][];
    additionalNotes: string;
}

export interface PriceBreakdownItem {
    description: string;
    amount: number;
}

// Complete Service Interface
export interface GeneralCleaningDetails {
    propertyDetails: PropertyDetails;
    serviceFrequency: ServiceFrequency;
    pricing: PricingOptions;
    additionalOptions: AdditionalOptions;
    totalPrice: number;
    priceBreakdown: PriceBreakdownItem[];
}

// State Interface (includes UI state)
export interface GeneralCleaningState extends GeneralCleaningDetails {
    isSubmitting: boolean;
    submitError?: string;
} 