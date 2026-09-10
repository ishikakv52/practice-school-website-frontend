import ProtectedDashboard from "@/components/ProtectedDashboard";
import SelfAttendance from "@/components/SelfAttendance";
import AttendanceMarker from "@/components/AttendanceMarker";

export default function TeacherDashboardPage() {
  return (
    <ProtectedDashboard expectedRole="teacher" title="Teacher Dashboard">
      <SelfAttendance />
      <AttendanceMarker />
    </ProtectedDashboard>
  );
}
