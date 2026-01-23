import { Suspense } from "react";
import CheckoutSuccessClient from "./CheckoutSuccessClient";

export const dynamic = "force-dynamic";

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Finalizing…</div>}>
      <CheckoutSuccessClient />
    </Suspense>
  );
}
