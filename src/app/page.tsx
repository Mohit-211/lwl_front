"use client";

import { useRef, useState } from "react";

import Hero from "@/components/home/Hero";
import Trailer from "@/components/home/Trailer";
import Description from "@/components/home/Description";
import PricingCards from "@/components/home/PricingCards";
import FAQ from "@/components/home/FAQ";
// import Footer from "@/components/home/Footer";

export default function HomePage() {
  const trailerRef = useRef<HTMLDivElement | null>(null);
  const pricingRef = useRef<HTMLDivElement | null>(null);

  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const scrollToTrailer = () => {
    trailerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProduct(productId);

    // Small delay to ensure state settles before scroll
    setTimeout(() => {
      pricingRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Hero
        onScrollToTrailer={scrollToTrailer}
        onSelectProduct={handleSelectProduct}
      />

      <div ref={trailerRef}>
        <Trailer />
      </div>

      <Description />

      <div ref={pricingRef}>
        <PricingCards
          selectedProduct={selectedProduct}
          onClearSelection={() => setSelectedProduct(null)}
        />
      </div>

      <FAQ />
      {/* <Footer /> */}
    </main>
  );
}
