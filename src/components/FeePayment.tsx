"use client";
import { useState } from "react";
import Script from "next/script";

const API_BASE = process.env.NEXT_PUBLIC_API_URL + "/api";

export default function FeePayment({ studentId, amount, studentName }: {
  studentId: number; amount: number; studentName: string;
}) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handlePay = async () => {
    setLoading(true);
    setStatus("idle");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/fees/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ studentId, amount, description: "School Fee" }),
      });
      const data = await res.json();

      const rzp = new (window as any).Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "NexaHub School",
        description: `Fee payment for ${studentName}`,
        order_id: data.orderId,
        handler: async function (response: any) {
          const verifyRes = await fetch(`${API_BASE}/fees/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(response),
          });
          const verifyData = await verifyRes.json();
          setStatus(verifyData.success ? "success" : "error");
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
      <div className="p-4 border rounded-lg">
        <p className="mb-2">Fee due: ₹{amount}</p>
        <button
          onClick={handlePay}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
        {status === "success" && <p className="text-green-600 mt-2">Payment successful ✅</p>}
        {status === "error" && <p className="text-red-600 mt-2">Payment failed, try again</p>}
      </div>
    </>
  );
}
