"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { captureOrderApi, getPaypalPaymentStatus } from "@/lib/api";
import { MailCheck } from "lucide-react";

type PaymentStatus = "PROCESSING" | "PENDING" | "SUCCESS" | "FAILED" | null;
type PaymentType = "DONATION" | "PACKAGE" | null;

export default function CheckoutSuccessClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token_ID = searchParams.get("token");

  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(null);
  const [paymentType, setPaymentType] = useState<PaymentType>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  /* ------------------------------------------------------------------ */
  /* Capture Payment */
  /* ------------------------------------------------------------------ */
  const captureMutation = useMutation({
    mutationFn: async (token: string) => {
      const res = await captureOrderApi(token);
      return res.data;
    },
    onMutate: () => setPaymentStatus("PROCESSING"),
    onSuccess: (res) => {
      const status = res?.data?.payment_status;
      const type = res?.data?.payment_type;

      setPaymentType(type);
      handlePaymentStatus(status);
    },
    onError: () => {
      setPaymentStatus("FAILED");
      stopPolling();
    },
  });

  /* ------------------------------------------------------------------ */
  /* Poll Payment Status */
  /* ------------------------------------------------------------------ */
  const pollPaymentStatus = async () => {
    if (!token_ID) return;

    try {
      const res = await getPaypalPaymentStatus(token_ID);
      const status = res?.data?.data?.payment_status;
      const type = res?.data?.data?.payment_type;

      setPaymentType(type);
      handlePaymentStatus(status);
    } catch (err) {
      console.error(err);
    }
  };

  const startPolling = () => {
    if (pollingRef.current) clearInterval(pollingRef.current);
    pollingRef.current = setInterval(pollPaymentStatus, 5000);
  };

  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  /* ------------------------------------------------------------------ */
  /* Handle Status */
  /* ------------------------------------------------------------------ */
  const handlePaymentStatus = (status: string) => {
    switch (status) {
      case "SUCCESS":
        setPaymentStatus("SUCCESS");
        stopPolling();

        setTimeout(() => setShowEmailModal(true), 800);
        setTimeout(() => router.replace("/"), 5000);
        break;

      case "FAILED":
        setPaymentStatus("FAILED");
        stopPolling();
        break;

      default:
        setPaymentStatus("PENDING");
        startPolling();
        break;
    }
  };

  /* ------------------------------------------------------------------ */
  /* Initial Load */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (!token_ID) return;

    const init = async () => {
      try {
        const res = await getPaypalPaymentStatus(token_ID);
        const status = res?.data?.data?.payment_status;
        const type = res?.data?.data?.payment_type;

        setPaymentType(type);

        if (status === "SUCCESS" || status === "FAILED") {
          handlePaymentStatus(status);
        } else {
          captureMutation.mutate(token_ID);
        }
      } catch {
        captureMutation.mutate(token_ID);
      }
    };

    init();
    return () => stopPolling();
  }, [token_ID]);

  /* ------------------------------------------------------------------ */
  /* UI */
  /* ------------------------------------------------------------------ */
  return (
    <>
      {/* Main Screen */}
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center px-6">
        <div className="bg-[#0a0a15] border border-[#f5f0e8]/10 rounded-lg p-8 text-center w-full max-w-md">
          <h1 className="text-3xl font-bold text-[#f5f0e8] mb-4">
            Finalizing Your Purchase
          </h1>

          <p className="text-[#f5f0e8]/70 mb-6">
            Please don’t close this page. We’re confirming your payment.
          </p>

          {(paymentStatus === "PROCESSING" ||
            paymentStatus === "PENDING") && (
            <div className="animate-spin h-10 w-10 border-b-2 border-[#c9a227] mx-auto mb-4" />
          )}

          {paymentStatus === "FAILED" && (
            <p className="text-red-500 text-sm mt-4">
              Payment failed. Please try again.
            </p>
          )}

          {paymentStatus === "SUCCESS" && (
            <p className="text-green-400 text-sm mt-4">
              Payment successful! Redirecting…
            </p>
          )}
        </div>
      </div>

      {/* Email / Thank You Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative bg-[#0a0a15] border border-[#f5f0e8]/10 rounded-xl p-8 w-full max-w-sm text-center">

            {/* Animated Icon */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2">
              <div className="relative flex items-center justify-center">
                <span className="absolute inline-flex h-20 w-20 rounded-full bg-[#c9a227]/20 animate-ping" />
                <div className="h-16 w-16 rounded-full bg-[#c9a227] flex items-center justify-center animate-bounce">
                  <MailCheck className="text-black w-8 h-8" />
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-[#f5f0e8] mt-10 mb-3">
              {paymentType === "DONATION"
                ? "Thank you for your donation ❤️"
                : "Check your email 📩"}
            </h2>

            <p className="text-[#f5f0e8]/70 text-sm mb-6">
              {paymentType === "DONATION" ? (
                <>
                  We truly appreciate your generous support.
                  <br />
                  Your donation helps us continue our work.
                </>
              ) : (
                <>
                  Your video has been successfully sent to your email.
                  <br />
                  Open the email to watch your video.
                  <br />
                  If you don’t see it within a few minutes, please check your spam folder.
                </>
              )}
            </p>

            <button
              onClick={() => setShowEmailModal(false)}
              className="w-full bg-[#c9a227] hover:bg-[#b8951f] text-black font-medium py-2.5 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
