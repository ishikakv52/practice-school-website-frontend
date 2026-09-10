"use client";

import { useEffect, useState } from "react";
import { listMyClasses, getAttendance, markAttendance } from "@/services/academicService";
import { ApiClientError } from "@/services/api";

type ClassOption = { id: number; name: string; section: string };
type StudentRow = {
  studentId: number;
  name: string;
  rollNumber: string | null;
  admissionNumber: string | null;
  status: "present" | "absent" | "late" | null;
};

const STATUSES: { value: "present" | "absent" | "late"; label: string }[] = [
  { value: "present", label: "Present" },
  { value: "absent", label: "Absent" },
  { value: "late", label: "Late" },
];

function today() {
  return new Date().toISOString().slice(0, 10);
}

export default function AttendanceMarker() {
  const [classes, setClasses] = useState<ClassOption[]>([]);
  const [classId, setClassId] = useState<number | null>(null);
  const [date, setDate] = useState(today());
  const [rows, setRows] = useState<StudentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingRows, setLoadingRows] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    listMyClasses()
      .then((res) => {
        const list = res?.data ?? [];
        setClasses(list);
        if (list.length > 0) setClassId(list[0].id);
      })
      .catch((err) => {
        setError(err instanceof ApiClientError ? err.message : "Failed to load your classes.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (classId === null) return;
    let cancelled = false;
    setLoadingRows(true);
    setError(null);
    setSaved(false);
    getAttendance(classId, date)
      .then((res) => {
        if (!cancelled) setRows(res?.data ?? []);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof ApiClientError ? err.message : "Failed to load students.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingRows(false);
      });
    return () => {
      cancelled = true;
    };
  }, [classId, date]);

  function setStatus(studentId: number, status: "present" | "absent" | "late") {
    setRows((prev) => prev.map((r) => (r.studentId === studentId ? { ...r, status } : r)));
    setSaved(false);
  }

  async function handleSave() {
    if (classId === null) return;
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const records = rows
        .filter((r) => r.status !== null)
        .map((r) => ({ studentId: r.studentId, status: r.status as string }));
      if (records.length === 0) {
        setError("Mark at least one student before saving.");
        return;
      }
      await markAttendance({ classId, date, records });
      setSaved(true);
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : "Failed to save attendance.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-muted">Loading your classes...</p>;
  }

  if (classes.length === 0) {
    return (
      <p className="text-muted">
        No class has been assigned to you yet. Ask the admin to assign you a class first.
      </p>
    );
  }

  return (
    <div>
      <h2 className="font-display text-xl font-semibold mb-1">Mark Attendance</h2>
      <p className="text-muted text-sm mb-6">Pick a class and date, then mark each student.</p>

      <div className="flex flex-wrap gap-3 items-end mb-6">
        <div>
          <label className="block font-semibold text-sm mb-1.5">Class</label>
          <select
            value={classId ?? ""}
            onChange={(e) => setClassId(Number(e.target.value))}
            className="px-4 py-2.5 rounded-[10px] border border-ink/15 bg-paper text-sm"
          >
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} — {c.section}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold text-sm mb-1.5">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={today()}
            className="px-4 py-2.5 rounded-[10px] border border-ink/15 bg-paper text-sm"
          />
        </div>
      </div>

      {error && (
        <div className="mb-5 rounded-[10px] bg-coral/10 border border-coral/30 text-coral font-semibold px-4 py-3.5 text-sm">
          {error}
        </div>
      )}
      {saved && (
        <div className="mb-5 rounded-[10px] bg-teal/10 border border-teal/30 text-teal font-semibold px-4 py-3.5 text-sm">
          Attendance saved for {date}.
        </div>
      )}

      {loadingRows ? (
        <p className="text-muted">Loading students...</p>
      ) : rows.length === 0 ? (
        <p className="text-muted">No students in this class yet.</p>
      ) : (
        <div className="space-y-2">
          {rows.map((r) => (
            <div
              key={r.studentId}
              className="flex flex-wrap items-center justify-between gap-3 border border-ink/10 rounded-[10px] px-4 py-3"
            >
              <div>
                <p className="font-semibold text-sm">{r.name}</p>
                {(r.rollNumber || r.admissionNumber) && (
                  <p className="text-xs text-muted">
                    {r.rollNumber && <>Roll no. {r.rollNumber}</>}
                    {r.rollNumber && r.admissionNumber && " · "}
                    {r.admissionNumber && <>Admission no. {r.admissionNumber}</>}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setStatus(r.studentId, s.value)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold border transition-colors ${
                      r.status === s.value
                        ? s.value === "present"
                          ? "bg-teal text-white border-teal"
                          : s.value === "absent"
                          ? "bg-coral text-white border-coral"
                          : "bg-indigo text-white border-indigo"
                        : "border-ink/15 hover:bg-ink/[0.03]"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-4 rounded-full bg-indigo hover:bg-indigo-deep transition-colors text-white font-semibold px-6 py-2.5 text-sm disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Attendance"}
          </button>
        </div>
      )}
    </div>
  );
}
