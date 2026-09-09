"use client";

import { useEffect, useState } from "react";
import {
  listStaffAccounts,
  updateStaffAccount,
  setStaffAccountStatus,
} from "@/services/adminService";
import { ApiClientError } from "@/services/api";

type StaffAccount = {
  id: number;
  name: string;
  email: string;
  role: "teacher" | "principal" | "staff";
  is_active: boolean;
  created_at: string;
};

const ROLES = [
  { value: "teacher", label: "Teacher" },
  { value: "principal", label: "Principal" },
  { value: "staff", label: "Staff / Accountant" },
];

export default function AccountsList({ refreshKey }: { refreshKey?: number }) {
  const [accounts, setAccounts] = useState<StaffAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("");
  const [savingId, setSavingId] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    listStaffAccounts()
      .then((res) => {
        if (!cancelled) setAccounts(res?.data ?? []);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof ApiClientError ? err.message : "Failed to load accounts.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  function startEdit(acc: StaffAccount) {
    setEditingId(acc.id);
    setEditName(acc.name);
    setEditEmail(acc.email);
    setEditRole(acc.role);
  }

  async function saveEdit(id: number) {
    setSavingId(id);
    setError(null);
    try {
      const res = await updateStaffAccount(id, { name: editName, email: editEmail, role: editRole });
      setAccounts((prev) => prev.map((a) => (a.id === id ? res.data : a)));
      setEditingId(null);
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : "Failed to update account.");
    } finally {
      setSavingId(null);
    }
  }

  async function toggleStatus(acc: StaffAccount) {
    setSavingId(acc.id);
    setError(null);
    try {
      const res = await setStaffAccountStatus(acc.id, !acc.is_active);
      setAccounts((prev) => prev.map((a) => (a.id === acc.id ? res.data : a)));
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : "Failed to update status.");
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div className="mt-8">
      <h2 className="font-display text-xl font-semibold mb-4">Staff Accounts</h2>

      {error && (
        <div className="mb-4 rounded-[10px] bg-coral/10 border border-coral/30 text-coral font-semibold px-4 py-3.5 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-muted">Loading...</p>
      ) : accounts.length === 0 ? (
        <p className="text-muted">No staff accounts created yet.</p>
      ) : (
        <div className="space-y-4">
          {accounts.map((acc) => (
            <div
              key={acc.id}
              className="bg-white rounded-2xl shadow-[var(--shadow-sm)] border border-ink/[0.05] p-5"
            >
              {editingId === acc.id ? (
                <div className="space-y-3">
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 rounded-[10px] border border-ink/15 bg-paper text-sm"
                    placeholder="Name"
                  />
                  <input
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-[10px] border border-ink/15 bg-paper text-sm"
                    placeholder="Email"
                  />
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-[10px] border border-ink/15 bg-paper text-sm"
                  >
                    {ROLES.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(acc.id)}
                      disabled={savingId === acc.id}
                      className="rounded-full bg-indigo hover:bg-indigo-deep transition-colors text-white font-semibold px-4 py-2 text-sm disabled:opacity-60"
                    >
                      {savingId === acc.id ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold hover:bg-ink/[0.03]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">
                      {acc.name}{" "}
                      <span className="text-xs font-normal text-muted capitalize">
                        ({acc.role})
                      </span>
                    </p>
                    <p className="text-sm text-muted">{acc.email}</p>
                    <span
                      className={`inline-block mt-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                        acc.is_active ? "bg-teal/10 text-teal" : "bg-coral/10 text-coral"
                      }`}
                    >
                      {acc.is_active ? "Active" : "Deactivated"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(acc)}
                      className="rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold hover:bg-ink/[0.03]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => toggleStatus(acc)}
                      disabled={savingId === acc.id}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-60 ${
                        acc.is_active
                          ? "border border-coral/30 text-coral hover:bg-coral/10"
                          : "border border-teal/30 text-teal hover:bg-teal/10"
                      }`}
                    >
                      {savingId === acc.id ? "..." : acc.is_active ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
