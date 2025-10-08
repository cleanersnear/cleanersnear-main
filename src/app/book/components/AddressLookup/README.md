# Address Lookup Components

This directory provides two final components for address and location lookup:

## Components

### 1) GooglePlacesAutocomplete (Full Address)
- **Purpose**: Use Google Places API to select a complete address
- **Behavior**:
  - Returns full address + parsed suburb + postcode
  - Cross-checks suburb against our `regions.ts` dataset
  - Caller decides what to do if outside service area
  - Recommended for Step 3 (Your Details) or hero address capture

### 2) LocationSearch (Suburb/Postcode only)
- **Purpose**: Lightweight, no Google API. Search suburb or postcode using our dataset
- **Behavior**:
  - Filters suburbs locally; select from dropdown
  - Saves `{ suburb, postcode, address }` to booking store
  - Pushes to `/book` on submit
  - Mobile-first UI: stacked on mobile, inline on desktop

## Setup Instructions

### 1. Google Maps API Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - Places API
   - Maps JavaScript API
4. Create credentials (API Key)
5. Restrict the API key to your domain for security

### 2. Environment Variables
Add to your `.env.local` file:
```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
NEXT_PUBLIC_GA_ID=G-W87SXGYKC1
```

### 3. Usage Examples

#### Basic Google Places Autocomplete
```tsx
import { GooglePlacesAutocomplete, LocationSearch } from '@/components/AddressLookup';

function MyComponent() {
  const handleAddressSelect = (address: string, postcode: string, suburb: string) => {
    console.log('Selected:', { address, postcode, suburb });
  };

  return (
    <GooglePlacesAutocomplete
      onAddressSelect={handleAddressSelect}
      placeholder="Enter your address..."
    />
  );
}
```

#### Suburb/Postcode Location Search (no Google)
```tsx
import { LocationSearch } from '@/components/AddressLookup';

export default function HeroCapture() {
  return <LocationSearch />;
}
```

## Service Area Data

The components use the `regions.ts` file which contains:
- Melbourne metropolitan regions
- Council areas and their postcodes
- Key suburbs for each council
- Geographic coordinates

## Testing

Visit `/address-test` to test both components with a demo interface.

## Features

### GooglePlacesAutocomplete
- ✅ Google Places API integration
- ✅ Service area validation
- ✅ Visual feedback (green/red borders)
- ✅ Council information display
- ✅ Error handling for non-service areas

### PostcodeValidator
- ✅ Postcode format validation (4 digits)
- ✅ Service area checking
- ✅ Available suburbs display
- ✅ Loading states
- ✅ Council information

## Styling

Both components use Tailwind CSS classes and can be customized via the `className` prop. The components include:
- Orange focus states (matching your brand)
- Green success states
- Red error states
- Responsive design

## Browser Support

- Modern browsers with ES6+ support
- Google Maps API compatibility
- Mobile responsive design
