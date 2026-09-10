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

  if (loading) return <p className="text-muted">Loading...</p>;

  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium mb-3">Set Monthly Class Fee ({CURRENT_YEAR})</h2>
      <div className="flex items-center gap-2 mb-4">
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border rounded px-2 py-1.5"
        >
          <option value="">Select class</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Monthly amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border rounded px-2 py-1.5 w-40"
        />
        <button
          onClick={handleSave}
          disabled={saving || !selectedClass || !amount}
          className="rounded bg-ink text-white px-4 py-1.5 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="text-left border-b border-ink/10">
            <th className="py-2">Class</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {classFees.map((cf) => (
            <tr key={cf.id} className="border-b border-ink/5">
              <td className="py-2">{cf.class_name}</td>
              <td>{cf.amount}</td>
            </tr>
          ))}
          {classFees.length === 0 && (
            <tr><td colSpan={2} className="py-3 text-muted">No class fees set yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
