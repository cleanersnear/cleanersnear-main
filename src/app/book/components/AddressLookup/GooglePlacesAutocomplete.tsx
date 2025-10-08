"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import { MELBOURNE_REGIONS } from '../../data/regions';
import { Phone } from 'lucide-react';

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
  const [isServiceArea, setIsServiceArea] = useState<boolean | null>(null);
  const [councilInfo, setCouncilInfo] = useState<string>("");
  const supportPhone = process.env.NEXT_PUBLIC_PHONE || '';

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

      // Check if postcode/suburb is in our service area (from our dataset)
      const isInServiceArea = checkServiceArea(postcode, suburb);
      
      setInputValue(place.formatted_address);
      setIsServiceArea(isInServiceArea);
      
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

        // Create new script
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          isGoogleMapsLoaded = true;
          googleMapsLoadingPromise = null;
          resolve();
        };
        script.onerror = () => {
          googleMapsLoadingPromise = null;
          reject(new Error('Failed to load Google Maps API'));
        };
        document.head.appendChild(script);
      });

      try {
        await googleMapsLoadingPromise;
        initializeAutocomplete();
      } catch (error) {
        console.error('Failed to load Google Maps API:', error);
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

  const checkServiceArea = (postcode: string, suburb: string): boolean => {
    if (!postcode || !suburb) {
      setCouncilInfo('Unable to detect suburb/postcode from address');
      return false;
    }

    const suburbLower = suburb.toLowerCase();

    // Find any council where the suburb exists AND the postcode matches that council's postcodes
    for (const region of Object.values(MELBOURNE_REGIONS)) {
      for (const council of region.councils) {
        const suburbMatch = council.key_suburbs.some(s => s.toLowerCase() === suburbLower);
        if (!suburbMatch) continue;
        if (council.postcodes.includes(postcode)) {
          setCouncilInfo('Perfect! We Service Your Area');
          return true;
        }
      }
    }

    // If suburb exists anywhere but postcode doesn't match known postcodes for that suburb, mark as outside
    setCouncilInfo('Address outside service area');
    return false;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // DON'T call onChange while typing - only when place is selected
    // This prevents saving incomplete addresses
    
    // Reset service area status when user types
    if (newValue !== value) {
      setIsServiceArea(null);
      setCouncilInfo("");
    }
  };


  return (
    <div className="w-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1E3D8F] focus:border-[#1E3D8F] ${
            isServiceArea === true 
              ? 'border-green-500 bg-green-50' 
              : isServiceArea === false 
              ? 'border-red-500 bg-red-50' 
              : 'border-gray-300'
          } ${className}`}
        />
        
        {/* Service Area Status */}
        {councilInfo && (
          <div className={`mt-2 text-sm ${
            isServiceArea === true 
              ? 'text-green-600' 
              : isServiceArea === false 
              ? 'text-red-600' 
              : 'text-gray-600'
          }`}>
            {councilInfo}
          </div>
        )}
        
        {/* Available suburb list removed per request */}

        {/* Service Area Info */}
        {isServiceArea === false && (
          <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              <p className="text-sm text-red-700">
                <strong>Service Not Available</strong><br />
                We currently don&apos;t provide cleaning services in this area. 
                Please contact us to discuss alternative arrangements.
              </p>
              {supportPhone && (
                <a
                  href={`tel:${supportPhone}`}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#1E3D8F] w-full md:w-auto px-5 md:px-4 py-3 md:py-2 text-white text-base md:text-sm font-medium hover:bg-[#1E3D8F]/90 mt-2 md:mt-0 self-stretch md:self-start"
                  aria-label="Call us"
                >
                  <Phone className="w-5 h-5 md:w-4 md:h-4" />
                  Call
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
