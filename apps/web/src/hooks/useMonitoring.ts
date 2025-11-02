import { useEffect } from "react";
import { track, initTelemetry, identify } from "@nbcon/enterprise-sdk/telemetry";
import { usePortalAccess } from "./usePortalAccess";

export function useMonitoring() {
  const { userId, tier } = usePortalAccess();

  useEffect(() => {
    initTelemetry();

    track("session_start", {
      timestamp: Date.now(),
      tier: tier,
    });

    if (userId) {
      identify(userId, {
        tier,
        timestamp: Date.now(),
      });
    }

    return () => {
      track("session_end", {
        timestamp: Date.now(),
      });
    };
  }, [userId, tier]);
}

