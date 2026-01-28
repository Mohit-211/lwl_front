"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { captureOrderApi, getPaypalPaymentStatus, GetProfile } from "@/lib/api";

export default function CheckoutSuccessClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token_ID = searchParams.get("token");

  const [paymentStatus, setPaymentStatus] = useState<
    "PROCESSING" | "PENDING" | "SUCCESS" | "FAILED" | null
  >(null);

  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  /* ------------------------------------------------------------------ */
  /* Capture Payment Mutation */
  /* ------------------------------------------------------------------ */
  const captureMutation = useMutation({
    mutationFn: async (token: string) => {
      const res = await captureOrderApi(token);
      return res.data; // { success, status, message, data }
    },
    onMutate: () => {
      setPaymentStatus("PROCESSING");
    },
    onSuccess: (res) => {
      const status = res?.data?.payment_status;
      handlePaymentStatus(status);
    },
    onError: (err) => {
      console.error("Capture failed:", err);
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
      console.log("Polled status:", status);

      handlePaymentStatus(status);
    } catch (err) {
      console.error("Polling error:", err);
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
  /* Handle Payment Status */
  /* ------------------------------------------------------------------ */
  const handlePaymentStatus = (status: string) => {
    switch (status) {
      case "SUCCESS":
        setPaymentStatus("SUCCESS");
        stopPolling();
        setTimeout(() => router.replace("/dashboard"), 1000);
        break;
      case "FAILED":
        setPaymentStatus("FAILED");
        stopPolling();
        break;
      case "PENDING":
      default:
        setPaymentStatus("PENDING");
        startPolling();
        break;
    }
  };

  /* ------------------------------------------------------------------ */
  /* Check Initial Payment Status on Mount */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (!token_ID) return;

    const checkStatusOnLoad = async () => {
      try {
        const res = await getPaypalPaymentStatus(token_ID);
        const status = res?.data?.data?.payment_status;
        console.log("Initial status:", status);

        if (status === "SUCCESS" || status === "FAILED") {
          handlePaymentStatus(status);
        } else {
          // If not completed, capture the order
          captureMutation.mutate(token_ID);
        }
      } catch (err) {
        console.error("Initial status check failed:", err);
        captureMutation.mutate(token_ID);
      }
    };

    checkStatusOnLoad();

    return () => {
      stopPolling();
    };
  }, [token_ID]);
 useEffect(() => {
  if (paymentStatus === "SUCCESS") {
    const fetchProfile = async () => {
      try {
        const profile = await GetProfile();
        console.log("User profile after payment:", profile);
        // You can set state here if needed
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }
}, [paymentStatus]); // Run whenever paymentStatus changes
  /* ------------------------------------------------------------------ */
  /* UI */
  /* ------------------------------------------------------------------ */
  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center px-6">
      <div className="bg-[#0a0a15] border border-[#f5f0e8]/10 rounded-lg p-8 text-center w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#f5f0e8] mb-4">
          Finalizing Your Purchase
        </h1>

        <p className="text-[#f5f0e8]/70 mb-6">
          Please don’t close this page. We’re confirming your payment.
        </p>

        {(paymentStatus === "PROCESSING" || paymentStatus === "PENDING") && (
          <div className="animate-spin h-10 w-10 border-b-2 border-[#c9a227] mx-auto mb-4" />
        )}

        {paymentStatus === "PENDING" && (
          <p className="text-yellow-400 text-sm mt-4">
            Payment is pending. Checking again…
          </p>
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
  );
}
