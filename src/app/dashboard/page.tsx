"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Clock, Play, Download } from "lucide-react";
import { format, differenceInHours, isPast } from "date-fns";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

interface UserEntitlement {
  product_type: "stream_pass" | "personal_download" | "group_license";
  purchase_date: string;
  access_expires: string | null;
}

/* ------------------------------------------------------------------ */
/* API */
/* ------------------------------------------------------------------ */

const fetchMyEntitlements = async (): Promise<UserEntitlement[]> => {
  const res = await fetch("/api/me/access", {
    credentials: "include",
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
/* Helpers */
/* ------------------------------------------------------------------ */

const PRODUCT_LABELS: Record<UserEntitlement["product_type"], string> = {
  stream_pass: "72-Hour Stream Pass",
  personal_download: "Personal Download",
  group_license: "Group License",
};

/* ------------------------------------------------------------------ */
/* Page */
/* ------------------------------------------------------------------ */

export default function DashboardPage() {
  const router = useRouter();

  const {
    data: entitlements,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["my-entitlements"],
    queryFn: fetchMyEntitlements,
    retry: false,
  });

  // Redirect if logged out
  useEffect(() => {
    if ((error as Error)?.message === "UNAUTHENTICATED") {
      router.replace("/auth/login?redirect=/dashboard");
    }
  }, [error, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-b-2 border-[#c9a227]" />
      </div>
    );
  }

  if (!entitlements || entitlements.length === 0) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center p-6">
        <div className="bg-[#0a0a15] border border-[#f5f0e8]/10 rounded-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-[#f5f0e8] mb-4">
            No Active Packages
          </h1>
          <p className="text-[#f5f0e8]/70 mb-6">
            You haven’t purchased any viewing options yet.
          </p>
          <Button
            onClick={() => router.push("/#pricing")}
            className="bg-[#c9a227] text-[#1a1a2e]"
          >
            View Pricing
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e] px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-[#f5f0e8] mb-10">
          Your Dashboard
        </h1>

        <div className="space-y-6">
          {entitlements.map((item, index) => {
            const isExpired =
              item.access_expires && isPast(new Date(item.access_expires));

            const hoursRemaining = item.access_expires
              ? differenceInHours(new Date(item.access_expires), new Date())
              : null;

            return (
              <div
                key={index}
                className="bg-[#0a0a15] border border-[#f5f0e8]/10 rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
              >
                <div>
                  <h2 className="text-2xl font-semibold text-[#f5f0e8]">
                    {PRODUCT_LABELS[item.product_type]}
                  </h2>

                  <p className="text-sm text-[#f5f0e8]/60 mt-1">
                    Purchased on{" "}
                    {format(new Date(item.purchase_date), "MMM d, yyyy")}
                  </p>

                  {item.access_expires && (
                    <div className="flex items-center gap-2 mt-3 text-sm">
                      <Clock className="w-4 h-4 text-[#c9a227]" />
                      <span
                        className={
                          isExpired ? "text-red-400" : "text-[#c9a227]"
                        }
                      >
                        {isExpired
                          ? "Expired"
                          : `${hoursRemaining} hours remaining`}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  {item.product_type === "stream_pass" && !isExpired && (
                    <Button
                      onClick={() => router.push("/watch")}
                      className="bg-[#c9a227] text-[#1a1a2e]"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Watch
                    </Button>
                  )}

                  {(item.product_type === "personal_download" ||
                    item.product_type === "group_license") && (
                    <Button
                      onClick={() => router.push("/download")}
                      className="bg-[#c9a227] text-[#1a1a2e]"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
