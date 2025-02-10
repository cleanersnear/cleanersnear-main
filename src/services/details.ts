import { ApiResponse } from './types';


// Types
export type StateOptions = "VIC" | "NSW" | "QLD" | "WA" | "SA" | "TAS" | "ACT" | "NT";
export type TimeSlot = "morning" | "afternoon" | "evening";

// Customer submission interface
interface CustomerSubmissionDetails {
    firstName: string;
    lastName?: string;
    email: string;
    phone: string;
    address: {
        street: string;
        unit?: string;
        suburb: string;
        postcode: string;
        state: StateOptions;
        instructions?: string;
    };
    date: string;
    time: TimeSlot;
    isFlexibleDate: boolean;
    isFlexibleTime: boolean;
}



export interface CustomerDetails {
    firstName: string;
    lastName?: string;
    email: string;
    phone: string;
    address: {
        street: string;
        unit?: string;
        suburb: string;
        postcode: string;
        state: StateOptions;
        instructions?: string;
    };
    date: string;
    time: TimeSlot;
    isFlexibleDate: boolean;
    isFlexibleTime: boolean;
}

// Service handler
export const detailsService = {
    // Store customer details
    submit: async (customerDetails: CustomerDetails): Promise<ApiResponse> => {
        try {
            localStorage.setItem('customerDetails', JSON.stringify(customerDetails));
            return {
                success: true,
                message: 'Details saved successfully'
            };
        } catch (error) {
            console.error('Error storing customer details:', error);
            return {
                success: false,
                message: 'Failed to save customer details'
            };
        }
    },

    // Get stored details
    getStoredDetails: () => {
        const details = localStorage.getItem('customerDetails');
        return details ? JSON.parse(details) : null;
    },

    // Clear stored details
    clearDetails: () => {
        localStorage.removeItem('customerDetails');
    },

    // Save to localStorage
    submitToBackend: async (customerDetails: CustomerSubmissionDetails): Promise<ApiResponse> => {
        try {
            const serviceData = JSON.parse(localStorage.getItem('selectedService') || '{}');
            
            console.log('Submitting to backend:', {
                customerDetails,
                serviceData
            });

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/details/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerDetails,
                    serviceDetails: serviceData
                })
            });

            const responseData = await response.json();
            console.log('Backend response:', responseData);

            if (!response.ok) {
                throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
            }
            
            if (responseData.success) {
                // Store both booking details and confirmation
                localStorage.setItem('bookingDetails', JSON.stringify(responseData.data));
                localStorage.setItem('bookingConfirmation', JSON.stringify(responseData.data));
                console.log('Stored booking data:', responseData.data);
                
                // Clean up
                localStorage.removeItem('selectedService');
            }

            return responseData;
        } catch (error) {
            console.error('Error submitting booking:', error);
            throw error;
        }
    }
};










