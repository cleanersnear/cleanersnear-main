import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SubscriptionSection from '@/components/features/SubscriptionSection';

export const metadata: Metadata = {
  title: 'Privacy Policy | Cleaning Professionals Australia',
  description: 'Our commitment to protecting your privacy and personal information in accordance with Australian Privacy Principles.',
};

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-[116px]">
        {/* Enhanced Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-700 to-blue-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:16px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Privacy Policy
              </h1>
              <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
                Our commitment to protecting your privacy and maintaining the security of your personal information
              </p>
              <div className="flex justify-center space-x-4 text-sm text-blue-100">
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Australian Privacy Principles Compliant
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure Data Protection
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:p-10 space-y-8">
            {/* Last Updated Badge */}
            <div className="flex justify-end">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                Last Updated: March 2024
              </span>
            </div>

            {/* Introduction */}
            <section className="prose prose-blue max-w-none">
              <p className="text-lg text-gray-600 leading-relaxed">
                At Cleaning Professionals Group, we respect your privacy and are committed to protecting your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services 
                or visit our website.
              </p>
              <p className="text-gray-600">
                We have developed this policy in accordance with the Australian Privacy Principles contained in the Privacy Act 1988 (Cth) 
                and other applicable Australian privacy laws.
              </p>
            </section>

            {/* Who We Are */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                Who We Are
              </h2>
              <p className="text-gray-600">
                Cleaning Professionals Group is a Melbourne-based cleaning service provider operating throughout Melbourne, Victoria.
              </p>
            </section>

            {/* Information Collection */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                Information We Collect
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Name and contact details
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Service preferences and requirements
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                       Address Details
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Collection Methods</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Website forms
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Telephone conversations
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Email correspondence
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Service bookings
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Cookies Section */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                Cookies and Tracking Technologies
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-6">
                <p className="text-gray-600 mb-4">
                  Our website uses cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic. 
                  Types of cookies we use include:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2">Essential Cookies</h4>
                    <p className="text-sm text-gray-600">Required for website functionality</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2">Analytical Cookies</h4>
                    <p className="text-sm text-gray-600">Track website usage patterns</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2">Marketing Cookies</h4>
                    <p className="text-sm text-gray-600">Enable personalized advertising</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                Contact Us
              </h2>
              <div className="bg-blue-50 rounded-xl p-6">
                <p className="text-gray-600 mb-6">
                  For privacy-related inquiries or to exercise your rights, please contact us:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-gray-900">0450 124 086</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div className="flex flex-col">
                        <span className="text-gray-900">info@cleaningprofessionals.com.au</span>
                        <span className="text-gray-900">account@cleaningprofessionals.com.au</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-900">Melbourne, Victoria 3000</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="flex flex-col">
                        <span className="text-gray-900">Mon - Fri: 8am - 8pm</span>
                        <span className="text-gray-900">Sat: 9am - 7pm</span>
                        <span className="text-gray-900">Sun: 9am - 8pm</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer Note */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                This privacy policy was last updated in March 2024 and applies to all information collected by Cleaning Professionals Group.
              </p>
            </div>
          </div>
        </div>
      </div>
      <SubscriptionSection />
      <Footer />
    </>
  );
} 