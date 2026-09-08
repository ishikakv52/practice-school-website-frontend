import ProtectedDashboard from "@/components/ProtectedDashboard";

export default function ParentDashboardPage() {
  return <ProtectedDashboard expectedRole="parent" title="Parent Dashboard" />;
}