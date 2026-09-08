"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import { redirectByRole } from "@/lib/redirectByRole";
import { useAuth } from "@/lib/auth-context";

export default function SignupPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");
    const role = String(formData.get("role") || "");

    if (!name || !email || !password || !role) {
      setError("All fields are required.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setSubmitting(true);
    try {
      const result = await apiRequest("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password, role }),
      });
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
      <h1 className="font-display text-3xl font-semibold mb-2">Create an account</h1>
      <p className="text-muted mb-8">Join the Nexa Hub School community.</p>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-[var(--shadow-md)] border border-ink/[0.05] p-8 space-y-5">
        <label className="block font-semibold text-sm">Full name<input name="name" type="text" autoComplete="name" className="mt-1.5 w-full px-4 py-3 rounded-[10px] border border-ink/15 bg-paper focus:bg-white focus:outline-none focus:border-indigo-soft focus:ring-4 focus:ring-indigo-soft/15 transition" /></label>
        <label className="block font-semibold text-sm">Email<input name="email" type="email" autoComplete="email" className="mt-1.5 w-full px-4 py-3 rounded-[10px] border border-ink/15 bg-paper focus:bg-white focus:outline-none focus:border-indigo-soft focus:ring-4 focus:ring-indigo-soft/15 transition" /></label>
        <label className="block font-semibold text-sm">Password<input name="password" type="password" autoComplete="new-password" className="mt-1.5 w-full px-4 py-3 rounded-[10px] border border-ink/15 bg-paper focus:bg-white focus:outline-none focus:border-indigo-soft focus:ring-4 focus:ring-indigo-soft/15 transition" /></label>
        <fieldset>
          <legend className="font-semibold text-sm mb-2">Account type</legend>
          <div className="flex gap-6">
            <label className="flex items-center gap-2"><input type="radio" name="role" value="parent" /> Parent</label>
            <label className="flex items-center gap-2"><input type="radio" name="role" value="student" /> Student</label>
          </div>
        </fieldset>
        {error && <p role="alert" className="rounded-[10px] bg-coral/10 border border-coral/30 text-coral font-semibold px-4 py-3.5 text-sm">{error}</p>}
        <button type="submit" disabled={submitting} className="w-full rounded-full bg-indigo hover:bg-indigo-deep transition-colors text-white font-semibold py-3.5 disabled:opacity-60 disabled:cursor-not-allowed">
          {submitting ? "Creating account..." : "Create account"}
        </button>
        <p className="text-sm text-center text-muted">Already registered? <Link href="/login" className="text-indigo font-semibold hover:underline">Log in</Link></p>
      </form>
    </div>
  );
}