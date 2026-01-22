"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Play, Download, Users, CheckCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

type ProductId = "stream_pass" | "personal_download" | "group_license";

interface Product {
  id: ProductId;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  price: number;
  features: string[];
  highlight: boolean;
}

interface PricingCardsProps {
  isLoggedIn: boolean;
}

/* ------------------------------------------------------------------ */

export default function PricingCards({ isLoggedIn }: PricingCardsProps) {
  const router = useRouter();

  const products: Product[] = [
    {
      id: "stream_pass",
      icon: Play,
      title: "72-Hour Stream Pass",
      subtitle: "Personal or Group Viewing",
      price: 7.99,
      features: [
        "Stream on this site",
        "Starts immediately after purchase",
        "Expires 72 hours after purchase",
        "Permitted: personal or group viewing",
      ],
      highlight: false,
    },
    {
      id: "personal_download",
      icon: Download,
      title: "Download",
      subtitle: "Personal Use",
      price: 11.99,
      features: [
        "Download to your device",
        "Watch anytime offline",
        "Personal use license",
        "Instant access",
      ],
      highlight: true,
    },
    {
      id: "group_license",
      icon: Users,
      title: "Group License",
      subtitle: "Annual Internal (12 months)",
      price: 49.99,
      features: [
        "Download for in-person screenings",
        "Unlimited screenings for 12 months",
        "For organizational use",
        "Includes Group License PDF",
      ],
      highlight: false,
    },
  ];

  const handlePurchaseClick = (productId: ProductId) => {
    if (!isLoggedIn) {
      toast.info("Please log in to continue");
      router.push(`/auth/login?redirect=/checkout?product=${productId}`);
      return;
    }

    router.push(`/checkout?product=${productId}`);
  };

  return (
    <div className="py-24 px-6 bg-[#1a1a2e]" id="pricing">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#f5f0e8] mb-4">
            Viewing Options
          </h2>
          <p className="text-lg text-[#f5f0e8]/70">
            Choose how you'd like to experience Life Worth Living
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => {
            const Icon = product.icon;

            return (
              <Card
                key={product.id}
                className={`bg-[#0a0a15] border-2 transition-all hover:scale-105 ${
                  product.highlight ? "border-[#c9a227]" : "border-[#f5f0e8]/10"
                }`}
              >
                <CardHeader>
                  <div className="p-3 bg-[#c9a227]/10 rounded-lg w-fit mb-4">
                    <Icon className="w-6 h-6 text-[#c9a227]" />
                  </div>

                  <CardTitle className="text-2xl text-[#f5f0e8]">
                    {product.title}
                  </CardTitle>

                  <CardDescription className="text-[#f5f0e8]/60">
                    {product.subtitle}
                  </CardDescription>

                  <div className="mt-4">
                    <span className="text-4xl font-bold text-[#c9a227]">
                      ${product.price}
                    </span>
                    <span className="text-sm text-[#f5f0e8]/50 ml-1">CAD</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {product.features.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-[#f5f0e8]/80"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#c9a227]" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handlePurchaseClick(product.id)}
                    className="w-full bg-[#c9a227] text-[#1a1a2e]"
                  >
                    Subscribe
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
