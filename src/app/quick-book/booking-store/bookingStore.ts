import { create } from 'zustand';
import { BookingType, FrequencyType, BookingCategory, ServiceType, MinHours, MinAmount, BaseRate, ExtraHours, TotalHours, TotalPrice, AddressType, BookingPreferencesType, ContactInfoType, BookingPayload, BookingResponse, QuickCustomer, AuthState } from '../types';

interface BookingStore extends AuthState {
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
  
  // Booking Actions
  setBookingType: (type: BookingType) => void;
  setFrequency: (frequency: FrequencyType) => void;
  setBookingCategory: (category: BookingCategory) => void;
  setServiceType: (serviceType: ServiceType) => void;
  setMinHours: (minHours: MinHours) => void;
  setMinAmount: (minAmount: MinAmount) => void;
  setBaseRate: (baseRate: BaseRate) => void;
  setExtraHours: (extraHours: ExtraHours) => void;
  setTotalHours: (totalHours: TotalHours) => void;
  setTotalPrice: (totalPrice: TotalPrice) => void;
  setAddress: (address: AddressType) => void;
  setContactInfo: (contactInfo: ContactInfoType) => void;
  setBookingPreferences: (preferences: BookingPreferencesType) => void;
  sendBookingToBackend: () => Promise<BookingResponse>;
  
  // Authentication Actions
  setIsAuthenticated: (value: boolean) => void;
  setCustomer: (customer: QuickCustomer | null) => void;
  setLoginTime: (time: number | null) => void;
  
  // Step Management
  steps: { label: string }[];
  currentStep: number;
  setSteps: (steps: { label: string }[]) => void;
  setCurrentStep: (step: number) => void;
}

export const useBookingStore = create<BookingStore>((set, get) => ({
  // Authentication State
  isAuthenticated: false,
  customer: null,
  loginTime: null,
  
  // Booking State
  bookingType: null,
  frequency: null,
  bookingCategory: undefined,
  serviceType: null,
  minHours: null,
  minAmount: null,
  baseRate: null,
  extraHours: 0,
  totalHours: null,
  totalPrice: null,
  address: null,
  contactInfo: null,
  bookingPreferences: null,
  
  // Booking Actions
  setBookingType: (type) => set({ bookingType: type }),
  setFrequency: (frequency) => set({ frequency }),
  setBookingCategory: (category) => set({ bookingCategory: category }),
  setServiceType: (serviceType) => set({ serviceType }),
  setMinHours: (minHours) => set({ minHours }),
  setMinAmount: (minAmount) => set({ minAmount }),
  setBaseRate: (baseRate) => set({ baseRate }),
  setExtraHours: (extraHours) => set({ extraHours }),
  setTotalHours: (totalHours) => set({ totalHours }),
  setTotalPrice: (totalPrice) => set({ totalPrice }),
  setAddress: (address) => set({ address }),
  setContactInfo: (contactInfo) => set({ contactInfo }),
  setBookingPreferences: (preferences) => set({ bookingPreferences: preferences }),
  
  // Authentication Actions
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setCustomer: (customer) => set({ customer }),
  setLoginTime: (time) => set({ loginTime: time }),
  
  sendBookingToBackend: async (): Promise<BookingResponse> => {
    const state: BookingStore = get();
    const bookingData: BookingPayload = {
      bookingType: state.bookingType,
      frequency: state.frequency,
      bookingCategory: state.bookingCategory,
      serviceType: state.serviceType,
      minHours: state.minHours,
      minAmount: state.minAmount,
      baseRate: state.baseRate,
      extraHours: state.extraHours,
      totalHours: state.totalHours,
      totalPrice: state.totalPrice,
      address: state.address,
      contactInfo: state.contactInfo,
      bookingPreferences: state.bookingPreferences,
      isAuthenticated: state.isAuthenticated,
      customerId: state.customer?.id || null,
    };

    // Base API URLs
     
    const API_BASE = process.env.NEXT_PUBLIC_API_URL;
    const API_BASE_URL = API_BASE + '/api';
   
    const response: Response = await fetch(`${API_BASE_URL}/quick-book/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });
    if (!response.ok) throw new Error('Failed to submit booking');
    return await response.json() as BookingResponse;
  },
  
  // Step Management
  steps: [
    { label: 'Intro' },
    { label: 'Service Type' },
    { label: 'Extra Hours' },
    { label: 'Address' },
    { label: 'Date' },
    { label: 'Time' },
    { label: 'Phone' },
    { label: 'Name' },
    { label: 'Email' },
    { label: 'Confirmation' }
  ],
  currentStep: 1,
  setSteps: (steps) => set({ steps }),
  setCurrentStep: (step) => set({ currentStep: step }),
})); 