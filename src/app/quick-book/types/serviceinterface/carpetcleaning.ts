// Room interface for custom rooms
export interface CustomRoom {
    name: string;
    count: number; 
}

// Carpet cleaning specific options
export interface CarpetCleaningOptions {
    enabled: boolean;
    bedrooms: number;
    livingRooms: number;
    studyRooms: number;
    hallways: number;
    stairs: number;
    customRooms: {
        enabled: boolean;
        rooms: CustomRoom[];
    };
}

// Rug cleaning options
export interface RugCleaningOptions {
    enabled: boolean;
    large: number;    // > 3x4m
    medium: number;   // 2x3m
    small: number;    // < 2x2m
}

// Sofa cleaning options
export interface SofaCleaningOptions {
    enabled: boolean;
    large: number;    // 4+ seater
    medium: number;   // 3 seater
    small: number;    // 2 seater
}

// Chair cleaning options
export interface ChairCleaningOptions {
    enabled: boolean;
    recliner: number;
    dayChair: number;
    armChair: number;
    ottoman: number;
}

// Mattress cleaning options
export interface MattressCleaningOptions {
    enabled: boolean;
    large: number;    // King/Queen
    medium: number;   // Double
    small: number;    // Single
}

// Upholstery cleaning options
export interface UpholsteryCleaningOptions {
    enabled: boolean;
    sofa: SofaCleaningOptions;
    chair: ChairCleaningOptions;
    mattress: MattressCleaningOptions;
}

// Complete carpet cleaning service details
export interface CarpetCleaningDetails {
    carpetCleaning: CarpetCleaningOptions;
    rugCleaning: RugCleaningOptions;
    upholsteryCleaning: UpholsteryCleaningOptions;
    additionalNotes?: string;
    totalPrice: number;
    priceBreakdown: PriceBreakdownItem[];
}

// Price breakdown item
export interface PriceBreakdownItem {
    description: string;
    amount: number;
}

// Carpet cleaning booking state
export interface CarpetCleaningState extends CarpetCleaningDetails {
    isSubmitting: boolean;
    submitError?: string;
} 