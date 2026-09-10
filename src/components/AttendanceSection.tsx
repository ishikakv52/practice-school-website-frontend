"use client";
import { useState } from "react";
import AttendanceViewer from "@/components/AttendanceViewer";

const SUB_TABS = [
  { id: "student", label: "Student" },
  { id: "teacher", label: "Teacher" },
  { id: "staff", label: "Staff" },
] as const;

type SubTab = (typeof SUB_TABS)[number]["id"];

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
      {tab !== "student" && (
        <p className="text-muted text-sm">
          {SUB_TABS.find((t) => t.id === tab)?.label} attendance is coming soon.
        </p>
      )}
    </div>
  );
}
