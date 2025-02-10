import { MELBOURNE_REGIONS } from './regions'

interface RegionInfo {
  region: string;
  council: string;
}

interface LocationContent {
  description: string;
  // Add more fields as needed
}

export function getRegionForSuburb(suburb: string): RegionInfo | null {
  const normalizedSuburb = suburb.toLowerCase();

  for (const region of Object.values(MELBOURNE_REGIONS)) {
    for (const council of region.councils) {
      if (council.key_suburbs.some(s => s.toLowerCase() === normalizedSuburb)) {
        return {
          region: region.name,
          council: council.name
        };
      }
    }
  }
  return null;
}

export function getLocationContent(suburb: string): LocationContent | null {
  const normalizedSuburb = suburb.charAt(0).toUpperCase() + suburb.slice(1).toLowerCase();
  
  // This is a placeholder. You can expand this to include more detailed content
  return {
    description: `Professional cleaning services in ${normalizedSuburb}. We provide comprehensive cleaning solutions including end of lease cleaning, carpet cleaning, and regular house cleaning services to residents and businesses in ${normalizedSuburb} and surrounding areas.`
  };
}

export function getAllSuburbs(): string[] {
  return Object.values(MELBOURNE_REGIONS).flatMap(region =>
    region.councils.flatMap(council => council.key_suburbs)
  );
}

export function getDefaultLocation() {
  return {
    city: "Melbourne",
    region: "VIC",
    mainSuburbs: ["Richmond", "South Yarra", "Toorak"]
  };
} 