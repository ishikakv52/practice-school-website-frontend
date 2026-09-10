"use client";
import { useState, useEffect } from "react";
import ProtectedDashboard from "@/components/ProtectedDashboard";
import { useAuth } from "@/lib/auth-context";
import { apiRequest } from "@/lib/api";
import FeePayment from "@/components/FeePayment";
import StudentVerificationForm from "@/components/StudentVerificationForm";

type Fee = {
  id: number;
  amount: number;
  status: string;
  fee_month: string;
};

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
            {fees.map((fee) =>
              fee.status === "paid" ? (
                <div key={fee.id} className="p-4 border border-ink/[0.05] rounded-2xl flex justify-between items-center">
                  <span>{fee.fee_month} — ₹{fee.amount}</span>
                  <span className="text-green-600">Paid ✓</span>
                </div>
              ) : (
                <FeePayment
                  key={fee.id}
                  studentId={verifiedStudentId}
                  feeId={fee.id}
                  amount={fee.amount}
                  feeMonth={fee.fee_month}
                  studentName={user?.name ?? "Student"}
                />
              )
            )}
            {!loadingFees && fees.length === 0 && (
              <p className="text-muted">No fee records found yet.</p>
            )}
          </div>
        </>
      )}
    </ProtectedDashboard>
  );
}
