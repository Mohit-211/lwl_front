import { Suspense } from "react";
import CheckoutClient from "./CheckoutClient";

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={<div className="text-center py-10">Loading checkout…</div>}
    >
      <CheckoutClient />
    </Suspense>
  );
}
