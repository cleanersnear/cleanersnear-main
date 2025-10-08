"use client";

import Link from "next/link";
import { Button } from "./ui/Button";
import { useState } from "react";
import { apiService } from "@/app/api/services/api";

export function Subscription() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string }>({});
  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({});

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubmitStatus({ success: false, message: "Please enter a valid email address" });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await apiService.submitSubscription({ email });
      setSubmitStatus({ success: true, message: response.message || "Thank you for subscribing!" });
      setEmail("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to subscribe. Please try again.";
      const already = /already subscribed/i.test(message);
      setSubmitStatus({
        success: already ? true : false,
        message: already ? "You are already subscribed. Thanks for staying with us!" : message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white  md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="grid gap-8 lg:grid-cols-5 lg:gap-12 items-center">
            <div className="lg:col-span-2 lg:order-2">
              <div>
                <form className="space-y-4" onSubmit={handleSubmit} aria-label="Newsletter subscription form">
                  <div>
                    <label htmlFor="email-subscribe" className="sr-only">
                      Enter your email address to subscribe
                    </label>
                    <input
                      id="email-subscribe"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address to subscribe"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]"
                      required
                      aria-required="true"
                      aria-invalid={submitStatus.success === false}
                    />
                  </div>
                  <Button className="w-full bg-[#1E3D8F] hover:bg-[#1E3D8F]/90" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Subscribing..." : "Subscribe Now"}
                  </Button>
                </form>
                {submitStatus.message && (
                  <div
                    id="subscription-status-services"
                    className={`mt-3 p-3 rounded-md text-sm ${submitStatus.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
                    role="alert"
                    aria-live="polite"
                  >
                    {submitStatus.message}
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-3 lg:order-1">
              <p className="text-sm font-medium text-[#1E3D8F] uppercase tracking-wide">Subscribe</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                Stay updated with our latest <span className="text-[#1E3D8F]">cleaning tips</span> and <span className="text-[#1E3D8F]">special offers</span>.
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Join our Melbourne community and receive exclusive cleaning tips, seasonal offers, and updates about our services. No spam, just valuable content for keeping your home spotless.
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Please read <Link href="/about/terms" className="text-[#1E3D8F] hover:text-[#162e6a] underline">Terms and Conditions</Link> before subscribing to the newsletter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
