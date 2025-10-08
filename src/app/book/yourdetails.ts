// Your Details Section Type Definitions


// This file defines all types and interfaces for the customer details form

export interface CustomerDetails {
  // Personal Information
  firstName: string;
  lastName: string;
  
  // Contact Information
  email: string;
  phone: string;
  
  // Service Address
  address: string;
  
  // Schedule
  scheduleDate: string;
  
  // Additional Information
  notes?: string;
  
  // Service-Specific Fields
  ndisDetails?: NDISDetails;
  commercialDetails?: CommercialDetails;
  endOfLeaseDetails?: EndOfLeaseDetails;
}

export interface NDISDetails {
  ndisNumber?: string;
  planManager?: string;
  // Future fields can be added here
  // supportLevel?: 'Independent' | 'Supervised' | 'Assisted';
  // accessibilityNeeds?: string[];
}

export interface CommercialDetails {
  businessName?: string;
  businessType?: 'office' | 'retail' | 'agedCare' | 'educationChildCare' | 'government' | 'medical' | 'gymFitness' | 'restaurantHospitality' | 'warehouseIndustrial' | 'other';
  abn?: string;
  contactPerson?: string;
  // Future fields can be added here
  // abn?: string;
  // businessRegistration?: string;
  // contactPerson?: string;
}

// End of Lease - customer info
export interface EndOfLeaseDetails {
  role?: 'Tenant' | 'Property Owner' | 'Real Estate Agent';
  parkingAcknowledged?: boolean; // informational toggle
}

// Form validation rules
export interface CustomerDetailsValidation {
  required: {
    firstName: boolean;
    lastName: boolean;
    email: boolean;
    phone: boolean;
    address: boolean;
    scheduleDate: boolean;
  };
  
  optional: {
    notes: boolean;
    ndisDetails: boolean;
    commercialDetails: boolean;
  };
  
  // Validation patterns
  patterns: {
    email: RegExp;
    phone: RegExp;
  };
}

// Form field configurations
export interface CustomerDetailsConfig {
  // Personal Information
  personalFields: Array<{
    name: keyof Pick<CustomerDetails, 'firstName' | 'lastName'>;
    label: string;
    type: 'text';
    required: boolean;
    placeholder: string;
  }>;
  
  // Contact Information
  contactFields: Array<{
    name: keyof Pick<CustomerDetails, 'email' | 'phone'>;
    label: string;
    type: 'email' | 'tel';
    required: boolean;
    placeholder: string;
  }>;
  
  // Address Information
  addressFields: Array<{
    name: keyof Pick<CustomerDetails, 'address'>;
    label: string;
    type: 'textarea';
    required: boolean;
    placeholder: string;
    rows: number;
  }>;
  
  // Schedule Information
  scheduleFields: Array<{
    name: keyof Pick<CustomerDetails, 'scheduleDate'>;
    label: string;
    type: 'date';
    required: boolean;
    minDate: string;
  }>;
  
  // Additional Information
  additionalFields: Array<{
    name: keyof Pick<CustomerDetails, 'notes'>;
    label: string;
    type: 'textarea';
    required: boolean;
    placeholder: string;
    rows: number;
  }>;
}

// NDIS-specific field configurations
export interface NDISFieldConfig {
  fields: Array<{
    name: keyof NDISDetails;
    label: string;
    type: 'text';
    required: boolean;
    placeholder: string;
  }>;
}

// Commercial-specific field configurations
export interface CommercialFieldConfig {
  fields: Array<{
    name: keyof CommercialDetails;
    label: string;
    type: 'text' | 'select';
    required: boolean;
    placeholder?: string;
    options?: Array<{
      value: string;
      label: string;
    }>;
  }>;
}

export interface EndOfLeaseFieldConfig {
  roles: Array<{ value: EndOfLeaseDetails['role']; label: string }>;
  parkingNote: string;
}

// Configuration constants
export const CUSTOMER_DETAILS_CONFIG: CustomerDetailsConfig = {
  personalFields: [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      required: true,
      placeholder: 'Enter your first name',
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      required: true,
      placeholder: 'Enter your last name',
    },
  ],
  
  contactFields: [
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      placeholder: 'Enter your email address',
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      required: true,
      placeholder: 'Enter your phone number',
    },
  ],
  
  addressFields: [
    {
      name: 'address',
      label: 'Full Address',
      type: 'textarea',
      required: true,
      placeholder: 'Enter the full address where cleaning service is needed',
      rows: 3,
    },
  ],
  
  scheduleFields: [
    {
      name: 'scheduleDate',
      label: 'Preferred Date',
      type: 'date',
      required: true,
      minDate: new Date().toISOString().split('T')[0],
    },
  ],
  
  additionalFields: [
    {
      name: 'notes',
      label: 'Special Instructions or Notes',
      type: 'textarea',
      required: false,
      placeholder: 'Any special instructions, access codes, or additional information...',
      rows: 4,
    },
  ],
};

export const NDIS_FIELD_CONFIG: NDISFieldConfig = {
  fields: [
    {
      name: 'ndisNumber',
      label: 'NDIS Number',
      type: 'text',
      required: false,
      placeholder: 'Enter NDIS participant number',
    },
    {
      name: 'planManager',
      label: 'Plan Manager (if applicable)',
      type: 'text',
      required: false,
      placeholder: 'Enter plan manager details',
    },
  ],
};

export const COMMERCIAL_FIELD_CONFIG: CommercialFieldConfig = {
  fields: [
    {
      name: 'businessName',
      label: 'Business Name',
      type: 'text',
      required: false,
      placeholder: 'Enter business name',
    },
    {
      name: 'abn',
      label: 'Business ABN',
      type: 'text',
      required: false,
      placeholder: 'Enter ABN (if applicable)',
    },
    {
      name: 'contactPerson',
      label: 'Contact Person',
      type: 'text',
      required: false,
      placeholder: 'Primary contact person',
    },
    {
      name: 'businessType',
      label: 'Business Type',
      type: 'select',
      required: false,
      options: [
        { value: 'office', label: 'Office' },
        { value: 'retail', label: 'Retail' },
        { value: 'agedCare', label: 'Aged Care' },
        { value: 'educationChildCare', label: 'Education & Child Care' },
        { value: 'government', label: 'Government' },
        { value: 'medical', label: 'Medical & Healthcare' },
        { value: 'gymFitness', label: 'Gym & Fitness' },
        { value: 'restaurantHospitality', label: 'Restaurant & Hospitality' },
        { value: 'warehouseIndustrial', label: 'Warehouse & Industrial' },
        { value: 'other', label: 'Other' },
      ],
    },
  ],
};

export const END_OF_LEASE_FIELD_CONFIG: EndOfLeaseFieldConfig = {
  roles: [
    { value: 'Tenant', label: 'Tenant' },
    { value: 'Property Owner', label: 'Property Owner' },
    { value: 'Real Estate Agent', label: 'Real Estate Agent' },
  ],
  parkingNote:
    'Parking must be provided by the client for our cleaners. If parking is not available, any parking costs will be added to the invoice.',
};

// Validation rules
export const CUSTOMER_DETAILS_VALIDATION: CustomerDetailsValidation = {
  required: {
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
    address: true,
    scheduleDate: true,
  },
  
  optional: {
    notes: false,
    ndisDetails: false,
    commercialDetails: false,
  },
  
  patterns: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^(\+61|0)[2-9]\d{8}$/, // Australian phone number format
  },
};

// Utility functions
export const validateCustomerDetails = (details: Partial<CustomerDetails>): boolean => {
  const required = CUSTOMER_DETAILS_VALIDATION.required;
  
  // Check required fields
  for (const [field, isRequired] of Object.entries(required)) {
    if (isRequired && !details[field as keyof CustomerDetails]) {
      return false;
    }
  }
  
  // Validate email format
  if (details.email && !CUSTOMER_DETAILS_VALIDATION.patterns.email.test(details.email)) {
    return false;
  }
  
  // Validate phone format
  if (details.phone && !CUSTOMER_DETAILS_VALIDATION.patterns.phone.test(details.phone)) {
    return false;
  }
  
  return true;
};

export const getServiceSpecificFields = (serviceType: string) => {
  switch (serviceType) {
    case 'NDIS Cleaning':
      return NDIS_FIELD_CONFIG;
    case 'Commercial Cleaning':
      return COMMERCIAL_FIELD_CONFIG;
    default:
      return null;
  }
};

// Type exports
export type CustomerDetailsField = keyof CustomerDetails;
export type NDISDetailsField = keyof NDISDetails;
export type CommercialDetailsField = keyof CommercialDetails;
