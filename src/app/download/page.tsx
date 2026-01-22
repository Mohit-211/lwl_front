import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Download as DownloadIcon,
  FileText,
  AlertCircle,
  FileVideo,
  HardDrive,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";

/**
 * ------------------------------------------------------------------
 * LOCAL MOCK AUTH + DATA
 * ------------------------------------------------------------------
 * Swap these with real APIs later
 */

const getCurrentUser = async () => ({
  id: "local-user",
  email: "viewer@example.com",
  name: "Local Viewer",
});

const fetchOrders = async () => {
  const now = new Date();

  return [
    {
      id: "order-personal-1",
      customer_email: "viewer@example.com",
      product_type: "personal_download",
      purchase_date: now,
      price_paid: 19.99,
    },
    {
      id: "order-group-1",
      customer_email: "viewer@example.com",
      product_type: "group_license",
      license_tier: "standard",
      purchase_date: now,
      price_paid: 99.99,
    },
  ];
};

export default function Download() {
  const [user, setUser] = useState(null);
  const [downloadProgress, setDownloadProgress] = useState({});

  // -----------------------------
  // Load user (no auth redirect)
  // -----------------------------
  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  // -----------------------------
  // Load orders
  // -----------------------------
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["my-downloads", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const allOrders = await fetchOrders();
      return allOrders.filter(
        (order) =>
          order.customer_email === user.email &&
          (order.product_type === "personal_download" ||
            order.product_type === "group_license")
      );
    },
    enabled: !!user?.email,
  });

  const getTierLabel = (tier) => {
    const labels = {
      small: "Small (Up to 25 attendees)",
      standard: "Standard (26–100 attendees)",
      large: "Large (101–300 attendees)",
      custom: "Custom (300+)",
    };
    return labels[tier] || tier;
  };

  // -----------------------------
  // Simulated download
  // -----------------------------
  const handleDownload = (orderId, fileType) => {
    const key = `${orderId}-${fileType}`;
    setDownloadProgress((prev) => ({ ...prev, [key]: 0 }));

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        const current = prev[key] ?? 0;
        if (current >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloadProgress((p) => {
              const copy = { ...p };
              delete copy[key];
              return copy;
            });
          }, 1500);
          return prev;
        }
        return { ...prev, [key]: current + 10 };
      });
    }, 200);
  };

  // -----------------------------
  // UI STATES
  // -----------------------------
  if (!user || isLoading) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c9a227] mx-auto mb-4" />
          <p className="text-[#f5f0e8]/70">Loading your downloads...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-[#0a0a15] border-2 border-[#f5f0e8]/10 rounded-lg p-8 text-center">
          <AlertCircle className="w-10 h-10 text-[#c9a227] mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-[#f5f0e8] mb-4">
            No Downloads Available
          </h1>
          <Button
            onClick={() => (window.location.href = "/#pricing")}
            className="bg-[#c9a227] hover:bg-[#a87f1e] text-[#1a1a2e] font-semibold px-8 py-6"
          >
            View Pricing Options
          </Button>
        </div>
      </div>
    );
  }

  // -----------------------------
  // MAIN VIEW
  // -----------------------------
  return (
    <div className="min-h-screen bg-[#1a1a2e] py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-[#f5f0e8]">Your Downloads</h1>

        {orders.map((order) => (
          <Card
            key={order.id}
            className="bg-[#0a0a15] border-2 border-[#f5f0e8]/10"
          >
            <CardHeader>
              <CardTitle className="text-[#f5f0e8]">
                {order.product_type === "personal_download"
                  ? "Personal Download"
                  : "Group License"}
              </CardTitle>
              {order.product_type === "group_license" && (
                <p className="text-sm text-[#c9a227]">
                  {getTierLabel(order.license_tier)}
                </p>
              )}
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Film Download */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileVideo className="text-[#c9a227]" />
                  <div>
                    <p className="text-sm text-[#f5f0e8]">
                      Life Worth Living – Full Film
                    </p>
                    <span className="text-xs text-[#f5f0e8]/50 flex items-center gap-1">
                      <HardDrive className="w-3 h-3" /> ~3.5 GB
                    </span>
                  </div>
                </div>

                <Button
                  size="sm"
                  onClick={() => handleDownload(order.id, "film")}
                  disabled={downloadProgress[`${order.id}-film`] !== undefined}
                >
                  {downloadProgress[`${order.id}-film`] !== undefined ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <DownloadIcon className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {downloadProgress[`${order.id}-film`] !== undefined && (
                <Progress
                  value={downloadProgress[`${order.id}-film`]}
                  className="h-2"
                />
              )}

              {/* Group License PDF */}
              {order.product_type === "group_license" && (
                <div className="pt-3 border-t border-[#f5f0e8]/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="text-[#c9a227]" />
                    <p className="text-sm text-[#f5f0e8]">
                      Group License Certificate (PDF)
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(order.id, "license")}
                  >
                    <DownloadIcon className="w-4 h-4" />
                  </Button>
                </div>
              )}

              <p className="text-xs text-[#f5f0e8]/50">
                Purchased on{" "}
                {format(new Date(order.purchase_date), "MMM d, yyyy")} • $
                {order.price_paid.toFixed(2)} CAD
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
