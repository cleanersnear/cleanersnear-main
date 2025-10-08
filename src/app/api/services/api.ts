// Base API URLs
const API_BASE = process.env.NEXT_PUBLIC_API_URL;
const API_BASE_URL = API_BASE + '/api';




export type ApiResponseData = 
    | SubscriptionResponse
    | ContactFormResponse
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




interface SubscriptionResponse {
    subscriptionId: string;
    status: 'active' | 'pending';
}

interface ContactFormResponse {
    ticketId: string;
    status: 'received' | 'processing';
}

// Consolidated service types (moved from src/services/types.ts)
export interface CustomerDetails {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  address: {
    street: string;
    unit?: string;
    suburb: string;
    postcode: string;
    state: string;
    instructions?: string;
  };
}

export interface BaseServiceDetails {
  name: string;
  type: string;
  price: number;
}



export const apiService = {
  

 
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

