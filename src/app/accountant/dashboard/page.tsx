"use client";
import ProtectedDashboard from "@/components/ProtectedDashboard";
import SelfAttendance from "@/components/SelfAttendance";
import AccountantFeePanel from "@/components/AccountantFeePanel";

export default function AccountantDashboardPage() {
  return (
    <ProtectedDashboard expectedRole="accountant" title="Accountant Dashboard">
      <SelfAttendance />
      <AccountantFeePanel />
    </ProtectedDashboard>
  );
}
