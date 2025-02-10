import { create } from 'zustand';

interface BookingDetails {
    service: {
        name: string;
        type: string;
        frequency: string | null;
        regularFrequency?: string;
        hours?: number;
        price: number;
        hourlyRate: number;
        details: {
            propertySize: string;
            bathrooms: string;
            toilets: string;
            propertyType: string;
            hasPets: boolean;
            notes: string;
            ndisDetails?: {
                clientNumber: string;
                clientName: string;
                caseManager: {
                    name: string;
                    email: string;
                    phone: string;
                };
                fundingCompany: {
                    name: string;
                    email: string;
                    phone: string;
                    referenceNumber?: string;
                };
            };
        };
    };
}

interface BookingStore {
    booking: BookingDetails | null;
    setBooking: (booking: BookingDetails) => void;
    clearBooking: () => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
    booking: null,
    setBooking: (booking) => set({ booking }),
    clearBooking: () => set({ booking: null }),
})); 