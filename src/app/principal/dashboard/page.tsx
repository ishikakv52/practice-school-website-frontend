import PendingAdmissions from "@/components/PendingAdmissions";
import ProtectedDashboard from "@/components/ProtectedDashboard";
import AttendanceViewer from "@/components/AttendanceViewer";
import ClassFeeForm from "@/components/ClassFeeForm";

export default function PrincipalDashboardPage() {
  return (
    <ProtectedDashboard expectedRole="principal" title="Principal Dashboard">
      <ClassFeeForm />
      <PendingAdmissions />
      <AttendanceViewer />
    </ProtectedDashboard>
  );
}
