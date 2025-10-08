// Commercial Cleaning Service Configuration
// This file contains configuration constants for Commercial Cleaning service

export const COMMERCIAL_CLEANING_CONFIG = {
  PRICING: {
    HOURLY_RATE: 65,
    MINIMUM_HOURS: 2,
    MAX_HOURS: 8,
    OFFICE_RATE: 35, // per office
    MEETING_ROOM_RATE: 25, // per meeting room
    RECEPTION_RATE: 30,
    KITCHEN_RATE: 40,
    BATHROOM_RATE: 35,
    STORAGE_RATE: 20,
    STAIRS_RATE: 15,
    WINDOWS_RATE: 5, // per window
  },
  
  ROOM_OPTIONS: [
    { key: 'offices', label: 'Offices', rate: 35 },
    { key: 'meetingRooms', label: 'Meeting Rooms', rate: 25 },
    { key: 'reception', label: 'Reception', rate: 30 },
    { key: 'kitchen', label: 'Kitchen', rate: 40 },
    { key: 'bathrooms', label: 'Bathrooms', rate: 35 },
    { key: 'storage', label: 'Storage', rate: 20 },
    { key: 'stairs', label: 'Stairs', rate: 15 },
    { key: 'windows', label: 'Windows', rate: 5 },
  ],
  
  FREQUENCY_OPTIONS: [
    { value: 'Weekly' as const, label: 'Weekly' },
    { value: 'Fortnightly' as const, label: 'Fortnightly' },
    { value: 'Monthly' as const, label: 'Monthly' },
    { value: 'Once-off' as const, label: 'Once-off' },
  ],
  
  PREFERRED_TIMES: [
    { value: 'During Hours' as const, label: 'During Hours' },
    { value: 'After Hours' as const, label: 'After Hours' },
    { value: 'Before Hours' as const, label: 'Before Hours' },
  ],
} as const;
