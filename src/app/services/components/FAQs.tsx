"use client";

import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQS: FaqItem[] = [
  {
    question: "How long does a standard clean take?",
    answer:
      "Most regular cleans take 2–4 hours depending on home size and selected tasks. You’ll see the estimated time during booking.",
  },
  {
    question: "Do I need to provide cleaning supplies?",
    answer:
      "No. Our cleaners bring professional products and equipment. If you prefer eco products or have special requests, add that to your booking notes.",
  },
  {
    question: "Can I reschedule or cancel?",
    answer:
      "Yes. You can reschedule or cancel from your confirmation email or by contacting us. Please give 24 hours’ notice to avoid fees.",
  },
  {
    question: "Are your cleaners insured and vetted?",
    answer:
      "Absolutely. All cleaners are identity-checked, background screened and fully insured for your peace of mind.",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#F7FAFF] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Frequently asked questions</h2>
          <p className="mt-3 text-gray-600">Short answers to common questions. Need more help? Contact our team anytime.</p>
        </div>

        <div className="mt-8 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} className="p-4 sm:p-5">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="text-base font-medium text-gray-900">{item.question}</span>
                  <span
                    className={`inline-flex h-6 w-6 items-center justify-center rounded-md border text-gray-600 transition-transform ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="mt-3 text-sm leading-6 text-gray-700">{item.answer}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}




