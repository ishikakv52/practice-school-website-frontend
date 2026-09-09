import ProtectedDashboard from "@/components/ProtectedDashboard";
import AttendanceViewer from "@/components/AttendanceViewer";

export default function PrincipalDashboardPage() {
  return (
    <ProtectedDashboard expectedRole="principal" title="Principal Dashboard">
      <AttendanceViewer />
    </ProtectedDashboard>
  );
}
