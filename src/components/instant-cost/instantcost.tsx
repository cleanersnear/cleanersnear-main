'use client'

import { useState, useEffect } from 'react'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

type ServiceType = 
  | 'Carpet Cleaning'
  | 'End Of Lease Cleaning'
  | 'General Cleaning'
  | 'Deep Cleaning'
  | 'Move In Cleaning'
  | 'NDIS Cleaning'
  | 'Commercial Cleaning'

interface FormData {
  // Common fields
  service: ServiceType
  name: string
  email: string
  phone: string
  address: string
  notes: string
  typeOfClean: string
  
  // Dynamic fields based on service
  bedrooms?: string
  bathrooms?: string
  carpetRooms?: string
  propertyType?: string
  squareMeters?: string
  frequency?: string
  windows?: string
  extras?: string[]
  level?: string
  ndisNumber?: string
  commercialType?: string
  officeSize?: string
}

interface CarpetCleaningPrices {
  residential: {
    room: number
    hallway: number
    stairs: number
  }
  commercial: {
    room: number
    hallway: number
    stairs: number
  }
}

const CARPET_PRICES: CarpetCleaningPrices = {
  residential: {
    room: 35,
    hallway: 25,
    stairs: 40
  },
  commercial: {
    room: 45,
    hallway: 45,
    stairs: 45
  }
}

interface CarpetFormData {
  rooms: number
  hallways: number
  stairs: number
  isCommercial: boolean
}

const INITIAL_FORM_DATA: FormData = {
  service: '' as ServiceType,
  name: '',
  email: '',
  phone: '',
  address: '',
  notes: '',
  typeOfClean: ''
}

const INITIAL_CARPET_DATA: CarpetFormData = {
  rooms: 0,
  hallways: 0,
  stairs: 0,
  isCommercial: false
}

interface NDISPrices {
  onceOff: number;
  regular: {
    weekly: number;
    fortnightly: number;
    monthly: number;
  };
}

const NDIS_PRICES: NDISPrices = {
  onceOff: 50.20,
  regular: {
    weekly: 45.18,
    fortnightly: 47.19,
    monthly: 48.69
  }
}

interface NDISFormData {
  cleanType: 'regular' | 'onceOff' | '';
  frequency?: 'weekly' | 'fortnightly' | 'monthly';
  hours: number;
}

const INITIAL_NDIS_DATA: NDISFormData = {
  cleanType: '',
  frequency: undefined,
  hours: 2 // Default minimum hours
}

interface CommercialPrices {
  onceOff: number;
  regular: {
    daily: number;
    weekly: number;
    fortnightly: number;
    monthly: number;
  };
}

const COMMERCIAL_PRICES: CommercialPrices = {
  onceOff: 55,
  regular: {
    daily: 40,
    weekly: 45,
    fortnightly: 48,
    monthly: 50
  }
}

interface CommercialFormData {
  cleanType: 'regular' | 'onceOff' | '';
  frequency?: 'daily' | 'weekly' | 'fortnightly' | 'monthly';
  hours: number;
  staff: number;
}

const INITIAL_COMMERCIAL_DATA: CommercialFormData = {
  cleanType: '',
  frequency: undefined,
  hours: 2, // Default minimum hours
  staff: 1  // Default minimum staff
}

interface DeepCleaningPrices {
  hourlyRate: number;
  minimumHours: number;
}

const DEEP_CLEANING_PRICES: DeepCleaningPrices = {
  hourlyRate: 55,
  minimumHours: 3
}

interface DeepCleaningFormData {
  hours: number;
}

const INITIAL_DEEP_CLEANING_DATA: DeepCleaningFormData = {
  hours: 3 // Default to minimum hours
}

interface MoveInPrices {
  hourlyRate: number;
  minimumHours: number;
}

const MOVE_IN_PRICES: MoveInPrices = {
  hourlyRate: 48,
  minimumHours: 3
}

interface MoveInFormData {
  hours: number;
}

const INITIAL_MOVE_IN_DATA: MoveInFormData = {
  hours: 3 // Default to minimum hours
}

interface GeneralCleaningPrices {
  hourly: {
    onceOff: number;
    weekly: number;
    fortnightly: number;
    monthly: number;
  };
  flatRate: {
    studio: number;
    bed1: number;
    bed2: number;
    bed3: number;
    bed4: number;
  };
}

const GENERAL_CLEANING_PRICES: GeneralCleaningPrices = {
  hourly: {
    onceOff: 48,
    weekly: 38,
    fortnightly: 40,
    monthly: 45
  },
  flatRate: {
    studio: 195,
    bed1: 180,
    bed2: 212,
    bed3: 309,
    bed4: 395
  }
}

interface GeneralCleaningFormData {
  pricingType: 'hourly' | 'flatRate' | '';
  frequency?: 'onceOff' | 'weekly' | 'fortnightly' | 'monthly';
  hours?: number;
  bedrooms?: 'studio' | 'bed1' | 'bed2' | 'bed3' | 'bed4' | 'bed5Plus';
}

const INITIAL_GENERAL_CLEANING_DATA: GeneralCleaningFormData = {
  pricingType: '',
  frequency: undefined,
  hours: 3,
  bedrooms: undefined
}

interface EndOfLeasePrices {
  studio: { min: number; max: number };
  bed1: { min: number; max: number };
  bed2: { min: number; max: number };
  bed3: { min: number; max: number };
  bed4: { min: number; max: number };
}

const END_OF_LEASE_PRICES: EndOfLeasePrices = {
  studio: { min: 260, max: 315 },
  bed1: { min: 260, max: 315 },
  bed2: { min: 287, max: 408 },
  bed3: { min: 359, max: 650 },
  bed4: { min: 545, max: 890 }
}

interface EndOfLeaseFormData {
  bedrooms: 'studio' | 'bed1' | 'bed2' | 'bed3' | 'bed4' | 'bed5Plus' | '';
}

const INITIAL_END_OF_LEASE_DATA: EndOfLeaseFormData = {
  bedrooms: ''
}

const BookingButton = ({ price }: { price: number | string }) => (
  <div className="mt-8 p-6 bg-gray-50 rounded-lg border-t">
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="text-gray-600">Total Price:</span>
        <span className="text-3xl font-bold text-[#1E3D8F]">${price}</span>
      </div>
      <a
        href="http://localhost:3000/quick-book/location"
        className="w-full md:w-auto bg-[#1E3D8F] text-white px-8 py-3 rounded-lg
          hover:bg-[#1E3D8F]/90 transition-all duration-200 flex items-center justify-center gap-2"
      >
        <span>Book Now Online</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  </div>
)

export default function InstantCost() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  
  const [isClient, setIsClient] = useState(false)
  const [carpetData, setCarpetData] = useState<CarpetFormData>(INITIAL_CARPET_DATA)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [ndisData, setNdisData] = useState<NDISFormData>(INITIAL_NDIS_DATA)
  const [commercialData, setCommercialData] = useState<CommercialFormData>(INITIAL_COMMERCIAL_DATA)
  const [deepCleaningData, setDeepCleaningData] = useState<DeepCleaningFormData>(INITIAL_DEEP_CLEANING_DATA)
  const [moveInData, setMoveInData] = useState<MoveInFormData>(INITIAL_MOVE_IN_DATA)
  const [generalCleaningData, setGeneralCleaningData] = useState<GeneralCleaningFormData>(INITIAL_GENERAL_CLEANING_DATA)
  const [endOfLeaseData, setEndOfLeaseData] = useState<EndOfLeaseFormData>(INITIAL_END_OF_LEASE_DATA)

  const services = [
    { 
      id: 'general', 
      name: 'General Cleaning', 
      icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    },
    { 
      id: 'end-of-lease', 
      name: 'End Of Lease Cleaning', 
      icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    },
    { 
      id: 'carpet', 
      name: 'Carpet Cleaning', 
      icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    },
    { 
      id: 'commercial', 
      name: 'Commercial Cleaning', 
      icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    },
    { 
      id: 'ndis', 
      name: 'NDIS Cleaning', 
      icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    },
    { 
      id: 'deep', 
      name: 'Deep Cleaning', 
      icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    },
    { 
      id: 'move-in', 
      name: 'Move In Cleaning', 
      icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    }
  ];

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Calculate total price whenever carpet data changes
  useEffect(() => {
    if (formData.service === 'Carpet Cleaning') {
      const prices = carpetData.isCommercial ? CARPET_PRICES.commercial : CARPET_PRICES.residential
      const total = 
        (carpetData.rooms * prices.room) +
        (carpetData.hallways * prices.hallway) +
        (carpetData.stairs * prices.stairs)
      setTotalPrice(total)
    }
  }, [carpetData, formData.service])

  

  const handleCarpetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setCarpetData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : Math.max(0, parseInt(value) || 0)
    }))
  }

  const handleNDISChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setNdisData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCommercialChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCommercialData(prev => ({
      ...prev,
      [name]: name === 'hours' || name === 'staff' ? Math.max(1, parseInt(value) || 0) : value
    }));
  }

  const handleDeepCleaningChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hours = Math.max(DEEP_CLEANING_PRICES.minimumHours, parseInt(e.target.value) || DEEP_CLEANING_PRICES.minimumHours);
    setDeepCleaningData({ hours });
  }

  const handleMoveInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hours = Math.max(MOVE_IN_PRICES.minimumHours, parseInt(e.target.value) || MOVE_IN_PRICES.minimumHours);
    setMoveInData({ hours });
  }

  const handleGeneralCleaningChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setGeneralCleaningData(prev => ({
      ...prev,
      [name]: name === 'hours' ? Math.max(3, parseInt(value) || 3) : value
    }));
  }

  
  const getCarpetFields = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Rooms
          </label>
          <input
            type="number"
            name="rooms"
            min="0"
            value={carpetData.rooms}
            onChange={handleCarpetChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-1 text-sm text-gray-500">
            ${carpetData.isCommercial ? CARPET_PRICES.commercial.room : CARPET_PRICES.residential.room} per room
          </p>
        </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Hallways
              </label>
          <input
            type="number"
            name="hallways"
            min="0"
            value={carpetData.hallways}
            onChange={handleCarpetChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-1 text-sm text-gray-500">
            ${carpetData.isCommercial ? CARPET_PRICES.commercial.hallway : CARPET_PRICES.residential.hallway} per hallway
          </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Stairs
          </label>
          <input
            type="number"
            name="stairs"
            min="0"
            value={carpetData.stairs}
            onChange={handleCarpetChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-1 text-sm text-gray-500">
            ${carpetData.isCommercial ? CARPET_PRICES.commercial.stairs : CARPET_PRICES.residential.stairs} per staircase
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="isCommercial"
            name="isCommercial"
            checked={carpetData.isCommercial}
            onChange={handleCarpetChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="isCommercial" className="text-sm font-medium text-gray-700">
            Commercial Property
              </label>
        </div>
        
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Price:</p>
          <p className="text-2xl font-bold text-blue-600">
            ${totalPrice}
          </p>
        </div>
      </div>
    </div>
  )

  const getNDISFields = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setNdisData(prev => ({ ...prev, cleanType: 'onceOff', frequency: undefined }))}
          className={`p-4 rounded-lg border transition-all ${
            ndisData.cleanType === 'onceOff' 
              ? 'border-blue-600 bg-blue-50' 
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <h3 className="text-base font-semibold mb-1">Once-off Clean</h3>
          <p className="text-gray-600 text-xs mb-2">Single cleaning service without any commitment</p>
          <p className="text-lg font-bold text-blue-600">${NDIS_PRICES.onceOff}/hour</p>
        </button>

        <button
          type="button"
          onClick={() => setNdisData(prev => ({ ...prev, cleanType: 'regular' }))}
          className={`p-4 rounded-lg border transition-all ${
            ndisData.cleanType === 'regular' 
              ? 'border-blue-600 bg-blue-50' 
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <h3 className="text-base font-semibold mb-1">Regular Clean</h3>
          <p className="text-gray-600 text-xs mb-2">Scheduled cleaning with NDIS plan support</p>
          <p className="text-lg font-bold text-blue-600">From ${NDIS_PRICES.regular.weekly}/hour</p>
          <p className="text-green-500 text-xs">Save up to 10% on regular bookings</p>
        </button>
      </div>

      {ndisData.cleanType === 'regular' && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-base font-semibold mb-3">How often would you like your clean?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setNdisData(prev => ({ ...prev, frequency: 'weekly' }))}
              className={`p-3 rounded-lg border transition-all ${
                ndisData.frequency === 'weekly' 
                  ? 'border-blue-600 bg-white' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <h4 className="font-medium text-sm mb-1">Weekly</h4>
              <p className="text-base font-bold text-blue-600">${NDIS_PRICES.regular.weekly}/hour</p>
              <p className="text-green-500 text-xs">Save 10%</p>
            </button>

            <button
              type="button"
              onClick={() => setNdisData(prev => ({ ...prev, frequency: 'fortnightly' }))}
              className={`p-3 rounded-lg border transition-all ${
                ndisData.frequency === 'fortnightly' 
                  ? 'border-blue-600 bg-white' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <h4 className="font-medium text-sm mb-1">Fortnightly</h4>
              <p className="text-base font-bold text-blue-600">${NDIS_PRICES.regular.fortnightly}/hour</p>
              <p className="text-green-500 text-xs">Save 6%</p>
            </button>

            <button
              type="button"
              onClick={() => setNdisData(prev => ({ ...prev, frequency: 'monthly' }))}
              className={`p-3 rounded-lg border transition-all ${
                ndisData.frequency === 'monthly' 
                  ? 'border-blue-600 bg-white' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <h4 className="font-medium text-sm mb-1">Monthly</h4>
              <p className="text-base font-bold text-blue-600">${NDIS_PRICES.regular.monthly}/hour</p>
              <p className="text-green-500 text-xs">Save 3%</p>
            </button>
          </div>
        </div>
      )}

      {ndisData.cleanType && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-base font-semibold mb-3">How many hours do you need?</h3>
          <div className="flex items-center gap-3">
            <input
              type="number"
              name="hours"
              min="2"
              value={ndisData.hours}
              onChange={handleNDISChange}
              className="w-20 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-600 text-sm">hours</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">Minimum 2 hours required</p>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">Total Price:</p>
              <p className="text-xl font-bold text-blue-600">
                ${(ndisData.cleanType === 'regular' && ndisData.frequency 
                  ? NDIS_PRICES.regular[ndisData.frequency] 
                  : NDIS_PRICES.onceOff) * ndisData.hours}/clean
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const getCommercialFields = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setCommercialData(prev => ({ ...prev, cleanType: 'onceOff', frequency: undefined }))}
          className={`p-4 rounded-lg border transition-all ${
            commercialData.cleanType === 'onceOff' 
              ? 'border-blue-600 bg-blue-50' 
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <h3 className="text-base font-semibold mb-1">Once-off Clean</h3>
          <p className="text-gray-600 text-xs mb-2">Single commercial cleaning service</p>
          <p className="text-lg font-bold text-blue-600">${COMMERCIAL_PRICES.onceOff}/hour</p>
        </button>

        <button
          type="button"
          onClick={() => setCommercialData(prev => ({ ...prev, cleanType: 'regular' }))}
          className={`p-4 rounded-lg border transition-all ${
            commercialData.cleanType === 'regular' 
              ? 'border-blue-600 bg-blue-50' 
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <h3 className="text-base font-semibold mb-1">Regular Clean</h3>
          <p className="text-gray-600 text-xs mb-2">Scheduled commercial cleaning service</p>
          <p className="text-lg font-bold text-blue-600">From ${COMMERCIAL_PRICES.regular.daily}/hour</p>
          <p className="text-green-500 text-xs">Save up to 27% on regular bookings</p>
        </button>
      </div>

      {commercialData.cleanType === 'regular' && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-base font-semibold mb-3">How often would you like your clean?</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {Object.entries(COMMERCIAL_PRICES.regular).map(([freq, price]) => (
              <button
                key={freq}
                type="button"
                onClick={() => setCommercialData(prev => ({ 
                  ...prev, 
                  frequency: freq as CommercialFormData['frequency']
                }))}
                className={`p-3 rounded-lg border transition-all ${
                  commercialData.frequency === freq 
                    ? 'border-blue-600 bg-white' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <h4 className="font-medium text-sm mb-1">
                  {freq.charAt(0).toUpperCase() + freq.slice(1)}
                </h4>
                <p className="text-base font-bold text-blue-600">${price}/hour</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {commercialData.cleanType && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-base font-semibold mb-3">Hours per visit</h3>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  name="hours"
                  min="1"
                  value={commercialData.hours}
                  onChange={handleCommercialChange}
                  className="w-20 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-600 text-sm">hours</span>
              </div>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-3">Staff per visit</h3>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  name="staff"
                  min="1"
                  value={commercialData.staff}
                  onChange={handleCommercialChange}
                  className="w-20 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-600 text-sm">staff members</span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">Total Price per Visit:</p>
              <p className="text-xl font-bold text-blue-600">
                ${(() => {
                  const baseRate = commercialData.cleanType === 'regular' && commercialData.frequency
                    ? COMMERCIAL_PRICES.regular[commercialData.frequency]
                    : COMMERCIAL_PRICES.onceOff;
                  return baseRate * commercialData.hours * commercialData.staff;
                })()}/visit
              </p>
            </div>
          </div>
        </div>
      )}

      {commercialData.cleanType && (
        <BookingButton 
          price={(() => {
            const baseRate = commercialData.cleanType === 'regular' && commercialData.frequency
              ? COMMERCIAL_PRICES.regular[commercialData.frequency]
              : COMMERCIAL_PRICES.onceOff;
            return baseRate * commercialData.hours * commercialData.staff;
          })()}
        />
      )}
    </div>
  )

  const getGeneralCleaningFields = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setGeneralCleaningData(prev => ({ 
            ...prev, 
            pricingType: 'hourly',
            bedrooms: undefined 
          }))}
          className={`p-4 rounded-lg border transition-all ${
            generalCleaningData.pricingType === 'hourly' 
              ? 'border-blue-600 bg-blue-50' 
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <h3 className="text-base font-semibold mb-1">Hourly Rate</h3>
          <p className="text-gray-600 text-xs mb-2">Pay by the hour</p>
          <p className="text-lg font-bold text-blue-600">From ${GENERAL_CLEANING_PRICES.hourly.weekly}/hour</p>
        </button>

        <button
          type="button"
          onClick={() => setGeneralCleaningData(prev => ({ 
            ...prev, 
            pricingType: 'flatRate',
            frequency: undefined,
            hours: undefined 
          }))}
          className={`p-4 rounded-lg border transition-all ${
            generalCleaningData.pricingType === 'flatRate' 
              ? 'border-blue-600 bg-blue-50' 
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <h3 className="text-base font-semibold mb-1">Flat Rate</h3>
          <p className="text-gray-600 text-xs mb-2">Fixed price based on bedrooms</p>
          <p className="text-lg font-bold text-blue-600">From ${GENERAL_CLEANING_PRICES.flatRate.studio}</p>
        </button>
      </div>

      {generalCleaningData.pricingType === 'hourly' && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-base font-semibold mb-3">Select Frequency</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {Object.entries(GENERAL_CLEANING_PRICES.hourly).map(([freq, price]) => (
              <button
                key={freq}
                type="button"
                onClick={() => setGeneralCleaningData(prev => ({ 
                  ...prev, 
                  frequency: freq as GeneralCleaningFormData['frequency']
                }))}
                className={`p-3 rounded-lg border transition-all ${
                  generalCleaningData.frequency === freq 
                    ? 'border-blue-600 bg-white' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <h4 className="font-medium text-sm mb-1">
                  {freq === 'onceOff' ? 'Once-off' : freq.charAt(0).toUpperCase() + freq.slice(1)}
                </h4>
                <p className="text-base font-bold text-blue-600">${price}/hour</p>
              </button>
            ))}
          </div>

          {generalCleaningData.frequency && (
            <div className="mt-4">
              <h3 className="text-base font-semibold mb-2">Hours Needed</h3>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  name="hours"
                  min={3}
                  value={generalCleaningData.hours || 3}
                  onChange={handleGeneralCleaningChange}
                  className="w-20 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-600 text-sm">hours</span>
              </div>
              <p className="text-xs text-gray-500">
                Minimum 3 hours required
              </p>
            </div>
          )}
        </div>
      )}

      {generalCleaningData.pricingType === 'flatRate' && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-base font-semibold mb-3">Select Property Size</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { id: 'studio', label: 'Studio', price: GENERAL_CLEANING_PRICES.flatRate.studio },
              { id: 'bed1', label: '1 Bedroom', price: GENERAL_CLEANING_PRICES.flatRate.bed1 },
              { id: 'bed2', label: '2 Bedrooms', price: GENERAL_CLEANING_PRICES.flatRate.bed2 },
              { id: 'bed3', label: '3 Bedrooms', price: GENERAL_CLEANING_PRICES.flatRate.bed3 },
              { id: 'bed4', label: '4 Bedrooms', price: GENERAL_CLEANING_PRICES.flatRate.bed4 },
              { id: 'bed5Plus', label: '5+ Bedrooms', price: null }
            ].map(option => (
              <button
                key={option.id}
                type="button"
                onClick={() => setGeneralCleaningData(prev => ({ 
                  ...prev, 
                  bedrooms: option.id as GeneralCleaningFormData['bedrooms']
                }))}
                disabled={option.id === 'bed5Plus'}
                className={`p-3 rounded-lg border transition-all ${
                  generalCleaningData.bedrooms === option.id 
                    ? 'border-blue-600 bg-white' 
                    : option.id === 'bed5Plus'
                      ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                      : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <h4 className="font-medium text-sm mb-1">{option.label}</h4>
                {option.price ? (
                  <p className="text-base font-bold text-blue-600">${option.price}</p>
                ) : (
                  <p className="text-sm text-gray-500">Requires Inspection</p>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {((generalCleaningData.pricingType === 'hourly' && generalCleaningData.frequency && generalCleaningData.hours) ||
        (generalCleaningData.pricingType === 'flatRate' && generalCleaningData.bedrooms && generalCleaningData.bedrooms !== 'bed5Plus')) && (
        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">Total Price:</p>
            <p className="text-xl font-bold text-blue-600">
              ${generalCleaningData.pricingType === 'hourly'
                ? GENERAL_CLEANING_PRICES.hourly[generalCleaningData.frequency!] * generalCleaningData.hours!
                : GENERAL_CLEANING_PRICES.flatRate[generalCleaningData.bedrooms as keyof typeof GENERAL_CLEANING_PRICES.flatRate]}
            </p>
          </div>
        </div>
      )}
    </div>
  )


  const EndOfLeaseFields = () => {
    return ( 
      
      <div className="space-y-6">
      {/* Bond Back Guarantee Notice */}
      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <p className="text-sm text-green-800">
          <strong>Bond Back Guarantee:</strong> Our end of lease cleaning service is designed to help you get your bond back. 
          We follow a comprehensive checklist that meets real estate standards and includes all the necessary cleaning tasks required by property managers.
        </p>
      </div>

      {/* Property Size Selection */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-base font-semibold mb-3">Select Property Size</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { id: 'studio', label: 'Studio', desc: 'Perfect for small rentals and studio apartments' },
            { id: 'bed1', label: '1 Bedroom', desc: 'Perfect for small rentals and studio apartments' },
            { id: 'bed2', label: '2 Bedrooms', desc: 'Ideal for small to medium rental properties' },
            { id: 'bed3', label: '3 Bedrooms', desc: 'Perfect for medium to large rental homes' },
            { id: 'bed4', label: '4 Bedrooms', desc: 'Ideal for larger rental properties' },
            { id: 'bed5Plus', label: '5+ Bedrooms', desc: 'Contact us for a custom quote' }
          ].map(option => (
            <button
              key={option.id}
              type="button"
              onClick={() => setEndOfLeaseData({ 
                bedrooms: option.id as EndOfLeaseFormData['bedrooms']
              })}
              disabled={option.id === 'bed5Plus'}
              className={`p-4 rounded-lg border transition-all ${
                endOfLeaseData.bedrooms === option.id 
                  ? 'border-blue-600 bg-white' 
                  : option.id === 'bed5Plus'
                    ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <h4 className="font-medium text-base mb-1">{option.label}</h4>
              <p className="text-sm text-gray-500 mb-2">{option.desc}</p>
              {option.id !== 'bed5Plus' ? (
                <p className="text-lg font-bold text-blue-600">
                  ${END_OF_LEASE_PRICES[option.id as keyof EndOfLeasePrices].min} - ${END_OF_LEASE_PRICES[option.id as keyof EndOfLeasePrices].max}
                </p>
              ) : (
                <p className="text-sm text-gray-500">Requires Inspection</p>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>Important Note:</strong> The prices shown are average ranges for properties in usual condition. 
          The final price may be adjusted on the day of cleaning if additional work is required due to the 
          property&apos;s condition. Our cleaners will assess and confirm the final price upon arrival.
        </p>
      </div>
    </div>
    )
  }

  const getServiceFields = () => {
    switch(formData.service) {
      case 'Carpet Cleaning':
        return (
          <>
            {getCarpetFields()}
            <BookingButton price={totalPrice} />
          </>
        )

      case 'End Of Lease Cleaning':
        return (
          <>
            <EndOfLeaseFields />
            {endOfLeaseData.bedrooms && endOfLeaseData.bedrooms !== 'bed5Plus' && (
              <BookingButton 
                price={`${END_OF_LEASE_PRICES[endOfLeaseData.bedrooms as keyof EndOfLeasePrices].min} - 
                        ${END_OF_LEASE_PRICES[endOfLeaseData.bedrooms as keyof EndOfLeasePrices].max}`} 
              />
            )}
          </>
        )

      case 'General Cleaning':
        return (
          <>
            {getGeneralCleaningFields()}
            {((generalCleaningData.pricingType === 'hourly' && generalCleaningData.frequency && generalCleaningData.hours) ||
              (generalCleaningData.pricingType === 'flatRate' && generalCleaningData.bedrooms && generalCleaningData.bedrooms !== 'bed5Plus')) && (
              <BookingButton 
                price={generalCleaningData.pricingType === 'hourly'
                  ? GENERAL_CLEANING_PRICES.hourly[generalCleaningData.frequency!] * generalCleaningData.hours!
                  : GENERAL_CLEANING_PRICES.flatRate[generalCleaningData.bedrooms as keyof typeof GENERAL_CLEANING_PRICES.flatRate]} 
              />
            )}
          </>
        )

      case 'NDIS Cleaning':
        return (
          <>
            {getNDISFields()}
            {ndisData.cleanType && ndisData.hours && (
              <BookingButton 
                price={(ndisData.cleanType === 'regular' && ndisData.frequency 
                  ? NDIS_PRICES.regular[ndisData.frequency] 
                  : NDIS_PRICES.onceOff) * ndisData.hours} 
              />
            )}
          </>
        )

      case 'Commercial Cleaning':
        return (
          <>
            {getCommercialFields()}
            {commercialData.cleanType && commercialData.hours && commercialData.staff && (
              <BookingButton 
                price={(() => {
                  const baseRate = commercialData.cleanType === 'regular' && commercialData.frequency
                    ? COMMERCIAL_PRICES.regular[commercialData.frequency]
                    : COMMERCIAL_PRICES.onceOff;
                  return baseRate * commercialData.hours * commercialData.staff;
                })()} 
              />
            )}
          </>
        )

      case 'Deep Cleaning':
        return (
          <>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="max-w-md mx-auto">
                <h3 className="text-base font-semibold mb-3">How many hours do you need?</h3>
                <div className="flex items-center gap-3 mb-2">
                <input
                    type="number"
                    name="hours"
                    min={3}
                    value={deepCleaningData.hours}
                    onChange={handleDeepCleaningChange}
                    className="w-20 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-600 text-sm">hours</span>
                </div>
                <p className="text-xs text-gray-500">
                  Minimum 3 hours required at $55/hour
                </p>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">Total Price:</p>
                    <p className="text-xl font-bold text-blue-600">
                      ${deepCleaningData.hours * 55}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <BookingButton price={deepCleaningData.hours * DEEP_CLEANING_PRICES.hourlyRate} />
          </>
        )

      case 'Move In Cleaning':
        return (
          <>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> This is for Move IN Cleaning only. For Move OUT cleaning, 
                  please select &quot;End of Lease Cleaning&quot; option.
                </p>
            </div>

              <h3 className="text-base font-semibold mb-3">How many hours do you need?</h3>
              <div className="flex items-center gap-3 mb-2">
              <input
                  type="number"
                  name="hours"
                  min={MOVE_IN_PRICES.minimumHours}
                  value={moveInData.hours}
                  onChange={handleMoveInChange}
                  className="w-20 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-600 text-sm">hours</span>
              </div>
              <p className="text-xs text-gray-500">
                Minimum {MOVE_IN_PRICES.minimumHours} hours required at ${MOVE_IN_PRICES.hourlyRate}/hour
              </p>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">Total Price:</p>
                  <p className="text-xl font-bold text-blue-600">
                    ${moveInData.hours * MOVE_IN_PRICES.hourlyRate}
                  </p>
                </div>
              </div>
            </div>
            <BookingButton price={moveInData.hours * MOVE_IN_PRICES.hourlyRate} />
          </>
        )

      default:
        return null
    }
  }

  if (!isClient) {
    return <div className="min-h-[400px] flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-2 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="text-[#1E3D8F]" />
            <span className="text-sm font-semibold text-[#1E3D8F] uppercase tracking-wider">
              Instant Quote Calculator
            </span>
            <Sparkles className="text-[#1E3D8F]" />
          </motion.div>
          <h2 className="text-4xl font-bold mb-4">
            Get Your Instant Cleaning Quote
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select your service to get started with our smart pricing calculator
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Service Selection Grid */}
          <motion.div 
            className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto ${formData.service ? 'hidden' : ''}`}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {services.map((service) => (
              <motion.button
                key={service.id}
                onClick={() => setFormData(prev => ({ ...prev, service: service.name as ServiceType }))}
                className={`relative group h-[60px] 
                  bg-white border border-gray-200 rounded-lg shadow-sm
                  hover:border-[#1E3D8F] hover:shadow-md
                  transition-all duration-200`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="h-full flex items-center px-4">
                  <div className="min-w-[2.5rem] h-10 bg-[#1E3D8F] rounded-full flex items-center justify-center">
                    <div className="flex items-center justify-center">
                      {service.icon}
                    </div>
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-700 whitespace-normal">
                    {service.name}
                  </span>
                </div>
                <div className="absolute inset-0 bg-[#1E3D8F]/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />
              </motion.button>
            ))}
          </motion.div>

          {/* Calculator View */}
          {formData.service && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative"
            >
              {/* Back Button */}
              <motion.button
                onClick={() => setFormData(INITIAL_FORM_DATA)}
                className="absolute -top-16 left-0 flex items-center gap-2 text-[#1E3D8F] hover:text-[#1E3D8F]/80 transition-colors"
                whileHover={{ x: -5 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back to Services</span>
              </motion.button>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {formData.service}
                    </h2>
                    <p className="mt-2 text-gray-600">
                      Get an instant quote for your cleaning service
                    </p>
                  </div>

                  <div className="space-y-8">
                    {getServiceFields()}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          </div>
      </div>
    </div>
  )
} 