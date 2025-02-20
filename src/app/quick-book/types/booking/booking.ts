import type { 
    CustomerDetails 
     
} from '../details';
import type { 
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
} from '../serviceinterface';
import type { Suburb } from '../location'; 
import type { 
    ServiceBase     
} from '../service';
import { useBookingStore } from '../../store/bookingStore';

// API Response types
export interface BookingResponse {
    success: boolean;
    bookingId?: string;
    message: string;
    error?: string;
}

// Combined booking data interface
export interface BookingData {
    location: Suburb;
    service: ServiceBase;
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
    };
    customerDetails: CustomerDetails;
}

// Booking service class
export class BookingService {
    private static readonly API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`;

    static async submitBooking(): Promise<BookingResponse> {
        try {
            // 1. Gets store data and validates
            const store = useBookingStore.getState();
            const { selectedLocation, selectedService, serviceDetails, customerDetails } = store;

            // 2. Validate all required data exists
            if (!selectedLocation) {
                return {
                    success: false,
                    message: 'Failed to create booking',
                    error: 'Location not selected'
                };
            }

            if (!selectedService) {
                return {
                    success: false,
                    message: 'Failed to create booking',
                    error: 'Service not selected'
                };
            }

            if (!serviceDetails) {
                return {
                    success: false,
                    message: 'Failed to create booking',
                    error: 'Service details not provided'
                };
            }

            if (!customerDetails) {
                return {
                    success: false,
                    message: 'Failed to create booking',
                    error: 'Customer details not provided'
                };
            }

            // 3. Validate service type matches details
            if (selectedService.type === 'carpet-cleaning' && !serviceDetails['carpet-cleaning']) {
                return {
                    success: false,
                    message: 'Failed to create booking',
                    error: 'Carpet cleaning details missing'
                };
            }

            if (selectedService.type === 'end-of-lease-cleaning' && !serviceDetails['end-of-lease-cleaning']) {
                return {
                    success: false,
                    message: 'Failed to create booking',
                    error: 'End of lease details missing'
                };
            }

            if (selectedService.type === 'general-cleaning' && !serviceDetails['general-cleaning']) {
                return {
                    success: false,
                    message: 'Failed to create booking',
                    error: 'General cleaning details missing'
                };
            }

            // Add validation for other services
            if (selectedService.type === 'deep-cleaning' && !serviceDetails['deep-cleaning']) {
                return {
                    success: false,
                    message: 'Failed to create booking',
                    error: 'Deep cleaning details missing'
                };
            } 

            if (selectedService.type === 'move-in-cleaning' && !serviceDetails['move-in-cleaning']) {
                return {
                    success: false,
                    message: 'Failed to create booking',
                    error: 'Move in cleaning details missing'
                };
            }

            if (selectedService.type === 'ndis-cleaning' && !serviceDetails['ndis-cleaning']) {
                return {
                    success: false,
                    message: 'Failed to create booking',
                    error: 'NDIS cleaning details missing'
                };
            }

            if (selectedService.type === 'commercial-cleaning' && !serviceDetails['commercial-cleaning']) {
                return {
                    success: false,
                    message: 'Failed to create booking',
                    error: 'Commercial cleaning details missing'
                };
            }

            if (selectedService.type === 'after-renovation-cleaning' && !serviceDetails['after-renovation-cleaning']) {
                return {
                    success: false,
                    message: 'Failed to create booking',
                    error: 'After renovation cleaning details missing'
                };
            }

            if (selectedService.type === 'oven-cleaning' && !serviceDetails['oven-cleaning']) {
                return {
                    success: false,
                    message: 'Failed to create booking',
                    error: 'Oven cleaning details missing'
                };
            }

            if (selectedService.type === 'tile-and-floor-cleaning' && !serviceDetails['tile-and-floor-cleaning']) {
                return {
                    success: false,
                    message: 'Failed to create booking',
                    error: 'Tile and floor cleaning details missing'
                };
            }

            if (selectedService.type === 'upholstery-cleaning' && !serviceDetails['upholstery-cleaning']) {
                return {
                    success: false,
                    message: 'Failed to create booking',
                    error: 'Upholstery cleaning details missing'
                };
            }

            if (selectedService.type === 'window-cleaning' && !serviceDetails['window-cleaning']) {
                return {
                    success: false,
                    message: 'Failed to create booking',
                    error: 'Window cleaning details missing'
                };
            }

            // 4. Creates booking via API
            const response = await this.createBooking({
                location: selectedLocation,
                service: selectedService,
                serviceDetails,
                customerDetails
            });

            // 5. Returns response to component
            return response;
            
        } catch (error) {
            console.error('Submit booking error:', error);
            return {
                success: false,
                message: 'Failed to create booking',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    static async createBooking(bookingData: BookingData): Promise<BookingResponse> {
        try {
            const serviceType = bookingData.service.type;
            
            // Update specificServiceDetails to handle all service types
            const specificServiceDetails = 
                serviceType === 'carpet-cleaning' ? bookingData.serviceDetails['carpet-cleaning'] :
                serviceType === 'end-of-lease-cleaning' ? bookingData.serviceDetails['end-of-lease-cleaning'] :
                serviceType === 'general-cleaning' ? bookingData.serviceDetails['general-cleaning'] :
                serviceType === 'deep-cleaning' ? bookingData.serviceDetails['deep-cleaning'] :
                serviceType === 'move-in-cleaning' ? bookingData.serviceDetails['move-in-cleaning'] :
                serviceType === 'ndis-cleaning' ? bookingData.serviceDetails['ndis-cleaning'] :
                serviceType === 'commercial-cleaning' ? bookingData.serviceDetails['commercial-cleaning'] :
                serviceType === 'after-renovation-cleaning' ? bookingData.serviceDetails['after-renovation-cleaning'] :
                serviceType === 'oven-cleaning' ? bookingData.serviceDetails['oven-cleaning'] :
                serviceType === 'tile-and-floor-cleaning' ? bookingData.serviceDetails['tile-and-floor-cleaning'] :
                serviceType === 'upholstery-cleaning' ? bookingData.serviceDetails['upholstery-cleaning'] :
                bookingData.serviceDetails['window-cleaning'];

            const payload = {
                serviceType,
                location: bookingData.location,
                serviceDetails: specificServiceDetails,
                customerDetails: bookingData.customerDetails,
                createdAt: new Date().toISOString()
            };

            // Make the API call
            const response = await fetch(this.API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create booking');
            }

            // Update confirmationData to handle all service types
            const totalPrice = 
                bookingData.serviceDetails['carpet-cleaning']?.totalPrice ||
                bookingData.serviceDetails['end-of-lease-cleaning']?.totalPrice || 
                bookingData.serviceDetails['general-cleaning']?.totalPrice ||
                bookingData.serviceDetails['deep-cleaning']?.totalPrice ||
                bookingData.serviceDetails['move-in-cleaning']?.pricing.totalPrice ||
                bookingData.serviceDetails['ndis-cleaning']?.pricing.totalPrice ||
                bookingData.serviceDetails['commercial-cleaning']?.pricing.totalPrice ||
                bookingData.serviceDetails['after-renovation-cleaning']?.totalPrice ||
                bookingData.serviceDetails['oven-cleaning']?.totalPrice ||
                bookingData.serviceDetails['tile-and-floor-cleaning']?.totalPrice ||
                bookingData.serviceDetails['upholstery-cleaning']?.pricing.totalPrice ||
                bookingData.serviceDetails['window-cleaning']?.totalPrice ||
                0;

            const confirmationData = {
                bookingId: data.bookingId,
                bookingNumber: data.bookingNumber,
                status: 'Confirmed',
                totalPrice,
                createdAt: new Date().toISOString(),
                serviceType: bookingData.service.type,
            };

            localStorage.setItem('bookingConfirmation', JSON.stringify(confirmationData));

            return {
                success: true,
                bookingId: data.bookingId,
                message: 'Booking created successfully'
            };

        } catch (error) {
            console.error('Booking creation error:', error);
            return {
                success: false,
                message: 'Failed to create booking',
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            };
        }
    }

    // Helper method to get booking data from store with better type checking
    static getBookingDataFromStore(store: {
        selectedLocation: Suburb | null;
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
        customerDetails: CustomerDetails | null;
    }): BookingData {
        const { 
            selectedLocation,
            selectedService,
            serviceDetails,
            customerDetails 
        } = store;

        // Validate required data
        if (!selectedLocation) throw new Error('Location not selected');
        if (!selectedService) throw new Error('Service not selected');
        if (!serviceDetails) throw new Error('Service details not provided');
        if (!customerDetails) throw new Error('Customer details not provided');

        // Validate service type matches details
        if (selectedService.type === 'carpet-cleaning' && !serviceDetails['carpet-cleaning']) {
            throw new Error('Carpet cleaning details missing');
        }
        if (selectedService.type === 'end-of-lease-cleaning' && !serviceDetails['end-of-lease-cleaning']) {
            throw new Error('End of lease details missing');
        }
        if (selectedService.type === 'general-cleaning' && !serviceDetails['general-cleaning']) {
            throw new Error('General cleaning details missing');
        }
        if (selectedService.type === 'deep-cleaning' && !serviceDetails['deep-cleaning']) {
            throw new Error('Deep cleaning details missing');
        }
        if (selectedService.type === 'move-in-cleaning' && !serviceDetails['move-in-cleaning']) {
            throw new Error('Move in cleaning details missing');
        }
        if (selectedService.type === 'ndis-cleaning' && !serviceDetails['ndis-cleaning']) {
            throw new Error('NDIS cleaning details missing');
        }
        if (selectedService.type === 'commercial-cleaning' && !serviceDetails['commercial-cleaning']) {
            throw new Error('Commercial cleaning details missing');
        }
        if (selectedService.type === 'after-renovation-cleaning' && !serviceDetails['after-renovation-cleaning']) {
            throw new Error('After renovation cleaning details missing');
        }
        if (selectedService.type === 'oven-cleaning' && !serviceDetails['oven-cleaning']) {
            throw new Error('Oven cleaning details missing');
        }
        if (selectedService.type === 'tile-and-floor-cleaning' && !serviceDetails['tile-and-floor-cleaning']) {
            throw new Error('Tile and floor cleaning details missing');
        }
        if (selectedService.type === 'upholstery-cleaning' && !serviceDetails['upholstery-cleaning']) {
            throw new Error('Upholstery cleaning details missing');
        }
        if (selectedService.type === 'window-cleaning' && !serviceDetails['window-cleaning']) {
            throw new Error('Window cleaning details missing');
        }

        return {
            location: selectedLocation,
            service: selectedService,
            serviceDetails,
            customerDetails
        };
    }
}

export interface ServiceComponentProps {
    isSelected: boolean;
    onSelect: () => void;
}