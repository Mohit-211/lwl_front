"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

interface FAQItem {
  question: string;
  answer: string;
}

/* ------------------------------------------------------------------ */
/* Component */
/* ------------------------------------------------------------------ */

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How long is the Stream Pass valid?",
      answer:
        "72 hours (3 days) from purchase time. The countdown starts immediately when you complete your purchase, not when you press play.",
    },
    {
      question: "Does it start when I press play?",
      answer:
        "No—the 72-hour access window starts at purchase time, not when you begin watching.",
    },
    {
      question: "What's included with Personal Download?",
      answer:
        "You receive an offline downloadable file and a personal use license. This allows you to watch the film on your devices anytime, for personal viewing only.",
    },
    {
      question: "What's included with Group License?",
      answer:
        "A 12-month license for unlimited in-person screenings, plus the film download and a Group License PDF document.",
    },
    {
      question: "Can we stream to remote attendees?",
      answer:
        "No—the Group License only permits in-person screenings. Online streaming or broadcasting requires a separate license. Please contact us for custom arrangements.",
    },
    {
      question: "Can we charge admission?",
      answer:
        "Group License screenings must be free or donation-based only. If you need to charge ticketed admission or use this commercially, a separate license is required.",
    },
    {
      question: "Need help?",
      answer:
        "Email us at support@lifeworthlivingfilm.com and we’ll be happy to assist you.",
    },
  ];

  return (
    <div
      className="py-24 px-6 bg-gradient-to-b from-[#1a1a2e] to-[#0a0a15]"
      id="faq"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#f5f0e8] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-[#f5f0e8]/70">
            Everything you need to know about viewing options
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-[#1a1a2e] border border-[#f5f0e8]/10 rounded-lg overflow-hidden transition-all duration-300 hover:border-[#c9a227]/30"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="text-lg font-medium text-[#f5f0e8] pr-4">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`w-5 h-5 text-[#c9a227] flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <div className="px-6 pb-5 text-[#f5f0e8]/70 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[#f5f0e8]/60 mb-4">Still have questions?</p>
          <a
            href="mailto:support@lifeworthlivingfilm.com"
            className="text-[#c9a227] hover:text-[#a87f1e] font-medium transition-colors"
          >
            support@lifeworthlivingfilm.com
          </a>
        </div>
      </div>
    </div>
  );
}
