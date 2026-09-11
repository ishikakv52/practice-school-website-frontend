"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import { redirectByRole } from "@/lib/redirectByRole";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const result = await apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });
      if (result.data.token) {
        localStorage.setItem("token", result.data.token);
      }
      setUser(result.data.user);
      redirectByRole(result.data.user, router);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <h1 className="font-display text-3xl font-semibold mb-2">Log in</h1>
      <p className="text-muted mb-8">Access your Nexa Hub School account.</p>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-[var(--shadow-md)] border border-ink/[0.05] p-8 space-y-5">
        <label className="block font-semibold text-sm">
          Email
          <input name="email" type="email" required autoComplete="username" className="mt-1.5 w-full px-4 py-3 rounded-[10px] border border-ink/15 bg-paper focus:bg-white focus:outline-none focus:border-indigo-soft focus:ring-4 focus:ring-indigo-soft/15 transition" />
        </label>
        <label className="block font-semibold text-sm">
          Password
          <input name="password" type="password" required autoComplete="current-password" className="mt-1.5 w-full px-4 py-3 rounded-[10px] border border-ink/15 bg-paper focus:bg-white focus:outline-none focus:border-indigo-soft focus:ring-4 focus:ring-indigo-soft/15 transition" />
        </label>
        {error && <p role="alert" className="rounded-[10px] bg-coral/10 border border-coral/30 text-coral font-semibold px-4 py-3.5 text-sm">{error}</p>}
        <button type="submit" disabled={submitting} className="w-full rounded-full bg-indigo hover:bg-indigo-deep transition-colors text-white font-semibold py-3.5 disabled:opacity-60 disabled:cursor-not-allowed">
          {submitting ? "Logging in..." : "Login"}
        </button>
        <p className="text-sm text-center text-muted">New here? <Link href="/signup" className="text-indigo font-semibold hover:underline">Create an account</Link></p>
      </form>
    </div>
  );
}