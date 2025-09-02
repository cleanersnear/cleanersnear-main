'use client'

import { Users, Star, Clock, Shield } from 'lucide-react'

export default function QuickStats() {
  const stats = [
    {
      icon: Users,
      value: '5000+',
      label: 'Happy Hosts'
    },
    {
      icon: Star,
      value: '4.9/5',
      label: 'Average Rating'
    },
    {
      icon: Clock,
      value: 'Same Day',
      label: 'Service Available'
    },
    {
      icon: Shield,
      value: '100%',
      label: 'Satisfaction Guarantee'
    }
  ]

  return (
    <section className="bg-[#1E3D8F] py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="flex justify-center mb-3">
                <stat.icon className="w-8 h-8 text-[#FFA500]" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-white/80 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


