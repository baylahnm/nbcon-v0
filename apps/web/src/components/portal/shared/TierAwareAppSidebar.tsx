import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { menuItems } from "../../../config/menuConfig";
import { usePortalAccess } from "../../../hooks/usePortalAccess";
import { hasTierAccess } from "../../../config/tierVisibility";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { NbLogo } from "../../ui/n-logo";

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export function TierAwareAppSidebar() {
  const location = useLocation();
  const { tier, isLoading } = usePortalAccess();
  const [collapsed, setCollapsed] = useState(false);

  if (isLoading) {
    return (
      <div className="w-64 h-screen bg-background border-r border-border p-4">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  const filteredItems = menuItems.filter((item) =>
    hasTierAccess(tier, item.tier)
  );

  return (
    <aside
      className={cn(
        "bg-background border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-border flex items-center justify-between">
          {collapsed ? (
            <div className="flex justify-center w-full">
              <NbLogo className="w-8 h-8" />
            </div>
          ) : (
            <h2 className="text-lg font-semibold">NBCON PRO</h2>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-accent rounded-md"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-2">
          <ul className="space-y-1">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      isActive && "bg-accent text-accent-foreground font-medium"
                    )}
                    title={collapsed ? item.name : undefined}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && (
                      <span className="flex-1">{item.name}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {!collapsed && (
          <div className="p-4 border-t border-border text-xs text-muted-foreground">
            Tier: <span className="font-medium capitalize">{tier}</span>
          </div>
        )}
      </div>
    </aside>
  );
}

