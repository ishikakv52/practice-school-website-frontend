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
};

export default function AccountantFeePanel() {
  const [students, setStudents] = useState<StudentFee[]>([]);
  const [loading, setLoading] = useState(true);
  const [markingId, setMarkingId] = useState<number | null>(null);
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("cash");

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    setLoading(true);
    try {
      const result = await apiRequest("/api/fees/accountant/students");
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
      body: JSON.stringify({ student_id, amount: Number(amount), payment_mode: mode }),
    });
    setMarkingId(null);
    loadStudents();
  }

  if (loading) return <p className="text-muted">Loading students...</p>;

  return (
    <div>
      <h2 className="text-lg font-medium mb-3">Student Fee Status</h2>
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
    </div>
  );
}
