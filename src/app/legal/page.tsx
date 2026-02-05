import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-[#1a1a2e] text-[#f5f0e8]">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#c9a227] hover:text-[#a87f1e] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-12">
          Legal Information
        </h1>

        {/* Terms of Service */}
        <section className="mb-16" id="terms">
          <h2 className="text-3xl font-bold text-[#c9a227] mb-6">
            Terms of Service
          </h2>

          <div className="space-y-6 text-[#f5f0e8]/80 leading-relaxed">
            <h3 className="text-xl font-semibold text-[#f5f0e8] mt-8">
              1. Acceptance of Terms
            </h3>
            <p>
              By purchasing and accessing &quot;Life Worth Living&quot; (the
              &quot;Film&quot;), you agree to be bound by these Terms of
              Service. If you do not agree to these terms, please do not make a
              purchase.
            </p>

            <h3 className="text-xl font-semibold text-[#f5f0e8] mt-8">
              2. License Types
            </h3>

            <h4 className="text-lg font-semibold text-[#f5f0e8] mt-6">
              72-Hour Stream Pass
            </h4>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Grants 72-hour streaming access from time of purchase</li>
              <li>Permitted for personal or group viewing only</li>
              <li>
                Access expires exactly 72 hours after purchase, regardless of
                when playback begins
              </li>
              <li>No recording, downloading, or redistribution permitted</li>
            </ul>

            <h4 className="text-lg font-semibold text-[#f5f0e8] mt-6">
              Personal Download
            </h4>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Grants personal use license for downloaded file</li>
              <li>For private, non-commercial viewing only</li>
              <li>
                May not be shared, uploaded, broadcast, or publicly screened
              </li>
              <li>
                May not be edited, modified, or used to create derivative works
              </li>
            </ul>

            <h4 className="text-lg font-semibold text-[#f5f0e8] mt-6">
              Group License
            </h4>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Valid for 12 months from purchase date</li>
              <li>
                Limited to in-person screenings only (no streaming or
                broadcasting)
              </li>
              <li>Audience size must not exceed purchased tier limit</li>
              <li>
                Screenings must be free or donation-based unless separate
                commercial license obtained
              </li>
              <li>
                License is non-transferable and limited to purchasing
                organization
              </li>
              <li>May not edit, modify, or create derivative works</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#f5f0e8] mt-8">
              3. Prohibited Uses
            </h3>
            <p>You may not:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Upload, stream, broadcast, or redistribute the Film in any
                format
              </li>
              <li>Record the Film during playback</li>
              <li>Share your access credentials with others</li>
              <li>
                Use the Film for commercial purposes without proper licensing
              </li>
              <li>Edit, remix, or create derivative works</li>
              <li>
                Remove or alter any credits, watermarks, or copyright notices
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-[#f5f0e8] mt-8">
              4. Intellectual Property
            </h3>
            <p>
              All content, including but not limited to the Film, images, text,
              and trademarks, are owned by Xs in the Sky Films and the
              Euthanasia Prevention Coalition. All rights reserved.
            </p>

            <h3 className="text-xl font-semibold text-[#f5f0e8] mt-8">
              5. Limitation of Liability
            </h3>
            <p>
              The Film is provided &quot;as is&quot; without warranties of any
              kind. We are not liable for any technical issues, access problems,
              or damages arising from use of the Film or this website.
            </p>
          </div>
        </section>

        {/* Privacy Policy */}
        <section className="mb-16" id="privacy">
          <h2 className="text-3xl font-bold text-[#c9a227] mb-6">
            Privacy Policy
          </h2>

          <div className="space-y-6 text-[#f5f0e8]/80 leading-relaxed">
            <h3 className="text-xl font-semibold text-[#f5f0e8] mt-8">
              Information We Collect
            </h3>
            <p>When you make a purchase, we collect:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Name and email address</li>
              <li>Purchase information and transaction details</li>
              <li>Access logs for streaming (to enforce license terms)</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#f5f0e8] mt-8">
              How We Use Your Information
            </h3>
            <p>We use your information to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Process your purchase and deliver access to the Film</li>
              <li>Send order confirmations and access instructions</li>
              <li>Enforce license terms and prevent unauthorized use</li>
              <li>Respond to support inquiries</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#f5f0e8] mt-8">
              Information Sharing
            </h3>
            <p>
              We do not sell or share your personal information with third
              parties for marketing purposes. We may share information with
              service providers necessary to deliver the Film and process
              payments.
            </p>

            <h3 className="text-xl font-semibold text-[#f5f0e8] mt-8">
              Data Security
            </h3>
            <p>
              We implement reasonable security measures to protect your personal
              information. However, no internet transmission is completely
              secure, and we cannot guarantee absolute security.
            </p>

            <h3 className="text-xl font-semibold text-[#f5f0e8] mt-8">
              Your Rights
            </h3>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Request access to your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>
                Request deletion of your information (subject to legal
                obligations)
              </li>
            </ul>
            <p className="mt-4">
              To exercise these rights, contact us at
              info@epcc.ca
            </p>
          </div>
        </section>

        {/* Refund Policy */}
        <section className="mb-16" id="refund">
          <h2 className="text-3xl font-bold text-[#c9a227] mb-6">
            Refund Policy
          </h2>

          <div className="space-y-6 text-[#f5f0e8]/80 leading-relaxed">
            <h3 className="text-xl font-semibold text-[#f5f0e8] mt-8">
              72-Hour Stream Pass
            </h3>
            <p>
              Due to the immediate digital nature of streaming access, refunds
              are available only if:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Technical issues prevent you from accessing the Film</li>
              <li>The refund is requested within 24 hours of purchase</li>
              <li>You have not watched more than 10% of the Film</li>
            </ul>
            <p className="mt-4">
              Refund requests must be submitted to
              info@epcc.ca with your order details.
            </p>

            <h3 className="text-xl font-semibold text-[#f5f0e8] mt-8">
              Personal Download
            </h3>
            <p>Refunds are available only if:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                The download link is non-functional or the file is corrupted
              </li>
              <li>The refund is requested within 48 hours of purchase</li>
              <li>You have not accessed or downloaded the file</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#f5f0e8] mt-8">
              Group License
            </h3>
            <p>Refunds are available only if:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Requested within 7 days of purchase</li>
              <li>
                You have not downloaded the Film or conducted any screenings
              </li>
              <li>Technical issues prevent access and cannot be resolved</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#f5f0e8] mt-8">
              Refund Process
            </h3>
            <p>
              To request a refund, email info@epcc.ca with:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Your order number and email used for purchase</li>
              <li>Reason for refund request</li>
              <li>Any relevant technical details or screenshots</li>
            </ul>
            <p className="mt-4">
              Approved refunds will be processed to the original payment method
              within 5-10 business days.
            </p>

            <h3 className="text-xl font-semibold text-[#f5f0e8] mt-8">
              No Refunds After Use
            </h3>
            <p>
              Once you have watched the Film or conducted a screening, all sales
              are final. Please ensure you understand the license terms before
              purchasing.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="border-t border-[#f5f0e8]/10 pt-8">
          <h3 className="text-xl font-semibold text-[#f5f0e8] mb-4">
            Questions?
          </h3>
          <p className="text-[#f5f0e8]/70">
            For questions about these policies, contact us at{" "}
            <a
              href="mailto:info@epcc.ca"
              className="text-[#c9a227] hover:text-[#a87f1e]"
            >
              info@epcc.ca
            </a>
          </p>
          <p className="text-[#f5f0e8]/50 text-sm mt-4">
            Last updated: January 2026
          </p>
        </section>
      </div>
    </div>
  );
}
