"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { LucideIcon } from "lucide-react";
import { Play, Download, Users, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateOrder, PricingCard } from "@/lib/api";
// import { CreateOrder, GetProfile, PricingCard } from "@/lib/api";

/* ================= TYPES ================= */

type ProductId = "stream_pass" | "personal_download" | "group_license";
interface UserPackage {
  id: number;
  package_id: number;
  is_active: boolean;
  purchase_date: string;
  expiry_date: string | null;
  // package_user: PackageUser;
}
interface Product {
  id: ProductId;
  packageId: string;
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

/* ================= COMPONENT ================= */

export default function PricingCards({ isLoggedIn }: PricingCardsProps) {
  const router = useRouter();
  const [userPackages, setUserPackages] = useState<UserPackage[]>([]);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  /* ================= FETCH PRICING ================= */
  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const res = await GetProfile(); // res: { data: GetProfileResponse }
  //       console.log(res, "profile data");

  //       // Save user packages into state
  //       setUserPackages(res.data.user_package || []);
  //     } catch (err) {
  //       console.error(err, "Error fetching profile");
  //     }
  //   };

  //   fetchProfile();
  // }, []);
  console.log(userPackages, "==>")
  useEffect(() => {
    let isMounted = true;

    async function fetchPricing() {
      try {
        const res = await PricingCard();
        console.log(res, "res")

        if (!res || !res.success || !Array.isArray(res.data)) {
          throw new Error("Invalid pricing response");
        }

        const mapped: Product[] = res.data.map((item: any) => {
          let parsedFeatures: string[] = [];

          try {
            parsedFeatures = item.features
              ? JSON.parse(item.features)
              : [];
          } catch {
            parsedFeatures = [];
          }

          return {
            id:
              item.license_type === "stream"
                ? "stream_pass"
                : item.license_type === "download"
                  ? "personal_download"
                  : "group_license",

            packageId: String(item.id),

            icon:
              item.license_type === "stream"
                ? Play
                : item.license_type === "download"
                  ? Download
                  : Users,

            title: item.name,
            subtitle: item.description || "",

            price: Number(item.price),

            features: parsedFeatures,

            highlight: item.license_type === "download",
          };
        });


        console.log(mapped, "mapped")
        if (isMounted) {
          setProducts(mapped);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load pricing");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchPricing();

    return () => {
      isMounted = false;
    };
  }, []);

  /* ================= PAYPAL ================= */

  async function handlePurchase(product: Product) {
    // if (!isLoggedIn) {
    //   toast.info("Please log in to continue");
    //   router.push("/auth/login");
    //   return;
    // }

    try {
      setProcessingId(product.packageId);
      console.log(product.packageId, "product.packageId")
      const res = await CreateOrder(product.packageId);

      if (!res?.data?.success) {
        throw new Error(res?.data?.message || "Order failed");
      }

      const approveUrl = res.data.data?.approveUrl;

      if (!approveUrl) {
        throw new Error("Missing PayPal approval URL");
      }

      window.location.href = approveUrl;
    } catch (err: any) {
      console.log(err?.response?.data?.message);
      toast.error(err?.message || "Payment failed");
    } finally {
      setProcessingId(null);
    }
  }

  /* ================= UI STATES ================= */

  if (loading) {
    return (
      <div className="py-24 text-center text-[#f5f0e8]">
        Loading pricing options...
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="py-24 text-center text-[#f5f0e8]">
        No pricing options available
      </div>
    );
  }

  const hasAnyPackage = userPackages.length > 0;


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
                key={product.packageId}
                className={`bg-[#0a0a15] border-2 transition-all hover:scale-105 ${product.highlight
                  ? "border-[#c9a227]"
                  : "border-[#f5f0e8]/10"
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
                    <span className="text-sm text-[#f5f0e8]/50 ml-1">
                      CAD
                    </span>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {product.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-[#f5f0e8]/80"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#c9a227]" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handlePurchase(product)}
                    disabled={hasAnyPackage || processingId === product.packageId}
                    className="w-full bg-[#c9a227] text-[#1a1a2e] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {hasAnyPackage
                      ? "Already Subscribed"
                      : processingId === product.packageId
                        ? "Processing..."
                        : "Subscribe"}
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
