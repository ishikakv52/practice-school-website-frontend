"use client";

import { useState } from "react";
import { submitAdmission } from "@/services/admissionService";
import { ApiClientError } from "@/services/api";

const GRADES = [
  "Nursery",
  "KG",
  "Class I",
  "Class II",
  "Class III",
  "Class IV",
  "Class V",
  "Class VI",
  "Class VII",
  "Class VIII",
  "Class IX",
  "Class X",
  "Class XI",
  "Class XII",
];

export default function AdmissionForm() {
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
      await submitAdmission({
        studentName: String(data.get("studentName") || ""),
        dateOfBirth: String(data.get("dateOfBirth") || ""),
        gradeApplied: String(data.get("gradeApplied") || ""),
        parentName: String(data.get("parentName") || ""),
        phone: String(data.get("phone") || ""),
        email: String(data.get("email") || ""),
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
      className="bg-white rounded-2xl shadow-[var(--shadow-md)] border border-ink/[0.05] p-8 md:p-10 max-w-2xl mx-auto"
    >
      <div className="grid md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label
            htmlFor="student-name"
            className="block font-semibold text-sm mb-1.5"
          >
            Student&apos;s Full Name
          </label>
          <input
            id="student-name"
            name="studentName"
            type="text"
            required
            className="w-full px-4 py-3 rounded-[10px] border border-ink/15 bg-paper focus:bg-white focus:outline-none focus:border-indigo-soft focus:ring-4 focus:ring-indigo-soft/15 transition"
          />
        </div>

        <div>
          <label htmlFor="dob" className="block font-semibold text-sm mb-1.5">
            Date of Birth
          </label>
          <input
            id="dob"
            name="dateOfBirth"
            type="date"
            required
            className="w-full px-4 py-3 rounded-[10px] border border-ink/15 bg-paper focus:bg-white focus:outline-none focus:border-indigo-soft focus:ring-4 focus:ring-indigo-soft/15 transition"
          />
        </div>

        <div>
          <label
            htmlFor="grade"
            className="block font-semibold text-sm mb-1.5"
          >
            Applying for Grade
          </label>
          <select
            id="grade"
            name="gradeApplied"
            required
            defaultValue=""
            className="w-full px-4 py-3 rounded-[10px] border border-ink/15 bg-paper focus:bg-white focus:outline-none focus:border-indigo-soft focus:ring-4 focus:ring-indigo-soft/15 transition"
          >
            <option value="" disabled>
              Select grade
            </option>
            {GRADES.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="parent-name"
            className="block font-semibold text-sm mb-1.5"
          >
            Parent/Guardian Name
          </label>
          <input
            id="parent-name"
            name="parentName"
            type="text"
            required
            className="w-full px-4 py-3 rounded-[10px] border border-ink/15 bg-paper focus:bg-white focus:outline-none focus:border-indigo-soft focus:ring-4 focus:ring-indigo-soft/15 transition"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block font-semibold text-sm mb-1.5">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="w-full px-4 py-3 rounded-[10px] border border-ink/15 bg-paper focus:bg-white focus:outline-none focus:border-indigo-soft focus:ring-4 focus:ring-indigo-soft/15 transition"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="email" className="block font-semibold text-sm mb-1.5">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-4 py-3 rounded-[10px] border border-ink/15 bg-paper focus:bg-white focus:outline-none focus:border-indigo-soft focus:ring-4 focus:ring-indigo-soft/15 transition"
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="message"
            className="block font-semibold text-sm mb-1.5"
          >
            Additional Message (optional)
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            className="w-full px-4 py-3 rounded-[10px] border border-ink/15 bg-paper focus:bg-white focus:outline-none focus:border-indigo-soft focus:ring-4 focus:ring-indigo-soft/15 transition"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full mt-7 rounded-full bg-marigold hover:bg-marigold-light transition-colors text-ink font-semibold py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Submitting..." : "Submit Application"}
      </button>

      {submitted && (
        <div className="mt-5 rounded-[10px] bg-teal/10 border border-teal/30 text-teal font-semibold px-4 py-3.5 text-sm">
          Application submitted! Our admissions team will contact you
          shortly.
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
