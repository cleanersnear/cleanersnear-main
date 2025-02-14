// Type definition
export type HomeSizeType = {
    id: 'studio' | '1bed' | '2bed' | '3bed' | '4bed' | '5plus';
    label: string;
    basePrice: number;
    hours: number;
};

// Constant array
export const HOME_SIZES: HomeSizeType[] = [
    { id: 'studio', label: 'Studio', basePrice: 180, hours: 4 },
    { id: '1bed', label: '1 Bedroom', basePrice: 230, hours: 5 },
    { id: '2bed', label: '2 Bedrooms', basePrice: 285, hours: 6 },
    { id: '3bed', label: '3 Bedrooms', basePrice: 350, hours: 7 },
    { id: '4bed', label: '4 Bedrooms', basePrice: 500, hours: 8 },
    { id: '5plus', label: '5+ Bedrooms', basePrice: 0, hours: 0 }
];

// Type for move direction
export type MoveType = 'in' | 'out' | null;

// Property type options
export type PropertyType = 'single' | 'double' | 'apartment';

// Parking type options
export type ParkingType = 'none' | 'street' | 'provided' | 'paid';



// Interface for carpet areas
export interface CarpetAreas {
    bedrooms: number;
    hallway: boolean;
    stairs: boolean;
    loungeRooms: number;
}

// Interface for service hours
export interface ServiceHours {
    selected: '2' | '3' | '4' | '5' | 'custom';
    customHours: number;
}

// Interface for price breakdown
export interface PriceBreakdown {
    description: string;
    amount: number;
}

// Main details interface
export interface MoveInCleaningDetails {
    moveType: MoveType;
    propertyDetails: {
        homeSize: HomeSizeType;
        bathrooms: string;
        toilets: string;
        propertyType: PropertyType;
        isFurnished: boolean;        
    };
    carpetCleaning?: {
        needed: boolean;
        areas: CarpetAreas;
        parkingType: ParkingType;
        cost: number;
    };
    kitchenDetails: {
        condition: number;
        surcharge?: number;
    };
    extras: {
        selectedServices: ExtraService['name'][];
        totalCost: number;
    };
    hours: ServiceHours;
    pricing: {
        baseRate: number;
        totalPrice: number;
    };
}

// Service data interface that matches the localStorage structure
export interface MoveInCleaningServiceData {
    name: string;
    type: "move-in-cleaning";
    price: number;
    details: MoveInCleaningDetails;
}

// State interface for the component
export interface MoveInCleaningState {
    selectedSize: HomeSizeType | '';
    showLargeHomeDialog: boolean;
    additionalOptions: {
        moveType: MoveType;
        bathrooms: string;
        toilets: string;
        propertyType: PropertyType;
        hasParking: boolean;
        needsCarpetCleaning: boolean;
        carpetAreas: CarpetAreas;
        parkingType: ParkingType;
        hadPets: boolean;
        additionalNotes: string;
        isFurnished: boolean;
        kitchenCondition: number;
        extraServices: ExtraService['name'][];
        hasStudyRoom: boolean;
        hours: ServiceHours;
    };
    isSubmitting: boolean;
    submitError: string | null;
}

// Constants
export const MOVE_IN_RATE = 48.50;
export const MOVE_OUT_RATE = 63.05;

export const INITIAL_BASE_PRICE = {
    'studio': 180,
    '1bed': 230,
    '2bed': 285,
    '3bed': 350,
    '4bed': 500,
    '5plus': 0
} as const;

// API response interface
export interface MoveInCleaningResponse {
    success: boolean;
    message: string;
    bookingId?: string;
    bookingNumber?: string;
    totalPrice?: number;
}

// Extra service type
export type ExtraService = {
    name: 'Balcony/Patio Clean' | 'Garage Clean';
    price: number;
};

// Extra services constant
export const EXTRA_SERVICES: ExtraService[] = [
    { name: 'Balcony/Patio Clean', price: 25 },
    { name: 'Garage Clean', price: 30 }
] as const;

// Carpet Cleaning Prices
export const CARPET_CLEANING_PRICES = {
    bedroom: 30,
    livingArea: 30,
    hallway: 15,
    stairs: 40
} as const; 