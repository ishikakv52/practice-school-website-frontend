"use client";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { getClasses } from "@/services/api";

type ClassItem = { id: number; name: string };
type ClassFee = { id: number; class_id: number; class_name: string; academic_year: string; amount: number };

const CURRENT_YEAR = "2026-2027";

export default function ClassFeeForm() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [classFees, setClassFees] = useState<ClassFee[]>([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [amount, setAmount] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const [classesResult, feesResult] = await Promise.all([
        getClasses(),
        apiRequest(`/api/fees/class-fee?academic_year=${CURRENT_YEAR}`),
      ]);
      setClasses(classesResult.data ?? classesResult);
      setClassFees(feesResult.data ?? feesResult);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!selectedClass || !amount) return;
    setSaving(true);
    try {
      await apiRequest("/api/fees/class-fee", {
        method: "POST",
        body: JSON.stringify({
          class_id: Number(selectedClass),
          academic_year: CURRENT_YEAR,
          amount: Number(amount),
        }),
      });
      setSelectedClass("");
      setAmount("");
      load();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mb-10 pb-10 border-b border-ink/[0.07]">
      <h2 className="font-display text-2xl font-semibold mb-1">Set Monthly Class Fee</h2>
      <p className="text-muted text-sm mb-6">{CURRENT_YEAR} academic year</p>

      <div className="flex flex-wrap items-end gap-3 mb-7">
        <div>
          <label className="block text-sm font-semibold mb-1.5">Class</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="rounded-[10px] border border-ink/15 bg-paper px-4 py-2.5 focus:outline-none focus:border-indigo-soft focus:ring-4 focus:ring-indigo-soft/15 transition"
          >
            <option value="">Select class</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5">Monthly amount (₹)</label>
          <input
            type="number"
            placeholder="e.g. 2000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-40 rounded-[10px] border border-ink/15 bg-paper px-4 py-2.5 focus:outline-none focus:border-indigo-soft focus:ring-4 focus:ring-indigo-soft/15 transition"
          />
        </div>
        <button
          onClick={handleSave}
          disabled={saving || !selectedClass || !amount}
          className="rounded-full bg-ink text-white px-6 py-2.5 font-semibold hover:bg-indigo-deep transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      {loading ? (
        <p className="text-muted text-sm">Loading...</p>
      ) : classFees.length > 0 ? (
        <div className="overflow-hidden rounded-[16px] border border-ink/[0.07]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/[0.07] bg-paper/60">
                <th className="text-left font-semibold py-3 px-4">Class</th>
                <th className="text-left font-semibold py-3 px-4">Monthly Amount</th>
              </tr>
            </thead>
            <tbody>
              {classFees.map((cf, i) => (
                <tr key={cf.id} className={i !== classFees.length - 1 ? "border-b border-ink/[0.05]" : ""}>
                  <td className="py-3 px-4 font-medium">{cf.class_name}</td>
                  <td className="py-3 px-4 text-muted">₹{cf.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-muted text-sm">No class fees set yet.</p>
      )}
    </div>
  );
}
