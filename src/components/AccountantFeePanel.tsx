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

function StatusPill({ status }: { status: string | null }) {
  const isPaid = status === "paid";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        isPaid ? "bg-teal/10 text-teal" : "bg-coral/10 text-coral"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${isPaid ? "bg-teal" : "bg-coral"}`} />
      {isPaid ? "Paid" : "Unpaid"}
    </span>
  );
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

  const paidCount = students.filter((s) => s.status === "paid").length;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-2xl font-semibold mb-1">Student Fee Status</h2>
          <p className="text-muted text-sm">
            {students.length > 0 ? `${paidCount} of ${students.length} paid this month` : "Select a month to view fee status"}
          </p>
        </div>
        <label className="flex items-center gap-2">
          <span className="text-sm font-semibold text-muted">Month</span>
          <input
            type="month"
            value={feeMonth}
            onChange={(e) => setFeeMonth(e.target.value)}
            className="rounded-[10px] border border-ink/15 bg-paper px-3 py-2 text-sm focus:outline-none focus:border-indigo-soft focus:ring-4 focus:ring-indigo-soft/15 transition"
          />
        </label>
      </div>

      {loading ? (
        <p className="text-muted text-sm">Loading students...</p>
      ) : (
        <div className="overflow-hidden rounded-[16px] border border-ink/[0.07]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/[0.07] bg-paper/60">
                <th className="text-left font-semibold py-3 px-4">Name</th>
                <th className="text-left font-semibold py-3 px-4">Fee Amount</th>
                <th className="text-left font-semibold py-3 px-4">Status</th>
                <th className="text-left font-semibold py-3 px-4">Mode</th>
                <th className="text-left font-semibold py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr
                  key={s.student_id}
                  className={i !== students.length - 1 ? "border-b border-ink/[0.05]" : ""}
                >
                  <td className="py-3.5 px-4 font-medium">{s.student_name}</td>
                  <td className="py-3.5 px-4 text-muted">
                    {s.fee_amount ? `₹${s.fee_amount}` : "—"}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusPill status={s.status} />
                  </td>
                  <td className="py-3.5 px-4 text-muted capitalize">{s.payment_mode ?? "—"}</td>
                  <td className="py-3.5 px-4">
                    {s.status === "paid" ? (
                      <span className="text-muted text-sm">—</span>
                    ) : markingId === s.student_id ? (
                      <div className="flex items-center gap-2">
                        <input
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-20 rounded-[10px] border border-ink/15 bg-paper px-2.5 py-1.5 text-sm focus:outline-none focus:border-indigo-soft focus:ring-4 focus:ring-indigo-soft/15 transition"
                          placeholder="Amount"
                        />
                        <select
                          value={mode}
                          onChange={(e) => setMode(e.target.value)}
                          className="rounded-[10px] border border-ink/15 bg-paper px-2.5 py-1.5 text-sm focus:outline-none focus:border-indigo-soft focus:ring-4 focus:ring-indigo-soft/15 transition"
                        >
                          <option value="cash">Cash</option>
                          <option value="cheque">Cheque</option>
                          <option value="upi">UPI</option>
                        </select>
                        <button
                          onClick={() => submitMarkPaid(s.student_id)}
                          className="rounded-full bg-ink text-white px-4 py-1.5 text-sm font-semibold hover:bg-indigo-deep transition-colors"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => openMarkForm(s)}
                        className="rounded-full border border-ink/15 px-4 py-1.5 text-sm font-semibold hover:bg-ink/[0.03] transition-colors"
                      >
                        Mark as Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 px-4 text-center text-muted">
                    No students found for this month.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
