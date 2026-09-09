"use client";

import { useEffect, useState } from "react";
import { listClasses, getAttendance } from "@/services/academicService";
import { ApiClientError } from "@/services/api";

type ClassOption = { id: number; name: string; section: string };
type StudentRow = {
  studentId: number;
  name: string;
  rollNumber: string | null;
  status: "present" | "absent" | "late" | null;
};

function today() {
  return new Date().toISOString().slice(0, 10);
}

function statusLabel(status: StudentRow["status"]) {
  if (status === "present") return { text: "Present", cls: "bg-teal/10 text-teal" };
  if (status === "absent") return { text: "Absent", cls: "bg-coral/10 text-coral" };
  if (status === "late") return { text: "Late", cls: "bg-indigo/10 text-indigo" };
  return { text: "Not marked", cls: "bg-ink/5 text-muted" };
}

export default function AttendanceViewer() {
  const [classes, setClasses] = useState<ClassOption[]>([]);
  const [classId, setClassId] = useState<number | null>(null);
  const [date, setDate] = useState(today());
  const [rows, setRows] = useState<StudentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingRows, setLoadingRows] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listClasses()
      .then((res) => {
        const list = res?.data ?? [];
        setClasses(list);
        if (list.length > 0) setClassId(list[0].id);
      })
      .catch((err) => {
        setError(err instanceof ApiClientError ? err.message : "Failed to load classes.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (classId === null) return;
    let cancelled = false;
    setLoadingRows(true);
    setError(null);
    getAttendance(classId, date)
      .then((res) => {
        if (!cancelled) setRows(res?.data ?? []);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof ApiClientError ? err.message : "Failed to load attendance.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingRows(false);
      });
    return () => {
      cancelled = true;
    };
  }, [classId, date]);

  const counts = rows.reduce(
    (acc, r) => {
      if (r.status) acc[r.status] += 1;
      else acc.unmarked += 1;
      return acc;
    },
    { present: 0, absent: 0, late: 0, unmarked: 0 }
  );

  if (loading) {
    return <p className="text-muted">Loading classes...</p>;
  }

  if (classes.length === 0) {
    return <p className="text-muted">No classes have been created yet.</p>;
  }

  return (
    <div>
      <h2 className="font-display text-xl font-semibold mb-1">Attendance</h2>
      <p className="text-muted text-sm mb-6">Pick a class and date to view attendance.</p>

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

      {loadingRows ? (
        <p className="text-muted">Loading...</p>
      ) : rows.length === 0 ? (
        <p className="text-muted">No students in this class yet.</p>
      ) : (
        <>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-teal/10 text-teal">
              Present: {counts.present}
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-coral/10 text-coral">
              Absent: {counts.absent}
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-indigo/10 text-indigo">
              Late: {counts.late}
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-ink/5 text-muted">
              Not marked: {counts.unmarked}
            </span>
          </div>

          <div className="space-y-2">
            {rows.map((r) => {
              const label = statusLabel(r.status);
              return (
                <div
                  key={r.studentId}
                  className="flex flex-wrap items-center justify-between gap-3 border border-ink/10 rounded-[10px] px-4 py-3"
                >
                  <div>
                    <p className="font-semibold text-sm">{r.name}</p>
                    {r.rollNumber && (
                      <p className="text-xs text-muted">Roll no. {r.rollNumber}</p>
                    )}
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${label.cls}`}>
                    {label.text}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
