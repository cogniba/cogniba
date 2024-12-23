"use client";

import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "./ui/toaster";
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
      // defaultTheme="light"
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
