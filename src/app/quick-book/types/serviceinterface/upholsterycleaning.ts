// Sofa cleaning interface
export interface SofaCleaning {
    enabled: boolean;
    large: number;    // 4+ Seater - $120
    medium: number;   // 3 Seater - $90
    small: number;    // 2 Seater - $70
}

// Chair cleaning interface
export interface ChairCleaning {
    enabled: boolean;
    recliner: number;   // $60
    dayChair: number;   // $45
    armChair: number;   // $35
    ottoman: number;    // $25
}

// Mattress cleaning interface
export interface MattressCleaning {
    enabled: boolean;
    large: number;    // King - $80
    medium: number;   // Double/Queen - $60
    small: number;    // Single - $40
}

// Price breakdown interface
export interface PriceBreakdown {
    description: string;
    amount: number;
}

// Main details interface
export interface UpholsteryCleaningDetails {
    upholsteryCleaning: {
        
        sofa: SofaCleaning;
        chair: ChairCleaning;
        mattress: MattressCleaning;
    };
    additionalNotes: string;
    pricing: {
        totalPrice: number;
        priceBreakdown: PriceBreakdown[];
    };
}

// Service data interface for localStorage
export interface UpholsteryCleaningServiceData {
    name: string;
    type: "upholstery-cleaning";
    price: number;
    description: string;
    details: UpholsteryCleaningDetails;
}

// Component state interface
export interface UpholsteryCleaningState {
    details: UpholsteryCleaningDetails;
    isSubmitting: boolean;
    submitError: string | null;
}

// API response interface
export interface UpholsteryCleaningResponse {
    success: boolean;
    message: string;
    bookingId?: string;
    bookingNumber?: string;
    totalPrice?: number;
}

// Price configuration
export const UPHOLSTERY_PRICE_CONFIG = {
    sofa: {
        large: 120,   // 4+ Seater
        medium: 90,   // 3 Seater
        small: 70     // 2 Seater
    },
    chair: {
        recliner: 60,
        dayChair: 45,
        armChair: 35,
        ottoman: 25
    },
    mattress: {
        large: 80,    // King
        medium: 60,   // Double/Queen
        small: 40     // Single
    },
    minimumCharge: 55
} as const; 