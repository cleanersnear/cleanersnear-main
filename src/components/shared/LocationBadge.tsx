'use client'

import { LocationBadgeProps } from '@/components/Home/HeroSection/types'

export function LocationBadge({ city, region, className = '' }: LocationBadgeProps) {
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full
      bg-[#1E3D8F] text-white shadow
      ${className}`}
    >
      <svg 
        className="w-4 h-4 text-white" 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path 
          fillRule="evenodd" 
          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" 
          clipRule="evenodd" 
        />
      </svg>
      <span className="text-sm uppercase tracking-wider">
        {city}, {region}
      </span>
    </div>
  )
} 