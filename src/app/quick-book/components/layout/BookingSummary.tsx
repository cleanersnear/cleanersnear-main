'use client'

import { useEffect, useState } from 'react'
import { MapPin, Calendar, Clock, CheckCircle,Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { useBookingStore } from '@/stores/bookingStore'
import { DeepCleaningDetails } from '@/services/cleaningServices/deepCleaning'


interface BookingSummaryData {
  suburb?: {
    name: string;
    postcode: string;
  } | null;
  service?: ServiceType | null;
  date?: string | null;
  time?: string | null;
  contact?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

interface DeepCleaningTemplateProps {
  service: {
      type: 'deep-clean';
      details: { 
          homeSize: string;
          cleaningAreas: DeepCleaningDetails['service']['details']['cleaningAreas'];
          hours: DeepCleaningDetails['service']['details']['hours'];
          hourlyRate: number;
          priceBreakdown?: Array<{
              description: string;
              amount: number;
          }>;
      };
      price: number;
  }
}

interface NDISCleaningTemplateProps {
  service: {
      type: 'ndis-clean';
      details: {
          frequency: 'once' | 'regular' | null;
          regularFrequency?: 'weekly' | 'biweekly' | 'monthly';
          hours: number;
          customHours?: number;
          ndisDetails: {
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
          propertyDetails?: {
              bathrooms: string;
              toilets: string;
              propertyType: string;
          };
      };
      price: number;
      name: string;
  }
}



interface CarpetCleaningTemplateProps {
  service: {
      type: 'carpet-clean';
      details: {
          carpetCleaning: {
              enabled: boolean;
              bedrooms: number;
              livingRooms: number;
              studyRooms: number;
              hallways: number;
              stairs: number;
          };
          rugCleaning: {
              enabled: boolean;
              large: number;    // Large rugs ($50 each)
              medium: number;   // Medium rugs ($40 each)
              small: number;    // Small rugs ($35 each)
          };
          upholsteryCleaning: {
              enabled: boolean;
              sofa: {
                  enabled: boolean;
                  large: number;    // Large sofa ($120 each)
                  medium: number;   // Medium sofa ($90 each)
                  small: number;    // Small sofa ($70 each)
              };
              chair: {
                  enabled: boolean;
                  recliner: number;  // Recliner chair ($60 each)
                  dayChair: number;  // Day chair ($45 each)
                  armChair: number;  // Arm chair ($35 each)
                  ottoman: number;   // Ottoman/stool ($25 each)
              };
          };
          additionalNotes?: string;
      };
      price: number;
      name: string;
  }
}

interface EndOfLeaseTemplateProps {
  service: {
      type: 'end-of-lease';
      details: {
          homeSize: string;
          propertyType: 'single' | 'double' | 'apartment';
          bedrooms: string;
          bathrooms: string;
          extras?: Array<{
              name: string;
              price: number;
          }>;
          // Additional fields from your EndOfLease service
          toilets: string;
          needsCarpetCleaning: boolean;
          hasParking: boolean;
          parkingType: 'none' | 'street' | 'provided' | 'paid';
          isFurnished: boolean;
          hasStudyRoom: boolean;
          selectedExtras: string[];
      };
      price: number;
      name: string;
      priceBreakdown?: Array<{
        description: string;
        amount: number;
    }>;
  }
}


interface GeneralCleaningTemplateProps {
  service: {
      type: 'general-clean';
      details: {
          homeSize: string;
          propertyDetails: {
              bathrooms: string;
              toilets: string;
              propertyType: 'single' | 'double' | 'apartment';
              isFurnished: boolean;
              hasStudyRoom: boolean;
          };
          frequency: 'once' | 'regular' | null;
          regularFrequency?: 'weekly' | 'biweekly' | 'monthly';
          pricingType: 'hourly' | 'flat' | null;
          hours?: number;
          customHours?: number;
          providesEquipment: boolean;
          selectedExtras: string[];
          additionalNotes?: string;
          hasPets: boolean;
          parkingType: 'street' | 'provided' | 'paid' | 'none';
      };
      price: number;
      name: string;
      basePrice?: number;
      priceBreakdown?: Array<{
          description: string;
          amount: number;
      }>;
  }
}

interface MoveInOutCleaningTemplateProps {
  service: {
      type: 'move-in-out';
      details: {
          homeSize: string;
          moveType: 'in' | 'out' | null;
          propertyType: 'single' | 'double' | 'apartment';
          bathrooms: string;
          toilets: string;
          hasParking: boolean;
          parkingType: 'none' | 'street' | 'provided' | 'paid';
          needsCarpetCleaning: boolean;
          carpetAreas: {
              bedrooms: number;
              hallway: boolean;
              stairs: boolean;
              loungeRooms: number;
          };
          userType: 'owner' | 'agent' | 'tenant' | '';
          tenancyDuration: string;
          hadPets: boolean;
          isFurnished: boolean;
          kitchenCondition: number;
          selectedExtras: string[];
          hasStudyRoom: boolean;
          hours: {
              selected: '2' | '3' | '4' | '5' | 'custom';
              customHours: number;
          };
          additionalNotes: string;
          carpetCleaning?: {
            cost: number;
          };
          extrasTotal?: number;
      };
      price: number;
      name: string;
      priceBreakdown?: Array<{
          description: string;
          amount: number;
      }>;
  }
}

interface CommercialCleaningTemplateProps {
  service: {
      type: 'commercial-clean';
      details: {
          industry: string;
          otherIndustryType?: string;
          companyDetails: {
              name: string;
              abn: string;
          };
          frequency: 'once' | 'regular' | null;
          regularFrequency?: 'weekly' | 'biweekly' | 'monthly';
          contact: {
              phone: string;
              email: string;
              message: string;
          };
          squareMeters: number;
          requiresAfterHours: boolean;
          providesEquipment: boolean;
          staffRequired: number;
          hoursPerVisit: number;
          baseHourlyRate: number;
          totalHours: number;
          operatingHours: {
              preferredCleaningTime: string | null;
              startTime: string;
          };
          priceBreakdown?: Array<{
              description: string;
              amount: number;
          }>;
      };
      price: number;
      name: string;
  }
}


interface UpholsteryCleaningTemplateProps {
  service: {
      type: 'upholstery-clean';
      details: {
          upholsteryCleaning: {
              enabled: boolean;
              sofa: {
                  enabled: boolean;
                  large: number;    // $120 each
                  medium: number;   // $90 each
                  small: number;    // $70 each
              };
              chair: {
                  enabled: boolean;
                  recliner: number;  // $60 each
                  dayChair: number;  // $45 each
                  armChair: number;  // $35 each
                  ottoman: number;   // $25 each
              };
              mattress: {
                  enabled: boolean;
                  large: number;    // $80 each
                  medium: number;   // $60 each
                  small: number;    // $40 each
              };
          };
          additionalNotes: string;
          priceBreakdown: Array<{
              description: string;
              amount: number;
          }>;
      };
      price: number;
      name: string;
      description: string;
  }
}

// Add this interface for default template
interface DefaultTemplateProps {
    name: string;
    description?: string;
    price: number;
    type: string;
}

// Keep existing ServiceType unchanged
type ServiceType = 
    | DeepCleaningTemplateProps['service']
    | NDISCleaningTemplateProps['service']
    | CarpetCleaningTemplateProps['service']
    | EndOfLeaseTemplateProps['service']
    | GeneralCleaningTemplateProps['service']
    | MoveInOutCleaningTemplateProps['service']
    | CommercialCleaningTemplateProps['service']
    | UpholsteryCleaningTemplateProps['service'];

type StoredValue = {
    selectedSuburb?: {
        name: string;
        postcode: string;
    } | null;
    selectedService?: ServiceType | null;
    bookingDetails?: {
        date?: string;
        time?: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    } | null;
}

const useLocalStorage = <T extends keyof StoredValue>(
  key: T, 
  initialValue: StoredValue[T]
): StoredValue[T] => {
  const [storedValue, setStoredValue] = useState<StoredValue[T]>(() => {
    try {
      if (typeof window !== 'undefined') {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const item = localStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : null);
      } catch (error) {
        console.error('Error reading from localStorage:', error);
      }
    };

    // Listen for storage changes
    window.addEventListener('storage', handleStorageChange);
    // Listen for custom event for same-tab updates
    window.addEventListener('localStorageChange', handleStorageChange);

    // Initial load
    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleStorageChange);
    };
  }, [key]);

  return storedValue;
};



// Add this function to render Deep Cleaning specific details
const DeepCleaningTemplate = ({ service }: DeepCleaningTemplateProps) => {
  const details = service.details;
  
  const selectedHours = details.hours.selected === 'custom' 
    ? details.hours.customHours 
    : parseInt(details.hours.selected);
  
  const totalPrice = selectedHours * 53.07;

  const selectedAreas = Object.entries(details.cleaningAreas)
    .filter(([key, value]) => {
      if (key === 'customArea') return value.enabled;
      return value;
    })
    .map(([key]) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()));

  return (
    <div className="space-y-4">
      {/* Home Size */}
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-500">Home Size</span>
        <span className="font-medium capitalize">
          {details.homeSize.replace('bed', ' Bedroom')}
        </span>
      </div>

      {/* Selected Areas */}
      {selectedAreas.length > 0 && (
        <div className="space-y-2">
          <h5 className="text-sm font-medium text-gray-500">Selected Areas:</h5>
          <div className="space-y-1">
            {selectedAreas.map((area, index) => (
              <div key={index} className="flex items-center text-sm">
                <Check className="w-4 h-4 text-[#1E3D8F] mr-2" />
                <span className="text-gray-600">{area}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Duration and Rate */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Duration</span>
          <span className="font-medium">
            {selectedHours} hours
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Rate</span>
          <span className="font-medium">$53.07/hour</span>
        </div>
      </div>

      {/* Total Price */}
      <div className="border-t border-gray-100 pt-3 mt-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-medium">Total Price</span>
          <span className="text-lg font-semibold text-[#1E3D8F]">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

// Add NDIS Cleaning template
const NDISCleaningTemplate = ({ service }: NDISCleaningTemplateProps) => {
  const details = service.details;
  const frequency = details.frequency;
  const regularFrequency = details.regularFrequency;
  const hours = details.hours || details.customHours || 0;
  const hourlyRate = frequency === 'once' 
    ? 50.20 
    : frequency === 'regular' && regularFrequency === 'weekly'
      ? 45.18
      : frequency === 'regular' && regularFrequency === 'biweekly'
        ? 47.19
        : frequency === 'regular' && regularFrequency === 'monthly'
          ? 48.69
          : 50.20;
  
  const totalPrice = hours * hourlyRate;

  return (
    <div className="space-y-4">
      {/* Hours and Rate */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Hours Selected:</span>
          <span className="font-medium">{hours} hours</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Hourly Rate:</span>
          <span className="font-medium text-[#1E3D8F]">${hourlyRate.toFixed(2)}/hour</span>
        </div>
        {/* Frequency Info - Updated to show frequency instead of discount */}
        {frequency && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Frequency:</span>
            <span className="font-medium capitalize">
              {frequency === 'regular' ? regularFrequency : 'Once-off'}
            </span>
          </div>
        )}
      </div>

      {/* Total Price */}
      <div className="border-t border-gray-100 pt-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-medium">Total Price:</span>
          <span className="text-lg font-semibold text-[#1E3D8F]">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
        {frequency === 'regular' && (
          <p className="text-sm text-gray-600 mt-1">
            Price per service with {regularFrequency} cleaning schedule
          </p>
        )}
      </div>
    </div>
  );
};

const CarpetCleaningTemplate = ({ service }: CarpetCleaningTemplateProps) => {
  const details = service.details;
  const totalPrice = service.price || 0;

  return (
    <div className="space-y-4">
      {/* Service Name */}
      <div className="flex justify-between items-center text-sm">
        <span className="font-semibold">Carpet Cleaning</span>
      </div>

      {/* Carpet Cleaning Section */}
      {details.carpetCleaning?.enabled && (
        <div>
          <h5 className="text-sm font-medium text-gray-500 mb-2">Carpet Cleaning</h5>
          <div className="space-y-2">
            {details.carpetCleaning.bedrooms > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Bedrooms ({details.carpetCleaning.bedrooms})</span>
                <span className="font-medium">${details.carpetCleaning.bedrooms * 35}</span>
              </div>
            )}
            {details.carpetCleaning.livingRooms > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Living Rooms ({details.carpetCleaning.livingRooms})</span>
                <span className="font-medium">${details.carpetCleaning.livingRooms * 35}</span>
              </div>
            )}
            {details.carpetCleaning.studyRooms > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Study Rooms ({details.carpetCleaning.studyRooms})</span>
                <span className="font-medium">${details.carpetCleaning.studyRooms * 30}</span>
              </div>
            )}
            {details.carpetCleaning.hallways > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Hallways ({details.carpetCleaning.hallways})</span>
                <span className="font-medium">${details.carpetCleaning.hallways * 25}</span>
              </div>
            )}
            {details.carpetCleaning.stairs > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Stairs ({details.carpetCleaning.stairs})</span>
                <span className="font-medium">${details.carpetCleaning.stairs * 50}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Rug Cleaning Section */}
      {details.rugCleaning?.enabled && (
        <div className="pt-3 border-t border-gray-100">
          <h5 className="text-sm font-medium text-gray-500 mb-2">Rug Cleaning</h5>
          <div className="space-y-2">
            {details.rugCleaning.large > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Large Rugs ({details.rugCleaning.large})</span>
                <span className="font-medium">${details.rugCleaning.large * 50}</span>
              </div>
            )}
            {details.rugCleaning.medium > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Medium Rugs ({details.rugCleaning.medium})</span>
                <span className="font-medium">${details.rugCleaning.medium * 40}</span>
              </div>
            )}
            {details.rugCleaning.small > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Small Rugs ({details.rugCleaning.small})</span>
                <span className="font-medium">${details.rugCleaning.small * 35}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Upholstery Cleaning Section */}
      {details.upholsteryCleaning?.enabled && (
        <div className="pt-3 border-t border-gray-100">
          <h5 className="text-sm font-medium text-gray-500 mb-2">Upholstery Cleaning</h5>
          <div className="space-y-2">
            {/* Sofa Section */}
            {details.upholsteryCleaning.sofa.enabled && (
              <>
                {details.upholsteryCleaning.sofa.large > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Large Sofas ({details.upholsteryCleaning.sofa.large})</span>
                    <span className="font-medium">${details.upholsteryCleaning.sofa.large * 120}</span>
                  </div>
                )}
                {/* Add medium and small sofa items similarly */}
              </>
            )}
            {/* Add chair and mattress sections similarly */}
          </div>
        </div>
      )}

      {/* Total Price */}
      <div className="border-t border-gray-100 pt-3 mt-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-medium">Total Price</span>
          <span className="text-lg font-semibold text-[#1E3D8F]">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-2 italic">
          Minimum service charge: $55
        </p>
      </div>
    </div>
  );
};

const EndOfLeaseTemplate = ({ service }: EndOfLeaseTemplateProps) => {
  const details = service.details;
  
  const totalPrice = service.price || 0;
  const priceBreakdown = service.priceBreakdown || [];

  return (
    <div className="space-y-4">
      {/* Service Name */}
      <div className="flex justify-between items-center text-sm">
        <span className="font-semibold">End of Lease Clean</span>
      </div>

      {/* Property Details */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Property Size</span>
          <span className="font-medium">{details.homeSize}</span>
        </div>
        {details?.propertyType && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Property Type</span>
            <span className="font-medium capitalize">{details.propertyType} Story</span>
          </div>
        )}
        {/* Add Carpet Steam Cleaning if selected */}
        {details?.needsCarpetCleaning && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Carpet Steam Cleaning</span>
            <span className="font-medium">Included</span>
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-2">
        {priceBreakdown.map((item: { description: string; amount: number }, index: number) => {
          // Skip the Double Story line
          if (item.description === 'Double Story') return null;
          return (
            <div key={index} className="flex justify-between items-center text-sm">
              <span className="text-gray-600">{item.description}</span>
              <span className="font-medium">${item.amount}</span>
            </div>
          );
        })}
      </div>

      {/* Total Price */}
      <div className="border-t border-gray-100 pt-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-medium">Total Price</span>
          <span className="text-lg font-semibold text-[#1E3D8F]">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

const GeneralCleanTemplate = ({ service }: GeneralCleaningTemplateProps) => {
  const details = service.details;
  const basePrice = service.basePrice || 0;
  const totalPrice = service.price || 0;
  
  // Calculate hourly rate based on frequency
  const getHourlyRate = () => {
    if (details.frequency === 'regular') {
      switch (details.regularFrequency) {
        case 'weekly':
          return 38;
        case 'biweekly':
          return 43;
        case 'monthly':
          return 45;
        default:
          return 45;
      }
    }
    return 45; // Default rate for once-off
  };

  return (
    <div className="space-y-4">
      {/* Service Name */}
      <div className="flex justify-between items-center text-sm">
        <span className="font-semibold">General Clean</span>
      </div>

      {/* Service Details */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Property Size</span>
          <span className="font-medium">{details.homeSize}</span>
        </div>
        {details?.frequency && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Frequency</span>
            <span className="font-medium capitalize">
              {details.frequency === 'regular' 
                ? `${details.regularFrequency} Clean` 
                : 'Once-off Clean'}
            </span>
          </div>
        )}
        {details?.pricingType && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Pricing Type</span>
            <span className="font-medium capitalize">
              {details.pricingType === 'hourly' ? 'Hourly Rate' : 'Flat Rate'}
            </span>
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-2">
        {/* Base Price and Hours for Hourly Rate */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">
            {details?.pricingType === 'hourly' ? 'Hourly Rate' : 'Base Price'}
          </span>
          <span className="font-medium">
            {details?.pricingType === 'hourly' 
              ? `$${getHourlyRate()}`
              : `$${basePrice}`
            }
          </span>
        </div>
        {details?.pricingType === 'hourly' && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Hours</span>
            <span className="font-medium">{details.hours}</span>
          </div>
        )}
      </div>

      {/* Total Price section with Extras just above */}
      <div className="border-t border-gray-100 pt-3">
        {/* Only show extras if there's an actual extras total */}
        {/* extrasTotal > 0 && (
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="text-gray-600">Optional Extras</span>
            <span className="font-medium">+${extrasTotal}</span>
          </div>
        )} */}
        
        {/* Total Price */}
        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-medium">Total Price</span>
          <span className="text-lg font-semibold text-[#1E3D8F]">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

// Add this template alongside other cleaning templates
const MoveInOutTemplate = ({ service }: MoveInOutCleaningTemplateProps) => {
  const details = service.details;
  const totalPrice = service.price || 0;
  const carpetCleaning = details?.carpetCleaning;
  const extrasTotal = details?.extrasTotal || 0;

  return (
    <div className="space-y-4">
      {/* Service Name */}
      <div className="flex justify-between items-center text-sm">
        <span className="font-semibold">
          Move {details.moveType === 'in' ? 'In' : 'Out'} Clean
        </span>
      </div>

      {/* Service Details */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Property Size</span>
          <span className="font-medium">{details.homeSize}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Hourly Rate</span>
          <span className="font-medium">
            ${details.moveType === 'in' ? '48.50' : '63.05'}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Hours</span>
          <span className="font-medium">
                {details.hours.selected === 'custom' 
                    ? details.hours.customHours 
                    : details.hours.selected}
            </span>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-2">
        {/* Service Cost */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Service Cost</span>
          <span className="font-medium">
            ${(details.moveType === 'in' ? 48.50 : 63.05) * 
                (details.hours.selected === 'custom' 
                    ? details.hours.customHours 
                    : Number(details.hours.selected))}
          </span>
        </div>

        {/* Carpet Cleaning if selected */}
        {carpetCleaning && carpetCleaning.cost > 0 && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Carpet Cleaning</span>
            <span className="font-medium">+${carpetCleaning.cost}</span>
          </div>
        )}
      </div>

      {/* Total Price section with Extras just above */}
      <div className="border-t border-gray-100 pt-3">
        {/* Show extras total if exists */}
        {extrasTotal > 0 && (
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="text-gray-600">Optional Extras</span>
            <span className="font-medium">+${extrasTotal}</span>
          </div>
        )}
        
        {/* Total Price */}
        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-medium">Total Price</span>
          <span className="text-lg font-semibold text-[#1E3D8F]">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

// Add this template alongside other cleaning templates
const CommercialTemplate = ({ service }: CommercialCleaningTemplateProps) => {
  const details = service.details;
  const totalPrice = service.price || 0;
  const baseHourlyRate = details.baseHourlyRate || 0;
  const totalHours = details.totalHours || 0;

  return (
    <div className="space-y-4">
      {/* Service Name */}
      <div className="flex justify-between items-center text-sm">
        <span className="font-semibold">Commercial Clean</span>
      </div>

      {/* Service Details */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Industry</span>
          <span className="font-medium capitalize">
            {details.industry === 'other' ? details.otherIndustryType : details.industry}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Service Type</span>
          <span className="font-medium capitalize">
            {details.frequency === 'once' ? 'Once-off' : `${details.regularFrequency} Clean`}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Staff Required</span>
          <span className="font-medium">
            {details.staffRequired} {details.staffRequired === 1 ? 'person' : 'people'}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Hours per Visit</span>
          <span className="font-medium">{details.hoursPerVisit} hours</span>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-2">
        {/* Base Rate */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Base Rate</span>
          <span className="font-medium">${baseHourlyRate}/hour</span>
        </div>

        {/* Total Hours */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Total Hours</span>
          <span className="font-medium">{totalHours} hours</span>
        </div>

        {/* Show discount if applicable */}
        {details.priceBreakdown?.map((item: { description: string; amount: number }, index: number) => {
          if (item.description.includes('Discount')) {
            return (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{item.description}</span>
                <span className="font-medium text-green-600">-${Math.abs(item.amount).toFixed(2)}</span>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Total Price */}
      <div className="border-t border-gray-100 pt-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-medium">Total Price</span>
          <span className="text-lg font-semibold text-[#1E3D8F]">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

// Add this template alongside other cleaning templates
const UpholsteryTemplate = ({ service }: UpholsteryCleaningTemplateProps) => {
  const details = service.details;
  const totalPrice = service.price || 0;
  const upholstery = details?.upholsteryCleaning;

  return (
    <div className="space-y-4">
      {/* Service Name */}
      <div className="flex justify-between items-center text-sm">
        <span className="font-semibold">Upholstery Clean</span>
      </div>

      {/* Service Details */}
      <div className="space-y-2">
        {/* Sofa Section */}
        {upholstery?.sofa?.enabled && (
          <>
            {upholstery.sofa.large > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Large Sofa (4+ Seater)</span>
                <span className="font-medium">x{upholstery.sofa.large}</span>
              </div>
            )}
            {upholstery.sofa.medium > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Medium Sofa (3 Seater)</span>
                <span className="font-medium">x{upholstery.sofa.medium}</span>
              </div>
            )}
            {upholstery.sofa.small > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Small Sofa (2 Seater)</span>
                <span className="font-medium">x{upholstery.sofa.small}</span>
              </div>
            )}
          </>
        )}

        {/* Chair Section */}
        {upholstery?.chair?.enabled && (
          <>
            {upholstery.chair.recliner > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Recliner Chair</span>
                <span className="font-medium">x{upholstery.chair.recliner}</span>
              </div>
            )}
            {upholstery.chair.dayChair > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Day Chair</span>
                <span className="font-medium">x{upholstery.chair.dayChair}</span>
              </div>
            )}
            {upholstery.chair.armChair > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Arm Chair</span>
                <span className="font-medium">x{upholstery.chair.armChair}</span>
              </div>
            )}
            {upholstery.chair.ottoman > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Ottoman/Stool</span>
                <span className="font-medium">x{upholstery.chair.ottoman}</span>
              </div>
            )}
          </>
        )}

        {/* Mattress Section */}
        {upholstery?.mattress?.enabled && (
          <>
            {upholstery.mattress.large > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Large Mattress (King)</span>
                <span className="font-medium">x{upholstery.mattress.large}</span>
              </div>
            )}
            {upholstery.mattress.medium > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Medium Mattress (Double/Queen)</span>
                <span className="font-medium">x{upholstery.mattress.medium}</span>
              </div>
            )}
            {upholstery.mattress.small > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Small Mattress (Single)</span>
                <span className="font-medium">x{upholstery.mattress.small}</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Total Price */}
      <div className="border-t border-gray-100 pt-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-medium">Total Price</span>
          <span className="text-lg font-semibold text-[#1E3D8F]">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
        {totalPrice === 55 && (
          <p className="text-sm text-gray-500 mt-1 italic">
            Minimum service charge applied
          </p>
        )}
      </div>
    </div>
  );
};

// Service template selector function
const getServiceTemplate = (service: ServiceType | DefaultTemplateProps) => {
    switch (service.type) {
        case 'deep-clean':
            return <DeepCleaningTemplate service={service as DeepCleaningTemplateProps['service']} />;
        case 'ndis-clean':
            return <NDISCleaningTemplate service={service as NDISCleaningTemplateProps['service']} />;
        case 'carpet-clean':
            return <CarpetCleaningTemplate service={service as CarpetCleaningTemplateProps['service']} />;
        case 'end-of-lease':
            return <EndOfLeaseTemplate service={service as EndOfLeaseTemplateProps['service']} />;
        case 'general-clean':
            return <GeneralCleanTemplate service={service as GeneralCleaningTemplateProps['service']} />;
        case 'move-in-out':
            return <MoveInOutTemplate service={service as MoveInOutCleaningTemplateProps['service']} />;
        case 'commercial-clean':
            return <CommercialTemplate service={service as CommercialCleaningTemplateProps['service']} />;
        case 'upholstery-clean':
            return <UpholsteryTemplate service={service as UpholsteryCleaningTemplateProps['service']} />;
        default:
            const defaultService = service as DefaultTemplateProps;
            return (
                <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">{defaultService.name}</h4>
                    {defaultService.description && (
                        <div className="text-sm text-gray-500">{defaultService.description}</div>
                    )}
                    <div className="pt-3 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-900 font-medium">Total Price</span>
                            <span className="text-lg font-semibold text-[#1E3D8F]">
                                ${defaultService.price?.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            );
    }
};

export default function BookingSummary() {
  
  const [summaryData, setSummaryData] = useState<BookingSummaryData>({})
  const booking = useBookingStore((state) => state.booking)
  const selectedSuburb = useLocalStorage('selectedSuburb', null)
  const selectedService = useLocalStorage('selectedService', null)
  const bookingDetails = useLocalStorage('bookingDetails', null)

  useEffect(() => {
    // Initial load
    const loadData = () => {
      try {
        const selectedSuburb = localStorage.getItem('selectedSuburb');
        const selectedService = localStorage.getItem('selectedService');
        const bookingDetails = localStorage.getItem('bookingDetails');

        setSummaryData({
          suburb: selectedSuburb ? JSON.parse(selectedSuburb) : null,
          service: selectedService ? JSON.parse(selectedService) : null,
          date: bookingDetails ? JSON.parse(bookingDetails).date : null,
          time: bookingDetails ? JSON.parse(bookingDetails).time : null,
          contact: bookingDetails ? {
            firstName: JSON.parse(bookingDetails).firstName,
            lastName: JSON.parse(bookingDetails).lastName,
            email: JSON.parse(bookingDetails).email,
            phone: JSON.parse(bookingDetails).phone
          } : undefined
        });
      } catch (error) {
        console.error('Error loading summary data:', error);
      }
    };

    // Load initial data
    loadData();

    // Listen for service updates
    const handleServiceUpdate = (event: CustomEvent) => {
      setSummaryData(prev => ({
        ...prev,
        service: event.detail
      }));
    };

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'selectedService' || e.key === 'selectedSuburb' || e.key === 'bookingDetails') {
        loadData();
      }
    };

    // Add event listeners
    window.addEventListener('serviceUpdate', handleServiceUpdate as EventListener);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('serviceUpdate', handleServiceUpdate as EventListener);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Update summary data whenever localStorage changes
  useEffect(() => {
    const updateSummaryData = () => {
      setSummaryData({
        suburb: selectedSuburb,
        service: selectedService,
        date: bookingDetails?.date,
        time: bookingDetails?.time,
        contact: bookingDetails ? {
          firstName: bookingDetails.firstName,
          lastName: bookingDetails.lastName,
          email: bookingDetails.email,
          phone: bookingDetails.phone
        } : undefined
      });
    };

    updateSummaryData();
  }, [selectedSuburb, selectedService, bookingDetails]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return ''
    try {
      return new Date(dateStr).toLocaleDateString('en-AU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return dateStr
    }
  }

  

  if (!summaryData.suburb && !summaryData.service && !summaryData.date) {
    return null
  }

  

 

  return (
    <div className="fixed right-0 top-0 h-screen w-80 bg-white shadow-lg pt-28 
      hidden md:block border-l border-gray-100">
      <div className="px-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-semibold text-gray-900">Booking Summary</h2>
          {summaryData.service && (
            <span className="text-sm px-3 py-1 bg-green-50 text-green-600 rounded-full font-medium">
              In Progress
            </span>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pb-6">
          <div className="space-y-6">
            {/* Location Section */}
            {summaryData.suburb && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="group"
              >
                <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </h3>
                <div className="p-4 bg-[#1E3D8F]/5 rounded-xl border border-[#1E3D8F]/10
                  transition-colors group-hover:bg-[#1E3D8F]/10">
                  <p className="font-medium text-gray-900">{summaryData.suburb.name}</p>
                  <p className="text-sm text-gray-500">{summaryData.suburb.postcode}</p>
                </div>
              </motion.div>
            )}

            {/* Service Section - Updated with template selector */}
            {(summaryData.service || booking) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="group"
              >
                <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Service Details
                </h3>
                <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm
                  transition-all group-hover:shadow-md">
                  {summaryData.service ? (
                    getServiceTemplate(summaryData.service)
                  ) : (
                    <div className="text-gray-500 text-sm">No service selected</div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Schedule Section - Only show when bookingDetails exists */}
            {bookingDetails && (summaryData.date || summaryData.time) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="group"
              >
                <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Schedule
                </h3>
                <div className="p-4 bg-[#1E3D8F]/5 rounded-xl border border-[#1E3D8F]/10
                  transition-colors group-hover:bg-[#1E3D8F]/10">
                  {summaryData.date && (
                    <div className="mb-2">
                      <p className="font-medium text-gray-900">{formatDate(summaryData.date)}</p>
                    </div>
                  )}
                  {summaryData.time && (
                    <div className="flex items-center gap-2 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <p>{summaryData.time}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            
                  </div>
                    </div>
      </div>
    </div>
  )
} 