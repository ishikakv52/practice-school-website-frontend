"use client";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";

type MyAttendance = {
  check_in_time: string | null;
  check_out_time: string | null;
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
      setStatus(result.data ?? result);
    } finally {
      setLoading(false);
    }
  }

  async function handleCheckIn() {
    setActing(true);
    try {
      await apiRequest("/api/staff-attendance/check-in", { method: "POST" });
      await load();
    } finally {
      setActing(false);
    }
  }

  async function handleCheckOut() {
    setActing(true);
    try {
      await apiRequest("/api/staff-attendance/check-out", { method: "POST" });
      await load();
    } finally {
      setActing(false);
    }
  }

  if (loading) return <p className="text-muted text-sm">Loading...</p>;

  const hasCheckedIn = !!status?.check_in_time;
  const hasCheckedOut = !!status?.check_out_time;

  return (
    <div className="mb-8 pb-8 border-b border-ink/[0.07]">
      <h2 className="font-display text-2xl font-semibold mb-1">Today's Attendance</h2>
      <p className="text-muted text-sm mb-5">
        {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
      </p>

      <div className="flex flex-wrap items-center gap-4">
        {!hasCheckedIn ? (
          <button
            onClick={handleCheckIn}
            disabled={acting}
            className="rounded-full bg-ink text-white px-6 py-2.5 font-semibold hover:bg-indigo-deep transition-colors disabled:opacity-50"
          >
            {acting ? "..." : "Check In"}
          </button>
        ) : (
          <div className="flex items-center gap-2 rounded-full bg-teal/10 text-teal px-4 py-2 text-sm font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            Checked in at {formatTime(status!.check_in_time)}
          </div>
        )}

        {hasCheckedIn && !hasCheckedOut && (
          <button
            onClick={handleCheckOut}
            disabled={acting}
            className="rounded-full border border-ink/15 px-6 py-2.5 font-semibold hover:bg-ink/[0.03] transition-colors disabled:opacity-50"
          >
            {acting ? "..." : "Check Out"}
          </button>
        )}

        {hasCheckedOut && (
          <div className="flex items-center gap-2 rounded-full bg-ink/5 text-muted px-4 py-2 text-sm font-semibold">
            Checked out at {formatTime(status!.check_out_time)}
          </div>
        )}
      </div>
    </div>
  );
}
