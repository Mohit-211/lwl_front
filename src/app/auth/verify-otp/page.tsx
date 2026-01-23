import { Suspense } from "react";
import VerifyOtpClient from "./VerifyOtpClient";

export const dynamic = "force-dynamic";

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading…</div>}>
      <VerifyOtpClient />
    </Suspense>
  );
}
