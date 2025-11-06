import { useState, useEffect } from "react";
import { supabase } from "@nbcon/config";
import { Bot, FileText, BarChart3, X } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(clsx(inputs));
}

interface ToolbarState {
  open: boolean;
  activePanel: "ai" | "docs" | "analytics" | null;
}

export function CoPilotToolbar() {
  const [state, setState] = useState<ToolbarState>({
    open: false,
    activePanel: null,
  });

  useEffect(() => {
    const channel = supabase.channel("toolbar_updates");

    channel.on(
      "broadcast",
      { event: "refresh" },
      (payload: { payload: { newState?: ToolbarState } }) => {
        if (payload.payload?.newState) {
          setState(payload.payload.newState);
        }
      }
    );

    channel.subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const togglePanel = (panel: "ai" | "docs" | "analytics" | null) => {
    setState((prev) => ({
      open: panel !== null,
      activePanel: panel === prev.activePanel ? null : panel,
    }));
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 flex gap-2 bg-background/90 backdrop-blur-md p-2 rounded-xl border shadow-lg z-50">
        <button
          onClick={() => togglePanel("ai")}
          className={cn(
            "p-3 rounded-lg transition-colors",
            state.activePanel === "ai"
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
          )}
          title="AI Co-Pilot"
        >
          <Bot className="w-5 h-5" />
        </button>
        <button
          onClick={() => togglePanel("docs")}
          className={cn(
            "p-3 rounded-lg transition-colors",
            state.activePanel === "docs"
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
          )}
          title="Documentation"
        >
          <FileText className="w-5 h-5" />
        </button>
        <button
          onClick={() => togglePanel("analytics")}
          className={cn(
            "p-3 rounded-lg transition-colors",
            state.activePanel === "analytics"
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
          )}
          title="Analytics"
        >
          <BarChart3 className="w-5 h-5" />
        </button>
      </div>

      {state.open && state.activePanel && (
        <div className="fixed bottom-24 right-4 w-96 h-96 bg-background border rounded-lg shadow-xl z-50 flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-semibold capitalize">{state.activePanel}</h3>
            <button
              onClick={() => togglePanel(null)}
              className="p-1 hover:bg-muted rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {state.activePanel === "ai" && (
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  AI Co-Pilot assistance
                </p>
                <div className="space-y-2">
                  <button className="w-full text-left p-3 border rounded-lg hover:bg-muted transition-colors">
                    Summarize Project
                  </button>
                  <button className="w-full text-left p-3 border rounded-lg hover:bg-muted transition-colors">
                    Generate Estimate
                  </button>
                  <button className="w-full text-left p-3 border rounded-lg hover:bg-muted transition-colors">
                    Draft Report
                  </button>
                </div>
              </div>
            )}
            {state.activePanel === "docs" && (
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  Quick documentation access
                </p>
                <div className="space-y-2">
                  <a
                    href="#"
                    className="block p-3 border rounded-lg hover:bg-muted transition-colors"
                  >
                    Getting Started Guide
                  </a>
                  <a
                    href="#"
                    className="block p-3 border rounded-lg hover:bg-muted transition-colors"
                  >
                    API Reference
                  </a>
                  <a
                    href="#"
                    className="block p-3 border rounded-lg hover:bg-muted transition-colors"
                  >
                    Best Practices
                  </a>
                </div>
              </div>
            )}
            {state.activePanel === "analytics" && (
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  Quick analytics overview
                </p>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Projects This Month
                    </p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      AI Tokens Used
                    </p>
                    <p className="text-2xl font-bold">342</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

