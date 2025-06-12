'use client';
import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
import { PRICING } from './pricing';
import { useBookingStore } from '../booking-store/bookingStore';
import { BookingCategory, BookingType, FrequencyType, ServiceType } from '../types';
import { ServicePricing } from './pricing';
import styles from './styles.module.css';

const HomeCleaningPricesPage = () => {
  const router = useRouter();
  const setBookingType = useBookingStore((s) => s.setBookingType);
  const setFrequency = useBookingStore((s) => s.setFrequency);
  const setServiceType = useBookingStore((s) => s.setServiceType);
  const setBookingCategory = useBookingStore((s) => s.setBookingCategory);
  const setCurrentStep = useBookingStore((s) => s.setCurrentStep);
  
  const [activeTab, setActiveTab] = useState<'individual' | 'business'>('individual');
  const [activeFrequency, setActiveFrequency] = useState<'once-off' | 'regular'>('once-off');
  const [activeRegularFrequency, setActiveRegularFrequency] = useState<'weekly' | 'fortnightly'>('weekly');

  // Get pricing data based on current selections
  const getCurrentPricing = () => {
    if (activeTab === 'individual') {
      if (activeFrequency === 'once-off') {
        return PRICING.find(p => p.category === 'individual' && p.bookingType === 'once-off')?.services || [];
      } else {
        // For regular, return both weekly and fortnightly
        const weekly = PRICING.find(p => p.category === 'individual' && p.bookingType === 'regular' && p.frequency === 'weekly')?.services || [];
        const fortnightly = PRICING.find(p => p.category === 'individual' && p.bookingType === 'regular' && p.frequency === 'fortnightly')?.services || [];
        return { weekly, fortnightly };
      }
    } else {
      return PRICING.find(p => p.category === 'business' && p.bookingType === activeFrequency)?.services || [];
    }
  };

  const getServiceDescription = (serviceType: string) => {
    const descriptions: Record<string, string> = {
      'General Cleaning': 'Comprehensive home cleaning including all rooms, kitchen, bathrooms, and living areas',
      'NDIS Cleaning': 'Specialized cleaning services for NDIS participants with tailored care and attention',
      'Move-In Cleaning': 'Deep clean for your new home to ensure it\'s spotless before you move in',
      'Move-Out Cleaning': 'Thorough cleaning to help you get your bond back and leave the property pristine',
      'Inspection Cleaning': 'Detailed cleaning focused on areas that matter most for property inspections',
      'Deep/Spring Cleaning': 'Intensive cleaning that covers every corner, perfect for seasonal refresh',
      'AirBNB Cleaning': 'Professional cleaning between guests to maintain 5-star property standards'
    };
    return descriptions[serviceType] || 'Professional cleaning service tailored to your needs';
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  // Handle booking button clicks - set store values and redirect
  const handleBookService = (serviceType: string, bookingType: BookingType, frequency?: FrequencyType) => {
    // Always set to individual for pricing page bookings
    setBookingCategory('individual' as BookingCategory);
    
    // Set the service type
    setServiceType(serviceType as ServiceType);
    
    // Set booking type
    setBookingType(bookingType);
    
    // Set frequency based on booking type and selected frequency
    if (bookingType === 'once-off') {
      setFrequency('once' as FrequencyType);
    } else if (frequency === 'weekly') {
      setFrequency('weekly' as FrequencyType);
    } else if (frequency === 'fortnightly') {
      setFrequency('fortnightly' as FrequencyType);
    }
    
    // Skip steps 1 (Intro) and 2 (Service Type) since service is pre-selected
    // Go directly to step 3 (Extra Hours)
    setCurrentStep(3);
    
    router.push('/book');
  };

  const renderIndividualPricing = () => {
    const pricing = getCurrentPricing();
    
    if (activeFrequency === 'once-off' && Array.isArray(pricing)) {
      return (
        <div className={styles.servicesGrid}>
          {pricing.map((service) => (
            <div key={service.serviceType} className={styles.serviceCard}>
              <div className={styles.serviceHeader}>
                <h3 className={styles.serviceName}>{service.serviceType}</h3>
                <div className={styles.popularBadge}>Most Popular</div>
              </div>
              <p className={styles.serviceDescription}>
                {getServiceDescription(service.serviceType)}
              </p>
              <div className={styles.pricingDetails}>
                <div className={styles.mainPrice}>
                  <span className={styles.priceAmount}>{formatPrice(service.minimumPrice)}</span>
                  <span className={styles.priceLabel}>for {service.minimumHours} hours</span>
                </div>
                <div className={styles.hourlyRate}>
                  <span>{formatPrice(service.hourlyRate)}/hour after</span>
                </div>
              </div>
              <div className={styles.features}>
                <div className={styles.feature}>✓ Minimum {service.minimumHours} hours</div>
                <div className={styles.feature}>✓ All cleaning supplies included</div>
                <div className={styles.feature}>✓ Insured cleaners</div>
                <div className={styles.feature}>✓ 100% satisfaction guarantee</div>
              </div>
                             <button 
                 onClick={() => handleBookService(service.serviceType, 'once-off')}
                 className={styles.bookServiceButton}
               >
                 Book This Service
               </button>
            </div>
          ))}
        </div>
      );
    } else if (activeFrequency === 'regular' && typeof pricing === 'object' && 'weekly' in pricing) {
      return (
        <div className={styles.frequencyTabs}>
                     <div className={styles.frequencyOptions}>
             <button 
               className={`${styles.frequencyTab} ${activeRegularFrequency === 'weekly' ? styles.active : ''}`}
               onClick={() => setActiveRegularFrequency('weekly')}
             >
               Weekly
             </button>
             <button 
               className={`${styles.frequencyTab} ${activeRegularFrequency === 'fortnightly' ? styles.active : ''}`}
               onClick={() => setActiveRegularFrequency('fortnightly')}
             >
               Fortnightly
             </button>
           </div>
          
          <div className={styles.frequencyContent}>
            <div className={styles.savingsBanner}>
              <span className={styles.savingsIcon}>💰</span>
              <span>Save up to 20% with regular cleaning!</span>
            </div>
            
                         <div className={styles.frequencyGrid}>
               {activeRegularFrequency === 'weekly' ? (
                 <div className={styles.frequencySection}>
                   <h4 className={styles.frequencyTitle}>Weekly Cleaning</h4>
                   <div className={styles.servicesGrid}>
                     {pricing.weekly.map((service) => (
                       <div key={`weekly-${service.serviceType}`} className={styles.serviceCard}>
                         <h5 className={styles.serviceName}>{service.serviceType}</h5>
                         <p className={styles.serviceDescription}>
                           {getServiceDescription(service.serviceType)}
                         </p>
                         <div className={styles.pricingDetails}>
                           <div className={styles.mainPrice}>
                             <span className={styles.priceAmount}>{formatPrice(service.minimumPrice)}</span>
                             <span className={styles.priceLabel}>per week (2 hrs min)</span>
                           </div>
                           <div className={styles.hourlyRate}>
                             <span>{formatPrice(service.hourlyRate)}/hour</span>
                           </div>
                         </div>
                         <div className={styles.features}>
                           <div className={styles.feature}>✓ Minimum 2 hours per visit</div>
                           <div className={styles.feature}>✓ Same cleaner every week</div>
                           <div className={styles.feature}>✓ All supplies included</div>
                           <div className={styles.feature}>✓ Save 20% vs one-time cleaning</div>
                         </div>
                         <button 
                           onClick={() => handleBookService(service.serviceType, 'regular', 'weekly')}
                           className={styles.bookServiceButton}
                         >
                           Book Weekly Service
                         </button>
                       </div>
                     ))}
                   </div>
                 </div>
               ) : (
                 <div className={styles.frequencySection}>
                   <h4 className={styles.frequencyTitle}>Fortnightly Cleaning</h4>
                   <div className={styles.servicesGrid}>
                     {pricing.fortnightly.map((service) => (
                       <div key={`fortnightly-${service.serviceType}`} className={styles.serviceCard}>
                         <h5 className={styles.serviceName}>{service.serviceType}</h5>
                         <p className={styles.serviceDescription}>
                           {getServiceDescription(service.serviceType)}
                         </p>
                         <div className={styles.pricingDetails}>
                           <div className={styles.mainPrice}>
                             <span className={styles.priceAmount}>{formatPrice(service.minimumPrice)}</span>
                             <span className={styles.priceLabel}>every 2 weeks (2 hrs min)</span>
                           </div>
                           <div className={styles.hourlyRate}>
                             <span>{formatPrice(service.hourlyRate)}/hour</span>
                           </div>
                         </div>
                         <div className={styles.features}>
                           <div className={styles.feature}>✓ Minimum 2 hours per visit</div>
                           <div className={styles.feature}>✓ Consistent quality service</div>
                           <div className={styles.feature}>✓ All supplies included</div>
                           <div className={styles.feature}>✓ Flexible scheduling</div>
                         </div>
                         <button 
                           onClick={() => handleBookService(service.serviceType, 'regular', 'fortnightly')}
                           className={styles.bookServiceButton}
                         >
                           Book Fortnightly Service
                         </button>
                       </div>
                     ))}
                   </div>
                 </div>
               )}
             </div>
          </div>
        </div>
      );
    }
  };

  const renderBusinessPricing = () => {
    const pricing = getCurrentPricing() as ServicePricing[];
    
    return (
      <div className={styles.businessSection}>
        <div className={styles.businessBanner}>
          <h3>Commercial Cleaning Solutions</h3>
          <p>Professional cleaning services tailored for your business needs</p>
        </div>
        
        <div className={styles.servicesGrid}>
          {pricing.map((service) => (
            <div key={service.serviceType} className={styles.serviceCard}>
              <div className={styles.serviceHeader}>
                <h3 className={styles.serviceName}>{service.serviceType}</h3>
                <div className={styles.commercialBadge}>Commercial</div>
              </div>
              <div className={styles.pricingDetails}>
                <div className={styles.mainPrice}>
                  <span className={styles.priceAmount}>{formatPrice(service.minimumPrice)}</span>
                  <span className={styles.priceLabel}>
                    starting price ({service.minimumHours} hrs min)
                  </span>
                </div>
                <div className={styles.hourlyRate}>
                  <span>{formatPrice(service.hourlyRate)}/hour</span>
                </div>
              </div>
              <div className={styles.features}>
                <div className={styles.feature}>✓ Flexible scheduling</div>
                <div className={styles.feature}>✓ Commercial grade equipment</div>
                <div className={styles.feature}>✓ Fully insured team</div>
                <div className={styles.feature}>✓ Custom cleaning plans</div>
              </div>
              <div className={styles.businessActions}>
                                 <button 
                   onClick={() => handleBookService(service.serviceType, activeFrequency)}
                   className={styles.bookServiceButton}
                 >
                   Get Quote
                 </button>
                <button className={styles.contactButton}>
                  Call for Custom Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Transparent Cleaning Prices</h1>
        <p className={styles.subtitle}>
          No hidden fees, no surprises. Choose the perfect cleaning service for your needs.
        </p>
      </div>

      {/* Main Category Tabs */}
      <div className={styles.categoryTabs}>
        <button 
          className={`${styles.categoryTab} ${activeTab === 'individual' ? styles.active : ''}`}
          onClick={() => setActiveTab('individual')}
        >
          <span className={styles.tabIcon}>🏠</span>
          <span>Home Cleaning</span>
          <span className={styles.tabBadge}>Popular</span>
        </button>
        <button 
          className={`${styles.categoryTab} ${activeTab === 'business' ? styles.active : ''}`}
          onClick={() => setActiveTab('business')}
        >
          <span className={styles.tabIcon}>🏢</span>
          <span>Commercial</span>
        </button>
      </div>

      {/* Frequency Tabs for Individual */}
      {activeTab === 'individual' && (
        <div className={styles.frequencyTabs}>
          <button 
            className={`${styles.frequencyTab} ${activeFrequency === 'once-off' ? styles.active : ''}`}
            onClick={() => setActiveFrequency('once-off')}
          >
            <span>One-Time Clean</span>
          </button>
          <button 
            className={`${styles.frequencyTab} ${activeFrequency === 'regular' ? styles.active : ''}`}
            onClick={() => setActiveFrequency('regular')}
          >
            <span>Regular Service</span>
            <span className={styles.savingsBadge}>Save 20%</span>
          </button>
        </div>
      )}

      {/* Content */}
      <div className={styles.content}>
        {activeTab === 'individual' ? renderIndividualPricing() : renderBusinessPricing()}
      </div>

      {/* Trust Signals */}
      <div className={styles.trustSignals}>
        <div className={styles.trustItem}>
          <span className={styles.trustIcon}>🛡️</span>
          <span>Fully Insured</span>
        </div>
        <div className={styles.trustItem}>
          <span className={styles.trustIcon}>⭐</span>
          <span>5-Star Rated</span>
        </div>
        <div className={styles.trustItem}>
          <span className={styles.trustIcon}>✅</span>
          <span>Satisfaction Guaranteed</span>
        </div>
        <div className={styles.trustItem}>
          <span className={styles.trustIcon}>🕐</span>
          <span>Flexible Scheduling</span>
        </div>
      </div>

      {/* Final CTA */}
      <div className={styles.finalCTA}>
        <h2>Ready to Book Your Cleaning Service?</h2>
        <p>Get started in just 2 minutes with our simple booking process</p>
                 <button 
           onClick={() => {
             // For general CTA button, set defaults for individual one-time cleaning
             setBookingCategory('individual');
             setBookingType('once-off');
             setFrequency('once');
             router.push('/book');
           }}
           className={styles.mainCTAButton}
         >
           Book Your Cleaning Service
         </button>
        <p className={styles.guaranteeText}>
          100% satisfaction guaranteed or we&apos;ll come back for free
        </p>
      </div>
    </div>
  );
};

export default HomeCleaningPricesPage; 