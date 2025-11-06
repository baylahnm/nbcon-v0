import { ReactNode } from "react";
import { Breadcrumb } from "../../ui/breadcrumb";

interface AppNavbarProps {
  children?: ReactNode;
}

export function AppNavbar({ children }: AppNavbarProps) {
  return (
    <header className="h-auto border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">NBCON PRO</h1>
        </div>
        <div className="flex items-center gap-4">{children}</div>
      </div>
      <div className="px-6 pb-2">
        <Breadcrumb />
      </div>
    </header>
  );
}

