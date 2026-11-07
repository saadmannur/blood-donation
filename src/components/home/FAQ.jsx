"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How can I become a blood donor?",
    answer:
      "Create an account, select the donor role, complete your donor profile, and wait for administrator verification.",
  },
  {
    question: "How can I request blood?",
    answer:
      "Register as a patient or requester, open your dashboard, and submit a blood request with the required information.",
  },
  {
    question: "How does the donor matching system work?",
    answer:
      "The system searches verified, available donors based on blood compatibility, location, and eligibility criteria.",
  },
  {
    question: "Will donors receive notifications?",
    answer:
      "Yes. Matching donors receive email notifications when a suitable emergency blood request is submitted.",
  },
  {
    question: "Can I update my donor availability?",
    answer:
      "Yes. Donors can update their availability status from their dashboard at any time.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            FAQ
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-gray-500">
            Find answers to common questions about our platform.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white"
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-semibold text-gray-900">
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-emerald-600 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm leading-7 text-gray-500">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;