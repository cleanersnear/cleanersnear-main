'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Home, Phone, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  
  const [countdown, setCountdown] = useState(10)
  const router = useRouter()
  
  useEffect(() => {
    if (countdown === 0) {
      router.push('/')
    }
  }, [countdown, router])

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const popularServices = [
    {
      title: 'Regular Cleaning',
      href: '/services/regular-cleaning',
      icon: '🏠'
    },
    {
      title: 'Once-Off Cleaning',
      href: '/services/once-off-cleaning',
      icon: '🧹'
    },
    {
      title: 'NDIS Cleaning',
      href: '/services/ndis-cleaning',
      icon: '✨'
    },
    {
      title: 'Airbnb Cleaning',
      href: '/services/airbnb-cleaning',
      icon: '🔑'
    },
    {
      title: 'Commercial Cleaning',
      href: '/services/commercial-cleaning',
      icon: '🏢'
    },
    {
      title: 'End of Lease Cleaning',
      href: '/services/end-of-lease-cleaning',
      icon: '📋'
    }
  ]

  const quickLinks = [
    {
      title: 'Book Online',
      href: '/book',
      description: 'Get an instant quote and book your cleaning service'
    },
    {
      title: 'Contact Us',
      href: '/contact',
      description: 'Reach out to our friendly team'
    },
    {
      title: 'View All Services',
      href: '/services',
      description: 'Explore our complete range of cleaning services'
    },
    {
      title: 'Pricing',
      href: '/pricing',
      description: 'View transparent pricing for all our services'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Main Content */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <Image
              src="/images/logo.webp"
              alt="Cleaning Professionals Melbourne"
              width={200}
              height={60}
              className="mx-auto"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            The page you&apos;re looking for seems to have been moved or doesn&apos;t exist.
            Let us help you find what you need!
          </p>
          <p className="text-md text-[#1E3D8F] font-medium mb-8">
            Redirecting to homepage in {countdown} seconds...
          </p>
          
          {/* Home Button */}
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#1E3D8F] hover:bg-[#1E3D8F]/90 transition-colors duration-200"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Popular Services Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Popular Cleaning Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularServices.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:border-[#1E3D8F] border border-transparent"
              >
                <div className="text-3xl mb-2">{service.icon}</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-[#1E3D8F] transition-colors duration-200">
                  {service.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Quick Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:border-[#1E3D8F] border border-transparent"
              >
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#1E3D8F] transition-colors duration-200 flex items-center">
                  {link.title}
                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                </h3>
                <p className="text-gray-600 text-sm">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need Immediate Assistance?
          </h2>
          <p className="text-gray-600 mb-6">
            Our friendly team is here to help you 24/7
          </p>
          <Link
            href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE?.replace(/\s+/g, '') || '1300886119'}`}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#FFA500] hover:bg-[#FFA500]/90 transition-colors duration-200"
          >
            <Phone className="w-5 h-5 mr-2" />
            Call Us: {process.env.NEXT_PUBLIC_CONTACT_PHONE || '1300 886 119'}
          </Link>
        </div>
      </div>
    </div>
  )
} 