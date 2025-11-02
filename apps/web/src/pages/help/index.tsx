import { RouteWrapper } from "../../components/portal/shared/RouteWrapper";

export default function HelpPage() {
  return (
    <RouteWrapper featureTier="free">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Help Center</h1>
        <p className="text-muted-foreground">Support and documentation.</p>
      </div>
    </RouteWrapper>
  );
}

