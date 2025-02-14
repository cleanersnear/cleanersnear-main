import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
    Suburb,      
    ServiceBase,    
    CarpetCleaningDetails,
    EndOfLeaseDetails,
    GeneralCleaningDetails,
    DeepCleaningDetails,
    MoveInCleaningDetails,
    NDISCleaningDetails,
    CommercialCleaningDetails,
    AfterRenovationCleaningDetails,
    OvenCleaningDetails,
    TileAndFloorCleaningDetails,
    UpholsteryCleaningDetails,
    WindowCleaningDetails
} from '../types';
import type { CustomerDetails } from '../types/details';

interface ServiceState {
    selectedService: ServiceBase | null;
    serviceDetails: {
        // Popular services
        'carpet-cleaning'?: CarpetCleaningDetails;
        'end-of-lease-cleaning'?: EndOfLeaseDetails;
        'general-cleaning'?: GeneralCleaningDetails;
        'deep-cleaning'?: DeepCleaningDetails;
        'move-in-cleaning'?: MoveInCleaningDetails;
        'ndis-cleaning'?: NDISCleaningDetails;
        'commercial-cleaning'?: CommercialCleaningDetails;
        // Other services
        'after-renovation-cleaning'?: AfterRenovationCleaningDetails;
        'oven-cleaning'?: OvenCleaningDetails;
        'tile-and-floor-cleaning'?: TileAndFloorCleaningDetails;
        'upholstery-cleaning'?: UpholsteryCleaningDetails;
        'window-cleaning'?: WindowCleaningDetails;
    } | null;
}

interface BookingState extends ServiceState {
    // Current step tracking
    currentStep: 'location' | 'service' | 'details' | 'confirmation';
    
    // Location state
    selectedLocation: Suburb | null;
    
    // Customer details
    customerDetails: CustomerDetails | null;
    
    // Actions
    setLocation: (suburb: Suburb) => void;
    resetLocation: () => void;
    
    setService: (service: ServiceBase) => void;
    resetService: () => void;
    
    // Update type references
    setCarpetCleaningDetails: (details: CarpetCleaningDetails) => void;
    setEndOfLeaseDetails: (details: EndOfLeaseDetails) => void;
    setGeneralCleaningDetails: (details: GeneralCleaningDetails) => void;
    setDeepCleaningDetails: (details: DeepCleaningDetails) => void;
    setMoveInCleaningDetails: (details: MoveInCleaningDetails) => void;
    setNDISCleaningDetails: (details: NDISCleaningDetails) => void;
    setCommercialCleaningDetails: (details: CommercialCleaningDetails) => void;
    setAfterRenovationCleaningDetails: (details: AfterRenovationCleaningDetails) => void;
    setOvenCleaningDetails: (details: OvenCleaningDetails) => void;
    setTileAndFloorCleaningDetails: (details: TileAndFloorCleaningDetails) => void;
    setUpholsteryCleaningDetails: (details: UpholsteryCleaningDetails) => void;
    setWindowCleaningDetails: (details: WindowCleaningDetails) => void;
    
    resetServiceDetails: () => void;
    
    // Navigation action
    setCurrentStep: (step: BookingState['currentStep']) => void;
    
    // Customer details actions
    updateCustomerDetails: (details: Partial<CustomerDetails>) => void;
    resetCustomerDetails: () => void;
    
    // Reset all
    resetBooking: () => void;

    isBookingSummaryVisible: boolean;
    toggleBookingSummary: () => void;
}

export const useBookingStore = create<BookingState>()(
    persist(
        (set) => ({
            // Initial state
            currentStep: 'location',
            selectedLocation: null,
            selectedService: null,
            serviceDetails: null,
            customerDetails: null,
            isBookingSummaryVisible: false,
            toggleBookingSummary: () => set((state) => ({ 
                isBookingSummaryVisible: !state.isBookingSummaryVisible 
            })),

            // Location actions
            setLocation: (suburb) => 
                set({ 
                    selectedLocation: suburb,
                    currentStep: 'service' 
                }),
            
            resetLocation: () => 
                set({ 
                    selectedLocation: null,
                    currentStep: 'location' 
                }),

            // Service actions
            setService: (service) =>
                set((state) => {
                    // Clear previous service details when changing service
                    const newServiceDetails = service.type !== state.selectedService?.type 
                        ? null 
                        : state.serviceDetails;

                    return {
                        selectedService: service,
                        serviceDetails: newServiceDetails,
                        currentStep: 'details'
                    };
                }),

            resetService: () =>
                set({
                    selectedService: null,
                    currentStep: 'service'
                }),

            // Type-safe service detail setters
            setCarpetCleaningDetails: (details) =>
                set((state) => ({
                    serviceDetails: {
                        ...state.serviceDetails,
                        'carpet-cleaning': details
                    }
                })),

            setEndOfLeaseDetails: (details) =>
                set((state) => ({
                    serviceDetails: {
                        ...state.serviceDetails,
                        'end-of-lease-cleaning': details
                    }
                })),

            setGeneralCleaningDetails: (details) => set((state) => ({
                serviceDetails: {
                    ...state.serviceDetails,
                    'general-cleaning': details
                }
            })),

            setDeepCleaningDetails: (details) => set((state) => ({
                serviceDetails: {
                    ...state.serviceDetails,
                    'deep-cleaning': details
                }
            })),

            setMoveInCleaningDetails: (details) => set((state) => ({
                serviceDetails: {
                    ...state.serviceDetails,
                    'move-in-cleaning': details
                }
            })),

            setNDISCleaningDetails: (details) => set((state) => ({
                serviceDetails: {
                    ...state.serviceDetails,
                    'ndis-cleaning': details
                }
            })),

            setCommercialCleaningDetails: (details) => set((state) => ({
                serviceDetails: {
                    ...state.serviceDetails,
                    'commercial-cleaning': details
                }
            })),

            setAfterRenovationCleaningDetails: (details) => set((state) => ({
                serviceDetails: {
                    ...state.serviceDetails,
                    'after-renovation-cleaning': details
                }
            })),

            setOvenCleaningDetails: (details) => set((state) => ({
                serviceDetails: {
                    ...state.serviceDetails,
                    'oven-cleaning': details
                }
            })),

            setTileAndFloorCleaningDetails: (details) => set((state) => ({
                serviceDetails: {
                    ...state.serviceDetails,
                    'tile-and-floor-cleaning': details
                }
            })),

            setUpholsteryCleaningDetails: (details) => set((state) => ({
                serviceDetails: {
                    ...state.serviceDetails,
                    'upholstery-cleaning': details
                }
            })),

            setWindowCleaningDetails: (details) => set((state) => ({
                serviceDetails: {
                    ...state.serviceDetails,
                    'window-cleaning': details
                }
            })),

            resetServiceDetails: () =>
                set({ serviceDetails: null }),

            // Navigation action
            setCurrentStep: (step) => 
                set({ currentStep: step }),

            // Customer details actions
            updateCustomerDetails: (details) =>
                set((state) => ({
                    customerDetails: state.customerDetails 
                        ? { ...state.customerDetails, ...details }
                        : details as CustomerDetails
                })),

            resetCustomerDetails: () =>
                set({ customerDetails: null }),

            // Reset entire booking
            resetBooking: () =>
                set({
                    currentStep: 'location',
                    selectedLocation: null,
                    selectedService: null,
                    serviceDetails: null,
                    customerDetails: null
                }),
        }),
        {
            name: 'booking-storage',
            partialize: (state) => ({
                selectedLocation: state.selectedLocation,
                selectedService: state.selectedService,
                serviceDetails: state.serviceDetails,
                customerDetails: state.customerDetails,
                currentStep: state.currentStep,
            }),
        }
    )
);

// Helper hook for type-safe access to booking progress
export const useBookingProgress = () => {
    const currentStep = useBookingStore(state => state.currentStep);
    const location = useBookingStore(state => state.selectedLocation);
    const service = useBookingStore(state => state.selectedService);

    return {
        isLocationSelected: location !== null,
        isServiceSelected: service !== null,
        currentStep,
        canProceedToService: location !== null,
        canProceedToDetails: location !== null && service !== null,
    };
};

// Type-safe selector
type AvailableServiceType = 'carpet-cleaning' | 'end-of-lease-cleaning' | 'general-cleaning';

export const useServiceDetails = (type: AvailableServiceType) => 
    useBookingStore(state => state.serviceDetails?.[type]); 