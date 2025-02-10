import { ApiResponse } from '../types';


// Customer Details Interfaces
type StateOptions = "VIC" | "NSW" | "QLD" | "WA" | "SA" | "TAS" | "ACT" | "NT";
type TimeSlot = "morning" | "afternoon" | "evening";

interface CustomerDetails {
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



// Main service interface
export interface CarpetCleaningDetails {
  carpetCleaning: {
    enabled: boolean;
    bedrooms: number;
    livingRooms: number;
    studyRooms: number;
    hallways: number;
    stairs: number;
    customRooms: {
      enabled: boolean;
      rooms: Array<{ name: string; count: number }>;
    };
  };
  rugCleaning: {
    enabled: boolean;
    large: number;
    medium: number;
    small: number;
  };
  upholsteryCleaning: {
    enabled: boolean;
    sofa: {
      enabled: boolean;
      large: number;
      medium: number;
      small: number;
    };
    chair: {
      enabled: boolean;
      armChair: number;
      recliner: number;
      dayChair: number;
      ottoman: number;
      diningChair: number;
      officeChair: number;
    };
    mattress: {
      enabled: boolean;
      large: number;
      medium: number;
      small: number;
      single?: number;
      double?: number;
      queen?: number;
      king?: number;
    };
  };
  hourlyRate: number;
  priceBreakdown: Array<{
    description: string;
    amount: number;
  }>;
  additionalNotes?: string;
}

// Combined submission interface with complete customer details
interface CarpetCleaningSubmission {
  customerDetails: CustomerDetails;
  service: {
    type: string;
    name: string;
    price: number;
    details: CarpetCleaningDetails;
  };
}

// Service handler
export const carpetCleaningService = {
  submit: async (data: CarpetCleaningSubmission): Promise<ApiResponse> => {
    try {
      // Save to localStorage for now
      localStorage.setItem('selectedService', JSON.stringify(data.service));
      
      return {
        success: true,
        message: 'Carpet cleaning service saved successfully'
      };
    } catch (error) {
      console.error('Error saving carpet cleaning service:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to save carpet cleaning service'
      };
    }
  },

  // Price calculation helper
  calculatePrice: (details: CarpetCleaningDetails): number => {
    let total = 0;

    // Carpet Cleaning Prices
    if (details.carpetCleaning.enabled) {
      total += details.carpetCleaning.bedrooms * 35;
      total += details.carpetCleaning.livingRooms * 35;
      total += details.carpetCleaning.studyRooms * 30;
      total += details.carpetCleaning.hallways * 25;
      total += details.carpetCleaning.stairs * 50;
    }

    // Rug Cleaning Prices
    if (details.rugCleaning.enabled) {
      total += details.rugCleaning.large * 50;
      total += details.rugCleaning.medium * 40;
      total += details.rugCleaning.small * 35;
    }

    // Upholstery Cleaning Prices
    if (details.upholsteryCleaning.enabled) {
      // Sofa prices
      if (details.upholsteryCleaning.sofa.enabled) {
        total += details.upholsteryCleaning.sofa.large * 120;
        total += details.upholsteryCleaning.sofa.medium * 90;
        total += details.upholsteryCleaning.sofa.small * 70;
      }

      // Chair prices
      if (details.upholsteryCleaning.chair.enabled) {
        if (details.upholsteryCleaning.chair.recliner) {
          total += details.upholsteryCleaning.chair.recliner * 60;
        }
        if (details.upholsteryCleaning.chair.dayChair) {
          total += details.upholsteryCleaning.chair.dayChair * 45;
        }
        total += details.upholsteryCleaning.chair.armChair * 35;
        if (details.upholsteryCleaning.chair.ottoman) {
          total += details.upholsteryCleaning.chair.ottoman * 25;
        }
      }

      // Mattress prices
      if (details.upholsteryCleaning.mattress.enabled) {
        if (details.upholsteryCleaning.mattress.large) {
          total += details.upholsteryCleaning.mattress.large * 80;
        }
        if (details.upholsteryCleaning.mattress.medium) {
          total += details.upholsteryCleaning.mattress.medium * 60;
        }
        if (details.upholsteryCleaning.mattress.small) {
          total += details.upholsteryCleaning.mattress.small * 40;
        }
      }
    }

    // Apply minimum price of $55 if total is less
    return Math.max(55, total);
  }
}; 