"use client";
import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/api";

export default function StudentVerificationForm({
  onVerified,
}: {
  onVerified: (studentId: number) => void;
}) {
  const [captcha, setCaptcha] = useState({ svg: "", token: "" });
  const [form, setForm] = useState({
    studentName: "",
    fatherName: "",
    admissionNumber: "",
    captchaInput: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadCaptcha = async () => {
    const result = await apiRequest("/api/fees/captcha");
    setCaptcha(result.data);
    setForm((f) => ({ ...f, captchaInput: "" }));
  };

  useEffect(() => {
    loadCaptcha();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await apiRequest("/api/fees/verify-student", {
        method: "POST",
        body: JSON.stringify({
          studentName: form.studentName,
          fatherName: form.fatherName,
          admissionNumber: form.admissionNumber,
          captchaInput: form.captchaInput,
          captchaToken: captcha.token,
        }),
      });
      onVerified(result.data.studentId);
    } catch (err: any) {
      setError(err.message || "Verification failed");
      loadCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-[var(--shadow-sm)] border border-ink/[0.05] p-8 max-w-md">
      <h2 className="font-display text-xl font-semibold mb-4">Verify Student to View Fees</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="studentName"
          placeholder="Student Name"
          value={form.studentName}
          onChange={handleChange}
          required
          className="w-full border border-ink/15 rounded-xl px-4 py-2.5"
        />
        <input
          name="fatherName"
          placeholder="Father's Name"
          value={form.fatherName}
          onChange={handleChange}
          required
          className="w-full border border-ink/15 rounded-xl px-4 py-2.5"
        />
        <input
          name="admissionNumber"
          placeholder="Admission Number"
          value={form.admissionNumber}
          onChange={handleChange}
          required
          className="w-full border border-ink/15 rounded-xl px-4 py-2.5"
        />

        <div className="flex items-center gap-3">
          <div dangerouslySetInnerHTML={{ __html: captcha.svg }} />
          <button type="button" onClick={loadCaptcha} className="text-sm underline">
            Refresh
          </button>
        </div>
        <input
          name="captchaInput"
          placeholder="Enter captcha"
          value={form.captchaInput}
          onChange={handleChange}
          required
          className="w-full border border-ink/15 rounded-xl px-4 py-2.5"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-ink text-white px-5 py-2.5 font-semibold disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>

      {error && <p className="text-red-600 mt-3">{error}</p>}
    </div>
  );
}
