// Service type identifiers - Match all services from UI
export type ServiceType = 
    // Popular services
    | 'carpet-cleaning'
    | 'end-of-lease-cleaning'
    | 'general-cleaning'
    | 'deep-cleaning'
    | 'move-in-cleaning'
    | 'ndis-cleaning'
    | 'commercial-cleaning'
    | 'spring-cleaning'
    // Other services
    | 'after-renovation-cleaning'
    | 'oven-cleaning'
    | 'tile-and-floor-cleaning'
    | 'upholstery-cleaning'
    | 'window-cleaning';

// Base service information
export interface ServiceBase {  
    id: ServiceType;
    title: string;
    description?: string;
    category: 'popular' | 'other';
    type: ServiceType;    // Add this to match with booking service
}

// Service state for selection page
export interface ServiceSelectionState {
    selectedService: ServiceBase | null;
    searchQuery: string;
}

// Service categories for organization
export interface ServiceCategories {
    popularServices: ServiceBase[];
    otherServices: ServiceBase[];
}

// Response type if we fetch services from API in future
export interface ServiceResponse {
    success: boolean;
    data: ServiceBase[];
    error?: string;
}

// Service selection step in booking process
export interface ServiceBookingStep {
    currentStep: 'service';
    selectedService: ServiceBase | null;
    isServiceSelected: boolean;
} 