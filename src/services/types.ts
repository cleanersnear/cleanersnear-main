export interface ApiResponse {
  success: boolean;
  message: string;
  bookingNumber?: string;  // For confirmation page
  error?: string;
}

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