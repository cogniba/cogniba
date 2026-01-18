import { PostHog } from "posthog-node";
import getEnv from "@/lib/env";

export default function posthogClient() {
  const posthogClient = new PostHog(getEnv("NEXT_PUBLIC_POSTHOG_KEY"), {
    host: getEnv("NEXT_PUBLIC_POSTHOG_HOST"),
    flushAt: 1,
    flushInterval: 0,
  });
  return posthogClient;
}
