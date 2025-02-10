import { ApiResponse, CustomerDetails } from '../types';

// Contact Information Types
interface ContactInfo {
    name: string;
    phone: string;
    email: string;
}

// Property Details Types
interface PropertyAddress {
    street: string;
    unit?: string;
    suburb: string;
    state: string;
    postcode: string;
}

// Main Service Interface
interface RenovationCleaningDetails {
    contact: ContactInfo;
    property: {
        type: string;
        address: PropertyAddress;
    };
    renovation: {
        type: string;
        expectedDate: string;
        additionalInfo: string;
    };
    preferences: {
        preferredContact: 'phone' | 'email';
        bestTimeToContact: string;
    };
}

// Service Submission Interface
interface RenovationCleaningSubmission {
    customerDetails: CustomerDetails;
    service: {
        name: "After Renovation Clean";
        type: "renovation-clean";
        details: RenovationCleaningDetails;
    };
}

// Service handler
export const renovationCleaningService = {
    submit: async (data: RenovationCleaningSubmission): Promise<ApiResponse> => {
        try {
            // For now, just store the data and return a mock response
            const mockBookingNumber = `REN${Math.floor(Math.random() * 10000)}`;
            
            // Store complete booking data
            localStorage.setItem('bookingDetails', JSON.stringify({
                ...data.customerDetails,
                bookingNumber: mockBookingNumber,
                service: data.service
            }));

            return {
                success: true,
                message: 'Renovation cleaning enquiry stored successfully',
                bookingNumber: mockBookingNumber
            };
        } catch (error) {
            console.error('Error storing renovation cleaning details:', error);
            throw error;
        }
    }
}; 