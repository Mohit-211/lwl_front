"use client";

import { useRef } from "react";
import Hero from "@/components/home/Hero";
import Trailer from "@/components/home/Trailer";
import Description from "@/components/home/Description";
import PricingCards from "@/components/home/PricingCards";
import FAQ from "@/components/home/FAQ";

export default function HomePage() {
  const trailerRef = useRef<HTMLDivElement | null>(null);
  const pricingRef = useRef<HTMLDivElement | null>(null);

  const isLoggedIn =
    typeof window !== "undefined" &&
    !!localStorage.getItem("UserLoginToken");

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Hero
        onScrollToTrailer={() =>
          trailerRef.current?.scrollIntoView({ behavior: "smooth" })
        }
        onSelectProduct={() =>
          pricingRef.current?.scrollIntoView({ behavior: "smooth" })
        }
      />

      <div ref={trailerRef}>
        <Trailer />
      </div>

      <Description />

      <div ref={pricingRef}>
        <PricingCards isLoggedIn={isLoggedIn} />
      </div>

      <FAQ />
    </main>
  );
}
