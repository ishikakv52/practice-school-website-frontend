"use client";
import ProtectedDashboard from "@/components/ProtectedDashboard";
import { useAuth } from "@/lib/auth-context";
import FeePayment from "@/components/FeePayment";

// Dummy fee data for now — replace with GET /api/fees/student/:studentId once real fee records exist
const dummyFees = [
  { id: 1, description: "Term 1 Fee", amount: 5000 },
  { id: 2, description: "Bus Fee", amount: 1200 },
];

export default function ParentDashboard() {
  const { user } = useAuth();

  return (
    <ProtectedDashboard expectedRole="parent" title="Parent Dashboard">
      <h2 className="text-lg font-medium mb-3">Fee Payments</h2>
      <div className="space-y-4">
        {dummyFees.map((fee) => (
          <div key={fee.id}>
            <p className="text-sm text-muted mb-1">{fee.description}</p>
            <FeePayment
              studentId={(user as any)?.studentId ?? 1}
              amount={fee.amount}
              studentName={user?.name ?? "Student"}
            />
          </div>
        ))}
      </div>
    </ProtectedDashboard>
  );
}
