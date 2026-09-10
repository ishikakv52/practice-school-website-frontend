"use client";
import { useState } from "react";
import ProtectedDashboard from "@/components/ProtectedDashboard";
import PendingAdmissions from "@/components/PendingAdmissions";
import ClassFeeForm from "@/components/ClassFeeForm";
import AttendanceSection from "@/components/AttendanceSection";

const NAV_ITEMS = [
  { id: "admissions", label: "Admissions" },
  { id: "fees", label: "Fee Structure" },
  { id: "attendance", label: "Attendance" },
] as const;

type NavId = (typeof NAV_ITEMS)[number]["id"];

export default function PrincipalDashboardPage() {
  const [active, setActive] = useState<NavId>("admissions");

  return (
    <ProtectedDashboard expectedRole="principal" title="Principal Dashboard">
      <div className="flex flex-col md:flex-row gap-8">
        <nav className="md:w-52 shrink-0 md:border-r md:border-ink/[0.07] md:pr-6">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActive(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-[10px] text-sm font-semibold transition-colors ${
                    active === item.id
                      ? "bg-indigo text-white"
                      : "text-ink hover:bg-ink/[0.04]"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex-1 min-w-0">
          {active === "admissions" && <PendingAdmissions />}
          {active === "fees" && <ClassFeeForm />}
          {active === "attendance" && <AttendanceSection />}
        </div>
      </div>
    </ProtectedDashboard>
  );
}
