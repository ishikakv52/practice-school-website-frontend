"use client";
import { useState, useEffect } from "react";
import ProtectedDashboard from "@/components/ProtectedDashboard";
import { useAuth } from "@/lib/auth-context";
import { apiRequest } from "@/lib/api";
import FeePayment from "@/components/FeePayment";
import StudentVerificationForm from "@/components/StudentVerificationForm";

type Fee = { id: number; description: string; amount: number };

export default function ParentDashboard() {
  const { user } = useAuth();
  const [verifiedStudentId, setVerifiedStudentId] = useState<number | null>(null);
  const [fees, setFees] = useState<Fee[]>([]);
  const [loadingFees, setLoadingFees] = useState(false);

  useEffect(() => {
    if (!verifiedStudentId) return;
    setLoadingFees(true);
    apiRequest(`/api/fees/student/${verifiedStudentId}`)
      .then((result) => setFees(result.data ?? result))
      .finally(() => setLoadingFees(false));
  }, [verifiedStudentId]);

  return (
    <ProtectedDashboard expectedRole="parent" title="Parent Dashboard">
      {!verifiedStudentId ? (
        <StudentVerificationForm onVerified={setVerifiedStudentId} />
      ) : (
        <>
          <h2 className="text-lg font-medium mb-3">Fee Payments</h2>
          {loadingFees && <p className="text-muted">Loading fees...</p>}
          <div className="space-y-4">
            {fees.map((fee) => (
              <div key={fee.id}>
                <p className="text-sm text-muted mb-1">{fee.description}</p>
                <FeePayment
                  studentId={verifiedStudentId}
                  amount={fee.amount}
                  studentName={user?.name ?? "Student"}
                />
              </div>
            ))}
            {!loadingFees && fees.length === 0 && (
              <p className="text-muted">No pending fees found.</p>
            )}
          </div>
        </>
      )}
    </ProtectedDashboard>
  );
}
