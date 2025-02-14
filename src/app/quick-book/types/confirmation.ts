export interface BookingConfirmation {
    bookingId: string;
    bookingNumber: string;
    status: string;
    totalPrice: number;
    createdAt: string;
    serviceType: string;
    customer: {
        firstName: string;
        lastName: string;
        phone: string;
        address: string;
    };
    scheduling: {
        date: string;
        time: string;
        isFlexibleDate: boolean;
        isFlexibleTime: boolean;
    };
} 