"use client";
import { useState } from "react";
import Script from "next/script";
import { apiRequest } from "@/lib/api";

export default function FeePayment({ studentId, amount, studentName }: {
  studentId: number; amount: number; studentName: string;
}) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handlePay = async () => {
    setLoading(true);
    setStatus("idle");
    try {
      const data = await apiRequest("/api/fees/create-order", {
        method: "POST",
        body: JSON.stringify({ studentId, amount, description: "School Fee" }),
      });

      const rzp = new (window as any).Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "NexaHub School",
        description: `Fee payment for ${studentName}`,
        order_id: data.orderId,
        handler: async function (response: any) {
          const verifyResult = await apiRequest("/api/fees/verify", {
            method: "POST",
            body: JSON.stringify(response),
          });
          setStatus(verifyResult.success ? "success" : "error");
        },
        theme: { color: "#2563eb" },
      });

      rzp.on("payment.failed", () => setStatus("error"));
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
      <div className="p-4 border border-ink/[0.05] rounded-2xl">
        <p className="mb-2">Fee due: ₹{amount}</p>
        <button
          type="button"
          onClick={handlePay}
          disabled={loading}
          className="rounded-full bg-ink text-white px-5 py-2.5 font-semibold disabled:opacity-50"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
        {status === "success" && <p className="text-green-600 mt-2">Payment successful ✅</p>}
        {status === "error" && <p className="text-red-600 mt-2">Payment failed, try again</p>}
      </div>
    </>
  );
}