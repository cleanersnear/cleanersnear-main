// Basic Types
export type HomeSizeType = 'studio' | '1bed' | '2bed' | '3bed' | '4bed' | '5plus';
export type PropertyType = 'single' | 'double' | 'apartment';
export type ParkingType = 'none' | 'street' | 'provided' | 'paid';
export type UserType = 'owner' | 'agent' | 'tenant';
export type KitchenCleaningLevel = 'light' | 'moderate' | 'heavy';

// Update the duration type
export type TenancyDurationType = 
    | 'less-than-6-months'
    | '6-12-months'
    | '1-2-years'
    | 'more-than-2-years';

// Property Details
export interface PropertyDetails {
    size: HomeSizeType;
    bathrooms: string;
    toilets: string;
    propertyType: PropertyType;
    isFurnished: boolean;
    hasStudyRoom: boolean;
}

// Kitchen Condition
export interface KitchenCondition {
    rating: number;  // 1-10
    cleaningLevel: KitchenCleaningLevel;
}

// Carpet Areas
export interface CarpetAreas {
    bedrooms: number;
    loungeRooms: number;
    hallway: boolean;
    stairs: boolean;
}

// Carpet Cleaning Options
export interface CarpetCleaningOptions {
    required: boolean;
    areas: CarpetAreas;
}

// Parking Details
export interface ParkingDetails {
    type: ParkingType;
}

// Update the AdditionalInformation interface
export interface AdditionalInformation {
    userType: UserType;
    tenancyDuration: TenancyDurationType;  // Updated type
    hasPets: boolean;
    additionalNotes: string;
}

// Price Breakdown Item
export interface PriceBreakdownItem {
    description: string;
    amount: number;
}

// Complete End of Lease Details
export interface EndOfLeaseDetails {
    propertyDetails: PropertyDetails;
    kitchenCondition: KitchenCondition;
    carpetCleaning: CarpetCleaningOptions;
    parking: ParkingDetails; 
    additionalInformation: AdditionalInformation;
    extras: string[];
    totalPrice: number;
    priceBreakdown: PriceBreakdownItem[];
}

// End of Lease State (includes UI state)
export interface EndOfLeaseState extends EndOfLeaseDetails {
    isSubmitting: boolean;
    submitError?: string;
} 