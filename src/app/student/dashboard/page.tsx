import ProtectedDashboard from "@/components/ProtectedDashboard";

export default function StudentDashboardPage() {
  return <ProtectedDashboard expectedRole="student" title="Student Dashboard" />;
}