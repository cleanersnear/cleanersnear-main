import { CustomerDetails } from '../types';

// Property Types
type HomeSizeType = 'studio' | '1bed' | '2bed' | '3bed' | '4bed' | '5plus';
type PropertyType = 'single' | 'double' | 'apartment';
type ParkingType = 'none' | 'street' | 'provided' | 'paid';
type UserType = 'owner' | 'agent' | 'tenant';

type KitchenCleaningLevel = 'light' | 'moderate' | 'heavy';

// Carpet Areas Interface
interface CarpetAreas {
    bedrooms: number;
    loungeRooms: number;
    hallway: boolean;
    stairs: boolean;
}

// Main Service Interface
interface EndOfLeaseDetails {
    propertyDetails: {
        size: HomeSizeType;
        bathrooms: string;
        toilets: string;
        propertyType: PropertyType;
        isFurnished: boolean;
        hasStudyRoom: boolean;
    };
    kitchenCondition: {
        rating: number;  // 1-10
        cleaningLevel: KitchenCleaningLevel;
    };
    carpetCleaning: {
        required: boolean;
        areas: CarpetAreas;
    };
    parking: {
        type: ParkingType;
    };
    customerInfo: {
        userType: UserType;
        tenancyDuration: string;
        hasPets: boolean;
        additionalNotes: string;
    };
    extras: string[];
}

// Price Configuration
const PRICE_CONFIG = {
    basePrice: {
        studio: 180,
        oneBed: 230,
        twoBed: 285,
        threeBed: 350,
        fourBed: 500
    },
    extras: [
        { name: 'Balcony/Patio Clean', price: 25 },
        { name: 'Garage Clean', price: 30 }
    ],
    additionalFees: {
        bathroom: 15,    // per additional bathroom beyond 1
        toilet: 5,      // per additional toilet beyond 2
        furnished: 60,   // furnished property fee
        pets: 15,       // pet cleaning fee
        studyRoom: 10,  // study room fee
        kitchenHeavy: 55,   // heavy kitchen cleaning
        kitchenModerate: 25  // moderate kitchen cleaning
    }
};

// Service Submission Interface
interface EndOfLeaseSubmission {
    customerDetails: CustomerDetails; // Will be provided by details service
    service: {
        name: "End of Lease Clean";
        type: "end-of-lease";
        price: number;
        details: EndOfLeaseDetails;
        priceBreakdown: Array<{

            description: string;
            amount: number;
        }>;
    };
}

// Service handler
export const endOfLeaseCleaningService = {
    submit: async (data: EndOfLeaseSubmission) => {
        try {
            // For now, just store the data and return a mock response
            const mockBookingNumber = `EOL${Math.floor(Math.random() * 10000)}`;
            
            // Store complete booking data
            localStorage.setItem('bookingDetails', JSON.stringify({
                ...data.customerDetails,
                bookingNumber: mockBookingNumber,
                service: data.service
            }));

            return {
                success: true,
                message: 'End of lease cleaning booking stored successfully',
                bookingNumber: mockBookingNumber
            };
        } catch (error) {
            console.error('Error storing end of lease cleaning details:', error);
            throw error;
        }
    },

    // Helper function to calculate price
    calculatePrice: (details: EndOfLeaseDetails): number => {
        let totalPrice = PRICE_CONFIG.basePrice[
            details.propertyDetails.size === 'studio' ? 'studio' : 
            details.propertyDetails.size === '1bed' ? 'oneBed' : 
            details.propertyDetails.size === '2bed' ? 'twoBed' : 
            details.propertyDetails.size === '3bed' ? 'threeBed' : 'fourBed'
        ];

        // Add bathroom cost (only for additional bathrooms beyond 1)
        const extraBathrooms = Math.max(0, parseInt(details.propertyDetails.bathrooms) - 1);
        if (extraBathrooms > 0) {
            totalPrice += extraBathrooms * PRICE_CONFIG.additionalFees.bathroom;
        }
        
        // Add toilet cost (only for additional toilets beyond 2)
        const extraToilets = Math.max(0, parseInt(details.propertyDetails.toilets) - 2);
        if (extraToilets > 0) {
            totalPrice += extraToilets * PRICE_CONFIG.additionalFees.toilet;
        }

        // Add furnished fee
        if (details.propertyDetails.isFurnished) {
            totalPrice += PRICE_CONFIG.additionalFees.furnished;
        }

        // Add kitchen condition fee
        if (details.kitchenCondition.cleaningLevel === 'heavy') {
            totalPrice += PRICE_CONFIG.additionalFees.kitchenHeavy;
        } else if (details.kitchenCondition.cleaningLevel === 'moderate') {
            totalPrice += PRICE_CONFIG.additionalFees.kitchenModerate;
        }

        // Add study room fee
        if (details.propertyDetails.hasStudyRoom) {
            totalPrice += PRICE_CONFIG.additionalFees.studyRoom;
        }

        // Add pet fee
        if (details.customerInfo.hasPets) {
            totalPrice += PRICE_CONFIG.additionalFees.pets;
        }

        // Add selected extras
        details.extras.forEach(extraName => {
            const extra = PRICE_CONFIG.extras.find(e => e.name === extraName);
            if (extra) {
                totalPrice += extra.price;
            }
        });

        return totalPrice;
    }
}; 