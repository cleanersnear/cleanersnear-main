'use client'

import { useState, useEffect } from 'react';
import { getUserLocation } from './geolocation';
import { LocationResult } from './geolocation';
const LOCATION_STORAGE_KEY = 'user_location_data';
const LOCATION_TIMESTAMP_KEY = 'location_last_updated';
const LOCATION_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export function useLocation() {
  const [locationState, setLocationState] = useState({
    loading: true,
    error: false,
    errorMessage: '',
    location: null as LocationResult | null
  });

  useEffect(() => {
    let isMounted = true;

    async function detectLocation() {
      try {
        // Only run on client side
        if (typeof window === 'undefined') return;

        const storedLocation = localStorage.getItem(LOCATION_STORAGE_KEY);
        const lastUpdated = localStorage.getItem(LOCATION_TIMESTAMP_KEY);
        
        if (storedLocation && lastUpdated) {
          const timestamp = parseInt(lastUpdated);
          if (Date.now() - timestamp < LOCATION_EXPIRY) {
            if (isMounted) {
              setLocationState({
                loading: false,
                error: false,
                errorMessage: '',
                location: JSON.parse(storedLocation)
              });

            }
            return;
          }
        }

        const result = await getUserLocation();
        
        if (result.found) {
          localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(result));
          localStorage.setItem(LOCATION_TIMESTAMP_KEY, Date.now().toString());
        }

        if (isMounted) {
          setLocationState({
            loading: false,
            error: false,
            errorMessage: '',
            location: result
          });
        }
      } catch (error) {
        if (isMounted) {
          setLocationState({
            loading: false,
            error: true,
            errorMessage: error instanceof Error 
              ? error.message 
              : 'Failed to detect location. Please try again.',
            location: null
          });
        }

      }
    }

    detectLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  return locationState;
} 