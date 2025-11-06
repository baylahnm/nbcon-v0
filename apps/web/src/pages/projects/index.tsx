import { RouteWrapper } from "../../components/portal/shared/RouteWrapper";
import { ChatProjectHub } from "../../components/layout/ChatProjectHub";

export default function ProjectsPage() {
  return (
    <RouteWrapper featureTier="basic">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Projects</h1>
        <p className="text-muted-foreground">Manage your projects.</p>
      </div>
      <ChatProjectHub />
    </RouteWrapper>
  );
}

