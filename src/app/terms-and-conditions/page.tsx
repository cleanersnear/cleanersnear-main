import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SubscriptionSection from '@/components/features/SubscriptionSection';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Cleaning Professionals Group',
  description: 'Our comprehensive terms and conditions for using Cleaning Professionals Group services.',
};

export default function TermsAndConditions() {
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
                Terms and Conditions
              </h1>
              <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
                Please read these terms carefully before using our professional cleaning services
              </p>
              <div className="flex justify-center space-x-4 text-sm text-blue-100">
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Professional Service Guarantee
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Insured & Protected
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
                Last Updated: March 5, 2025
              </span>
            </div>

            {/* Introduction */}
            <section className="prose prose-blue max-w-none">
              <p className="text-lg text-gray-600 leading-relaxed">
                Welcome to Cleaning Professionals Group. These Terms and Conditions govern your use of our services. 
                By engaging our services, accessing our website, or making a booking, you agree to be bound by these terms. 
                Please read these terms carefully before using our services.
              </p>
            </section>

            {/* Service Agreement */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                1. Service Agreement
              </h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Cleaning Professionals Group provides professional cleaning services for residential and commercial properties throughout Melbourne.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>All services are subject to availability, confirmation, and these Terms and Conditions.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>We reserve the right to refuse service to anyone for any reason at our sole discretion.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Our services are guaranteed subject to our satisfaction guarantee terms outlined below.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Booking and Cancellation */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                2. Booking and Cancellation
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-6">
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Bookings must be made through our official channels: website, phone, or email.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>A 24-hour notice is required for all cancellations.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Cancellations made with less than 24 hours&apos; notice will incur a fee of 50% of the service value.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Same-day cancellations will incur a fee of 50% of the service value.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>We reserve the right to cancel or reschedule services with reasonable notice due to unavoidable circumstances.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Pricing and Payment */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                3. Pricing and Payment
              </h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>All prices are quoted in Australian Dollars and include GST.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>For new customers or one-off services, we will contact you the next business day after your service to ensure satisfaction before processing payment.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>For regular services, payment will be processed the day after service.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Additional charges may apply for extra services or tasks not included in the original scope.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Customer Responsibilities */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                4. Customer Responsibilities
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-6">
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Provide accurate and complete information for service delivery.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Ensure safe access to all service locations and areas requiring cleaning.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Maintain appropriate indoor temperature (below 35°C) for the health and safety of our cleaning teams.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Advise us of any pets on the premises so we can allocate appropriate cleaning staff.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Service Provider Conduct */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                5. Service Provider Conduct
              </h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Our cleaning professionals will deliver services in a professional and courteous manner.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>All staff will comply with safety standards and quality protocols.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>We respect customer privacy and property at all times.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Our staff represent Cleaning Professionals Group and will conduct themselves accordingly.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Satisfaction Guarantee */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                6. Satisfaction Guarantee
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-6">
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>If you are unsatisfied with your service, you must contact our support team and provide photos within 48 hours of service completion.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>We will review your concerns and offer a re-clean if appropriate.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>If we are still unable to meet your expectations after a re-clean, a partial or full refund may be considered depending on the circumstances.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Exclusions */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                7. Exclusions
              </h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-600 mb-4">The following areas/tasks are excluded from all standard bookings:</p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Moving of heavy/large items of furniture</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Cleaning between glass sheets on ovens</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Removal of human/animal waste</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Cleaning external areas including outside windows, gardens, pools</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>High-pressure cleaning</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Pest control services</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Property Access and Keys */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                8. Property Access and Keys
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-6">
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>If you provide keys to our cleaning teams, they will be labeled with minimal identifying information.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Any keys provided are done so at your own risk, as our insurance does not cover the loss or misuse of keys.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>For absent property access, we recommend using a key lockbox or leaving a key in a secure location.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Parking */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                9. Parking
              </h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Parking must be provided for our cleaning teams.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Any parking costs incurred will be added to your service charge.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>If the parking provided is more than 100 meters from your property, additional charges may apply.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Liability and Insurance */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                10. Liability and Insurance
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-6">
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Cleaning Professionals Group maintains public liability insurance.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>In the rare instance that damage occurs as a result of our service, please contact our team and provide photos within 48 hours of service completion.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>For high-value claims, up to three quotes may be required for repair or replacement.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Waiting and Access */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                11. Waiting and Access
              </h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>If our cleaning teams cannot gain access to your property, our office will contact you.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>After contact, our team will wait for up to 15 minutes for you to provide access.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>If access is not provided within this timeframe, the service may be cancelled with a 50% cancellation fee applied.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Photography */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                12. Photography
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-6">
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>On occasion, our cleaning teams may need to take photos to document property condition or verify completed work.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>If you are present, we will request permission before taking any photos.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>All photos are used strictly for purposes related to your service, and we take your privacy seriously.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Team Size */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                13. Team Size
              </h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>We may work in teams of 1-3 cleaners.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>If you book a certain number of hours (e.g., 1 cleaner for 2 hours), we may send multiple cleaners for a shorter duration (e.g., 2 cleaners for 1 hour) to complete the same amount of work more efficiently.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Gender Neutral Policy */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                14. Gender Neutral Policy
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-6">
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Cleaning Professionals Group employs people of all genders and 
                      firmly believes that a person&apos;s gender does not affect their cleaning quality.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>We ask customers to avoid making gender-specific requests for their services.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Phone Call Recording */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                15. Phone Call Recording
              </h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Please be advised that all incoming and outgoing phone calls with Cleaning Professionals Group may be recorded for quality assurance and training purposes.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>When sensitive information (such as credit card details) needs to be shared during a call, our team will pause recording temporarily to maintain security and confidentiality.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                16. Intellectual Property
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-6">
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>All website content is protected by copyright law.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Our trademarks and branding rights are reserved.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Unauthorized use of our materials is prohibited.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Dispute Resolution */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                17. Dispute Resolution
              </h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>We commit to good faith attempts to resolve any disputes.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>If a dispute arises, we will engage in mediation procedures before any legal action.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>All matters relating to our services are governed by the laws of Victoria, Australia.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* COVID-19 Procedures */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                18. COVID-19 Procedures
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-6">
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>All members of our team will strictly follow government COVID regulations current at the time of your booking.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>We maintain a strict COVID-Safe plan.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Our cleaners carry masks, gloves, and shoe covers, and will wear these if requested by our customers.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Changes to Terms */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                19. Changes to Terms
              </h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-600">
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting 
                  to our website. Continued use of our services after changes constitutes acceptance of the updated terms.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                20. Contact Information
              </h2>
              <div className="bg-blue-50 rounded-xl p-6">
                <p className="text-gray-600 mb-6">
                  For questions about these terms or our services, please contact us:
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
                These terms and conditions were last updated on March 5, 2025 and apply to all services provided by Cleaning Professionals Group.
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