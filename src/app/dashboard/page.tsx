"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle2,
  Clock,
  Download,
  PlayCircle,
} from "lucide-react";
import { format, differenceInHours, isPast } from "date-fns";
import { DownloadVimeoVideos, GetALlVideos, GetProfile, PricingCard } from "@/lib/api";
import WatchPage from "../watch/page";
import { toast, Toaster } from "sonner";
import DonateButton from "@/components/DonateButton/DonateButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/* ================= TYPES ================= */

interface Product {
  id: number;
  name: string;
  title?: string;
  description?: string;
  price: number;
  currency?: string;
  features?: string[];
}

/* ================= COMPONENT ================= */

export default function DashboardPage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [userPackages, setUserPackages] = useState<any[]>([]);
  const [pricingPackages, setPricingPackages] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<Product | null>(null);

  /* ---------------- FETCH DATA ---------------- */

  useEffect(() => {
    Promise.all([
      GetALlVideos().then((res) => setVideos(res?.data || [])),
      GetProfile().then((res) =>
        setUserPackages(res?.data?.user_package || [])
      ),
      PricingCard().then((res) =>
        setPricingPackages(res?.data || [])
      ),
    ])
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#141428] flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-[#c9a227]" />
      </div>
    );
  }

  const isDisabled = userPackages?.[0]?.package_user_id === 1;

  const getPricingForPackage = (pkg: any) =>
    pricingPackages.find((p) => p.id === pkg.package_id) || null;
const handleDownload = async (vimeo_ID: string) => {
  try {
    const response = await DownloadVimeoVideos(vimeo_ID);

    const blob = new Blob([response.data], {
      type: "video/mp4",
    });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `vimeo-${vimeo_ID}.mp4`;
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed:", error);
  }
};

  return (
    <>
      <Toaster position="top-right" richColors />

      {userPackages.length === 0 ? (
        <WatchPage />
      ) : (
        <div className="min-h-screen bg-gradient-to-b from-[#181830] to-[#101020] px-6 py-16">
          <div className="max-w-7xl mx-auto">

            {/* ================= DASHBOARD HEADER ================= */}
            <div className="mb-20">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-semibold text-[#f5f0e8] tracking-tight">
                    Dashboard
                  </h1>
                  <p className="mt-4 text-[#f5f0e8]/60 max-w-2xl leading-relaxed">
                    Manage your subscriptions, explore your purchased content,
                    and continue watching your exclusive videos.
                  </p>
                </div>
                <DonateButton />
              </div>

              <div className="mt-8 h-px w-full bg-gradient-to-r from-[#c9a227]/40 to-transparent" />
            </div>

            {/* ================= PACKAGES ================= */}
            <section className="mb-24">
              <h2 className="text-2xl font-semibold text-[#f5f0e8] mb-10">
                Your Packages
              </h2>

              <div className="space-y-8">
                {userPackages.map((pkg: any) => {
                  const pricing = getPricingForPackage(pkg);
                  if (!pricing) return null;

                  const isExpired =
                    pkg.expiry_date && isPast(new Date(pkg.expiry_date));

                  const hoursRemaining = pkg.expiry_date
                    ? differenceInHours(
                      new Date(pkg.expiry_date),
                      new Date()
                    )
                    : null;

                  return (
                    <div
                      key={pkg.id}
                      className="
                        w-full md:w-1/2
                        bg-white/5
                        backdrop-blur-xl
                        border border-white/10
                        rounded-2xl
                        p-8
                        shadow-[0_10px_30px_rgba(0,0,0,0.35)]
                        relative
                      "
                    >
                      <span
                        className={`absolute top-4 right-4 text-xs font-medium px-3 py-1 rounded-full ${isExpired
                          ? "bg-red-500/15 text-red-400"
                          : "bg-green-500/15 text-green-400"
                          }`}
                      >
                        {isExpired ? "Expired" : "Active"}
                      </span>

                      <h3 className="text-2xl font-semibold text-[#f5f0e8]">
                        {pricing.name}
                      </h3>

                      <p className="text-sm text-[#f5f0e8]/60 mt-2">
                        Purchased on{" "}
                        {format(new Date(pkg.purchase_date), "MMMM d, yyyy")}
                      </p>

                      {!isExpired && hoursRemaining !== null && (
                        <div className="flex items-center gap-2 mt-5 text-sm text-[#c9a227]">
                          <Clock className="w-4 h-4" />
                          {hoursRemaining} hours remaining
                        </div>
                      )}

                      <div className="mt-8 flex items-center justify-between">
                        <div className="text-3xl font-semibold text-[#f5f0e8]">
                          {pricing.price}
                          <span className="ml-1 text-sm text-[#f5f0e8]/60">
                            {pricing.currency || "CAD"}
                          </span>
                        </div>


                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ================= VIDEOS ================= */}
            <DonateButton showBanner={true} />
            <section>
              <h2 className="text-2xl font-semibold text-[#f5f0e8] mb-10">
                Video Library
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map((video: any) => (
                  <div
                    key={video.id}
                    className="
                      bg-white/5
                      backdrop-blur-xl
                      border border-white/10
                      rounded-2xl
                      overflow-hidden
                      shadow-[0_10px_30px_rgba(0,0,0,0.35)]
                    "
                  >
                    <div className="relative aspect-video bg-black">
                      <iframe
                        src={video.video_url}
                        className="absolute inset-0 w-full h-full"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                      />
                      <PlayCircle className="absolute inset-0 m-auto w-14 h-14 text-white/25 pointer-events-none" />
                    </div>

                    <div className="p-5">
                      <h3 className="text-sm font-medium text-[#f5f0e8] truncate mb-5">
                        {video.title}
                      </h3>

                      <button
                        onClick={() =>
                          handleDownload(video.vimeo_video_id)
                        }
                        className={`w-full flex items-center justify-center gap-2 py-3 rounded-md text-sm font-medium transition ${isDisabled
                          ? "bg-gray-600/40 text-gray-400 cursor-not-allowed"
                          : "bg-[#c9a227] text-[#1a1a2e] hover:bg-[#b79a20] cursor-pointer"
                          }`}
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      )}


      {/* ================= PACKAGE MODAL ================= */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#121225] rounded-2xl p-8 max-w-md w-full border border-white/10 relative">
            <button
              onClick={() => setSelectedPackage(null)}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              ✕
            </button>

            <Card className="bg-transparent border-none shadow-none">
              <CardHeader>
                <CardTitle className="text-xl text-[#f5f0e8]">
                  {selectedPackage.title || selectedPackage.name}
                </CardTitle>
                <CardDescription className="text-[#f5f0e8]/60">
                  {selectedPackage.description}
                </CardDescription>

                <div className="mt-5 text-3xl font-semibold text-[#c9a227]">
                  {selectedPackage.price}{" "}
                  <span className="text-sm">
                    {selectedPackage.currency || "CAD"}
                  </span>
                </div>
              </CardHeader>

              <CardContent>
                {selectedPackage.features?.map((feature, i) => (
                  <div
                    key={i}
                    className="flex gap-2 text-sm text-[#f5f0e8]/80 mb-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#c9a227]" />
                    {feature}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
