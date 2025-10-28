"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
 

interface GooglePlacesAutocompleteProps {
  onAddressSelect: (address: string, postcode: string, suburb: string) => void;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

interface GoogleMapsPlace {
  formatted_address: string;
  address_components: Array<{
    long_name: string;
    types: string[];
  }>;
  geometry: {
    location: {
      lat: () => number;
      lng: () => number;
    };
  };
}

interface GoogleMapsAutocomplete {
  getPlace: () => GoogleMapsPlace;
  addListener: (event: string, callback: () => void) => void;
}

interface GoogleMapsPlaces {
  Autocomplete: new (input: HTMLInputElement, options: {
    types: string[];
    componentRestrictions: { country: string };
    fields: string[];
  }) => GoogleMapsAutocomplete;
}

interface GoogleMaps {
  maps: {
    places: GoogleMapsPlaces;
    event: {
      clearInstanceListeners: (instance: GoogleMapsAutocomplete) => void;
    };
  };
}

declare global {
  interface Window {
    google: GoogleMaps;
    initGooglePlaces: () => void;
  }
}

// Global flag to track if Google Maps API is already loaded
let isGoogleMapsLoaded = false;
let googleMapsLoadingPromise: Promise<void> | null = null;

export default function GooglePlacesAutocomplete({
  onAddressSelect,
  placeholder = "Enter your address",
  className = "",
  value = "",
  onChange
}: GooglePlacesAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<GoogleMapsAutocomplete | null>(null);
  const [inputValue, setInputValue] = useState(value);
  const [loadError, setLoadError] = useState<string>("");

  const initializeAutocomplete = useCallback(() => {
    if (!inputRef.current || !window.google) return;

    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ['address'],
      componentRestrictions: { country: 'au' }, // Restrict to Australia
      fields: ['formatted_address', 'address_components', 'geometry']
    });

    autocompleteRef.current = autocomplete;

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      
      if (!place.formatted_address) {
        return;
      }

      // Extract address components
      let postcode = '';
      let suburb = '';

      place.address_components.forEach((component) => {
        const types = component.types;
        
        if (types.includes('postal_code')) {
          postcode = component.long_name;
        }
        
        // Prefer locality. Fall back to sublocality levels if needed. Ignore admin areas
        if (types.includes('locality')) {
          suburb = component.long_name;
        }
        if (!suburb && (types.includes('sublocality') || types.includes('sublocality_level_1'))) {
          suburb = component.long_name;
        }
      });

      setInputValue(place.formatted_address);
      
      if (onChange) {
        onChange(place.formatted_address);
      }

      // Always return selection so caller can decide what to do (even if outside)
      onAddressSelect(place.formatted_address, postcode, suburb);
    });
  }, [onAddressSelect, onChange]);

  // Load Google Places API with singleton pattern
  useEffect(() => {
    const loadGooglePlaces = async () => {
      // If already loaded, initialize immediately
      if (isGoogleMapsLoaded && window.google && window.google.maps && window.google.maps.places) {
        initializeAutocomplete();
        return;
      }

      // If currently loading, wait for it
      if (googleMapsLoadingPromise) {
        await googleMapsLoadingPromise;
        initializeAutocomplete();
        return;
      }

      // Start loading
      googleMapsLoadingPromise = new Promise<void>((resolve, reject) => {
        // Check if script already exists
        const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
        if (existingScript) {
          // Script exists but might not be loaded yet, wait for it
          const checkLoaded = () => {
            if (window.google && window.google.maps && window.google.maps.places) {
              isGoogleMapsLoaded = true;
              googleMapsLoadingPromise = null;
              resolve();
            } else {
              setTimeout(checkLoaded, 100);
            }
          };
          checkLoaded();
          return;
        }

        // Check if API key is available
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        if (!apiKey) {
          console.error('Google Maps API key is not configured. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY');
          googleMapsLoadingPromise = null;
          reject(new Error('Google Maps API key not configured'));
          return;
        }

        // Create new script
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGooglePlaces`;
        script.async = true;
        script.defer = true;
        
        // Set up callback
        window.initGooglePlaces = () => {
          isGoogleMapsLoaded = true;
          googleMapsLoadingPromise = null;
          resolve();
        };
        
        script.onerror = (error) => {
          googleMapsLoadingPromise = null;
          console.error('Failed to load Google Maps API. Check your API key and domain restrictions:', error);
          reject(new Error('Failed to load Google Maps API - Check API key and domain restrictions'));
        };
        document.head.appendChild(script);
      });

      try {
        await googleMapsLoadingPromise;
        initializeAutocomplete();
        setLoadError("");
      } catch (error) {
        console.error('Failed to load Google Maps API:', error);
        setLoadError('Address autocomplete temporarily unavailable. Please type your full address manually.');
      }
    };

    loadGooglePlaces();

    // Cleanup function
    return () => {
      if (autocompleteRef.current) {
        // Clean up Google Maps listeners if they exist
        const google = window.google;
        if (google && google.maps && google.maps.event) {
          google.maps.event.clearInstanceListeners(autocompleteRef.current);
        }
        autocompleteRef.current = null;
      }
    };
  }, [initializeAutocomplete]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // DON'T call onChange while typing - only when place is selected
    // This prevents saving incomplete addresses
    
  };


  return (
    <div className="w-full">
      {loadError && (
        <div className="mb-2 p-2 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
          ⚠️ {loadError}
        </div>
      )}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={loadError ? "Type your full address" : placeholder}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1E3D8F] focus:border-[#1E3D8F] border-gray-300 ${className}`}
        />
      </div>
    </div>
  );
}
