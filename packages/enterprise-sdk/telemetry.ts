// Telemetry client using PostHog

function getPosthogKey(): string | undefined {
  return (
    (typeof process !== "undefined" && process.env?.POSTHOG_KEY) ||
    (typeof window !== "undefined" && (window as any).__ENV__?.POSTHOG_KEY) ||
    (typeof import.meta !== "undefined" && (import.meta as any).env?.POSTHOG_KEY)
  );
}

let posthogInitialized = false;

export function initTelemetry() {
  if (posthogInitialized || typeof window === "undefined") {
    return;
  }

  const posthogKey = getPosthogKey();
  if (!posthogKey) {
    console.warn("PostHog key not found. Telemetry disabled.");
    return;
  }

  // Dynamic import for client-side only
  import("posthog-js").then((posthog) => {
    posthog.default.init(posthogKey, {
      api_host: process.env.POSTHOG_HOST || "https://app.posthog.com",
      loaded: (posthogInstance) => {
        posthogInitialized = true;
        console.log("PostHog initialized");
      },
    });
  });
}

export function track(event: string, properties?: Record<string, any>) {
  if (typeof window === "undefined" || !posthogInitialized) {
    console.log(`[Telemetry] ${event}`, properties);
    return;
  }

  import("posthog-js").then((posthog) => {
    posthog.default.capture(event, properties);
  });
}

export function identify(userId: string, traits?: Record<string, any>) {
  if (typeof window === "undefined" || !posthogInitialized) {
    console.log(`[Telemetry] Identify: ${userId}`, traits);
    return;
  }

  import("posthog-js").then((posthog) => {
    posthog.default.identify(userId, traits);
  });
}

