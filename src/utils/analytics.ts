// Enhanced analytics with specific business events
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID as string;

// Define proper types for gtag arguments
type GtagArgs = [
  string, // command
  string, // event name or measurement ID
  Record<string, unknown> // parameters
];

declare global {
  interface Window {
    // Type dataLayer as array of unknown instead of any
    dataLayer: unknown[];
    gtag: (...args: GtagArgs) => void;
  }
}

// Log page views
export const pageview = (url: string): void => {
  if (typeof window !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
}

// Log specific events
interface EventParams {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export const event = ({ action, category, label, value }: EventParams): void => {
  if (typeof window !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

export const trackEvents = {
  // Booking Events
  bookingStarted: (service: string): void => 
    event({
      action: 'booking_started',
      category: 'Booking',
      label: service
    }),

  bookingCompleted: (service: string, value: number): void => 
    event({
      action: 'booking_completed',
      category: 'Booking',
      label: service,
      value: value
    }),

  // Quote Events
  quoteRequested: (service: string): void =>
    event({
      action: 'quote_requested',
      category: 'Quote',
      label: service
    }),

  // Service Page Interactions
  serviceViewed: (service: string): void =>
    event({
      action: 'service_viewed',
      category: 'Service Interest',
      label: service
    }),

  // Location Based Events
  locationSelected: (suburb: string): void =>
    event({
      action: 'location_selected',
      category: 'Location',
      label: suburb
    }),

  // Calculator Usage
  calculatorUsed: (service: string, price: number): void =>
    event({
      action: 'price_calculated',
      category: 'Price Calculator',
      label: service,
      value: price
    }),

  // Contact Events
  contactFormSubmitted: (topic: string): void =>
    event({
      action: 'contact_submitted',
      category: 'Contact',
      label: topic
    }),

  // Blog Engagement
  blogRead: (title: string, timeSpent: number): void =>
    event({
      action: 'blog_read',
      category: 'Blog',
      label: title,
      value: timeSpent
    }),

  // SEO Tracking
  searchQuery: (query: string, results: number): void =>
    event({
      action: 'internal_search',
      category: 'SEO',
      label: query,
      value: results
    }),

  richResultClick: (type: string): void =>
    event({
      action: 'rich_result_click',
      category: 'SEO',
      label: type
    }),

  pagePerformance: (url: string, loadTime: number): void =>
    event({
      action: 'page_performance',
      category: 'Technical SEO',
      label: url,
      value: loadTime
    })
} as const; 
