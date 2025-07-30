"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';



// Add services submenu data
const serviceLinks = [
  { title: 'All Services', href: '/services' },
  { title: 'Carpet Cleaning', href: '/services/carpet-cleaning' },
  { title: 'End Of Lease Cleaning', href: '/services/end-of-lease-cleaning' },
  { title: 'General Cleaning', href: '/services/general-cleaning' },
  { title: 'Deep Cleaning', href: '/services/deep-cleaning' },
  { title: 'Move In Cleaning', href: '/services/move-in-cleaning' },
  { title: 'NDIS Cleaning', href: '/services/ndis-cleaning' },
  { title: 'Commercial Cleaning', href: '/services/commercial-cleaning' },
  { title: 'After Renovation Clean', href: '/services/after-renovation-cleaning' },
  { title: 'Oven Clean', href: '/services/oven-cleaning' },
  { title: 'Tile & Floor Clean', href: '/services/tile-and-floor-cleaning' },
  { title: 'Upholstery Clean', href: '/services/upholstery-cleaning' },
  { title: 'Window Clean', href: '/services/window-cleaning' }
];

const aboutLinks = [
  { title: 'About Us', href: '/about' },
  { title: 'Service Areas', href: '/locations' },
  { title: 'Reviews', href: '/reviews' }
];

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: '#ffffff',
      minHeight: '100vh',
      color: '#1c1e21',
    }}>
      {/* Header */}
      <header className="w-full fixed top-0 z-50">
        {/* Top Bar - Hide on mobile */}
        <div className="bg-[#f7f7f7] py-2 hidden md:block">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-gray-600" />
                <a href="tel:0450124086" className="text-gray-600 hover:text-[#1E3D8F]">0450124086</a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-gray-600" />
                <a href="mailto:account@cleaningprofessionals.com.au" className="text-gray-600 hover:text-[#1E3D8F]">
                  account@cleaningprofessionals.com.au
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4 ml-auto">
              <a 
                href="https://www.facebook.com/people/Cleaning-Professionals/61572518431848/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-5 h-5 flex items-center justify-center"
              >
                <Image 
                  src="/logos/facebook.png"
                  alt="Facebook"
                  width={20}
                  height={20}
                  className="w-full h-full object-contain hover:opacity-80 transition-opacity opacity-60"
                />
              </a>
              <a 
                href="https://www.instagram.com/cleaning__professionals/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-5 h-5 flex items-center justify-center"
              >
                <Image 
                  src="/logos/instagram.png" 
                  alt="Instagram"
                  width={20}
                  height={20}
                  className="w-full h-full object-contain hover:opacity-80 transition-opacity opacity-60"
                />
              </a>
              <a 
                href="https://www.linkedin.com/company/cleaning-professionals-melbourne/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-5 h-5 flex items-center justify-center"
              >
                <Image 
                  src="/logos/linkedin.png"
                  alt="LinkedIn"
                  width={20}
                  height={20}
                  className="w-full h-full object-contain hover:opacity-80 transition-opacity opacity-60"
                />
              </a>
              <a 
                href="https://wa.me/+61450124086" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-5 h-5 flex items-center justify-center"
              >
                <Image 
                  src="/logos/whatsapp.png"
                  alt="WhatsApp"
                  width={20}
                  height={20}
                  className="w-full h-full object-contain hover:opacity-80 transition-opacity opacity-60"
                />
              </a>
            </div>
          </div>
        </div>
        
        {/* Main Navigation */}
        <nav className={`bg-white ${isScrolled ? 'shadow-md' : ''} transition-shadow duration-300`}>
          {/* First Row - Logo and Menu Button */}
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/images/logo.webp"
                  alt="Cleaning Professionals"
                  width={180}
                  height={60}
                  className="object-contain w-[140px] md:w-[180px]"
                />
              </Link>
              
              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center space-x-8">
                <Link href="/" className={`text-gray-700 hover:text-[#1E3D8F] transition-colors ${
                  pathname === '/' ? 'text-[#1E3D8F] font-semibold' : ''
                }`}>
                  HOME
                </Link>
                <div className="relative group">
                  <button
                    className={`flex items-center gap-1 text-gray-700 hover:text-[#1E3D8F] transition-colors ${
                      pathname.startsWith('/about') || pathname === '/locations' ? 'text-[#1E3D8F] font-semibold' : ''
                    }`}
                  >
                    ABOUT
                    <ChevronDown 
                      size={16} 
                      className="transform transition-transform group-hover:rotate-180" 
                    />
                  </button>

                  {/* About Dropdown Menu */}
                  <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md py-2 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    {aboutLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1E3D8F] ${
                          pathname === link.href ? 'text-[#1E3D8F] font-semibold bg-gray-50' : ''
                        }`}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Services Dropdown */}
                <div className="relative group">
                  <button
                    className={`flex items-center gap-1 text-gray-700 hover:text-[#1E3D8F] transition-colors ${
                      pathname.startsWith('/services') ? 'text-[#1E3D8F] font-semibold' : ''
                    }`}
                  >
                    SERVICES
                    <ChevronDown 
                      size={16} 
                      className="transform transition-transform group-hover:rotate-180" 
                    />
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-md py-2 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    {serviceLinks.map((link, index) => (
                      <div key={link.href}>
                        <Link
                          href={link.href}
                          className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1E3D8F] ${
                            pathname === link.href ? 'text-[#1E3D8F] font-semibold bg-gray-50' : ''
                          }`}
                        >
                          {link.title}
                        </Link>
                        {index === 0 && (
                          <div className="my-2 border-b border-gray-100"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <Link 
                  href="/pricing" 
                  className={`text-gray-700 hover:text-[#1E3D8F] transition-colors relative ${
                    isActive('/pricing') ? 'text-[#1E3D8F] font-semibold after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-[#1E3D8F]' : ''
                  }`}
                >
                  PRICING
                </Link>
                <Link 
                  href="/blogs" 
                  className={`text-gray-700 hover:text-[#1E3D8F] transition-colors relative ${
                    isActive('/blogs') ? 'text-[#1E3D8F] font-semibold after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-[#1E3D8F]' : ''
                  }`}
                >
                  BLOGS
                </Link>
                <Link 
                  href="/faqs" 
                  className={`text-gray-700 hover:text-[#1E3D8F] transition-colors relative ${
                    isActive('/faqs') ? 'text-[#1E3D8F] font-semibold after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-[#1E3D8F]' : ''
                  }`}
                >
                  FAQS
                </Link>
                <Link 
                  href="/contact" 
                  className={`text-gray-700 hover:text-[#1E3D8F] transition-colors relative ${
                    isActive('/contact') ? 'text-[#1E3D8F] font-semibold after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-[#1E3D8F]' : ''
                  }`}
                >
                  CONTACT
                </Link>
                <Link 
                  href="/get-quote" 
                  className={`text-gray-700 hover:text-[#1E3D8F] transition-colors relative ${
                    isActive('/get-quote') ? 'text-[#1E3D8F] font-semibold after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-[#1E3D8F]' : ''
                  }`}
                >
                  GET QUOTE
                </Link>
                <Link 
                  href="/career" 
                  className={`text-gray-700 hover:text-[#1E3D8F] transition-colors relative ${
                    isActive('/career') ? 'text-[#1E3D8F] font-semibold after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-[#1E3D8F]' : ''
                  }`}
                >
                  CAREER
                </Link>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Call Button - Show only on desktop */}
                <Link 
                  href="tel:0450124086"
                  className="hidden md:flex bg-[#FFA500] text-white px-6 py-2 rounded-md hover:bg-opacity-90 whitespace-nowrap transition-all"
                >
                  Call Us: 0450124086
                </Link>

                {/* Mobile Menu Button */}
                <button 
                  className="lg:hidden"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? (
                    <X size={24} className="text-gray-700" />
                  ) : (
                    <Menu size={24} className="text-gray-700" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Second Row - Mobile Action Buttons */}
          <div className="lg:hidden border-t border-gray-100">
            <div className="container mx-auto">
              <div className="grid grid-cols-2 gap-0">
                <Link 
                  href="tel:0450124086"
                  className="w-full bg-[#FFA500] text-white px-4 py-3 text-center text-sm hover:bg-opacity-90 transition-all"
                >
                  Call Us Now
                </Link>
                <Link 
                  href="/quick-book"
                  className="w-full bg-white text-[#1E3D8F] px-4 py-3 text-center text-sm hover:bg-[#1E3D8F] hover:text-white transition-all border-l border-gray-100"
                >
                  Quick Book
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <div 
            className={`fixed inset-0 bg-white z-50 transition-transform duration-300 lg:hidden overflow-y-auto ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{ top: '116px' }}
          >
            {/* Mobile Navigation Links */}
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-4">
                <Link 
                  href="/" 
                  className="text-gray-700 hover:text-[#1E3D8F] py-2 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  HOME
                </Link>
                <div>
                  <button
                    className="flex items-center justify-between w-full text-gray-700 hover:text-[#1E3D8F] py-2"
                    onClick={() => setIsAboutOpen(!isAboutOpen)}
                  >
                    <span>ABOUT</span>
                    <ChevronDown 
                      size={16} 
                      className={`transform transition-transform ${
                        isAboutOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isAboutOpen && (
                    <div className="pl-4 mt-2 space-y-2">
                      {aboutLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block py-2 text-gray-600 hover:text-[#1E3D8F]"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Services Dropdown in Mobile */}
                <div>
                  <button
                    className="flex items-center justify-between w-full text-gray-700 hover:text-[#1E3D8F] py-2"
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                  >
                    <span>SERVICES</span>
                    <ChevronDown 
                      size={16} 
                      className={`transform transition-transform ${
                        isServicesOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isServicesOpen && (
                    <div className="pl-4 mt-2 space-y-2">
                      {serviceLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block py-2 text-gray-600 hover:text-[#1E3D8F]"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Rest of mobile menu links */}
                {['PRICING', 'BLOGS', 'FAQS', 'CONTACT', 'GET QUOTE', 'CAREER'].map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-700 hover:text-[#1E3D8F] py-2 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Contact Info - Moved to bottom */}
            <div className="border-t border-gray-100 mt-auto">
              <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col space-y-4">
                  <a 
                    href="tel:0450124086" 
                    className="flex items-center text-gray-600 hover:text-[#1E3D8F]"
                  >
                    <Phone size={16} className="mr-2" />
                    0450124086
                  </a>
                  <a 
                    href="mailto:account@cleaningprofessionals.com.au" 
                    className="flex items-center text-gray-600 hover:text-[#1E3D8F] text-sm"
                  >
                    <Mail size={16} className="mr-2" />
                    account@cleaningprofessionals.com.au
                  </a>
                  
                  {/* Social Media Icons */}
                  <div className="flex items-center space-x-4 pt-4">
                    <a href="https://facebook.com" className="text-gray-600 hover:text-[#1E3D8F]">
                      <Image src="/logos/facebook.png" alt="Facebook" width={20} height={20} />
                    </a>
                    <a href="https://instagram.com" className="text-gray-600 hover:text-[#1E3D8F]">
                      <Image src="/logos/instagram.png" alt="Instagram" width={20} height={20} />
                    </a>
                    <a href="https://linkedin.com" className="text-gray-600 hover:text-[#1E3D8F]">
                      <Image src="/logos/linkedin.png" alt="LinkedIn" width={20} height={20} />
                    </a>
                    <a href="https://wa.me/0450124086" className="text-gray-600 hover:text-[#1E3D8F]">
                      <Image src="/logos/whatsapp.png" alt="WhatsApp" width={20} height={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content with top padding for fixed header */}
      <main style={{ 
        paddingTop: '116px', // Account for fixed header height
        minHeight: 'calc(100vh - 116px)'
      }}>
        {children}
      </main>
      
      {/* Footer Links Section - Enhanced CTA */}
<div className="border-t border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
  <div className="container mx-auto px-4 py-12">
    <div className="text-center mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Get Started?</h3>
      <p className="text-gray-600">Choose your preferred booking method and get your space cleaned today</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {/* Quick Book CTA */}
      <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-blue-200">
        <div className="flex items-center justify-center mb-4">
          <span className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mr-3">
            <span className="text-2xl">⚡</span>
          </span>
          <span className="font-bold text-xl text-gray-900">Quick Book</span>
        </div>
        <div className="text-gray-600 mb-6 leading-relaxed">
          Need cleaning ASAP? Get instant booking with our fastest service option
        </div>
        <a 
          href="/book" 
          className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg shadow-md hover:shadow-lg"
        >
          Book Instantly 
          <span className="ml-2 text-xl">→</span>
        </a>
        <div className="mt-3 text-xs text-gray-500">Available within 24 hours</div>
      </div>

      {/* Proper Booking CTA */}
      <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-green-200">
        <div className="flex items-center justify-center mb-4">
          <span className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mr-3">
            <span className="text-2xl">🎯</span>
          </span>
          <span className="font-bold text-xl text-gray-900">Custom Booking</span>
        </div>
        <div className="text-gray-600 mb-6 leading-relaxed">
          Want specific details? Customize your location, timing, and service preferences
        </div>
        <a 
          href="/quick-book/location" 
          className="inline-flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg shadow-md hover:shadow-lg"
        >
          Get Instant Pricing
          <span className="ml-2 text-xl">→</span>
        </a>
        <div className="mt-3 text-xs text-gray-500">Tailored to your needs</div>
      </div>
    </div>

    {/* Bottom CTA Bar */}
    <div className="mt-10 text-center">
      <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
        <span className="mr-2">✨</span>
        Limited Time: Get Up to 30% Off – Book Regular Cleaning Services Today!


      </div>
      <div className="text-gray-600 text-sm">
        Questions? Call us at <a href="tel:0450124086" className="font-semibold text-blue-600 hover:underline">0450 124 086</a> or 
        <a href="/contact" className="font-semibold text-blue-600 hover:underline ml-1">get in touch</a>
      </div>
    </div>
  </div>
</div>
      
      {/* Footer */}
      <footer className="bg-[#1E3D8F] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Column 1 - Logo and Description */}
            <div className="md:col-span-1">
              <Image 
                src="/logos/logo-white.png"
                alt="Cleaning Professionals" 
                width={200} 
                height={80}
                className="mb-6 w-[160px] md:w-[200px]"
              />
              <p className="text-sm md:text-base text-gray-300 mb-8">
                Cleaning Professionals stands as a beacon of excellence in household and commercial cleaning services across the Melbourne area. We deliver exceptional cleaning solutions tailored to your needs.
              </p>
              <div className="space-y-4 text-sm md:text-base">
                <p className="text-gray-300 font-medium">Email:</p>
                <a href="mailto:info@cleaningprofessionals.com.au" className="text-white hover:text-[#FFA500] text-sm md:text-base block mb-2">
                  info@cleaningprofessionals.com.au
                </a>
                <a href="mailto:account@cleaningprofessionals.com.au" className="block text-white hover:text-[#FFA500] text-sm md:text-base">
                  account@cleaningprofessionals.com.au
                </a>
                <p className="text-gray-300 mt-6 font-medium">Phone: <a href="tel:0450124086" className="text-white hover:text-[#FFA500] ml-1">0450124086</a></p>
              </div>
              <div className="flex gap-4 mt-6">
                <Link href="https://www.facebook.com/people/Cleaning-Professionals/61572518431848/" className="text-white hover:text-[#FFA500] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                  </svg>
                </Link>
                <Link href="https://www.instagram.com/cleaning__professionals/" className="text-white hover:text-[#FFA500] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
                  </svg>
                </Link>
                <Link href="https://www.linkedin.com/company/cleaning-professionals-melbourne/" className="text-white hover:text-[#FFA500] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </Link>
                <Link href="https://wa.me/+61450124086" className="text-white hover:text-[#FFA500] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Column 2 - Quick Links */}
            <div>
              <h3 className="text-base md:text-lg font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3 text-sm md:text-base">
                <li><Link href="/" className="hover:text-[#FFA500]">Home</Link></li>
                <li><Link href="/about" className="hover:text-[#FFA500]">About</Link></li>
                <li><Link href="/services" className="hover:text-[#FFA500]">Services</Link></li>
                <li><Link href="/pricing" className="hover:text-[#FFA500]">Pricing</Link></li>
                <li><Link href="/blogs" className="hover:text-[#FFA500]">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-[#FFA500]">Contact</Link></li>
              </ul>
            </div>

            {/* Column 3 - Services */}
            <div>
              <h3 className="text-base md:text-lg font-bold mb-6">Services</h3>
              <ul className="space-y-3 text-sm md:text-base">
                <li><Link href="/services/carpet-cleaning" className="hover:text-[#FFA500]">Carpet Cleaning</Link></li>
                <li><Link href="/services/end-of-lease-cleaning" className="hover:text-[#FFA500]">End Of Lease Cleaning</Link></li>
                <li><Link href="/services/general-cleaning" className="hover:text-[#FFA500]">General Cleaning</Link></li>
                <li><Link href="/services/deep-cleaning" className="hover:text-[#FFA500]">Deep Cleaning</Link></li>
                <li><Link href="/services/move-in-cleaning" className="hover:text-[#FFA500]">Move In Cleaning</Link></li>
                <li><Link href="/services/ndis-cleaning" className="hover:text-[#FFA500]">NDIS Cleaning</Link></li>
                <li><Link href="/services/commercial-cleaning" className="hover:text-[#FFA500]">Commercial Cleaning</Link></li>
                <li><Link href="/services/after-renovation-cleaning" className="hover:text-[#FFA500]">After Renovation Clean</Link></li>
                <li><Link href="/services/oven-cleaning" className="hover:text-[#FFA500]">Oven Clean</Link></li>
                <li><Link href="/services/tile-and-floor-cleaning" className="hover:text-[#FFA500]">Tile & Floor Clean</Link></li>
                <li><Link href="/services/upholstery-cleaning" className="hover:text-[#FFA500]">Upholstery Clean</Link></li>
                <li><Link href="/services/window-cleaning" className="hover:text-[#FFA500]">Window Clean</Link></li>
              </ul>
            </div>

            {/* Column 4 - Service Areas */}
            <div>
              <h3 className="text-base md:text-lg font-bold mb-6">Service Areas</h3>
              <ul className="space-y-3 text-sm md:text-base">
                <li><Link href="/locations/melbourne" className="hover:text-[#FFA500]">Melbourne CBD</Link></li>
                <li><Link href="/locations/south-yarra" className="hover:text-[#FFA500]">South Yarra</Link></li>
                <li><Link href="/locations/toorak" className="hover:text-[#FFA500]">Toorak</Link></li>
                <li><Link href="/locations/richmond" className="hover:text-[#FFA500]">Richmond</Link></li>
                <li><Link href="/locations/brunswick" className="hover:text-[#FFA500]">Brunswick</Link></li>
                <li><Link href="/locations/carlton" className="hover:text-[#FFA500]">Carlton</Link></li>
                <li><Link href="/locations/st-kilda" className="hover:text-[#FFA500]">St Kilda</Link></li>
                <li><Link href="/locations/fitzroy" className="hover:text-[#FFA500]">Fitzroy</Link></li>
                <li className="pt-2">
                  <Link 
                    href="/locations" 
                    className="inline-flex items-center text-sm text-white hover:text-[#FFA500] transition-colors group"
                  >
                    <span className="border-b border-[#FFA500] pb-0.5">View All Service Areas</span>
                    <svg 
                      className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 5 - Operating Hours & Policies */}
            <div>
              <h3 className="text-base md:text-lg font-bold mb-6">Operating Hours</h3>
              <ul className="space-y-3 text-sm md:text-base mb-8">
                <li>Mon - Fri: 8am – 8pm</li>
                <li>Saturday: 9am - 7pm</li>
                <li>Sunday: 9am - 8pm</li>
              </ul>

              <h3 className="text-base md:text-lg font-bold mb-4">Policies</h3>
              <ul className="space-y-3 text-sm md:text-base">
                <li><Link href="/privacy-policy" className="hover:text-[#FFA500]">Privacy Policy</Link></li>
                <li><Link href="/terms-and-conditions" className="hover:text-[#FFA500]">Terms & Conditions</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 py-6">
            <p className="text-center text-gray-400 text-xs md:text-sm">
              © {new Date().getFullYear()} Cleaning Professionals Copyrights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 