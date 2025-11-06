import { RouteWrapper } from "../../components/portal/shared/RouteWrapper";
import { ChatProjectHub } from "../../components/layout/ChatProjectHub";
import { useI18n } from "../../hooks/useI18n";

export default function ProjectsPage() {
  const { t } = useI18n();
  
  return (
    <RouteWrapper featureTier="basic">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">{t("projects.title")}</h1>
        <p className="text-muted-foreground">{t("projects.description")}</p>
      </div>
      <ChatProjectHub />
    </RouteWrapper>
  );
}

