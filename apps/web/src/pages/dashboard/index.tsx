import { RouteWrapper } from "../../components/portal/shared/RouteWrapper";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";

export default function DashboardPage() {
  return (
    <RouteWrapper featureTier="free">
      <DashboardLayout />
    </RouteWrapper>
  );
}

