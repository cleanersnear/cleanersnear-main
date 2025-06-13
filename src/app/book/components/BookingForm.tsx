import React, { useState, useEffect, useCallback } from 'react';
import { useBookingStore } from '../booking-store/bookingStore';
import { ServiceType, BookingCategory } from '../types';
import { PRICING_TABLE } from '../pricing/pricingTable';
import type { BookingResponse } from '../types';
import { Phone } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar as CalendarIcon } from 'lucide-react';
import styles from './BookingForm.module.css';

const INDIVIDUAL_ONCE_OFF_SERVICES: ServiceType[] = [
  'General Cleaning',
  'NDIS Cleaning',
  'Move-In Cleaning',
  'Move-Out Cleaning',
  'Inspection Cleaning',
  'Deep/Spring Cleaning',
  'Airbnb Cleaning',
];

const INDIVIDUAL_REGULAR_SERVICES: ServiceType[] = [
  'General Cleaning',
  'NDIS Cleaning',
  'Airbnb Cleaning',
];

// Business Commercial Dialog Component
const CommercialDialog = ({ 
  isOpen, 
  onClose, 
  onRequestCallback, 
  onCallNow 
}: { 
  isOpen: boolean
  onClose: () => void
  onRequestCallback: () => void
  onCallNow: () => void 
}) => {
  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '2rem',
        maxWidth: '28rem',
        width: '100%',
        margin: '0 1rem'
      }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Special Commercial Pricing
        </h3>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
          For commercial cleaning services, we offer customized solutions and special pricing packages. 
          Let&apos;s have a discussion about your specific needs and find the best solution for your business.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
          <button
            onClick={onRequestCallback}
            style={{
              flex: 1,
              backgroundColor: '#1E3D8F',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 500,
              transition: 'all 0.18s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            Request Callback
          </button>
          <button
            onClick={onCallNow}
            style={{
              flex: 1,
              backgroundColor: '#FFA500',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 500,
              transition: 'all 0.18s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Phone size={20} />
            Call Now
          </button>
        </div>
        <button
          onClick={onClose}
          style={{
            width: '100%',
            color: '#6b7280',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px'
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  )
};

const categories = [
  { key: 'individual', label: "I'm an individual" },
  { key: 'business', label: "I'm a business" },
];

const BookingForm: React.FC = () => {
  // All hooks at the top
  const bookingCategory = useBookingStore((s) => s.bookingCategory);
  const setBookingCategory = useBookingStore((s) => s.setBookingCategory);
  const bookingType = useBookingStore((s) => s.bookingType);
  const frequency = useBookingStore((s) => s.frequency);
  const serviceType = useBookingStore((s) => s.serviceType);
  const setServiceType = useBookingStore((s) => s.setServiceType);
  const setMinHours = useBookingStore((s) => s.setMinHours);
  const setMinAmount = useBookingStore((s) => s.setMinAmount);
  const setBaseRate = useBookingStore((s) => s.setBaseRate);
  const setExtraHours = useBookingStore((s) => s.setExtraHours);
  const setTotalHours = useBookingStore((s) => s.setTotalHours);
  const setTotalPrice = useBookingStore((s) => s.setTotalPrice);
  const setAddress = useBookingStore((s) => s.setAddress);
  const setContactInfo = useBookingStore((s) => s.setContactInfo);
  const minHours = useBookingStore((s) => s.minHours) || 0;
  const baseRate = useBookingStore((s) => s.baseRate) || 0;
  const minAmount = useBookingStore((s) => s.minAmount) || 0;
  const extraHours = useBookingStore((s) => s.extraHours) || 0;
  const totalHours = useBookingStore((s) => s.totalHours);
  const setCurrentStep = useBookingStore((s) => s.setCurrentStep);
  const currentStepFromStore = useBookingStore((s) => s.currentStep);
  
  // Authentication state
  const isAuthenticated = useBookingStore((s) => s.isAuthenticated);
  const customer = useBookingStore((s) => s.customer);
  
  const [step, setStep] = useState(currentStepFromStore || 1);
  const [selectedHours, setSelectedHoursState] = useState(totalHours || minHours);
  const [address, setAddressState] = useState({
    street: '',
    suburb: '',
    state: '',
    postcode: '',
    additionalInfo: '',
  });
  const [contactInfo, setContactInfoState] = useState({
    phone: '',
    firstName: '',
    lastName: '',
    email: '',
  });
  const [bookingPreferences, setBookingPreferencesState] = useState({
    preferredDate: '',
    timePreference: null as 'morning' | 'afternoon' | 'evening' | null
  });
  const [bookingResponse, setBookingResponse] = useState<BookingResponse | null>(null);
  const [showCommercialDialog, setShowCommercialDialog] = useState(false);

  const bookingStoreState = useBookingStore();

  // Check if user has complete address info
  const hasCompleteAddress = useCallback(() => {
    return customer && customer.street && customer.suburb && customer.state && customer.postcode;
  }, [customer]);

  // Skip address step if authenticated user has complete address
  const shouldSkipAddressStep = useCallback(() => {
    return isAuthenticated && hasCompleteAddress();
  }, [isAuthenticated, hasCompleteAddress]);

  // Helper to sync both local and store step with smart skipping
  const goToStep = useCallback(async (n: number) => {
    // Skip address step if authenticated user has complete address
    if (n === 4 && shouldSkipAddressStep()) {
      n = 5; // Skip to date selection
    }
    
    // Skip contact info steps if authenticated and submit booking when going to step 10
    if (isAuthenticated && customer) {
      if (n === 7 || n === 8 || n === 9) {
        // Submit booking and go directly to confirmation
        try {
          const response = await useBookingStore.getState().sendBookingToBackend();
          setBookingResponse(response);
          n = 10;
        } catch (error: unknown) {
          let errorMsg = 'Failed to submit booking. Please try again.';
          if (error && typeof error === 'object' && 'response' in error) {
            const response = (error as { response: { json: () => Promise<{ error?: string }> } }).response;
            const data = await response.json();
            if (data?.error) errorMsg += `\n${data.error}`;
          } else if (error instanceof Error) {
            errorMsg += `\n${error.message}`;
          }
          alert(errorMsg);
          console.error('Failed to submit booking:', error);
          return; // Don't proceed to step 10 if booking failed
        }
      }
    }
    
    setStep(n);
    setCurrentStep(n);
  }, [isAuthenticated, customer, setBookingResponse, setStep, setCurrentStep, shouldSkipAddressStep]);

  // Sync local step with store currentStep on mount and changes
  useEffect(() => {
    if (currentStepFromStore && currentStepFromStore !== step) {
      setStep(currentStepFromStore);
    }
  }, [currentStepFromStore, step]);

  // Auto-populate pricing data when service type is pre-selected (from pricing page)
  useEffect(() => {
    if (serviceType && frequency && (!minHours || !baseRate)) {
      const pricing = PRICING_TABLE[frequency]?.[serviceType];
      if (pricing) {
        setMinHours(pricing.minHours);
        setMinAmount(pricing.minAmount);
        setBaseRate(pricing.baseRate);
        if (!extraHours) setExtraHours(0);
        if (!totalHours) setTotalHours(pricing.minHours);
        if (!useBookingStore.getState().totalPrice) setTotalPrice(pricing.minAmount);
      }
    }
  }, [serviceType, frequency, minHours, baseRate, extraHours, totalHours, setMinHours, setMinAmount, setBaseRate, setExtraHours, setTotalHours, setTotalPrice]);

  // Keep selectedHours in sync with store on step change
  useEffect(() => {
    if (step === 3) {
      setSelectedHoursState(totalHours || minHours);
    }
  }, [step, totalHours, minHours]);

  const handleAddressChange = (field: keyof typeof address, value: string) => {
    setAddressState(prev => ({ ...prev, [field]: value }));
  };

  const handleAddressNext = () => {
    setAddress(address);
    goToStep(5);
  };

  // Auto-populate address from customer data
  useEffect(() => {
    if (isAuthenticated && customer && step === 4) {
      if (hasCompleteAddress()) {
        // Auto-populate and skip to next step
        const customerAddress = {
          street: customer.street || '',
          suburb: customer.suburb || '',
          state: customer.state || '',
          postcode: customer.postcode || '',
          additionalInfo: customer.additional_info || '',
        };
        setAddressState(customerAddress);
        setAddress(customerAddress);
        goToStep(5); // Skip to date selection (this won't trigger async booking)
      }
    }
  }, [isAuthenticated, customer, step, hasCompleteAddress, setAddress, goToStep]);

  // Auto-populate contact info from customer data
  useEffect(() => {
    if (isAuthenticated && customer) {
      const customerContactInfo = {
        phone: customer.phone || '',
        firstName: customer.first_name || '',
        lastName: customer.last_name || '',
        email: customer.email || '',
      };
      setContactInfoState(customerContactInfo);
      setContactInfo(customerContactInfo);
    }
  }, [isAuthenticated, customer, setContactInfo]);

  const handleContactInfoChange = (field: keyof typeof contactInfo, value: string) => {
    setContactInfoState(prev => ({ ...prev, [field]: value }));
  };

  const handleRequestCallback = () => {
    setShowCommercialDialog(false);
    // Redirect to get-quote page which has contact form functionality
    window.location.href = '/contact';
  };

  const handleCallNow = () => {
    window.location.href = 'tel:0450124086';
  };

  // Step 2: Service selection for individual
  if (step === 2) {
    let availableServices: ServiceType[] = [];
    if (bookingType === 'once-off') {
      availableServices = INDIVIDUAL_ONCE_OFF_SERVICES;
    } else if (bookingType === 'regular') {
      availableServices = INDIVIDUAL_REGULAR_SERVICES;
    }
    return (
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 0' }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: '1.5rem', color: '#1E3D8F', textAlign: 'left' }}>
          What type of cleaning service are you after?
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {availableServices.map((service) => {
            const pricing = frequency && service ? PRICING_TABLE[frequency]?.[service] : undefined;
            return (
              <button
                key={service}
                style={{
                  padding: '18px 24px',
                  borderRadius: 16,
                  border: serviceType === service ? '2px solid #1E3D8F' : '1.5px solid #c3d0ee',
                  background: serviceType === service ? '#f3f7ff' : '#fff',
                  color: '#1E3D8F',
                  fontWeight: 500,
                  fontSize: 18,
                  cursor: 'pointer',
                  transition: 'all 0.18s',
                  outline: 'none',
                  textAlign: 'left',
                  boxShadow: serviceType === service ? '0 2px 12px rgba(30,61,143,0.08)' : 'none',
                  marginBottom: 0,
                  display: 'block',
                }}
                onClick={() => {
                  setServiceType(service);
                  if (frequency && service) {
                    const pricing = PRICING_TABLE[frequency]?.[service];
                    if (pricing) {
                      setMinHours(pricing.minHours);
                      setMinAmount(pricing.minAmount);
                      setBaseRate(pricing.baseRate);
                      setExtraHours(0); // default extra hours
                      setTotalHours(pricing.minHours); // default total hours
                      setTotalPrice(pricing.minAmount); // default total price
                      goToStep(3);
                    }
                  }
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 4 }}>{service}</div>
                {pricing && pricing.minHours > 0 ? (
                  <>
                    <div style={{ color: '#888', fontWeight: 400, fontSize: 15, marginBottom: 8 }}>
                      Starting from
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 24, color: '#1E3D8F', marginBottom: 2 }}>
                      ${pricing.minAmount.toFixed(2)} <span style={{ fontWeight: 400, fontSize: 16, color: '#222' }}>for {pricing.minHours} hours</span>
                    </div>
                    <div style={{ color: '#888', fontSize: 14 }}>
                      *${pricing.baseRate.toFixed(2)}/hour thereafter
                    </div>
                  </>
                ) : (
                  <div style={{ color: '#bbb', fontSize: 15 }}>Not available for this frequency</div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Step 3: Select extra hours
  if (step === 3) {
    // Options: minHours to minHours+4
    const hourOptions = Array.from({ length: 5 }, (_, i) => minHours + i);

    const handleSelectHours = (hours: number) => {
      setSelectedHoursState(hours);
      setTotalHours(hours); // update store
      const extra = hours - minHours;
      setExtraHours(extra > 0 ? extra : 0);
      setTotalPrice(minAmount + (extra > 0 ? extra * baseRate : 0));
    };

    const handleNoExtra = () => {
      setSelectedHoursState(minHours);
      setTotalHours(minHours); // update store
      setExtraHours(0);
      setTotalPrice(minAmount);
      goToStep(4); // move to next step
    };

    const handleNext = () => {
      goToStep(4);
    };

    return (
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 0' }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: '1.5rem', color: '#1E3D8F', textAlign: 'left' }}>
          Do you think you&apos;ll need a few extra hours for the job?
        </h2>
        <div className="step3-hours-grid" style={{ marginBottom: 24 }}>
          {hourOptions.map((h) => (
            <button
              key={h}
              onClick={() => handleSelectHours(h)}
              className={`step3-hour-btn${selectedHours === h ? ' selected' : ''}`}
              style={{
                padding: '14px 0',
                borderRadius: 12,
                border: selectedHours === h ? '2px solid #1E3D8F' : '1.5px solid #c3d0ee',
                background: selectedHours === h ? '#e3eefd' : '#fff',
                color: selectedHours === h ? '#1E3D8F' : '#1E3D8F',
                fontWeight: 600,
                fontSize: 18,
                cursor: 'pointer',
                transition: 'all 0.18s',
                outline: 'none',
                width: '100%',
                marginBottom: 0,
                boxShadow: selectedHours === h ? '0 2px 8px rgba(30,61,143,0.08)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: 56,
              }}
            >
              <span style={{ fontSize: 25, fontWeight: 700 }}>{h}</span>
              <span style={{ fontSize: 13, opacity: 0.7 }}>{h === 1 ? 'hour' : 'hours'}</span>
              {h === minHours && (
                <span style={{ fontSize: 12, color: '#638ff1', fontWeight: 500, marginTop: 2 }}>Current</span>
              )}
            </button>
          ))}
        </div>
        <div className="step3-action-row" style={{ display: 'flex', gap: '1rem', marginTop: 8 }}>
          {extraHours === 0 ? (
            <button
              style={{
                padding: '12px 20px',
                borderRadius: 12,
                border: '2px solid #1E3D8F',
                background: '#1E3D8F',
                color: '#fff',
                fontWeight: 600,
                fontSize: 17,
                cursor: 'pointer',
                transition: 'all 0.18s',
                outline: 'none',
                flex: 1,
                minWidth: 120,
                maxWidth: 180,
                width: '50%',
              }}
              onClick={handleNoExtra}
            >
              Naa ! It&apos;s fine
            </button>
          ) : (
            <button
              style={{
                padding: '12px 20px',
                borderRadius: 12,
                border: '1.5px solid #1E3D8F',
                background: '#1E3D8F',
                color: '#fff',
                fontWeight: 600,
                fontSize: 17,
                cursor: 'pointer',
                transition: 'all 0.18s',
                outline: 'none',
                marginLeft: 8,
                flex: 1,
                minWidth: 120,
                maxWidth: 180,
                width: '50%',
              }}
              onClick={handleNext}
            >
              Next
            </button>
          )}
        </div>
        <style>{`
          .step3-hours-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.75rem;
          }
          @media (min-width: 640px) {
            .step3-hours-grid {
              grid-template-columns: repeat(5, 1fr);
            }
          }
          .step3-hour-btn.selected {
            border-color: #1E3D8F !important;
            background: #e3eefd !important;
            color: #1E3D8F !important;
            box-shadow: 0 2px 8px rgba(30,61,143,0.08) !important;
          }
          .step3-action-row {
            display: flex;
            flex-direction: row;
            gap: 1rem;
          }
          @media (max-width: 600px) {
            .step3-action-row {
              flex-direction: row;
              gap: 0.75rem;
            }
            .step3-action-row button {
              width: 50% !important;
              min-width: 0 !important;
              max-width: 100% !important;
            }
          }
        `}</style>
      </div>
    );
  }

  // Step 4: Ask for address
  if (step === 4) {
    return (
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 0' }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: '1.5rem', color: '#1E3D8F', textAlign: 'left' }}>
          Where will the cleaning take place?
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Street Address"
            value={address.street}
            onChange={(e) => handleAddressChange('street', e.target.value)}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 8,
              border: '1.5px solid #c3d0ee',
              fontSize: 17,
            }}
          />
          <input
            type="text"
            placeholder="Suburb"
            value={address.suburb}
            onChange={(e) => handleAddressChange('suburb', e.target.value)}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 8,
              border: '1.5px solid #c3d0ee',
              fontSize: 17,
            }}
          />
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="text"
              placeholder="State"
              value={address.state}
              onChange={(e) => handleAddressChange('state', e.target.value)}
              style={{
                width: '40%',
                padding: '14px',
                borderRadius: 8,
                border: '1.5px solid #c3d0ee',
                fontSize: 17,
              }}
            />
            <input
              type="text"
              placeholder="Postcode"
              value={address.postcode}
              onChange={(e) => handleAddressChange('postcode', e.target.value)}
              style={{
                width: '60%',
                padding: '14px',
                borderRadius: 8,
                border: '1.5px solid #c3d0ee',
                fontSize: 17,
              }}
            />
          </div>
          <input
            type="text"
            placeholder="Additional Information (Optional)"
            value={address.additionalInfo}
            onChange={(e) => handleAddressChange('additionalInfo', e.target.value)}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 8,
              border: '1.5px solid #c3d0ee',
              fontSize: 17,
            }}
          />
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button
              onClick={() => goToStep(3)}
              style={{
                padding: '12px 24px',
                borderRadius: 32,
                border: '1.5px solid #c3d0ee',
                background: '#fff',
                color: '#1E3D8F',
                fontWeight: 500,
                fontSize: 17,
                cursor: 'pointer',
                transition: 'all 0.18s',
                outline: 'none',
                flex: 1,
              }}
            >
              Back
            </button>
            <button
              onClick={handleAddressNext}
              style={{
                padding: '12px 24px',
                borderRadius: 32,
                border: '1.5px solid #1E3D8F',
                background: '#1E3D8F',
                color: '#fff',
                fontWeight: 500,
                fontSize: 17,
                cursor: 'pointer',
                transition: 'all 0.18s',
                outline: 'none',
                flex: 1,
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 5: Date Selection
  if (step === 5) {
    // Convert string to Date for DatePicker
    const selectedDate = bookingPreferences.preferredDate ? new Date(bookingPreferences.preferredDate) : null;
    return (
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 0' }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: '1.5rem', color: '#1E3D8F', textAlign: 'left' }}>
          When would you like us to come by?
        </h2>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => {
              setBookingPreferencesState(prev => ({
                ...prev,
                preferredDate: date ? date.toISOString().split('T')[0] : ''
              }));
            }}
            minDate={new Date()}
            placeholderText="Pick a date"
            dateFormat="yyyy-MM-dd"
            customInput={
              <button
                type="button"
                className={styles['responsive-datepicker-button']}
                style={{ color: selectedDate ? '#1E3D8F' : '#888' }}
              >
                <CalendarIcon
                  size={20}
                  className={styles['datepicker-icon']}
                  style={{ color: '#1E3D8F' }}
                />
                <span
                  className={styles['datepicker-text']}
                  style={{ color: selectedDate ? '#1E3D8F' : '#888' }}
                >
                  {selectedDate ? selectedDate.toLocaleDateString() : 'Pick a date'}
                </span>
              </button>
            }
            popperPlacement="bottom"
            popperClassName="custom-blue-datepicker"
          />
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
          <button
            onClick={() => goToStep(4)}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: '1.5px solid #c3d0ee',
              background: '#fff',
              color: '#1E3D8F',
              fontWeight: 500,
              fontSize: 16,
              cursor: 'pointer',
            }}
          >
            Back
          </button>
          <button
            onClick={async () => {
              useBookingStore.getState().setBookingPreferences(bookingPreferences);
              await goToStep(6);
            }}
            disabled={!bookingPreferences.preferredDate}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: '1.5px solid #1E3D8F',
              background: '#1E3D8F',
              color: '#fff',
              fontWeight: 500,
              fontSize: 16,
              cursor: 'pointer',
              opacity: !bookingPreferences.preferredDate ? 0.5 : 1,
            }}
          >
            Next
          </button>
        </div>
        <style>{`
          .custom-blue-datepicker .react-datepicker__header {
            background-color: #e3eefd;
            border-bottom: 1.5px solid #1E3D8F;
          }
          .custom-blue-datepicker .react-datepicker__current-month,
          .custom-blue-datepicker .react-datepicker__day-name {
            color: #1E3D8F;
            font-weight: 600;
          }
          .custom-blue-datepicker .react-datepicker__day--selected,
          .custom-blue-datepicker .react-datepicker__day--keyboard-selected {
            background-color: #1E3D8F !important;
            color: #fff !important;
            border-radius: 50%;
          }
          .custom-blue-datepicker .react-datepicker__day:hover {
            background-color: #e3eefd;
            color: #1E3D8F;
            border-radius: 50%;
          }
          .custom-blue-datepicker .react-datepicker__day--today {
            border: 1.5px solid #1E3D8F;
            background: #fff;
            color: #1E3D8F;
            border-radius: 50%;
          }
          .custom-blue-datepicker .react-datepicker__navigation--previous,
          .custom-blue-datepicker .react-datepicker__navigation--next {
            top: 16px;
            line-height: 1.5;
          }
          .custom-blue-datepicker .react-datepicker__navigation-icon::before {
            border-color: #1E3D8F;
          }
        `}</style>
      </div>
    );
  }

  // Step 6: Time Selection (rewritten)
  if (step === 6) {
    // Map time to label and range
    const timeOptions = [
      { key: 'morning', label: 'Morning', range: '7 am - 10 am start' },
      { key: 'afternoon', label: 'Afternoon', range: '12 pm - 3 pm start' },
      { key: 'evening', label: 'Evening', range: '4 pm - 6 pm start' },
    ];
    return (
      <div >
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: '1.5rem', color: '#1E3D8F', textAlign: 'left' }}>
          And what time suits you best?
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {timeOptions.map((time) => (
            <button
              key={time.key}
                          onClick={async () => {
              const updated = { ...bookingPreferences, timePreference: time.key as 'morning' | 'afternoon' | 'evening' };
              setBookingPreferencesState(updated);
              useBookingStore.getState().setBookingPreferences(updated);
              await goToStep(7);
            }}
              style={{
                padding: '16px 24px',
                borderRadius: '8px',
                border: bookingPreferences.timePreference === time.key ? '2px solid #1E3D8F' : '1.5px solid #c3d0ee',
                background: bookingPreferences.timePreference === time.key ? '#f3f7ff' : '#fff',
                color: '#1E3D8F',
                fontWeight: 500,
                fontSize: 16,
                cursor: 'pointer',
                textTransform: 'capitalize',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <span>{time.label}</span>
              <span style={{ fontSize: 13, color: '#888', fontWeight: 400, marginTop: 2 }}>{time.range}</span>
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-start' }}>
          <button
            onClick={() => goToStep(5)}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: '1.5px solid #c3d0ee',
              background: '#fff',
              color: '#1E3D8F',
              fontWeight: 500,
              fontSize: 16,
              cursor: 'pointer',
            }}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  // Step 7: Phone Number
  if (step === 7) {
    return (
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 0' }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: '1.5rem', color: '#1E3D8F', textAlign: 'left' }}>
          Great! Just a few more details to finalise your booking.
        </h2>
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#1E3D8F', fontWeight: 500 }}>
            What&apos;s your best contact number?
          </label>
          <input
            type="tel"
            value={contactInfo.phone || ''}
            onChange={(e) => handleContactInfoChange('phone', e.target.value)}
            placeholder="Enter your phone number"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1.5px solid #c3d0ee',
              fontSize: '16px',
              color: '#1E3D8F',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
          <button
            onClick={() => goToStep(6)}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: '1.5px solid #c3d0ee',
              background: '#fff',
              color: '#1E3D8F',
              fontWeight: 500,
              fontSize: 16,
              cursor: 'pointer',
            }}
          >
            Back
          </button>
          <button
            onClick={async () => {
              setContactInfo({
                ...useBookingStore.getState().contactInfo,
                ...contactInfo,
              });
              await goToStep(8);
            }}
            disabled={!contactInfo.phone}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: '1.5px solid #1E3D8F',
              background: '#1E3D8F',
              color: '#fff',
              fontWeight: 500,
              fontSize: 16,
              cursor: 'pointer',
              opacity: !contactInfo.phone ? 0.5 : 1,
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  // Step 8: Full Name
  if (step === 8) {
    return (
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 0' }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: '1.5rem', color: '#1E3D8F', textAlign: 'left' }}>
        What should we call you?
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#1E3D8F', fontWeight: 500 }}>
              First Name
            </label>
            <input
              type="text"
              value={contactInfo.firstName || ''}
              onChange={(e) => handleContactInfoChange('firstName', e.target.value)}
              placeholder="Enter your first name"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1.5px solid #c3d0ee',
                fontSize: '16px',
                color: '#1E3D8F',
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#1E3D8F', fontWeight: 500 }}>
              Last Name
            </label>
            <input
              type="text"
              value={contactInfo.lastName || ''}
              onChange={(e) => handleContactInfoChange('lastName', e.target.value)}
              placeholder="Enter your last name"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1.5px solid #c3d0ee',
                fontSize: '16px',
                color: '#1E3D8F',
              }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
          <button
            onClick={() => goToStep(7)}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: '1.5px solid #c3d0ee',
              background: '#fff',
              color: '#1E3D8F',
              fontWeight: 500,
              fontSize: 16,
              cursor: 'pointer',
            }}
          >
            Back
          </button>
          <button
            onClick={async () => {
              setContactInfo({
                ...useBookingStore.getState().contactInfo,
                ...contactInfo,
              });
              await goToStep(9);
            }}
            disabled={!contactInfo.firstName || !contactInfo.lastName}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: '1.5px solid #1E3D8F',
              background: '#1E3D8F',
              color: '#fff',
              fontWeight: 500,
              fontSize: 16,
              cursor: 'pointer',
              opacity: (!contactInfo.firstName || !contactInfo.lastName) ? 0.5 : 1,
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  // Step 9: Email
  if (step === 9) {
    return (
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 0' }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: '1.5rem', color: '#1E3D8F', textAlign: 'left' }}>
          Lastly, what&apos;s your email?
        </h2>
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#1E3D8F', fontWeight: 500 }}>
            (We&apos;ll send your booking confirmation and details here.)
          </label>
          <input
            type="email"
            value={contactInfo.email || ''}
            onChange={(e) => handleContactInfoChange('email', e.target.value)}
            placeholder="Enter your email address"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1.5px solid #c3d0ee',
              fontSize: '16px',
              color: '#1E3D8F',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
          <button
            onClick={() => goToStep(8)}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: '1.5px solid #c3d0ee',
              background: '#fff',
              color: '#1E3D8F',
              fontWeight: 500,
              fontSize: 16,
              cursor: 'pointer',
            }}
          >
            Back
          </button>
          <button
            onClick={async () => {
              try {
                // First update the contact info in the store
                setContactInfo({
                  ...useBookingStore.getState().contactInfo,
                  ...contactInfo,
                });
                
                // Then send the booking to backend
                const response = await useBookingStore.getState().sendBookingToBackend();
                setBookingResponse(response);
                
                // Finally move to next step
                goToStep(10);
              } catch (error: unknown) {
                // Try to extract backend error message
                let errorMsg = 'Failed to submit booking. Please try again.';
                if (error && typeof error === 'object' && 'response' in error) {
                  const response = (error as { response: { json: () => Promise<{ error?: string }> } }).response;
                  const data = await response.json();
                  if (data?.error) errorMsg += `\n${data.error}`;
                } else if (error instanceof Error) {
                  errorMsg += `\n${error.message}`;
                }
                alert(errorMsg);
                console.error('Failed to submit booking:', error);
              }
            }}
            disabled={!contactInfo.email}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: '1.5px solid #1E3D8F',
              background: '#1E3D8F',
              color: '#fff',
              fontWeight: 500,
              fontSize: 16,
              cursor: 'pointer',
              opacity: !contactInfo.email ? 0.5 : 1,
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  // Step 10: Confirmation (show booking summary)
  if (step === 10) {
    // Extract details from store
    const customerName = bookingStoreState.contactInfo ? `${bookingStoreState.contactInfo.firstName} ${bookingStoreState.contactInfo.lastName}` : 
                        (customer ? `${customer.first_name} ${customer.last_name || ''}`.trim() : '-');
    
    // Get address from store or customer data
    let address = '-';
    if (bookingStoreState.address) {
      address = [
        bookingStoreState.address.street,
        bookingStoreState.address.suburb,
        bookingStoreState.address.state,
        bookingStoreState.address.postcode
      ].filter(Boolean).join(', ');
    } else if (customer && customer.street) {
      address = [
        customer.street,
        customer.suburb,
        customer.state,
        customer.postcode
      ].filter(Boolean).join(', ');
    }
    
    const serviceType = bookingStoreState.serviceType || '-';
    const totalHours = bookingStoreState.totalHours ?? '-';
    const totalAmount = bookingStoreState.totalPrice !== null && bookingStoreState.totalPrice !== undefined ? `$${bookingStoreState.totalPrice}` : '-';
    const date = bookingStoreState.bookingPreferences?.preferredDate ? new Date(bookingStoreState.bookingPreferences.preferredDate).toLocaleDateString() : '-';
    const timePref = bookingStoreState.bookingPreferences?.timePreference ? bookingStoreState.bookingPreferences.timePreference.charAt(0).toUpperCase() + bookingStoreState.bookingPreferences.timePreference.slice(1) : '-';
    const bookingNum = bookingResponse?.bookingNumber || bookingResponse?.booking_number || '...';

    return (
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
          <div style={{
            background: '#e6f7ec',
            borderRadius: '50%',
            width: 72,
            height: 72,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
            boxShadow: '0 2px 12px rgba(30,61,143,0.08)'
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2l4-4"/></svg>
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#27ae60', marginBottom: 8, textAlign: 'center' }}>
            Booking Confirmed!
          </h2>
          <div style={{ color: '#1E3D8F', fontWeight: 500, fontSize: 18, marginBottom: 8, textAlign: 'center' }}>
            Thank you for your booking.
          </div>
          <div style={{ color: '#888', fontSize: 15, marginBottom: 8, textAlign: 'center' }}>
            We&apos;ve received your request and will be in touch soon.
          </div>
        </div>
        <div style={{
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 4px 24px rgba(30,61,143,0.10)',
          padding: 28,
          marginBottom: 24,
          border: '1.5px solid #e3eafc',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <div style={{ fontWeight: 600, color: '#1E3D8F', fontSize: 18 }}>Booking Number:</div>
            <div style={{ fontWeight: 700, color: '#27ae60', fontSize: 20, letterSpacing: 1 }}>{bookingNum}</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <div style={{ fontWeight: 600, color: '#1E3D8F', fontSize: 18 }}>Status:</div>
            <div style={{ fontWeight: 700, color: '#FFA500', fontSize: 18 }}>Pending</div>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid #e3eafc', margin: '18px 0' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: 14, columnGap: 18 }}>
            <div style={{ color: '#888', fontWeight: 500 }}>Customer Name:</div>
            <div style={{ fontWeight: 600, color: '#222' }}>{customerName}</div>
            <div style={{ color: '#888', fontWeight: 500 }}>Address:</div>
            <div style={{ fontWeight: 600, color: '#222' }}>{address}</div>
            <div style={{ color: '#888', fontWeight: 500 }}>Service Type:</div>
            <div style={{ fontWeight: 600, color: '#222' }}>{serviceType}</div>
            <div style={{ color: '#888', fontWeight: 500 }}>Total Hours:</div>
            <div style={{ fontWeight: 600, color: '#222' }}>{totalHours}</div>
            <div style={{ color: '#888', fontWeight: 500 }}>Total Amount:</div>
            <div style={{ fontWeight: 600, color: '#222' }}>{totalAmount}</div>
            <div style={{ color: '#888', fontWeight: 500 }}>Date:</div>
            <div style={{ fontWeight: 600, color: '#222' }}>{date}</div>
            <div style={{ color: '#888', fontWeight: 500 }}>Time Preference:</div>
            <div style={{ fontWeight: 600, color: '#222' }}>{timePref}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button
            onClick={() => window.location.href = '/'}
            style={{
              padding: '12px 28px',
              borderRadius: 8,
              border: '1.5px solid #27ae60',
              background: '#27ae60',
              color: '#fff',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(39,174,96,0.08)'
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Step 1: Choose category
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 1rem', width: '100%' }}>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: '1.5rem', color: '#1E3D8F', textAlign: 'center' }}>
        Welcome! Let&apos;s start with a quick introduction.
      </h2>
      <div style={{ display:'flex', flexDirection:'column', gap: '1rem' }}>
        {categories.map((cat) => (
          <button
            key={cat.key}
            style={{
              padding: '14px 0',
              borderRadius: 32,
              border: bookingCategory === cat.key ? '2px solid #1E3D8F' : '1.5px solid #c3d0ee',
              background: bookingCategory === cat.key ? '#1E3D8F' : '#fff',
              color: bookingCategory === cat.key ? '#fff' : '#1E3D8F',
              fontWeight: 500,
              fontSize: 17,
              cursor: 'pointer',
              transition: 'all 0.18s',
              outline: 'none',
            }}
            onClick={async () => {
              if (cat.key === 'business') {
                setBookingCategory(cat.key as BookingCategory);
                setShowCommercialDialog(true);
              } else {
                setBookingCategory(cat.key as BookingCategory);
                await goToStep(2);
              }
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Commercial Dialog */}
      <CommercialDialog
        isOpen={showCommercialDialog}
        onClose={() => setShowCommercialDialog(false)}
        onRequestCallback={handleRequestCallback}
        onCallNow={handleCallNow}
      />
    </div>
  );
};

export default BookingForm; 