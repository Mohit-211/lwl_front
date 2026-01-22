"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await apiFetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    setLoading(false);

    if (res.ok) {
      router.push(`/auth/verify-otp?email=${encodeURIComponent(email)}`);
    } else {
      const err = await res.json().catch(() => null);
      alert(err?.message || "Signup failed");
    }
  }

  return (
    <>
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Create your account
      </h1>

      <form onSubmit={handleSignup} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          placeholder="Full name"
          required
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 transition
                     py-3 rounded-lg font-medium disabled:opacity-60"
        >
          {loading ? "Sending OTP..." : "Sign Up"}
        </button>
      </form>

      <p className="text-sm text-gray-400 text-center mt-6">
        Already have an account?{" "}
        <a href="/auth/login" className="text-indigo-400 hover:underline">
          Login
        </a>
      </p>
    </>
  );
}
