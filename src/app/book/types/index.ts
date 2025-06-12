export type BookingType = 'once-off' | 'regular' | null;
export type FrequencyType = 'weekly' | 'fortnightly' | 'once' | null;
export type BookingCategory = 'individual' | 'business';

export type ServiceType =
  | 'General Cleaning'
  | 'NDIS Cleaning'
  | 'Move-In Cleaning'
  | 'Move-Out Cleaning'
  | 'Inspection Cleaning'
  | 'Deep/Spring Cleaning'
  | 'AirBNB Cleaning'
  | null;

export type MinHours = number | null;
export type MinAmount = number | null;
export type BaseRate = number | null;

export interface ServicePricing {
  minHours: number;
  minAmount: number;
  baseRate: number;
}

export type PricingTable = {
  [F in Exclude<FrequencyType, null>]: {
    [S in Exclude<ServiceType, null>]: ServicePricing;
  };
};

export type ExtraHours = number | null;
export type TotalHours = number | null;
export type TotalPrice = number | null;

export interface Address {
  street: string;
  suburb: string;
  state: string;
  postcode: string;
  additionalInfo?: string;
}

export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export type AddressType = Address | null;
export type ContactInfoType = ContactInfo | null;

export type TimePreference = 'morning' | 'afternoon' | 'evening' | null;
export type PreferredDate = string | null; // ISO string format

export interface BookingPreferences {
  preferredDate: PreferredDate;
  timePreference: TimePreference;
}

export type BookingPreferencesType = BookingPreferences | null;

export interface BookingPayload {
  bookingType: BookingType;
  frequency: FrequencyType;
  bookingCategory?: BookingCategory;
  serviceType?: ServiceType;
  minHours?: MinHours;
  minAmount?: MinAmount;
  baseRate?: BaseRate;
  extraHours?: ExtraHours;
  totalHours?: TotalHours;
  totalPrice?: TotalPrice;
  address?: AddressType;
  contactInfo?: ContactInfoType;
  bookingPreferences?: BookingPreferencesType;
  // Authentication-related fields
  isAuthenticated?: boolean;
  customerId?: string | null;
}

export interface BookingResponse {
  bookingNumber?: string | number;
  booking_number?: string | number;
  bookingId?: string | number;
  id?: string | number;
  success?: boolean;
  message?: string;
  customerId?: string | number;
  isAuthenticated?: boolean;
  [key: string]: unknown;
}

// Customer & Authentication Types
export interface QuickCustomer {
  id: string;
  first_name: string;
  last_name?: string;
  email: string;
  phone?: string;
  street?: string;
  suburb?: string;
  state?: string;
  postcode?: string;
  additional_info?: string;
  created_at?: string;
  booking_id?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  customer: QuickCustomer | null;
  loginTime: number | null;
}

export interface CustomerSession {
  isAuthenticated: boolean;
  customer: QuickCustomer | null;
  loading: boolean;
}



 