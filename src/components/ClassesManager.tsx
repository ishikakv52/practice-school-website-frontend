"use client";

import { useEffect, useState } from "react";
import {
  listClasses,
  createClass,
  assignTeacherToClass,
  listStudents,
  createStudent,
} from "@/services/academicService";
import { listStaffAccounts } from "@/services/adminService";
import { ApiClientError } from "@/services/api";

type Teacher = { id: number; name: string; email: string; role: string };
type ClassRow = {
  id: number;
  name: string;
  section: string;
  teachers: { id: number; name: string; email: string }[];
};
type Student = { id: number; name: string; roll_number: string | null };

export default function ClassesManager() {
  const [classes, setClasses] = useState<ClassRow[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [creatingClass, setCreatingClass] = useState(false);

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [students, setStudents] = useState<Record<number, Student[]>>({});
  const [studentName, setStudentName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [addingStudent, setAddingStudent] = useState(false);

  const [assignTeacherId, setAssignTeacherId] = useState<Record<number, string>>({});
  const [assigning, setAssigning] = useState<number | null>(null);

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const [classesRes, staffRes] = await Promise.all([listClasses(), listStaffAccounts()]);
      setClasses(classesRes?.data ?? []);
      setTeachers((staffRes?.data ?? []).filter((u: Teacher) => u.role === "teacher"));
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : "Failed to load classes.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleCreateClass(e: React.FormEvent) {
    e.preventDefault();
    setCreatingClass(true);
    setError(null);
    try {
      await createClass({ name: className.trim(), section: section.trim() });
      setClassName("");
      setSection("");
      await refresh();
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : "Failed to create class.");
    } finally {
      setCreatingClass(false);
    }
  }

  async function handleAssign(classId: number) {
    const teacherId = assignTeacherId[classId];
    if (!teacherId) return;
    setAssigning(classId);
    setError(null);
    try {
      await assignTeacherToClass(classId, Number(teacherId));
      await refresh();
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : "Failed to assign teacher.");
    } finally {
      setAssigning(null);
    }
  }

  async function toggleExpand(classId: number) {
    if (expandedId === classId) {
      setExpandedId(null);
      return;
    }
    setExpandedId(classId);
    if (!students[classId]) {
      try {
        const res = await listStudents(classId);
        setStudents((prev) => ({ ...prev, [classId]: res?.data ?? [] }));
      } catch (err) {
        setError(err instanceof ApiClientError ? err.message : "Failed to load students.");
      }
    }
  }

  async function handleAddStudent(e: React.FormEvent, classId: number) {
    e.preventDefault();
    setAddingStudent(true);
    setError(null);
    try {
      await createStudent({
        name: studentName.trim(),
        classId,
        rollNumber: rollNumber.trim() || undefined,
      });
      setStudentName("");
      setRollNumber("");
      const res = await listStudents(classId);
      setStudents((prev) => ({ ...prev, [classId]: res?.data ?? [] }));
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : "Failed to add student.");
    } finally {
      setAddingStudent(false);
    }
  }

  return (
    <div>
      <h2 className="font-display text-xl font-semibold mb-1">Classes & Students</h2>
      <p className="text-muted text-sm mb-6">
        Create classes, assign a teacher, and add students — needed before attendance can be
        marked.
      </p>

      <form onSubmit={handleCreateClass} className="flex flex-wrap gap-3 items-end mb-8 max-w-md">
        <div>
          <label className="block font-semibold text-sm mb-1.5">Class name</label>
          <input
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="Grade 5"
            required
            className="px-4 py-2.5 rounded-[10px] border border-ink/15 bg-paper text-sm"
          />
        </div>
        <div>
          <label className="block font-semibold text-sm mb-1.5">Section</label>
          <input
            value={section}
            onChange={(e) => setSection(e.target.value)}
            placeholder="A"
            required
            className="px-4 py-2.5 rounded-[10px] border border-ink/15 bg-paper text-sm w-20"
          />
        </div>
        <button
          type="submit"
          disabled={creatingClass}
          className="rounded-full bg-indigo hover:bg-indigo-deep transition-colors text-white font-semibold px-5 py-2.5 text-sm disabled:opacity-60"
        >
          {creatingClass ? "Adding..." : "Add Class"}
        </button>
      </form>

      {error && (
        <div className="mb-5 rounded-[10px] bg-coral/10 border border-coral/30 text-coral font-semibold px-4 py-3.5 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-muted">Loading...</p>
      ) : classes.length === 0 ? (
        <p className="text-muted">No classes created yet.</p>
      ) : (
        <div className="space-y-4">
          {classes.map((cls) => (
            <div
              key={cls.id}
              className="bg-white rounded-2xl shadow-[var(--shadow-sm)] border border-ink/[0.05] p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold">
                    {cls.name} — {cls.section}
                  </p>
                  <p className="text-sm text-muted">
                    {cls.teachers.length === 0
                      ? "No teacher assigned"
                      : cls.teachers.map((t) => t.name).join(", ")}
                  </p>
                </div>
                <button
                  onClick={() => toggleExpand(cls.id)}
                  className="rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold hover:bg-ink/[0.03]"
                >
                  {expandedId === cls.id ? "Hide" : "Manage"}
                </button>
              </div>

              {expandedId === cls.id && (
                <div className="mt-4 pt-4 border-t border-ink/10 space-y-5">
                  <div>
                    <label className="block font-semibold text-sm mb-1.5">Assign Teacher</label>
                    <div className="flex gap-2">
                      <select
                        value={assignTeacherId[cls.id] || ""}
                        onChange={(e) =>
                          setAssignTeacherId((prev) => ({ ...prev, [cls.id]: e.target.value }))
                        }
                        className="px-3 py-2 rounded-[10px] border border-ink/15 bg-paper text-sm flex-1"
                      >
                        <option value="">Select a teacher</option>
                        {teachers.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.name} ({t.email})
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleAssign(cls.id)}
                        disabled={assigning === cls.id}
                        className="rounded-full bg-indigo hover:bg-indigo-deep transition-colors text-white font-semibold px-4 py-2 text-sm disabled:opacity-60"
                      >
                        {assigning === cls.id ? "..." : "Assign"}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-sm mb-1.5">Add Student</label>
                    <form
                      onSubmit={(e) => handleAddStudent(e, cls.id)}
                      className="flex flex-wrap gap-2"
                    >
                      <input
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Student name"
                        required
                        className="px-3 py-2 rounded-[10px] border border-ink/15 bg-paper text-sm flex-1 min-w-[160px]"
                      />
                      <input
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                        placeholder="Roll no. (optional)"
                        className="px-3 py-2 rounded-[10px] border border-ink/15 bg-paper text-sm w-40"
                      />
                      <button
                        type="submit"
                        disabled={addingStudent}
                        className="rounded-full bg-indigo hover:bg-indigo-deep transition-colors text-white font-semibold px-4 py-2 text-sm disabled:opacity-60"
                      >
                        {addingStudent ? "Adding..." : "Add"}
                      </button>
                    </form>
                  </div>

                  <div>
                    <p className="font-semibold text-sm mb-2">
                      Students ({students[cls.id]?.length ?? 0})
                    </p>
                    {!students[cls.id] || students[cls.id].length === 0 ? (
                      <p className="text-muted text-sm">No students added yet.</p>
                    ) : (
                      <ul className="text-sm divide-y divide-ink/10">
                        {students[cls.id].map((s) => (
                          <li key={s.id} className="py-2 flex justify-between">
                            <span>{s.name}</span>
                            <span className="text-muted">{s.roll_number || "—"}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
