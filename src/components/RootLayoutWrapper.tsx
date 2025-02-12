"use client";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "./ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import PostHogProvider from "./providers/PostHogProvider";

interface RootLayoutWrapperProps {
  readonly children: React.ReactNode;
}

export default function RootLayoutWrapper({
  children,
}: RootLayoutWrapperProps) {
  return (
    <PostHogProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <Toaster />
        <Analytics />
        <SpeedInsights />
        {children}
      </ThemeProvider>
    </PostHogProvider>
  );
}
