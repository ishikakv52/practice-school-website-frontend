import ProtectedDashboard from "@/components/ProtectedDashboard";
import AttendanceMarker from "@/components/AttendanceMarker";

export default function TeacherDashboardPage() {
  return (
    <ProtectedDashboard expectedRole="teacher" title="Teacher Dashboard">
      <AttendanceMarker />
    </ProtectedDashboard>
  );
}
