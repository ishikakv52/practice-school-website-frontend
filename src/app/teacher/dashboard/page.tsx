import ProtectedDashboard from "@/components/ProtectedDashboard";

export default function TeacherDashboardPage() {
  return <ProtectedDashboard expectedRole="teacher" title="Teacher Dashboard" />;
}
