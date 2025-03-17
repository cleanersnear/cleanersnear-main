import React from 'react';

export const metadata = {
  title: 'Cookie & Data Policy | Cleaning Professionals Australia',
  description: 'Information about how we use cookies and handle your data on our website.',
};

export default function CookiePolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Cookie & Data Policy</h1>
      
      <div className="space-y-6">
        <section>
          <p className="mb-4">
            This Cookie & Data Policy explains how Cleaning Professionals Australia uses cookies and similar technologies 
            to recognize you when you visit our website. It explains what these technologies are and why we use them, 
            as well as your rights to control our use of them.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">What are Cookies?</h2>
          <p className="mb-4">
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. 
            They are widely used to make websites work efficiently and provide useful information to website owners.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium">Essential Cookies</h3>
              <p>Required for basic website functionality and security. Cannot be disabled.</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Session management</li>
                <li>Security features</li>
                <li>Basic functionality</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium">Performance Cookies</h3>
              <p>Help us understand how visitors interact with our website.</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Google Analytics</li>
                <li>Usage statistics</li>
                <li>Performance monitoring</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium">Functional Cookies</h3>
              <p>Enable enhanced functionality and personalization.</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Remember preferences</li>
                <li>Service customization</li>
                <li>Location services</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium">Marketing Cookies</h3>
              <p>Used to track visitors across websites for marketing purposes.</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Advertising tracking</li>
                <li>Social media integration</li>
                <li>Marketing analytics</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Data</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Improve website performance and user experience</li>
            <li>Analyze user behavior and preferences</li>
            <li>Personalize content and services</li>
            <li>Provide targeted advertising</li>
            <li>Maintain security and prevent fraud</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Cookie Choices</h2>
          <p className="mb-4">
            You can control cookies through your browser settings. However, if you disable certain cookies, 
            you may not be able to access all features of our website.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Browser settings to manage cookies</li>
            <li>Cookie consent preferences</li>
            <li>Third-party opt-out tools</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
          <p className="mb-4">We use the following third-party services that may place cookies:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Google Analytics for website analytics</li>
            <li>Payment processors for secure transactions</li>
            <li>Social media plugins for sharing</li>
            <li>Marketing tools for advertising</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
          <p className="mb-4">
            Different cookies have different lifespans:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Session cookies: Deleted when you close your browser</li>
            <li>Persistent cookies: Remain for a set period</li>
            <li>Third-party cookies: Controlled by respective services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
          <p>
            We may update this Cookie & Data Policy from time to time. Changes will be posted on this page 
            with an updated revision date. Please check back periodically for any updates.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have questions about our Cookie & Data Policy, please contact us:
          </p>
          <div className="space-y-2">
            <p>Email: privacy@cleaningprofessionals.com.au</p>
            <p>Phone: 0450124086</p>
          </div>
        </section>

        <p className="text-sm text-gray-600 mt-8">
          Last updated: March 2024
        </p>
      </div>
    </div>
  );
} 