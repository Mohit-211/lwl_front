"use client";

import { useState } from "react";
import { DonationPaymentApi } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DonateButtonProps {
  showBanner?: boolean; // whether to show banner text with button
}

export default function DonateButton({ showBanner = false }: DonateButtonProps) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isLoggedIn = true; // replace with auth logic

  async function handleDonate() {
    if (!isLoggedIn) {
      toast.info("Please login to continue");
      router.push("/auth/login");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    try {
      setLoading(true);
      const res = await DonationPaymentApi(Number(amount));
      if (!res?.data?.success) throw new Error("Payment failed");
      window.location.href = res.data.data.approveUrl;
    } catch (err: any) {
      toast.error(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Button or Banner */}
      <div
        className={`flex flex-col md:flex-row items-center gap-4 ${showBanner
            ? "cursor-pointer w-max mx-auto bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-8 md:py-1 rounded-xl shadow-lg"
            : ""

          }`}
        onClick={() => showBanner && setOpen(true)}
      >
        {showBanner && (
          <p className="text-lg md:text-2xl font-bold drop-shadow-md text-center md:text-left">
            💛 Did this video impact you? Help us impact others.
          </p>
        )}

        <button
          onClick={(e) => { e.stopPropagation(); setOpen(true); }}
          className={`flex items-center gap-2 rounded-full px-6 py-3 font-bold shadow-lg transition ${showBanner
              ? "bg-white text-yellow-600 hover:scale-105"
              : "bg-gradient-to-r from-yellow-400 to-orange-400 text-black hover:scale-110"
            }`}
        >
          🤝 Donate Now
        </button>
      </div>

      {/* Modal */}
      {open && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
        <div
          className="
            w-full max-w-md rounded-2xl
            bg-[#0b0f1a] border border-yellow-400/20
            p-8 text-white
            animate-modal
          "
        >
            {/* Header */}
            <div className="text-center mb-6">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100 text-2xl">
                💛
              </div>

            <h2 className="text-2xl font-semibold">
              Support Life Worth Living
            </h2>

            <p className="mt-2 text-sm text-white/60">
              Your contribution helps spread this story
              </p>
            </div>

            {/* Amount Input */}
            <div className="relative mb-6">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400 text-lg font-medium">
              ₹
            </span>

              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter donation amount"
              className="
                w-full rounded-xl
                bg-black/40 border border-white/20
                py-4 pl-10 pr-4 text-lg text-white
                placeholder:text-white/40
                focus:outline-none focus:ring-2 focus:ring-yellow-400
              "
              />
            </div>

            {/* Preset Amounts */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[500, 1000, 2500].map((v) => (
                <button
                  key={v}
                  onClick={() => setAmount(String(v))}
                  className="rounded-lg border border-gray-300 py-2 text-sm hover:border-yellow-400 hover:text-yellow-400 transition"
                >
                  ₹{v}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setOpen(false)}
                className="w-1/2 rounded-xl border py-3 font-medium text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDonate}
                disabled={loading}
                className="w-1/2 rounded-xl bg-yellow-400 py-3 font-bold text-black hover:bg-yellow-500 disabled:opacity-60"
              >
                {loading ? "Processing..." : "Donate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
