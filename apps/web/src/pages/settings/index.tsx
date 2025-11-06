import { RouteWrapper } from "../../components/portal/shared/RouteWrapper";
import { SettingsLayout } from "../../components/settings/SettingsLayout";

export default function SettingsPage() {
  return (
    <RouteWrapper featureTier="free">
      <SettingsLayout />
    </RouteWrapper>
  );
}

