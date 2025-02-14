'use client'

import { useState, useEffect } from 'react'
import { MapPin, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useBookingStore } from '@/app/quick-book/store/bookingStore'
import type { 
  CarpetCleaningDetails,
  EndOfLeaseDetails,
  GeneralCleaningDetails,  
  MoveInCleaningDetails,
  NDISCleaningDetails,
  CommercialCleaningDetails,
  AfterRenovationCleaningDetails,
  OvenCleaningDetails,
  TileAndFloorCleaningDetails,
  UpholsteryCleaningDetails,
  WindowCleaningDetails
} from '@/app/quick-book/types/serviceinterface'

interface BookingSummaryData { 
  suburb?: {
    name: string;
    postcode: string;
  } | null;
  service?: {
    type: string;
    price?: number;
  } | null;
}

// Define a type that handles both price structures
type ServicePriceData = {
    pricing?: {
        totalPrice: number;
    };
    totalPrice?: number;
};

const ServiceContent = ({ type }: { type: string }) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const loadPrice = () => {
      switch (type) {
        case 'carpet-cleaning':
          try {
            const storedDetails = localStorage.getItem('carpetCleaningDetails');
            if (storedDetails) {
              const details: CarpetCleaningDetails = JSON.parse(storedDetails);
              setTotalPrice(details.totalPrice);
            }
          } catch (error) {
            console.error('Error reading carpet cleaning details:', error);
          }
          break;

        case 'end-of-lease-cleaning':
          try {
            const storedDetails = localStorage.getItem('endOfLeaseDetails');
            if (storedDetails) {
              const details: EndOfLeaseDetails = JSON.parse(storedDetails);
              setTotalPrice(details.totalPrice);
            }
          } catch (error) {
            console.error('Error reading end of lease details:', error);
          }
          break;

        case 'general-cleaning':
          try {
            const storedDetails = localStorage.getItem('generalCleaningDetails');
            if (storedDetails) {
              const details: GeneralCleaningDetails = JSON.parse(storedDetails);
              setTotalPrice(details.totalPrice);
            }
          } catch (error) {
            console.error('Error reading general cleaning details:', error);
          }
          break;

        case 'deep-cleaning':
          try {
            const storedDetails = localStorage.getItem('deepCleaningDetails');
            if (storedDetails) {
              const details = JSON.parse(storedDetails);
              const price = details?.pricing?.totalPrice || 0;
              setTotalPrice(price);
            }
          } catch (error) {
            console.error('Error reading deep cleaning details:', error);
            setTotalPrice(0);
          }
          break;

        case 'move-in-cleaning':
          try {
            const storedDetails = localStorage.getItem('moveInCleaningDetails');
            if (storedDetails) {
              const details: MoveInCleaningDetails = JSON.parse(storedDetails);
              setTotalPrice(details.pricing.totalPrice);
            }
          } catch (error) {
            console.error('Error reading move in cleaning details:', error);
          }
          break;

        case 'ndis-cleaning':
          try {
            const storedDetails = localStorage.getItem('ndisCleaningDetails');
            if (storedDetails) {
              const details: NDISCleaningDetails = JSON.parse(storedDetails);
              setTotalPrice(details.pricing.totalPrice);
            }
          } catch (error) {
            console.error('Error reading NDIS cleaning details:', error);
          }
          break;

        case 'commercial-cleaning':
          try {
            const storedDetails = localStorage.getItem('commercialCleaningDetails');
            if (storedDetails) {
              const details: CommercialCleaningDetails = JSON.parse(storedDetails);
              setTotalPrice(details.pricing.totalPrice);
            }
          } catch (error) {
            console.error('Error reading commercial cleaning details:', error);
          }
          break;

        case 'after-renovation-cleaning':
          try {
            const storedDetails = localStorage.getItem('afterRenovationDetails');
            if (storedDetails) {
              const details: AfterRenovationCleaningDetails = JSON.parse(storedDetails);
              setTotalPrice(details.totalPrice);
            }
          } catch (error) {
            console.error('Error reading after renovation details:', error);
          }
          break;

        case 'oven-cleaning':
          try {
            const storedDetails = localStorage.getItem('ovenCleaningDetails');
            if (storedDetails) {
              const details: OvenCleaningDetails = JSON.parse(storedDetails);
              setTotalPrice(details.totalPrice);
            }
          } catch (error) {
            console.error('Error reading oven cleaning details:', error);
          }
          break;

        case 'tile-and-floor-cleaning':
          try {
            const storedDetails = localStorage.getItem('tileAndFloorDetails');
            if (storedDetails) {
              const details: TileAndFloorCleaningDetails = JSON.parse(storedDetails);
              setTotalPrice(details.totalPrice);
            }
          } catch (error) {
            console.error('Error reading tile and floor details:', error);
          }
          break;

        case 'upholstery-cleaning':
          try {
            const storedDetails = localStorage.getItem('upholsteryCleaningDetails');
            if (storedDetails) {
              const details: UpholsteryCleaningDetails = JSON.parse(storedDetails);
                setTotalPrice(details.pricing.totalPrice);
            }
    } catch (error) {
            console.error('Error reading upholstery cleaning details:', error);
          }
          break;

        case 'window-cleaning':
          try {
            const storedDetails = localStorage.getItem('windowCleaningDetails');
            if (storedDetails) {
              const details: WindowCleaningDetails = JSON.parse(storedDetails);
              setTotalPrice(details.totalPrice);
            }
      } catch (error) {
            console.error('Error reading window cleaning details:', error);
          }
          break;
      }
    };

    loadPrice();

    const handleStorageChange = (e: StorageEvent) => {
      if ([
        'carpetCleaningDetails',
        'endOfLeaseDetails',
        'generalCleaningDetails',
        'deepCleaningDetails',
        'moveInCleaningDetails',
        'ndisCleaningDetails',
        'commercialCleaningDetails',
        'afterRenovationDetails',
        'ovenCleaningDetails',
        'tileAndFloorDetails',
        'upholsteryCleaningDetails',
        'windowCleaningDetails'
      ].includes(e.key || '')) {
        loadPrice();
      }
    };

    const handleStorageUpdate = (e: CustomEvent<{type: string; data: ServicePriceData}>) => {
      if (e.detail.type === type) {
        const details = e.detail.data;
        // Check which price structure is used
        setTotalPrice(details.pricing?.totalPrice || details.totalPrice || 0);
      }
    };

    window.addEventListener('serviceStorageUpdate', handleStorageUpdate as EventListener);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('serviceStorageUpdate', handleStorageUpdate as EventListener);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [type]);

  // Return appropriate template based on service type
  switch (type) {
    case 'carpet-cleaning':
  return (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Carpet Cleaning</h4>
          <div className="pt-3 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-medium">Total Price</span>
          <span className="text-lg font-semibold text-[#1E3D8F]">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );

    case 'end-of-lease-cleaning':
  return (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">End of Lease Cleaning</h4>
          <div className="pt-3 border-t border-gray-100">
        <div className="flex justify-between items-center">
              <span className="text-gray-900 font-medium">Total Price</span>
          <span className="text-lg font-semibold text-[#1E3D8F]">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );

    case 'general-cleaning':
  return (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">General Cleaning</h4>
        <div className="pt-3 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-medium">Total Price</span>
          <span className="text-lg font-semibold text-[#1E3D8F]">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );

    case 'deep-cleaning':
  return (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Deep Cleaning</h4>
          <div className="pt-3 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-medium">Total Price</span>
          <span className="text-lg font-semibold text-[#1E3D8F]">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );

    case 'move-in-cleaning':
  return (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Move In Cleaning</h4>
          <div className="pt-3 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-gray-900 font-medium">Total Price</span>
              <span className="text-lg font-semibold text-[#1E3D8F]">
                ${totalPrice.toFixed(2)}
            </span>
          </div>
          </div>
      </div>
      );

    case 'ndis-cleaning':
      return (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">NDIS Cleaning</h4>
          <div className="pt-3 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-medium">Total Price</span>
          <span className="text-lg font-semibold text-[#1E3D8F]">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );

    case 'commercial-cleaning':
  return (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Commercial Cleaning</h4>
          <div className="pt-3 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-gray-900 font-medium">Total Price</span>
              <span className="text-lg font-semibold text-[#1E3D8F]">
                ${totalPrice.toFixed(2)}
        </span>
      </div>
        </div>
        </div>
      );

    case 'after-renovation-cleaning':
      return (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">After Renovation Cleaning</h4>
          <div className="pt-3 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-medium">Total Price</span>
          <span className="text-lg font-semibold text-[#1E3D8F]">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );

    case 'oven-cleaning':
  return (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Oven Cleaning</h4>
          <div className="pt-3 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-gray-900 font-medium">Total Price</span>
              <span className="text-lg font-semibold text-[#1E3D8F]">
                ${totalPrice.toFixed(2)}
          </span>
        </div>
        </div>
              </div>
            );

    case 'tile-and-floor-cleaning':
      return (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Tile and Floor Cleaning</h4>
          <div className="pt-3 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-medium">Total Price</span>
          <span className="text-lg font-semibold text-[#1E3D8F]">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );

    case 'upholstery-cleaning':
  return (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Upholstery Cleaning</h4>
          <div className="pt-3 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-medium">Total Price</span>
          <span className="text-lg font-semibold text-[#1E3D8F]">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );

    case 'window-cleaning':
            return (
                <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Window Cleaning</h4>
                    <div className="pt-3 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-900 font-medium">Total Price</span>
                            <span className="text-lg font-semibold text-[#1E3D8F]">
                ${totalPrice.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            );

    default:
      return null;
    }
};

export default function BookingSummary() {
  const [summaryData, setSummaryData] = useState<BookingSummaryData>({})
  const location = useBookingStore((state) => state.selectedLocation)
  const service = useBookingStore((state) => state.selectedService)

  useEffect(() => {
    setSummaryData({
      suburb: location ? {
        name: location.name,
        postcode: location.postcode
      } : null,
      service: service ? {
        type: service.type
      } : null
    });
  }, [location, service]);

  if (!summaryData.suburb) {
    return null;
  }

  return (
    <div className="fixed right-0 top-0 h-screen w-80 bg-white shadow-lg pt-28 
        border-l border-gray-100">
      <div className="px-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-semibold text-gray-900">Booking Summary</h2>
          <span className="text-sm px-3 py-1 bg-green-50 text-green-600 rounded-full font-medium">
            In Progress
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-6">
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

          {/* Service Details Section */}
          {summaryData.service && (
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
                <ServiceContent type={summaryData.service.type} />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 