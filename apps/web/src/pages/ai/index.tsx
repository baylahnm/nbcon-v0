import { RouteWrapper } from "../../components/portal/shared/RouteWrapper";

export default function AIPage() {
  return (
    <RouteWrapper featureTier="pro">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">AI Co-Pilot</h1>
        <p className="text-muted-foreground">AI-powered assistance.</p>
      </div>
    </RouteWrapper>
  );
}

