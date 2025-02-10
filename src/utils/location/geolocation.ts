interface Coordinates {
  latitude: number;
  longitude: number;
}

interface LocationMatch {
  suburb: string;
  distance: number;
  confidence: number;
  council: string;
  type: 'cbd' | 'inner' | 'middle' | 'outer';
}

export interface LocationResult {
  found: boolean;
  suburb?: string;
  council?: string;
  isServiceArea: boolean;
  nearestSuburb?: string;
  distance?: number;
  confidence?: number;
  alternatives?: LocationMatch[];
}

interface SuburbData extends Coordinates {
  council: string;
  isOuterSuburb: boolean;
  region: string;
  postcode: string;
  suburb: string;
  boundaries?: {
    north: number;
    south: number;
    east: number;
    west: number;
  }
}

// Add at the top with other constants
const MELBOURNE_CENTER: Coordinates = {
  latitude: -37.8136,   // Melbourne CBD coordinates
  longitude: 144.9631
};

// Define council types for different distance thresholds
const COUNCIL_TYPES = {
  OUTER: {
    councils: ['Wyndham', 'Melton', 'Hume', 'Whittlesea', 'Nillumbik', 'Casey', 'Mornington Peninsula'],
    threshold: 10, // Increased for outer suburbs
    minDistance: 0
  },
  INNER: {
    councils: ['Melbourne', 'Port Phillip', 'Yarra', 'Stonnington', 'Boroondara'],
    threshold: 3,
    minDistance: 0
  },
  MIDDLE: {
    councils: ['Moonee Valley', 'Moreland', 'Darebin', 'Banyule', 'Manningham', 'Whitehorse', 'Monash', 'Kingston'],
    threshold: 5,
    minDistance: 0
  }
};

// Import and transform regions data
import { MELBOURNE_REGIONS } from '@/utils/location/regions';

const SUBURB_COORDINATES: Record<string, SuburbData> = {};

// Transform regions data into coordinates
Object.values(MELBOURNE_REGIONS).forEach(region => {
  region.councils.forEach(council => {
    const councilType = Object.entries(COUNCIL_TYPES).find(([, data]) => 
      data.councils.includes(council.name)

    )?.[0] || 'MIDDLE';

    council.key_suburbs.forEach((suburb, index) => {
      SUBURB_COORDINATES[suburb] = {
        latitude: council.coordinates[index].lat,
        longitude: council.coordinates[index].lng,
        council: council.name,
        region: region.name,
        postcode: council.postcodes[index],
        isOuterSuburb: councilType === 'OUTER',
        suburb: suburb,
        
      };
    });
  });
});

// Update the calculateDistance function with better precision
function calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
  const R = 6371.0710; // Earth's radius in km (more precise)
  const dLat = toRad(coord2.latitude - coord1.latitude);
  const dLon = toRad(coord2.longitude - coord1.longitude);
  
  const lat1 = toRad(coord1.latitude);
  const lat2 = toRad(coord2.latitude);

  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1) * Math.cos(lat2) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round((R * c) * 1000) / 1000; // Round to 3 decimal places
}

function toRad(degrees: number): number {
  return degrees * (Math.PI/180);
}

// Add function to determine search radius based on council type
function getSearchRadius(council: string): number {
  if (COUNCIL_TYPES.OUTER.councils.includes(council)) return 8;
  if (COUNCIL_TYPES.INNER.councils.includes(council)) return 3;
  if (COUNCIL_TYPES.MIDDLE.councils.includes(council)) return 5;
  return 4; // default radius
}

// Add confidence calculation
export function calculateConfidence(distance: number, radius: number, council: string): number {
  // Base confidence on distance relative to radius
  let confidence = 1 - (distance / radius);
  

  // Adjust confidence based on council type
  if (COUNCIL_TYPES.OUTER.councils.includes(council)) {
    confidence *= 0.8; // Less confident in outer matches
  } else if (COUNCIL_TYPES.INNER.councils.includes(council)) {
    confidence *= 1.2; // More confident in inner matches
  }
  
  return Math.max(0, Math.min(1, confidence));
}

// Add this interface for weighted scoring
interface LocationScore {
  distance: number;
  boundaryMatch: boolean;
  councilMatch: boolean;
  regionMatch: boolean;
  isMainSuburb: boolean;
}

// Add main suburbs list for higher weighting
const MAIN_SUBURBS = [
  'Melbourne CBD',
  'Richmond',
  'South Yarra',
  'Brunswick',
  'Footscray',
  'Preston',
  'Box Hill',
  'Werribee',
  'Epping',
  // Add other major suburbs
];

// Enhanced confidence calculation
export function calculateLocationConfidence(
  coords: Coordinates, 
  suburbData: SuburbData, 
  distance: number

): number {
  const score: LocationScore = {
    distance: 0,
    boundaryMatch: false,
    councilMatch: false,
    regionMatch: false,
    isMainSuburb: false
  };

  // 1. Distance Score (0-40 points)
  const radius = getSearchRadius(suburbData.council);
  score.distance = Math.max(0, 40 * (1 - distance / radius));

  // 2. Boundary Match (20 points)
  if (suburbData.boundaries) {
    const withinBounds = 
      coords.latitude <= suburbData.boundaries.north &&
      coords.latitude >= suburbData.boundaries.south &&
      coords.longitude <= suburbData.boundaries.east &&
      coords.longitude >= suburbData.boundaries.west;
    
    if (withinBounds) {
      score.boundaryMatch = true;
      score.distance += 20;
    }
  }

  // 3. Council Area Match (15 points)
  const nearbyCouncils = findNearbyCouncils(coords);
  if (nearbyCouncils.includes(suburbData.council)) {
    score.councilMatch = true;
    score.distance += 15;
  }

  // 4. Major Suburb Bonus (15 points)
  if (MAIN_SUBURBS.includes(suburbData.suburb)) {
    score.isMainSuburb = true;
    score.distance += 15;
  }

  // 5. Region Context (10 points)
  if (isInRegionContext(coords, suburbData.region)) {
    score.regionMatch = true;
    score.distance += 10;
  }

  return Math.min(100, score.distance) / 100;
}

// Helper function to find nearby councils
function findNearbyCouncils(coords: Coordinates): string[] {
  const MAX_COUNCIL_DISTANCE = 5; // km
  const nearbyCouncils = new Set<string>();

  Object.values(SUBURB_COORDINATES).forEach(suburbData => {
    const distance = calculateDistance(coords, suburbData);
    if (distance <= MAX_COUNCIL_DISTANCE) {
      nearbyCouncils.add(suburbData.council);
    }
  });

  return Array.from(nearbyCouncils);
}

// Helper function to check region context
function isInRegionContext(coords: Coordinates, region: string): boolean {
  const regionSuburbs = Object.values(SUBURB_COORDINATES)
    .filter(data => data.region === region);
  
  // Check if coordinates are within the general region area
  const inRegionBounds = regionSuburbs.some(suburb => {
    const distance = calculateDistance(coords, suburb);
    return distance <= getSearchRadius(suburb.council) * 1.5;
  });

  return inRegionBounds;
}

// Update findNearestSuburb to use new confidence system
function findNearestSuburb(coords: Coordinates): LocationMatch {
  let bestMatch: LocationMatch | null = null;

  Object.entries(SUBURB_COORDINATES).forEach(([suburb, suburbData]) => {
    const distance = calculateDistance(coords, suburbData);
    const totalConfidence = calculateLocationConfidence(coords, suburbData, distance);

    const match: LocationMatch = {
      suburb,
      distance,
      confidence: totalConfidence,
      council: suburbData.council,
      type: COUNCIL_TYPES.OUTER.councils.includes(suburbData.council) ? 'outer' : 
            COUNCIL_TYPES.INNER.councils.includes(suburbData.council) ? 'inner' : 'middle'
    };

    if (!bestMatch || match.confidence > bestMatch.confidence) {
      bestMatch = match;
    }
  });

  if (!bestMatch) {
    throw new Error('No matching suburbs found');
  }

  return bestMatch;
}

// Update getUserLocation to use the new confidence system
export async function getUserLocation(): Promise<LocationResult> {
  try {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported');
      return { found: false, isServiceArea: false };
    }

    console.log('Requesting location permission...'); // Debug log

    // Request location with timeout
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Location permission granted', position); // Debug log
          resolve(position);
        },
        (error) => {
          console.log('Location permission error:', error); // Debug log
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    });

    const userCoords = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };

    // First get basic match
    const match = findNearestSuburb(userCoords);
    
    // Then get additional details
    const details = getSuburbDetails(match.suburb);

    const isOuterSuburb = COUNCIL_TYPES.OUTER.councils.includes(match.council);
    const isServiceArea = match.confidence > 0.6 && 
      match.distance <= (isOuterSuburb ? 10 : 5);

    return {
      found: true,
      suburb: match.suburb,
      council: match.council,
      isServiceArea,
      nearestSuburb: match.suburb,
      distance: match.distance,
      confidence: match.confidence,
      alternatives: details?.surroundingSuburbs
    };
  } catch (error) {
    console.log('Location access denied or error:', error);
    return { found: false, isServiceArea: false };
  }
}

// Helper function to check if a suburb is in our service areas
export function isInServiceArea(suburb: string): boolean {
  const suburbData = SUBURB_COORDINATES[suburb];
  if (!suburbData) return false;
  return calculateDistance(suburbData, MELBOURNE_CENTER) <= 30;
}

// Get default location if user location is not available
export function getDefaultLocation() {
  return {
    suburb: 'Melbourne CBD',
    coordinates: MELBOURNE_CENTER,
    isServiceArea: true
  };
}

interface SuburbDetails {
  region: string;
  surroundingSuburbs: LocationMatch[];
  postcode: string;
  isOuterSuburb: boolean;
}

function getSuburbDetails(suburb: string): SuburbDetails | null {
  const suburbData = SUBURB_COORDINATES[suburb];
  if (!suburbData) return null;

  // Find surrounding suburbs within 5km
  const surroundingSuburbs = Object.entries(SUBURB_COORDINATES)
    .filter(([otherSuburb, data]) => {
      if (otherSuburb === suburb) return false;
      const distance = calculateDistance(suburbData, data);
      return distance <= 5; // 5km radius
    })
    .map(([suburb, data]): LocationMatch => ({
      suburb,
      distance: calculateDistance(suburbData, data),
      council: data.council,
      confidence: 1,
      type: COUNCIL_TYPES.OUTER.councils.includes(data.council) ? 'outer' : 
            COUNCIL_TYPES.INNER.councils.includes(data.council) ? 'inner' : 'middle'
    }));

  return {
    region: suburbData.region,
    surroundingSuburbs,
    postcode: suburbData.postcode,
    isOuterSuburb: suburbData.isOuterSuburb
  };
} 