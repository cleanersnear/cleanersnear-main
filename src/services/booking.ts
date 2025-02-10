import { serviceManager, SelectedService } from './serviceManager';
import { detailsService } from './details';
import { CustomerDetails } from './details';

export interface BookingSubmitRequest {
    customer: CustomerDetails;
    booking: CustomerDetails & {
        totalPrice: number;
    };
    serviceDetails: SelectedService;
}

interface BookingResponse {
    success: boolean;
    message?: string;
    data?: {
        bookingId: string;
        bookingNumber: string;
        customerReference: string;
        serviceReference: string;
        status: 'pending' | 'confirmed' | 'completed';
        totalPrice: number;
        createdAt: string;
    };
}

export const bookingService = {
    submitBooking: async (request: BookingSubmitRequest): Promise<BookingResponse> => {
        try {
            const { customer, booking, serviceDetails } = request;

            // 3. Structure data for backend tables
            const bookingData = {
                // Customer table data
                customer: {
                    firstName: customer.firstName,
                    lastName: customer.lastName,
                    email: customer.email,
                    phone: customer.phone,
                    address: customer.address
                },
                
                // Booking table data
                booking: {
                    serviceType: serviceDetails.type,
                    scheduledDate: booking.date,
                    scheduledTime: booking.time,
                    isFlexibleDate: booking.isFlexibleDate,
                    isFlexibleTime: booking.isFlexibleTime,
                    status: 'pending',
                    totalPrice: booking.totalPrice
                },
                
                // Service specific table data
                serviceDetails: serviceDetails
            };

            // 4. Submit to backend
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingData)
            });

            const responseData = await response.json();

            if (responseData.success) {
                // Store confirmation with all references
                localStorage.setItem('bookingConfirmation', JSON.stringify(responseData.data));
                // Clean up after successful booking
                detailsService.clearDetails();
                serviceManager.clearSelectedService();
            }

            return responseData;
        } catch (error) {
            console.error('Error submitting booking:', error);
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Failed to submit booking'
            };
        }
    }
}; 