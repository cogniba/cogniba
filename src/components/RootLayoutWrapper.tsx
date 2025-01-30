"use client";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "./ui/toaster";
// TODO
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

interface RootLayoutWrapperProps {
  readonly children: React.ReactNode;
}

export default function RootLayoutWrapper({
  children,
}: RootLayoutWrapperProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster />
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  );
}
