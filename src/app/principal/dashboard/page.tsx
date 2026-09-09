import ProtectedDashboard from "@/components/ProtectedDashboard";

export default function PrincipalDashboardPage() {
  return <ProtectedDashboard expectedRole="principal" title="Principal Dashboard" />;
}
