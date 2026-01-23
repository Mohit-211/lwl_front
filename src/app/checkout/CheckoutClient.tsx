"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

type ProductId = "stream_pass" | "personal_download" | "group_license";

interface CreateOrderResponse {
  approvalUrl: string;
}

/* ------------------------------------------------------------------ */
/* API */
/* ------------------------------------------------------------------ */

const createPaypalOrder = async (
  product: ProductId
): Promise<CreateOrderResponse> => {
  const res = await fetch("/api/paypal/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ product }),
  });

  if (res.status === 401) {
    throw new Error("UNAUTHENTICATED");
  }

  if (!res.ok) {
    throw new Error("FAILED");
  }

  return res.json();
};

/* ------------------------------------------------------------------ */
/* Page */
/* ------------------------------------------------------------------ */

export default function CheckoutClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const product = searchParams.get("product") as ProductId | null;

  const { mutate, isPending, error } = useMutation({
    mutationFn: createPaypalOrder,
    onSuccess: (data) => {
      window.location.href = data.approvalUrl;
    },
  });

  // --------------------------------------------------
  // Validate product
  // --------------------------------------------------
  useEffect(() => {
    if (!product) {
      router.replace("/#pricing");
    }
  }, [product, router]);

  // --------------------------------------------------
  // Auth redirect
  // --------------------------------------------------
  useEffect(() => {
    if ((error as Error)?.message === "UNAUTHENTICATED") {
      router.replace(`/auth/login?redirect=/checkout?product=${product}`);
    }
  }, [error, router, product]);

  if (!product) return null;

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-[#0a0a15] border border-[#f5f0e8]/10 rounded-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-[#f5f0e8] mb-4">
          Secure Checkout
        </h1>

        <p className="text-[#f5f0e8]/70 mb-8">
          You’ll be redirected to PayPal to complete your purchase.
        </p>

        <Button
          onClick={() => mutate(product)}
          disabled={isPending}
          className="w-full bg-[#c9a227] text-[#1a1a2e] py-6 font-semibold"
        >
          {isPending ? "Redirecting to PayPal..." : "Continue to PayPal"}
        </Button>

        <p className="text-xs text-[#f5f0e8]/40 mt-6">
          Payments are processed securely by PayPal.
        </p>
      </div>
    </div>
  );
}
