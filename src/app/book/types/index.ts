// ============================================================================
// CORE BOOKING TYPES
// ============================================================================

export type BookingStep = 1 | 2 | 3 | 4;
export type BookingStatus = 'pending' | 'confirmed' | 'error' | 'completed' | 'cancelled';

export interface BookingSession {
  id: string;
  currentStep: BookingStep;
  status: BookingStatus;
  selectedService: ServiceType | null;
  customerDetails: CustomerDetails;
  pricing: ServicePricingBreakdown;
  timestamps: {
    created: string;
    updated: string;
    completed?: string;
  };
}

// ============================================================================
// SERVICE TYPES
// ============================================================================

export type ServiceType = 
  | 'Regular Cleaning'
  | 'Once-Off Cleaning'
  | 'NDIS Cleaning'
  | 'End of Lease Cleaning'
  | 'Airbnb Cleaning'
  | 'Commercial Cleaning';

// ============================================================================
// SERVICE DETAIL TYPES
// ============================================================================

// 1. REGULAR CLEANING
export interface RegularCleaningDetails {
  frequency: 'Weekly' | 'Fortnightly';
  duration: '2 hours' | '3 hours' | '4 hours' | '5 hours' | '6 hours' | '7 hours' | '8 hours';
  specialRequests?: string;
}

export interface RegularCleaningPricing {
  minimumHours: 2;
  minimumPrice: 92.05;
  hourlyRate: 38;
  maxHours: 8;
  
  basePrice: number; //(minimumPrice)
  additionalHours: number; //(duration - minimumHours)
  additionalCost: number;  //(additionalHours * hourlyRate)

  totalHours: number;    //(minimumHours + additionalHours)
  totalPrice: number;   //(basePrice + additionalCost)
}

// 2. ONCE-OFF CLEANING
export interface OnceOffCleaningDetails {
  duration: '3 hours' | '4 hours' | '5 hours' | '6 hours' | '7 hours' | '8 hours';
  twoCleaners: boolean;
  specialRequests?: string;
}

export interface OnceOffCleaningPricing {
  minimumHours: 3;
  minimumPrice: 161;
  hourlyRate: 45;
  maxHours: 8;

  basePrice: number; //(minimumPrice)
  additionalHours: number; //(duration - minimumHours)
  additionalCost: number; //(additionalHours * hourlyRate)

  totalHours: number; //(minimumHours + additionalHours)
  totalPrice: number; //(basePrice + additionalCost)
  // Note: twoCleaners multiplier applied in calculation logic
}

// 3. NDIS CLEANING
export interface NDISCleaningDetails {
   frequency: 'Weekly' | 'Fortnightly' | 'Once-off';
   duration: '2 hours' | '3 hours' | '4 hours' | '5 hours' | '6 hours' | '7 hours' | '8 hours';
   specialRequests?: string;
}

export interface NDISCleaningPricing {
  minimumHours: 2;
  hourlyRate: 56;
  maxHours: 8;
  additionalHours: number; //(duration - minimumHours)
   
  totalHours: number; //(minimumHours + additionalHours)
  totalPrice: number; //(hourlyRate * totalHours)
}

// 4. END OF LEASE CLEANING
export interface EndOfLeaseCleaningDetails {
  homeSize: 'Studio' | '1 Bed' | '2 Bed' | '3 Bed' | '4 Bed' | '5+ Bed';
  
  baseBathrooms?: number;
  baseToilets?: number;
  
  extraBathrooms?: number; //(extraBathrooms - baseBathrooms)
  extraToilets?: number; //(extraToilets - baseToilets)
  
  furnished?: boolean;
  studyRoom?: boolean;
  pets?: boolean;

  steamCarpet?: boolean;
  steamCounts?: {
    bedrooms?: number;
    livingRooms?: number;
    hallway?: boolean;
    stairs?: boolean;
  };

  extras?: {
    balcony?: boolean;
    garage?: boolean;
  };
  specialRequests?: string;
}

export interface EndOfLeaseCleaningPricing {
  basePrice: number;
  additions: Array<EndOfLeaseAddition>;
  total: number; //(basePrice + additions)
  totalPrice: number; //(total)
}

export interface EndOfLeaseAddition {
  label: string;
  amount: number;
}

// 5. AIRBNB CLEANING
export interface AirbnbCleaningDetails {
  serviceType: 'Regular' | 'Once-off';
  frequency?: 'Daily' | 'Weekly' | 'Fortnightly';
  duration?: '2 hours' | '3 hours' | '4 hours' | '5 hours' | '6 hours' | '7 hours' | '8 hours';
  extras?: {
    linenChange?: boolean;
    restockAmenities?: boolean;
  };
  specialRequests?: string;
}

export interface AirbnbCleaningPricing {
  minimumHours: number;
  minimumPrice: number;

  additionalHours: number; //(duration - minimumHours)  
  
  hourlyRateAfterMinimum: number;

  additionalCost: number; //(additionalHours * hourlyRateAfterMinimum)
  
  totalHours: number; //(minimumHours + additionalHours)
  totalPrice: number; //(minimumPrice + additionalCost)
}

// 6. COMMERCIAL CLEANING
export interface CommercialCleaningDetails {
  serviceType: 'Once-off' | 'Regular';
  frequency?: 'Daily' | 'Weekly' | 'Fortnightly' | 'Monthly';
  hoursPerVisit?: number;
  staffCount?: number;
  preferredTime?: 'During Hours' | 'After Hours' | 'Before Hours';
  specialRequests?: string;
}

export interface CommercialCleaningPricing {
  hourlyRate: number;
  minHours: number;
  selectedHours: number; //(hoursPerVisit * staffCount)
  
  totalHours: number; //selectedHours
  totalPrice: number; //(hourlyRate * totalHours)
}

// ============================================================================
// CUSTOMER DETAILS TYPES
// ============================================================================

export interface CustomerDetails {
  // Personal Information
  firstName: string;
  lastName: string;
  
  // Contact Information
  email: string;
  phone: string;
  
  // Service Address
  address: string;
  postcode?: string;
  suburb?: string;
  
  // Schedule
  scheduleDate: string;
  
  // Additional Information
  notes?: string;
  
  // Service-Specific Fields
  ndisDetails?: NDISDetails;
  commercialDetails?: CommercialDetails;
  endOfLeaseDetails?: EndOfLeaseDetails;
}

export interface NDISDetails {
  ndisNumber?: string;
  planManager?: string;
}

export interface CommercialDetails {
  businessName?: string;
  businessType?: 'office' | 'retail' | 'agedCare' | 'educationChildCare' | 'government' | 'medical' | 'gymFitness' | 'restaurantHospitality' | 'warehouseIndustrial' | 'other';
  abn?: string;
  contactPerson?: string;
}

export interface EndOfLeaseDetails {
  role?: 'Tenant' | 'Property Owner' | 'Real Estate Agent';
}

// ============================================================================
// CUSTOMER DETAILS CONFIGURATION
// ============================================================================

export interface EndOfLeaseFieldConfig {
  roles: Array<{ value: EndOfLeaseDetails['role']; label: string }>;
  parkingNote: string;
}

export const END_OF_LEASE_FIELD_CONFIG: EndOfLeaseFieldConfig = {
  roles: [
    { value: 'Tenant', label: 'Tenant' },
    { value: 'Property Owner', label: 'Property Owner' },
    { value: 'Real Estate Agent', label: 'Real Estate Agent' },
  ],
  parkingNote:
    'Parking must be provided by the client for our cleaners. If parking is not available, any parking costs will be added to the invoice.',
};

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface BookingApiResponse {
  success: boolean;
  bookingNumber: string;
  status: BookingStatus;
  message: string;
}

export interface BookingConfirmationState {
  apiStatus: 'idle' | 'loading' | 'success' | 'error';
  bookingNumber?: string;
  message?: string;
}

// ============================================================================
// CONFIRMATION TYPES
// ============================================================================

export interface BookingConfirmation {
  orderNumber: string;

  serviceSummary: ServiceSummary;
  customerSummary: CustomerSummary;
  pricingSummary: PricingSummary;
  hoursSummary: HoursSummary;
}

export interface HoursSummary {
  totalHours: number;
  minimumHours: number;
}

export interface ServiceSummary {
  serviceType: ServiceType;
  scheduledDate: string;
}

export interface CustomerSummary {
  name: string;
  contact: {
    email: string;
    phone: string;
  };
  fullAddress: string;
}

export interface PricingSummary {
  totalPrice: number;
  subtotal: number;
  breakdown: ServicePricingBreakdown;
}

// ============================================================================
// PRICING BREAKDOWN TYPES
// ============================================================================

export type ServicePricingBreakdown = 
 | RegularCleaningPricing
 | OnceOffCleaningPricing
 | NDISCleaningPricing
 | EndOfLeaseCleaningPricing
 | AirbnbCleaningPricing
 | CommercialCleaningPricing;

// ============================================================================
// SERVICE MAPPING TYPES
// ============================================================================



// ============================================================================
// COMPLETE SERVICE TYPES
// ============================================================================

export interface RegularCleaningService {
  details: RegularCleaningDetails;
  pricing: RegularCleaningPricing;
}

export interface OnceOffCleaningService {
  details: OnceOffCleaningDetails;
  pricing: OnceOffCleaningPricing;
}

export interface NDISCleaningService {
  details: NDISCleaningDetails;
  pricing: NDISCleaningPricing;
}

export interface EndOfLeaseCleaningService {
  details: EndOfLeaseCleaningDetails;
  pricing: EndOfLeaseCleaningPricing;
}

export interface AirbnbCleaningService {
  details: AirbnbCleaningDetails;
  pricing: AirbnbCleaningPricing;
}

export interface CommercialCleaningService {
  details: CommercialCleaningDetails;
  pricing: CommercialCleaningPricing;
}

export type ServiceMap = {
  'Regular Cleaning': RegularCleaningService;
  'Once-Off Cleaning': OnceOffCleaningService;
  'NDIS Cleaning': NDISCleaningService;
  'End of Lease Cleaning': EndOfLeaseCleaningService;
  'Airbnb Cleaning': AirbnbCleaningService;
  'Commercial Cleaning': CommercialCleaningService;
};

// ============================================================================
// SERVICE DETAILS MAPPING
// ============================================================================

export type ServiceDetailsMap = {
  'Regular Cleaning': RegularCleaningService;
  'Once-Off Cleaning': OnceOffCleaningService;
  'NDIS Cleaning': NDISCleaningService;
  'End of Lease Cleaning': EndOfLeaseCleaningService;
  'Airbnb Cleaning': AirbnbCleaningService;
  'Commercial Cleaning': CommercialCleaningService;
};

export type ServiceDetails = ServiceDetailsMap[ServiceType];

// ============================================================================
// FINAL SERVICE DETECTION FUNCTION
// ============================================================================

/**
 * Final function that automatically detects service type and returns correct service details
 * Components just need to call this function - no complex calculations needed outside
 */
export function getServiceDetails(
  serviceType: ServiceType,
  serviceDetails: Record<string, unknown>
): ServiceDetails {
  switch (serviceType) {
    case 'Regular Cleaning':
      return serviceDetails as unknown as RegularCleaningService;
    case 'Once-Off Cleaning':
      return serviceDetails as unknown as OnceOffCleaningService;
    case 'NDIS Cleaning':
      return serviceDetails as unknown as NDISCleaningService;
    case 'End of Lease Cleaning':
      return serviceDetails as unknown as EndOfLeaseCleaningService;
    case 'Airbnb Cleaning':
      return serviceDetails as unknown as AirbnbCleaningService;
    case 'Commercial Cleaning':
      return serviceDetails as unknown as CommercialCleaningService;
    default:
      throw new Error(`Unknown service type: ${serviceType}`);
  }
}

/**
 * Type-safe service updater function
 */
export function createServiceUpdater(
  updateServiceDetails: (details: Record<string, unknown>) => void
) {
  return (updates: Record<string, unknown>) => {
    updateServiceDetails(updates);
  };
}

/**
 * Helper function to get just the details part from complete service
 */
export function getServiceDetailsOnly(
  serviceType: ServiceType,
  serviceDetails: Record<string, unknown> | null
) {
  if (!serviceDetails) return null;
  const service = getServiceDetails(serviceType, serviceDetails);
  return service.details;
}


