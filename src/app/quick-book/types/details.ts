// Time slot options
export type TimeSlot = 'morning' | 'afternoon' | 'evening';

// State options
export type StateOption = 'VIC' | 'NSW' | 'QLD' | 'WA' | 'SA' | 'TAS' | 'ACT' | 'NT';

// Address structure
export interface Address {
    street: string;
    unit?: string;
    suburb: string;
    postcode: string;
    state: StateOption;
    instructions?: string;
}

// Customer details structure
export interface CustomerDetails {
    // Contact Information
    firstName: string;
    lastName?: string;
    email: string;
    phone: string;
    
    // Property Address
    address: Address;
    
    // Schedule
    date: string;
    time: TimeSlot;
    isFlexibleDate: boolean;
    isFlexibleTime: boolean;
}

// Form state including validation and submission states
export interface DetailsFormState {
    details: CustomerDetails | null;
    errors: Record<string, string>;
    isSubmitting: boolean;
    submitError: string | null;
}

// Time slot options with labels
export const TIME_SLOTS: { value: TimeSlot; label: string }[] = [
    { value: 'morning', label: 'Morning (8am - 12pm)' },
    { value: 'afternoon', label: 'Afternoon (12pm - 4pm)' },
    { value: 'evening', label: 'Evening (4pm - 8pm)' }
];

// State options with labels
export const STATE_OPTIONS: { value: StateOption; label: string }[] = [
    { value: 'VIC', label: 'VIC' },
    { value: 'NSW', label: 'NSW' },
    { value: 'QLD', label: 'QLD' },
    { value: 'WA', label: 'WA' },
    { value: 'SA', label: 'SA' },
    { value: 'TAS', label: 'TAS' },
    { value: 'ACT', label: 'ACT' },
    { value: 'NT', label: 'NT' }
]; 