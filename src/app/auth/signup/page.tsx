"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserRegisterAPI } from "@/lib/api";
export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<
    "success" | "error" | null
  >(null);
  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    // 🔒 Frontend validation
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setMessageType("error");
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const res = await UserRegisterAPI(
        name,
        email,
        mobile,
        password,
        confirmPassword
      );
      console.log(res)
      if (res.data?.status === 200 || res.status === 201) {
        setMessage("Account created successfully. Please verify OTP.");
        setMessageType("success");
        setTimeout(() => {
          router.push(
            `/auth/verify-otp?email=${encodeURIComponent(email)}`
          );
        }, 2000);
      }
    } catch (error: any) {
      setMessage(
        error?.response?.data?.message || "Signup failed. Please try again."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Create your account
      </h1>
      {/* MESSAGE BOX */}
      {message && (
        <div
          className={`mb-4 flex items-center gap-2 rounded-lg px-4 py-3 text-sm
          ${messageType === "success"
              ? "bg-green-900/30 text-green-400"
              : "bg-red-900/30 text-red-400"
            }`}
        >
          <span>
            {messageType === "success" ? "✅" : "⚠️"}
          </span>
          <span>{message}</span>
        </div>
      )}
      <form onSubmit={handleSignup} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          required
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          required
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Mobile */}
        <input
          type="tel"
          placeholder="Mobile Number"
          required
          maxLength={10}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700
             focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={mobile}
          onChange={(e) => {
            // Allow only digits
            const onlyNums = e.target.value.replace(/\D/g, "");
            setMobile(onlyNums);
          }}
        />
        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700
             focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700
             focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
          >
            {/* {showConfirmPassword ? "Hide" : "Show"} */}
            {showConfirmPassword ? "🙈" : "👁️"}
          </button>
        </div>
        <button
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 transition
                     py-3 rounded-lg font-medium disabled:opacity-60"
        >
          {loading ? "Creating Account..." : "Sign Up"}
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