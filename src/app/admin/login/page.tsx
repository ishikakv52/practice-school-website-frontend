"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/authService";
import { ApiClientError } from "@/services/api";
import { subscribeToPush } from "@/services/pushNotifications";

export default function AdminLoginPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const data = new FormData(e.currentTarget);
    try {
      await login(String(data.get("email") || ""), String(data.get("password") || ""));
      subscribeToPush("admin"); // fire-and-forget, login flow ko block nahi karega
      router.push("/admin");
    } catch (err) {
      setError(
        err instanceof ApiClientError ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <h1 className="font-display text-3xl font-semibold mb-2">Admin Login</h1>
      <p className="text-muted mb-8">Sign in to manage admissions and enquiries.</p>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-[var(--shadow-md)] border border-ink/[0.05] p-8 space-y-5"
      >
        <div>
          <label htmlFor="email" className="block font-semibold text-sm mb-1.5">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="username"
            className="w-full px-4 py-3 rounded-[10px] border border-ink/15 bg-paper focus:bg-white focus:outline-none focus:border-indigo-soft focus:ring-4 focus:ring-indigo-soft/15 transition"
          />
        </div>
        <div>
          <label htmlFor="password" className="block font-semibold text-sm mb-1.5">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="w-full px-4 py-3 rounded-[10px] border border-ink/15 bg-paper focus:bg-white focus:outline-none focus:border-indigo-soft focus:ring-4 focus:ring-indigo-soft/15 transition"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full mt-2 rounded-full bg-indigo hover:bg-indigo-deep transition-colors text-white font-semibold py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Signing in..." : "Sign In"}
        </button>

        {error && (
          <div className="rounded-[10px] bg-coral/10 border border-coral/30 text-coral font-semibold px-4 py-3.5 text-sm">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}