"use client";

import { useState } from "react";
import { submitEnquiry } from "@/services/enquiryService";
import { ApiClientError } from "@/services/api";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await submitEnquiry({
        name: String(data.get("name") || ""),
        email: String(data.get("email") || ""),
        subject: String(data.get("subject") || ""),
        message: String(data.get("message") || ""),
      });
      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(
        err instanceof ApiClientError
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-[var(--shadow-md)] border border-ink/[0.05] p-8"
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="block font-semibold text-sm mb-1.5">
            Your Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full px-4 py-3 rounded-[10px] border border-ink/15 bg-paper focus:bg-white focus:outline-none focus:border-indigo-soft focus:ring-4 focus:ring-indigo-soft/15 transition"
          />
        </div>
        <div>
          <label
            htmlFor="c-email"
            className="block font-semibold text-sm mb-1.5"
          >
            Email Address
          </label>
          <input
            id="c-email"
            name="email"
            type="email"
            required
            className="w-full px-4 py-3 rounded-[10px] border border-ink/15 bg-paper focus:bg-white focus:outline-none focus:border-indigo-soft focus:ring-4 focus:ring-indigo-soft/15 transition"
          />
        </div>
        <div>
          <label
            htmlFor="subject"
            className="block font-semibold text-sm mb-1.5"
          >
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            className="w-full px-4 py-3 rounded-[10px] border border-ink/15 bg-paper focus:bg-white focus:outline-none focus:border-indigo-soft focus:ring-4 focus:ring-indigo-soft/15 transition"
          />
        </div>
        <div>
          <label
            htmlFor="c-message"
            className="block font-semibold text-sm mb-1.5"
          >
            Message
          </label>
          <textarea
            id="c-message"
            name="message"
            rows={4}
            required
            className="w-full px-4 py-3 rounded-[10px] border border-ink/15 bg-paper focus:bg-white focus:outline-none focus:border-indigo-soft focus:ring-4 focus:ring-indigo-soft/15 transition"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full mt-7 rounded-full bg-marigold hover:bg-marigold-light transition-colors text-ink font-semibold py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Sending..." : "Send Message"}
      </button>

      {submitted && (
        <div className="mt-5 rounded-[10px] bg-teal/10 border border-teal/30 text-teal font-semibold px-4 py-3.5 text-sm">
          Thank you! Your message has been received. We&apos;ll get back to
          you soon.
        </div>
      )}

      {error && (
        <div className="mt-5 rounded-[10px] bg-coral/10 border border-coral/30 text-coral font-semibold px-4 py-3.5 text-sm">
          {error}
        </div>
      )}
    </form>
  );
}
