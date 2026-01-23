"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserLoginAPI } from "@/lib/api";

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  /* ================= EMAIL VALIDATION ================= */
  const isValidEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  /* ================= LOGIN HANDLER ================= */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmailError(null);
    setLoading(true);
    setMessage(null);

    try {
      const res = await UserLoginAPI(email, password);

      if (res.status === 200 || res.data?.status === 200) {
        const token = res.data.data.tokens.access.token;
        localStorage.setItem("UserLoginToken", token);

        setMessage("Login successful 🎉");

        setTimeout(() => {
          router.push(redirect);
          router.refresh();
        }, 1000);
      }
    } catch (err: any) {
      if (
        err?.response?.data?.message ===
        "User is not verified yet.Please verify Your Otp First"
      ) {
        setTimeout(() => {
          router.push(`/auth/verify-otp?email=${encodeURIComponent(email)}`);
        }, 2000);
      }

      setMessage(err?.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold mb-6 text-center">Welcome back</h1>

      {/* GLOBAL MESSAGE */}
      {message && (
        <div className="mb-4 text-sm text-center text-red-400">{message}</div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        {/* ================= EMAIL ================= */}
        <div>
          <input
            type="email"
            placeholder="Email address"
            required
            className={`w-full px-4 py-3 rounded-lg bg-gray-800 border
              ${emailError ? "border-red-500" : "border-gray-700"}
              focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError(null);
            }}
          />

          {emailError && (
            <p className="text-xs text-red-400 mt-1">⚠️ {emailError}</p>
          )}
        </div>

        {/* ================= PASSWORD ================= */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            className="w-full px-4 py-3 pr-12 rounded-lg bg-gray-800 border border-gray-700
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2
                       text-sm text-gray-400 hover:text-gray-200"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* ================= BUTTON ================= */}
        <button
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 transition
                     py-3 rounded-lg font-medium disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* ================= FOOTER ================= */}
      <p className="text-sm text-gray-400 text-center mt-6">
        Don’t have an account?{" "}
        <a href="/auth/signup" className="text-indigo-400 hover:underline">
          Signup
        </a>
      </p>
    </>
  );
}
