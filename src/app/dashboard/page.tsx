"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Download } from "lucide-react";
import { format, differenceInHours, isPast } from "date-fns";
import { GetALlVideos, GetProfile, PricingCard } from "@/lib/api";
import WatchPage from "../watch/page";
import { toast, Toaster } from "sonner";

export default function DashboardPage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [userPackages, setUserPackages] = useState<any[]>([]);
  const [pricingPackages, setPricingPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* ------------------ Fetch Videos ------------------ */
  const fetchVideos = async () => {
    const res = await GetALlVideos();
    setVideos(res?.data || []);
  };

  /* ------------------ Fetch User + Packages ------------------ */
  const fetchUserPackages = async () => {
    const profile = await GetProfile();
    setUserPackages(profile?.data?.user_package || []);

    const pricing = await PricingCard();
    setPricingPackages(pricing?.data || []);
  };

  useEffect(() => {
    Promise.all([fetchVideos(), fetchUserPackages()])
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-b-2 border-[#c9a227]" />
      </div>
    );
  }
  const isDisabled = userPackages?.[0]?.package_user_id === 1;


  return (
    <>
    <Toaster position="top-right" richColors />

      {userPackages.length === 0 ? <WatchPage /> :

        <div className="min-h-screen bg-[#1a1a2e] px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-[#f5f0e8] mb-10">
              Your Dashboard
            </h1>

            {/* ================= PACKAGES ================= */}
            <h2 className="text-3xl font-bold text-[#f5f0e8] mb-6">
              Your Packages
            </h2>

            <div className="space-y-6 mb-12">
              {userPackages.length > 0 && (
                userPackages.map((pkg: any) => {
                  const pricing = pricingPackages.find(
                    (p: any) => p.id === pkg.package_id
                  );

                  const isExpired =
                    pkg.expiry_date && isPast(new Date(pkg.expiry_date));

                  const hoursRemaining = pkg.expiry_date
                    ? differenceInHours(new Date(pkg.expiry_date), new Date())
                    : null;

                  return (
                    <div
                      key={pkg.id}
                      className="bg-[#0a0a15] border border-[#f5f0e8]/10 rounded-lg p-6"
                    >
                      <h3 className="text-2xl font-semibold text-[#f5f0e8]">
                        {pricing?.name || "Package"}
                      </h3>

                      <p className="text-sm text-[#f5f0e8]/60 mt-1">
                        Purchased on{" "}
                        {format(new Date(pkg.purchase_date), "MMM d, yyyy")}
                      </p>

                      {pkg.expiry_date && (
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

                      <p className="text-sm text-[#f5f0e8]/70 mt-2">
                        Price: {pricing?.price} {pricing?.currency}
                      </p>
                    </div>
                  );
                })
              )}
            </div>

            {/* ================= VIDEOS ================= */}
            <h2 className="text-3xl font-bold text-[#f5f0e8] mb-6">
              Your Videos
            </h2>


            {videos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video: any) => {
                  const isDirectVideo =
                    video.video_url?.endsWith(".mp4") ||
                    video.video_url?.endsWith(".mov") ||
                    video.video_url?.endsWith(".webm");

                  return (
                    <div
                      key={video.id}
                      className="bg-[#0a0a15] border border-[#f5f0e8]/10 rounded-xl overflow-hidden"
                    >
                      <h3 className="text-lg font-semibold text-[#f5f0e8] p-4 truncate">
                        {video.title}
                      </h3>

                      {/* Standard 16:9 Video */}
                      <div className="relative w-full aspect-video bg-black">
                        <iframe
                          src={video.video_url}
                          className="absolute inset-0 w-full h-full"
                          allow="autoplay; fullscreen"
                          allowFullScreen
                        />
                      </div>

                      {/* Download */}
                      {/* {video.downloadable && isDirectVideo && (
                  )} */}
                      {/* <div className="p-4">
  <a
    href={isDisabled ? undefined : video.video_url}
    target="_blank"
    rel="noopener noreferrer"
    onClick={(e) => {
      if (isDisabled) e.preventDefault();
    }}
    className={`inline-flex w-full items-center justify-center rounded-md px-4 py-2 font-medium transition
      ${
        isDisabled
          ? "bg-gray-400 text-gray-700 cursor-not-allowed pointer-events-none"
          : "bg-[#c9a227] text-[#1a1a2e] hover:opacity-90"
      }
    `}
  >
    <Download className="w-4 h-4 mr-2" />
    Download
  </a>
</div> */}
                 <div
    onClick={() => toast.success("🚧 Download feature is currently under development")}
      className={`inline-flex w-full items-center justify-center rounded-md px-4 py-2 font-medium transition cursor-pointer
        ${isDisabled
          ? "bg-gray-400 text-gray-600"
          : "bg-[#c9a227] text-[#1a1a2e] hover:opacity-90"}
      `}
    >
      <Download className="w-4 h-4 mr-2" />
      Download
    </div>
   

                      {video.downloadable && !isDirectVideo && (
                        <p className="p-4 text-sm text-[#f5f0e8]/60">
                          Download not available for streaming videos
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-[#f5f0e8]/70">No videos available yet</p>
            )}
          </div>
        </div>
      }
    </>
  );
}
