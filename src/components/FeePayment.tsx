"use client";
import { useState } from "react";
import Script from "next/script";
import { apiRequest } from "@/lib/api";

export default function FeePayment({ studentId, feeId, amount, feeMonth, studentName }: {
  studentId: number; feeId: number; amount: number; feeMonth: string; studentName: string;
}) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handlePay = async () => {
    setLoading(true);
    setStatus("idle");
    try {
      const data = await apiRequest("/api/fees/create-order", {
        method: "POST",
        body: JSON.stringify({ studentId, feeId }),
      });

      const rzp = new (window as any).Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "NexaHub School",
        description: `Fee payment for ${studentName} — ${feeMonth}`,
        order_id: data.orderId,
        handler: async function (response: any) {
          const verifyResult = await apiRequest("/api/fees/verify", {
            method: "POST",
            body: JSON.stringify(response),
          });
          setStatus(verifyResult.success ? "success" : "error");
        },
        theme: { color: "#3f3184" },
      });

      rzp.on("payment.failed", async function (response: any) {
  setStatus("error");
  try {
    await apiRequest("/api/fees/payment-failed", {
      method: "POST",
      body: JSON.stringify({
        feeId,
        reason: response?.error?.description || "Payment failed",
      }),
    });
  } catch (err) {
    console.error(err);
  }
});
      rzp.open();
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <button
        type="button"
        onClick={handlePay}
        disabled={loading}
        className="rounded-full bg-ink text-white px-5 py-2 text-sm font-semibold hover:bg-indigo-deep transition-colors disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
      {status === "success" && <p className="text-teal text-sm mt-2">Payment successful ✅</p>}
      {status === "error" && <p className="text-coral text-sm mt-2">Payment failed, try again</p>}
    </>
  );
}
