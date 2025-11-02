import { RouteWrapper } from "../../components/portal/shared/RouteWrapper";

export default function ReportsPage() {
  return (
    <RouteWrapper featureTier="pro">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Reports</h1>
        <p className="text-muted-foreground">Analytics and insights.</p>
      </div>
    </RouteWrapper>
  );
}

