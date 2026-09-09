import ProtectedDashboard from "@/components/ProtectedDashboard";

export default function StaffDashboardPage() {
  return <ProtectedDashboard expectedRole="staff" title="Staff Dashboard" />;
}
