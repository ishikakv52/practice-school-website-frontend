import ProtectedDashboard from "@/components/ProtectedDashboard";
import SelfAttendance from "@/components/SelfAttendance";

export default function StaffDashboardPage() {
  return (
    <ProtectedDashboard expectedRole="staff" title="Staff Dashboard">
      <SelfAttendance />
    </ProtectedDashboard>
  );
}
