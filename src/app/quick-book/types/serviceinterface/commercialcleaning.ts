// Basic types
export type IndustryType = 'office' | 'aged-care' | 'education' | 'government' | 'retail' | 
    'medical' | 'gym' | 'restaurant' | 'warehouse' | 'other';

export type FrequencyType = 'once' | 'regular' | null;
export type RegularFrequencyType = 'daily' | 'weekly' | 'biweekly' | 'monthly';
export type PreferredTimeType = 'during' | 'after' | 'before' | null;

// Company details interface
export interface CompanyDetails {
    name: string;
    abn: string;
}

// Contact information interface
export interface ContactInformation {
    phone: string;
    email: string;
    message: string;
}

// Operating hours interface
export interface OperatingHours {
    preferredCleaningTime: PreferredTimeType;
    startTime: string;
}

// Service requirements interface
export interface ServiceRequirements {
    // Hours breakdown
    hours: {
        perVisit: number;        // Hours required per visit (e.g., 3 hrs)
        staff: {
            count: number;       // Number of staff required (e.g., 2 people)
            hoursEach: number;   // Hours per staff member
        };
        total: number;          // Total hours (staff count × hours each)
    };
    requiresAfterHours: boolean;
}

// Service frequency interface
export interface ServiceFrequency {
    type: FrequencyType;
    regularFrequency?: RegularFrequencyType;
}

// Price breakdown interface
export interface PriceBreakdown {
    description: string;
    amount: number;
}

// Main details interface
export interface CommercialCleaningDetails {
    industry: IndustryType;
    otherIndustryType?: string;
    companyDetails: CompanyDetails;
    serviceFrequency: ServiceFrequency;
    contact: ContactInformation;
    serviceRequirements: ServiceRequirements;
    operatingHours: OperatingHours;
    pricing: {
        baseRate: number;
        hourlyRate: number;
        totalPrice: number;
        priceBreakdown: PriceBreakdown[];
    };
}

// Service data interface for localStorage
export interface CommercialCleaningServiceData {
    name: string;
    type: "commercial-clean";
    price: number;
    description: string;
    details: CommercialCleaningDetails;
}

// Component state interface
export interface CommercialCleaningState {
    details: {
        industry: IndustryType;
        otherIndustryType?: string;
        companyDetails: CompanyDetails;
        serviceFrequency: ServiceFrequency;
        contact: ContactInformation;
        serviceRequirements: ServiceRequirements;
        operatingHours: OperatingHours;
    };
    isSubmitting: boolean;
    submitError: string | null;
}

// API response interface
export interface CommercialCleaningResponse {
    success: boolean;
    message: string;
    bookingId?: string;
    bookingNumber?: string;
    totalPrice?: number;
}

// Price configuration
export const COMMERCIAL_PRICE_CONFIG = {
    baseRates: {
        once: 65,
        regular: 55
    },
    discounts: {
        daily: 0.20,    // 20% off
        weekly: 0.15,   // 15% off
        biweekly: 0.10, // 10% off
        monthly: 0      // no discount
    },
    minimumHours: {
        once: 3,
        regular: 0
    }
} as const; 
 


