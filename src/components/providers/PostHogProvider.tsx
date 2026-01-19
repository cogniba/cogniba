"use client";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";
import SuspendedPostHogPageView from "../PostHogPageView";
import getEnv from "@/lib/env";

type PostHogProviderProps = {
  children: React.ReactNode;
};

export default function PostHogProvider({ children }: PostHogProviderProps) {
  useEffect(() => {
    posthog.init(getEnv("NEXT_PUBLIC_POSTHOG_KEY"), {
      api_host: "/ingest",
      ui_host: getEnv("NEXT_PUBLIC_POSTHOG_HOST"),
      person_profiles: "identified_only",
      capture_pageview: false,
      capture_pageleave: true,
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  );
}
