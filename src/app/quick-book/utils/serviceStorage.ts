import { ServiceType } from '../types/service'

type ServiceDetails = {
  pricing?: {
    totalPrice: number;
    priceBreakdown: Array<{ description: string; amount: number }>;
  };
  totalPrice?: number;
  priceBreakdown?: Array<{ description: string; amount: number }>;
  [key: string]: unknown;
}

export const updateServiceStorage = (
  serviceType: ServiceType,
  details: ServiceDetails,
  serviceName: string
) => {
  // Normalize the price structure
  const normalizedDetails = {
    ...details,
    pricing: {
      totalPrice: details.pricing?.totalPrice || details.totalPrice || 0,
      priceBreakdown: details.pricing?.priceBreakdown || details.priceBreakdown || []
    }
  };

  // Remove top-level price fields if they exist
  if ('totalPrice' in normalizedDetails) {
    delete normalizedDetails.totalPrice;
  }
  if ('priceBreakdown' in normalizedDetails) {
    delete normalizedDetails.priceBreakdown;
  }

  // Create the service data structure
  const serviceData = {
    name: serviceName,
    type: serviceType,
    price: normalizedDetails.pricing.totalPrice,
    description: `Professional ${serviceName}`,
    details: normalizedDetails
  };

  // Store in localStorage
  const storageKey = `${serviceType}Details`;
  localStorage.setItem(storageKey, JSON.stringify(serviceData.details));

  // Dispatch custom event for real-time updates
  window.dispatchEvent(new CustomEvent('serviceStorageUpdate', {
    detail: {
      type: serviceType,
      data: serviceData.details
    }
  }));
}; 