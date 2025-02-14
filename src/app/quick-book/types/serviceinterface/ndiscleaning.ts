// Basic types
export type HomeSizeType = 'studio' | '1bed' | '2bed' | '3bed' | '4bed' | '5plus';
export type PropertyType = 'single' | 'double' | 'apartment';
export type FrequencyType = 'once' | 'regular' | null;
export type RegularFrequencyType = 'weekly' | 'biweekly' | 'monthly';
export type ParkingType = 'street' | 'provided' | 'paid' | 'none';
export type ContractLength = '3' | '6' | '12';

// NDIS specific interfaces
export interface CaseManager {
    name: string;
    email: string; 
    phone: string;
}

export interface FundingCompany {
    name: string;
    email: string;
    phone: string;
    referenceNumber?: string;
}

export interface NDISDetails {
    clientNumber: string;
    clientName: string;
    caseManager: CaseManager;
    fundingCompany: FundingCompany;
}

// Service frequency interface
export interface ServiceFrequency {
    type: FrequencyType;
    regularFrequency?: RegularFrequencyType;
    minContract?: ContractLength;
}

// Property details interface
export interface PropertyDetails {
    size: HomeSizeType;
    bathrooms: string;
    toilets: string;
    propertyType: PropertyType;
    hasPets: boolean;
}

// Hours interface
export interface ServiceHours {
    selected?: number;
    customHours?: number;
}

// Price breakdown interface
export interface PriceBreakdown {
    description: string;
    amount: number;
}

// Main details interface
export interface NDISCleaningDetails {
    propertyDetails: PropertyDetails;
    serviceFrequency: ServiceFrequency;
    hours: ServiceHours;
    ndisDetails: NDISDetails;
    additionalOptions: {
        parkingType: ParkingType;
        selectedExtras: string[];
        providesEquipment: boolean;
        additionalNotes: string;
    };
    pricing: {
        baseRate: number;
        hourlyRate: number;
        totalPrice: number;
        priceBreakdown: PriceBreakdown[];
    };
}

// Service data interface for localStorage
export interface NDISCleaningServiceData {
    name: string;
    type: "ndis-clean";
    price: number;
    details: NDISCleaningDetails;
}

// Component state interface
export interface NDISCleaningState {
    selectedSize: HomeSizeType | '';
    details: {
        propertyDetails: PropertyDetails;
        serviceFrequency: ServiceFrequency;
        hours: ServiceHours;
        ndisDetails: NDISDetails;
        additionalOptions: {
            parkingType: ParkingType;
            selectedExtras: string[];
            providesEquipment: boolean;
            additionalNotes: string;
        };
    };
    isSubmitting: boolean;
    submitError: string | null;
}

// API response interface
export interface NDISCleaningResponse {
    success: boolean;
    message: string;
    bookingId?: string;
    bookingNumber?: string;
    totalPrice?: number;
} 