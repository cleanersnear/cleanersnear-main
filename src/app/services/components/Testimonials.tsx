"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { Button } from "./ui/Button";
// Fallback simple testimonials to avoid external dependency
type Testimonial = { id: number; title: string; review: string; rating: number; name: string; location: string };

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { id: 1, title: 'Brilliant house clean', review: 'They did a fantastic job — spotless kitchen and bathrooms. Will book again!', rating: 5, name: 'Sophie K.', location: 'Brunswick' },
  { id: 2, title: 'Reliable and friendly', review: 'Turned up on time and worked efficiently. Great value for money.', rating: 5, name: 'Mark T.', location: 'Southbank' },
  { id: 3, title: 'End of lease success', review: 'Agent was impressed. Full bond back with no issues. Highly recommend.', rating: 5, name: 'Priya D.', location: 'Carlton' },
  { id: 4, title: 'NDIS support cleaning', review: 'Respectful and thorough. Appreciated the attention to detail.', rating: 5, name: 'Liam W.', location: 'Essendon' },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // Load testimonials data (fallback to defaults)
  useEffect(() => {
    setTestimonials(DEFAULT_TESTIMONIALS);
  }, []);
  
  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);
  
  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const toggleExpanded = (testimonialId: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(testimonialId)) {
      newExpanded.delete(testimonialId);
    } else {
      newExpanded.add(testimonialId);
    }
    setExpandedCards(newExpanded);
  };

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    if (testimonials.length === 0) return;
    
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length, nextTestimonial]);

  if (testimonials.length === 0) {
    return <div>Loading testimonials...</div>;
  }

  const currentTestimonial = testimonials[currentIndex];
  const nextTestimonialData = testimonials[(currentIndex + 1) % testimonials.length];

  const truncateText = (text: string, limit: number) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  return (
    <section className="bg-[#F7FAFF] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
          <div>
            <p className="text-sm font-medium text-[#1E3D8F] uppercase tracking-wide">Customer Testimonials</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              What Our Clients Say About Our Services
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              With over 1,200+ satisfied customers and new 
              testimonials added every week, our reputation as 
              Melbourne&apos;s trusted house cleaners speaks for 
              itself. Your family&apos;s safety and home security 
              are our top priorities.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Interested in finding out more? View our customer testimonials to see what our clients are saying about us.
            </p>
            
            <div className="mt-8 text-center">
              <div className="flex justify-center items-center mt-2 gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-center gap-2 text-gray-700">
                <Image src="/icons/google-icon.png" alt="Google icon" width={20} height={20} />
                <span className="text-sm">4.7</span>
                <div className="flex">
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-gray-300">★</span>
                </div>
                <span className="text-sm text-gray-500">(2,76)</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="flex gap-4 overflow-hidden">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 min-w-0 flex-1 h-72 flex flex-col">
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className={`w-4 h-4 ${star <= currentTestimonial.rating ? 'text-[#1E3D8F]' : 'text-gray-300'} fill-current`} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{currentTestimonial.title}</h3>
                <div className="flex-1 overflow-hidden">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {expandedCards.has(currentTestimonial.id) 
                      ? currentTestimonial.review 
                      : truncateText(currentTestimonial.review, 100)
                    }
                  </p>
                  {currentTestimonial.review.length > 100 && (
                    <button
                      onClick={() => toggleExpanded(currentTestimonial.id)}
                      className="mt-2 text-xs text-[#1E3D8F] hover:text-[#162e6a] underline"
                    >
                      {expandedCards.has(currentTestimonial.id) ? 'Show less' : 'Read more'}
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200">
                  <div className="w-10 h-10 bg-[#1E3D8F] rounded-full flex items-center justify-center text-white font-semibold">
                    {currentTestimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{currentTestimonial.name}</p>
                    <p className="text-xs text-gray-500">{currentTestimonial.location}</p>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex bg-gray-50 rounded-xl p-6 border border-gray-100 min-w-0 flex-1 opacity-60 h-72 flex-col">
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className={`w-4 h-4 ${star <= nextTestimonialData.rating ? 'text-[#1E3D8F]' : 'text-gray-300'} fill-current`} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{nextTestimonialData.title}</h3>
                <div className="flex-1 overflow-hidden">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {truncateText(nextTestimonialData.review, 100)}
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200">
                  <div className="w-10 h-10 bg-[#1E3D8F] rounded-full flex items-center justify-center text-white font-semibold">
                    {nextTestimonialData.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{nextTestimonialData.name}</p>
                    <p className="text-xs text-gray-500">{nextTestimonialData.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                onClick={prevTestimonial}
                className="flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Previous testimonial"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

               <div className="flex gap-2">
                 {testimonials.map((_, index) => (
                   <button
                     key={index}
                     onClick={() => setCurrentIndex(index)}
                     className={`w-2 h-2 rounded-full transition-colors ${
                       index === currentIndex ? 'bg-[#1E3D8F]' : 'bg-gray-300'
                     }`}
                     aria-label={`Go to testimonial ${index + 1}`}
                   />
                 ))}
               </div>

              <button
                onClick={nextTestimonial}
                className="flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Next testimonial"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="mt-6 text-center">
              <Link href="/reviews">
                <Button variant="outline" size="md">
                  View All Reviews
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
