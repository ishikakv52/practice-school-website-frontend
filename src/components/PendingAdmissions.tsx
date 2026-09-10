"use client";
import { useEffect, useState } from "react";
import { getPendingAdmissions, approveAdmission, rejectAdmission, getClasses } from "@/services/api";

export default function PendingAdmissions() {
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const [admRes, classRes] = await Promise.all([getPendingAdmissions(), getClasses()]);
    setAdmissions(admRes.admissions || []);
    setClasses(classRes.data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleApprove = async (id: number) => {
    const classId = selectedClass[id];
    if (!classId) { alert("Pehle class select karo"); return; }
    await approveAdmission(id, classId);
    load();
  };

  const handleReject = async (id: number) => {
    const reason = prompt("Reject reason (optional):") || "";
    await rejectAdmission(id, reason);
    load();
  };

  if (loading) return <p>Loading admissions...</p>;
  if (admissions.length === 0) return <p>Koi pending admission nahi hai.</p>;

  return (
    <div className="space-y-4">
      {admissions.map((a) => (
        <div key={a.id} className="border rounded p-4">
          <p><strong>{a.student_name}</strong></p>
          <p>Class applied for: {a.grade_applied}</p>
            <p>Parent: {a.parent_name} | Phone: {a.phone} | Email: {a.email}</p>
            {a.message && <p className="text-sm text-gray-500">Note: {a.message}</p>}
          <select
            className="border p-1 mr-2"
            value={selectedClass[a.id] || ""}
            onChange={(e) => setSelectedClass({ ...selectedClass, [a.id]: e.target.value })}
          >
            <option value="">Select class</option>
            {classes.map((c: any) => (
              <option key={c.id} value={c.id}>{c.name} {c.section}</option>
            ))}
          </select>
          <button onClick={() => handleApprove(a.id)} className="bg-green-600 text-white px-3 py-1 rounded mr-2">Approve</button>
          <button onClick={() => handleReject(a.id)} className="bg-red-600 text-white px-3 py-1 rounded">Reject</button>
        </div>
      ))}
    </div>
  );
}
