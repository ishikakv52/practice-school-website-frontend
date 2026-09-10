"use client";

import { useState } from "react";
import { createStaffAccount } from "@/services/adminService";
import { ApiClientError } from "@/services/api";

const ROLES = [
  { value: "teacher", label: "Teacher" },
  { value: "principal", label: "Principal" },
  { value: "staff", label: "Staff" },
  { value: "accountant", label: "Accountant" },
];

export default function CreateAccountForm({ onCreated }: { onCreated?: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const password = String(data.get("password") || "");
    const role = String(data.get("role") || "");

    try {
      const result = await createStaffAccount({ name, email, password, role });
      setSuccess(`Account created for ${result.data.user.name} (${result.data.user.role}).`);
      form.reset();
      onCreated?.();
    } catch (err) {
      setError(
        err instanceof ApiClientError ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h2 className="font-display text-xl font-semibold mb-1">Create Staff Account</h2>
      <p className="text-muted text-sm mb-6">
        Create a login for a Teacher, Principal, or Staff/Accountant.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-md">
        <div>
          <label htmlFor="name" className="block font-semibold text-sm mb-1.5">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={150}
            className="w-full px-4 py-3 rounded-[10px] border border-ink/15 bg-paper focus:bg-white focus:outline-none focus:border-indigo-soft focus:ring-4 focus:ring-indigo-soft/15 transition"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-semibold text-sm mb-1.5">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="off"
            className="w-full px-4 py-3 rounded-[10px] border border-ink/15 bg-paper focus:bg-white focus:outline-none focus:border-indigo-soft focus:ring-4 focus:ring-indigo-soft/15 transition"
          />
        </div>
        <div>
          <label htmlFor="password" className="block font-semibold text-sm mb-1.5">
            Temporary Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className="w-full px-4 py-3 rounded-[10px] border border-ink/15 bg-paper focus:bg-white focus:outline-none focus:border-indigo-soft focus:ring-4 focus:ring-indigo-soft/15 transition"
          />
        </div>
        <div>
          <label htmlFor="role" className="block font-semibold text-sm mb-1.5">
            Role
          </label>
          <select
            id="role"
            name="role"
            required
            defaultValue=""
            className="w-full px-4 py-3 rounded-[10px] border border-ink/15 bg-paper focus:bg-white focus:outline-none focus:border-indigo-soft focus:ring-4 focus:ring-indigo-soft/15 transition"
          >
            <option value="" disabled>
              Select a role
            </option>
            {ROLES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-indigo hover:bg-indigo-deep transition-colors text-white font-semibold py-3 px-6 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Creating..." : "Create Account"}
        </button>

        {error && (
          <div className="rounded-[10px] bg-coral/10 border border-coral/30 text-coral font-semibold px-4 py-3.5 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded-[10px] bg-teal/10 border border-teal/30 text-teal font-semibold px-4 py-3.5 text-sm">
            {success}
          </div>
        )}
      </form>
    </div>
  );
}
