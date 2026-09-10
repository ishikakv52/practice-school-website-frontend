"use client";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";

type MyAttendance = {
  check_in_time: string | null;
  check_out_time: string | null;
  status: string | null;
} | null;

function formatTime(iso: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function SelfAttendance() {
  const [status, setStatus] = useState<MyAttendance>(null);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const result = await apiRequest("/api/staff-attendance/me");
      setStatus(result?.data ?? result ?? null);
    } finally {
      setLoading(false);
    }
  }

  async function markMorning() {
    setActing(true);
    try {
      await apiRequest("/api/staff-attendance/mark-morning", { method: "POST" });
      await load();
    } finally {
      setActing(false);
    }
  }

  async function markAfternoon() {
    setActing(true);
    try {
      await apiRequest("/api/staff-attendance/mark-afternoon", { method: "POST" });
      await load();
    } finally {
      setActing(false);
    }
  }

  if (loading) return <p className="text-muted text-sm">Loading...</p>;

  const morningDone = !!status?.check_in_time;
  const afternoonDone = !!status?.check_out_time;

  return (
    <div className="mb-8 pb-8 border-b border-ink/[0.07]">
      <h2 className="font-display text-2xl font-semibold mb-1">Today's Attendance</h2>
      <p className="text-muted text-sm mb-5">
        {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
      </p>

      <div className="flex flex-wrap items-center gap-4">
        {!morningDone ? (
          <button
            onClick={markMorning}
            disabled={acting}
            className="rounded-full bg-ink text-white px-6 py-2.5 font-semibold hover:bg-indigo-deep transition-colors disabled:opacity-50"
          >
            {acting ? "..." : "Mark Morning (Before Lunch)"}
          </button>
        ) : (
          <div className="flex items-center gap-2 rounded-full bg-teal/10 text-teal px-4 py-2 text-sm font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            Morning marked at {formatTime(status!.check_in_time)}
          </div>
        )}

        {!afternoonDone ? (
          <button
            onClick={markAfternoon}
            disabled={acting}
            className="rounded-full border border-ink/15 px-6 py-2.5 font-semibold hover:bg-ink/[0.03] transition-colors disabled:opacity-50"
          >
            {acting ? "..." : "Mark Afternoon (After Lunch)"}
          </button>
        ) : (
          <div className="flex items-center gap-2 rounded-full bg-teal/10 text-teal px-4 py-2 text-sm font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            Afternoon marked at {formatTime(status!.check_out_time)}
          </div>
        )}
      </div>

      {(morningDone || afternoonDone) && (
        <p className="text-sm text-muted mt-4">
          Today's status:{" "}
          <span className="font-semibold text-ink">
            {morningDone && afternoonDone ? "Full Day" : "Half Day"}
          </span>
        </p>
      )}
    </div>
  );
}
