"use client";
import ProtectedDashboard from "@/components/ProtectedDashboard";
import AccountantFeePanel from "@/components/AccountantFeePanel";

export default function AccountantDashboardPage() {
  return (
    <ProtectedDashboard expectedRole="accountant" title="Accountant Dashboard">
      <AccountantFeePanel />
    </ProtectedDashboard>
  );
}
