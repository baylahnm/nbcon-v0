import * as Sentry from "@sentry/nextjs";

function getSentryDsn(): string | undefined {
  return (
    (typeof process !== "undefined" && process.env?.SENTRY_DSN) ||
    (typeof import.meta !== "undefined" && (import.meta as any).env?.SENTRY_DSN)
  );
}

export function initSentry() {
  const dsn = getSentryDsn();
  
  if (!dsn) {
    console.warn("Sentry DSN not found. Error tracking disabled.");
    return;
  }

  Sentry.init({
    dsn,
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
    environment: process.env.NODE_ENV || "development",
    beforeSend(event, hint) {
      // Filter out sensitive data
      if (event.request?.headers) {
        delete event.request.headers.authorization;
      }
      return event;
    },
  });
}

