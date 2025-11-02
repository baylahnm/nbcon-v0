import * as Sentry from "@sentry/nextjs";
import { initSentry } from "./src/lib/sentry";

initSentry();

export default Sentry.defaultOptions;

