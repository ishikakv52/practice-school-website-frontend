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

const MONTH_NAMES = ["", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

function formatMonth(feeMonth: string) {
  const [year, month] = feeMonth.split("-");
  return `${MONTH_NAMES[Number(month)]} ${year}`;
}

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

  const pendingCount = fees.filter((f) => f.status !== "paid").length;

  return (
    <ProtectedDashboard expectedRole="parent" title="Parent Dashboard">
      {!verifiedStudentId ? (
        <StudentVerificationForm onVerified={setVerifiedStudentId} />
      ) : (
        <>
          <div className="mb-6">
            <h2 className="font-display text-2xl font-semibold mb-1">Fee Payments</h2>
            <p className="text-muted text-sm">
              {loadingFees
                ? "Loading..."
                : pendingCount > 0
                  ? `${pendingCount} month${pendingCount > 1 ? "s" : ""} pending`
                  : "All fees paid"}
            </p>
          </div>

          <div className="space-y-3">
            {fees.map((fee) =>
              fee.status === "paid" ? (
                <div
                  key={fee.id}
                  className="flex items-center justify-between rounded-[16px] border border-ink/[0.07] px-5 py-4"
                >
                  <span className="font-medium">{formatMonth(fee.fee_month)}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-teal/10 text-teal px-3 py-1 text-xs font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                    Paid
                  </span>
                </div>
              ) : (
                <div key={fee.id} className="rounded-[16px] border border-ink/[0.07] px-5 py-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">{formatMonth(fee.fee_month)}</span>
                    <span className="font-display text-lg">₹{fee.amount}</span>
                  </div>
                  <FeePayment
                    studentId={verifiedStudentId}
                    feeId={fee.id}
                    amount={fee.amount}
                    feeMonth={formatMonth(fee.fee_month)}
                    studentName={user?.name ?? "Student"}
                  />
                </div>
              )
            )}
            {!loadingFees && fees.length === 0 && (
              <p className="text-muted text-sm">No fee records found yet.</p>
            )}
          </div>
        </>
      )}
    </ProtectedDashboard>
  );
}
