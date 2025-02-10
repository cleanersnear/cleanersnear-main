import {CustomerDetails } from '../types';

// Property Types
export type HomeSizeType = 'studio' | '1bed' | '2bed' | '3bed' | '4bed' | '5plus';
type PropertyType = 'single' | 'double' | 'apartment';
type FrequencyType = 'once' | 'regular' | null;
type RegularFrequencyType = 'weekly' | 'biweekly' | 'monthly';
type ContractPeriod = '3' | '6' | '12';
type PricingType = 'hourly' | 'flat' | null;
type ParkingType = 'street' | 'provided' | 'paid' | 'none';

// Extra Services Interface
interface ExtraService {
    id: string;
    name: string;
    price: number;
}

// Main Service Interface
interface GeneralCleaningDetails {
    propertyDetails: {
        size: HomeSizeType;
        bathrooms: string;
        toilets: string;
        propertyType: PropertyType;
    };
    serviceFrequency: {
        type: FrequencyType;
        regularFrequency?: RegularFrequencyType;
        minContract?: ContractPeriod;
    };
    pricing: {
        type: PricingType;
        hours?: number;
        customHours?: number;
    };
    additionalOptions: {
        hasPets: boolean;
        providesEquipment: boolean;
        parkingType: ParkingType;
        selectedExtras: string[];
        additionalNotes: string;
    };
}

// Price Configuration
const PRICE_CONFIG = {
    baseRates: {
        hourly: {
            once: 65,    // $65/hour for once-off
            regular: 55  // $55/hour for regular
        },
        flat: {
            studio: 130,
            oneBed: 150,
            twoBed: 170,
            threeBed: 200,
            fourBed: 230
        }
    },
    discounts: {
        weekly: 0.15,   // 15% off
        biweekly: 0.10, // 10% off
        monthly: 0.05   // 5% off
    },
    extras: {
        pets: 15,
        noEquipment: 10
    }
};

// Extra Services Configuration
const EXTRA_SERVICES: ExtraService[] = [
    { id: 'inside-cabinets', name: 'Inside Cabinets', price: 30 },
    { id: 'inside-fridge', name: 'Inside Fridge', price: 25 },
    { id: 'inside-oven', name: 'Inside Oven', price: 35 },
    { id: 'laundry', name: 'Laundry', price: 20 },
    { id: 'balcony', name: 'Balcony', price: 25 },
    { id: 'garage', name: 'Garage', price: 30 }
];

// Service Submission Interface
interface GeneralCleaningSubmission {
    customerDetails: CustomerDetails; // Will be provided by details service
    service: {
        name: "General Clean";
        type: "general-clean";
        price: number;
        details: GeneralCleaningDetails;
        priceBreakdown: Array<{
            description: string;
            amount: number;
        }>;
    };
}

interface PriceBreakdownItem {
    description: string;
    amount: number;
}

interface PriceCalculation {
    total: number;
    breakdown: PriceBreakdownItem[];
}

// Service handler
export const generalCleaningService = {
    calculatePrice(details: GeneralCleaningDetails): PriceCalculation {
        let totalPrice = 0;
        const breakdown: PriceBreakdownItem[] = [];

        try {
            // 1. Base Price Calculation
            if (details.pricing.type === 'hourly') {
                const baseRate = details.serviceFrequency.type === 'once' 
                    ? PRICE_CONFIG.baseRates.hourly.once 
                    : PRICE_CONFIG.baseRates.hourly.regular;
                
                const hours = details.pricing.customHours || details.pricing.hours || 0;
                const basePrice = baseRate * hours;
                totalPrice += basePrice;
                
                breakdown.push({
                    description: `Hourly Rate (${hours} hours @ $${baseRate}/hr)`,
                    amount: basePrice
                });
            } else {
                // Flat rate pricing
                const basePrice = PRICE_CONFIG.baseRates.flat[
                    details.propertyDetails.size === 'studio' ? 'studio' : 
                    details.propertyDetails.size === '1bed' ? 'oneBed' : 
                    details.propertyDetails.size === '2bed' ? 'twoBed' : 
                    details.propertyDetails.size === '3bed' ? 'threeBed' : 'fourBed'
                ];
                totalPrice += basePrice;
                
                breakdown.push({
                    description: `Base Price (${details.propertyDetails.size})`,
                    amount: basePrice
                });
            }

            // 2. Frequency Discount
            if (details.serviceFrequency.type === 'regular' && details.serviceFrequency.regularFrequency) {
                const discount = PRICE_CONFIG.discounts[details.serviceFrequency.regularFrequency];
                const discountAmount = totalPrice * discount;
                totalPrice = totalPrice * (1 - discount);
                
                breakdown.push({
                    description: `Regular Service Discount (${discount * 100}%)`,
                    amount: -discountAmount
                });
            }

            // 3. Additional Options
            if (details.additionalOptions.hasPets) {
                totalPrice += PRICE_CONFIG.extras.pets;
                breakdown.push({
                    description: 'Pet Hair Treatment',
                    amount: PRICE_CONFIG.extras.pets
                });
            }

            if (!details.additionalOptions.providesEquipment) {
                totalPrice += PRICE_CONFIG.extras.noEquipment;
                breakdown.push({
                    description: 'Equipment Provision',
                    amount: PRICE_CONFIG.extras.noEquipment
                });
            }

            // 4. Extra Services
            details.additionalOptions.selectedExtras.forEach(extraId => {
                const extra = EXTRA_SERVICES.find(e => e.id === extraId);
                if (extra) {
                    totalPrice += extra.price;
                    breakdown.push({
                        description: extra.name,
                        amount: extra.price
                    });
                }
            });

            return {
                total: Math.round(totalPrice),
                breakdown
            };

        } catch (error) {
            console.error('Error calculating price:', error);
            throw new Error('Failed to calculate price');
        }
    },

    submit: async (data: GeneralCleaningSubmission) => {
        try {
            const priceCalculation = generalCleaningService.calculatePrice(data.service.details);
            
            // Validate price
            if (priceCalculation.total !== data.service.price) {
                throw new Error('Price mismatch detected');
            }

            const response = await fetch('/api/services/general-cleaning/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customer: data.customerDetails,
                    booking: {
                        
                        totalPrice: priceCalculation.total
                    },
                    serviceDetails: {
                        ...data.service.details,
                        price: priceCalculation.total,
                        priceBreakdown: priceCalculation.breakdown
                    }
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to submit booking');
            }

            const result = await response.json();
            return result;

        } catch (error) {
            console.error('Error submitting general cleaning booking:', error);
            throw error;
        }
    }
}; 