"use client";
import { useEffect, useState } from "react";
import AttendanceViewer from "@/components/AttendanceViewer";
import { apiRequest } from "@/lib/api";

const SUB_TABS = [
  { id: "student", label: "Student" },
  { id: "teacher", label: "Teacher" },
  { id: "staff", label: "Staff" },
] as const;

type SubTab = (typeof SUB_TABS)[number]["id"];

type StaffRow = {
  user_id: number;
  name: string;
  role: string;
  check_in_time: string | null;
  check_out_time: string | null;
};

function today() {
  return new Date().toISOString().slice(0, 10);
}

function formatTime(iso: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function StaffAttendanceView({ role }: { role: "teacher" | "staff" }) {
  const [date, setDate] = useState(today());
  const [rows, setRows] = useState<StaffRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiRequest(`/api/staff-attendance/all?date=${date}&role=${role}`)
      .then((result) => setRows(result.data ?? result))
      .finally(() => setLoading(false));
  }, [date, role]);

  return (
    <div>
      <div className="mb-5">
        <label className="block font-semibold text-sm mb-1.5">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          max={today()}
          className="px-4 py-2.5 rounded-[10px] border border-ink/15 bg-paper text-sm"
        />
      </div>

      {loading ? (
        <p className="text-muted text-sm">Loading...</p>
      ) : rows.length === 0 ? (
        <p className="text-muted text-sm">No {role} accounts found.</p>
      ) : (
        <div className="space-y-2">
          {rows.map((r) => {
            const checkedIn = !!r.check_in_time;
            const checkedOut = !!r.check_out_time;
            return (
              <div
                key={r.user_id}
                className="flex flex-wrap items-center justify-between gap-3 border border-ink/10 rounded-[10px] px-4 py-3"
              >
                <p className="font-semibold text-sm">{r.name}</p>
                {checkedIn ? (
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-teal/10 text-teal">
                    In {formatTime(r.check_in_time)}
                    {checkedOut && ` — Out ${formatTime(r.check_out_time)}`}
                  </span>
                ) : (
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-ink/5 text-muted">
                    Not checked in
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AttendanceSection() {
  const [tab, setTab] = useState<SubTab>("student");

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {SUB_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              tab === t.id
                ? "bg-ink text-white"
                : "border border-ink/15 text-ink hover:bg-ink/[0.03]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "student" && <AttendanceViewer />}
      {tab === "teacher" && <StaffAttendanceView role="teacher" />}
      {tab === "staff" && <StaffAttendanceView role="staff" />}
    </div>
  );
}
