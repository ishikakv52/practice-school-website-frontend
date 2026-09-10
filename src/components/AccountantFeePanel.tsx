"use client";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";

type StudentFee = {
  student_id: number;
  student_name: string;
  class_id: number;
  fee_amount: number | null;
  status: string | null;
  payment_mode: string | null;
  fee_month: string | null;
};

function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export default function AccountantFeePanel() {
  const [feeMonth, setFeeMonth] = useState(getCurrentMonth());
  const [students, setStudents] = useState<StudentFee[]>([]);
  const [loading, setLoading] = useState(true);
  const [markingId, setMarkingId] = useState<number | null>(null);
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("cash");

  useEffect(() => {
    loadStudents();
  }, [feeMonth]);

  async function loadStudents() {
    setLoading(true);
    try {
      const result = await apiRequest(`/api/fees/accountant/students?fee_month=${feeMonth}`);
      setStudents(result.data ?? result);
    } finally {
      setLoading(false);
    }
  }

  function openMarkForm(s: StudentFee) {
    setMarkingId(s.student_id);
    setAmount(s.fee_amount ? String(s.fee_amount) : "");
    setMode("cash");
  }

  async function submitMarkPaid(student_id: number) {
    await apiRequest("/api/fees/mark-paid", {
      method: "POST",
      body: JSON.stringify({ student_id, fee_month: feeMonth, amount: Number(amount), payment_mode: mode }),
    });
    setMarkingId(null);
    loadStudents();
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-lg font-medium">Student Fee Status</h2>
        <input
          type="month"
          value={feeMonth}
          onChange={(e) => setFeeMonth(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>

      {loading ? (
        <p className="text-muted">Loading students...</p>
      ) : (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left border-b border-ink/10">
              <th className="py-2">Name</th>
              <th>Fee Amount</th>
              <th>Status</th>
              <th>Mode</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.student_id} className="border-b border-ink/5">
                <td className="py-2">{s.student_name}</td>
                <td>{s.fee_amount ?? "—"}</td>
                <td>{s.status ?? "unpaid"}</td>
                <td>{s.payment_mode ?? "—"}</td>
                <td>
                  {s.status === "paid" ? (
                    <span className="text-green-600">✓ Paid</span>
                  ) : markingId === s.student_id ? (
                    <span className="flex items-center gap-2">
                      <input
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="border rounded px-2 py-1 w-20"
                        placeholder="Amount"
                      />
                      <select
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                        className="border rounded px-2 py-1"
                      >
                        <option value="cash">Cash</option>
                        <option value="cheque">Cheque</option>
                        <option value="upi">UPI</option>
                      </select>
                      <button
                        onClick={() => submitMarkPaid(s.student_id)}
                        className="rounded bg-ink text-white px-3 py-1"
                      >
                        Save
                      </button>
                    </span>
                  ) : (
                    <button
                      onClick={() => openMarkForm(s)}
                      className="rounded border border-ink/15 px-3 py-1 hover:bg-ink/[0.03]"
                    >
                      Mark as Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan={5} className="py-4 text-muted">No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
