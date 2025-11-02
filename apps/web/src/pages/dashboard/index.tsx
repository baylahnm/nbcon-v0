import { RouteWrapper } from "../../components/portal/shared/RouteWrapper";
import UnifiedDashboard from "../../components/layout/UnifiedDashboard";

export default function DashboardPage() {
  return (
    <RouteWrapper featureTier="free">
      <UnifiedDashboard />
    </RouteWrapper>
  );
}

