"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ContactUsAPI } from "@/lib/api";
import { toast, Toaster } from "sonner";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await ContactUsAPI(name, email, query);
      toast.success("Your message has been sent!");
      setName("");
      setEmail("");
      setQuery("");
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
                    className={`w-5 h-5 text-[#c9a227] flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
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



        <div className="mt-12 text-center max-w-md mx-auto">
           <Toaster position="top-right" richColors />
          <p className="text-[#f5f0e8]/60 mb-4">Still have questions?</p>

          <form
            className="flex flex-col gap-4 bg-[#1a1a1a] p-6 rounded-lg shadow-md"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="px-4 py-2 rounded border border-gray-600 bg-[#0d0d0d] text-white placeholder-gray-400 focus:outline-none focus:border-[#c9a227]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="px-4 py-2 rounded border border-gray-600 bg-[#0d0d0d] text-white placeholder-gray-400 focus:outline-none focus:border-[#c9a227]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <textarea
              name="query"
              placeholder="Your Question / Message"
              rows={4}
              className="px-4 py-2 rounded border border-gray-600 bg-[#0d0d0d] text-white placeholder-gray-400 focus:outline-none focus:border-[#c9a227]"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#c9a227] hover:bg-[#a87f1e] text-black font-medium py-2 rounded transition-colors disabled:opacity-50"
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
