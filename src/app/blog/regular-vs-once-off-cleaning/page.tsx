"use client";

import React from "react";
import Head from "next/head";
import Image from "next/image";
import { metadata } from "./metadata";
import { blogSchema, faqSchema, organizationSchema } from "./schema";
import ToC from "./components/ToC";
import FAQs from "./components/FAQs";
import SubscriptionSection from '@/components/features/SubscriptionSection'

export default function BlogLandingPage() {
  const canonicalUrl = "https://www.cleaningprofessionals.com.au/blog/regular-vs-one-off-cleaning-melbourne";
  const featuredImage = "https://vzyscxgvpzsqbkzpvttk.supabase.co/storage/v1/object/public/blog-images/Regular%20House%20Cleaning.png";

  const tocItems = [
    { id: "introduction", title: "Making the Right Choice" },
    { id: "why-deep-clean", title: "🚑 Why Start With a One-Off Deep Clean" },
    { id: "regular-cleaning", title: "⏰ Regular House Cleaning: Best Long-Term Investment" },
    { id: "budget-strategy", title: "💸 How to Keep Regular Cleaning Under $100/Week" },
    { id: "melbourne-pricing", title: "💳 Melbourne Cleaning Prices: What to Expect" },
    { id: "expert-recommendations", title: "❗ Expert Recommendations & Final Thoughts" }
  ];

  const faqItems = [
    {
      question: "What do cleaners charge per hour in Melbourne?",
      answer: "Most professional cleaners in Melbourne charge between $35-40 per hour. You might find private cleaners for $25-60/hr, but the quality varies a lot. Agencies often charge $45-80/hr due to higher overhead costs. We stick to $35-40/hr because it gives you the best balance of quality and value."
    },
    {
      question: "How much should I expect to pay for a 2-hour clean?",
      answer: "A 2-hour professional clean typically costs around $70-80. This usually covers your main living areas like the kitchen, bathrooms, and living room. Most cleaning services require at least 2 hours to do a proper job—anything less and you&apos;re probably not getting a thorough clean."
    },
    {
      question: "What can a cleaner realistically do in 3 hours?",
      answer: "In 3 hours, a good cleaner can handle a 2-3 bedroom apartment or small house pretty thoroughly. They&apos;ll clean the kitchen, bathrooms, living areas, and bedrooms—dusting, vacuuming, mopping, and sanitizing the main surfaces. It&apos;s enough time to make a real difference without rushing."
    },
    {
      question: "What&apos;s the cheapest you can pay for a cleaner?",
      answer: "You can find cleaners starting at around $25-30 per hour, but honestly, you get what you pay for. Quality professional cleaning usually costs $35-40/hr because that covers proper equipment, insurance, trained staff, and good cleaning products. Going too cheap often means cutting corners."
    },
    {
      question: "How much does house cleaning actually cost in Melbourne?",
      answer: "Here&apos;s the breakdown: regular cleaning runs $35-40/hr, a 2-hour clean costs $70-80, deep cleaning is $160-300, and end-of-lease cleaning starts at $250-450. The good news is you can keep weekly cleaning under $100 if you&apos;re smart about which areas to focus on."
    },
    {
      question: "Should I go with regular cleaning or just one-off deep cleans?",
      answer: "It depends on your situation, but here&apos;s what we&apos;ve found works best: start with a deep clean to get your home to a good baseline, then switch to regular weekly or fortnightly cleaning to maintain it. Regular cleaning is better for long-term maintenance, while one-off cleans are perfect for resets or special occasions."
    },
    {
      question: "How often should I get my house professionally cleaned?",
      answer: "Most Melbourne homes do well with weekly cleaning for the high-traffic areas (kitchen, bathrooms, living rooms) and fortnightly cleaning for bedrooms and less-used spaces. This approach keeps your costs manageable while maintaining good hygiene standards throughout your home."
    }
  ];

  return (
    <main style={{
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      background: "#ffffff",
      minHeight: "100vh",
      padding: 0,
      margin: 0,
      lineHeight: 1.6,
    }}>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={featuredImage} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={featuredImage} />
        
        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blogSchema)
          }}
        />
        
        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema)
          }}
        />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
      </Head>

      {/* Main Content Area */}
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "40px 24px",
      }}>
        {/* Hero Section */}
        <div className="hero-section" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "48px",
          alignItems: "center",
          marginBottom: "48px",
        }}>
          {/* Left Content */}
          <div>
            <div style={{
              fontSize: "12px",
              fontWeight: "600",
              color: "#65676b",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "16px"
            }}>
              EXPERT GUIDE
            </div>
            <h1 style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#1877f2",
              lineHeight: "1.2",
              marginBottom: "16px",
              marginTop: 0
            }}>
              Regular vs One-Off House Cleaning Melbourne: Expert Guide 2025
            </h1>
            <div style={{
              fontSize: "14px",
              color: "#65676b",
              marginBottom: "16px"
            }}>
              29 JULY 2025
            </div>
            <div style={{
              color: "#65676b",
              cursor: "pointer",
              fontSize: "16px"
            }}>
              🔗
            </div>
          </div>

          {/* Right Image */}
          <div style={{
            background: "#f0f2f5",
            borderRadius: "12px",
            height: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#65676b",
            fontSize: "16px",
            overflow: "hidden"
          }}>
            <Image 
              src={featuredImage} 
              alt="Regular vs One-Off House Cleaning Melbourne"
              width={600}
              height={400}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
          </div>
        </div>

        {/* Content and Sidebar Layout */}
        <div className="content-sidebar-layout" style={{
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: "48px",
          alignItems: "start",
        }}>
          {/* Main Article Content */}
          <div style={{
            fontSize: "18px",
            lineHeight: "1.7",
            color: "#1c1e21"
          }}>
            <h2 id="introduction" style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#1c1e21",
              marginBottom: "16px",
              marginTop: "32px"
            }}>
              Making the Right Choice for Your Melbourne Home
            </h2>

            <p style={{ marginBottom: "24px" }}>
              If you&apos;ve been searching for &quot;regular house cleaning Melbourne,&quot; &quot;one-off cleaning service,&quot; or &quot;cleaning services near me,&quot; you&apos;re in the right place. After serving over 2,000 Melbourne homes and helping countless families maintain their living spaces, we&apos;ve learned what truly works for busy families, professionals, and property investors.
            </p>

            <p style={{ marginBottom: "24px" }}>
              The truth is, most Melbourne homeowners struggle with the same question: &quot;Should I get regular cleaning or just a one-off deep clean?&quot; The answer isn&apos;t one-size-fits-all, but based on our years of experience, we can tell you exactly what works best for different situations.
            </p>

            <div style={{
              background: "#e3f2fd",
              border: "1px solid #2196f3",
              borderRadius: "8px",
              padding: "20px",
              margin: "24px 0"
            }}>
              <strong>Quick Expert Summary:</strong>
              <ul style={{ margin: "12px 0", paddingLeft: "20px" }}>
                <li>Best long-term choice: Regular house cleaning (weekly or fortnightly)</li>
                <li>Best first move: One-off deep clean to establish clean baseline</li>
                <li>Melbourne rates: $35-40/hr, minimum 2 hours weekly</li>
                <li>Stay under $100/week: Clean high-use areas weekly, alternate the rest</li>
                <li>Deep clean reality: Takes 4-6 hours minimum—anything less is misleading</li>
              </ul>
            </div>

            <h2 id="why-deep-clean" style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#1c1e21",
              marginBottom: "16px",
              marginTop: "32px"
            }}>
              🚑 Why Start With a One-Off Deep Clean
            </h2>

            <p style={{ marginBottom: "24px" }}>
              Here&apos;s the reality most Melbourne homeowners don&apos;t want to hear: if your home hasn&apos;t had professional cleaning in months (or years), you&apos;re not just dealing with surface dust. You&apos;re facing hidden grime, built-up grease, and allergens that regular cleaning won&apos;t touch.
            </p>

            <p style={{ marginBottom: "24px" }}>
              As cleaning specialists who&apos;ve seen hundreds of Melbourne homes, we always recommend starting with a one-off deep clean—especially if you&apos;ve never used professional cleaners. Here&apos;s why:
            </p>

            <ul style={{ marginBottom: "24px", paddingLeft: "24px" }}>
              <li style={{ marginBottom: "12px" }}><strong>Hidden buildup removal:</strong> Years of dust, grease, and grime accumulate in places you don&apos;t see</li>
              <li style={{ marginBottom: "12px" }}><strong>Allergen elimination:</strong> Deep cleaning removes dust mites, pet dander, and other allergens</li>
              <li style={{ marginBottom: "12px" }}><strong>Clean baseline establishment:</strong> Sets the standard for ongoing maintenance</li>
              <li style={{ marginBottom: "12px" }}><strong>Cost efficiency:</strong> Prevents expensive deep cleaning needs later</li>
            </ul>

            <blockquote style={{
              background: "#f0f2f5",
              borderLeft: "4px solid #1877f2",
              margin: "32px 0",
              padding: "24px",
              borderRadius: "8px",
              fontStyle: "italic",
              color: "#1c1e21"
            }}>
              &quot;After cleaning thousands of Melbourne homes, we can confidently say: you cannot deep clean a house in 2 hours. If someone&apos;s offering that, it&apos;s either a scam or a fake deep clean. Even just doing a proper shower or greasy oven takes over 2 hours with the right chemicals and technique.&quot;<br />
              <span style={{ fontWeight: "600" }}>– Cleaning Professionals Team</span>
            </blockquote>

            <h2 id="regular-cleaning" style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#1c1e21",
              marginBottom: "16px",
              marginTop: "32px"
            }}>
              ⏰ Regular House Cleaning: The Best Long-Term Investment
            </h2>

            <p style={{ marginBottom: "24px" }}>
              Once your home has been professionally deep cleaned, regular house cleaning becomes your secret weapon for maintaining that pristine standard. Here&apos;s what makes it the smart choice for Melbourne homes:
            </p>

            <div style={{ marginBottom: "24px" }}>
              <strong>Consistency beats intensity:</strong> Weekly or fortnightly cleaning prevents the buildup that requires expensive deep cleans. You avoid the cycle of &quot;let it get dirty, then panic clean.&quot;
            </div>

            <div style={{ marginBottom: "24px" }}>
              <strong>Health benefits:</strong> Regular cleaning reduces allergens, bacteria, and dust that can affect your family&apos;s health, especially important in Melbourne&apos;s changing seasons.
            </div>

            <div style={{ marginBottom: "24px" }}>
              <strong>Time savings:</strong> With professionals handling the heavy lifting, you gain back hours every week for what matters most—family, work, or relaxation.
            </div>

            <div style={{ marginBottom: "24px" }}>
              <strong>Property value:</strong> Regular maintenance keeps your home in top condition, whether you&apos;re planning to sell or just want to enjoy a beautiful living space.
            </div>

            <h2 id="budget-strategy" style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#1c1e21",
              marginBottom: "16px",
              marginTop: "32px"
            }}>
              💸 How to Keep Regular Cleaning Under $100/Week
            </h2>

            <p style={{ marginBottom: "24px" }}>
              Here&apos;s the insider secret most cleaning companies won&apos;t tell you: you don&apos;t need to clean your entire house every week. Smart homeowners use zone cleaning to maximize results while minimizing costs.
            </p>

            <div style={{
              background: "#fff3e0",
              border: "1px solid #ff9800",
              borderRadius: "8px",
              padding: "20px",
              margin: "24px 0"
            }}>
              <strong>Pro Tip from Real Cleaner Experience:</strong><br />
              &quot;You don&apos;t have to allocate the whole house for weekly cleaning. Most likely, you&apos;re not using every corner of the home all the time. By smartly dividing high-use and low-use areas, you can control your cleaning budget and still maintain hygiene.&quot;
            </div>

            <h3 style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#1c1e21",
              marginBottom: "12px",
              marginTop: "24px"
            }}>
              Smart Budget Cleaning Strategy:
            </h3>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "16px",
              marginBottom: "24px"
            }}>
              <div style={{
                background: "#f5f5f5",
                padding: "16px",
                borderRadius: "8px"
              }}>
                <strong>Weekly (High-Use Areas):</strong>
                <ul style={{ margin: "8px 0", paddingLeft: "20px" }}>
                  <li>Kitchen</li>
                  <li>Bathrooms</li>
                  <li>Living room</li>
                  <li>Entryways</li>
                </ul>
              </div>
              <div style={{
                background: "#f5f5f5",
                padding: "16px",
                borderRadius: "8px"
              }}>
                <strong>Fortnightly (Low-Use Areas):</strong>
                <ul style={{ margin: "8px 0", paddingLeft: "20px" }}>
                  <li>Bedrooms</li>
                  <li>Laundry</li>
                  <li>Spare rooms</li>
                  <li>Storage areas</li>
                </ul>
              </div>
            </div>

            <h2 id="melbourne-pricing" style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#1c1e21",
              marginBottom: "16px",
              marginTop: "32px"
            }}>
              💳 Melbourne Cleaning Prices: What to Expect in 2025
            </h2>

            <p style={{ marginBottom: "24px" }}>
              Based on our internal data from serving thousands of Melbourne homes, here&apos;s the real pricing landscape you need to know:
            </p>

            <div style={{
              background: "#e8f5e8",
              border: "1px solid #4caf50",
              borderRadius: "8px",
              padding: "20px",
              margin: "24px 0"
            }}>
              <strong>Melbourne Cleaning Price Guide 2025:</strong>
              <ul style={{ margin: "12px 0", paddingLeft: "20px" }}>
                <li><strong>Private cleaners:</strong> $25-60/hr (quality varies significantly)</li>
                <li><strong>Cleaning agencies:</strong> $45-80/hr (higher overhead costs)</li>
                <li><strong>✅ Cleaning Professionals:</strong> $35-40/hr (optimal quality-to-price ratio)</li>
                <li><strong>2-hour clean:</strong> $70-80 (covers essential areas)</li>
                <li><strong>One-off deep clean:</strong> $160-300 (4-6 hours minimum)</li>
                <li><strong>End of lease cleaning:</strong> $250-450+ (comprehensive service)</li>
              </ul>
            </div>

            <p style={{ marginBottom: "24px" }}>
              <strong>Why the price difference?</strong> Professional cleaning companies like ours invest in proper equipment, insurance, trained staff, and quality products. That $35-40/hr rate includes peace of mind that your home is being cleaned safely and effectively.
            </p>

            <h2 id="expert-recommendations" style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#1c1e21",
              marginBottom: "16px",
              marginTop: "32px"
            }}>
              ❗ Expert Recommendations & Final Thoughts
            </h2>

            <p style={{ marginBottom: "24px" }}>
              After a decade in Melbourne&apos;s cleaning industry, here&apos;s our honest recommendation: regular cleaning is clearly the best long-term option for most homes. It keeps your space consistently clean, reduces future costs, and gives you back precious time.
            </p>

            <p style={{ marginBottom: "24px" }}>
              But if you&apos;ve never had professional cleaning before, starting with a one-off deep clean is essential. It&apos;s like hitting the reset button on your home&apos;s cleanliness—establishing a standard that regular cleaning can then maintain.
            </p>

            <div style={{
              background: "#fce4ec",
              border: "1px solid #e91e63",
              borderRadius: "8px",
              padding: "20px",
              margin: "24px 0"
            }}>
              <strong>Key Takeaways for Melbourne Homeowners:</strong>
              <ul style={{ margin: "12px 0", paddingLeft: "20px" }}>
                <li>Start with a one-off deep clean if you&apos;re new to professional cleaning</li>
                <li>Transition to weekly or fortnightly regular cleaning</li>
                <li>Use zone cleaning to keep costs under $100/week</li>
                <li>Expect real deep cleans to take 4+ hours minimum</li>
                <li>Pay for quality and reliability, not just the lowest price</li>
                <li>Choose a company with proper insurance and trained staff</li>
              </ul>
            </div>

            <p style={{ marginBottom: "32px" }}>
              Remember: your home is your sanctuary. Investing in professional cleaning isn&apos;t just about cleanliness—it&apos;s about creating a healthy, comfortable environment for your family. In Melbourne&apos;s busy lifestyle, that peace of mind is worth every dollar.
            </p>
          </div>

          {/* Sidebar */}
          <div className="sidebar" style={{
            position: "sticky",
            top: "100px",
            height: "fit-content",
          }}>
            <ToC items={tocItems} />
            <FAQs items={faqItems} />
          </div>
        </div>
        <div className="mt-20">
                    <SubscriptionSection />
                </div>
        
      </div>

      {/* Mobile Sidebar Toggle (hidden on desktop) */}
      <style jsx>{`
        @media (max-width: 768px) {
          .hero-section {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .content-sidebar-layout {
            grid-template-columns: 1fr !important;
          }
          .sidebar {
            position: fixed !important;
            top: 0 !important;
            right: -100% !important;
            width: 280px !important;
            height: 100vh !important;
            background: white !important;
            z-index: 1000 !important;
            transition: right 0.3s ease !important;
            overflow-y: auto !important;
            padding: 20px !important;
            box-shadow: -2px 0 10px rgba(0,0,0,0.1) !important;
          }
          .sidebar.open {
            right: 0 !important;
          }
          .mobile-toggle {
            display: block !important;
            position: fixed !important;
            bottom: 20px !important;
            right: 20px !important;
            background: #1877f2 !important;
            color: white !important;
            border: none !important;
            border-radius: 50% !important;
            width: 56px !important;
            height: 56px !important;
            font-size: 20px !important;
            cursor: pointer !important;
            box-shadow: 0 4px 12px rgba(24,119,242,0.3) !important;
            z-index: 1001 !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>

      <button 
        className="mobile-toggle"
        onClick={() => {
          const sidebar = document.querySelector('.sidebar');
          sidebar?.classList.toggle('open');
        }}
      >
        ☰
      </button>
    </main>
  );
}