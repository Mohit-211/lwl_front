"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Clock, AlertCircle } from "lucide-react";
import { format, differenceInHours, isPast } from "date-fns";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

interface StreamAccess {
  purchase_date: string;
  access_expires: string;
}

/* ------------------------------------------------------------------ */
/* API helpers */
/* ------------------------------------------------------------------ */

const fetchStreamAccess = async (): Promise<StreamAccess | null> => {
  const res = await fetch("/api/access/stream", {
    credentials: "include",
  });

  if (res.status === 401) {
    throw new Error("UNAUTHENTICATED");
  }

  if (!res.ok) {
    return null;
  }

  return res.json();
};

/* ------------------------------------------------------------------ */
/* Page */
/* ------------------------------------------------------------------ */

export default function WatchPage() {
  const router = useRouter();
  const [accessExpired, setAccessExpired] = useState(false);

  const {
    data: access,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["stream-access"],
    queryFn: fetchStreamAccess,
    retry: false,
  });

  // --------------------------------------------------
  // Auth redirect
  // --------------------------------------------------
  useEffect(() => {
    if ((error as Error)?.message === "UNAUTHENTICATED") {
      router.replace("/auth/login?redirect=/watch");
    }
  }, [error, router]);

  // --------------------------------------------------
  // Expiry monitor
  // --------------------------------------------------
  useEffect(() => {
    if (!access) return;

    const expiresAt = new Date(access.access_expires);

    const interval = setInterval(() => {
      if (isPast(expiresAt)) {
        setAccessExpired(true);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [access]);

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-b-2 border-[#c9a227]" />
      </div>
    );
  }

  // --------------------------------------------------
  // No access
  // --------------------------------------------------
  if (!access || accessExpired) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center p-6">
        <div className="max-w-2xl bg-[#0a0a15] border-2 border-[#c9a227]/30 rounded-lg p-8 text-center">
          <AlertCircle className="w-10 h-10 text-[#c9a227] mx-auto mb-4" />

          <h1 className="text-3xl font-bold text-[#f5f0e8] mb-4">
            {accessExpired
              ? "Your Viewing Window Has Expired"
              : "No Active Stream Pass"}
          </h1>

          <p className="text-[#f5f0e8]/70 mb-8">
            Purchase a new Stream Pass to watch Life Worth Living.
          </p>

          <Button
            onClick={() => router.push("/#pricing")}
            className="bg-[#c9a227] text-[#1a1a2e] px-8 py-6"
          >
            Get Stream Pass — $7.99 CAD
          </Button>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // Active access
  // --------------------------------------------------
  const expiresAt = new Date(access.access_expires);
  const hoursRemaining = differenceInHours(expiresAt, new Date());

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <div className="bg-[#0a0a15] border-b border-[#f5f0e8]/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#f5f0e8]">
              Life Worth Living
            </h1>
            <p className="text-sm text-[#f5f0e8]/60">
              Full Feature Documentary
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#1a1a2e] px-4 py-2 rounded-lg border border-[#c9a227]/30">
            <Clock className="w-4 h-4 text-[#c9a227]" />
            <p className="text-sm font-semibold text-[#c9a227]">
              {hoursRemaining} hours remaining
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="aspect-video bg-[#0a0a15] rounded-lg overflow-hidden border border-[#c9a227]/20">
          <iframe
            src="https://player.vimeo.com/video/YOUR_VIMEO_ID"
            className="w-full h-full"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>

        <div className="mt-8 text-sm text-[#f5f0e8]/70">
          <p>
            Purchased:{" "}
            {format(new Date(access.purchase_date), "MMM d, yyyy h:mm a")}
          </p>
          <p>
            Expires:{" "}
            {format(new Date(access.access_expires), "MMM d, yyyy h:mm a")}
          </p>
        </div>
      </div>
    </div>
  );
}
