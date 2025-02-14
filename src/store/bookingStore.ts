{/*

import { create } from 'zustand'

interface Location {
  suburbName: string
  postcode: string
  region: string
}

export interface Address {
  street: string
  unit?: string
  suburb: string
  postcode: string
  state: string
  instructions?: string
}

interface BookingDetails {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: Address
  date: string
  isFlexibleDate: boolean
  time: string
  isFlexibleTime: boolean
}

interface ServiceInfo {
  id: string
  name: string
  description?: string
  basePrice?: number
}

interface BookingState {
  // Location state
  location: Location | null
  setLocation: (location: { name: string; postcode: string; region: string }) => void
  clearLocation: () => void

  // Service state
  service: ServiceInfo | null
  setService: (service: { id: string; name: string; description?: string; basePrice?: number }) => void
  clearService: () => void

  // Details state
  details: BookingDetails | null
  setDetails: (details: BookingDetails) => void
  updateDetails: (details: Partial<BookingDetails>) => void
  clearDetails: () => void
}

const initialDetails: BookingDetails = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: {
    street: '',
    unit: '',
    suburb: '',
    postcode: '',
    state: 'VIC',
    instructions: ''
  },
  date: '',
  isFlexibleDate: false,
  time: '',
  isFlexibleTime: false
}

export const useBookingStore = create<BookingState>((set) => ({
  // Location state
  location: null,
  setLocation: (location) => 
    set({
      location: {
        suburbName: location.name,
        postcode: location.postcode,
        region: location.region
      }
    }),
  clearLocation: () => set({ location: null }),

  // Service state
  service: null,
  setService: (service) => set({ service }),
  clearService: () => set({ service: null }),

  // Details state
  details: null,
  setDetails: (details) => set({ details }),
  updateDetails: (partialDetails) => 
    set((state) => ({
      details: state.details 
        ? { ...state.details, ...partialDetails }
        : { ...initialDetails, ...partialDetails }
    })),
  clearDetails: () => set({ details: null })
}))    */}