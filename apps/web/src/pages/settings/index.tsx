import { RouteWrapper } from "../../components/portal/shared/RouteWrapper";

export default function SettingsPage() {
  return (
    <RouteWrapper featureTier="free">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        <p className="text-muted-foreground">Account preferences.</p>
      </div>
    </RouteWrapper>
  );
}

