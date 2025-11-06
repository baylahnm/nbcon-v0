import { ReactNode } from "react";
import { TierAwareAppSidebar } from "../portal/shared/TierAwareAppSidebar";
import { AppNavbar } from "../portal/shared/AppNavbar";
import { CoPilotToolbar } from "./CoPilotToolbar";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <TierAwareAppSidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <AppNavbar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
      <CoPilotToolbar />
    </div>
  );
}

