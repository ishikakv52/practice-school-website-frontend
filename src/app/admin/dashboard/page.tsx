import ProtectedDashboard from "@/components/ProtectedDashboard";
import CreateAccountForm from "@/components/CreateAccountForm";

export default function AdminDashboardShellPage() {
  return (
    <ProtectedDashboard expectedRole="admin" title="Admin Dashboard">
      <CreateAccountForm />
    </ProtectedDashboard>
  );
}
