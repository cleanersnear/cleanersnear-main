// Enhanced analytics with specific business events
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

// Log page views
export const pageview = (url: string) => {
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  })
}

// Log specific events
export const event = ({ action, category, label, value }: any) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export const trackEvents = {
  // Booking Events
  bookingStarted: (service: string) => 
    event({
      action: 'booking_started',
      category: 'Booking',
      label: service
    }),

  bookingCompleted: (service: string, value: number) => 
    event({
      action: 'booking_completed',
      category: 'Booking',
      label: service,
      value: value
    }),

  // Quote Events
  quoteRequested: (service: string) =>
    event({
      action: 'quote_requested',
      category: 'Quote',
      label: service
    }),

  // Service Page Interactions
  serviceViewed: (service: string) =>
    event({
      action: 'service_viewed',
      category: 'Service Interest',
      label: service
    }),

  // Location Based Events
  locationSelected: (suburb: string) =>
    event({
      action: 'location_selected',
      category: 'Location',
      label: suburb
    }),

  // Calculator Usage
  calculatorUsed: (service: string, price: number) =>
    event({
      action: 'price_calculated',
      category: 'Price Calculator',
      label: service,
      value: price
    }),

  // Contact Events
  contactFormSubmitted: (topic: string) =>
    event({
      action: 'contact_submitted',
      category: 'Contact',
      label: topic
    }),

  // Blog Engagement
  blogRead: (title: string, timeSpent: number) =>
    event({
      action: 'blog_read',
      category: 'Blog',
      label: title,
      value: timeSpent
    }),

  // SEO Tracking
  searchQuery: (query: string, results: number) =>
    event({
      action: 'internal_search',
      category: 'SEO',
      label: query,
      value: results
    }),

  richResultClick: (type: string) =>
    event({
      action: 'rich_result_click',
      category: 'SEO',
      label: type
    }),

  pagePerformance: (url: string, loadTime: number) =>
    event({
      action: 'page_performance',
      category: 'Technical SEO',
      label: url,
      value: loadTime
    })
} 