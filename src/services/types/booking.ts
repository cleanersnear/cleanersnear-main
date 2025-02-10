export type ServiceType = 
    | 'deep-clean'
    | 'carpet-clean'
    | 'general-clean'
    | 'end-of-lease'
    | 'commercial-clean'
    | 'renovation-clean' 
    | 'move-in-out'
    | 'ndis-clean'
    | 'upholstery-clean';

export interface Booking {
    service: {
        type: ServiceType;
        name: string;
        price: number;
        
    };
    // ... rest of the interface
} 