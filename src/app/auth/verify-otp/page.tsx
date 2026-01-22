"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function VerifyOtpPage() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await apiFetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/auth/login");
    } else {
      const err = await res.json().catch(() => null);
      alert(err?.message || "Invalid OTP");
    }
  }

  return (
    <>
      <h1 className="text-2xl font-semibold mb-2 text-center">Verify OTP</h1>
      <p className="text-sm text-gray-400 text-center mb-6">Sent to {email}</p>

      <form onSubmit={handleVerify} className="space-y-4">
        <input
          type="text"
          placeholder="6-digit OTP"
          maxLength={6}
          required
          className="w-full text-center tracking-widest text-lg px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 transition py-3 rounded-lg font-medium"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </>
  );
}
