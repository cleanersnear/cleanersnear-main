import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  BookingSession,
  BookingStep,
  BookingStatus,
  ServiceType,
  CustomerDetails,
  ServicePricingBreakdown,
  BookingApiResponse,
  BookingConfirmationState,
} from '../types';

// ============================================================================
// FRESH BOOKING STORE - SINGLE SOURCE OF TRUTH
// ============================================================================

export interface BookingState extends BookingSession {
  // Service-specific details (null when no service selected, typed when service selected)
  serviceDetails: Record<string, unknown> | null;
  
  // Confirmation state
  confirmationState: BookingConfirmationState;
  
  // Actions
  setSelectedService: (service: ServiceType) => void;
  setCurrentStep: (step: BookingStep) => void;
  updateServiceDetails: (details: Record<string, unknown>) => void;
  updateCustomerDetails: (details: Partial<CustomerDetails>) => void;
  updatePricing: (pricing: ServicePricingBreakdown) => void;
  submitBooking: () => Promise<BookingApiResponse>;
  resetBooking: () => void;
}

const initialState = {
  id: '',
  currentStep: 1 as BookingStep,
  status: 'pending' as BookingStatus,
  selectedService: null as ServiceType | null,
  serviceDetails: null as Record<string, unknown> | null,
  customerDetails: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    scheduleDate: '',
    // Additional Information
    notes: '',
    // Service-specific details (optional, initialized as empty objects)
    ndisDetails: undefined,
    commercialDetails: undefined,
    endOfLeaseDetails: undefined,
  },
  pricing: {} as ServicePricingBreakdown,
  timestamps: {
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
  },
  confirmationState: {
    apiStatus: 'idle' as const,
    bookingNumber: undefined,
    message: undefined,
  },
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      ...initialState,
      
      setSelectedService: (service: ServiceType) => {
        set((state) => ({
          selectedService: service,
          serviceDetails: {}, // Initialize empty service details when service is selected
          currentStep: 2 as BookingStep,
          timestamps: {
            ...state.timestamps,
            updated: new Date().toISOString(),
          },
        }));
      },
      
      setCurrentStep: (step: BookingStep) => {
        set((state) => ({
          currentStep: step,
          timestamps: {
            ...state.timestamps,
            updated: new Date().toISOString(),
          },
        }));
      },
      
      updateServiceDetails: (details: Record<string, unknown>) => {
        set((state) => ({
          serviceDetails: { ...state.serviceDetails, ...details },
          timestamps: {
            ...state.timestamps,
            updated: new Date().toISOString(),
          },
        }));
      },
      
      updateCustomerDetails: (details: Partial<CustomerDetails>) => {
        set((state) => ({
          customerDetails: { ...state.customerDetails, ...details },
          timestamps: {
            ...state.timestamps,
            updated: new Date().toISOString(),
          },
        }));
      },
      
      updatePricing: (pricing: ServicePricingBreakdown) => {
        set((state) => ({
          pricing,
          timestamps: {
            ...state.timestamps,
            updated: new Date().toISOString(),
          },
        }));
      },
      
      submitBooking: async () => {
        set((state) => ({
          confirmationState: {
            ...state.confirmationState,
            apiStatus: 'loading',
          },
        }));

        try {
          // Prepare booking data for API submission
          const bookingData = {
            selectedService: useBookingStore.getState().selectedService,
            serviceDetails: useBookingStore.getState().serviceDetails,
            customerDetails: useBookingStore.getState().customerDetails,
            pricing: useBookingStore.getState().pricing,
            timestamps: useBookingStore.getState().timestamps,
          };

          // Call API endpoint - Use environment variable for API URL
          const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
          const apiUrl = `${apiBaseUrl}/api/bookings`;
          
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
          });

          if (!response.ok) {
            console.error('❌ API Error Response:', {
              status: response.status,
              statusText: response.statusText,
              url: response.url,
              headers: Object.fromEntries(response.headers.entries())
            });
            throw new Error(`API request failed with status: ${response.status}`);
          }

          const result: BookingApiResponse = await response.json();
          console.log('✅ API Response received:', result);

          set((state) => ({
            confirmationState: {
              apiStatus: 'success',
              bookingNumber: result.bookingNumber,
              message: result.message,
            },
            status: result.status,
            timestamps: {
              ...state.timestamps,
              updated: new Date().toISOString(),
            },
          }));

          return result;
        } catch (error) {
          console.error('Booking submission error:', error);
          
          set((state) => ({
            confirmationState: {
              apiStatus: 'error',
              message: 'Failed to submit booking. Please try again.',
            },
            status: 'error',
            timestamps: {
              ...state.timestamps,
              updated: new Date().toISOString(),
            },
          }));

          throw error;
        }
      },
      
      resetBooking: () => {
        set(initialState);
      },
    }),
    {
      name: 'booking-store',
      partialize: (state) => ({
        selectedService: state.selectedService,
        serviceDetails: state.serviceDetails,
        customerDetails: state.customerDetails,
        pricing: state.pricing,
        currentStep: state.currentStep,
        confirmationState: state.confirmationState,
      }),
    }
  )
);
