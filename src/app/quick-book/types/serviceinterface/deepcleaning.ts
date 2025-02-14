// Basic type for home sizes
export type HomeSizeType = 'studio' | '1bed' | '2bed' | '3bed' | '4bed' | '5plus';

// Interface for cleaning areas
export interface DeepCleaningAreas {
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

// Interface for service hours
export interface DeepCleaningHours {
    selected: '2' | '3' | '4' | '5' | 'custom';
    customHours: number;
}

// Interface for price breakdown
export interface PriceBreakdown {
    description: string;
    amount: number;
}

// Main details interface
export interface DeepCleaningDetails {
    homeSize: HomeSizeType;
    cleaningAreas: DeepCleaningAreas;
    hours: DeepCleaningHours;
    hourlyRate: number;
    totalPrice: number; 
    priceBreakdown: PriceBreakdown[];
}

// Service data interface that matches the localStorage structure
export interface DeepCleaningServiceData {
    name: string;
    type: "deep-cleaning";
    price: number;
    details: DeepCleaningDetails;
}

// State interface for the component
export interface DeepCleaningState {
    selectedSize: HomeSizeType | '';
    showLargeHomeDialog: boolean;
    details: {
        homeSize: HomeSizeType | '';
        cleaningAreas: DeepCleaningAreas;
        hours: DeepCleaningHours;
    };
    isSubmitting: boolean;
    submitError: string | null;
}

// Form validation interface
export interface DeepCleaningValidation {
    isValid: boolean;
    errors: string[];
}

// API response interface
export interface DeepCleaningResponse {
    success: boolean;
    message: string;
    bookingId?: string;
    bookingNumber?: string;
    totalPrice?: number;
}  