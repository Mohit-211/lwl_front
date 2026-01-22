"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

/* ------------------------------------------------------------------ */
/* API */
/* ------------------------------------------------------------------ */

const captureOrder = async (orderId: string) => {
  const res = await fetch("/api/paypal/capture-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ orderId }),
  });

  if (!res.ok) {
    throw new Error("CAPTURE_FAILED");
  }

  return res.json();
};

/* ------------------------------------------------------------------ */
/* Page */
/* ------------------------------------------------------------------ */

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("token");

  const { mutate, isPending } = useMutation({
    mutationFn: captureOrder,
    onSuccess: () => {
      router.replace("/dashboard");
    },
    onError: () => {
      router.replace("/dashboard");
    },
  });

  useEffect(() => {
    if (!orderId) {
      router.replace("/dashboard");
      return;
    }

    mutate(orderId);
  }, [orderId, mutate, router]);

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center px-6">
      <div className="bg-[#0a0a15] border border-[#f5f0e8]/10 rounded-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-[#f5f0e8] mb-4">
          Finalizing Your Purchase
        </h1>

        <p className="text-[#f5f0e8]/70 mb-6">
          Please don’t close this page. We’re confirming your payment.
        </p>

        <div className="animate-spin h-10 w-10 border-b-2 border-[#c9a227] mx-auto" />

        {isPending && (
          <p className="text-xs text-[#f5f0e8]/40 mt-4">Processing securely…</p>
        )}
      </div>
    </div>
  );
}
