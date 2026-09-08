import ProtectedDashboard from "@/components/ProtectedDashboard";

export default function AdminDashboardShellPage() {
  return <ProtectedDashboard expectedRole="admin" title="Admin Dashboard" />;
}