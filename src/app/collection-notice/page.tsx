import React from 'react';

export const metadata = {
  title: 'Collection Notice Statement | Cleaning Professionals Australia',
  description: 'Information about how we collect, use, and protect your personal information.',
};

export default function CollectionNotice() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Collection Notice Statement</h1>
      
      <div className="space-y-6">
        <section>
          <p className="mb-4">
            This Collection Notice Statement explains how Cleaning Professionals Australia collects, uses, 
            and protects your personal information in accordance with the Australian Privacy Principles.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium">Personal Information</h3>
              <ul className="list-disc pl-6 mt-2">
                <li>Name and contact details</li>
                <li>Address and service location</li>
                <li>Payment information</li>
                <li>Service preferences</li>
                <li>Communication history</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium">Service Information</h3>
              <ul className="list-disc pl-6 mt-2">
                <li>Service history</li>
                <li>Booking details</li>
                <li>Special requirements</li>
                <li>Feedback and reviews</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Purpose of Collection</h2>
          <p className="mb-4">We collect your information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide and improve our cleaning services</li>
            <li>Process payments and maintain accounts</li>
            <li>Communicate about services and updates</li>
            <li>Ensure quality and safety standards</li>
            <li>Meet legal and regulatory requirements</li>
            <li>Handle complaints and disputes</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How We Collect Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Direct from you when booking services</li>
            <li>Through our website and online forms</li>
            <li>Via phone, email, or other communications</li>
            <li>From third-party service providers</li>
            <li>Through customer feedback and surveys</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
          <p className="mb-4">We may share your information with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Our cleaning service providers</li>
            <li>Payment processors</li>
            <li>Quality assurance teams</li>
            <li>Legal and regulatory authorities</li>
            <li>Professional advisers and insurers</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p className="mb-4">We protect your information through:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Secure data storage systems</li>
            <li>Access controls and authentication</li>
            <li>Staff training and confidentiality agreements</li>
            <li>Regular security assessments</li>
            <li>Data encryption protocols</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal information</li>
            <li>Request corrections to your data</li>
            <li>Opt-out of marketing communications</li>
            <li>File a privacy complaint</li>
            <li>Request data deletion (where applicable)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Overseas Disclosure</h2>
          <p>
            We primarily store and process your information in Australia. However, some of our service providers 
            may store data overseas. We ensure these providers comply with Australian privacy laws and maintain 
            appropriate data protection standards.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-4">
            For privacy-related inquiries or to exercise your rights, contact our Privacy Officer:
          </p>
          <div className="space-y-2">
            <p>Email: privacy@cleaningprofessionals.com.au</p>
            <p>Phone: 0450124086</p>
            <p>Address: Melbourne, VIC 3000</p>
          </div>
        </section>

        <p className="text-sm text-gray-600 mt-8">
          Last updated: March 2024
        </p>
      </div>
    </div>
  );
} 