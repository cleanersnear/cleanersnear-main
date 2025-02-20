// Base API URLs
const API_BASE = process.env.NEXT_PUBLIC_API_URL;
const API_BASE_URL = API_BASE + '/api';

// Types for form data
interface QuickEnquiryData {
  name: string;
  email: string;
  phone: string;
  address: string;
  service: string;
}

interface CostCalculatorData {
  service: string;
  typeOfClean: string;
  phone: string;
  name: string;
  address: string;
  email: string;
  notes: string;
}

export type ApiResponseData = 
    | QuickEnquiryResponse
    | CostCalculatorResponse
    | SubscriptionResponse
    | ContactFormResponse
    | QuoteResponse
    | Career[]
    | FAQ[]
    | Blog[]
    | null;

interface ApiResponse<T = void> {
    success: boolean;
    message: string;
    data?: T;
}

interface SubscriptionData {
  email: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  subject: string;
  message: string;
}

interface QuoteFormData {
  serviceType: string;
  cleaningType: string;
  frequency: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  rateType: string;
  preferredDate: string;
  preferredTime: string;
  parkingAvailable: string;
  access: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  streetAddress: string;
  suburb: string;
  state: string;
  postCode: string;
  notes: string;
}

interface Career {
  id: string;
  title: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Casual';
  salary: string;
  department?: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  isActive: boolean;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  is_active: boolean;
}

interface Blog {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    cover_image: string;
    category: string;
    author: string;
    created_at: string;
    views: number;
    tags: string[];
}

// First, define response types for each endpoint
interface QuickEnquiryResponse {
    enquiryId: string;
    submittedAt: string;
    status: 'pending' | 'processed';
}

interface CostCalculatorResponse {
    calculatedCost: number;
    breakdown: {
        baseCost: number;
        extras: Array<{
            name: string;
            cost: number;
        }>;
    };
}

interface SubscriptionResponse {
    subscriptionId: string;
    status: 'active' | 'pending';
}

interface ContactFormResponse {
    ticketId: string;
    status: 'received' | 'processing';
}

interface QuoteResponse {
    quoteId: string;
    estimatedPrice: number;
    validity: string;
}

export const apiService = {
  async submitQuickEnquiry(data: QuickEnquiryData): Promise<ApiResponse<QuickEnquiryResponse>> {
    try {
      const response = await fetch(`${API_BASE_URL}/quickenquiry/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to submit enquiry');
      }

      return responseData;
    } catch (error) {
      console.error('API error:', error);
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to server. Please check your internet connection.');
      }
      throw error;
    }
  },

  async submitCostCalculator(data: CostCalculatorData): Promise<ApiResponse<CostCalculatorResponse>> {
    try {
      console.log('Submitting to:', `${API_BASE_URL}/costcalculator/submit`);
      console.log('Data:', data);

      const response = await fetch(`${API_BASE_URL}/costcalculator/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log('Response:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to submit cost calculator');
      }

      return responseData;
    } catch (error) {
      console.error('Cost calculator submission error:', error);
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to server. Please check your internet connection.');
      }
      throw error;
    }
  },

  async submitSubscription(data: SubscriptionData): Promise<ApiResponse<SubscriptionResponse>> {
    try {
      console.log('Submitting subscription:', data);
      const response = await fetch(`${API_BASE_URL}/subscription/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log('Subscription response:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to subscribe');
      }

      return responseData;
    } catch (error) {
      console.error('Subscription error:', error);
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to server. Please check your internet connection.');
      }
      throw error;
    }
  },

  async submitContactForm(data: ContactFormData): Promise<ApiResponse<ContactFormResponse>> {
    try {
      console.log('Submitting contact form:', data);
      const response = await fetch(`${API_BASE_URL}/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log('Contact form response:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to submit contact form');
      }

      return responseData;
    } catch (error) {
      console.error('Contact form error:', error);
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to server. Please check your internet connection.');
      }
      throw error;
    }
  },

  async submitQuote(data: QuoteFormData): Promise<ApiResponse<QuoteResponse>> {
    try {
      console.log('Submitting quote:', data);
      const response = await fetch(`${API_BASE_URL}/quotes/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log('Quote response:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to submit quote');
      }

      return responseData;
    } catch (error) {
      console.error('Quote submission error:', error);
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to server. Please check your internet connection.');
      }
      throw error;
    }
  },

  async fetchCareers(filters?: { 
    department?: string;
    type?: string;
    search?: string;
  }): Promise<Career[]> {
    try {
      const queryParams = new URLSearchParams();
      if (filters?.department) queryParams.append('department', filters.department);
      if (filters?.type) queryParams.append('type', filters.type);
      if (filters?.search) queryParams.append('search', filters.search);

      const response = await fetch(
        `${API_BASE_URL}/careers${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch careers');
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching careers:', error);
      throw error;
    }
  },

  async fetchFaqs(filters?: { 
    category?: string;
    search?: string;
  }): Promise<FAQ[]> {
    try {
      const queryParams = new URLSearchParams();
      if (filters?.category) queryParams.append('category', filters.category);
      if (filters?.search) queryParams.append('search', filters.search);

      const response = await fetch(
        `${API_BASE_URL}/faqs${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch FAQs');
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      throw error;
    }
  },

  async fetchBlogs(filters?: { 
    category?: string;
    search?: string;
  }): Promise<Blog[]> {
    try {
      const queryParams = new URLSearchParams();
      if (filters?.category) queryParams.append('category', filters.category);
      if (filters?.search) queryParams.append('search', filters.search);

      const response = await fetch(
        `${API_BASE_URL}/blogs${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch blogs');
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  },

  async fetchBlogBySlug(slug: string): Promise<Blog> {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/${slug}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch blog');
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching blog:', error);
      throw error;
    }
  },

  
};

