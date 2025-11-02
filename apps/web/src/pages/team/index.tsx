import { RouteWrapper } from "../../components/portal/shared/RouteWrapper";

export default function TeamPage() {
  return (
    <RouteWrapper featureTier="pro">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Team</h1>
        <p className="text-muted-foreground">Team collaboration.</p>
      </div>
    </RouteWrapper>
  );
}

